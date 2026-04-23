import { motion } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const ProgressBar = ({ targetRef }) => {
  const { springProgress } = useScrollProgress(targetRef);
  
  return (
    <motion.div 
      className="progress-bar"
      style={{ scaleX: springProgress }}
    />
  );
};

export default ProgressBar;