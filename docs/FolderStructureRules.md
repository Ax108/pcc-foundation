# Folder structure — rules

This document defines how code is organized in **`pcc-foundation-react-app`**. It adapts the same modular principles used in the React Native project (`FolderStructureRules.md` at workspace root), replacing **`features/`** with **`pages/`** for a route-driven web app.

**Scope:** layout and placement rules only — not implementation details. When this file and the repo disagree, **update this file** after intentional structural changes.

---

## Path notation

Paths below are relative to the **repository root** (`pcc-foundation-react-app/`).

| Form | Meaning |
| ---- | ------- |
| `src/pages/…`, `public/…`, `docs/…` | From repo root |
| `@src/…` | TypeScript path alias — see `tsconfig.app.json` |

Do not document machine-specific absolute paths. Run scripts from the repo root.

---

## Outside `src/` (brief)

### Repository root — configuration & static assets

Next to `src/` at the repo root: tooling and config only (e.g. `package.json`, `vite.config.ts`, `tsconfig.*`, ESLint/Prettier, `index.html`, `public/`).

| Path | Role |
| ---- | ---- |
| **`public/`** | Static files served as-is (favicons, images, `robots.txt`, `site.webmanifest`) |
| **`docs/`** | Markdown documentation (this file and future guides) |

**Rule:** product UI and domain logic live under **`src/`**. Keep the repo root thin — standard Vite/React layout.

---

## Top-level `src/` (allowed roots)

```
src/
├── App.tsx              ← app shell; stays here
├── Routing.tsx          ← route definitions; stays here
├── main.tsx             ← Vite entry; stays here
├── index.css            ← global styles entry
├── theme.css            ← design tokens
├── app/                 ← app shell module (SEO, icons, startup helpers)
├── constants/           ← app-wide constants (paths, config literals)
├── pages/               ← one folder per route / page module
├── shared/              ← cross-page UI, hooks, helpers, utils, types
└── store/               ← global state (e.g. Zustand) — optional; do not nest under pages/
```

### Do not add parallel legacy roots at `src/` level

Avoid top-level folders such as:

- `src/components/`
- `src/hooks/`
- `src/helpers/`
- `src/utils/`
- `src/screens/`

New domain code belongs under **`src/pages/<pageName>/`**, **`src/app/`** (shell-only), or **`src/shared/`**.

**Exceptions (fixed entry points only):**

- **`App.tsx`**, **`Routing.tsx`**, **`main.tsx`** — remain at `src/` root
- **`constants/`** — app-wide constants only (not page-specific)
- **`store/`** — global client state only

---

## App shell module (`src/app/`)

Cross-cutting **app-level** code used by the shell or many pages — not owned by a single route. Examples: `useSEO`, Font Awesome subset loader.

```
src/app/
├── hooks/          ← e.g. useSEO
└── utils/          ← e.g. icons.ts (loadFontAwesome)
```

**Rule:** if logic belongs to one page only, keep it under `pages/<pageName>/`. If reused broadly but is not generic UI, prefer `app/` before `shared/`.

---

## Page modules (`src/pages/`)

Each **route-facing page** gets its own folder. Use **lowercase** folder names (e.g. `home`, `contact`, `events`).

### Page entry file

The **route component** lives at the **root of the page folder** — not inside a `screens/` subfolder.

```
src/pages/
└── home/
    ├── Home.tsx              ← route entry (lazy-loaded from Routing.tsx)
    ├── components/
    ├── hooks/
    ├── helpers/
    ├── utils/                ← optional
    └── types/                ← optional
```

**Naming:** `<PageName>.tsx` at the page folder root (e.g. `Home.tsx`, `Contact.tsx`). This is the file `Routing.tsx` imports.

### Typical subfolders (use when the page needs them)

| Subfolder | Purpose |
| --------- | ------- |
| **`components/`** | UI used only by this page |
| **`hooks/`** | React hooks scoped to this page (`use*` logic, data fetching for this route) |
| **`helpers/`** | Domain glue / orchestration for this page (knows app concepts) |
| **`utils/`** | Small, page-local pure helpers (no React, minimal domain) |
| **`types/`** | TypeScript types owned by this page |

Add subfolders **only when needed**. A simple page may be only `<PageName>Page.tsx` until it grows.

### Page-local vs shared — promotion rule

| Question | If yes → |
| -------- | -------- |
| Used by **one page only**? | Keep under `pages/<PageName>/…` |
| Used by **two or more pages** (or app shell + page)? | Move to `shared/…` |

Before promoting to `shared/`, confirm reuse with search — avoid premature abstraction.

---

## Shared layer (`src/shared/`)

Cross-page code that is **reused** and should not live inside a single page module.

```
src/shared/
├── components/     ← layout, buttons, modals, nav chrome, etc.
├── hooks/          ← e.g. useSEO, useMediaQuery
├── helpers/        ← cross-page API/UX glue
├── utils/          ← pure primitives (icons loader, formatters)
└── types/          ← shared TypeScript types
```

**Rule:** `shared/` stays **domain-light** in `components/` and **generic** in `utils/`. Page-specific business logic stays in `pages/<PageName>/`.

---

## `helpers/` vs `utils/` — the distinction

Same rule as the React Native project:

**`utils/`** — low-level, pure helpers. No knowledge of a specific page’s business rules. Could theoretically live in any React project unchanged.

**`helpers/`** — domain glue. Knows about this app’s types, routes, content shapes, and orchestration. May import from `utils/`; **`utils/` must never import from `helpers/`**.

| Test | Place in |
| ---- | -------- |
| Could this function live in any React app unchanged? | `shared/utils/` or `pages/<Page>/utils/` |
| Does it need to know foundation-specific concepts (events, awards, page content)? | `shared/helpers/` or `pages/<Page>/helpers/` |

---

## Routing

- **`Routing.tsx`** (at `src/` root) defines routes and lazy-loads page entry files from `pages/<pageName>/<PageName>.tsx`.
- **`App.tsx`** wraps providers, layout shell, or global UI — keep it thin.
- Route paths and page folders should stay **easy to map** (e.g. `/` → `pages/home/Home.tsx`, `/contact` → `pages/contact/Contact.tsx`).

---

## Path aliases

Keep `tsconfig.app.json` and `vite.config.ts` in sync.

| Alias | Maps to |
| ----- | ------- |
| `@src/*` | `src/*` |
| `@app/*` | `src/app/*` |
| `@home/*` | `src/pages/home/*` |
| `@public/*` | `public/*` |

Add a **per-page alias** when a page module grows (e.g. `@contact/*` → `src/pages/contact/*`), same pattern as `@home/*`.

---

## Global constants & assets

| Location | Use |
| -------- | --- |
| **`src/constants/`** | App-wide literals (image path map, site URL, nav config) |
| **`public/`** | Files referenced by URL (`/assets/…`, favicons) |
| **`src/theme.css`** | Design tokens and base typography |

Page-specific constants belong in **`pages/<PageName>/`** (e.g. `types/` or a small `constants.ts` in that folder), not in global `constants/`, unless truly shared.

---

## Layering (quick reference)

| Layer | Belongs in | Avoid |
| ----- | ---------- | ----- |
| Route / page screen | `pages/<Page>/<Page>Page.tsx` | Top-level `src/screens/` |
| Page-only UI | `pages/<Page>/components/` | `shared/components/` until reused |
| Page-only hooks | `pages/<Page>/hooks/` | Top-level `src/hooks/` |
| Reusable hooks | `shared/hooks/` | Duplicating in every page |
| Feature glue | `pages/…/helpers/` or `shared/helpers/` | Mixing hooks into helper files |
| Pure helpers | `pages/…/utils/` or `shared/utils/` | Importing helpers from utils |

---

## Immutable / stable areas

Do not relocate without an intentional refactor:

- **`src/App.tsx`**, **`src/Routing.tsx`**, **`src/main.tsx`** — entry and routing
- **`src/constants/`** — global constants barrel
- **`src/store/`** — global Zustand (or similar); not per-page stores
- **`public/`** — static asset URLs referenced in HTML or constants

---

## Checklist before merge (structural changes)

- [ ] No forbidden extra roots directly under `src/` (page code under `pages/`, shared code under `shared/`).
- [ ] Each new route has a page folder with `<PageName>Page.tsx` at its root.
- [ ] Page-only files are not in `shared/`; shared files are not buried inside a single page folder.
- [ ] `helpers/` vs `utils/` dependency direction respected (`utils` does not import `helpers`).
- [ ] Imports use path aliases consistently (`@src/…`).
- [ ] `bun run tsc` and `bun run lint` pass.

---

## Relation to `Sample-temp-web-site`

The sample clinic app was built with full freedom on layout. **This repo follows the rules above** going forward. When porting patterns from the sample (SEO hook, icons subset, performance rules), place files according to this structure — e.g. `useSEO` → `app/hooks/`, icon loader → `app/utils/`.

---

_Last aligned with workspace: `app/hooks/useSEO`, `app/utils/icons`, `pages/home/Home.tsx`, aliases `@app` / `@home`._
