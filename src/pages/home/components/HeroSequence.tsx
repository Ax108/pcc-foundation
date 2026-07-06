import { motion } from 'framer-motion';
import { HERO_SLIDES } from '@home/constants/heroSlides';
import { IMAGES } from '@src/constants/images';

const sentence = "Pratima Chandra Foundation";
const letters = sentence.split("");

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { ease: [0.25, 0.46, 0.45, 0.94], duration: 1 } 
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 1.5 }
  }
};

export const HeroSequence = () => {
  const heroImage = HERO_SLIDES[0].imageSrc;

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-black flex items-center justify-center">
      {/* Cinematic Background Zoom */}
      <motion.div
        initial={{ scale: 1.15, filter: 'brightness(0.1)' }}
        animate={{ scale: 1, filter: 'brightness(0.25)' }}
        transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImage}
          alt="Foundation Hero"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Light Red Line Reveal (Accent) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl h-[1px] bg-gold z-10 origin-center"
      />

      {/* Text Sequence */}
      <div className="relative z-20 text-center flex flex-col items-center gap-6 px-4">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
          className="!text-gold uppercase tracking-[0.3em] text-sm md:text-base font-semibold"
        >
          Preserving Traditional Arts
        </motion.p>
        
        <motion.h1 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="!text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight flex flex-wrap justify-center gap-x-3 md:gap-x-5"
        >
          {"Pratima Chandra Foundation".split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <motion.span 
                  key={`${wordIndex}-${charIndex}`} 
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3, ease: "easeOut" }}
          className="mt-8"
        >
          {/* Button: Cherry Red Background, Light Red (Gold) Accent on hover */}
          <a href="#about-section" className="site-btn inline-block px-8 py-3 !bg-primary !text-white !border-primary hover:!bg-gold hover:!border-gold transition-all duration-500 uppercase tracking-widest text-sm">
            Discover Our Legacy
          </a>
        </motion.div>
      </div>

      {/* Solid Curtain Overlay (Slides up to reveal the hero) */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.5, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
        className="absolute inset-0 bg-primary z-50 origin-top pointer-events-none flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="pointer-events-none"
        >
          <img 
            src={IMAGES.LOGO_HEADER} 
            alt="Pratima Chandra Foundation Logo" 
            className="w-[27rem] md:w-[34rem] h-auto drop-shadow-lg"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
