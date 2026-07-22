import {Link} from 'react-router-dom';
import {
  ABOUT_BODY,
  ABOUT_EYEBROW,
  ABOUT_HEADING,
  ABOUT_READ_MORE,
  APPLICATION_POSTER,
} from '@home/constants/aboutContent';
import {IMAGES, IMAGE_DIMENSIONS} from '@src/constants/images';
import {ScrollReveal} from '@app/components/ScrollReveal';

export const AboutSection = () => {
  return (
    <section
      className="bg-surface py-20 md:py-32"
      aria-labelledby="home-about-heading">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col gap-6">
          <ScrollReveal animation="fade-in" delay={0.1}>
            <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase">
              {ABOUT_EYEBROW}
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2
              id="home-about-heading"
              className="text-primary text-4xl sm:text-5xl leading-[1.2] font-serif font-bold">
              {ABOUT_HEADING.line1} {ABOUT_HEADING.line2}
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="text-text/80 text-lg leading-relaxed max-w-xl">
              {ABOUT_BODY}
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.4}>
            <div className="pt-4">
              <Link
                to={ABOUT_READ_MORE.path}
                className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm hover:text-secondary transition-colors"
              >
                {ABOUT_READ_MORE.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Accent Card with Image */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:ml-auto">
          <ScrollReveal animation="scale-up" delay={0.2}>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/5">
              <div className="overflow-hidden rounded-xl mb-6">
                <img
                  src={IMAGES.HOME_APPLICATION_POSTER}
                  alt={APPLICATION_POSTER.alt}
                  width={IMAGE_DIMENSIONS.HOME_APPLICATION_POSTER.width}
                  height={IMAGE_DIMENSIONS.HOME_APPLICATION_POSTER.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-serif font-bold text-primary mb-2">Join the Foundation</h3>
                <p className="text-text/70 text-sm mb-6">Download the application form to participate in our upcoming events and programs.</p>
                <Link
                  to="/application-form"
                  className="inline-flex w-full justify-center items-center px-8 py-3.5 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors"
                >
                  {APPLICATION_POSTER.downloadLabel}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
