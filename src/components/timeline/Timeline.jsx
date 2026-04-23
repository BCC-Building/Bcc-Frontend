import { useState } from 'react';
import { motion } from 'framer-motion';
import { milestones } from '../../data/testimonials';

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <div className="timeline-wrapper">
      <div className="timeline-track">
        {milestones.map((item, idx) => (
          <motion.div
            key={idx}
            className={`timeline-node ${activeIndex === idx ? 'active' : ''}`}
            onClick={() => setActiveIndex(idx)}
            whileHover={{ scale: 1.1 }}
          >
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-icon">{item.icon}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="timeline-detail text-center mt-4"
      >
        <h4>{milestones[activeIndex].title}</h4>
        <p>{milestones[activeIndex].desc}</p>
      </motion.div>
    </div>
  );
};

export default Timeline;