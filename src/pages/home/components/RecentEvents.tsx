import { useState, useEffect } from 'react';
import { EVENTS_DATA } from '@events/constants/eventsConstants';
import {ScrollReveal} from '@app/components/ScrollReveal';

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
    <section className="bg-muted py-20 md:py-32 overflow-hidden relative">
      <div className="container-site">
        <div className="mb-16 text-center">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">
              Recent Highlights
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary">
              Discover Our Events
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="mt-4 text-text/70 max-w-2xl mx-auto">
              Explore our latest performances and cultural gatherings that celebrate the essence of traditional Indian arts.
            </p>
          </ScrollReveal>
        </div>

        {/* Events Carousel */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentEvents.map((event, idx) => (
              <ScrollReveal key={event.id} animation="fade-up" delay={0.1 * idx}>
                <div 
                  className="flex flex-col bg-white rounded-t-2xl rounded-b-md shadow-sm border border-black/5 overflow-hidden group h-full">
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={event.imageSrc}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <a href={event.url} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 bg-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg hover:bg-secondary transition-colors">
                      Read More
                    </a>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-serif font-bold text-primary mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="text-sm text-text/70 mb-6 flex-1 line-clamp-3">
                      {event.description}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border/40">
                      <div className="flex flex-col">
                        <span className="text-xs text-primary/60 font-semibold uppercase tracking-wider">Foundation</span>
                        <span className="text-sm font-medium text-text mt-1">Cultural Arts</span>
                      </div>
                      <div className="h-8 w-[1px] bg-border/40"></div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-primary/60 font-semibold uppercase tracking-wider">Status</span>
                        <span className="text-sm font-medium text-text mt-1">Completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Carousel Dots */}
          {totalPages > 1 && (
            <ScrollReveal animation="fade-in" delay={0.4}>
              <div className="flex justify-center items-center gap-3 mt-12">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-primary scale-125' : 'bg-primary/20 hover:bg-primary/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
};
