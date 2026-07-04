# Pratima Chandra Foundation Scraper

This project scrapes public data from `https://pratimachandrafoundation.org/` and writes it in usable formats:

- `site_data.json`: complete structured data
- `website_data.md`: human-readable website content
- `pages.csv`: page-level summary
- `images.csv`: discovered image URLs
- `assets_manifest.csv`: downloaded asset index
- `assets_manifest.json`: downloaded asset index
- `assets/`: downloaded images, CSS, JS, icons, PDFs, fonts, and other same-site assets

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run

```bash
python scrape_pratima_chandra_foundation.py
```

The files are written to:

```text
data/pratima_chandra_foundation/
```

Downloaded files are grouped under:

```text
data/pratima_chandra_foundation/assets/images/
data/pratima_chandra_foundation/assets/site-assets/
data/pratima_chandra_foundation/assets/documents/
data/pratima_chandra_foundation/assets/other/
```

For a quick test run:

```bash
python scrape_pratima_chandra_foundation.py --limit 3
```
