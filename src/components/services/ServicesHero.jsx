import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════
const TRUST_BADGES = [
  "ISO 9001:2015 Certified",
  "NABL Accredited Lab",
  "100% Client Satisfaction",
];

const HERO_STATS = [
  { value: "09+", label: "Years\nExperience" },
  { value: "1200+", label: "Projects\nDone" },
  { value: "98%", label: "Client\nSatisfaction" },
];

// ═══════════════════════════════════════════════════════════
// STYLES – same variables as About page hero
// ═══════════════════════════════════════════════════════════
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

  .services-hero-page * { box-sizing: border-box; }
  .services-hero-page { background: var(--cream); font-family: var(--fb); color: var(--ink); }

  .services-hero-wrapper {
    position: relative;
    background: var(--ink);
    overflow: hidden;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .services-hero-left {
    padding: 7rem 4rem 7rem 5rem;
    position: relative;
    z-index: 2;
  }

  .services-hero-eyebrow {
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
  .services-hero-eyebrow::before {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: var(--gold);
  }

  .services-hero-h1 {
    font-family: var(--fd);
    font-size: clamp(3rem, 5.5vw, 5.5rem);
    font-weight: 400;
    line-height: 1.06;
    color: var(--white);
    margin: 0 0 1.5rem;
    letter-spacing: -0.01em;
  }
  .services-hero-h1 em {
    font-style: italic;
    color: var(--gold);
  }

  .services-hero-desc {
    font-family: var(--fb);
    font-size: 16px;
    font-weight: 300;
    line-height: 1.85;
    color: rgba(255,255,255,0.5);
    max-width: 460px;
    margin: 0 0 2.5rem;
  }
  .services-hero-desc strong {
    color: rgba(255,255,255,0.85);
    font-weight: 400;
  }

  .services-hero-ctas {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  .services-btn-primary {
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
  .services-btn-primary:hover {
    background: var(--gold-l);
    transform: translateY(-2px);
  }

  .services-btn-secondary {
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
  .services-btn-secondary:hover {
    border-color: rgba(255,255,255,0.4);
    color: var(--white);
  }

  .services-hero-trust {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
  .services-hero-trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255,255,255,0.45);
    font-size: 12px;
    font-weight: 500;
  }
  .services-hero-trust-item svg {
    color: var(--gold);
  }

  .services-hero-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 2.5rem;
    max-width: 480px;
    margin-top: 2rem;
  }
  .services-hero-stat {
    padding-right: 24px;
    border-right: 1px solid rgba(255,255,255,0.1);
  }
  .services-hero-stat:last-child { border-right: none; }
  .services-hero-stat-val {
    font-family: var(--fd);
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 300;
    line-height: 1;
    color: var(--gold);
    display: block;
  }
  .services-hero-stat-lbl {
    font-family: var(--fb);
    font-size: 10.5px;
    font-weight: 300;
    color: rgba(255,255,255,0.4);
    display: block;
    margin-top: 5px;
    line-height: 1.5;
    white-space: pre-line;
  }

  /* ── Right column – SVG Engineering Illustration ── */
  .services-hero-right {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 3rem;
  }
  .services-hero-right::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(200,134,74,0.06) 0%, rgba(200,134,74,0.02) 100%);
    border-left: 1px solid rgba(200,134,74,0.2);
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .services-hero-wrapper {
      grid-template-columns: 1fr;
      min-height: auto;
    }
    .services-hero-left {
      padding: 5rem 1.5rem 3rem;
    }
    .services-hero-right {
      display: none;
    }
  }
`;

// ═══════════════════════════════════════════════════════════
// ENGINEERING SVG ILLUSTRATION – gears, blueprints, precision
// ═══════════════════════════════════════════════════════════
function EngineeringIllustration() {
  return (
    <svg
      viewBox="0 0 520 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 480, height: 'auto', position: 'relative', zIndex: 1 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8864a" />
          <stop offset="100%" stopColor="#e8c99a" />
        </linearGradient>
        <pattern id="blueprint" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(200,134,74,0.08)" strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect width="520" height="600" fill="url(#blueprint)" />

      {/* Central gear mechanism */}
      <g transform="translate(260, 280)">
        {/* Outer gear */}
        <circle cx="0" cy="0" r="140" fill="none" stroke="rgba(200,134,74,0.15)" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="120" fill="none" stroke="rgba(200,134,74,0.3)" strokeWidth="1.2" strokeDasharray="8,6" />
        <circle cx="0" cy="0" r="100" fill="none" stroke="rgba(200,134,74,0.5)" strokeWidth="1.5" />
        
        {/* Gear teeth */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <rect x="-8" y="-145" width="16" height="18" fill="none" stroke="rgba(200,134,74,0.4)" strokeWidth="1" rx="2" />
          </g>
        ))}
        
        {/* Inner spokes */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <line key={i} x1="0" y1="0" x2="0" y2="-95" stroke="rgba(200,134,74,0.35)" strokeWidth="1" transform={`rotate(${angle})`} />
        ))}
        
        {/* Center hub */}
        <circle cx="0" cy="0" r="25" fill="none" stroke="rgba(200,134,74,0.6)" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="15" fill="rgba(200,134,74,0.1)" stroke="url(#goldGrad2)" strokeWidth="1.8" />
        <circle cx="0" cy="0" r="6" fill="#c8864a" />
      </g>

      {/* Small gear top-left */}
      <g transform="translate(120, 160)">
        <circle cx="0" cy="0" r="50" fill="none" stroke="rgba(200,134,74,0.3)" strokeWidth="1" strokeDasharray="6,4" />
        <circle cx="0" cy="0" r="35" fill="none" stroke="rgba(200,134,74,0.5)" strokeWidth="1.2" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <rect x="-5" y="-56" width="10" height="10" fill="none" stroke="rgba(200,134,74,0.35)" strokeWidth="0.8" rx="1" />
          </g>
        ))}
        <circle cx="0" cy="0" r="8" fill="none" stroke="url(#goldGrad2)" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="3" fill="#c8864a" />
      </g>

      {/* Small gear bottom-right */}
      <g transform="translate(400, 420)">
        <circle cx="0" cy="0" r="45" fill="none" stroke="rgba(200,134,74,0.3)" strokeWidth="1" strokeDasharray="5,3" />
        <circle cx="0" cy="0" r="30" fill="none" stroke="rgba(200,134,74,0.5)" strokeWidth="1.2" />
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <rect x="-4" y="-50" width="8" height="9" fill="none" stroke="rgba(200,134,74,0.35)" strokeWidth="0.8" rx="1" />
          </g>
        ))}
        <circle cx="0" cy="0" r="7" fill="none" stroke="url(#goldGrad2)" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="3" fill="#c8864a" />
      </g>

      {/* Connecting lines between gears */}
      <line x1="170" y1="160" x2="260" y2="250" stroke="rgba(200,134,74,0.2)" strokeWidth="0.8" strokeDasharray="4,6" />
      <line x1="260" y1="310" x2="400" y2="400" stroke="rgba(200,134,74,0.2)" strokeWidth="0.8" strokeDasharray="4,6" />

      {/* Blueprint/circuit lines */}
      <g opacity="0.4">
        <line x1="60" y1="480" x2="180" y2="480" stroke="rgba(200,134,74,0.5)" strokeWidth="0.8" />
        <line x1="340" y1="480" x2="460" y2="480" stroke="rgba(200,134,74,0.5)" strokeWidth="0.8" />
        <line x1="260" y1="460" x2="260" y2="490" stroke="rgba(200,134,74,0.5)" strokeWidth="0.8" />
        
        {/* Measurement markers */}
        <line x1="60" y1="485" x2="60" y2="475" stroke="rgba(200,134,74,0.6)" strokeWidth="1.2" />
        <line x1="460" y1="485" x2="460" y2="475" stroke="rgba(200,134,74,0.6)" strokeWidth="1.2" />
      </g>

      {/* Floating certification card */}
      <g transform="translate(30, 50)">
        <rect width="100" height="80" rx="3" fill="rgba(18,16,14,0.65)" stroke="rgba(200,134,74,0.5)" strokeWidth="0.8" />
        <circle cx="50" cy="40" r="18" fill="none" stroke="rgba(200,134,74,0.6)" strokeWidth="1" />
        <text x="50" y="44" textAnchor="middle" fill="#c8864a" fontSize="8" fontFamily="'Jost',sans-serif" fontWeight="600">ISO</text>
        <text x="50" y="18" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="'Jost',sans-serif" letterSpacing="1">CERTIFIED</text>
        <text x="50" y="65" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="'Jost',sans-serif">9001:2015</text>
        <text x="50" y="75" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="'Jost',sans-serif">NABL ACCREDITED</text>
      </g>

      {/* Performance card */}
      <g transform="translate(380, 100)">
        <rect width="110" height="90" rx="3" fill="rgba(18,16,14,0.7)" stroke="rgba(200,134,74,0.4)" strokeWidth="0.8" />
        <text x="12" y="20" fill="rgba(200,134,74,0.8)" fontSize="7" fontFamily="'Jost',sans-serif" letterSpacing="1.2" fontWeight="600">EFFICIENCY</text>
        <text x="12" y="48" fill="#c8864a" fontSize="26" fontFamily="'Cormorant Garamond',serif" fontWeight="300">98%</text>
        <text x="12" y="62" fill="rgba(255,255,255,0.45)" fontSize="7.5" fontFamily="'Jost',sans-serif" fontWeight="300">Client Satisfaction</text>
        <line x1="12" y1="70" x2="98" y2="70" stroke="rgba(200,134,74,0.3)" strokeWidth="0.5" />
        <text x="12" y="84" fill="rgba(255,255,255,0.4)" fontSize="6.5" fontFamily="'Jost',sans-serif">24/7 Support Available</text>
      </g>

      {/* Connecting dots */}
      <circle cx="130" cy="90" r="3" fill="rgba(200,134,74,0.7)" />
      <circle cx="490" cy="145" r="3" fill="rgba(200,134,74,0.7)" />
      <circle cx="50" cy="420" r="3" fill="rgba(200,134,74,0.7)" />
      
      <line x1="130" y1="90" x2="260" y2="240" stroke="rgba(200,134,74,0.15)" strokeWidth="0.6" strokeDasharray="3,4" />
      <line x1="490" y1="145" x2="260" y2="240" stroke="rgba(200,134,74,0.15)" strokeWidth="0.6" strokeDasharray="3,4" />
      <line x1="50" y1="420" x2="260" y2="280" stroke="rgba(200,134,74,0.15)" strokeWidth="0.6" strokeDasharray="3,4" />

      {/* Building label */}
      <text x="260" y="520" textAnchor="middle" fill="rgba(200,134,74,0.6)" fontSize="8" fontFamily="'Jost',sans-serif" letterSpacing="2.5" fontWeight="400">ENGINEERING EXCELLENCE</text>
      <text x="260" y="538" textAnchor="middle" fill="rgba(200,134,74,0.35)" fontSize="6.5" fontFamily="'Jost',sans-serif" letterSpacing="1.5">INNOVATION & PRECISION</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function ServicesHero({ totalServices }) {
  return (
    <>
      <style>{css}</style>
      <div className="services-hero-page">
        <section className="services-hero-wrapper" aria-label="Services Hero">
          {/* Left Column */}
          <div className="services-hero-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="services-hero-eyebrow">Trusted Since 2017</p>
            </motion.div>

            <motion.h1
              className="services-hero-h1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Engineering<br />
              <em>Excellence</em> That<br />
              Builds Tomorrow
            </motion.h1>

            <motion.p
              className="services-hero-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              From concept to completion, we deliver innovative engineering solutions 
              that stand the test of time.{' '}
              <strong>{totalServices}+ specialized services</strong> tailored to 
              your needs with uncompromising quality.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="services-hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <Link to="/contact" className="services-btn-primary">
                Start Your Project <FaArrowRight />
              </Link>
              <Link to="/projects" className="services-btn-secondary">
                View Portfolio
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="services-hero-trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {TRUST_BADGES.map((badge, i) => (
                <span key={i} className="services-hero-trust-item">
                  <FaCheckCircle /> {badge}
                </span>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="services-hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              {HERO_STATS.map((s, i) => (
                <div className="services-hero-stat" key={i}>
                  <span className="services-hero-stat-val">{s.value}</span>
                  <span className="services-hero-stat-lbl">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column – Engineering SVG Illustration */}
          <motion.div
            className="services-hero-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            aria-hidden="true"
          >
            <EngineeringIllustration />
          </motion.div>
        </section>
      </div>
    </>
  );
}