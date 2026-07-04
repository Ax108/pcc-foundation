// Centralized image paths — scraped from pcc-foundation/data (local public assets).
// Keep preload URLs in index.html in sync with these paths.

export const IMAGES = {
  /** Header / navbar — 1024×173 source, displayed ~320px wide */
  LOGO_HEADER: '/assets/logo/logo-header.jpg',

  /** OG / Twitter / schema — full logo, no resize yet */
  LOGO_FULL: '/assets/logo/logo-full.jpg',

  /** Hero banner background — preload candidate for LCP when used as hero */
  HERO_HEADER: '/assets/hero/header6.jpg',

  /** Partner / associates mark */
  ASSOCIATES_LOGO: '/assets/partners/associates-logo.png',

  /** PWA / schema — favicon.io from icon-source-512 */
  SITE_ICON: '/android-chrome-192x192.png',
  SITE_ICON_LARGE: '/android-chrome-512x512.png',
} as const;

/** Display dimensions for CLS — match rendered CSS size × retina where noted */
export const IMAGE_DIMENSIONS = {
  LOGO_HEADER: {width: 320, height: 54},
  SITE_ICON: {width: 192, height: 192},
  APPLE_TOUCH_ICON: {width: 180, height: 180},
} as const;
