import {useState} from 'react';
import {useSEO} from '@app/hooks/useSEO';
import {GALLERY_IMAGES} from '@gallery/constants/galleryImages';
import {IMAGES} from '@src/constants/images';
import {Lightbox} from '@app/components/Lightbox';
import {motion} from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <article aria-label="Gallery">
      <header className="relative w-full h-56 md:h-72 lg:h-[400px] overflow-hidden bg-black">
        <motion.div
          initial={{ scale: 1.1, filter: 'brightness(0.3)' }}
          animate={{ scale: 1, filter: 'brightness(0.6)' }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={IMAGES.HERO_HEADER}
            alt="Foundation gallery header banner"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="!text-white text-5xl md:text-6xl lg:text-7xl font-serif font-bold drop-shadow-lg tracking-wide"
          >
            Gallery
          </motion.h1>
        </div>
      </header>

      <section className="bg-surface py-20 md:py-32">
        <div className="container-site max-w-7xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
            {GALLERY_IMAGES.map((item, idx) => {
              // Creating a masonry feel: every 7th image is large
              const isLarge = idx % 7 === 0;
              return (
                <motion.button
                  variants={itemVariants}
                  key={item.id}
                  onClick={() => openLightbox(idx)}
                  className={`relative block w-full overflow-hidden bg-surface shadow-sm hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] transition-shadow duration-500 cursor-pointer group focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 ${
                    isLarge ? 'col-span-2 row-span-2' : ''
                  }`}
                  aria-label={`View full image: ${item.alt}`}
                >
                  <div className={`w-full ${isLarge ? 'aspect-square md:aspect-[4/3]' : 'aspect-[4/5]'} overflow-hidden`}>
                    <img
                      src={item.imageSrc}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                  </div>
                  <span
                    className="bg-primary/0 group-hover:bg-primary/20 pointer-events-none absolute inset-0 transition-colors duration-500"
                    aria-hidden="true"
                  />
                  {/* Subtle Gold Frame on Hover */}
                  <div className="absolute inset-2 border border-gold/0 group-hover:border-gold/50 transition-colors duration-500 pointer-events-none" />
                </motion.button>
              );
            })}
          </motion.div>
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
