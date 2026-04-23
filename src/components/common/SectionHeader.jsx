import { motion } from 'framer-motion';
import { fadeInUp } from '../../animations/variants';

const SectionHeader = ({ 
  badge, 
  title, 
  subtitle, 
  className = "", 
  useTailwind = false // prop to switch between CSS and Tailwind
}) => {
  if (useTailwind) {
    return (
      <motion.div 
        className={`text-center ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm text-gray-600 mb-4">
            <span>{badge}</span>
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{title}</h2>
        {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
      </motion.div>
    );
  }

  // Original CSS-based version
  return (
    <motion.div 
      className={`section-header ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="section-badge">{badge}</div>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeader;