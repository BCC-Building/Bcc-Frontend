import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

// Optimized Counter Component
function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationId;
    let startTime = null;
    const duration = 1500;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [target]);

  return (
    <h3 className="mb-0 text-white" style={{ minHeight: '36px' }}>
      {count}{suffix}
    </h3>
  );
}

export default function Hero() {
  const texts = useMemo(() => [
    "Engineering Excellence",
    "Smart Construction Solutions",
    "Precision & Trust"
  ], []);

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (charIndex < texts[index].length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + texts[index][charIndex]);
        setCharIndex(prev => prev + 1);
      }, 60);
    } else {
      timeout = setTimeout(() => {
        setDisplayText('');
        setCharIndex(0);
        setIndex((prev) => (prev + 1) % texts.length);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, index, texts]);

  return (
    <section
      className="hero d-flex align-items-center position-relative overflow-hidden"
      style={{
        minHeight: 'calc(100vh - 70px)',
        position: 'relative',
        background: '#0a0a1a', // Fallback dark blue (not black)
      }}
      aria-label="Hero section"
    >
      {/* HERO IMAGE - Light overlay so image is visible */}
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

      {/* LIGHTER Overlay - Image dikhegi */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,30,0.5) 50%, rgba(0,0,0,0.7) 100%)',
          zIndex: 1,
        }}
      />

      <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center gy-5">

          {/* LEFT CONTENT */}
          <div className="col-lg-7">

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
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span style={{ minWidth: '1ch' }}>{displayText}</span>
              <span 
                style={{ 
                  borderRight: '3px solid #ffc107', 
                  marginLeft: '5px',
                  height: '0.8em',
                  display: 'inline-block',
                  animation: 'blink 1s step-end infinite',
                }}
                aria-hidden="true"
              />
            </motion.h1>

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
              }}
            >
              Premium structural, architectural, geotechnical and survey services for clients who demand quality, speed and clarity.
            </motion.p>

            {/* Buttons */}
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
                style={{ borderRadius: '50px' }}
              >
                Get Free Quote ✨
              </Link>
              <a 
                className="btn btn-outline-light btn-lg px-4" 
                href="tel:+919876543210"
                aria-label="Call us at +91 98765 43210"
                style={{ borderRadius: '50px' }}
              >
                📞 Call Now
              </a>
            </motion.div>

            {/* COUNTERS */}
            <div 
              className="d-flex gap-4 flex-wrap"
              style={{ minHeight: '72px' }}
            >
              {[
                { target: 150, suffix: '+', label: 'Projects Completed' },
                { target: 20, suffix: '+', label: 'Expert Engineers' },
                { target: 98, suffix: '%', label: 'Client Satisfaction' },
              ].map((item, i) => (
                <div key={i} style={{ minWidth: '100px' }}>
                  <Counter target={item.target} suffix={item.suffix} />
                  <small className="text-white-50">{item.label}</small>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT GLASS CARD */}
          <div className="col-lg-5">
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
                <span style={{ fontSize: '3rem' }}>🏢</span>
              </div>
              <h2 className="h5 text-white mb-3 text-center">
                Trusted by Leading Clients
              </h2>

              <p style={{ color: 'rgba(255,255,255,0.9)', minHeight: '48px', textAlign: 'center' }}>
                Delivering premium engineering & consulting solutions with unmatched precision since 2018.
              </p>

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
          </div>

        </div>
      </div>

      {/* Blink animation for cursor */}
      <style>{`
        @keyframes blink {
          50% { border-color: transparent; }
        }
      `}</style>
    </section>
  );
}