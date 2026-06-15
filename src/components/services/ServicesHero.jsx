// src/components/services/ServicesHero.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHardHat, FaBuilding, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const TRUST_BADGES = [
  "ISO 9001:2015 Certified",
  "NABL Accredited Lab",
  "100% Client Satisfaction",
];

export default function ServicesHero({ totalServices = 14 }) {
  const stats = [
    { value: `${totalServices}+`, label: "Services" },
    { value: "1200+", label: "Projects" },
    { value: "98%", label: "Satisfaction" },
  ];

  return (
    <section
      className="services-hero"
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#0a0f1e',
      }}
      aria-label="Services Hero"
    >
      {/* Background Image - NEW IMAGE */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=1920&q=90"
          alt="Engineers reviewing construction blueprints"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #0a2f3a, #0a1a2a)';
          }}
        />
        {/* Overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(145deg, rgba(5,10,25,0.85) 0%, rgba(10,20,40,0.8) 100%)',
          }}
        />
      </div>

      {/* No animated dots/orbs */}

      <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: '4rem 0' }}>
        <div className="container text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(59,130,246,0.2)',
                border: '1px solid rgba(59,130,246,0.5)',
                borderRadius: '40px',
                padding: '6px 16px',
                fontSize: '0.75rem',
                letterSpacing: '1px',
                color: '#a5c9ff',
                marginBottom: '1rem',
              }}
            >
              <FaHardHat /> Trusted Since 2017
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ffffff, #c7d2fe)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              marginBottom: '1rem',
              textShadow: '0 2px 12px rgba(0,0,0,0.2)',
              lineHeight: 1.2,
            }}
          >
            Engineering Excellence That Builds Tomorrow
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              maxWidth: '720px',
              margin: '0 auto 1.5rem',
              color: 'rgba(255,255,255,0.88)',
              fontSize: '1.05rem',
              lineHeight: 1.65,
              fontWeight: 400,
            }}
          >
            From concept to completion, BCC delivers {totalServices}+ engineering, construction, consulting, surveying, and testing services with clear communication and dependable quality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}
          >
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(105deg, #2563eb, #1e3a8a)',
                border: 'none',
                borderRadius: '50px',
                padding: '10px 28px',
                color: 'white',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 8px 20px -6px rgba(37,99,235,0.5)',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 14px 28px -8px rgba(37,99,235,0.7)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 20px -6px rgba(37,99,235,0.5)';
              }}
            >
              <FaBuilding /> Start Your Project <FaArrowRight style={{ fontSize: '0.75rem' }} />
            </Link>
            <Link
              to="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.6)',
                borderRadius: '50px',
                padding: '10px 28px',
                color: 'white',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.target.style.borderColor = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = 'rgba(255,255,255,0.6)';
              }}
            >
              <FaCheckCircle /> View Portfolio
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}
          >
            {TRUST_BADGES.map((badge, idx) => (
              <span
                key={idx}
                style={{
                  background: 'rgba(59,130,246,0.12)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(59,130,246,0.4)',
                  borderRadius: '40px',
                  padding: '5px 14px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#c7dafe',
                }}
              >
                {badge}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {stats.map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#60a5fa' }}>
                  {stat.value}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ marginTop: '3rem', cursor: 'pointer' }}
            onClick={() => document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: 0.7 }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }}>Our services</span>
              <div style={{ width: '24px', height: '24px', borderLeft: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(-45deg)' }} />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .services-hero {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
        }
        @media (max-width: 768px) {
          .services-hero {
            min-height: 70vh;
          }
        }
      `}</style>
    </section>
  );
}