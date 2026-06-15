// src/components/home/CTA.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="cta-section position-relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #0f2b3d 50%, #0a1628 100%)',
        padding: '5rem 0',
        isolation: 'isolate',
      }}
    >
      {/* Animated background circles */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 0 }}>
        <div
          className="position-absolute rounded-circle"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 70%)',
            top: '-150px',
            left: '-100px',
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0) 70%)',
            bottom: '-200px',
            right: '-150px',
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(96,165,250,0.1) 0%, rgba(96,165,250,0) 70%)',
            top: '40%',
            left: '20%',
          }}
        />
      </div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row justify-content-center text-center">
          <div className="col-lg-8 col-xl-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="display-5 fw-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #b9d8ff 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            >
              Ready to Start Your Project?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lead mb-5"
              style={{
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: '1.2rem',
              }}
            >
              Get a free consultation and let us help you turn your vision into reality with expert planning and execution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="d-flex justify-content-center gap-3 flex-wrap"
            >
              <Link
                to="/contact"
                className="btn fw-semibold px-4 py-3"
                style={{
                  borderRadius: '50px',
                  background: 'linear-gradient(105deg, #2563eb, #1e3a8a)',
                  border: 'none',
                  color: 'white',
                  boxShadow: '0 12px 28px -8px rgba(37,99,235,0.4)',
                  transition: 'all 0.25s ease',
                  fontSize: '1rem',
                  minWidth: '220px',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px) scale(1.02)';
                  e.target.style.boxShadow = '0 20px 35px -10px rgba(37,99,235,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 12px 28px -8px rgba(37,99,235,0.4)';
                }}
              >
                Get Free Consultation →
              </Link>

              <Link
                to="/schedule-call"
                className="btn fw-semibold px-4 py-3"
                style={{
                  borderRadius: '50px',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(59,130,246,0.6)',
                  color: '#e0f2fe',
                  transition: 'all 0.25s ease',
                  fontSize: '1rem',
                  minWidth: '220px',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(59,130,246,0.2)';
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 28px -8px rgba(59,130,246,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.05)';
                  e.target.style.borderColor = 'rgba(59,130,246,0.6)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                📅 Schedule a Call
              </Link>
            </motion.div>

            {/* Optional: small trust badge */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-5 mb-0"
              style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}
            >
              No obligation • Free consultation • 24h response
            </motion.p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}