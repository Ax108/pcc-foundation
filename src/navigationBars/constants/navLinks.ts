export type NavLinkItem = {
  label: string;
  path: string;
};

/** Primary nav — matches live site ([MigrationPlan §3.1]) */
export const NAV_LINKS: NavLinkItem[] = [
  {label: 'Home', path: '/'},
  {label: 'Our Inspiration', path: '/our-inspiration'},
  {label: 'Gallery', path: '/gallery'},
  {label: 'Events', path: '/events'},
  {label: 'Contact Us', path: '/contact-us'},
];

export const isNavActive = (pathname: string, path: string): boolean => {
  if (path === '/') {
    return pathname === '/';
  }
  return pathname === path || pathname.startsWith(`${path}/`);
};
