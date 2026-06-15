// src/components/blog/BlogHero.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaNewspaper, FaEnvelope, FaArrowRight, FaLightbulb } from 'react-icons/fa';

const TRUST_BADGES = [
  "Industry Insights",
  "Expert Articles",
  "Regular Updates",
];

const HERO_STATS = [
  { value: "50+", label: "Articles" },
  { value: "100k+", label: "Monthly Reads" },
  { value: "20+", label: "Topics" },
];

export default function BlogHero() {
  return (
    <section
      className="blog-hero"
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#0a0f1e',
      }}
      aria-label="Blog Hero"
    >
      {/* Background Image - guaranteed visibility */}
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
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1920&q=90"
          alt="Blog and industry insights"
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
        {/* Overlay for text clarity */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(145deg, rgba(5,10,25,0.85) 0%, rgba(10,20,40,0.78) 100%)',
        }} />
      </div>

      {/* Animated glow orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        <motion.div
          animate={{ y: ['0%', '15%', '0%'], x: ['0%', '5%', '0%'] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '5%',
            left: '-15%',
            width: '70%',
            height: '70%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.18), transparent)',
            filter: 'blur(70px)',
            borderRadius: '50%',
          }}
        />
        <motion.div
          animate={{ x: ['100%', '85%', '100%'], y: ['0%', '10%', '0%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: '-10%',
            right: '-20%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(96,165,250,0.12), transparent)',
            filter: 'blur(80px)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: '4rem 0' }}>
        <div className="container text-center">
          {/* Eyebrow with icon */}
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
              <FaNewspaper /> Our Blog
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
            Industry Insights & Thought Leadership
          </motion.h1>

          {/* Subtitle with proper text formatting */}
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
            Read practical ideas on construction trends, design decisions, project management, quality control, and engineering execution.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}
          >
            <a
              href="#articles"
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
              <FaLightbulb /> Read Articles <FaArrowRight style={{ fontSize: '0.75rem' }} />
            </a>
            <a
              href="#subscribe"
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
              <FaEnvelope /> Subscribe
            </a>
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
            onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: 0.7 }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }}>Explore articles</span>
              <div style={{ width: '24px', height: '24px', borderLeft: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(-45deg)' }} />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .blog-hero {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
        }
        @media (max-width: 768px) {
          .blog-hero {
            min-height: 70vh;
          }
        }
      `}</style>
    </section>
  );
}