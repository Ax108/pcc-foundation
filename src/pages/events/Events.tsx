import {useSEO} from '@app/hooks/useSEO';
import {IMAGES} from '@src/constants/images';
import {EVENTS_DATA} from './constants/eventsConstants';
import {ScrollReveal} from '@app/components/ScrollReveal';

export const Events = () => {
  useSEO({
    title: 'Events - Pratima Chandra Foundation',
    description: 'Explore our latest events and awards ceremonies.',
  });

  const featuredEvent = EVENTS_DATA[0];
  const pastEvents = EVENTS_DATA.slice(1);

  return (
    <article aria-label="Events" className="bg-surface">
      {/* Hero Banner */}
      <header className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-surface flex items-center pt-16 md:pt-24 border-b border-gold/10">
        {/* Decorative Shapes for Matte background */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-primary/10 rounded-full pointer-events-none rotate-45" />
        
        <div className="container-site relative z-10 h-full flex flex-col md:flex-row items-center justify-between gap-8 py-8 md:py-12">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left order-2 md:order-1">
            <ScrollReveal animation="fade-in" delay={0.1}>
              <div className="inline-flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="w-8 md:w-12 h-[2px] bg-gold"></span>
                <p className="text-primary tracking-[0.2em] uppercase text-xs md:text-sm font-bold">Discover Our</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <h1 className="text-primary text-5xl md:text-6xl lg:text-[4.5rem] font-serif font-bold drop-shadow-sm tracking-wide leading-[1.1] mb-6">
                Events & <br className="hidden md:block" />
                <span className="text-gold italic font-medium">Ceremonies</span>
              </h1>
            </ScrollReveal>
          </div>

          {/* Photo Element */}
          <div className="hidden md:flex w-full md:w-1/2 h-full items-center justify-center md:justify-end order-1 md:order-2 perspective-1000">
            <ScrollReveal animation="scale-up" delay={0.2}>
              <div className="relative w-48 sm:w-56 md:w-72 lg:w-96 aspect-[4/3] rotate-3 hover:rotate-0 transition-transform duration-700">
                {/* Offset Background Shape */}
                <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 rounded-[2rem] -z-10" />
                
                {/* Image */}
                <img
                  src="/assets/gallery/PCMA-2016-Event-scaled.jpg"
                  alt="Foundation Event"
                  className="w-full h-full object-cover object-center rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 md:border-8 border-white"
                />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 md:-bottom-10 -left-6 md:-left-10 bg-white/95 backdrop-blur-sm p-3 md:p-5 shadow-xl border-l-4 border-primary rounded-r-sm z-20 -rotate-3">
                  <p className="text-gold font-serif font-bold text-sm md:text-lg leading-tight">
                    Celebrating <br/> Excellence
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </header>

      {/* Featured Event Section */}
      {featuredEvent && (
        <section className="py-20 md:py-32 relative">
          <div className="container-site max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <ScrollReveal animation="fade-up" delay={0.1}>
                <h2 className="text-3xl font-serif font-bold text-primary italic">Featured Event</h2>
              </ScrollReveal>
            </div>
            
            <ScrollReveal animation="fade-up" delay={0.2}>
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gold/10 relative">
                {/* Image side */}
                <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto">
                  <img
                    src={featuredEvent.imageSrc}
                    alt={featuredEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content side */}
                <div className="w-full lg:w-1/2 p-10 md:p-14 flex flex-col justify-center bg-white relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6 leading-snug relative z-10">
                    {featuredEvent.title}
                  </h3>
                  <div className="text-lg text-text/70 mb-10 flex flex-col gap-4 font-light leading-relaxed relative z-10">
                    {featuredEvent.description.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  <div className="mt-auto relative z-10">
                    <a
                      href={featuredEvent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-10 py-4 bg-primary text-white font-bold hover:bg-secondary transition-all duration-300 uppercase tracking-widest text-xs"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Past Events Grid */}
      {pastEvents.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-site max-w-7xl mx-auto">
            <div className="flex items-center gap-6 mb-16">
              <h3 className="text-2xl font-serif font-bold text-primary tracking-wide whitespace-nowrap">Past Events</h3>
              <div className="h-[1px] flex-1 bg-gold/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {pastEvents.map((event, idx) => (
                <ScrollReveal key={event.id} animation="fade-up" delay={0.1 * idx}>
                  <div 
                    className="flex flex-col bg-surface shadow-sm hover:shadow-xl transition-shadow duration-500 group rounded-md overflow-hidden border border-black/5 h-full"
                  >
                    <div className="w-full overflow-hidden aspect-[4/3]">
                      <img
                        src={event.imageSrc}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-1 bg-white relative">
                      <h4 className="text-xl font-serif font-bold text-primary mb-4 leading-snug line-clamp-2">
                        {event.title}
                      </h4>
                      <div className="text-sm text-text/70 mb-8 flex-1 flex flex-col gap-2 font-light leading-relaxed line-clamp-3">
                        {event.description.split('\n').map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.15em] uppercase text-xs hover:text-gold transition-colors mt-auto group/btn"
                      >
                        Read More
                        <span className="text-base leading-none transform transition-transform group-hover/btn:translate-x-1" aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};
