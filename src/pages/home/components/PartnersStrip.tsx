import {useScrollReveal} from '@app/hooks/useScrollReveal';
import {
  PARTNERS_COPY,
  PARTNERS_LOGO_ALT,
} from '@home/constants/partnersContent';
import {IMAGES, IMAGE_DIMENSIONS} from '@src/constants/images';

export const PartnersStrip = () => {
  const {ref, isVisible} = useScrollReveal({threshold: 0.2});

  return (
    <section
      className="partners-strip py-10 md:py-12"
      aria-label="Memorial Award partners">
      <div
        ref={ref}
        className={`container-site scroll-reveal flex flex-col items-center gap-8 md:flex-row md:gap-10 lg:gap-14 ${isVisible ? 'is-visible' : ''}`}>
        <figure className="scroll-reveal-item shrink-0">
          <div className="border-gold/90 bg-accent/40 flex size-[7.5rem] items-center justify-center rounded-sm border-2 p-3 shadow-lg md:size-[8.5rem]">
            <img
              src={IMAGES.ASSOCIATES_LOGO}
              alt={PARTNERS_LOGO_ALT}
              width={IMAGE_DIMENSIONS.ASSOCIATES_LOGO.width}
              height={IMAGE_DIMENSIONS.ASSOCIATES_LOGO.height}
              loading="lazy"
              decoding="async"
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          </div>
        </figure>

        <p className="scroll-reveal-item partners-strip-text m-0 max-w-3xl text-center text-base leading-relaxed font-medium [transition-delay:100ms] md:text-left md:text-lg lg:text-xl">
          <span className="text-gold font-semibold">
            {PARTNERS_COPY.highlight}
          </span>{' '}
          {PARTNERS_COPY.body}
        </p>
      </div>
    </section>
  );
};
