// src/components/home/WhyChooseBCC.jsx - Fun, Interactive, Navy Theme
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  FaUserTie, FaCogs, FaShieldAlt, FaRocket, 
  FaCheckCircle, FaHandshake, FaClock, FaPhone,
  FaArrowRight
} from 'react-icons/fa';
import { useRef, useState } from 'react';

// ==================== DATA ====================

const FEATURES = [
  {
    icon: <FaUserTie />,
    title: 'Client-Centered Projects',
    description: 'We tailor every solution to your business goals and deliver measurable value with a personal touch.',
    gradient: 'linear-gradient(135deg, #3b82f6, #1e3a8a)',
  },
  {
    icon: <FaCogs />,
    title: 'Proven Technical Expertise',
    description: 'A strong team of engineers, architects and consultants with real industry experience since 2018.',
    gradient: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Quality Focus',
    description: 'Every project follows rigorous standards for safety, performance and finish — no compromises.',
    gradient: 'linear-gradient(135deg, #2563eb, #1e40af)',
  },
  {
    icon: <FaRocket />,
    title: 'Fast, Reliable Delivery',
    description: 'We meet timelines with proactive planning, coordination, and expert execution.',
    gradient: 'linear-gradient(135deg, #4f46e5, #3730a3)',
  },
];

const BULLET_POINTS = [
  { icon: <FaHandshake />, text: 'Personalized solutions for every stage of your project lifecycle.', delay: 0 },
  { icon: <FaCheckCircle />, text: 'Transparent communication and clear delivery milestones.', delay: 0.1 },
  { icon: <FaClock />, text: 'End-to-end services from design and engineering to execution.', delay: 0.2 },
  { icon: <FaPhone />, text: 'Dedicated support with fast response and ongoing guidance.', delay: 0.3 },
];

// 3D Tilt Card Component
const TiltCard = ({ children, gradient }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
      className="h-100"
    >
      {children}
    </motion.div>
  );
};

// Floating Icon Component
const FloatingIcon = ({ icon, delay }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    style={{ display: 'inline-block' }}
  >
    {icon}
  </motion.div>
);

// ==================== MAIN COMPONENT ====================

export default function WhyChooseBCC() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="why-choose-bcc py-5 position-relative overflow-hidden" aria-label="Why choose BCC">
      {/* Animated Background Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{ duration: 20 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: `rgba(59,130,246,${Math.random() * 0.3})`,
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center gy-5">
          
          {/* LEFT COLUMN */}
          <motion.div
            className="col-lg-5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Animated Label */}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="d-inline-block mb-3"
            >
              <span className="section-label" style={{
                color: '#3b82f6',
                letterSpacing: '2px',
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                background: 'rgba(59,130,246,0.1)',
                padding: '4px 12px',
                borderRadius: '30px',
                border: '1px solid rgba(59,130,246,0.3)',
              }}>
                ✦ Why Choose BCC? ✦
              </span>
            </motion.div>

            {/* Glowing Heading */}
            <h2 className="mt-3 mb-4 fw-bold" style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              lineHeight: 1.2,
              background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 80%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}>
              Trusted Construction & Consulting for <span style={{ color: '#3b82f6', background: 'none' }}>Growing Businesses</span>
            </h2>

            <p className="mb-4" style={{ color: '#475569', lineHeight: 1.7 }}>
              BCC delivers premium project outcomes with a client-first approach. 
              Our team blends deep industry expertise with modern technology to help 
              you build faster, safer and with more confidence.
            </p>

            {/* Animated Bullet Points */}
            <div className="bullet-list">
              {BULLET_POINTS.map((point, idx) => (
                <motion.div
                  key={idx}
                  className="d-flex align-items-start gap-3 mb-3"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: point.delay + 0.2, type: "spring", stiffness: 120 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #3b82f620, #1e3a8a20)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3b82f6',
                      fontSize: '1rem',
                      border: '1px solid #3b82f640',
                    }}
                  >
                    <FloatingIcon icon={point.icon} delay={idx * 0.3} />
                  </motion.div>
                  <span style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    {point.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Magnetic CTA Button */}
            <motion.a
              href="/contact"
              className="btn btn-primary mt-2 d-inline-flex align-items-center gap-2"
              style={{
                background: 'linear-gradient(105deg, #1e3a8a, #3b82f6)',
                border: 'none',
                borderRadius: '40px',
                padding: '10px 24px',
                fontWeight: 500,
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(59,130,246,0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More <FaArrowRight className="arrow-icon" />
            </motion.a>
          </motion.div>

          {/* RIGHT COLUMN - 3D Tilt Cards */}
          <div className="col-lg-7">
            <div className="row g-4">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="col-sm-6">
                  <TiltCard gradient={feature.gradient}>
                    <motion.div
                      className="card-3d p-4 rounded-4"
                      style={{
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(59,130,246,0.2)',
                        borderRadius: '24px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                      whileHover={{ scale: 1.02 }}
                      onHoverStart={() => setHoveredCard(idx)}
                      onHoverEnd={() => setHoveredCard(null)}
                    >
                      {/* Animated Icon Background */}
                      <motion.div
                        animate={{
                          background: hoveredCard === idx 
                            ? `radial-gradient(circle at 30% 20%, rgba(59,130,246,0.2), transparent 70%)`
                            : `radial-gradient(circle at 30% 20%, rgba(59,130,246,0.05), transparent 70%)`,
                        }}
                        className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
                        style={{ zIndex: 0, pointerEvents: 'none' }}
                      />
                      <div className="position-relative" style={{ zIndex: 1 }}>
                        <motion.div
                          animate={{ rotate: hoveredCard === idx ? [0, 5, -5, 0] : 0 }}
                          transition={{ duration: 0.3 }}
                          className="d-flex align-items-center justify-content-center mb-3"
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '20px',
                            background: feature.gradient,
                            color: 'white',
                            fontSize: '1.6rem',
                            boxShadow: '0 8px 20px rgba(59,130,246,0.3)',
                          }}
                        >
                          {feature.icon}
                        </motion.div>
                        <h5 className="fw-bold mb-2" style={{ fontSize: '1.15rem', color: '#0f172a' }}>
                          {feature.title}
                        </h5>
                        <p className="mb-0" style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#475569' }}>
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style>{`
        .why-choose-bcc {
          background: radial-gradient(circle at 10% 20%, #f0f4fe, #ffffff);
          min-height: 600px;
        }
        .particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .card-3d {
          transform-style: preserve-3d;
          transition: box-shadow 0.3s ease;
        }
        .card-3d:hover {
          box-shadow: 0 20px 35px -12px rgba(0,0,0,0.2), 0 0 0 1px rgba(59,130,246,0.4);
        }
        .arrow-icon {
          transition: transform 0.2s;
        }
        .btn-primary:hover .arrow-icon {
          transform: translateX(5px);
        }
        @media (prefers-color-scheme: dark) {
          .why-choose-bcc {
            background: radial-gradient(circle at 10% 20%, #0f172a, #020617);
          }
          .card-3d {
            background: rgba(30,41,59,0.8) !important;
            backdrop-filter: blur(12px);
            border-color: rgba(59,130,246,0.4) !important;
          }
          .card-3d h5 { color: #e2e8f0 !important; }
          .card-3d p { color: #94a3b8 !important; }
          .section-label { background: rgba(59,130,246,0.2) !important; }
          h2 { background: linear-gradient(135deg, #e2e8f0, #94a3b8) !important; background-clip: text !important; }
          .bullet-list span { color: #cbd5e1 !important; }
        }
        @media (max-width: 768px) {
          .card-3d { padding: 1.2rem !important; }
        }
      `}</style>
    </section>
  );
}