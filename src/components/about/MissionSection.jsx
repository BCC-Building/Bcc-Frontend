import { motion } from 'framer-motion';
import { FaRocket, FaEye } from 'react-icons/fa';
import SectionHeader from '../common/SectionHeader';
import { coreValues } from '../../data/coreValues';
import { fadeInUp } from '../../animations/variants';

const MissionSection = () => {
  return (
    <section className="mission-section">
      <div className="container">
        <SectionHeader 
          badge="Our Purpose"
          title="Mission, Vision & Values"
          subtitle="Guided by principles that drive excellence"
        />
        
        {/* Mission & Vision Cards - Reduced padding */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mission-card mission-card-sm"
            >
              <div className="mission-icon">
                <FaRocket />
              </div>
              <h3>Our Mission</h3>
              <p>To deliver exceptional construction, consulting, and soil investigation services that exceed client expectations through innovation and integrity.</p>
            </motion.div>
          </div>
          <div className="col-md-6">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mission-card mission-card-sm"
            >
              <div className="mission-icon">
                <FaEye />
              </div>
              <h3>Our Vision</h3>
              <p>To become India's most trusted construction partner, recognized for transforming ideas into reality while creating sustainable value.</p>
            </motion.div>
          </div>
        </div>
        
        {/* Core Values Grid - Optimized sizes */}
        <div className="values-grid values-grid-optimized">
          {coreValues.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={idx}
                className="value-card value-card-sm"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ y: -3 }}
              >
                <div className="value-icon" style={{ color: value.color }}>
                  <Icon />
                </div>
                <h4>{value.title}</h4>
                <p>{value.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;