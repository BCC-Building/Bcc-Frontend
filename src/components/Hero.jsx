import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  // 🔥 Typing Animation
  const texts = [
    "Engineering Excellence",
    "Smart Construction Solutions",
    "Precision & Trust"
  ];

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < texts[index].length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + texts[index][charIndex]);
        setCharIndex(charIndex + 1);
      }, 60);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setDisplayText('');
        setCharIndex(0);
        setIndex((index + 1) % texts.length);
      }, 2000);
    }
  }, [charIndex, index]);

  // 🔥 Counter Animation
  const Counter = ({ target, suffix }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 1500;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [target]);

    return (
      <h3 className="mb-0 text-white">
        {count}{suffix}
      </h3>
    );
  };

  return (
   <section
  className="hero d-flex align-items-center position-relative overflow-hidden"
  style={{
    minHeight: 'calc(100vh - 70px)',
    background:
      "linear-gradient(135deg, rgba(0,0,0,0.85), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat"
  }}
>
      <div className="container py-5 position-relative">
        <div className="row align-items-center gy-5">

          {/* LEFT CONTENT */}
          <div className="col-lg-7">

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-info fw-semibold mb-3 d-inline-block"
            >
              Construction • Consulting • Digital Solutions
            </motion.span>

            {/* 🔥 Typing Heading */}
            <motion.h1
       initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="fw-bold mb-4"
  style={{
    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
    lineHeight: '1.2',
    color: '#ffffff', // 🔥 FIX 1: force white
    fontWeight: '800',
    textShadow: `
      0 2px 10px rgba(0,0,0,0.6),
      0 4px 30px rgba(0,0,0,0.9)
    ` // 🔥 FIX 2: makes text visible on image
  }}
>
              {displayText}
              <span style={{ borderRight: '2px solid #fff', marginLeft: '5px' }}></span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-5"
              style={{
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '600px'
              }}
            >
              Premium structural, architectural, geotechnical and survey services for clients who demand quality, speed and clarity.
            </motion.p>

            <div className="d-flex gap-3 flex-wrap mb-5">
              <Link className="btn btn-primary btn-lg" to="/contact">
                Get Free Quote
              </Link>
              <a className="btn btn-outline-light btn-lg" href="tel:+919876543210">
                Call Now
              </a>
            </div>

            {/* 🔥 COUNTERS */}
            <div className="d-flex gap-4 flex-wrap">
              <div>
                <Counter target={150} suffix="+" />
                <small>Projects</small>
              </div>
              <div>
                <Counter target={20} suffix="+" />
                <small>Experts</small>
              </div>
              <div>
                <Counter target={98} suffix="%" />
                <small>Success Rate</small>
              </div>
            </div>
          </div>

          {/* RIGHT GLASS CARD */}
          <div className="col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 rounded-4 shadow-lg"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <h5 className="text-white mb-3">Trusted by Leading Clients</h5>

              <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                Delivering premium engineering and consulting solutions with unmatched precision.
              </p>

              <div className="d-flex gap-2 mt-3">
                <Link className="btn btn-light btn-sm" to="/services">
                  Services
                </Link>
                <Link className="btn btn-outline-light btn-sm" to="/contact">
                  Contact
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}