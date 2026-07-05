# HTML semantics

Rules for semantic markup in **`pcc-foundation-react-app`**. Good semantics help accessibility, SEO, and maintainability. Pair with [WebPerformanceSEO.md](./WebPerformanceSEO.md) for meta tags and Core Web Vitals.

---

## Document shell

| Element | Where | Rule |
| ------- | ----- | ---- |
| `<html lang="en">` | `index.html` | Always set `lang`; add `bn` spans only inside copy when needed |
| `<title>` + meta | `index.html` defaults | Filled with real home defaults; **`useSEO`** updates per route |
| `<main id="main-content">` | `SiteLayout.tsx` | **One** main landmark per page — route content only |
| Skip link | `SkipToContentLink.tsx` | First focusable element in header; targets `#main-content` |

---

## Landmarks (universal chrome)

| Region | Element | Notes |
| ------ | ------- | ----- |
| Site header | `<header>` | `TopNavBar` — logo + primary nav |
| Primary nav | `<nav aria-label="Primary">` | Desktop `NavLinks`; mobile `#mobile-primary-nav` |
| Site footer | `<footer>` | `Footer` — about, quick links, contact, social |
| Footer quick links | `<nav aria-labelledby="…">` | Same routes as top nav |
| Footer social | `<nav aria-label="Social media">` | External links only |

Do **not** nest `<main>` inside `<header>` or `<footer>`. Do **not** duplicate primary nav without an accessible name when multiple `<nav>` exist.

---

## Headings

- **One `<h1>` per page** — the page topic (or active hero slide on home).
- Do not hide multiple `<h1>` in the DOM; render the hero title only on the **active** slide.
- Footer column titles use **`<h2>`** (`FooterColumnHeading`) — correct depth under the page `h1`.
- Stub inner pages: single `<h1>` matching the route name.

Heading order: `h1` → `h2` → `h3` without skipping levels within a section.

---

## Page content (`src/pages/`)

| Pattern | Use |
| ------- | --- |
| `<article>` | Primary content of a route (about, gallery, event detail) |
| `<section>` | Thematic blocks inside a page (with `aria-labelledby` when helpful) |
| `<aside>` | Tangential content (sidebar teasers — if added later) |
| `<address>` | Contact details in footer / contact page — **not** for arbitrary text |

Avoid bare `<div>` as the only wrapper when a semantic element fits.

**Stub pages (current):**

```tsx
<article className="container-site py-12">
  <h1>Gallery</h1>
  <p>…</p>
</article>
```

---

## Home page (`/`)

The home route is one **`<article aria-label="Home">`** inside `<main id="main-content">`. Section order matches the live site.

| # | Section | Element | Heading / label |
| - | ------- | ------- | ----------------- |
| 1 | Hero carousel | `<section aria-roledescription="carousel" aria-label="Foundation highlights">` | **`<h1>`** on active slide only |
| 2 | About | `<section aria-labelledby="home-about-heading">` | **`<h2 id="home-about-heading">`** |
| 3 | Partners strip | `<section aria-label="Memorial Award partners">` | No heading — descriptive `aria-label` |
| 4 | Gallery teaser | `<section aria-labelledby="home-gallery-heading">` | **`<h2 id="home-gallery-heading">`** — “Our Gallery” |
| 5 | Recent events | `<section aria-labelledby="home-events-heading">` | **`<h2>`** (when built) |

**Gallery teaser grid:** `<ul aria-label="Foundation event photo highlights">` — each cell is `<li>` + `<Link>` to `/gallery` with descriptive `aria-label`. Images use meaningful `alt` from `homeGalleryTeaser.ts`.

**Do not** add a second `<h1>` on home. Footer `<h2>` columns remain valid under the page `h1`.

---

## Home about section

| Element | Rule |
| ------- | ---- |
| Section | `<section aria-labelledby="home-about-heading">` |
| Heading | **`<h2>`** — page `h1` stays on the active hero slide only |
| Poster | `<figure>` + `<img>` with lazy load; `<figcaption>` holds PDF download link |
| Read More | `<Link>` to `/our-inspiration` — real button, not image-only |

---

## Home hero carousel

Follow the [WAI carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/):

| Piece | Markup |
| ----- | ------ |
| Container | `<section aria-roledescription="carousel" aria-label="…">` |
| Slide change | `aria-live="polite"` status text (sr-only) |
| Prev / next | `<button type="button" aria-label="Previous slide">` |
| Pagination | `<div role="group" aria-label="Slide pagination">` + buttons with `aria-current="true"` on active dot |
| Decorative overlay | `aria-hidden="true"` on gradient layers |
| Icons | `<i aria-hidden="true">` when a text label exists on the control |

Do **not** use `role="tablist"` / `role="tab"` without `tabpanel` siblings.

---

## Links and buttons

- **Navigation** → `<a href>` or React Router `<Link>` / `<NavLink>`.
- **Actions** (menu toggle, carousel, submit) → `<button type="button">`.
- External links → `rel="noopener noreferrer"` + `target="_blank"`.
- Phone / email → `<a href="tel:…">` / `<a href="mailto:…">` inside `<address>` where appropriate.

---

## Images

- Meaningful **`alt`** on content images; empty `alt=""` only for purely decorative images.
- Hero slides: descriptive `alt` per slide in `heroSlides.ts`.
- Logo link: `aria-label` on the link if `alt` on the image is sufficient, or rely on image `alt` alone — not both redundantly.

---

## Meta tags (`index.html` + `useSEO`)

Defaults in **`index.html`** must be **non-empty** for title, description, keywords, Open Graph, Twitter, canonical, and geo (Kolkata).

**`useSEO`** (in `app/hooks/useSEO.ts`) syncs per-route:

- `document.title`
- `meta[name="title"]`, `description`, `keywords`
- `og:*` and `twitter:*` tags
- `link[rel="canonical"]`

When adding a route, update **`seoPages`** in `useSEO.ts` and keep **`index.html`** home defaults aligned.

Optional later: `og:image:width` / `height` when `public/assets/og/og-image.jpg` (1200×630) exists.

---

## Checklist before merge (UI PR)

- [ ] Exactly one `<h1>` visible per route
- [ ] Landmarks: `header`, `nav`, `main`, `footer` used correctly
- [ ] Interactive controls are `<button>` or `<a>`, not `<div onClick>`
- [ ] Carousels / menus have accessible names and keyboard support
- [ ] New route has `useSEO` entry + sensible meta copy
- [ ] `bun run lint` and `bun run build` pass

---

## Related docs

- [DesignGuidelines.md](./DesignGuidelines.md) — brand tokens vs UX liberty
- [WebPerformanceSEO.md](./WebPerformanceSEO.md) — LCP, preload, meta / SEO
- [FolderStructureRules.md](./FolderStructureRules.md) — where components live
- [MigrationPlan.md](./MigrationPlan.md) — content and routes
