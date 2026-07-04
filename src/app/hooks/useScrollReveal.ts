import {useEffect, useRef, useState} from 'react';

type UseScrollRevealOptions = {
  /** Fraction of element visible before reveal (0–1) */
  threshold?: number;
  /** Only animate once */
  once?: boolean;
};

/**
 * Fade/slide-in when section enters viewport.
 * Respects prefers-reduced-motion (shows immediately).
 */
export const useScrollReveal = ({
  threshold = 0.12,
  once = true,
}: UseScrollRevealOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        setIsVisible(true);
        if (once) {
          observer.disconnect();
        }
      },
      {threshold, rootMargin: '0px 0px -5% 0px'},
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return {ref, isVisible};
};
