import { motion } from 'framer-motion';
import { FaAward } from 'react-icons/fa';
import GradientText from '../common/GradientText';
import { slideInLeft, slideInRight } from '../../animations/variants';

const StorySection = () => {
  return (
    <section className="story-section">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <div className="section-badge">Our Legacy</div>
              <h2 className="section-title">
                From Vision to<br />
                <GradientText>Industry Leadership</GradientText>
              </h2>
              <p className="story-text">
                Building Creators & Consulting (BCC) started with a revolutionary idea: 
                bring transparency, quality, and innovation to India's construction industry.
              </p>
              <p className="story-text">
                What began as a small team of passionate engineers has grown into a 
                30+ member powerhouse, delivering 250+ successful projects across 15+ cities.
              </p>
              <div className="story-stats">
                <div><strong>250+</strong><span>Projects</span></div>
                <div><strong>100%</strong><span>Satisfaction</span></div>
                <div><strong>15+</strong><span>Years</span></div>
              </div>
            </motion.div>
          </div>
          
          <div className="col-lg-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              className="story-image"
            >
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
                alt="BCC Construction"
              />
              <div className="story-badge">
                <FaAward />
                <div>
                  <strong>Best Construction Company</strong>
                  <small>CIDC Award 2023</small>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;