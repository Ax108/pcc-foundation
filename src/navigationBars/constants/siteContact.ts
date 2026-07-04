export type SocialLink = {
  label: string;
  href: string;
  icon: 'facebook' | 'instagram' | 'youtube';
};

/** Footer + contact copy from scrape ([MigrationPlan §2.8]) */
export const SITE_CONTACT = {
  about:
    'Pratima Chandra Foundation is an independent research, training and support Organization for promotion and development of performing arts and traditional Indian music.',
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
