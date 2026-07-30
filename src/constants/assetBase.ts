// #genai — Hosted pcc-data assets root (override with VITE_ASSET_BASE_URL; empty = local Vite middleware).
const DEFAULT_ASSET_BASE = 'https://ax108.github.io/pcc-data/assets';

const RAW_BASE =
  import.meta.env.VITE_ASSET_BASE_URL !== undefined
    ? String(import.meta.env.VITE_ASSET_BASE_URL)
    : DEFAULT_ASSET_BASE;

/** Trailing slash stripped. Empty string enables same-origin `/assets/...` via Vite middleware. */
export const ASSET_BASE_URL = RAW_BASE.replace(/\/$/, '');

/**
 * Resolve a media path against the hosted assets base.
 * Accepts `/assets/logo/...` or `logo/...` — both map under the assets root.
 * @example assetUrl('/assets/logo/logo-header.png')
 * // → https://ax108.github.io/pcc-data/assets/logo/logo-header.png
 */
export function assetUrl(path: string): string {
  let rel = path.replace(/^\/+/, '');
  if (rel.startsWith('assets/')) {
    rel = rel.slice('assets/'.length);
  }
  if (!ASSET_BASE_URL) {
    return `/assets/${rel}`;
  }
  return `${ASSET_BASE_URL}/${rel}`;
}
