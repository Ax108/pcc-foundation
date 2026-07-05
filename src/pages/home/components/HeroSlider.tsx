import {useEffect, type KeyboardEvent} from 'react';
import {HERO_SLIDES} from '@home/constants/heroSlides';
import {useHeroSlider} from '@home/hooks/useHeroSlider';
import {HeroSlide} from '@home/components/HeroSlide';
import {HeroSliderControls} from '@home/components/HeroSliderControls';
import {IMAGE_DIMENSIONS} from '@src/constants/images';

export const HeroSlider = () => {
  const {activeIndex, goTo, next, prev, pause, resume} = useHeroSlider(
    HERO_SLIDES.length,
  );

  useEffect(() => {
    const nextIndex = (activeIndex + 1) % HERO_SLIDES.length;
    const preload = new Image();
    preload.src = HERO_SLIDES[nextIndex].imageSrc;
  }, [activeIndex]);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    }
    if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      goTo(HERO_SLIDES.length - 1);
    }
  };

  return (
    <section
      className="hero-slider relative w-full bg-black"
      aria-roledescription="carousel"
      aria-label="Foundation highlights"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onKeyDown={onKeyDown}
      tabIndex={0}>
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: `${IMAGE_DIMENSIONS.HERO_SLIDE.width} / ${IMAGE_DIMENSIONS.HERO_SLIDE.height}`,
        }}>
        {HERO_SLIDES.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            isActive={index === activeIndex}
            isFirst={index === 0}
          />
        ))}
        <HeroSliderControls
          slideCount={HERO_SLIDES.length}
          activeIndex={activeIndex}
          onPrev={prev}
          onNext={next}
          onGoTo={goTo}
        />
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeIndex + 1} of {HERO_SLIDES.length}:{' '}
        {HERO_SLIDES[activeIndex].title}
      </p>
    </section>
  );
};
