import {
  PARTNERS_COPY,
  PARTNERS_LOGO_ALT,
} from '@home/constants/partnersContent';
import {IMAGES, IMAGE_DIMENSIONS} from '@src/constants/images';
import {ScrollReveal} from '@app/components/ScrollReveal';

export const PartnersStrip = () => {
  return (
    <section
      className="bg-primary/5 py-16"
      aria-label="Memorial Award partners">
      <div className="container-site flex flex-col items-center gap-8 md:flex-row md:gap-12 lg:gap-16 justify-center">
        <ScrollReveal animation="fade-in" delay={0.1}>
          <figure className="shrink-0">
            <div className="bg-white flex size-[7.5rem] items-center justify-center rounded-2xl shadow-sm border border-black/5 p-4 md:size-[8.5rem]">
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
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2}>
          <p className="max-w-2xl text-center text-text/80 text-base leading-relaxed md:text-left md:text-lg">
            <strong className="text-primary font-bold">
              {PARTNERS_COPY.highlight}
            </strong>{' '}
            {PARTNERS_COPY.body}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
