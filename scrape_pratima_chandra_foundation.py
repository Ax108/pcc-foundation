#!/usr/bin/env python3
"""
Scrape public website data from https://pratimachandrafoundation.org/.

Outputs:
  data/pratima_chandra_foundation/site_data.json
  data/pratima_chandra_foundation/pages.csv
  data/pratima_chandra_foundation/images.csv
  data/pratima_chandra_foundation/assets_manifest.csv
  data/pratima_chandra_foundation/assets_manifest.json
  data/pratima_chandra_foundation/website_data.md
  data/pratima_chandra_foundation/assets/
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import mimetypes
import re
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urldefrag, urljoin, urlparse
from xml.etree import ElementTree

import requests
from bs4 import BeautifulSoup


BASE_URL = "https://pratimachandrafoundation.org/"
SITEMAP_URL = urljoin(BASE_URL, "wp-sitemap.xml")
OUTPUT_DIR = Path("data/pratima_chandra_foundation")
USER_AGENT = "PCCC website data scraper (+local research use)"
REQUEST_DELAY_SECONDS = 0.4
TIMEOUT_SECONDS = 25
ASSET_EXTENSIONS = {
    ".avif",
    ".css",
    ".gif",
    ".ico",
    ".jpeg",
    ".jpg",
    ".js",
    ".json",
    ".pdf",
    ".png",
    ".svg",
    ".webp",
    ".woff",
    ".woff2",
}


@dataclass(frozen=True)
class SitemapUrl:
    url: str
    lastmod: str | None = None
    source_sitemap: str | None = None


class Scraper:
    def __init__(self, base_url: str, output_dir: Path, limit: int | None = None):
        self.base_url = normalize_url(base_url)
        self.output_dir = output_dir
        self.limit = limit
        self.session = requests.Session()
        self.session.headers.update({"User-Agent": USER_AGENT})
        self.last_request_at = 0.0

    def run(self) -> dict[str, Any]:
        self.output_dir.mkdir(parents=True, exist_ok=True)

        sitemap_urls = self.discover_sitemap_urls(SITEMAP_URL)
        if self.limit:
            sitemap_urls = sitemap_urls[: self.limit]

        pages = []
        media_by_url: dict[str, dict[str, Any]] = {}
        assets_by_url: dict[str, dict[str, Any]] = {}
        for index, sitemap_url in enumerate(sitemap_urls, start=1):
            print(f"[{index}/{len(sitemap_urls)}] Scraping {sitemap_url.url}")
            page = self.scrape_page(sitemap_url)
            pages.append(page)
            for image in page["images"]:
                media_by_url.setdefault(image["url"], image)
                assets_by_url.setdefault(image["url"], image | {"kind": "image"})
            for asset in page["assets"]:
                assets_by_url.setdefault(asset["url"], asset)

        wp_api = self.fetch_wordpress_api_data()
        for asset in extract_assets_from_wp_api(wp_api):
            assets_by_url.setdefault(asset["url"], asset)

        asset_manifest = self.download_assets(sorted(assets_by_url.values(), key=lambda item: item["url"]))

        result = {
            "metadata": {
                "site": self.base_url,
                "scraped_at": datetime.now(timezone.utc).isoformat(),
                "source_sitemap": SITEMAP_URL,
                "page_count": len(pages),
                "image_count": len(media_by_url),
                "asset_count": len(asset_manifest),
            },
            "pages": pages,
            "images": sorted(media_by_url.values(), key=lambda item: item["url"]),
            "assets": asset_manifest,
            "wordpress_api": wp_api,
        }

        self.write_outputs(result)
        return result

    def discover_sitemap_urls(self, sitemap_url: str) -> list[SitemapUrl]:
        seen_sitemaps: set[str] = set()
        seen_urls: dict[str, SitemapUrl] = {}

        def visit(url: str) -> None:
            if url in seen_sitemaps:
                return
            seen_sitemaps.add(url)
            response = self.get(url)
            root = ElementTree.fromstring(response.content)
            tag = strip_xml_namespace(root.tag)

            if tag == "sitemapindex":
                for loc in root.findall(".//{*}sitemap/{*}loc"):
                    visit(loc.text.strip())
                return

            if tag != "urlset":
                return

            for item in root.findall(".//{*}url"):
                loc = item.find("{*}loc")
                if loc is None or not loc.text:
                    continue
                page_url = normalize_url(loc.text.strip())
                if not self.is_internal_public_url(page_url):
                    continue
                lastmod_node = item.find("{*}lastmod")
                lastmod = lastmod_node.text.strip() if lastmod_node is not None and lastmod_node.text else None
                seen_urls.setdefault(page_url, SitemapUrl(page_url, lastmod, url))

        visit(sitemap_url)
        return sorted(seen_urls.values(), key=lambda item: item.url)

    def scrape_page(self, sitemap_url: SitemapUrl) -> dict[str, Any]:
        try:
            response = self.get(sitemap_url.url)
            status_code = response.status_code
            content_type = response.headers.get("content-type", "")
            html = response.text
        except requests.RequestException as exc:
            return {
                "url": sitemap_url.url,
                "lastmod": sitemap_url.lastmod,
                "source_sitemap": sitemap_url.source_sitemap,
                "status_code": None,
                "error": str(exc),
                "title": "",
                "meta_description": "",
                "headings": [],
                "text": "",
                "links": [],
                "images": [],
                "assets": [],
            }

        soup = BeautifulSoup(html, "html.parser")
        assets = extract_assets(soup, sitemap_url.url, self.base_url)
        content_soup = BeautifulSoup(html, "html.parser")
        remove_noise(content_soup)

        title = get_title(content_soup)
        meta_description = get_meta_content(content_soup, "description")
        headings = extract_headings(content_soup)
        text = extract_clean_text(content_soup)
        links = extract_links(content_soup, sitemap_url.url, self.base_url)
        images = extract_images(content_soup, sitemap_url.url)

        return {
            "url": sitemap_url.url,
            "lastmod": sitemap_url.lastmod,
            "source_sitemap": sitemap_url.source_sitemap,
            "status_code": status_code,
            "content_type": content_type,
            "title": title,
            "meta_description": meta_description,
            "headings": headings,
            "text": text,
            "links": links,
            "images": images,
            "assets": assets,
        }

    def fetch_wordpress_api_data(self) -> dict[str, Any]:
        api_collections = {
            "pages": "wp-json/wp/v2/pages",
            "posts": "wp-json/wp/v2/posts",
            "events": "wp-json/wp/v2/event",
            "home_slider": "wp-json/wp/v2/home_slider",
            "media": "wp-json/wp/v2/media",
        }
        data: dict[str, Any] = {}
        for name, path in api_collections.items():
            try:
                data[name] = simplify_wp_records(self.fetch_wp_collection(path))
            except requests.RequestException as exc:
                data[name] = {"error": str(exc)}
            except ValueError as exc:
                data[name] = {"error": str(exc)}
            except json.JSONDecodeError as exc:
                data[name] = {"error": f"Invalid JSON: {exc}"}
        return data

    def fetch_wp_collection(self, path: str) -> list[dict[str, Any]]:
        page = 1
        records: list[dict[str, Any]] = []
        while True:
            separator = "&" if "?" in path else "?"
            url = urljoin(self.base_url, f"{path}{separator}per_page=100&_embed=1&page={page}")
            response = self.get(url)
            if not response.headers.get("content-type", "").startswith("application/json"):
                raise ValueError(f"Unexpected content type: {response.headers.get('content-type')}")
            page_records = response.json()
            if not isinstance(page_records, list) or not page_records:
                break
            records.extend(page_records)
            total_pages = int(response.headers.get("X-WP-TotalPages", "1") or "1")
            if page >= total_pages:
                break
            page += 1
        return records

    def download_assets(self, assets: list[dict[str, Any]]) -> list[dict[str, Any]]:
        asset_dir = self.output_dir / "assets"
        asset_dir.mkdir(parents=True, exist_ok=True)

        manifest = []
        total = len(assets)
        for index, asset in enumerate(assets, start=1):
            url = asset["url"]
            parsed = urlparse(url)
            if parsed.scheme not in {"http", "https"}:
                continue
            try:
                local_path = local_asset_path(asset_dir, url, asset.get("kind", "asset"))
                if local_path.exists() and local_path.stat().st_size > 0:
                    response = None
                    status_code = 200
                    content_type = mimetypes.guess_type(local_path.name)[0] or ""
                    size = local_path.stat().st_size
                else:
                    print(f"[asset {index}/{total}] Downloading {url}")
                    response = self.get(url)
                    status_code = response.status_code
                    content_type = response.headers.get("content-type", "")
                    guessed_path = local_asset_path(asset_dir, url, asset.get("kind", "asset"), content_type)
                    if guessed_path != local_path:
                        local_path = guessed_path
                    local_path.parent.mkdir(parents=True, exist_ok=True)
                    local_path.write_bytes(response.content)
                    size = len(response.content)
                manifest.append(
                    {
                        "url": url,
                        "kind": asset.get("kind", "asset"),
                        "source_page": asset.get("source_page", ""),
                        "alt": asset.get("alt", ""),
                        "local_path": str(local_path.relative_to(self.output_dir)),
                        "status_code": status_code,
                        "content_type": content_type,
                        "bytes": size,
                    }
                )
            except requests.RequestException as exc:
                manifest.append(
                    {
                        "url": url,
                        "kind": asset.get("kind", "asset"),
                        "source_page": asset.get("source_page", ""),
                        "alt": asset.get("alt", ""),
                        "local_path": "",
                        "status_code": "",
                        "content_type": "",
                        "bytes": 0,
                        "error": str(exc),
                    }
                )
        return manifest

    def write_outputs(self, result: dict[str, Any]) -> None:
        json_path = self.output_dir / "site_data.json"
        json_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

        pages_csv = self.output_dir / "pages.csv"
        with pages_csv.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(
                handle,
                fieldnames=[
                    "url",
                    "title",
                    "lastmod",
                    "status_code",
                    "meta_description",
                    "heading_count",
                    "link_count",
                    "image_count",
                    "text_preview",
                ],
            )
            writer.writeheader()
            for page in result["pages"]:
                writer.writerow(
                    {
                        "url": page["url"],
                        "title": page["title"],
                        "lastmod": page["lastmod"],
                        "status_code": page["status_code"],
                        "meta_description": page["meta_description"],
                        "heading_count": len(page["headings"]),
                        "link_count": len(page["links"]),
                        "image_count": len(page["images"]),
                        "text_preview": page["text"][:500],
                    }
                )

        images_csv = self.output_dir / "images.csv"
        with images_csv.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle, fieldnames=["url", "alt", "source_page"])
            writer.writeheader()
            for image in result["images"]:
                writer.writerow(image)

        assets_json = self.output_dir / "assets_manifest.json"
        assets_json.write_text(json.dumps(result["assets"], ensure_ascii=False, indent=2), encoding="utf-8")

        assets_csv = self.output_dir / "assets_manifest.csv"
        with assets_csv.open("w", newline="", encoding="utf-8") as handle:
            fieldnames = ["url", "kind", "source_page", "alt", "local_path", "status_code", "content_type", "bytes", "error"]
            writer = csv.DictWriter(handle, fieldnames=fieldnames)
            writer.writeheader()
            for asset in result["assets"]:
                writer.writerow({field: asset.get(field, "") for field in fieldnames})

        markdown_path = self.output_dir / "website_data.md"
        markdown_path.write_text(render_markdown(result), encoding="utf-8")

    def get(self, url: str) -> requests.Response:
        elapsed = time.monotonic() - self.last_request_at
        if elapsed < REQUEST_DELAY_SECONDS:
            time.sleep(REQUEST_DELAY_SECONDS - elapsed)
        response = self.session.get(url, timeout=TIMEOUT_SECONDS)
        self.last_request_at = time.monotonic()
        response.raise_for_status()
        return response

    def is_internal_public_url(self, url: str) -> bool:
        parsed_base = urlparse(self.base_url)
        parsed_url = urlparse(url)
        if parsed_url.netloc != parsed_base.netloc:
            return False
        blocked_prefixes = ("/wp-admin/", "/wp-login.php")
        return not parsed_url.path.startswith(blocked_prefixes)


def normalize_url(url: str) -> str:
    url, _fragment = urldefrag(url)
    parsed = urlparse(url)
    scheme = parsed.scheme or "https"
    netloc = parsed.netloc.lower()
    path = parsed.path or "/"
    if not path.endswith("/") and "." not in path.rsplit("/", 1)[-1]:
        path += "/"
    return parsed._replace(scheme=scheme, netloc=netloc, path=path).geturl()


def strip_xml_namespace(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def remove_noise(soup: BeautifulSoup) -> None:
    for selector in [
        "script",
        "style",
        "noscript",
        "svg",
        "iframe",
        "form",
        "header",
        "footer",
        ".elementor-location-header",
        ".elementor-location-footer",
    ]:
        for node in soup.select(selector):
            node.decompose()


def get_title(soup: BeautifulSoup) -> str:
    og_title = soup.find("meta", property="og:title")
    if og_title and og_title.get("content"):
        return clean_whitespace(og_title["content"])
    if soup.title and soup.title.string:
        return clean_whitespace(soup.title.string)
    h1 = soup.find("h1")
    return clean_whitespace(h1.get_text(" ")) if h1 else ""


def get_meta_content(soup: BeautifulSoup, name: str) -> str:
    node = soup.find("meta", attrs={"name": name})
    return clean_whitespace(node.get("content", "")) if node else ""


def extract_headings(soup: BeautifulSoup) -> list[dict[str, str]]:
    headings = []
    for node in soup.find_all(re.compile("^h[1-6]$")):
        text = clean_whitespace(node.get_text(" "))
        if text:
            headings.append({"level": node.name, "text": text})
    return dedupe_dicts(headings, key=lambda item: f"{item['level']}:{item['text']}")


def extract_clean_text(soup: BeautifulSoup) -> str:
    main = soup.find("main") or soup.find(attrs={"data-elementor-type": "wp-page"}) or soup.body or soup
    lines = []
    for raw_line in main.get_text("\n").splitlines():
        line = clean_whitespace(raw_line)
        if line:
            lines.append(line)
    return "\n".join(dedupe_keep_order(lines))


def extract_links(soup: BeautifulSoup, page_url: str, base_url: str) -> list[dict[str, str]]:
    links = []
    base_netloc = urlparse(base_url).netloc
    for node in soup.find_all("a", href=True):
        href = normalize_url(urljoin(page_url, node["href"]))
        if href.startswith("mailto:") or href.startswith("tel:"):
            href = node["href"].strip()
        text = clean_whitespace(node.get_text(" "))
        parsed = urlparse(href)
        links.append(
            {
                "url": href,
                "text": text,
                "type": "internal" if parsed.netloc == base_netloc else "external",
            }
        )
    return dedupe_dicts(links, key=lambda item: f"{item['url']}|{item['text']}")


def extract_images(soup: BeautifulSoup, page_url: str) -> list[dict[str, str]]:
    images = []
    for node in soup.find_all("img"):
        for src in image_sources(node):
            images.append(
                {
                    "url": normalize_url(urljoin(page_url, src)),
                    "alt": clean_whitespace(node.get("alt", "")),
                    "source_page": page_url,
                }
            )
    return dedupe_dicts(images, key=lambda item: item["url"])


def extract_assets(soup: BeautifulSoup, page_url: str, base_url: str) -> list[dict[str, str]]:
    assets = []
    for image in extract_images(soup, page_url):
        assets.append(image | {"kind": "image"})

    for node in soup.find_all("link", href=True):
        rel = " ".join(node.get("rel", [])).lower()
        href = normalize_asset_url(urljoin(page_url, node["href"]))
        if not should_download_asset(href, base_url):
            continue
        kind = "stylesheet" if "stylesheet" in rel else "icon" if "icon" in rel else "asset"
        assets.append({"url": href, "kind": kind, "source_page": page_url, "alt": ""})

    for node in soup.find_all("script", src=True):
        src = normalize_asset_url(urljoin(page_url, node["src"]))
        if should_download_asset(src, base_url):
            assets.append({"url": src, "kind": "script", "source_page": page_url, "alt": ""})

    for node in soup.find_all("meta"):
        content = node.get("content", "")
        property_name = (node.get("property") or node.get("name") or "").lower()
        if not content or property_name not in {"og:image", "twitter:image", "msapplication-tileimage"}:
            continue
        asset_url = normalize_asset_url(urljoin(page_url, content))
        if should_download_asset(asset_url, base_url):
            assets.append({"url": asset_url, "kind": "image", "source_page": page_url, "alt": ""})

    return dedupe_dicts(assets, key=lambda item: item["url"])


def image_sources(node: Any) -> list[str]:
    sources = []
    for attr in ["src", "data-src", "data-lazy-src"]:
        value = node.get(attr)
        if value:
            sources.append(value)
    for attr in ["srcset", "data-srcset"]:
        value = node.get(attr)
        if not value:
            continue
        for candidate in value.split(","):
            src = candidate.strip().split(" ", 1)[0]
            if src:
                sources.append(src)
    return dedupe_keep_order(sources)


def should_download_asset(url: str, base_url: str) -> bool:
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"}:
        return False
    if parsed.netloc != urlparse(base_url).netloc:
        return False
    suffix = Path(parsed.path).suffix.lower()
    return suffix in ASSET_EXTENSIONS


def normalize_asset_url(url: str) -> str:
    url, _fragment = urldefrag(url)
    parsed = urlparse(url)
    return parsed._replace(query="").geturl()


def local_asset_path(asset_dir: Path, url: str, kind: str, content_type: str = "") -> Path:
    parsed = urlparse(url)
    original_name = Path(parsed.path).name
    suffix = Path(original_name).suffix
    if not suffix and content_type:
        suffix = mimetypes.guess_extension(content_type.split(";", 1)[0].strip()) or ""
    if not suffix:
        suffix = ".bin"

    stem = Path(original_name).stem if original_name else "asset"
    safe_stem = re.sub(r"[^A-Za-z0-9._-]+", "-", stem).strip("-") or "asset"
    digest = hashlib.sha256(url.encode("utf-8")).hexdigest()[:10]
    folder = asset_folder(kind, suffix)
    return asset_dir / folder / f"{safe_stem}-{digest}{suffix}"


def asset_folder(kind: str, suffix: str) -> str:
    if kind == "image" or suffix.lower() in {".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"}:
        return "images"
    if suffix.lower() in {".css", ".js", ".json", ".woff", ".woff2"}:
        return "site-assets"
    if suffix.lower() == ".pdf":
        return "documents"
    return "other"


def extract_assets_from_wp_api(wp_api: dict[str, Any]) -> list[dict[str, str]]:
    assets = []
    for collection_name, records in wp_api.items():
        if not isinstance(records, list):
            continue
        for record in records:
            if not isinstance(record, dict):
                continue
            featured_media = record.get("featured_media") or {}
            source_url = featured_media.get("url")
            if source_url:
                assets.append(
                    {
                        "url": normalize_asset_url(source_url),
                        "kind": "image",
                        "source_page": record.get("link", collection_name),
                        "alt": featured_media.get("alt", ""),
                    }
                )
            if collection_name == "media" and record.get("link"):
                media_urls = []
                if record.get("source_url"):
                    media_urls.append(record["source_url"])
                media_urls.extend((record.get("sizes") or {}).values())
                media_urls.append(record["link"])
                for raw_media_url in media_urls:
                    media_url = normalize_asset_url(raw_media_url)
                    if Path(urlparse(media_url).path).suffix.lower() not in ASSET_EXTENSIONS:
                        continue
                    assets.append(
                        {
                            "url": media_url,
                            "kind": "media",
                            "source_page": collection_name,
                            "alt": record.get("title", ""),
                        }
                    )
            content_media_urls = re.findall(r"https://pratimachandrafoundation\.org/[^\s\"')<>]+", record.get("content", ""))
            for media_url in content_media_urls:
                media_url = normalize_asset_url(media_url)
                if Path(urlparse(media_url).path).suffix.lower() in ASSET_EXTENSIONS:
                    assets.append({"url": media_url, "kind": "media", "source_page": collection_name, "alt": record.get("title", "")})
    return dedupe_dicts(assets, key=lambda item: item["url"])


def simplify_wp_records(records: Any) -> Any:
    if not isinstance(records, list):
        return records
    simplified = []
    for record in records:
        if not isinstance(record, dict):
            continue
        simplified_record = {
            "id": record.get("id"),
            "date": record.get("date"),
            "modified": record.get("modified"),
            "slug": record.get("slug"),
            "link": record.get("link"),
            "title": clean_html_field(record.get("title", {}).get("rendered", "")),
            "excerpt": clean_html_field(record.get("excerpt", {}).get("rendered", "")),
            "content": clean_html_field(record.get("content", {}).get("rendered", "")),
            "featured_media": extract_embedded_media(record),
        }
        if record.get("source_url"):
            simplified_record["source_url"] = record.get("source_url")
        if record.get("mime_type"):
            simplified_record["mime_type"] = record.get("mime_type")
        if record.get("media_details", {}).get("sizes"):
            simplified_record["sizes"] = {
                name: size.get("source_url")
                for name, size in record["media_details"]["sizes"].items()
                if size.get("source_url")
            }
        simplified.append(simplified_record)
    return simplified


def extract_embedded_media(record: dict[str, Any]) -> dict[str, str] | None:
    media = record.get("_embedded", {}).get("wp:featuredmedia", [])
    if not media:
        return None
    first = media[0]
    return {
        "url": first.get("source_url", ""),
        "alt": first.get("alt_text", ""),
        "caption": clean_html_field(first.get("caption", {}).get("rendered", "")),
    }


def clean_html_field(html: str) -> str:
    soup = BeautifulSoup(html or "", "html.parser")
    return clean_whitespace(soup.get_text("\n"))


def render_markdown(result: dict[str, Any]) -> str:
    lines = [
        "# Pratima Chandra Foundation Website Data",
        "",
        f"Site: {result['metadata']['site']}",
        f"Scraped at: {result['metadata']['scraped_at']}",
        f"Pages: {result['metadata']['page_count']}",
        f"Images: {result['metadata']['image_count']}",
        "",
        "## Pages",
        "",
    ]

    for page in result["pages"]:
        lines.extend(
            [
                f"### {page['title'] or page['url']}",
                "",
                f"- URL: {page['url']}",
                f"- Last modified: {page['lastmod'] or 'Unknown'}",
                f"- Status: {page['status_code'] or 'Unknown'}",
            ]
        )
        if page.get("meta_description"):
            lines.append(f"- Meta description: {page['meta_description']}")
        if page["headings"]:
            lines.extend(["", "Headings:"])
            for heading in page["headings"]:
                lines.append(f"- {heading['level'].upper()}: {heading['text']}")
        if page["text"]:
            lines.extend(["", "Text:", "", page["text"]])
        if page["links"]:
            lines.extend(["", "Links:"])
            for link in page["links"]:
                label = f" ({link['text']})" if link["text"] else ""
                lines.append(f"- {link['url']}{label}")
        if page["images"]:
            lines.extend(["", "Images:"])
            for image in page["images"]:
                alt = f" - {image['alt']}" if image["alt"] else ""
                lines.append(f"- {image['url']}{alt}")
        lines.append("")

    lines.extend(["## WordPress API Summary", ""])
    for collection, records in result["wordpress_api"].items():
        if isinstance(records, list):
            lines.append(f"- {collection}: {len(records)} records")
        else:
            lines.append(f"- {collection}: {records}")
    lines.append("")
    return "\n".join(lines)


def clean_whitespace(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def dedupe_keep_order(items: list[str]) -> list[str]:
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result


def dedupe_dicts(items: list[dict[str, str]], key) -> list[dict[str, str]]:
    seen = set()
    result = []
    for item in items:
        marker = key(item)
        if marker in seen:
            continue
        seen.add(marker)
        result.append(item)
    return result


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Scrape Pratima Chandra Foundation website data.")
    parser.add_argument("--base-url", default=BASE_URL, help="Website base URL.")
    parser.add_argument("--output-dir", default=str(OUTPUT_DIR), help="Directory for generated data files.")
    parser.add_argument("--limit", type=int, default=None, help="Optional max number of sitemap URLs to scrape.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    scraper = Scraper(args.base_url, Path(args.output_dir), args.limit)
    result = scraper.run()
    print()
    print(f"Scraped {result['metadata']['page_count']} pages.")
    print(f"Wrote output to {Path(args.output_dir).resolve()}")


if __name__ == "__main__":
    main()
