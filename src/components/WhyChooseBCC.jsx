// src/components/home/WhyChooseBCC.jsx - Production-Ready
import { motion } from 'framer-motion';
import { 
  FaUserTie, FaCogs, FaShieldAlt, FaRocket, 
  FaCheckCircle, FaHandshake, FaClock, FaPhone 
} from 'react-icons/fa';

// ==================== DATA ====================

/**
 * Feature cards data
 * Edit these to change the cards content
 */
const FEATURES = [
  {
    icon: <FaUserTie />,
    title: 'Client-Centered Projects',
    description: 'We tailor every solution to your business goals and deliver measurable value with a personal touch.',
    color: '#2563eb', // Blue
  },
  {
    icon: <FaCogs />,
    title: 'Proven Technical Expertise',
    description: 'A strong team of engineers, architects and consultants with real industry experience since 2018.',
    color: '#059669', // Green
  },
  {
    icon: <FaShieldAlt />,
    title: 'Quality Focus',
    description: 'Every project follows rigorous standards for safety, performance and finish — no compromises.',
    color: '#d97706', // Amber
  },
  {
    icon: <FaRocket />,
    title: 'Fast, Reliable Delivery',
    description: 'We meet timelines with proactive planning, coordination, and expert execution.',
    color: '#7c3aed', // Purple
  },
];

/**
 * Why choose us bullet points
 * Edit these to change the list items
 */
const BULLET_POINTS = [
  {
    icon: <FaHandshake />,
    text: 'Personalized solutions for every stage of your project lifecycle.',
  },
  {
    icon: <FaCheckCircle />,
    text: 'Transparent communication and clear delivery milestones.',
  },
  {
    icon: <FaClock />,
    text: 'End-to-end services from design and engineering to execution.',
  },
  {
    icon: <FaPhone />,
    text: 'Dedicated support with fast response and ongoing guidance.',
  },
];

// ==================== ANIMATION VARIANTS ====================

/** Fade-in-up animation */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  },
};

/** Stagger children animation */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/** Card hover animation */
const cardHover = {
  rest: { y: 0, boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  hover: { 
    y: -6, 
    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
    transition: { type: 'spring', stiffness: 300, damping: 20 } 
  },
};

// ==================== MAIN COMPONENT ====================

/**
 * WhyChooseBCC Component
 * Home page section showing why clients should choose BCC
 * 
 * Features:
 * - 4 feature cards with icons and color coding
 * - Bullet points list with icons
 * - Smooth scroll-triggered animations
 * - Responsive grid layout
 * - Fully accessible
 */
export default function WhyChooseBCC() {
  return (
    <section className="why-choose-bcc py-5" aria-label="Why choose BCC">
      <div className="container">
        <div className="row align-items-center gy-5">
          
          {/* ==================== LEFT COLUMN ==================== */}
          <motion.div
            className="col-lg-5"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Section Label */}
            <span className="section-label text-primary fw-semibold" style={{ letterSpacing: '1px' }}>
              Why Choose BCC?
            </span>

            {/* Heading */}
            <h2 className="mt-3 mb-4 fw-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: 1.3 }}>
              Trusted Construction & Consulting for Growing Businesses
            </h2>

            {/* Description */}
            <p className="text-muted mb-4" style={{ lineHeight: 1.7 }}>
              BCC delivers premium project outcomes with a client-first approach. 
              Our team blends deep industry expertise with modern technology to help 
              you build faster, safer and with more confidence.
            </p>

            {/* Bullet Points */}
            <ul className="list-unstyled why-list" role="list">
              {BULLET_POINTS.map((point, index) => (
                <motion.li
                  key={index}
                  className="mb-3 d-flex align-items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Icon Circle */}
                  <span
                    className="d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                      color: '#2563eb',
                      fontSize: '0.9rem',
                    }}
                    aria-hidden="true"
                  >
                    {point.icon}
                  </span>
                  {/* Text */}
                  <span className="text-muted" style={{ lineHeight: 1.5 }}>
                    {point.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ==================== RIGHT COLUMN (Feature Cards) ==================== */}
          <motion.div
            className="col-lg-7"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="row g-4">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={index}
                  className="col-sm-6"
                  variants={fadeInUp}
                >
                  <motion.div
                    className="choose-card h-100 p-4 rounded-4 border"
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    style={{
                      background: 'white',
                      borderColor: '#f1f5f9',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="d-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '14px',
                        background: `${feature.color}15`,
                        color: feature.color,
                        fontSize: '1.3rem',
                      }}
                      aria-hidden="true"
                    >
                      {feature.icon}
                    </div>

                    {/* Title */}
                    <h5 className="fw-bold mb-2" style={{ fontSize: '1.05rem', color: '#1e293b' }}>
                      {feature.title}
                    </h5>

                    {/* Description */}
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                      {feature.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ==================== STYLES ==================== */}
      <style>{`
        .why-choose-bcc {
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }

        .choose-card {
          background: white;
          border: 1px solid #f1f5f9;
          transition: all 0.3s ease;
        }

        .choose-card:hover {
          border-color: #e2e8f0;
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .why-choose-bcc {
            background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
          }
          
          .choose-card {
            background: #1e293b;
            border-color: #334155;
          }
          
          .choose-card h5 {
            color: #f1f5f9;
          }
          
          .choose-card p,
          .text-muted {
            color: #94a3b8 !important;
          }
          
          h2 {
            color: #f1f5f9;
          }
        }

        /* Responsive */
        @media (max-width: 576px) {
          .choose-card {
            padding: 20px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}