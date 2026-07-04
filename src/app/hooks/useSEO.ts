import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {IMAGES} from '@src/constants/images';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  canonicalUrl?: string;
}

const SITE_URL = 'https://pratimachandrafoundation.org';

const DEFAULT_DESCRIPTION =
  'Pratima Chandra Foundation is an independent research, training and support institution for the promotion and development of performing arts and traditional Indian music.';

const DEFAULT_KEYWORDS =
  'Pratima Chandra Foundation, Indian music, performing arts, Kolkata, memorial award, Rabindra Sangeet, Pratima Chandra Memorial Award';

const OG_IMAGE = `${SITE_URL}${IMAGES.LOGO_FULL}`;
const OG_IMAGE_ALT = 'Pratima Chandra Foundation logo';

/** Defaults — mirrored in index.html; useSEO overrides per route */
const defaultSEO: SEOData = {
  title: 'Pratima Chandra Foundation',
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  ogImage: OG_IMAGE,
  ogImageAlt: OG_IMAGE_ALT,
};

/** Per-route SEO */
const seoPages: Record<string, SEOData> = {
  '/': {
    title: 'Pratima Chandra Foundation',
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    canonicalUrl: `${SITE_URL}/`,
  },
  '/our-inspiration': {
    title: 'Our Inspiration — Pratima Chandra Foundation',
    description: '',
    keywords: '',
    canonicalUrl: `${SITE_URL}/our-inspiration`,
  },
  '/gallery': {
    title: 'Gallery — Pratima Chandra Foundation',
    description: '',
    keywords: '',
    canonicalUrl: `${SITE_URL}/gallery`,
  },
  '/events': {
    title: 'Events — Pratima Chandra Foundation',
    description: '',
    keywords: '',
    canonicalUrl: `${SITE_URL}/events`,
  },
  '/contact-us': {
    title: 'Contact Us — Pratima Chandra Foundation',
    description: '',
    keywords: '',
    canonicalUrl: `${SITE_URL}/contact-us`,
  },
};

export const useSEO = (customSEO?: Partial<SEOData>) => {
  const location = useLocation();

  useEffect(() => {
    const pageSEO = seoPages[location.pathname] ?? defaultSEO;
    const finalSEO = {...pageSEO, ...customSEO};
    const canonical =
      finalSEO.canonicalUrl ?? `${SITE_URL}${location.pathname}`;
    const ogTitle = finalSEO.ogTitle ?? finalSEO.title;
    const ogDescription = finalSEO.ogDescription ?? finalSEO.description;
    const ogImage = finalSEO.ogImage ?? OG_IMAGE;
    const ogImageAlt = finalSEO.ogImageAlt ?? OG_IMAGE_ALT;

    document.title = finalSEO.title;

    updateMetaTag('title', finalSEO.title);
    updateMetaTag('description', finalSEO.description);
    updateMetaTag('keywords', finalSEO.keywords);
    updateMetaTag('og:title', ogTitle, 'property');
    updateMetaTag('og:description', ogDescription, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:image:alt', ogImageAlt, 'property');
    updateMetaTag('og:url', canonical, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', 'Pratima Chandra Foundation', 'property');
    updateMetaTag('og:locale', 'en_IN', 'property');
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:url', canonical, 'name');
    updateMetaTag('twitter:title', ogTitle, 'name');
    updateMetaTag('twitter:description', ogDescription, 'name');
    updateMetaTag('twitter:image', ogImage, 'name');
    updateMetaTag('twitter:image:alt', ogImageAlt, 'name');
    updateMetaTag('robots', 'index, follow', 'name');

    updateCanonicalLink(canonical);
  }, [location.pathname, customSEO]);
};

const updateMetaTag = (
  name: string,
  content: string,
  attribute: 'name' | 'property' = 'name',
) => {
  let element = document.querySelector(
    `meta[${attribute}="${name}"]`,
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const updateCanonicalLink = (url: string) => {
  let element = document.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', url);
};
