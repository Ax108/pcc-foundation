import { useEffect, useRef, useState } from 'react';
import {ScrollReveal} from '@app/components/ScrollReveal';

const IMPACT_STATS = [
  { id: 1, number: 100, suffix: '+', label: 'Artists Supported' },
  { id: 2, number: 50,  suffix: '+', label: 'Events Hosted' },
  { id: 3, number: 200, suffix: '+', label: 'Scholarships Awarded' },
  { id: 4, number: 9,   suffix: '+', label: 'Years of Legacy' },
];

function useCountUp(target: number, duration = 1200, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function StatCard({ stat, started, delay }: { stat: typeof IMPACT_STATS[0]; started: boolean; delay: number }) {
  const [go, setGo] = useState(false);
  const count = useCountUp(stat.number, 1400, go);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);

  return (
    <ScrollReveal animation="fade-up" delay={delay / 1000}>
      <div className="flex flex-col items-center justify-center p-6">
        <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-2 drop-shadow-md tabular-nums">
          {count}{stat.suffix}
        </span>
        <span className="text-sm md:text-base tracking-[0.1em] uppercase font-semibold text-white/90">
          {stat.label}
        </span>
      </div>
    </ScrollReveal>
  );
}

export const ImpactMade = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-primary text-white py-16 md:py-24 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-[50vw] h-[50vw] border-[2px] border-gold rounded-full -translate-x-1/2 -translate-y-1/2 blur-sm" />
        <div className="absolute top-1/2 right-1/4 w-[30vw] h-[30vw] border-[1px] border-white rounded-full translate-x-1/2 -translate-y-1/2 blur-sm" />
      </div>

      <div className="container-site relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {IMPACT_STATS.map((stat, idx) => (
            <StatCard key={stat.id} stat={stat} started={started} delay={idx * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};
