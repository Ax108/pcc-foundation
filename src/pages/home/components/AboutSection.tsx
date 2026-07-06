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
        className={`container-site scroll-reveal grid items-center gap-16 lg:grid-cols-2 lg:gap-24 ${isVisible ? 'is-visible' : ''}`}>
        
        {/* Left Side: Elegant Image Frame */}
        <figure className="scroll-reveal-item relative z-0 mx-auto w-full max-w-md lg:max-w-none group">
          {/* Decorative Gold Frame Behind */}
          <div className="absolute -inset-4 md:-inset-6 border border-gold/40 rounded-sm translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2 pointer-events-none" />
          
          <div className="relative overflow-hidden rounded-sm bg-surface p-2 shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-border transition-all duration-700 group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)] z-10">
            <div className="overflow-hidden rounded-sm">
              <img
                src={IMAGES.HOME_APPLICATION_POSTER}
                alt={APPLICATION_POSTER.alt}
                width={IMAGE_DIMENSIONS.HOME_APPLICATION_POSTER.width}
                height={IMAGE_DIMENSIONS.HOME_APPLICATION_POSTER.height}
                loading="lazy"
                decoding="async"
                className="h-auto w-full rounded-sm transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>
          </div>
          <figcaption className="sr-only">{APPLICATION_POSTER.alt}</figcaption>
        </figure>

        {/* Right Side: Open Typography */}
        <div className="scroll-reveal-item relative z-10 flex flex-col gap-8 [transition-delay:120ms] py-8">
          <p className="text-gold text-sm font-bold tracking-[0.25em] uppercase">
            {ABOUT_EYEBROW}
          </p>

          <div className="space-y-6">
            <h2
              id="home-about-heading"
              className="text-primary text-5xl leading-[1.1] font-serif font-semibold md:text-6xl lg:text-7xl">
              <span className="block mb-2">{ABOUT_HEADING.line1}</span>
              <span className="text-gold italic font-medium">{ABOUT_HEADING.line2}</span>
            </h2>
            <div
              className="bg-gold h-[2px] w-20"
              aria-hidden="true"
            />
          </div>

          <p className="text-primary/75 max-w-xl text-lg leading-relaxed md:text-xl font-light">
            {ABOUT_BODY}
          </p>

          <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center">
            <Link
              to={ABOUT_READ_MORE.path}
              className="site-btn site-btn-primary inline-flex min-h-12 items-center justify-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] md:text-sm">
              {ABOUT_READ_MORE.label}
              <span aria-hidden="true" className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/application-form"
              className="site-btn site-btn-outline inline-flex min-h-12 items-center justify-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] md:text-sm">
              {APPLICATION_POSTER.downloadLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
