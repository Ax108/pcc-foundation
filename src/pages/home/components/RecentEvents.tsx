import { useState, useEffect } from 'react';
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
    <section className="bg-[#f5f5f5] py-16 md:py-24">
      <div className="container-site">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Recent <span className="text-gold">Events</span>
        </h2>

        {/* Video Embed */}
        <div className="w-full max-w-4xl mx-auto aspect-video mb-16 shadow-lg bg-black">
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

        {/* Events Carousel */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px]">
            {currentEvents.map((event) => (
              <div key={event.id} className="flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full overflow-hidden aspect-[16/9]">
                  <img
                    src={event.imageSrc}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-primary mb-3 leading-tight line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="text-sm text-text mb-6 flex-1 flex flex-col gap-1">
                    {event.description.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 !text-white font-medium px-4 py-2 rounded self-start transition-colors text-sm mt-auto"
                  >
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    idx === currentIndex ? 'bg-accent' : 'bg-accent/20 hover:bg-accent/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
