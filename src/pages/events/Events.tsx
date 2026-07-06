import {useSEO} from '@app/hooks/useSEO';
import {IMAGES} from '@src/constants/images';
import {EVENTS_DATA} from './constants/eventsConstants';
import {motion} from 'framer-motion';

export const Events = () => {
  useSEO({
    title: 'Events - Pratima Chandra Foundation',
    description: 'Explore our latest events and awards ceremonies.',
  });

  return (
    <article aria-label="Events">
      {/* Hero Banner */}
      <header className="relative w-full h-56 md:h-72 lg:h-[400px] overflow-hidden bg-black">
        <motion.div
          initial={{ scale: 1.1, filter: 'brightness(0.3)' }}
          animate={{ scale: 1, filter: 'brightness(0.6)' }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={IMAGES.HERO_HEADER}
            alt="Foundation events banner"
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
            Events
          </motion.h1>
        </div>
      </header>

      {/* Events Grid */}
      <section className="bg-surface py-20 md:py-32">
        <div className="container-site">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 min-h-[450px]">
              {EVENTS_DATA.map((event, idx) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: (idx % 3) * 0.15 }}
                  className="flex flex-col bg-surface shadow-[0_15px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-shadow duration-700 group">
                  <div className="w-full overflow-hidden aspect-[4/3]">
                    <img
                      src={event.imageSrc}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col flex-1 bg-white relative">
                    {/* Decorative gold line above text */}
                    <div className="absolute top-0 left-8 right-8 h-[1px] bg-gold/30" />
                    
                    <h2 className="text-2xl font-serif font-bold text-primary mb-4 leading-snug line-clamp-2">
                      {event.title}
                    </h2>
                    <div className="text-base text-primary/70 mb-8 flex-1 flex flex-col gap-2 font-light leading-relaxed">
                      {event.description.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-gold font-bold tracking-[0.2em] uppercase text-xs transition-colors hover:text-primary mt-auto group/btn"
                    >
                      Read More
                      <span className="text-lg leading-none transform transition-transform group-hover/btn:translate-x-1" aria-hidden="true">→</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
