import {useSEO} from '@app/hooks/useSEO';

import {OUR_INSPIRATION_CONTENT} from './constants/textConstants';
import {ScrollReveal} from '@app/components/ScrollReveal';

const MentorCard = ({name, imageSrc}: {name: string; imageSrc: string}) => (
  <div className="flex flex-col bg-white border border-secondary/10 shadow-sm hover:shadow-xl transition-all duration-300 w-full group overflow-hidden rounded-md">
    <div className="w-full aspect-square relative bg-surface overflow-hidden">
      {imageSrc && <img src={imageSrc} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
    </div>
    <div className="py-4 px-3 flex-grow flex items-center justify-center bg-white">
      <span className="text-center text-[10px] md:text-xs font-bold tracking-widest uppercase text-primary">{name}</span>
    </div>
  </div>
);

export const OurInspiration = () => {
  useSEO({
    title: 'Our Inspiration - Pratima Chandra Foundation',
    description: 'Learn about the life and legacy of Smt. Pratima Chandra.',
  });

  const {about, programs, life} = OUR_INSPIRATION_CONTENT;

  return (
    <article aria-label="Our Inspiration" className="bg-surface overflow-hidden">
      {/* Hero Banner */}
      <header className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-surface flex items-center pt-16 md:pt-24 border-b border-gold/10">
        {/* Decorative Shapes for Matte background */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-gold/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-24 h-24 border border-gold/20 rounded-full pointer-events-none" />
        
        <div className="container-site relative z-10 h-full flex flex-col md:flex-row items-center justify-between gap-8 py-8 md:py-12">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left order-2 md:order-1">
            <ScrollReveal animation="fade-in" delay={0.1}>
              <div className="inline-flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="w-8 md:w-12 h-[2px] bg-gold"></span>
                <p className="text-primary tracking-[0.2em] uppercase text-xs md:text-sm font-bold">The Legacy of</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <h1 className="text-primary text-5xl md:text-6xl lg:text-[5rem] font-serif font-bold drop-shadow-sm tracking-wide leading-[1.1] mb-6">
                Our <br className="hidden md:block" />
                <span className="text-gold italic font-medium">Inspiration</span>
              </h1>
            </ScrollReveal>
          </div>

          {/* Photo Element */}
          <div className="hidden md:flex w-full md:w-1/2 h-full items-center justify-center md:justify-end order-1 md:order-2">
            <ScrollReveal animation="scale-up" delay={0.2}>
              <div className="relative w-40 sm:w-48 md:w-64 lg:w-80 aspect-[3/4]">
                {/* Offset Background Shape */}
                <div className="absolute inset-0 bg-gold/20 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 rounded-t-full -z-10" />
                
                {/* Image */}
                <img
                  src={life.section3.image.imageSrc}
                  alt="Smt. Pratima Chandra"
                  className="w-full h-full object-cover object-top rounded-t-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 md:border-8 border-white"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 md:bottom-12 -left-4 md:-left-12 bg-white/95 backdrop-blur-sm p-3 md:p-5 shadow-xl border-l-4 border-gold rounded-r-sm z-20">
                  <p className="text-primary font-serif font-bold text-sm md:text-lg leading-tight">
                    A Life of <br/> Devotion
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </header>

      {/* About - Prominent Elegant Intro */}
      <section className="py-20 md:py-32 relative">
        {/* Decorative Eye-Catching Shapes */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-gold/5 rounded-bl-full pointer-events-none -z-10" />
        <div className="absolute top-20 left-10 w-24 h-24 border-4 border-primary/10 rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-primary/5 rotate-45 pointer-events-none -z-10" />

        <div className="container-site relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                {about.heading.normal} <span className="text-gold italic font-medium">{about.heading.gold}</span>
              </h2>
            </ScrollReveal>
            <div className="w-16 h-[2px] bg-gold mx-auto" />
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 bg-white p-6 md:p-16 rounded-br-[3rem] md:rounded-br-[5rem] shadow-xl relative border-t-4 border-gold">
            <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 text-gold opacity-10 text-[6rem] md:text-[10rem] font-serif leading-none pointer-events-none">"</div>
            <div className="flex flex-col gap-4 md:gap-6 text-text/80 text-base md:text-lg font-light leading-relaxed relative z-10">
              <ScrollReveal animation="fade-in" delay={0.2} className="first-letter:text-5xl md:first-letter:text-7xl first-letter:font-serif first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                <p><strong className="text-primary font-bold">{about.paragraphs[0].bold}</strong>{about.paragraphs[0].text}</p>
              </ScrollReveal>
              <ScrollReveal animation="fade-in" delay={0.3}>
                <p><strong className="text-primary font-bold">{about.paragraphs[1].bold}</strong>{about.paragraphs[1].text}</p>
              </ScrollReveal>
            </div>
            <div className="flex flex-col gap-4 md:gap-6 text-text/80 text-base md:text-lg font-light leading-relaxed relative z-10">
              <ScrollReveal animation="fade-in" delay={0.4}>
                <p><strong className="text-primary font-bold">{about.paragraphs[2].bold}</strong>{about.paragraphs[2].text}</p>
              </ScrollReveal>
              <ScrollReveal animation="fade-in" delay={0.5}>
                <p><strong className="text-primary font-bold">{about.paragraphs[3].bold}</strong>{about.paragraphs[3].text}</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Pull Quote Break */}
      <section className="py-24 md:py-40 bg-primary relative overflow-hidden flex items-center justify-center">
        {/* Massive Bold Shapes */}
        <div className="absolute top-0 right-0 w-[50vw] h-[100%] bg-black/10 transform skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] border-[40px] border-white/5 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        <div className="container-site max-w-5xl mx-auto text-center relative z-10">
          <span className="text-white text-[12rem] md:text-[20rem] font-serif leading-none absolute -top-16 md:-top-32 left-0 md:-left-10 opacity-10 drop-shadow-xl select-none">"</span>
          <ScrollReveal animation="scale-up" delay={0.1}>
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-serif italic font-light leading-tight relative z-10 drop-shadow-md">
              Music to her was a very personal way to connect with the eternal source of goodness and life all around.
            </h2>
          </ScrollReveal>
          <span className="text-white text-[12rem] md:text-[20rem] font-serif leading-none absolute -bottom-24 md:-bottom-40 right-0 md:-right-10 opacity-10 drop-shadow-xl select-none rotate-180">"</span>
        </div>
      </section>

      {/* Visual Timeline: The Life of Pratima Chandra */}
      <section className="py-20 md:py-32 bg-white relative">
        {/* Decorative Arch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-surface rounded-b-full pointer-events-none -z-10" />

        <div className="container-site max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                {life.heading.normal} <span className="text-gold italic font-medium">{life.heading.gold}</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="text-text/60 uppercase tracking-widest text-sm font-bold">A Journey of Devotion</p>
            </ScrollReveal>
          </div>

          <div className="relative">
            {/* Center Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gold/20 -translate-x-1/2" />

            {/* Timeline Item 1: Early Life */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-24 relative">
              <div className="hidden md:flex absolute left-1/2 top-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white -translate-x-1/2 -translate-y-1/2 shadow-lg z-20" />
              <div className="w-full md:w-[45%] mb-8 md:mb-0 text-right md:pr-10 relative">
                <div className="absolute -right-4 -top-8 text-[6rem] font-serif font-bold text-surface -z-10">01</div>
                <ScrollReveal animation="fade-up" delay={0.1}>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4 relative z-10">The Early Years</h3>
                  <p className="text-text/70 leading-relaxed font-light relative z-10"><strong className="text-primary font-bold">{life.section1.paragraphs[0].bold}</strong>{life.section1.paragraphs[0].text}</p>
                  <p className="text-text/70 leading-relaxed font-light mt-4 relative z-10"><strong className="text-primary font-bold">{life.section1.paragraphs[2].bold}</strong>{life.section1.paragraphs[2].text}</p>
                </ScrollReveal>
              </div>
              <div className="w-full md:w-[45%] md:pl-10">
                <ScrollReveal animation="fade-in" delay={0.2}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gold translate-x-4 translate-y-4 rounded-tl-[3rem] rounded-br-[3rem] -z-10" />
                    <img src={life.section1.image.imageSrc} alt={life.section1.image.name} className="w-full aspect-[4/3] object-cover rounded-tl-[3rem] rounded-br-[3rem] shadow-xl relative z-10" />
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Timeline Item 2: Awards */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-24 relative">
              <div className="hidden md:flex absolute left-1/2 top-1/2 w-6 h-6 rounded-full bg-gold border-4 border-white -translate-x-1/2 -translate-y-1/2 shadow-lg z-20" />
              <div className="w-full md:w-[45%] mb-8 md:mb-0 text-left md:pl-10 relative">
                <div className="absolute -left-4 -top-8 text-[6rem] font-serif font-bold text-surface -z-10">02</div>
                <ScrollReveal animation="fade-up" delay={0.1}>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4 relative z-10">Excellence & Recognition</h3>
                  <p className="text-text/70 leading-relaxed font-light relative z-10"><strong className="text-primary font-bold">{life.section2.paragraphs[0].bold}</strong>{life.section2.paragraphs[0].text}</p>
                  <p className="text-text/70 leading-relaxed font-light mt-4 relative z-10"><strong className="text-primary font-bold">{life.section2.paragraphs[1].bold}</strong>{life.section2.paragraphs[1].text}</p>
                </ScrollReveal>
              </div>
              <div className="w-full md:w-[45%] md:pr-10">
                <ScrollReveal animation="fade-in" delay={0.2}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary translate-x-[-1rem] translate-y-4 rounded-tr-[3rem] rounded-bl-[3rem] -z-10" />
                    <img src={life.section2.image.imageSrc} alt={life.section2.image.name} className="w-full aspect-[4/3] object-cover rounded-tr-[3rem] rounded-bl-[3rem] shadow-xl relative z-10" />
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Timeline Item 3: Later Life */}
            <div className="flex flex-col md:flex-row items-center justify-between relative">
              <div className="hidden md:flex absolute left-1/2 top-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white -translate-x-1/2 -translate-y-1/2 shadow-lg z-20" />
              <div className="w-full md:w-[45%] mb-8 md:mb-0 text-right md:pr-10 relative">
                <div className="absolute -right-4 -top-8 text-[6rem] font-serif font-bold text-surface -z-10">03</div>
                <ScrollReveal animation="fade-up" delay={0.1}>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4 relative z-10">A Lasting Legacy</h3>
                  <p className="text-text/70 leading-relaxed font-light relative z-10"><strong className="text-primary font-bold">{life.section3.paragraphs[1].bold}</strong>{life.section3.paragraphs[1].text}</p>
                </ScrollReveal>
              </div>
              <div className="w-full md:w-[45%] md:pl-10">
                <ScrollReveal animation="fade-in" delay={0.2}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gold translate-x-4 translate-y-4 rounded-full -z-10" />
                    <img src={life.section3.image.imageSrc} alt={life.section3.image.name} className="w-full aspect-[4/3] object-cover object-top rounded-full shadow-xl relative z-10" />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="py-20 bg-surface border-y border-gold/10 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gold/5 rounded-full pointer-events-none" />
        <div className="container-site max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h3 className="text-3xl font-serif font-bold text-primary italic">Her Mentors</h3>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {life.gurus.map((guru, idx) => (
              <ScrollReveal key={idx} animation="scale-up" delay={0.1 * idx}>
                <MentorCard name={guru.name} imageSrc={guru.imageSrc!} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Cards */}
      <section className="bg-white py-20 md:py-32 relative">
        <div className="container-site max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <ScrollReveal animation="fade-up" delay={0.1}>
              <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Objectives</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                {programs.heading.normal} <span className="text-gold italic font-medium">{programs.heading.gold}</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.list.map((item, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={0.1 * idx}>
                <div className="bg-surface p-10 border-l-4 border-gold hover:shadow-2xl transition-all duration-300 rounded-r-2xl relative overflow-hidden group h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full transform group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                  <span className="text-gold text-4xl block mb-6 font-serif">"</span>
                  <p className="text-text/80 leading-relaxed font-light relative z-10">
                    {item}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};
