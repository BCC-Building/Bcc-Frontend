// src/components/clients/ClientsHero.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHandshake, FaBuilding, FaChartLine, FaArrowRight } from 'react-icons/fa';

const TRUST_BADGES = [
  "100+ Enterprise Clients",
  "Government & Defence",
  "Corporate Partners",
];

const HERO_STATS = [
  { value: "100+", label: "Clients" },
  { value: "15+", label: "Industries" },
  { value: "500Cr+", label: "Trust Value" },
];

export default function ClientsHero() {
  return (
    <section
      className="clients-hero"
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#0a0f1e',
      }}
      aria-label="Clients Hero"
    >
      {/* Background Image - guaranteed visible */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}>
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=90"
          alt="Business partnership and collaboration"
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
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(145deg, rgba(5,10,25,0.88) 0%, rgba(10,20,40,0.8) 100%)',
        }} />
      </div>

      {/* Animated Navy Accents (moving orbs) */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        <motion.div
          animate={{ x: ['0%', '20%', '0%'], y: ['0%', '10%', '0%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '10%',
            left: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent)',
            filter: 'blur(60px)',
            borderRadius: '50%',
          }}
        />
        <motion.div
          animate={{ x: ['100%', '80%', '100%'], y: ['0%', '20%', '0%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: '0%',
            right: '-10%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(96,165,250,0.15), transparent)',
            filter: 'blur(70px)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: '4rem 0' }}>
        <div className="container text-center">
          {/* Eyebrow with handshake icon */}
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
              <FaHandshake /> Our Partners
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ffffff, #b9d8ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              marginBottom: '1rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            Trusted by Industry Leaders
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              maxWidth: '700px',
              margin: '0 auto 1.5rem',
              color: 'rgba(255,255,255,0.88)',
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            Government departments, defence partners, and enterprise clients rely on BCC for dependable construction and consulting delivery.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}
          >
            <a
              href="#clients"
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
                e.target.style.boxShadow = '0 12px 28px -8px rgba(37,99,235,0.7)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 20px -6px rgba(37,99,235,0.5)';
              }}
            >
              <FaBuilding /> View Our Clients <FaArrowRight style={{ fontSize: '0.75rem' }} />
            </a>
            <Link
              to="/contact"
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
              <FaChartLine /> Work With Us
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
            {HERO_STATS.map((stat, idx) => (
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
            onClick={() => document.getElementById('clients')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: 0.7 }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }}>Our partners</span>
              <div style={{ width: '24px', height: '24px', borderLeft: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(-45deg)' }} />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .clients-hero {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
        }
        @media (max-width: 768px) {
          .clients-hero {
            min-height: 70vh;
          }
        }
      `}</style>
    </section>
  );
}