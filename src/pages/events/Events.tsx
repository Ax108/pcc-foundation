import {useSEO} from '@app/hooks/useSEO';
import {IMAGES} from '@src/constants/images';
import {EVENTS_DATA} from './constants/eventsConstants';

export const Events = () => {
  useSEO({
    title: 'Events - Pratima Chandra Foundation',
    description: 'Explore our latest events and awards ceremonies.',
  });

  return (
    <article aria-label="Events" className="animate-page">
      {/* Hero Banner */}
      <header className="relative w-full h-40 md:h-56 lg:h-72 overflow-hidden bg-surface">
        <img
          src={IMAGES.HERO_HEADER}
          alt="Foundation events banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <h1 className="!text-white text-4xl md:text-5xl lg:text-6xl font-semibold drop-shadow-md">
            Events
          </h1>
        </div>
      </header>

      {/* Events Grid */}
      <section className="bg-[#fafafa] py-16 md:py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {EVENTS_DATA.map((event) => (
              <div key={event.id} className="flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-full overflow-hidden aspect-[16/9]">
                  <img
                    src={event.imageSrc}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-primary mb-4 leading-tight">
                    {event.title}
                  </h2>
                  <div className="text-sm text-text mb-6 flex-1 flex flex-col gap-1">
                    {event.description.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 !text-white font-medium px-5 py-2.5 rounded self-start transition-colors text-sm"
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
        </div>
      </section>
    </article>
  );
};
