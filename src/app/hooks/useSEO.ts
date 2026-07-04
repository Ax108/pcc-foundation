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
  canonicalUrl?: string;
}

const SITE_URL = 'https://pratimachandrafoundation.org';

/** Placeholder defaults — fill when pages are built */
const defaultSEO: SEOData = {
  title: 'Pratima Chandra Foundation',
  description: '',
  keywords: '',
  ogImage: IMAGES.LOGO_FULL,
};

/** Per-route SEO — blank placeholders for now */
const seoPages: Record<string, SEOData> = {
  '/': {
    title: 'Pratima Chandra Foundation',
    description: '',
    keywords: '',
    canonicalUrl: `${SITE_URL}/`,
  },
};

export const useSEO = (customSEO?: Partial<SEOData>) => {
  const location = useLocation();

  useEffect(() => {
    const pageSEO = seoPages[location.pathname] ?? defaultSEO;
    const finalSEO = {...pageSEO, ...customSEO};

    document.title = finalSEO.title;

    updateMetaTag('description', finalSEO.description);
    updateMetaTag('keywords', finalSEO.keywords);
    updateMetaTag('og:title', finalSEO.ogTitle ?? finalSEO.title, 'property');
    updateMetaTag(
      'og:description',
      finalSEO.ogDescription ?? finalSEO.description,
      'property',
    );
    updateMetaTag('og:image', finalSEO.ogImage ?? IMAGES.LOGO_FULL, 'property');
    updateMetaTag(
      'og:url',
      finalSEO.canonicalUrl ?? `${SITE_URL}${location.pathname}`,
      'property',
    );
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', 'Pratima Chandra Foundation', 'property');
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', finalSEO.ogTitle ?? finalSEO.title, 'name');
    updateMetaTag(
      'twitter:description',
      finalSEO.ogDescription ?? finalSEO.description,
      'name',
    );
    updateMetaTag(
      'twitter:image',
      finalSEO.ogImage ?? IMAGES.LOGO_FULL,
      'name',
    );
    updateMetaTag('robots', 'index, follow', 'name');

    updateCanonicalLink(
      finalSEO.canonicalUrl ?? `${SITE_URL}${location.pathname}`,
    );
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
