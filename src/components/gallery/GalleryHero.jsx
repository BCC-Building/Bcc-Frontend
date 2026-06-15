// src/components/gallery/GalleryHero.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaImages, FaFolderOpen, FaArrowRight } from 'react-icons/fa';

const TRUST_BADGES = [
  "500+ Project Photos",
  "High-Quality Imagery",
  "Project Documentation",
];

const HERO_STATS = [
  { value: "500+", label: "Photos" },
  { value: "1200+", label: "Projects" },
  { value: "15+", label: "Categories" },
];

export default function GalleryHero() {
  return (
    <section className="gallery-hero position-relative overflow-hidden" aria-label="Gallery Hero">
      {/* Background Image with Overlay */}
      <div className="position-absolute inset-0 w-100 h-100">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=85&fm=webp"
          alt="Construction project gallery"
          className="w-100 h-100 object-fit-cover"
          style={{ objectFit: 'cover' }}
          fetchPriority="high"
        />
        <div className="position-absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(10,15,30,0.85) 0%, rgba(20,30,55,0.75) 50%, rgba(5,10,20,0.9) 100%)'
        }} />
      </div>

      {/* Animated Navy Glow Accents */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ pointerEvents: 'none' }}>
        <motion.div
          animate={{ x: ['0%', '100%'], opacity: [0.3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="position-absolute top-20 start-0 w-25 h-50 rounded-circle"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ x: ['0%', '-100%'], opacity: [0.2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="position-absolute bottom-10 end-0 w-25 h-50 rounded-circle"
          style={{
            background: 'radial-gradient(circle, rgba(96,165,250,0.12), transparent)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="container position-relative py-5" style={{ zIndex: 2, minHeight: '80vh' }}>
        <div className="row align-items-center justify-content-center text-center text-lg-start">
          <div className="col-lg-8 text-center">
            {/* Eyebrow with animated underline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="d-inline-flex align-items-center gap-2 mb-3"
            >
              <span className="badge" style={{
                background: 'rgba(59,130,246,0.2)',
                border: '1px solid rgba(59,130,246,0.5)',
                borderRadius: '40px',
                padding: '6px 14px',
                fontSize: '0.7rem',
                letterSpacing: '1px',
                color: '#93c5fd',
              }}>
                ✦ Visual Portfolio ✦
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="display-4 fw-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #c7d2fe 80%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            >
              Explore Our Project Gallery
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lead mb-4 mx-auto"
              style={{
                maxWidth: '700px',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '1.1rem',
              }}
            >
              Browse clear project documentation and completed work across construction, interiors, surveying, testing, and engineering services.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="d-flex justify-content-center gap-3 flex-wrap mb-5"
            >
              <a
                href="#gallery"
                className="btn d-inline-flex align-items-center gap-2 fw-semibold px-4 py-2"
                style={{
                  background: 'linear-gradient(105deg, #2563eb, #1e3a8a)',
                  border: 'none',
                  borderRadius: '50px',
                  color: 'white',
                  boxShadow: '0 8px 20px -6px rgba(37,99,235,0.4)',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 28px -8px rgba(37,99,235,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px -6px rgba(37,99,235,0.4)';
                }}
              >
                <FaImages /> Browse Gallery <FaArrowRight className="ms-1" style={{ fontSize: '0.8rem' }} />
              </a>
              <a
                href="#categories"
                className="btn btn-outline-light d-inline-flex align-items-center gap-2 px-4 py-2"
                style={{ borderRadius: '50px', borderWidth: '1.5px' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <FaFolderOpen /> View Categories
              </a>
            </motion.div>

            {/* Trust Badges - Modern Navy Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="d-flex flex-wrap justify-content-center gap-3 mb-4"
            >
              {TRUST_BADGES.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-pill"
                  style={{
                    background: 'rgba(59,130,246,0.12)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(59,130,246,0.3)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: '#bfdbfe',
                    letterSpacing: '0.3px',
                  }}
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="d-flex justify-content-center gap-5 flex-wrap"
            >
              {HERO_STATS.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="display-6 fw-bold" style={{ color: '#60a5fa', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                    {stat.value}
                  </div>
                  <div className="text-white-50 small" style={{ fontSize: '0.8rem' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="position-absolute bottom-4 start-50 translate-middle-x"
        style={{ zIndex: 2, cursor: 'pointer' }}
        onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="d-flex flex-column align-items-center" style={{ opacity: 0.7 }}>
          <span className="text-white-50 small mb-1">Scroll to explore</span>
          <i className="bi bi-chevron-down text-white" style={{ fontSize: '1.2rem' }}></i>
        </div>
      </motion.div>

      <style>{`
        .gallery-hero {
          min-height: 85vh;
          background: #0a0f1e;
        }
        .inset-0 {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .object-fit-cover {
          object-fit: cover;
        }
        @media (max-width: 768px) {
          .gallery-hero {
            min-height: 70vh;
          }
          .display-4 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}