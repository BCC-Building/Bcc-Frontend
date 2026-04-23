import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import SectionHeader from '../common/SectionHeader';
import { testimonials } from '../../data/testimonials';

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <SectionHeader 
          badge="Client Love"
          title="What Our Clients Say"
          subtitle="Trusted by industry leaders across India"
        />
        <div className="testimonials-grid">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="testimonial-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <FaQuoteLeft className="testimonial-quote" />
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h6>{testimonial.name}</h6>
                  <p>{testimonial.position}, {testimonial.company}</p>
                  <small>{testimonial.project}</small>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;