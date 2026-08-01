import {assetUrl} from '@src/constants/assetBase';

// #genai — Centralized media paths (hosted via pcc-data + VITE_ASSET_BASE_URL).
// Keep preload URLs in index.html in sync with HERO_SLIDE_1.

export const IMAGES = {
  /** Header / navbar — 1024×173 source; rendered up to 320×54 on lg */
  LOGO_HEADER: assetUrl('/assets/logo/logo-header.png'),

  /** OG / Twitter / schema — full logo, no resize yet */
  LOGO_FULL: assetUrl('/assets/logo/logo-full.png'),

  /** Narrow header strip (not home carousel) */
  HERO_HEADER: assetUrl('/assets/hero/header6.jpg'),

  /** Home hero carousel — slide 1 is LCP on `/` (see docs/MigrationPlan §2.4) */
  HERO_SLIDE_1: assetUrl('/assets/home/slide-1-header-1.jpg'),
  HERO_SLIDE_2: assetUrl('/assets/home/slide-2-header-3.jpg'),
  HERO_SLIDE_3: assetUrl('/assets/home/slide-3-header4.jpg'),
  HERO_SLIDE_4: assetUrl('/assets/home/slide-4-header-2.jpg'),

  /** Home about — 2026 Aruprataner Sandhane application poster (below hero) */
  HOME_APPLICATION_POSTER: assetUrl('/assets/home/aruprataner-2026-poster.jpg'),

  /** PDF linked from about poster — lazy route, not LCP */
  APPLICATION_FORM_2026_PDF:
    assetUrl('/assets/documents/aruprataner-sandhane-2026-form.pdf'),
  APPLICATION_FORM_2025_PDF:
    assetUrl('/assets/documents/aruprataner-sandhane-2026-form.pdf'),

  /** Partner / associates mark */
  ASSOCIATES_LOGO: assetUrl('/assets/partners/associates-logo.png'),

  /** PWA / schema — favicon.io from icon-source-512 */
  SITE_ICON: '/android-chrome-192x192.png',
  SITE_ICON_LARGE: '/android-chrome-512x512.png',
} as const;

/** Display dimensions for CLS — match rendered CSS size × retina where noted */
export const IMAGE_DIMENSIONS = {
  LOGO_HEADER: { width: 320, height: 54 },
  /** Home carousel — WP `header-*` large size 1024×337 */
  HERO_SLIDE: { width: 1024, height: 337 },
  /** 2026 application poster — WP 768×612 variant */
  HOME_APPLICATION_POSTER: { width: 768, height: 612 },
  /** Associates emblem — source PNG (square) */
  ASSOCIATES_LOGO: { width: 150, height: 150 },
  SITE_ICON: { width: 192, height: 192 },
  APPLE_TOUCH_ICON: { width: 180, height: 180 },
} as const;
