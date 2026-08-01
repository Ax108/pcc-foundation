import {SITE_DESCRIPTION} from '@src/constants/site';

export type SocialLink = {
  label: string;
  href: string;
  icon: 'facebook' | 'instagram' | 'youtube';
};

/** Footer + contact copy */
export const SITE_CONTACT = {
  // #genai — footer about blurb matches site SEO description
  about: SITE_DESCRIPTION,
  address: 'P-35, CIT Road, Kolkata - 700 014',
  phone: '033-22498193',
  phoneHref: 'tel:+913322498193',
  email: 'pratimachandrafoundation@gmail.com',
  emailHref: 'mailto:pratimachandrafoundation@gmail.com',
  copyright: '© 2026 Pratima Chandra Foundation',
  social: [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/PratimaChandraFoundation',
      icon: 'facebook',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/pratimachandrafoundation/',
      icon: 'instagram',
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@pratimachandrafoundation6716',
      icon: 'youtube',
    },
  ] satisfies SocialLink[],
} as const;
