import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useScrollReveal} from '@app/hooks/useScrollReveal';
import {Lightbox} from '@app/components/Lightbox';
import {
  GALLERY_TEASER_HEADING,
  GALLERY_TEASER_VIEW_MORE,
  HOME_GALLERY_TEASER,
} from '@home/constants/homeGalleryTeaser';

export const GalleryTeaser = () => {
  const {ref, isVisible} = useScrollReveal({threshold: 0.08});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      className="gallery-teaser bg-surface py-14 md:py-20"
      aria-labelledby="home-gallery-heading">
      <div
        ref={ref}
        className={`scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="container-site scroll-reveal-item mb-10 text-center md:mb-12">
          <h2
            id="home-gallery-heading"
            className="text-primary text-3xl font-semibold md:text-4xl lg:text-[2.5rem]">
            <span>{GALLERY_TEASER_HEADING.line1}</span>{' '}
            <span className="text-gold">{GALLERY_TEASER_HEADING.line2}</span>
          </h2>
          <span
            className="bg-gold mx-auto mt-4 block h-1 w-14 rounded-full"
            aria-hidden="true"
          />
        </div>

        <div className="container-site max-w-5xl mx-auto">
          <ul
            className="scroll-reveal-item grid grid-cols-2 gap-2 [transition-delay:80ms] md:grid-cols-4 md:gap-3 lg:gap-4"
            aria-label="Foundation event photo highlights">
            {HOME_GALLERY_TEASER.map((item, idx) => (
              <li key={item.id} className="group">
                <button
                  onClick={() => openLightbox(idx)}
                  className="gallery-teaser-link relative block w-full h-full overflow-hidden rounded-lg bg-black shadow-sm ring-1 ring-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 md:rounded-xl cursor-pointer"
                  aria-label={`${item.alt} — view image`}>
                  <img
                    src={item.imageSrc}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/2] h-full w-full object-cover transition duration-500 group-hover:scale-105 group-focus-visible:scale-105"
                  />
                  <span
                    className="bg-accent/0 group-hover:bg-accent/20 group-focus-visible:bg-accent/20 pointer-events-none absolute inset-0 transition duration-300"
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="scroll-reveal-item container-site mt-10 flex justify-center [transition-delay:160ms] md:mt-12">
          <Link
            to={GALLERY_TEASER_VIEW_MORE.path}
            className="site-btn bg-accent hover:bg-accent/90 !text-white inline-flex min-h-11 items-center justify-center gap-2 px-8 py-3 rounded text-sm font-semibold md:text-base transition-colors">
            {GALLERY_TEASER_VIEW_MORE.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <Lightbox
        items={HOME_GALLERY_TEASER}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
};
