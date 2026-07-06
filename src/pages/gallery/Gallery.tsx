import {useState} from 'react';
import {useSEO} from '@app/hooks/useSEO';
import {GALLERY_IMAGES} from '@gallery/constants/galleryImages';
import {IMAGES} from '@src/constants/images';
import {Lightbox} from '@app/components/Lightbox';

export const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useSEO({
    title: 'Gallery - Pratima Chandra Foundation',
    description:
      'Explore the gallery of events, awards, and performances hosted by the Pratima Chandra Foundation.',
  });

  return (
    <article aria-label="Gallery" className="animate-page">
      <header className="relative w-full h-40 md:h-56 lg:h-72 overflow-hidden bg-surface">
        <img
          src={IMAGES.HERO_HEADER}
          alt="Foundation gallery header banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <h1 className="!text-white text-4xl md:text-5xl lg:text-6xl font-semibold drop-shadow-md">
            Gallery
          </h1>
        </div>
      </header>

      <section className="container-site py-12">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
          {GALLERY_IMAGES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="relative block w-full overflow-hidden bg-black cursor-pointer group focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
              aria-label={`View full image: ${item.alt}`}
            >
              <img
                src={item.imageSrc}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                className="aspect-[3/2] h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90 group-focus-visible:scale-105"
              />
            </button>
          ))}
        </div>
      </section>

      <Lightbox
        items={GALLERY_IMAGES}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </article>
  );
};
