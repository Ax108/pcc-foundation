import {IMAGE_DIMENSIONS} from '@src/constants/images';
import type {HeroSlide as HeroSlideData} from '@home/constants/heroSlides';

type HeroSlideProps = {
  slide: HeroSlideData;
  isActive: boolean;
  isFirst: boolean;
};

export const HeroSlide = ({slide, isActive, isFirst}: HeroSlideProps) => (
  <div
    className={[
      'absolute inset-0 transition-opacity duration-500 ease-in-out',
      isActive ? 'opacity-100' : 'pointer-events-none opacity-0',
    ].join(' ')}
    aria-hidden={!isActive}>
    <img
      src={slide.imageSrc}
      alt={slide.imageAlt}
      width={IMAGE_DIMENSIONS.HERO_SLIDE.width}
      height={IMAGE_DIMENSIONS.HERO_SLIDE.height}
      fetchPriority={isFirst ? 'high' : undefined}
      loading={isFirst ? 'eager' : 'lazy'}
      decoding="async"
      className="h-full w-full object-cover"
    />
    <div
      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
      aria-hidden
    />
    <div className="container-site absolute inset-x-0 bottom-0 pb-10 md:pb-14">
      {isActive ? (
        <div className="max-w-3xl text-white">
          <h1 className="xxs:text-2xl text-xl leading-tight font-semibold sm:text-3xl lg:text-4xl">
            {slide.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base md:mt-4 md:text-lg">
            {slide.subtitle}
          </p>
        </div>
      ) : null}
    </div>
  </div>
);
