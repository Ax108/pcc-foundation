import {useSEO} from '@app/hooks/useSEO';
import {IMAGES} from '@src/constants/images';
import {OUR_INSPIRATION_CONTENT} from './constants/textConstants';
import {motion} from 'framer-motion';

const InspirationImage = ({name, imageSrc, className, imageClassName = "aspect-[3/4]"}: {name: string; imageSrc?: string; className?: string; imageClassName?: string}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`flex flex-col items-center group ${className}`}
  >
    <div className="relative w-full h-full">
      {/* Decorative Gold Frame */}
      <div className="absolute -inset-3 lg:-inset-4 border border-gold/40 translate-x-2 translate-y-2 lg:translate-x-4 lg:translate-y-4 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2 pointer-events-none z-0" />
      
      <div className={`relative z-10 w-full h-full overflow-hidden shadow-2xl bg-surface ${imageClassName}`}>
        {imageSrc ? (
          <img src={imageSrc} alt={name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        ) : (
          <div className="flex w-full h-full items-center justify-center p-4 text-center">
            <span className="text-sm font-medium leading-tight text-primary/50">Placeholder: {name}</span>
          </div>
        )}
      </div>
    </div>
    {name && <span className="block mt-8 text-sm font-bold tracking-widest uppercase text-gold text-center">{name}</span>}
  </motion.div>
);

export const OurInspiration = () => {
  useSEO({
    title: 'Our Inspiration - Pratima Chandra Foundation',
    description: 'Learn about the life and legacy of Smt. Pratima Chandra.',
  });

  const {about, programs, life} = OUR_INSPIRATION_CONTENT;

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <article aria-label="Our Inspiration">
      {/* Hero Banner */}
      <header className="relative w-full h-56 md:h-72 lg:h-[450px] overflow-hidden bg-black">
        <motion.div
          initial={{ scale: 1.1, filter: 'brightness(0.2)' }}
          animate={{ scale: 1, filter: 'brightness(0.5)' }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={IMAGES.HERO_HEADER}
            alt="Foundation header banner"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="!text-white text-5xl md:text-6xl lg:text-7xl font-serif font-bold drop-shadow-lg tracking-wide"
          >
            Our Inspiration
          </motion.h1>
        </div>
      </header>

      {/* About Section - Editorial Intro */}
      <section className="bg-surface py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="container-site relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="mb-8 text-5xl font-serif font-bold md:text-6xl text-primary leading-tight">
              {about.heading.normal} <span className="text-gold italic font-medium">{about.heading.gold}</span>
            </h2>
            <div className="w-24 h-[1px] bg-gold mx-auto mb-12" />
          </motion.div>
          
          <div className="max-w-3xl mx-auto relative">
            {/* Background Decorative Box */}
            <div className="absolute -inset-8 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] -z-10 hidden md:block" />
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpVariant}
              className="flex flex-col gap-8 text-text opacity-90 text-lg md:text-xl font-light leading-relaxed first-letter:text-7xl first-letter:font-serif first-letter:text-gold first-letter:mr-3 first-letter:float-left first-letter:leading-none relative z-10"
            >
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>
                  <strong className="text-primary font-serif font-bold tracking-wide mr-1">{p.bold}</strong>{p.text}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Life Section 1: Early Life (Deep Layering) */}
      <section className="bg-white py-20 md:py-32 relative">
        <div className="container-site">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-16 md:mb-24 text-center md:text-left relative z-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
              {life.heading.normal} <span className="text-gold italic font-medium">{life.heading.gold}</span>
            </h2>
          </motion.div>
          
          {/* Clean 2-Column Side-by-Side Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mb-32 relative">
            {/* Image Layer */}
            <div className="order-1 md:order-2 z-0 relative">
              <div className="absolute top-1/2 -translate-y-1/2 -right-24 w-[120%] h-[120%] bg-surface/50 rounded-full blur-3xl -z-10" />
              <InspirationImage name="" imageSrc={life.section1.image.imageSrc} imageClassName="aspect-[4/3] md:aspect-[3/4]" />
            </div>

            {/* Text Layer */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1 z-10 relative"
            >
              <div className="bg-white/95 backdrop-blur-md p-8 md:p-12 lg:p-14 shadow-xl border-l-[3px] border-gold">
                <div className="flex flex-col gap-6 text-text opacity-90 text-lg font-light leading-relaxed">
                  {life.section1.paragraphs.map((p, idx) => (
                    <p key={idx}>
                      <strong className="text-primary font-serif font-bold tracking-wide mr-1">{p.bold}</strong>{p.text}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Gurus Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 relative"
          >
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[120%] bg-surface/30 -z-10 skew-y-3" />

            <div className="flex items-center gap-6 mb-16 relative z-10">
              <div className="h-[1px] flex-1 bg-gold/30" />
              <h3 className="text-3xl font-serif font-bold text-primary italic">Her Mentors</h3>
              <div className="h-[1px] flex-1 bg-gold/30" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
              {life.gurus.map((guru, idx) => (
                <InspirationImage key={idx} name={guru.name} imageSrc={guru.imageSrc} imageClassName="aspect-[3/4]" />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Life Section 2: Awards */}
      <section className="bg-surface py-20 md:py-32 relative overflow-hidden">
        {/* Background texture element */}
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] border-[1px] border-gold/10 rounded-full -translate-x-1/2 translate-y-1/4 pointer-events-none" />

        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Layer */}
            <div className="z-10 relative order-1">
              <InspirationImage name="" imageSrc={life.section2.image.imageSrc} imageClassName="aspect-[4/3] md:aspect-[3/4]" />
            </div>

            {/* Text Layer */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="z-0 relative order-2"
            >
              <div className="bg-white p-8 md:p-12 lg:p-14 shadow-xl border-l-[3px] border-gold relative">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
                
                <div className="flex flex-col gap-6 text-text opacity-90 text-lg font-light leading-relaxed relative z-10">
                  {life.section2.paragraphs.map((p, idx) => (
                    <p key={idx}>
                      <strong className="text-primary font-serif font-bold tracking-wide mr-1">{p.bold}</strong>{p.text}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Life Section 3: Later Life */}
      <section className="bg-white py-20 md:py-32 relative">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Layer */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1 z-10 relative"
            >
              <div className="bg-surface p-8 md:p-12 lg:p-14 shadow-xl border-l-[3px] border-gold">
                <div className="flex flex-col gap-8 text-text opacity-90 text-lg font-light leading-relaxed">
                  {life.section3.paragraphs.map((p, idx) => (
                    <p key={idx}>
                      <strong className="text-primary font-serif font-bold tracking-wide mr-1">{p.bold}</strong>{p.text}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Image Layer */}
            <div className="order-1 md:order-2 z-0 relative">
              <InspirationImage name="" imageSrc={life.section3.image.imageSrc} imageClassName="aspect-[4/3] md:aspect-[3/4]" />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="bg-primary text-surface py-20 md:py-32 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute w-[80vw] h-[80vw] border-[1px] border-gold rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-[60vw] h-[60vw] border-[1px] border-gold rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container-site relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="mb-16 md:mb-24 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              {programs.heading.normal} <span className="text-gold italic font-medium">{programs.heading.gold}</span>
            </h2>
            <div className="w-20 h-[1px] bg-gold mx-auto" />
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
             {/* Deep Shadow backing for the list */}
            <div className="absolute -inset-10 bg-black/20 blur-2xl -z-10 rounded-[3rem]" />
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {programs.list.map((item, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex items-start gap-5"
                >
                  <span className="text-gold text-2xl leading-none mt-1">✧</span>
                  <span className="text-lg font-light leading-relaxed text-white/90">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </article>
  );
};
