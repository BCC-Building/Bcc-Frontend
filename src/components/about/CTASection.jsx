import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { scaleIn } from '../../animations/variants';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div
          className="cta-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          <h2>Ready to Build Your Dream Project?</h2>
          <p>Let's discuss your vision and turn it into reality with BCC's expertise</p>
          <div className="cta-buttons">
            <Link to="/contact" className="cta-primary">
              Get Free Consultation <FaArrowRight />
            </Link>
            <Link to="/projects" className="cta-secondary">
              View Portfolio
            </Link>
          </div>
          <div className="cta-contact">
            <span>📞 +91-XXXXXXXXXX</span>
            <span>✉️ info@bccindia.com</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;