import {useState} from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {Lightbox} from '@app/components/Lightbox';
import {
  GALLERY_TEASER_HEADING,
  GALLERY_TEASER_VIEW_MORE,
  HOME_GALLERY_TEASER,
} from '@home/constants/homeGalleryTeaser';

export const GalleryTeaser = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section
      className="gallery-teaser bg-surface py-20 md:py-32"
      aria-labelledby="home-gallery-heading">
      <div className="container-site">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center">
          <h2
            id="home-gallery-heading"
            className="text-primary text-5xl leading-[1.1] font-serif font-bold md:text-6xl lg:text-7xl">
            <span className="block mb-2">{GALLERY_TEASER_HEADING.line1}</span>
            <span className="text-gold italic font-medium">{GALLERY_TEASER_HEADING.line2}</span>
          </h2>
          <span
            className="bg-gold mx-auto mt-6 block h-[2px] w-20"
            aria-hidden="true"
          />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto">
          <ul
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
            aria-label="Foundation event photo highlights">
            {HOME_GALLERY_TEASER.map((item, idx) => (
              <motion.li 
                variants={itemVariants}
                key={item.id} 
                className={`group ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <button
                  onClick={() => openLightbox(idx)}
                  className="gallery-teaser-link relative block w-full h-full overflow-hidden bg-surface shadow-[0_10px_40px_rgba(0,0,0,0.05)] cursor-pointer"
                  aria-label={`${item.alt} — view image`}>
                  <div className="w-full h-full aspect-[4/3] md:aspect-auto md:min-h-[250px]">
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
                  <div className="absolute inset-4 border border-gold/0 group-hover:border-gold/50 transition-colors duration-500 pointer-events-none" />
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 flex justify-center md:mt-24">
          <Link
            to={GALLERY_TEASER_VIEW_MORE.path}
            className="site-btn site-btn-primary inline-flex min-h-12 items-center justify-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] md:text-sm">
            {GALLERY_TEASER_VIEW_MORE.label}
            <span aria-hidden="true" className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
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
