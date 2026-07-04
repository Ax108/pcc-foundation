# Design guidelines — liberty within brand

How to revamp [pratimachandrafoundation.org](https://pratimachandrafoundation.org/) (WordPress) using **AstraX / PC Chandra** polish **without losing** foundation identity.

Related: [MigrationPlan.md §4](./MigrationPlan.md#4-design-standards-references) · [HTMLSemantics.md](./HTMLSemantics.md) · [WebPerformanceSEO.md](./WebPerformanceSEO.md)

---

## 1. Design philosophy

| Layer | Source | Rule |
| ----- | ------ | ---- |
| **Brand & content** | Live WP site + scrape | **Keep** — colors, font, copy, nav labels, section order, Bengali text verbatim |
| **UX & quality** | AstraX + PC Chandra reference sites | **Improve** — performance, accessibility, single nav module, cleaner spacing, semantic HTML |
| **Implementation** | This React repo | **Modernize** — no Elementor, no FA npm packages, static TS content, Core Web Vitals |

**Liberty:** We are **not** building a pixel-perfect Elementor clone. We **are** building a faster, accessible site that a visitor still recognizes as Pratima Chandra Foundation.

**Do not deviate too far:**

- Do not change brand colors, font family, or logo treatment without stakeholder sign-off.
- Do not rename nav items or reorder home sections vs the live site.
- Do not shorten or rewrite Bengali event titles or body copy during migration.
- Do not import patterns from reference sites that contradict foundation tone (e.g. clinic/booking UI, unrelated color palettes).

**OK to change:**

- Replace WP duplicate mobile/desktop nav with one responsive module.
- Replace Elementor slider with a lightweight accessible carousel (same images + overlay copy).
- Add sticky header, skip link, keyboard carousel controls, lazy-loaded slides.
- Improve footer/link contrast and wire social URLs (live WP icons had no links).
- Use structured contact markup (`<address>`), meta tags, and preload strategy.

---

## 2. Reference sites (patterns only)

| Site | Borrow | Do not borrow |
| ---- | ------ | ------------- |
| [astrax.dev](https://astrax.dev/) | Hierarchy, whitespace, section rhythm | AstraX colors, product copy |
| [app.1ax.in](https://app.1ax.in/) | Consistency, performance-conscious UI | App-shell patterns unrelated to a foundation site |
| [pcchandragarden.com](https://www.pcchandragarden.com/) | Strong hero, premium footer, typography | Venue/booking CTAs, their color scheme |
| [PC Chandra store locator](https://pcchandraindia.com/pages/store-locator) | Structured contact blocks | Store locator map UX |

Foundation tokens live in **`src/theme.css`** — always prefer `text-accent`, `text-gold`, `bg-footer`, `container-site` over ad-hoc hex in components.

---

## 3. Audit — shipped work (Jul 2026)

Compared to [pratimachandrafoundation.org](https://pratimachandrafoundation.org/).

### 3.1 Brand & theme ✅

| Item | Live WP | React app | Verdict |
| ---- | ------- | --------- | ------- |
| Font Kodchasan | ✅ | ✅ Google Fonts + `theme.css` | Match |
| Accent `#631318` | ✅ | ✅ | Match |
| Gold `#BC9D42` | ✅ | ✅ hover/active | Match |
| Body text `#7A7A7A` | ✅ | ✅ | Match |
| Footer bg `#1A1A1A` | ✅ | ✅ | Match |
| Max width ~1140px | ✅ | ✅ `container-site` | Match |
| Favicon / PWA icons | ✅ | ✅ favicon.io pack | Match |

### 3.2 Universal chrome ✅

| Item | Live WP | React app | Verdict |
| ---- | ------- | --------- | ------- |
| 5 nav links (labels + paths) | ✅ | ✅ `navLinks.ts` | Match |
| Skip to content | ✅ | ✅ | Match |
| Header logo → home | ✅ | ✅ `LogoSection` | Match |
| Sticky header | partial | ✅ white bar + shadow | **Improvement** (standards) |
| Mobile nav | duplicate WP menus | ✅ single drawer | **Improvement** |
| Active route styling | ✅ | ✅ underline accent | Match intent |
| Footer 3 columns | ✅ | ✅ About · Quick Links · Contact | Match |
| Footer copy | Organization blurb | ✅ `siteContact.ts` | Match |
| Contact address / phone / email | ✅ | ✅ | Match |
| Social Facebook / IG / YouTube | icons only, no URLs | ✅ linked | **Improvement** |
| Copyright © 2023 | ✅ | ✅ | Match |
| Social placement | under contact column | separate row above copyright | **Minor layout liberty** — same content |

### 3.3 Home page _partial_

| Item | Live WP | React app | Verdict |
| ---- | ------- | --------- | ------- |
| Hero carousel (4 slides) | ✅ Elementor | ✅ custom `HeroSlider` | Match content; better a11y/perf |
| Same H1 + intro on each slide | ✅ | ✅ `heroSlides.ts` | Match |
| Slide images (4 headers) | ✅ `header-1`, `header-3`, `header4`, `header-2` | ✅ corrected in `public/assets/home/` | Match (was wrongly using event headers) |
| Previous / Next | ✅ | ✅ chevron buttons + dots | Match intent |
| About section (extended + Read More) | ✅ below hero | ✅ `AboutSection` | Match content; real PDF button + lazy poster |
| Partners / Dover Lane strip | ✅ | ✅ `PartnersStrip` | Match content; refined gradient band |
| Gallery teaser | ✅ | ✅ `GalleryTeaser` | PCF title; PC Garden–style grid + gaps |
| Recent events (6 cards) | ✅ | ❌ **TODO** | **Gap — Phase 2** (ties to Phase 4 `events.ts`) |

### 3.4 Inner routes _partial_

| Route | Live WP | React app |
| ----- | ------- | --------- |
| `/our-inspiration` | full page | stub `<article>` + h1 |
| `/gallery` | image grid | stub |
| `/events` | archive + 9 details | stub |
| `/contact-us` | contact block | stub |

### 3.5 SEO, semantics & performance ✅

| Item | Status |
| ---- | ------ |
| `index.html` meta (description, geo, OG, Twitter) | ✅ |
| `useSEO` per route | ✅ home filled; others stub |
| [HTMLSemantics.md](./HTMLSemantics.md) | ✅ |
| [WebPerformanceSEO.md](./WebPerformanceSEO.md) | ✅ |
| Hero LCP preload (slide 1) | ✅ |
| Lazy routes + Suspense | ✅ |
| Custom FA subset | ✅ |
| `bun run lint` / `build` | ✅ |

### 3.6 Known intentional deviations

| Deviation | Why |
| --------- | --- |
| Footer social in own row | Clearer separation; same icons/links — acceptable liberty |
| Social URLs added | Live WP broken — required for usability |
| Hero bottom gradient overlay | Readability on photos — aligns with PC Chandra hero treatment |
| No Elementor / WP CSS | Performance + maintainability |
| `institution` in hero vs `Organization` in footer | Matches **different** WP sections — do not unify without stakeholder ask |

### 3.7 Gaps to close next (priority)

1. **Home:** RecentEvents (Phase 2).
2. **Inner pages:** Real content from scrape (Phases 3–5).
3. **Events:** Bengali titles preserved; filterable cards (Phase 4).
4. **OG image:** dedicated 1200×630 when assets ready (Phase 6).
5. **Phase 1 QA:** manual nav/mobile + logo CLS check.
6. **Hero slide order** — locked to WP Elementor order: `header-1` → `header-3` → `header4` → `header-2` (see [MigrationPlan §2.4](./MigrationPlan.md#24-image-assets-dataassetsimages)).

---

## 4. Decision checklist (before merging UI)

Ask on every PR:

1. **Content** — Copy/images from scrape or live site, not invented?
2. **Brand** — Uses `theme.css` tokens and Kodchasan?
3. **Structure** — Section order still matches live page architecture?
4. **Liberty** — Is the change an obvious UX/perf/a11y win, not a rebrand?
5. **Bengali** — Event/gallery text unchanged except typos approved by stakeholder?
6. **Semantics** — [HTMLSemantics.md](./HTMLSemantics.md) checklist?
7. **Performance** — [WebPerformanceSEO.md](./WebPerformanceSEO.md) checklist?

If a change fails (4) but passes (1–3), discuss before shipping.

---

## 5. Home page section order (locked)

Match live site top-to-bottom:

1. Hero carousel  
2. About (short intro + extended + Read More)  
3. Partners / Memorial Award + Dover Lane mention  
4. Gallery teaser  
5. Recent events (6 cards) — **TODO** (`RecentEvents.tsx`; shared event data with Phase 4)  

Footer is global via `SiteLayout` — not repeated on home only.

---

_Last updated: after Phase 1 complete + HeroSlider + HTML/meta audit._
