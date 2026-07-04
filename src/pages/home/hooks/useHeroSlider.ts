import {useCallback, useEffect, useState} from 'react';
import {HERO_AUTOPLAY_MS} from '@home/constants/heroSlides';

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return prefersReducedMotion;
};

export const useHeroSlider = (slideCount: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const goTo = useCallback(
    (index: number) => {
      if (slideCount === 0) return;
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || slideCount <= 1) return;

    const timer = window.setInterval(next, HERO_AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, next, prefersReducedMotion, slideCount]);

  return {
    activeIndex,
    goTo,
    next,
    prev,
    pause,
    resume,
    prefersReducedMotion,
  };
};
