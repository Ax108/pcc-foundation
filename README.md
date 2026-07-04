# Pratima Chandra Foundation — React Web App

Modern React website for [Pratima Chandra Foundation](https://pratimachandrafoundation.org/).

> **Status:** Under active development. This branch contains the initial project setup only.

## Branch

| Branch | Purpose |
|--------|---------|
| `master` | Python scraper and scraped site data |
| `react-app-master` | React web application (this branch) |

Scraped content and assets live in the separate **`pcc-foundation`** repository. This app will consume that data as the UI is built out.

## Stack

- **Runtime:** React 19, TypeScript, Vite 8
- **Routing & state:** React Router, Zustand, Immer
- **Styling:** Tailwind CSS v4
- **Tooling:** Bun, ESLint (flat config), Prettier, Fallow
- **Compiler:** React Compiler (via Babel)

## Path aliases

| Alias | Resolves to |
|-------|-------------|
| `@src` | `./src` |
| `@public` | `./public` |
| `@` | project root |

Configured in both `vite.config.ts` and `tsconfig.app.json`.

## Setup

```bash
bun install
```

## Scripts

```bash
bun dev       # start dev server
bun run build # typecheck + production build
bun run lint  # ESLint
bun run format
bun run tsc   # typecheck only
bun run preview
```

## License

Proprietary. All rights reserved.
