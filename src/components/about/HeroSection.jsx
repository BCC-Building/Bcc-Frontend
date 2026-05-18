

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════
const TRUST_BADGES = [
  "ISO 9001:2015 Certified",
  "CIDC Award Winner",
  "Green Certified",
];

const HERO_STATS = [
  { value: "1200+", label: "Projects\nCompleted" },
  { value: "09 +", label: "Years\nExcellence" },
  { value: "98%", label: "Client\nSatisfaction" },
];

// ═══════════════════════════════════════════════════════════
// STYLES – same variables as AchievementsPage
// ════════════════════════════════════════════════
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --ink: #12100e;
    --ink-2: #3d3830;
    --ink-3: #7a7068;
    --cream: #faf8f4;
    --warm: #f2ece0;
    --gold: #c8864a;
    --gold-l: #e8c99a;
    --gold-d: #9a6030;
    --white: #ffffff;
    --border: rgba(18,16,14,0.1);
    --fd: 'Cormorant Garamond', Georgia, serif;
    --fb: 'Jost', system-ui, sans-serif;
  }

  .hero-page * { box-sizing: border-box; }
  .hero-page { background: var(--cream); font-family: var(--fb); color: var(--ink); }

  .hero-wrapper {
    position: relative;
    background: var(--ink);
    overflow: hidden;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .hero-left {
    padding: 7rem 4rem 7rem 5rem;
    position: relative;
    z-index: 2;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--fb);
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold-l);
    margin-bottom: 2rem;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: var(--gold);
  }

  .hero-h1 {
    font-family: var(--fd);
    font-size: clamp(3rem, 5.5vw, 5.5rem);
    font-weight: 400;
    line-height: 1.06;
    color: var(--white);
    margin: 0 0 1.5rem;
    letter-spacing: -0.01em;
  }
  .hero-h1 em {
    font-style: italic;
    color: var(--gold);
  }

  .hero-desc {
    font-family: var(--fb);
    font-size: 16px;
    font-weight: 300;
    line-height: 1.85;
    color: rgba(255,255,255,0.5);
    max-width: 460px;
    margin: 0 0 2.5rem;
  }
  .hero-desc strong {
    color: rgba(255,255,255,0.85);
    font-weight: 400;
  }

  .hero-ctas {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: var(--fb);
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink);
    background: var(--gold);
    text-decoration: none;
    padding: 16px 36px;
    transition: background 0.3s, transform 0.3s;
    white-space: nowrap;
  }
  .btn-primary:hover {
    background: var(--gold-l);
    transform: translateY(-2px);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: var(--fb);
    font-size: 11.5px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    padding: 16px 36px;
    border: 1px solid rgba(255,255,255,0.15);
    transition: border-color 0.3s, color 0.3s;
    white-space: nowrap;
  }
  .btn-secondary:hover {
    border-color: rgba(255,255,255,0.4);
    color: var(--white);
  }

  .hero-trust {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
  .hero-trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255,255,255,0.45);
    font-size: 12px;
    font-weight: 500;
  }
  .hero-trust-item svg {
    color: var(--gold);
  }

  .hero-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 2.5rem;
    max-width: 480px;
    margin-top: 2rem;
  }
  .hero-stat {
    padding-right: 24px;
    border-right: 1px solid rgba(255,255,255,0.1);
  }
  .hero-stat:last-child { border-right: none; }
  .hero-stat-val {
    font-family: var(--fd);
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 300;
    line-height: 1;
    color: var(--gold);
    display: block;
  }
  .hero-stat-lbl {
    font-family: var(--fb);
    font-size: 10.5px;
    font-weight: 300;
    color: rgba(255,255,255,0.4);
    display: block;
    margin-top: 5px;
    line-height: 1.5;
    white-space: pre-line;
  }

  /* ── Right column – SVG area ── */
  .hero-right {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 3rem;
  }
  .hero-right::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(200,134,74,0.06) 0%, rgba(200,134,74,0.02) 100%);
    border-left: 1px solid rgba(200,134,74,0.2);
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .hero-wrapper {
      grid-template-columns: 1fr;
      min-height: auto;
    }
    .hero-left {
      padding: 5rem 1.5rem 3rem;
    }
    .hero-right {
      display: none;
    }
  }
`;

// ═══════════════════════════════════════════════════════════
// BRIGHT SVG ILLUSTRATION – construction theme, gold accents
// ═══════════════════════════════════════════════════════════
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 480, height: 'auto', position: 'relative', zIndex: 1 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8864a" />
          <stop offset="100%" stopColor="#e8c99a" />
        </linearGradient>
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(200,134,74,0.08)" strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect width="520" height="600" fill="url(#grid)" />

      {/* Central tower – brighter gold outline */}
      <rect x="180" y="100" width="140" height="380" fill="rgba(200,134,74,0.06)" stroke="rgba(200,134,74,0.5)" strokeWidth="1.2" />
      {/* Stronger horizontal floor lines */}
      {[140,180,220,260,300,340,380,420,460].map((y, i) => (
        <line key={i} x1="180" y1={y} x2="320" y2={y} stroke="rgba(200,134,74,0.25)" strokeWidth="0.6" />
      ))}
      {/* Vertical divider */}
      <line x1="250" y1="100" x2="250" y2="480" stroke="rgba(200,134,74,0.25)" strokeWidth="0.6" />

      {/* Left wing */}
      <rect x="100" y="220" width="80" height="260" fill="rgba(200,134,74,0.04)" stroke="rgba(200,134,74,0.3)" strokeWidth="0.8" />
      {[260,300,340,380,420].map((y, i) => (
        <line key={i} x1="100" y1={y} x2="180" y2={y} stroke="rgba(200,134,74,0.2)" strokeWidth="0.5" />
      ))}

      {/* Right wing */}
      <rect x="320" y="180" width="80" height="300" fill="rgba(200,134,74,0.04)" stroke="rgba(200,134,74,0.3)" strokeWidth="0.8" />
      {[220,260,300,340,380,420].map((y, i) => (
        <line key={i} x1="320" y1={y} x2="400" y2={y} stroke="rgba(200,134,74,0.2)" strokeWidth="0.5" />
      ))}

      {/* Ground line */}
      <line x1="60" y1="480" x2="460" y2="480" stroke="rgba(200,134,74,0.5)" strokeWidth="1.2" />

      {/* Spire / finial (gold gradient) */}
      <line x1="250" y1="100" x2="250" y2="50" stroke="url(#goldGrad)" strokeWidth="1.8" />
      <circle cx="250" cy="46" r="6" fill="none" stroke="#c8864a" strokeWidth="1.8" />
      <circle cx="250" cy="46" r="3" fill="#c8864a" />

      {/* Brighter floating award card */}
      <g transform="translate(30, 50)">
        <rect width="100" height="80" rx="3" fill="rgba(18,16,14,0.65)" stroke="rgba(200,134,74,0.5)" strokeWidth="0.8" />
        <path d="M34 52 Q34 38 50 36 Q66 38 66 52 L62 52 Q62 42 50 40 Q38 42 38 52Z" fill="none" stroke="#c8864a" strokeWidth="1.4" />
        <line x1="50" y1="52" x2="50" y2="58" stroke="#c8864a" strokeWidth="1.4" />
        <line x1="43" y1="58" x2="57" y2="58" stroke="#c8864a" strokeWidth="1.4" />
        <text x="50" y="24" textAnchor="middle" fill="#e8c99a" fontSize="8" fontFamily="'Jost',sans-serif" letterSpacing="1" fontWeight="500">AWARD</text>
        <text x="50" y="72" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="'Jost',sans-serif">2024</text>
      </g>

      {/* Brighter certification card */}
      <g transform="translate(380, 120)">
        <rect width="110" height="90" rx="3" fill="rgba(18,16,14,0.65)" stroke="rgba(200,134,74,0.5)" strokeWidth="0.8" />
        <circle cx="55" cy="42" r="20" fill="none" stroke="rgba(200,134,74,0.6)" strokeWidth="1.2" />
        <circle cx="55" cy="42" r="14" fill="none" stroke="rgba(200,134,74,0.8)" strokeWidth="1" />
        <text x="55" y="46" textAnchor="middle" fill="#c8864a" fontSize="10" fontFamily="'Jost',sans-serif" fontWeight="600">ISO</text>
        <text x="55" y="18" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="'Jost',sans-serif" letterSpacing="1">CERTIFIED</text>
        <text x="55" y="74" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6.5" fontFamily="'Jost',sans-serif">9001 · 14001</text>
        <text x="55" y="83" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="'Jost',sans-serif">OHSAS 18001</text>
      </g>

      {/* Performance mini card – bolder */}
      <g transform="translate(20, 380)">
        <rect width="130" height="95" rx="3" fill="rgba(18,16,14,0.7)" stroke="rgba(200,134,74,0.4)" strokeWidth="0.8" />
        <text x="14" y="22" fill="rgba(200,134,74,0.8)" fontSize="7" fontFamily="'Jost',sans-serif" letterSpacing="1.2" fontWeight="600">PERFORMANCE</text>
        <text x="14" y="44" fill="#c8864a" fontSize="24" fontFamily="'Cormorant Garamond',serif" fontWeight="300">98%</text>
        <text x="14" y="58" fill="rgba(255,255,255,0.45)" fontSize="7.5" fontFamily="'Jost',sans-serif" fontWeight="300">On-Time Delivery</text>
        <line x1="14" y1="66" x2="116" y2="66" stroke="rgba(200,134,74,0.3)" strokeWidth="0.5" />
        <text x="14" y="80" fill="#c8864a" fontSize="20" fontFamily="'Cormorant Garamond',serif" fontWeight="300">250+</text>
        <text x="58" y="80" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="'Jost',sans-serif" fontWeight="300">Projects</text>
      </g>

      {/* Connecting dots & lines – brighter */}
      <line x1="130" y1="100" x2="180" y2="120" stroke="rgba(200,134,74,0.25)" strokeWidth="0.6" strokeDasharray="3,4" />
      <line x1="380" y1="170" x2="320" y2="180" stroke="rgba(200,134,74,0.25)" strokeWidth="0.6" strokeDasharray="3,4" />
      <line x1="150" y1="380" x2="180" y2="400" stroke="rgba(200,134,74,0.25)" strokeWidth="0.6" strokeDasharray="3,4" />

      <circle cx="130" cy="100" r="3" fill="rgba(200,134,74,0.7)" />
      <circle cx="380" cy="170" r="3" fill="rgba(200,134,74,0.7)" />
      <circle cx="150" cy="380" r="3" fill="rgba(200,134,74,0.7)" />

      {/* Building label – brighter */}
      <text x="250" y="510" textAnchor="middle" fill="rgba(200,134,74,0.6)" fontSize="8" fontFamily="'Jost',sans-serif" letterSpacing="2.5" fontWeight="400">BUILDING CREATORS & CONSULTING</text>
      <text x="250" y="528" textAnchor="middle" fill="rgba(200,134,74,0.35)" fontSize="6.5" fontFamily="'Jost',sans-serif" letterSpacing="1.5">EST. 2010</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function HeroSection() {
  return (
    <>
      <style>{css}</style>
      <div className="hero-page">
        <section className="hero-wrapper" aria-label="Hero">
          {/* Left Column */}
          <div className="hero-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="hero-eyebrow">Building Trust Since 2010</p>
            </motion.div>

            <motion.h1
              className="hero-h1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Building India's<br />
              <em>Future Together</em>
            </motion.h1>

            <motion.p
              className="hero-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              We don't just construct buildings — we architect legacies. Delivering{' '}
              <strong>250+ landmark projects</strong> with uncompromising quality,
              transparency, and innovation.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <Link to="/contact" className="btn-primary">
                Start Your Project <FaArrowRight />
              </Link>
              <Link to="/projects" className="btn-secondary">
                View Portfolio
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="hero-trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {TRUST_BADGES.map((badge, i) => (
                <span key={i} className="hero-trust-item">
                  <FaCheckCircle /> {badge}
                </span>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              {HERO_STATS.map((s, i) => (
                <div className="hero-stat" key={i}>
                  <span className="hero-stat-val">{s.value}</span>
                  <span className="hero-stat-lbl">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column – SVG Illustration */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            aria-hidden="true"
          >
            <HeroIllustration />
          </motion.div>
        </section>
      </div>
    </>
  );
}