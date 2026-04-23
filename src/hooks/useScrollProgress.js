import { useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

export const useScrollProgress = (ref, offset = ["start start", "end start"]) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset
  });
  
  const springProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30 
  });
  
  return { scrollYProgress, springProgress };
};