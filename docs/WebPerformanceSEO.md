# Web performance & SEO

Standards for the **Pratima Chandra Foundation** React app (`pcc-foundation-react-app`). Every UI change should keep [Core Web Vitals](https://web.dev/vitals/) in a good range — especially **LCP**, **CLS**, and **INP**.

This document lives in **`docs/`** so all contributors can read it from the repo. It is the single source of truth for performance and SEO conventions in this project.

---

## Why this matters

The live WordPress site is being replaced with a static React build. Search ranking, mobile usability, and first impressions depend on:

- **Fast first paint** — hero/logo and primary content appear quickly.
- **Stable layout** — nothing jumps when fonts or images load.
- **Responsive interaction** — menus, links, and forms feel instant.
- **Correct metadata** — titles, descriptions, and social previews match each route.
- **Semantic HTML** — landmarks, headings, and controls follow [HTMLSemantics.md](./HTMLSemantics.md).

These rules apply to **every PR** that touches layout, images, fonts, routing, or page content.

**Mandatory:** Before shipping UI, confirm changes against the [Core Web Vitals targets](#core-web-vitals-targets) and the [verification checklist](#verification-before-merge). WordPress Elementor patterns (unoptimized images, duplicate DOM, render-blocking widgets) are **not** acceptable in this app.

## Core Web Vitals (targets)

| Metric | What it measures | Project goal |
| ------ | ---------------- | ------------ |
| **LCP** | Largest visible content (usually hero or logo) | ≤ 2.5 s on mid-tier mobile |
| **CLS** | Unexpected layout movement | ≤ 0.1 |
| **INP** | Responsiveness to taps/clicks/keys | ≤ 200 ms |

Use Lighthouse or Chrome DevTools **Performance** panel when changing above-the-fold UI.

---

## LCP (Largest Contentful Paint)

The LCP element on most pages is the **header logo** or a **home hero image**.

### Rules

1. **Preload the LCP image** in `index.html`:
   - `rel="preload" as="image" fetchpriority="high"`
   - The preloaded URL must match **`src/constants/images.ts`** exactly (same path, no typos).

2. **Above-the-fold images** (`<img>`):
   - Set explicit **`width`** and **`height`** (or CSS `aspect-ratio`).
   - Use **`fetchPriority="high"`** on the LCP candidate.
   - Do **not** use `loading="lazy"` on above-the-fold images.

3. **Asset size**:
   - Serve from **`public/`** with appropriately compressed files.
   - Do not link multi-megabyte originals from the scrape folder in production UI.

4. **Hero slider (home, when built)**:
   - Preload **only the first slide**.
   - Lazy-load subsequent slides.

### Where in the repo

| Concern | Location |
| ------- | -------- |
| LCP preload tags | `index.html` |
| Image paths & dimensions | `src/constants/images.ts` |
| Header logo usage | `src/navigationBars/components/LogoSection.tsx` |

---

## CLS (Cumulative Layout Shift)

Layout shift hurts readability and fails Core Web Vitals when logos, fonts, or embeds resize the page after paint.

### Rules

1. **Every `<img>`** must have **`width` + `height`** (from `IMAGE_DIMENSIONS` in `images.ts`) or a fixed **`aspect-ratio`** container.

2. **Fonts**:
   - Kodchasan loads from Google Fonts with **`display=swap`**.
   - Keep **`preconnect`** to `fonts.googleapis.com` and `fonts.gstatic.com` in `index.html`.

3. **Font Awesome subset**:
   - Preload the woff2 files used by `loadFontAwesome()` in `index.html` (solid + brands).
   - Icons reserve space via fixed-size containers where needed (e.g. nav toggle button).

4. **Embeds & dynamic content**:
   - YouTube, maps, or iframes need a wrapper with fixed **aspect-ratio** before the embed loads.
   - Do not inject banners or alerts above existing content after first paint without reserved height.

5. **Navigation**:
   - Sticky header uses a fixed min-height (`--topnav-height`) so the mobile menu does not shift the bar.

---

## INP (Interaction to Next Paint)

Keep the main thread free so taps and route changes feel immediate.

### Rules

1. **Route-level code splitting** — all pages are **`React.lazy`** + **`Suspense`** in `Routing.tsx`. Do not import page modules synchronously at the app root.

2. **Avoid heavy work on click** — defer non-critical logic; do not block the UI thread on large JSON parsing in event handlers.

3. **Mobile menu** — open/close is CSS + local state only; body scroll lock is scoped to `useMobileNav`.

4. **React Compiler** is enabled in Vite — prefer simple components over manual memoization unless profiling shows a need.

---

## Fonts & icons

This project intentionally avoids heavy icon npm packages.

| Do | Don't |
| -- | ----- |
| Kodchasan via Google Fonts + `preconnect` | Self-host full font families without reason |
| Custom FA subset in `src/app/utils/icons.ts` via `loadFontAwesome()` | `@fortawesome/*` or `react-icons` packages |
| Add only icons we use; preload their woff2 in `index.html` | Import entire FA CSS from CDN |

Call **`loadFontAwesome()`** once at app startup (`main.tsx`). Add new icon class names to the subset and preload list together.

---

## Images

Centralize paths and dimensions in **`src/constants/images.ts`**.

| Zone | `loading` | `decoding` | `fetchPriority` |
| ---- | --------- | ---------- | --------------- |
| Header logo, hero first slide | default (eager) | `async` | `high` |
| Below-the-fold, gallery, event cards | `lazy` | `async` | default |

Use **correct file sizes** — the header logo asset is not the same as the Open Graph image. OG images can be larger; inline UI images should be compressed for web.

### Home about section (below hero)

The application poster is **not** LCP — do not preload it.

1. Serve the **768×612** (or similar) scrape variant, not the 2MB+ original.
2. Set **`loading="lazy"`** and explicit **`width` + `height`** from `IMAGE_DIMENSIONS.HOME_APPLICATION_POSTER`.
3. PDF download is a plain `<a href="…pdf" download>` — no iframe embed.
4. Keep copy in **`pages/home/constants/aboutContent.ts`**; register asset paths in **`images.ts`**.

---

## JavaScript & routing

- **Lazy-load** every route page in `Routing.tsx`.
- Keep **`App.tsx`** and **`main.tsx`** thin — providers and startup only.
- Shared chrome (`TopNavBar`, future footer) lives in **`src/navigationBars/`** and ships with the initial bundle; keep it lean.
- Do not add third-party scripts to `index.html` without documenting impact on LCP/INP.

---

## SEO

Each route must call **`useSEO()`** from `src/app/hooks/useSEO.ts` with:

- Page **title** and **meta description**
- **Canonical** URL
- **Open Graph** / Twitter tags where applicable

Defaults and fallbacks live in **`index.html`**. Per-route values in `useSEO` must stay consistent with those defaults (site name, default OG image, locale).

When page content is ready, add **JSON-LD** structured data (Organization on home, Event on event detail pages, etc.). Stubs are fine until copy is final.

### Checklist per new page

- [ ] `useSEO({ title, description, path })` in the page component
- [ ] Route registered in `Routing.tsx` (lazy)
- [ ] Nav link added in `navigationBars/constants/navLinks.ts` if top-level
- [ ] Images use `images.ts` constants with width/height

---

## Files to touch when adding UI

| Change | Update |
| ------ | ------ |
| New above-the-fold image | `images.ts`, `index.html` preload if LCP, component `width`/`height` |
| New icon | `app/utils/icons.ts`, `index.html` woff2 preload |
| New route | `Routing.tsx`, `useSEO` on page, optional `navLinks.ts` |
| New font | `index.html` preconnect + `theme.css` / `index.css` only if approved |

---

## Verification before merge

```bash
bun run lint
bun run build
```

Manual checks when changing layout or images:

- [ ] No visible layout jump on hard refresh (logo, nav, hero)
- [ ] Mobile menu opens without shifting the header
- [ ] Lighthouse Performance ≥ 90 on home (local production preview)
- [ ] Network tab shows LCP image preloaded with high priority

---

## Related docs

- [HTMLSemantics.md](./HTMLSemantics.md) — landmarks, headings, carousel a11y
- [MigrationPlan.md](./MigrationPlan.md) — content migration and architecture
- [FolderStructureRules.md](./FolderStructureRules.md) — where code lives (`navigationBars/`, `pages/`, `app/`)
- [Tasks.md](./Tasks.md) — phased checklist

---

_Last updated: moved from `.cursor/rules/` to `docs/` so all contributors share the same standards._
