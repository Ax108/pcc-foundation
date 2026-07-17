import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Standard lenis setup - reduced intensity
    const lenis = new Lenis({
      lerp: 0.1, // standard smoothing, less floaty
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor links globally for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        // Only intercept if it's a valid ID anchor (starts with # and has a name)
        if (href && href.startsWith('#') && href.length > 1) {
          const element = document.querySelector(href);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element, { offset: -50 });
          }
        }
      }
    };

    document.documentElement.addEventListener('click', handleAnchorClick);

    return () => {
      document.documentElement.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
