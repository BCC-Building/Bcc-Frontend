import { Link } from 'react-router-dom';
import { motion, useTransform } from 'framer-motion';
import { 
  FaArrowRight, FaStar, FaQuoteLeft, 
  FaCheckCircle 
} from 'react-icons/fa';
import ParticleBackground from '../common/ParticleBackground';
import TiltCard from '../common/TiltCard';
import GradientText from '../common/GradientText';
import { staggerContainer, fadeInUp } from '../../animations/variants';

const HeroSection = ({ heroRef, scrollYProgress }) => {
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 100]);
  
  return (
    <section ref={heroRef} className="hero-section">
      <ParticleBackground />
      
      <motion.div className="hero-overlay" style={{ opacity: heroOpacity }} />
      
      <motion.div className="hero-content" style={{ y: heroY }}>
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-7">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <div className="hero-badge">
                    <span className="badge-dot"></span>
                    <span>Est. 2010 • Industry Leader</span>
                  </div>
                </motion.div>
                
                <motion.h1 variants={fadeInUp} className="hero-title">
                  Building India's<br />
                  <GradientText>Future Together</GradientText>
                </motion.h1>
                
                <motion.p variants={fadeInUp} className="hero-subtitle">
                  We're not just constructing buildings — we're creating landmarks, 
                  fostering communities, and shaping India's skyline with uncompromising 
                  quality and innovation since 2010.
                </motion.p>
                
                <motion.div variants={fadeInUp} className="hero-buttons">
                  <Link to="/contact" className="btn-primary">
                    Start Your Journey <FaArrowRight className="ms-2" />
                  </Link>
                  <Link to="/services" className="btn-secondary">
                    Explore Services
                  </Link>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="hero-trust">
                  {['ISO 9001:2015', 'CIDC Award Winner', 'Green Certified'].map((badge, i) => (
                    <div key={i} className="trust-badge">
                      <FaCheckCircle />
                      <span>{badge}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
            
            <div className="col-lg-5 d-none d-lg-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <TiltCard>
                  <div className="hero-card">
                    <div className="hero-card-rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="star" />
                      ))}
                      <span>5.0 Rating</span>
                    </div>
                    <FaQuoteLeft className="quote-icon" />
                    <p className="hero-card-quote">
                      "Quality isn't just our standard — it's our promise to every client."
                    </p>
                    <hr />
                    <div className="hero-card-stats">
                      <div><small>Founded</small><h6>2010</h6></div>
                      <div><small>Projects</small><h6>250+</h6></div>
                      <div><small>Cities</small><h6>15+</h6></div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="scroll-indicator">
        <div className="scroll-mouse"></div>
        <div>Scroll</div>
      </div>
    </section>
  );
};

export default HeroSection;