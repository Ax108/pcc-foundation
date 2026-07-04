import {Link} from 'react-router-dom';
import {useScrollReveal} from '@app/hooks/useScrollReveal';
import {
  ABOUT_BODY,
  ABOUT_EYEBROW,
  ABOUT_HEADING,
  ABOUT_READ_MORE,
  APPLICATION_POSTER,
} from '@home/constants/aboutContent';
import {IMAGES, IMAGE_DIMENSIONS} from '@src/constants/images';

export const AboutSection = () => {
  const {ref, isVisible} = useScrollReveal();

  return (
    <section
      className="about-section border-border bg-muted scroll-mt-4 border-t py-16 md:py-24"
      aria-labelledby="home-about-heading">
      <div
        ref={ref}
        className={`container-site scroll-reveal grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20 ${isVisible ? 'is-visible' : ''}`}>
        <figure className="scroll-reveal-item mx-auto w-full max-w-sm lg:max-w-none">
          <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
            <img
              src={IMAGES.HOME_APPLICATION_POSTER}
              alt={APPLICATION_POSTER.alt}
              width={IMAGE_DIMENSIONS.HOME_APPLICATION_POSTER.width}
              height={IMAGE_DIMENSIONS.HOME_APPLICATION_POSTER.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full rounded-xl"
            />
          </div>
          <figcaption className="sr-only">{APPLICATION_POSTER.alt}</figcaption>
        </figure>

        <div className="scroll-reveal-item flex flex-col gap-6 [transition-delay:120ms]">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
            {ABOUT_EYEBROW}
          </p>

          <div className="space-y-4">
            <h2
              id="home-about-heading"
              className="text-primary text-3xl leading-tight font-semibold md:text-4xl lg:text-[2.5rem]">
              <span className="text-accent">{ABOUT_HEADING.line1}</span>{' '}
              <span className="text-gold">{ABOUT_HEADING.line2}</span>
            </h2>
            <span
              className="bg-gold block h-1 w-14 rounded-full"
              aria-hidden="true"
            />
          </div>

          <p className="text-primary/85 max-w-prose text-base leading-relaxed md:text-lg">
            {ABOUT_BODY}
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              to={ABOUT_READ_MORE.path}
              className="site-btn site-btn-primary inline-flex min-h-11 items-center justify-center gap-2 px-7 py-3 text-sm font-semibold md:text-base">
              {ABOUT_READ_MORE.label}
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href={IMAGES.APPLICATION_FORM_2025_PDF}
              download
              className="site-btn site-btn-outline inline-flex min-h-11 items-center justify-center gap-2 px-7 py-3 text-sm font-semibold md:text-base"
              rel="noopener">
              {APPLICATION_POSTER.downloadLabel}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
