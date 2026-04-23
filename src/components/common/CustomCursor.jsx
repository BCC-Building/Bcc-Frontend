import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const handleMouseOver = (e) => {
      setIsHovering(!!e.target.closest('a, button, .clickable'));
    };
    
    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);
  
  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: x - 12,
        y: y - 12,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    />
  );
};

export default CustomCursor;