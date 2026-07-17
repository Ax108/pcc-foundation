import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'scale-up' | 'slide-left' | 'slide-right';
  delay?: number;
  duration?: number;
  className?: string;
};

export const ScrollReveal = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0, 
  duration = 0.8,
  className = "" 
}: RevealProps) => {
  
  const variants = {
    'fade-up': {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 }
    },
    'fade-in': {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    'scale-up': {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 }
    },
    'slide-left': {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 }
    },
    'slide-right': {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 }
    }
  };

  return (
    <motion.div
      variants={variants[animation]}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // elegant, premium easing curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
