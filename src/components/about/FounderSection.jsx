import { motion } from 'framer-motion';
import { FaQuoteLeft, FaCrown } from 'react-icons/fa';
import { slideInLeft, slideInRight } from '../../animations/variants';

const FounderSection = () => {
  return (
    <section className="founder-section">
      <div className="container">
        <div className="founder-wrapper">
          <motion.div
            className="founder-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
          >
            <FaQuoteLeft className="founder-quote" />
            <h2>A Message from Our Founder</h2>
            <p className="founder-message">
              "At BCC, we believe that construction is not just about bricks and mortar — 
              it's about building dreams, creating safe spaces, and contributing to India's 
              growth story. Every project we undertake is a responsibility we deliver with 
              integrity, quality, and passion."
            </p>
            <hr />
            <div className="founder-info">
              <div>
                <h5>Er. Yaseen Ahmad Khan</h5>
                <p>Founder & Managing Director</p>
              </div>
            </div>
            <div className="founder-stats">
              <div><strong>15+</strong> Years</div>
              <div><strong>250+</strong> Projects</div>
              <div><strong>100%</strong> Commitment</div>
            </div>
          </motion.div>
          <motion.div
            className="founder-image"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
          >
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
              alt="Founder"
            />
            <div className="founder-badge">
              <FaCrown />
              <span>Visionary Leader</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;