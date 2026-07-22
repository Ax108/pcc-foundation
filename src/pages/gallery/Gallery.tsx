import {useState} from 'react';
import {useSEO} from '@app/hooks/useSEO';
import {GALLERY_IMAGES} from '@gallery/constants/galleryImages';

import {Lightbox} from '@app/components/Lightbox';
import {ScrollReveal} from '@app/components/ScrollReveal';

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
    <article aria-label="Gallery" className="bg-surface">
      {/* Hero Banner */}
      <header className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-surface flex items-center pt-16 md:pt-24 border-b border-gold/10">
        {/* Decorative Shapes for Matte background */}
        <div className="absolute top-0 right-0 w-[45vw] h-[45vw] bg-gold/10 rounded-full blur-3xl translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-primary/10 rounded-full blur-3xl -translate-x-1/4 pointer-events-none" />
        
        <div className="container-site relative z-10 h-full flex flex-col md:flex-row items-center justify-between gap-8 py-8 md:py-12">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left order-2 md:order-1">
            <ScrollReveal animation="fade-in" delay={0.1}>
              <div className="inline-flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="w-8 md:w-12 h-[2px] bg-primary"></span>
                <p className="text-gold tracking-[0.2em] uppercase text-xs md:text-sm font-bold">A Visual Journey</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <h1 className="text-primary text-5xl md:text-6xl lg:text-[5rem] font-serif font-bold drop-shadow-sm tracking-wide leading-[1.1] mb-6">
                Our <br className="hidden md:block" />
                <span className="text-gold italic font-medium">Gallery</span>
              </h1>
            </ScrollReveal>
          </div>

          {/* Photo Element */}
          <div className="hidden md:flex w-full md:w-1/2 h-full items-center justify-center md:justify-end order-1 md:order-2">
            <ScrollReveal animation="scale-up" delay={0.2}>
              <div className="relative w-48 sm:w-56 md:w-72 lg:w-96 aspect-square">
                {/* Offset Background Shape */}
                <div className="absolute inset-0 bg-gold/20 -translate-x-4 -translate-y-4 md:-translate-x-6 md:-translate-y-6 rounded-tr-[5rem] rounded-bl-[5rem] -z-10" />
                
                {/* Image */}
                <img
                  src="/assets/gallery/DSC_3113-scaled.jpg"
                  alt="Foundation Gallery"
                  className="w-full h-full object-cover object-center rounded-tr-[5rem] rounded-bl-[5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 md:border-8 border-white"
                />
                
                {/* Floating Badge */}
                <div className="absolute top-6 md:top-12 -right-4 md:-right-8 bg-white/95 backdrop-blur-sm p-3 md:p-5 shadow-xl border-r-4 border-gold rounded-l-sm z-20">
                  <p className="text-primary font-serif font-bold text-sm md:text-lg leading-tight text-right">
                    Moments in <br/> Time
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </header>

      <section className="bg-white py-20 md:py-32">
        <div className="container-site max-w-[1400px]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 grid-flow-dense auto-rows-[200px] md:auto-rows-[300px]">
            {GALLERY_IMAGES.map((item, idx) => {
              const getGridSpan = (index: number) => {
                switch (index % 12) {
                  case 0: return 'md:col-span-2 md:row-span-2 col-span-2 row-span-2';
                  case 1: return 'md:col-span-1 md:row-span-1 col-span-1 row-span-1';
                  case 2: return 'md:col-span-1 md:row-span-2 col-span-1 row-span-2';
                  case 3: return 'md:col-span-1 md:row-span-1 col-span-1 row-span-1';
                  case 4: return 'md:col-span-2 md:row-span-1 col-span-2 row-span-1';
                  case 5: return 'md:col-span-1 md:row-span-1 col-span-1 row-span-1';
                  case 6: return 'md:col-span-1 md:row-span-1 col-span-1 row-span-1';
                  case 7: return 'md:col-span-2 md:row-span-2 col-span-2 row-span-2';
                  case 8: return 'md:col-span-1 md:row-span-1 col-span-1 row-span-1';
                  case 9: return 'md:col-span-1 md:row-span-2 col-span-1 row-span-2';
                  case 10: return 'md:col-span-1 md:row-span-1 col-span-1 row-span-1';
                  case 11: return 'md:col-span-1 md:row-span-1 col-span-1 row-span-1';
                  default: return 'col-span-1 row-span-1';
                }
              };

              const staggerDelay = (idx % 12) * 0.05;

              return (
                <div key={item.id} className={`${getGridSpan(idx)} h-full w-full`}>
                  <ScrollReveal animation="fade-in" delay={staggerDelay} className="h-full w-full">
                    <button
                      onClick={() => openLightbox(idx)}
                      className="relative block w-full h-full overflow-hidden bg-black shadow-sm hover:shadow-2xl transition-shadow duration-500 cursor-pointer group focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 rounded-sm"
                      aria-label={`View full image: ${item.alt}`}
                    >
                      <img
                        src={item.imageSrc}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                      
                      {/* Subtle Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Title overlay on hover */}
                      <div className="absolute bottom-6 left-6 right-6 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                        <h3 className="text-white text-sm md:text-base font-serif font-semibold tracking-wide line-clamp-2">
                          {item.alt}
                        </h3>
                      </div>
                    </button>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
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
