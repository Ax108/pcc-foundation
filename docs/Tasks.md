# Migration tasks

Trackable checklist for [MigrationPlan.md](./MigrationPlan.md) §6.

**Marking:** ✅ = done · `[ ]` = pending

**Scrape data:** See [MigrationPlan.md §2](./MigrationPlan.md#2-scraped-data--assets-github-workflow) — fetch `data/pratima_chandra_foundation/` from **`origin/master`** while on **`react-app-master`**.

**Quality gate after every phase:**

```bash
bun run lint
bun run build
```

---

## Phase 0 — Bootstrap ✅

- ✅ Vite + React 19 + TypeScript + Tailwind v4 scaffold
- ✅ Theme tokens (`theme.css`) from scraped Elementor colors
- ✅ Kodchasan font + FA subset (`app/utils/icons.ts`)
- ✅ `useSEO` hook stub (`app/hooks/useSEO.ts`)
- ✅ Favicon.io pack in `public/`
- ✅ Core brand assets (logo, hero, partners)
- ✅ Lazy routing + stub `pages/home/Home.tsx`
- ✅ Path aliases `@app`, `@home`
- ✅ Folder structure docs
- ✅ Web performance & SEO standards doc (`docs/WebPerformanceSEO.md`)
- ✅ HTML semantics doc (`docs/HTMLSemantics.md`)
- ✅ Design guidelines + audit (`docs/DesignGuidelines.md`)

---

## Phase 1 — Nav + footer ✅

Universal chrome in **`src/navigationBars/`**. Mounted from `Routing.tsx` via `SiteLayout` wrapping all routes.

### 1.1 Setup ✅

- ✅ Add `@navigationBars/*` alias → `src/navigationBars/*` in `vite.config.ts` + `tsconfig.app.json`
- ✅ Update [FolderStructureRules.md](./FolderStructureRules.md) — document `src/navigationBars/`
- ✅ Create folder skeleton:

  ```
  src/navigationBars/
  ├── TopNavBar.tsx
  ├── Footer.tsx
  ├── SiteLayout.tsx
  ├── constants/
  │   ├── navLinks.ts          ✅
  │   └── siteContact.ts       ✅
  ├── hooks/
  │   └── useMobileNav.ts
  └── components/
      ├── LogoSection.tsx
      ├── NavLinks.tsx
      ├── MobileMenu.tsx
      ├── MobileMenuToggle.tsx
      ├── SkipToContentLink.tsx
      ├── ScrollToTop.tsx
      ├── FooterAboutSection.tsx
      ├── FooterQuickLinks.tsx
      ├── FooterContactInfo.tsx
      ├── FooterSocialLinks.tsx
      └── FooterCopyright.tsx
  ```

### 1.2 Constants (from scrape / live site)

- [ ] Fetch scrape locally if missing: `git fetch origin master && git checkout origin/master -- data/pratima_chandra_foundation` ([MigrationPlan §2.2](./MigrationPlan.md#22-quick-start-for-front-end-devs))
- ✅ Read contact + nav copy from `data/.../site_data.json` or `website_data.md` ([MigrationPlan §2.8](./MigrationPlan.md#28-text--contact-content-from-scrape))
- ✅ `navLinks.ts` — 5 items: Home `/`, Our Inspiration `/our-inspiration`, Gallery `/gallery`, Events `/events`, Contact Us `/contact-us`
- ✅ `siteContact.ts` — address, phone, email, social URLs (Facebook, Instagram, YouTube), copyright string
- ✅ Reuse `IMAGES.LOGO_HEADER` from `@src/constants/images`

### 1.3 TopNavBar ✅

- ✅ `LogoSection` — linked logo, explicit width/height, no CLS
- ✅ `NavLinks` — desktop horizontal links, active state via `NavLink`
- ✅ `MobileMenu` — hamburger (`fa-bars` / `fa-xmark`), overlay panel, Escape to close
- ✅ `TopNavBar` — compose logo + links + mobile toggle; sticky top; white surface + subtle shadow (AstraX-style)
- ✅ Skip link “Skip to content” (accessibility, matches WP)
- ✅ Add any new FA icons to `app/utils/icons.ts` only if needed (bars, xmark already present)

### 1.4 Footer ✅

- ✅ Three columns: **About the Foundation** · **Quick Links** (same as nav) · **Contact Info**
- ✅ Social row — FA brand icons, external links `rel="noopener noreferrer"`
- ✅ Dark background `bg-footer` / `#1A1A1A`, light text
- ✅ Copyright bar

### 1.5 Layout integration ✅

- ✅ `SiteLayout` — `{children}` between TopNavBar and Footer; min-height viewport
- ✅ Update `Routing.tsx` — wrap `<Routes>` in `<SiteLayout>`
- ✅ Placeholder routes (empty pages OK) for nav links so links don’t 404:
  - ✅ `/our-inspiration`
  - ✅ `/gallery`
  - ✅ `/events`
  - ✅ `/contact-us`
- ✅ Scroll to top on route change
- ✅ Page aliases: `@inspiration`, `@gallery`, `@events`, `@contact` in vite + tsconfig

### 1.6 Phase 1 QA

- [ ] Desktop + mobile nav manual check
- [ ] Active link highlights on `/`
- ✅ `bun run lint` pass
- ✅ `bun run build` pass
- [ ] No layout shift on logo load

---

## Phase 2 — Home page (in progress)

**Section order must match live site** — see [DesignGuidelines.md §5](./DesignGuidelines.md#5-home-page-section-order-locked).

- ✅ Copy hero slider images from `data/.../assets/images/` → `public/assets/home/` — **`header-1`, `header-3`, `header4`, `header-2`** (not event `Header2022` / `featured-image-1`)
- ✅ `pages/home/components/HeroSlider.tsx` — accessible carousel; preload first slide
- ✅ `AboutSection.tsx` — intro + extended text from scrape; 2025 poster + PDF download; lazy poster
- ✅ `PartnersStrip.tsx` — Memorial Award + Dover Lane associates band
- ✅ `GalleryTeaser.tsx` — 8 images from WP home widget; links to `/gallery`
- [ ] **`RecentEvents.tsx`** — 6 event cards on home (**remaining Phase 2 item**)
  - Broader scope: reuse event metadata from Phase 4 (`src/content/events.ts`, Bengali titles, featured images, legacy slugs)
  - Interim option: home-only constants from scrape until `events.ts` lands
- ✅ Fill `useSEO` for `/`
- ✅ Update `index.html` LCP preload if hero becomes LCP element

**Phase 2 exit criteria:** all five home sections shipped (last gap = Recent events).

---

## Phase 3 — Our Inspiration + Contact

### Our Inspiration

- ✅ Create `pages/our-inspiration/` + `@inspiration/*` alias (stub page only)
- [ ] Copy mentor images to `public/assets/inspiration/`
- [ ] `OurInspiration.tsx` + components for intro + mentor cards (real content)
- [ ] `useSEO` entry

### Contact

- ✅ Create `pages/contact-us/` + `@contact/*` alias (stub page only)
- [ ] `ContactUs.tsx` — Quick Contact block from scrape
- [ ] `useSEO` entry

---

## Phase 4 — Events

- ✅ Create `pages/events/` + `@events/*` alias (stub page only)
- [ ] Create `src/content/events.ts` from `site_data.json` ([MigrationPlan §5.3](./MigrationPlan.md#53-data-strategy))
- [ ] Define clean slugs + legacy URL map
- [ ] `pages/events/Events.tsx` — list with series filter
- [ ] `pages/events/EventDetail.tsx` — dynamic `:eventSlug`
- [ ] Shared `EventCard.tsx`, `EventMeta.tsx`, `EventGallery.tsx`
- [ ] Copy event images per year to `public/assets/events/`
- [ ] `useSEO` per event route

---

## Phase 5 — Gallery

- ✅ Create `pages/gallery/` + `@gallery/*` alias (stub page only)
- [ ] Build image manifest from scrape (`images.csv` filtered by gallery page)
- [ ] Copy images to `public/assets/gallery/`
- [ ] Responsive grid + lazy loading
- [ ] Optional lightbox component in `pages/gallery/components/`
- [ ] `useSEO` entry

---

## Cross-cutting standards

- ✅ [DesignGuidelines.md](./DesignGuidelines.md) — brand vs liberty; shipped audit
- ✅ [HTMLSemantics.md](./HTMLSemantics.md) — semantic HTML + meta tag conventions
- ✅ [WebPerformanceSEO.md](./WebPerformanceSEO.md) — Core Web Vitals + SEO

---

## Phase 6 — Assets, SEO, launch content

- [ ] Bulk-copy remaining scraped images (only those referenced in content)
- [ ] Create 1200×630 OG image → `public/assets/og/og-image.jpg`
- [ ] Fill all `useSEO` descriptions/keywords
- [ ] JSON-LD: `Organization` sitewide; `Event` on detail pages
- [ ] `public/sitemap.xml` generation
- [ ] Document redirects in `docs/Redirects.md`
- [ ] Remove stub/placeholder copy

---

## Phase 7 — Launch prep

- [ ] Lighthouse mobile audit (LCP, CLS, INP)
- [ ] Cross-browser smoke test
- [ ] Bengali typography check on event titles
- [ ] 301 redirect map at host (Cloudflare / nginx / Netlify)
- [ ] Final content review with stakeholder

---

## Shared components backlog (create in `src/shared/` as needed)

- [ ] `SectionHeading.tsx`
- [ ] `Container.tsx` (wraps `container-site`)
- [ ] `Button` / `TextLink`
- [ ] `ImageFigure.tsx` — img + width/height + lazy defaults
- [ ] `PageHero.tsx` — inner page title banner

---

## Notes

- **Do not** commit the full scrape tree to `react-app-master` unless the team agrees — fetch from **`master`** locally ([MigrationPlan §2](./MigrationPlan.md#2-scraped-data--assets-github-workflow)).
- **Never** copy `data/.../assets/site-assets/` (WordPress/Elementor) into `public/`.
- New page folder → add matching `@alias` in vite + tsconfig.
- Keep [MigrationPlan.md](./MigrationPlan.md) and [Tasks.md](./Tasks.md) in sync when routes or scope change — mark completed items with ✅.
