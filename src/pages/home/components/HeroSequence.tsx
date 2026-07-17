import { useState, useEffect } from 'react';
import { HERO_SLIDES } from '@home/constants/heroSlides';
import { Link } from 'react-router-dom';
import {ScrollReveal} from '@app/components/ScrollReveal';

const BACKGROUND_IMAGES = [
  '/assets/events/PCMA-Collage.jpg',
  '/assets/events/featured-image-1-1024x499.jpg',
  '/assets/events/collage-2.png',
];

export const HeroSequence = () => {
  const heroImage = HERO_SLIDES[0].imageSrc;
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-black flex items-center pt-24 pb-16">
      
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        {BACKGROUND_IMAGES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt="Foundation Hero Background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentBgIndex ? 'opacity-50' : 'opacity-0'
            }`}
          />
        ))}
        {/* Transparent Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
      </div>

      {/* Decorative Background Shapes */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-gold/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-gold/40 rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white/20 rounded-full pointer-events-none z-0" />

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col items-start justify-center order-2 lg:order-1">
            <ScrollReveal animation="fade-in" delay={0.1}>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-12 h-[2px] bg-gold"></span>
                <span className="text-white tracking-[0.2em] uppercase text-sm font-bold">
                  Preserving Traditional Arts
                </span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={0.2}>
              <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-serif font-bold leading-[1.05] mb-6 drop-shadow-lg">
                Pratima <br />
                <span className="text-gold italic font-medium">Chandra</span> <br />
                Foundation
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.3}>
              <p className="text-white/90 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-light drop-shadow-md">
                An independent research, training and support institution for the promotion and development of performing arts and traditional Indian music.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-5 items-start w-full sm:w-auto">
                <Link 
                  to="/application-form" 
                  className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 bg-primary text-white font-medium hover:bg-secondary transition-all duration-300 rounded-sm uppercase tracking-wider text-sm shadow-xl shadow-primary/20 hover:-translate-y-1 border border-primary hover:border-secondary"
                >
                  Download Form
                </Link>
                <a 
                  href="#about-section" 
                  className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-medium hover:bg-white hover:text-primary transition-all duration-300 rounded-sm uppercase tracking-wider text-sm shadow-lg"
                >
                  Discover Legacy
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Image & Shapes Section */}
          <div className="hidden lg:flex relative justify-center lg:justify-end order-1 lg:order-2">
            {/* Main Image Container */}
            <ScrollReveal animation="scale-up" delay={0.2}>
              <div className="relative w-full max-w-md lg:max-w-lg aspect-[3/4] z-10">
                {/* Decorative Arch Background */}
                <div className="absolute inset-0 bg-gold/20 backdrop-blur-sm rounded-t-full transform translate-x-6 translate-y-6 -z-10" />
                
                {/* Image Box */}
                <div className="w-full h-full rounded-t-full overflow-hidden border-8 border-white/10 shadow-2xl relative bg-black/50 backdrop-blur-sm">
                  <img
                    src={heroImage}
                    alt="Foundation Hero"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Floating Badge */}
                <div className="absolute bottom-12 -left-8 lg:-left-16 bg-white/95 backdrop-blur-md p-6 shadow-2xl border-l-4 border-gold z-20 max-w-[200px] rounded-r-sm">
                  <p className="text-primary font-serif font-bold text-xl leading-tight">
                    Empowering <br/> Indian Artists
                  </p>
                  <p className="text-gold text-sm font-bold uppercase tracking-wider mt-2">Since 2016</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
