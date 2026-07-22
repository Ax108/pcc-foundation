import {ScrollReveal} from '@app/components/ScrollReveal';

const IMPACT_STATS = [
  { id: 1, number: '100+', label: 'Artists Supported' },
  { id: 2, number: '50+', label: 'Events Hosted' },
  { id: 3, number: '200+', label: 'Scholarships Awarded' },
  { id: 4, number: '9+', label: 'Years of Legacy' },
];

export const ImpactMade = () => {
  return (
    <section className="bg-primary text-white py-16 md:py-24 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-[50vw] h-[50vw] border-[2px] border-gold rounded-full -translate-x-1/2 -translate-y-1/2 blur-sm" />
        <div className="absolute top-1/2 right-1/4 w-[30vw] h-[30vw] border-[1px] border-white rounded-full translate-x-1/2 -translate-y-1/2 blur-sm" />
      </div>

      <div className="container-site relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {IMPACT_STATS.map((stat, idx) => (
            <ScrollReveal key={stat.id} animation="fade-up" delay={0.1 * idx}>
              <div className="flex flex-col items-center justify-center p-6">
                <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-2 drop-shadow-md">
                  {stat.number}
                </span>
                <span className="text-sm md:text-base tracking-[0.1em] uppercase font-semibold text-white/90">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
