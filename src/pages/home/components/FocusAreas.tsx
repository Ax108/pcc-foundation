import { Link } from 'react-router-dom';
import {ScrollReveal} from '@app/components/ScrollReveal';

const FOCUS_AREAS = [
  {
    id: 1,
    title: 'Financial Assistance',
    description: 'Providing crucial financial aid and scholarships to meritorious students passionate about traditional Indian music.',
    icon: '✦',
  },
  {
    id: 2,
    title: 'Awards & Recognition',
    description: 'Felicitating established artists and honoring new talents to celebrate excellence in performing arts.',
    icon: '✧',
  },
  {
    id: 3,
    title: 'Events & Exhibitions',
    description: 'Organizing festivals, soirees, and conferences to create a global platform for Indian musical heritage.',
    icon: '✹',
  }
];

export const FocusAreas = () => {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container-site">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">What We Do</p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
              Our Core <span className="text-gold italic font-medium">Focus</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="text-text/70 text-lg leading-relaxed">
              We are dedicated to preserving the rich legacy of Indian performing arts through direct support, recognition, and global platforms.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FOCUS_AREAS.map((area, idx) => (
            <ScrollReveal key={area.id} animation="fade-up" delay={0.2 * idx}>
              <div 
                className="bg-surface p-10 lg:p-12 border-t-4 border-gold shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full"
              >
                <div className="text-gold text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {area.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  {area.title}
                </h3>
                <p className="text-text/80 leading-relaxed font-light mb-8">
                  {area.description}
                </p>
                <Link 
                  to="/our-inspiration" 
                  className="inline-flex items-center text-primary font-bold uppercase tracking-widest text-xs hover:text-gold transition-colors"
                >
                  Learn More <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
