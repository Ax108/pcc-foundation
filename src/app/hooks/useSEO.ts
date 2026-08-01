import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {IMAGES} from '@src/constants/images';
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE_HOME,
  SITE_URL,
} from '@src/constants/site';

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

const OG_IMAGE = IMAGES.LOGO_FULL.startsWith('http')
  ? IMAGES.LOGO_FULL
  : `${SITE_URL}${IMAGES.LOGO_FULL}`;
const OG_IMAGE_ALT = `${SITE_NAME} logo`;

/** Defaults — mirrored in index.html; useSEO overrides per route */
const defaultSEO: SEOData = {
  title: SITE_TITLE_HOME,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  ogImage: OG_IMAGE,
  ogImageAlt: OG_IMAGE_ALT,
};

/** Per-route SEO fallbacks when a page does not pass customSEO */
const seoPages: Record<string, SEOData> = {
  '/': {
    title: SITE_TITLE_HOME,
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    canonicalUrl: `${SITE_URL}/`,
  },
  '/our-inspiration': {
    title: `Our Inspiration — ${SITE_NAME}`,
    description: `Learn about Smt. Pratima Chandra and how ${SITE_NAME} promotes, preserves, and develops performing arts and traditional Indian music.`,
    keywords: `${SITE_KEYWORDS}, Pratima Chandra, our inspiration`,
    canonicalUrl: `${SITE_URL}/our-inspiration`,
  },
  '/gallery': {
    title: `Gallery — ${SITE_NAME}`,
    description: `Browse photos from ${SITE_NAME} events, awards, and performances celebrating traditional Indian music and performing arts.`,
    keywords: `${SITE_KEYWORDS}, gallery, photos, events`,
    canonicalUrl: `${SITE_URL}/gallery`,
  },
  '/events': {
    title: `Events — ${SITE_NAME}`,
    description: `Explore awards ceremonies, music competitions, and cultural events hosted by ${SITE_NAME} in Kolkata and beyond.`,
    keywords: `${SITE_KEYWORDS}, events, awards ceremony`,
    canonicalUrl: `${SITE_URL}/events`,
  },
  '/contact-us': {
    title: `Contact Us — ${SITE_NAME}`,
    description: `Contact ${SITE_NAME} in Kolkata for inquiries about programs, awards, and performing arts initiatives.`,
    keywords: `${SITE_KEYWORDS}, contact, Kolkata`,
    canonicalUrl: `${SITE_URL}/contact-us`,
  },
  '/application-form': {
    title: `Apply — ${SITE_NAME}`,
    description: `Apply for Rabindra Gaane Pratima Chandra Puroshkar (Aruprataner Sandhane) — a Rabindra Sangeet competition by ${SITE_NAME}.`,
    keywords: `${SITE_KEYWORDS}, application form, competition`,
    canonicalUrl: `${SITE_URL}/application-form`,
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
    updateMetaTag('og:site_name', SITE_NAME, 'property');
    updateMetaTag('og:locale', 'en_IN', 'property');
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:url', canonical, 'name');
    updateMetaTag('twitter:title', ogTitle, 'name');
    updateMetaTag('twitter:description', ogDescription, 'name');
    updateMetaTag('twitter:image', ogImage, 'name');
    updateMetaTag('twitter:image:alt', ogImageAlt, 'name');
    updateMetaTag(
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      'name',
    );

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
