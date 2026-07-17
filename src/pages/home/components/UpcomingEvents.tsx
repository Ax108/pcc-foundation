import { Link } from 'react-router-dom';
import {ScrollReveal} from '@app/components/ScrollReveal';

export const UpcomingEvents = () => {
  return (
    <section className="bg-surface py-20 md:py-32 relative">
      <div className="container-site max-w-5xl mx-auto">
        <ScrollReveal animation="scale-up" delay={0.1}>
          <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-lg overflow-hidden border border-gold/20 flex flex-col md:flex-row items-stretch relative">
            
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full pointer-events-none" />

            {/* Date Box */}
            <div className="bg-primary text-white p-10 flex flex-col justify-center items-center md:w-1/3 min-w-[250px] z-10">
              <ScrollReveal animation="fade-up" delay={0.2}>
                <div className="flex flex-col items-center">
                  <span className="text-sm tracking-[0.2em] uppercase font-semibold text-gold mb-2">Upcoming Event</span>
                  <span className="text-6xl font-serif font-bold leading-none mb-1">24</span>
                  <span className="text-2xl font-light tracking-wide mb-4">August 2026</span>
                  <span className="w-12 h-[1px] bg-gold/50" />
                  <span className="mt-4 text-sm font-medium opacity-90">Kolkata, India</span>
                </div>
              </ScrollReveal>
            </div>

            {/* Details Box */}
            <div className="p-10 md:p-14 flex-1 flex flex-col justify-center bg-white z-10">
              <ScrollReveal animation="slide-left" delay={0.3}>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                  Annual Music Festival & Awards
                </h3>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={0.4}>
                <p className="text-text/70 text-lg leading-relaxed mb-8">
                  Join us for a mesmerizing evening of classical performances as we felicitate the emerging talents in Rabindra Sangeet and traditional Indian music. Experience the legacy live.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={0.5}>
                <div className="mt-auto">
                  <Link 
                    to="/events"
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-white border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 uppercase tracking-widest text-xs"
                  >
                    Learn More
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
