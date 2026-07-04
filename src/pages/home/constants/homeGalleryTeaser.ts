/** Home gallery teaser — order from live WP Elementor widget `9718027` (container `f916234`) */

export type HomeGalleryTeaserItem = {
  id: string;
  imageSrc: string;
  alt: string;
  width: number;
  height: number;
};

export const GALLERY_TEASER_HEADING = {
  line1: 'Our',
  line2: 'Gallery',
} as const;

export const GALLERY_TEASER_VIEW_MORE = {
  label: 'View More',
  path: '/gallery',
} as const;

/** 3:2 aspect — WP `aspect_ratio: 3:2`; 768×512/513 scrape variants */
const TEASER_SIZE = {width: 768, height: 512} as const;

export const HOME_GALLERY_TEASER: HomeGalleryTeaserItem[] = [
  {
    id: 'pcma-2018-rakhi-1',
    imageSrc: '/assets/gallery/home/teaser-01.jpg',
    alt: 'PCMA 2018 — second prize recipient Rakhi Chatterjee at the awards ceremony',
    ...TEASER_SIZE,
  },
  {
    id: 'pcma-2018-angira-1',
    imageSrc: '/assets/gallery/home/teaser-02.jpg',
    alt: 'PCMA 2018 — first prize recipient Angira Kotal on stage',
    ...TEASER_SIZE,
  },
  {
    id: 'pcma-2018-event-2',
    imageSrc: '/assets/gallery/home/teaser-03.jpg',
    alt: 'PCMA 2018 memorial award event — performers on stage',
    ...TEASER_SIZE,
  },
  {
    id: 'pcma-2018-judges-2',
    imageSrc: '/assets/gallery/home/teaser-04.jpg',
    alt: 'PCMA 2018 — judges panel at the competition',
    ...TEASER_SIZE,
  },
  {
    id: 'pcma-2018-laxmipriya-2',
    imageSrc: '/assets/gallery/home/teaser-05.jpg',
    alt: 'PCMA 2018 — third prize recipient Laxmipriya Nayak',
    ...TEASER_SIZE,
  },
  {
    id: 'pcma-2018-rakhi-2',
    imageSrc: '/assets/gallery/home/teaser-06.jpg',
    alt: 'PCMA 2018 — Rakhi Chatterjee receiving her award',
    ...TEASER_SIZE,
  },
  {
    id: 'ars-2018-bhumika-3',
    imageSrc: '/assets/gallery/home/teaser-07.jpg',
    alt: 'ARS 2018 — first prize recipient Bhumika Ganguly',
    ...TEASER_SIZE,
  },
  {
    id: 'ars-2018-supriyo-3',
    imageSrc: '/assets/gallery/home/teaser-08.jpg',
    alt: 'ARS 2018 — third prize recipient Supriyo Koley',
    ...TEASER_SIZE,
  },
];
