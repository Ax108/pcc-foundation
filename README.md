# Pratima Chandra Foundation — React Web App

Modern React rebuild of [pratimachandrafoundation.org](https://pratimachandrafoundation.org/) — faster, accessible, and aligned with [Core Web Vitals](https://web.dev/vitals/), while preserving foundation brand and content.

> **Status:** Phase 0–1 complete. **Phase 2 home (partial):** hero, about, partners strip, and gallery teaser are shipped. **Recent events** (6 cards) and full inner-page content are still pending — see [Next up](#next-up).

---

## Repository & branches

Everything lives in **[Ax108/pcc-foundation](https://github.com/Ax108/pcc-foundation)** (one repo, two branches):

| Branch | Contents |
| ------ | -------- |
| **`master`** | Python scraper + scraped data under `data/pratima_chandra_foundation/` |
| **`react-app-master`** | This Vite React app (`src/`, `public/`, `docs/`, …) at **repo root** |

> **Local folder name** (e.g. `pcc-foundation-react-app`) is only a clone directory — on GitHub the app files are at the clone root on **`react-app-master`**, not in a subfolder.

### Pull scrape data while on the React branch

```bash
git fetch origin master
git checkout origin/master -- data/pratima_chandra_foundation
```

Copy selected files from `data/.../assets/images/` into `public/assets/` as pages are built. See [docs/MigrationPlan.md §2.4](./docs/MigrationPlan.md#24-image-assets-dataassetsimages).

---

## What's built

| Area | Status |
| ---- | ------ |
| Bootstrap (Vite, React 19, TS, Tailwind v4, theme tokens) | ✅ |
| Universal chrome — sticky `TopNavBar`, `Footer`, `SiteLayout` | ✅ |
| All 5 routes wired (lazy-loaded) | ✅ |
| Home — accessible hero carousel (4 slides) | ✅ |
| Home — about section (poster + PDF + Read More) | ✅ |
| Home — partners memorial-award strip | ✅ |
| Home — gallery teaser (8 photos → `/gallery`) | ✅ |
| Home — **recent events** (6 cards) | **TODO** — Phase 2; shares data with Phase 4 |
| Inner pages (Inspiration, Gallery, Events list, Contact) | Stubs only |

Full checklist: [docs/Tasks.md](./docs/Tasks.md) · Architecture: [docs/MigrationPlan.md](./docs/MigrationPlan.md)

---

## Next up

| Priority | Work | Docs |
| -------- | ---- | ---- |
| **1** | Home **`RecentEvents`** — 6 cards below gallery teaser | [Tasks.md § Phase 2](./docs/Tasks.md#phase-2--home-page-in-progress) |
| **2** | Shared **`src/content/events.ts`** from scrape (Bengali titles, dates, slugs) | [Tasks.md § Phase 4](./docs/Tasks.md#phase-4--events) |
| **3** | Inner routes — Inspiration, Gallery grid, Events archive, Contact | Phases 3–5 |

Home section order (locked): Hero → About → Partners → Gallery teaser → **Recent events** → footer (global).

---

## Stack

- **UI:** React 19, TypeScript, Vite 8, React Compiler (Babel)
- **Routing & state:** React Router 7, Zustand, Immer
- **Styling:** Tailwind CSS v4, Kodchasan (Google Fonts), design tokens in `src/theme.css`
- **Icons:** Custom Font Awesome subset (`src/app/utils/icons.ts`) — no FA npm packages
- **Tooling:** Bun, ESLint (flat config), Prettier, Fallow

---

## Setup

```bash
git checkout react-app-master
npm install
npm run dev
```

Dev server: [http://localhost:5173](http://localhost:5173)

---

## Scripts

| Command | Purpose |
| ------- | ------- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck + production build → `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (src) |
| `npm run tsc` | Typecheck only |

**Quality gate** (run after UI changes):

```bash
npm run lint && npm run build
```

## Netlify deployment

This branch is ready for Netlify using the checked-in `netlify.toml`.

| Setting | Value |
| ------- | ----- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `22` |

`netlify.toml` also includes the SPA fallback redirect from `/*` to `/index.html`, so direct visits to React Router routes such as `/gallery` and `/events` work after deployment.

---

## Project layout

```
src/
├── app/                 hooks (useSEO), utils (icons), routing
├── navigationBars/      TopNavBar, Footer, SiteLayout, nav constants
├── pages/               route modules (home, gallery, events, …)
├── constants/           images.ts — centralized public asset paths
├── theme.css            brand tokens (colors, container width)
└── index.css            global utilities + section overrides

public/
├── assets/              static images, PDFs (served at /assets/…)
├── favicon.*            PWA / favicon pack
└── robots.txt

docs/                    migration plan, tasks, design & performance standards
.cursor/rules/           agent rules (e.g. Core Web Vitals)
```

Path aliases (`vite.config.ts` + `tsconfig.app.json`): `@src`, `@app`, `@navigationBars`, `@home`, `@inspiration`, `@gallery`, `@events`, `@contact`, `@public`.

Folder rules: [docs/FolderStructureRules.md](./docs/FolderStructureRules.md)

---

## Static assets (`public/assets/`)

Images and PDFs live under **`public/assets/`**, not `src/assets/`.

| Why `public/` | Detail |
| ------------- | ------ |
| Stable URLs | `/assets/home/slide-1-header-1.jpg` — used in `index.html` LCP preload and `src/constants/images.ts` |
| Scrape workflow | Copy compressed variants from `data/.../assets/images/` with predictable names |
| PDFs & OG | Direct links without import/hashing |

Register every UI asset path in **`src/constants/images.ts`** with explicit `width` / `height` for CLS. See [docs/WebPerformanceSEO.md](./docs/WebPerformanceSEO.md).

---

## Documentation

| Doc | Purpose |
| --- | ------- |
| [MigrationPlan.md](./docs/MigrationPlan.md) | WordPress → React plan, scrape workflow, asset mapping |
| [Tasks.md](./docs/Tasks.md) | Phased checklist with ✅ progress |
| [DesignGuidelines.md](./docs/DesignGuidelines.md) | Brand vs liberty bounds; reference-site patterns |
| [WebPerformanceSEO.md](./docs/WebPerformanceSEO.md) | **Core Web Vitals** (LCP, CLS, INP), SEO, image rules |
| [HTMLSemantics.md](./docs/HTMLSemantics.md) | Landmarks, headings, carousel a11y |
| [FolderStructureRules.md](./docs/FolderStructureRules.md) | Where code and files belong |

**Design principle:** Improve UX, performance, and accessibility using AstraX / PC Chandra patterns — keep PCF brand, copy, nav labels, and home section order from the live WordPress site.

---

## License

Proprietary. All rights reserved.
