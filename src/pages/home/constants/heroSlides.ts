import {IMAGES} from '@src/constants/images';

export type HeroSlide = {
  id: string;
  imageSrc: string;
  title: string;
  subtitle: string;
  imageAlt: string;
};

/** Shared overlay copy on every slide — matches live site carousel */
const HERO_TITLE = 'Pratima Chandra Foundation';
const HERO_SUBTITLE =
  'Pratima Chandra Foundation is an independent research, training and support institution for the promotion and development of performing arts and traditional Indian music.';

/**
 * Order matches live Elementor carousel (newest CPT first):
 * slider-4 → header-1, slider-3 → header-3, slider-2 → header4, slider-1 → header-2
 */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slider-4-header-1',
    imageSrc: IMAGES.HERO_SLIDE_1,
    title: HERO_TITLE,
    subtitle: HERO_SUBTITLE,
    imageAlt:
      'Pratima Chandra Foundation award recipients with ceremonial checks and trophies',
  },
  {
    id: 'slider-3-header-3',
    imageSrc: IMAGES.HERO_SLIDE_2,
    title: HERO_TITLE,
    subtitle: HERO_SUBTITLE,
    imageAlt:
      'Foundation event registration table with volunteers and attendees',
  },
  {
    id: 'slider-2-header4',
    imageSrc: IMAGES.HERO_SLIDE_3,
    title: HERO_TITLE,
    subtitle: HERO_SUBTITLE,
    imageAlt:
      'Collage of Pratima Chandra Foundation music and cultural performances',
  },
  {
    id: 'slider-1-header-2',
    imageSrc: IMAGES.HERO_SLIDE_4,
    title: HERO_TITLE,
    subtitle: HERO_SUBTITLE,
    imageAlt: 'Audience seated in an auditorium during a foundation event',
  },
];

export const HERO_AUTOPLAY_MS = 6000;
