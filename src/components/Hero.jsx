// src/components/home/Hero.jsx - Production-Ready Hero Section
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { publicAPI } from '../api/endpoints'; // 👈 Backend API for dynamic stats
/**
 * AnimatedCounter Component
 * Counts up from 0 to target value with smooth easing
 * Uses requestAnimationFrame for optimal performance
 * 
 * @param {object} props
 * @param {number} props.target - Final count number
 * @param {string} props.suffix - Suffix to show after count (+, %, etc.)
 * @param {number} props.duration - Animation duration in ms (default: 1500)
 */
function AnimatedCounter({ target, suffix, duration = 1500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationId;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: cubic ease-out (starts fast, slows down)
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      
      setCount(current);
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [target, duration]);

  return (
    <h3 className="mb-0 text-white fw-bold" style={{ minHeight: '36px', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
      {count}{suffix}
    </h3>
  );
}

/**
 * TypingText Component
 * Creates a typewriter effect with cycling text
 * 
 * @param {object} props
 * @param {string[]} props.texts - Array of texts to cycle through
 * @param {number} props.typeSpeed - Typing speed in ms per character (default: 60)
 * @param {number} props.deleteSpeed - Deleting speed in ms per character (unused)
 * @param {number} props.pauseDuration - Pause after text completes in ms (default: 2000)
 */
function TypingText({ texts, typeSpeed = 60, pauseDuration = 2000 }) {
  const [index, setIndex] = useState(0);          // Current text index
  const [displayText, setDisplayText] = useState(''); // Currently displayed text
  const [charIndex, setCharIndex] = useState(0);  // Current character index

  useEffect(() => {
    let timeout;
    
    // If still typing current text
    if (charIndex < texts[index].length) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + texts[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typeSpeed);
    } else {
      // Text complete - pause then move to next
      timeout = setTimeout(() => {
        setDisplayText('');
        setCharIndex(0);
        setIndex((prev) => (prev + 1) % texts.length);
      }, pauseDuration);
    }
    
    return () => clearTimeout(timeout);
  }, [charIndex, index, texts, typeSpeed, pauseDuration]);

  return (
    <span>
      {displayText}
      <span
        aria-hidden="true"
        style={{
          borderRight: '3px solid #ffc107',
          marginLeft: '4px',
          height: '0.8em',
          display: 'inline-block',
          animation: 'blink 1s step-end infinite',
        }}
      />
    </span>
  );
}

/**
 * StatCard Component
 * Glassmorphism card on right side with dynamic data
 */
function StatCard({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="p-4 p-xl-5 rounded-4"
      style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.25)',
        minHeight: '200px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      }}
    >
      <div className="text-center mb-3">
        <span style={{ fontSize: '3rem' }} role="img" aria-label="building">🏢</span>
      </div>
      <h2 className="h5 text-white mb-3 text-center fw-bold">
        Trusted by Leading Clients
      </h2>

      <p style={{ color: 'rgba(255,255,255,0.9)', minHeight: '48px', textAlign: 'center', lineHeight: 1.6 }}>
        Delivering premium engineering & consulting solutions with unmatched precision since 2018.
      </p>

      {/* Quick Stats inside card */}
      <div className="d-flex justify-content-center gap-4 mt-4 mb-3">
        {stats.slice(0, 3).map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-warning fw-bold" style={{ fontSize: '1.2rem' }}>
              {stat.value}{stat.suffix}
            </div>
            <small className="text-white-50" style={{ fontSize: '0.7rem' }}>
              {stat.label}
            </small>
          </div>
        ))}
      </div>

      <div className="d-flex gap-2 justify-content-center mt-4">
        <Link
          className="btn btn-warning btn-sm fw-bold px-4"
          to="/services"
          aria-label="View our services"
          style={{ borderRadius: '50px' }}
        >
          Our Services
        </Link>
        <Link
          className="btn btn-outline-light btn-sm px-4"
          to="/contact"
          aria-label="Contact us"
          style={{ borderRadius: '50px' }}
        >
          Contact Us
        </Link>
      </div>
    </motion.div>
  );
}

// ==================== MAIN COMPONENT ====================

/**
 * Hero Component
 * Home page hero section with typing animation, counters, and CTA
 * 
 * Features:
 * - Full-screen hero with background image
 * - Typewriter text animation (cycling through taglines)
 * - Animated counters (projects, engineers, satisfaction)
 * - Glassmorphism stat card
 * - Optimized with requestAnimationFrame
 * - Accessible with ARIA labels
 * 
 * To change hero image: Update the img src URL
 * To change taglines: Update `taglines` array
 * To change stats: Update `heroStats` array
 */
export default function Hero() {
  // ==================== STATE ====================
  const [projectCount, setProjectCount] = useState(0);
  const [apiLoaded, setApiLoaded] = useState(false);

  // ==================== DATA ====================

  /**
   * Hero taglines for typing animation
   * Edit these to change what text cycles in the hero
   */
  const taglines = useMemo(() => [
    "Engineering Excellence",
    "Smart Construction Solutions",
    "Precision & Trust",
  ], []);

  /**
   * Hero stats (fallback values - overridden by API if available)
   * Edit these to change default stat numbers
   */
  const heroStats = useMemo(() => [
    { target: apiLoaded ? projectCount : 150, suffix: '+', label: 'Projects Completed', icon: '🏗️' },
    { target: 20, suffix: '+', label: 'Expert Engineers', icon: '👷' },
    { target: 98, suffix: '%', label: 'Client Satisfaction', icon: '⭐' },
  ], [apiLoaded, projectCount]);

  // ==================== API FETCHING ====================

  /**
   * Fetch project count from backend to show real stats
   * Falls back to default values if API fails
   */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await publicAPI.getProjects();
        if (response.data?.success) {
          const projects = response.data.data || [];
          setProjectCount(projects.length);
          setApiLoaded(true);
        }
      } catch {
        // Silently fail - use default stats
        console.debug('Hero stats: Using default values');
      }
    };

    fetchStats();
  }, []);

  // ==================== RENDER ====================

  return (
    <section
      className="hero d-flex align-items-center position-relative overflow-hidden"
      style={{
        minHeight: 'calc(100vh - 70px)',
        background: '#0a0a1a', // Fallback dark blue
      }}
      aria-label="Hero section"
    >
      {/* ==================== HERO BACKGROUND IMAGE ==================== */}
      <img
        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80"
        alt="Construction site with engineers"
        fetchPriority="high"
        decoding="sync"
        width="1600"
        height="900"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* ==================== GRADIENT OVERLAY ==================== */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,30,0.5) 50%, rgba(0,0,0,0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* ==================== CONTENT ==================== */}
      <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center gy-5">

          {/* ==================== LEFT COLUMN ==================== */}
          <div className="col-lg-7">
            
            {/* Subheading */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-warning fw-semibold mb-3 d-inline-block"
              style={{ letterSpacing: '1px' }}
            >
              🏗️ Construction • Consulting • Digital Solutions
            </motion.span>

            {/* Typing Heading */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="fw-bold mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                lineHeight: '1.2',
                color: '#ffffff',
                fontWeight: '800',
                minHeight: 'clamp(80px, 12vw, 140px)',
                textShadow: '0 2px 20px rgba(0,0,0,0.8)',
              }}
            >
              <TypingText texts={taglines} />
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-5 fs-5"
              style={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '600px',
                minHeight: '48px',
                textShadow: '0 1px 10px rgba(0,0,0,0.5)',
                lineHeight: 1.6,
              }}
            >
              Premium structural, architectural, geotechnical and survey services for clients who demand quality, speed and clarity.
            </motion.p>

            {/* ==================== CTA BUTTONS ==================== */}
            <motion.div
              className="d-flex gap-3 flex-wrap mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ minHeight: '56px' }}
            >
              <Link
                className="btn btn-warning btn-lg fw-bold px-4"
                to="/contact"
                aria-label="Get a free quote for your project"
                style={{ borderRadius: '50px', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 193, 7, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Get Free Quote ✨
              </Link>
              <a
                className="btn btn-outline-light btn-lg px-4"
                href="tel:+919876543210"
                aria-label="Call us at +91 98765 43210"
                style={{ borderRadius: '50px', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                📞 Call Now
              </a>
            </motion.div>

            {/* ==================== ANIMATED COUNTERS ==================== */}
            <div className="d-flex gap-4 flex-wrap" style={{ minHeight: '72px' }}>
              {heroStats.map((item, i) => (
                <motion.div
                  key={i}
                  style={{ minWidth: '100px' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                >
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span style={{ fontSize: '1.3rem' }} role="img" aria-hidden="true">
                      {item.icon}
                    </span>
                    <AnimatedCounter target={item.target} suffix={item.suffix} />
                  </div>
                  <small className="text-white-50" style={{ paddingLeft: '2rem' }}>
                    {item.label}
                  </small>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ==================== RIGHT COLUMN (Glass Card) ==================== */}
          <div className="col-lg-5">
            <StatCard stats={heroStats} />
          </div>

        </div>
      </div>

      {/* ==================== CSS ANIMATIONS ==================== */}
      <style>{`
        @keyframes blink {
          50% { border-color: transparent; }
        }
        
        /* Smooth scroll behavior */
        @media (prefers-reduced-motion: no-preference) {
          html {
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </section>
  );
};
