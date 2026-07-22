import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Lightbox} from '@app/components/Lightbox';
import {
  GALLERY_TEASER_VIEW_MORE,
  HOME_GALLERY_TEASER,
} from '@home/constants/homeGalleryTeaser';
import {ScrollReveal} from '@app/components/ScrollReveal';

export const GalleryTeaser = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      className="bg-white py-20 md:py-32"
      aria-labelledby="home-gallery-heading">
      <div className="container-site">
        <div className="mb-16 md:mb-24 text-center">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">
              A Glimpse of the Foundation
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2
              id="home-gallery-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary">
              Perfect for Every Occasion
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="mt-4 text-text/70 max-w-2xl mx-auto">
              Witness the beauty of our events and the joyous moments shared by our community.
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-7xl mx-auto">
          <ul
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-flow-dense auto-rows-[250px]"
            aria-label="Foundation event photo highlights">
            {HOME_GALLERY_TEASER.map((item, idx) => {
              const getGridSpan = (index: number) => {
                switch (index % 9) {
                  case 0: return 'md:col-span-2 md:row-span-2';
                  case 1: return 'md:col-span-1 md:row-span-1';
                  case 2: return 'md:col-span-1 md:row-span-2';
                  case 3: return 'md:col-span-1 md:row-span-1';
                  case 4: return 'md:col-span-2 md:row-span-1';
                  case 5: return 'md:col-span-1 md:row-span-1';
                  case 6: return 'md:col-span-1 md:row-span-1';
                  case 7: return 'md:col-span-2 md:row-span-2';
                  case 8: return 'md:col-span-2 md:row-span-1';
                  default: return 'md:col-span-1 md:row-span-1';
                }
              };

              // Map stagger delay to rows roughly by index
              const staggerDelay = (idx % 9) * 0.05;

              return (
              <li 
                key={item.id} 
                className={`group relative ${getGridSpan(idx)} h-full w-full`}>
                <ScrollReveal animation="fade-in" delay={staggerDelay} className="h-full w-full">
                  <button
                    onClick={() => openLightbox(idx)}
                    className="relative block w-full h-full overflow-hidden bg-black cursor-pointer rounded-sm"
                    aria-label={`${item.alt} — view image`}>
                    <img
                      src={item.imageSrc}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-6 left-6 right-6 text-left">
                      <h3 className="text-white text-lg font-serif font-semibold tracking-wide line-clamp-2">
                        {item.alt}
                      </h3>
                    </div>
                  </button>
                </ScrollReveal>
              </li>
              );
            })}
          </ul>
        </div>

        <ScrollReveal animation="fade-up" delay={0.2}>
          <div className="mt-16 flex justify-center">
            <Link
              to={GALLERY_TEASER_VIEW_MORE.path}
              className="inline-flex items-center px-10 py-4 bg-primary text-white font-medium hover:bg-secondary transition-colors duration-300 rounded-sm uppercase tracking-wider text-sm shadow-md">
              {GALLERY_TEASER_VIEW_MORE.label}
            </Link>
          </div>
        </ScrollReveal>
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
