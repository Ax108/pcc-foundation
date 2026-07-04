# Pratima Chandra Foundation — WordPress → React migration plan

Migrate [pratimachandrafoundation.org](https://pratimachandrafoundation.org/) from WordPress/Elementor to the **React app** on branch **`react-app-master`** in [Ax108/pcc-foundation](https://github.com/Ax108/pcc-foundation), preserving **content and brand identity** while upgrading **UX, performance, and code quality** to AstraX / PC Chandra standards.

Related: [FolderStructureRules.md](./FolderStructureRules.md) · [Tasks.md](./Tasks.md) · [WebPerformanceSEO.md](./WebPerformanceSEO.md) · [HTMLSemantics.md](./HTMLSemantics.md) · [DesignGuidelines.md](./DesignGuidelines.md)

**Design rule:** Revamp with AstraX / PC Chandra **patterns**, keep [pratimachandrafoundation.org](https://pratimachandrafoundation.org/) **brand, content, and section architecture**. See [DesignGuidelines.md](./DesignGuidelines.md) for liberty bounds and the shipped audit.

**Progress marking:** ✅ = shipped in repo · no mark = not started · _partial_ = stub or in progress

---

## Progress snapshot

| Area | Status |
| ---- | ------ |
| Phase 0 — Bootstrap | ✅ Complete |
| Phase 1 — TopNavBar + layout | ✅ Complete |
| Phase 1 — Footer + `siteContact.ts` | ✅ Complete |
| Phase 1 — Manual QA | _partial_ — lint/build ✅ |
| Route stubs (all 5 nav destinations) | ✅ Complete |
| Page content (Home, Inspiration, Gallery, Events, Contact) | _partial_ — hero + about + partners + gallery teaser ✅; inner stubs |
| Design audit & liberty rules | ✅ [DesignGuidelines.md](./DesignGuidelines.md) |
| Phase 2 — Home | _partial_ — hero, about, partners, gallery teaser ✅; **Recent events TODO** |
| Phase 2–7 (inner content) | Not started |

---

## 1. Goals

| Goal | Detail |
| ---- | ------ |
| **Parity** | All public-facing pages and event content from the live site |
| **Revamp** | Cleaner layout, faster loads, accessible nav, mobile-first — **not** a pixel-perfect WP clone; see [DesignGuidelines.md](./DesignGuidelines.md) |
| **Standards** | Patterns from AstraX + PC Chandra reference sites (see §4) |
| **Brand** | Kodchasan, foundation colors, logos, bilingual (EN + Bengali) copy from scrape |
| **Performance** | Core Web Vitals — preload LCP, explicit image dimensions, lazy routes, no FA npm package |
| **Maintainability** | Modular `pages/`, universal `navigationBars/`, DRY shared primitives, `bun lint` + `bun run build` on every phase |

---

## 2. Scraped data & assets (GitHub workflow)

All WordPress content was scraped from [pratimachandrafoundation.org](https://pratimachandrafoundation.org/) into **`data/pratima_chandra_foundation/`** on the **`master`** branch. Front-end devs consume that data while working on **`react-app-master`** — **no separate `pcc-foundation` clone or sibling folder is required**.

### 2.1 Repository layout (one repo, two branches)

Everything lives in **[Ax108/pcc-foundation](https://github.com/Ax108/pcc-foundation)**.

| Branch | What it contains | Who uses it |
| ------ | ---------------- | ----------- |
| **`master`** | Python scraper + scraped data under `data/pratima_chandra_foundation/` | Content reference, asset source, re-scrape |
| **`react-app-master`** | Vite React app at **repo root** (`src/`, `public/`, `package.json`, …) | Front-end development |

GitHub path to scrape data:

**[github.com/Ax108/pcc-foundation/tree/master/data/pratima_chandra_foundation](https://github.com/Ax108/pcc-foundation/tree/master/data/pratima_chandra_foundation)**

> **Local folder names:** You may clone into `pcc-foundation-react-app` locally — that is only a **directory name**. On GitHub, checkout **`react-app-master`**; the app files are at the **clone root**, not in a subfolder.

### 2.2 Quick start for front-end devs

```bash
# 1. Clone once
git clone https://github.com/Ax108/pcc-foundation.git
cd pcc-foundation

# 2. Work on the React app
git checkout react-app-master
bun install
bun run dev

# 3. Pull scrape data from master (without switching branches)
git fetch origin master
git checkout origin/master -- data/pratima_chandra_foundation
```

After step 3:

```
your-clone/                              ← repo root (on react-app-master)
├── src/                                 ← React app
├── public/                              ← static assets committed to this branch
├── data/pratima_chandra_foundation/     ← scrape (from master; local reference)
│   ├── site_data.json
│   ├── website_data.md
│   ├── pages.csv
│   ├── images.csv
│   ├── assets_manifest.json
│   ├── assets_manifest.csv
│   └── assets/
│       ├── images/          ← ~1,036 content images
│       └── site-assets/     ← WordPress CSS/JS — do not use
└── package.json
```

**Important:** `data/` is normally **not** on `react-app-master`. Step 3 adds it locally. Do **not** commit the whole `data/` tree or bulk `assets/images/` to the React branch unless the team explicitly agrees — copy **only needed files** into `public/assets/`.

**Optional — second worktree** (scraper + app in parallel):

```bash
git worktree add ../pcc-foundation-master master
# Scrape always at ../pcc-foundation-master/data/pratima_chandra_foundation/
```

### 2.3 Data files — read / transform (do not ship raw JSON)

| File | Purpose | Use in React app |
| ---- | ------- | ---------------- |
| **`site_data.json`** | Full structured scrape: pages, headings, text, links, images per page | Build **`src/content/*.ts`** modules; **do not** import this ~1.3 MB file at runtime |
| **`website_data.md`** | Human-readable page dump | Copy reference while building pages |
| **`pages.csv`** | 21 URLs, titles, status, text preview | Route inventory; skip WP junk (§3.2) |
| **`images.csv`** | Image URL → source page | Gallery/events lists; copy scripts |
| **`assets_manifest.json`** / **`.csv`** | Remote URL → local path under `assets/` | Locate files on disk when copying to `public/` |

### 2.4 Image assets (`data/.../assets/images/`)

| Reuse | Examples | Copy to |
| ----- | -------- | ------- |
| **Yes — brand** | `logo1-1024x173-*.jpg`, `logo1.jpg` | `public/assets/logo/` |
| **Yes — home carousel** | `header-1.jpg`, `header-3.jpg`, `header4.jpg`, `header-2.jpg` (via WP `home_slider` CPT) | `public/assets/home/` |
| **Yes — event headers** | `Header2016.jpg`, `Header2022.jpg`, `featured-image-1.jpg`, `Header.jpg` | event cards / detail pages — **not** the home carousel |
| **Yes — narrow strip** | `header6-*.jpg` | `public/assets/hero/` (inner-page banner, not carousel) |
| **Yes — partners** | `associates-logo.png` | `public/assets/partners/` |
| **Yes — inspiration** | `Akhil-Bandhu-Ghosh.jpg`, `Dhiren-Mitra.jpg`, `Baneekanthha-*.jpg` | `public/assets/inspiration/` |
| **Yes — events** | `PCMA-*`, `ARS-*`, `DSC_*` event photos | `public/assets/events/{year}/` |
| **Yes — gallery** | Images linked from `/gallery/` in `images.csv` | `public/assets/gallery/` |
| **Yes — documents** | `Aruprataner-Sandhane-2025-Form.pdf` | `public/assets/documents/` |
| **Yes — favicon source** | `cropped-WhatsApp-Image-…-d047ca4cbc.jpeg` (512×512) | Input to favicon.io (output already in `public/`) |
| **No — WP/plugin** | Anything under **`assets/site-assets/`** | Never copy — Elementor/WP CSS, JS, fonts |

Copy example (repo root on `react-app-master`, after fetching `data/`):

```bash
cp data/pratima_chandra_foundation/assets/images/logo1-1024x173-*.jpg \
   public/assets/logo/logo-header.jpg
```

Register paths in **`src/constants/images.ts`**; keep **`index.html`** LCP preloads in sync.

#### Home hero carousel (4 slides) — authoritative mapping ✅

Live [homepage](https://pratimachandrafoundation.org/) Elementor loop order (confirmed from HTML + `site_data.json` media attachments):

| Slide | WP CPT | Scrape file (1024×337) | Public path | Scene |
| ----- | ------ | ---------------------- | ----------- | ----- |
| 1 | `home_slider/slider-4/` | `header-1-1024x337-*.jpg` | `slide-1-header-1.jpg` | Award checks + trophies |
| 2 | `home_slider/slider-3/` | `header-3-1024x337-*.jpg` | `slide-2-header-3.jpg` | Registration / event table |
| 3 | `home_slider/slider-2/` | `header4-1024x337-*.jpg` | `slide-3-header4.jpg` | Performance collage |
| 4 | `home_slider/slider-1/` | `header-2-1024x337-*.jpg` | `slide-4-header-2.jpg` | Auditorium audience |

WP REST `home_slider` posts have `featured_media: null`; images are child media under each slider URL (e.g. `…/slider-4/header-1/`). Do **not** use event featured images (`Header2022`, `featured-image-1`, etc.) for the carousel.

Copy example:

```bash
cp data/.../assets/images/header-1-1024x337-*.jpg public/assets/home/slide-1-header-1.jpg
# …
cp data/.../assets/images/PCMA-2018-2nd-Rakhi-Chatterjee-1-768x513-*.jpg public/assets/gallery/home/teaser-01.jpg
# … (8 teasers — see homeGalleryTeaser.ts)
```

#### Already in `public/` (committed on `react-app-master`) ✅

| Public path | Scrape source (approx.) |
| ----------- | ------------------------ |
| `public/assets/logo/logo-header.jpg` ✅ | `logo1-1024x173-*.jpg` |
| `public/assets/logo/logo-full.jpg` ✅ | `logo1.jpg` |
| `public/assets/hero/header6.jpg` ✅ | `header6-1024x164-*.jpg` |
| `public/assets/partners/associates-logo.png` ✅ | `associates-logo-*.png` |
| `public/favicon.*`, `android-chrome-*`, `apple-touch-icon.png` ✅ | favicon.io from 512×512 WhatsApp crop |

#### Still to copy (as pages are built)

```
public/assets/
  home/           slider images, collages, 2025 application form
  inspiration/    mentor portraits
  events/         PCMA + ARS photos per year
  gallery/        grid images
  documents/      PDFs (e.g. Aruprataner Sandhane 2025 form)
```

### 2.5 Icons

| Source | Reuse? | Where in React app |
| ------ | ------ | ------------------ |
| Scraped Elementor / FA files in `assets/site-assets/` | **No** | — |
| UI icons (phone, email, menu, social) | **Pattern, not files** | ✅ `src/app/utils/icons.ts` — custom Font Awesome 6 **subset** via CDN |
| Favicon / PWA | **Generated** | ✅ `public/favicon.ico`, `favicon-*.png`, `android-chrome-*.png` (favicon.io) |
| `cropped-icon-192x192-1.png` | Reference only | Superseded by favicon.io pack |

Add icons only in `icons.ts` + preload woff2 in `index.html` — **no** `@fortawesome/*` npm packages.

### 2.6 Fonts

| Source | Reuse? | Where in React app |
| ------ | ------ | ------------------ |
| Scraped WP / Elementor webfonts in `site-assets/` | **No** | — |
| **Kodchasan** (site font from scrape) | **Yes — Google Fonts** | ✅ `index.html` + `src/theme.css` (`display=swap`, preconnect) |

### 2.7 Theme / design tokens

| Source | Reuse? | Where in React app |
| ------ | ------ | ------------------ |
| Scraped Elementor CSS in `site-assets/` | Reference only | Distilled into **`src/theme.css`** |
| Colors `#631318`, `#BC9D42`, `#7A7A7A`, etc. | **Yes** | ✅ `@theme` in `theme.css` |

### 2.8 Text & contact content (from scrape)

Use **`site_data.json`** or **`website_data.md`** for:

- Nav labels: Home, Our Inspiration, Gallery, Events, Contact Us — ✅ `navigationBars/constants/navLinks.ts`
- Footer about blurb — ✅ `siteContact.ts`
- Contact: P-35 CIT Road, Kolkata 700014 · 033-22498193 · pratimachandrafoundation@gmail.com — ✅ footer
- Social: Facebook, Instagram, YouTube — ✅ footer (URLs verified; live WP icons had no href)

Hard-code in **`src/navigationBars/constants/`** or **`src/content/`** — not JSON at runtime in v1.

### 2.9 Re-scraping (optional, `master` branch)

If the live WordPress site changes:

```bash
git checkout master
# Python venv per repo README, then:
python scrape_pratima_chandra_foundation.py
# updates data/pratima_chandra_foundation/
```

Front-end devs can refresh locally: `git fetch origin master && git checkout origin/master -- data/pratima_chandra_foundation` while on `react-app-master`.

### 2.10 Warehouse → app workflow

```
master branch                          react-app-master branch
─────────────────                      ─────────────────────────
data/pratima_chandra_foundation/  ──►  src/content/*.ts     (typed copy)
       │                               public/assets/       (selected images)
       │                               src/navigationBars/constants/   (nav, contact)
       └── site-assets/  ✗ ignore      src/app/utils/icons  (FA subset, not files)
                                       src/theme.css        (tokens)
                                       index.html           (fonts, preloads)
```

**Rule:** Scrape folder = **warehouse**. React app = **only what ships**. Copy deliberately; keep `bun run lint` and `bun run build` green.

---

## 3. Site inventory (pages & routes)

### 3.1 Include (public product pages)

| Route (new) | WordPress URL | Content summary | Status |
| ----------- | ------------- | --------------- | ------ |
| `/` | `/` | Hero slider (4 slides), about blurb, partners strip, gallery teaser, recent events | _partial_ — all sections except **Recent events** ✅ |
| `/our-inspiration` | `/our-inspiration/` | Foundation story + mentor portraits | ✅ route stub |
| `/gallery` | `/gallery/` | Photo grid (~55 images from scrape) | ✅ route stub |
| `/events` | `/events/` | Event cards — Memorial Award + Rabindra Sangeet | ✅ route stub |
| `/events/:slug` | `/event/{encoded-slug}/` | 9 event detail pages (2016–2023) | pending |
| `/contact-us` | `/contact-us/` | Address, phone, email, social links | ✅ route stub |

**Nav labels (match live site):** Home · Our Inspiration · Gallery · Events · Contact Us — ✅ wired in TopNavBar

### 3.2 Exclude (WordPress noise)

Do **not** migrate or link:

- `/hello-world/`, `/author/*`, `/category/*`
- `/home_slider/slider-{1-4}/` (CPT — slide content lives on Home hero)
- Elementor CSS/JS from `assets/site-assets/`

### 3.3 Event detail pages (9)

**Pratima Chandra Memorial Award (PCMA)**

| Year | WP path suffix |
| ---- | -------------- |
| 2016 | `…-memorial-…-3/` |
| 2017 | `…-memorial-…-2/` |
| 2018 | `…-memorial-…/` |

**Rabindra Gaane Pratima Chandra Puroshkar (ARS)**

| Year | WP path suffix |
| ---- | -------------- |
| 2016 | `…-chan-3/` |
| 2017 | `…-chan-2/` |
| 2018 | `…-chan/` |
| 2019 | `…-chan-4/` |
| 2022 | `…-chan-5/` |
| 2023 | `…-chan-6/` |

**New slugs (recommended):** e.g. `memorial-award-2018`, `rabindra-sangeet-2023` — map old URLs via redirect table later.

### 3.4 Global chrome (every route)

- **Logo** → `/assets/logo/logo-header.jpg` — ✅ `LogoSection` in TopNavBar
- **Quick links** → same 5 nav items — ✅ `navLinks.ts` + `NavLinks` / `MobileMenu`
- **Contact** → P-35 CIT Road, Kolkata 700014 · 033-22498193 · pratimachandrafoundation@gmail.com — ✅ footer
- **Social** → Facebook, Instagram, YouTube — ✅ footer
- **Copyright** → © 2023 Pratima Chandra Foundation — ✅ footer

---

## 4. Design standards (references)

Blend **foundation brand** with **AstraX / PC Chandra** polish. We take *patterns*, not colors, from the reference sites.

**Liberty principle:** Improve UX, performance, and accessibility; do **not** rebrand or reorder live content. Full rules and shipped audit → [DesignGuidelines.md](./DesignGuidelines.md).

### 4.1 AstraX standards

| Site | Take |
| ---- | ---- |
| [astrax.dev](https://astrax.dev/) | Clear hierarchy, generous whitespace, modern section rhythm, crisp CTAs |
| [app.1ax.in](https://app.1ax.in/) | App-grade consistency, focused navigation, performance-conscious UI |

### 4.2 PC Chandra standards (by AstraX)

| Site | Take |
| ---- | ---- |
| [pcchandragarden.com](https://www.pcchandragarden.com/) | Premium brand feel, strong hero imagery, trustworthy footer, elegant typography |
| [pcchandraindia.com store locator](https://pcchandraindia.com/pages/store-locator) | Structured location/contact blocks (adapt for Contact footer — no store locator) |

### 4.3 Foundation brand (keep)

| Token | Value |
| ----- | ----- |
| Font | Kodchasan 400/500/600 |
| Primary text | `#050505` |
| Body text | `#7A7A7A` |
| Accent | `#631318` |
| Gold highlight | `#BC9D42` |
| Footer bg | `#1A1A1A` |
| Muted surface | `#F5F5F5` |
| Max content width | 1140px |

### 4.4 UX upgrades (liberty to revamp)

| Area | WordPress today | React target | Status |
| ---- | --------------- | ------------ | ------ |
| Hero | Elementor slider CPT | Accessible carousel; one LCP slide preloaded | _partial_ — HeroSlider ✅ |
| Nav | Duplicate mobile/desktop lists | Single `navigationBars/` module, mobile drawer, active route | ✅ TopNavBar |
| Events | Long archive + Bengali titles | Filterable cards; shared detail template | pending |
| Gallery | Link-heavy page | Responsive grid, lazy images, lightbox | pending |
| Footer | 3 columns + social | Same info architecture; dark bar, FA brand icons | ✅ Footer |
| SEO | Yoast-style WP | `useSEO` per route + JSON-LD | _partial_ — hook stub ✅ |
| i18n display | Mixed BN/EN | Preserve copy verbatim; Bengali-friendly typography | pending |

### 4.5 Implementation patterns (this repo)

- ✅ TopNavBar in `SiteLayout` → **`src/navigationBars/`**
- ✅ Footer in `SiteLayout` → **`src/navigationBars/Footer.tsx`**
- ✅ Custom FA subset, `IMAGES` constants, lazy routes + Suspense — see [WebPerformanceSEO.md](./WebPerformanceSEO.md)
- ✅ `useSEO` hook stub — per-page fill pending

---

## 5. Architecture

### 5.1 Folder layout (target)

```
src/
├── App.tsx                          ✅
├── Routing.tsx                      ✅ BrowserRouter, SiteLayout, lazy routes
├── main.tsx                         ✅
├── index.css / theme.css            ✅
├── navigationBars/                  ← universal chrome (Phase 1) ✅
│   ├── TopNavBar.tsx                ✅
│   ├── Footer.tsx                   ✅
│   ├── SiteLayout.tsx               ✅
│   ├── components/                  ✅ nav + footer parts
│   ├── constants/
│   │   ├── navLinks.ts              ✅
│   │   └── siteContact.ts           ✅
│   └── hooks/
│       └── useMobileNav.ts          ✅
├── app/                             ✅ SEO stub, icons
├── constants/                         ✅ images.ts
├── pages/                           _partial_ — stubs for all routes
│   ├── home/Home.tsx                _partial_ — HeroSlider ✅
│   ├── our-inspiration/             ✅ stub
│   ├── gallery/                     ✅ stub
│   ├── events/                      ✅ stub
│   └── contact-us/                  ✅ stub
├── shared/                          pending
└── content/                         pending (Phase 3+)
```

See [FolderStructureRules.md](./FolderStructureRules.md).

### 5.2 Path aliases

| Alias | Maps to | Status |
| ----- | ------- | ------ |
| `@src/*` | `src/*` | ✅ |
| `@app/*` | `src/app/*` | ✅ |
| `@navigationBars/*` | `src/navigationBars/*` | ✅ |
| `@home/*` | `src/pages/home/*` | ✅ |
| `@inspiration/*` | `src/pages/our-inspiration/*` | ✅ |
| `@gallery/*` | `src/pages/gallery/*` | ✅ |
| `@events/*` | `src/pages/events/*` | ✅ |
| `@contact/*` | `src/pages/contact-us/*` | ✅ |
| `@public/*` | `public/*` | ✅ |

### 5.3 Data strategy

1. **Phase 1–2:** Nav/footer constants from scrape (§2.8). — ✅ nav links + footer contact
2. **Phase 3+:** `src/content/*.ts` curated from `site_data.json` (fetch data per §2.2).
3. **Never** import raw scrape JSON at runtime — transform into TypeScript modules.
4. Image paths via `constants/images.ts` or page constants.

### 5.4 Routing map

```
/                      → pages/home/Home.tsx                    ✅ stub
/our-inspiration       → pages/our-inspiration/OurInspiration.tsx ✅ stub
/gallery               → pages/gallery/Gallery.tsx              ✅ stub
/events                → pages/events/Events.tsx                ✅ stub
/events/:eventSlug     → pages/events/EventDetail.tsx           pending
/contact-us            → pages/contact-us/ContactUs.tsx         ✅ stub
```

Legacy WP URLs → 301 at hosting (`docs/Redirects.md` later).

---

## 6. Phase overview

| Phase | Scope | Exit criteria | Status |
| ----- | ----- | ------------- | ------ |
| **0** | Bootstrap | lint + build pass; theme; stub home | ✅ Done |
| **1** | **Nav + footer** | SiteLayout on all routes; lint + build pass | ✅ Done |
| **2** | Home | Hero, about, partners, gallery teaser, **recent events** | _partial_ — **Recent events TODO** |
| **3** | Our Inspiration + Contact | Static pages | _partial_ — route stubs ✅ |
| **4** | Events list + detail | 9 events | _partial_ — list stub ✅ |
| **5** | Gallery | Grid + lazy load | _partial_ — route stub ✅ |
| **6** | Assets + SEO | Images, useSEO, JSON-LD, sitemap, OG | pending |
| **7** | Launch prep | Redirects, Lighthouse | pending |

Checklist: [Tasks.md](./Tasks.md).

---

## 7. Quality gates (every PR / phase)

```bash
bun run lint      # ESLint — ✅ passing
bun run build     # tsc -b + vite build — ✅ passing
```

Optional: Lighthouse mobile, keyboard nav, Bengali render check.

---

## 8. Page wireframes (logical sections)

### Home `/`

Hero (4 slides) · About · Partners · Gallery teaser · Recent events (6 cards)

### Our Inspiration `/our-inspiration`

Mission intro · Mentor grid (photo + bio)

### Gallery `/gallery`

Title · Responsive image grid

### Events `/events`

Title · Filters (All / Memorial / Rabindra) · Event cards

### Event detail `/events/:slug`

Title · Meta (date, venue, organisers) · Body · Photo gallery · Optional PDF

### Contact `/contact-us`

Quick contact · Social links · (Form optional later)

---

## 9. Risks and decisions

| Topic | Decision |
| ----- | -------- |
| Bengali URLs | English slugs in app; BN titles in content; redirect old WP URLs at deploy |
| Contact form | Omit v1 — WP is static info only |
| Gallery lightbox | Lightweight custom; avoid heavy UI libs |
| Content updates | v1 static from scrape; CMS later |
| `src/app` vs `src/navigationBars` | `app/` = SEO/icons; `navigationBars/` = header/footer/layout |

---

## 10. References

- Live site: [pratimachandrafoundation.org](https://pratimachandrafoundation.org/)
- Scrape: [data/pratima_chandra_foundation on `master`](https://github.com/Ax108/pcc-foundation/tree/master/data/pratima_chandra_foundation)
- Repo: [github.com/Ax108/pcc-foundation](https://github.com/Ax108/pcc-foundation) — branch **`react-app-master`** for the app
- Performance & SEO: [WebPerformanceSEO.md](./WebPerformanceSEO.md)

---

_Last updated: Phase 0–1 ✅ · Phase 2 home partial (Recent events TODO) · See [Tasks.md](./Tasks.md)._
