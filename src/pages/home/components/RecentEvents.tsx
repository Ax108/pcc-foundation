import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EVENTS_DATA } from '@events/constants/eventsConstants';

export const RecentEvents = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Handle responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    
    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(EVENTS_DATA.length / itemsPerPage);

  // Reset current index if window resize causes it to be out of bounds
  useEffect(() => {
    if (currentIndex >= totalPages && totalPages > 0) {
      setCurrentIndex(totalPages - 1);
    }
  }, [totalPages, currentIndex]);

  const currentEvents = EVENTS_DATA.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section className="bg-surface py-20 md:py-32 overflow-hidden">
      <div className="container-site">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-primary">
            Recent <span className="text-gold italic font-medium">Events</span>
          </h2>
          <span className="bg-gold mx-auto mt-6 block h-[2px] w-20" aria-hidden="true" />
        </motion.div>

        {/* Video Embed with Cinematic Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto aspect-video mb-24 lg:mb-32 relative group">
          <div className="absolute -inset-4 md:-inset-6 border border-gold/30 rounded-sm translate-x-4 translate-y-4 transition-transform duration-700 pointer-events-none" />
          <div className="relative w-full h-full shadow-[0_30px_80px_rgba(115,31,41,0.15)] overflow-hidden z-10 bg-black">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/eoZaVhNJEYI?start=2" 
              title="Pratima Chandra Foundation Event Video" 
              style={{ border: 0 }} 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        {/* Events Carousel */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 min-h-[450px]">
            {currentEvents.map((event, idx) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
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
                  
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4 leading-snug line-clamp-2">
                    {event.title}
                  </h3>
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

          {/* Carousel Dots */}
          {totalPages > 1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center items-center gap-4 mt-16">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-2 h-2 rounded-full transition-all duration-500 ${
                    idx === currentIndex ? 'bg-gold scale-150' : 'bg-primary/20 hover:bg-primary/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {idx === currentIndex && (
                    <span className="absolute -inset-2 border border-gold rounded-full opacity-50 animate-pulse" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
