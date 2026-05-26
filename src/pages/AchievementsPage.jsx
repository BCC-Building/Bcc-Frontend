// src/pages/AchievementsPage.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AchievementsHero from '../components/achievements/AchievementsHero';

// ==================== DATA ====================

const ACHIEVEMENT_CATEGORIES = [
  {
    id: 'awards',
    title: 'Awards & Recognitions',
    label: '01',
    items: [
      {
        title: 'Best Construction & Consulting Firm 2024',
        desc: 'Awarded by Uttarakhand Business Excellence Forum for outstanding project delivery and client satisfaction.',
        year: '2024',
      },
      {
        title: 'Emerging Infrastructure Partner',
        desc: 'Recognised by India Infrastructure Awards for contributions in defence and government projects.',
        year: '2023',
      },
      {
        title: 'Quality Excellence Award',
        desc: 'Received from PWD Uttarakhand for consistent quality standards in road construction.',
        year: '2022',
      },
    ],
  },
  {
    id: 'certifications',
    title: 'Certifications & Accreditations',
    label: '02',
    items: [
      {
        title: 'ISO 9001:2015 Certified',
        desc: 'Quality Management System certified by TÜV SÜD for construction and consulting services.',
        year: '2019',
      },
      {
        title: 'ISO 14001:2015 Certified',
        desc: 'Environmental Management System certification for sustainable construction practices.',
        year: '2020',
      },
      {
        title: 'OHSAS 18001 Certified',
        desc: 'Occupational Health and Safety Management certification for safe work environments.',
        year: '2020',
      },
      {
        title: 'Class‑A Contractor License',
        desc: 'Registered with State PWD for major infrastructure works up to unlimited value.',
        year: '2017',
      },
    ],
  },
  {
    id: 'milestones',
    title: 'Major Milestones',
    label: '03',
    items: [
      {
        title: 'Crossed 500+ Projects',
        desc: 'Successfully delivered over 500 projects across 6 states since inception.',
        year: '2025',
      },
      {
        title: 'First Defence Project',
        desc: 'Secured first MES (Military Engineering Services) contract for cantonment infrastructure.',
        year: '2020',
      },
      {
        title: 'BPCL Empanelment',
        desc: 'Empanelled as approved contractor for Bharat Petroleum for fuel station construction.',
        year: '2021',
      },
      {
        title: 'Railway Infrastructure Entry',
        desc: 'Completed first railway platform shed project for RVNL, marking entry into rail sector.',
        year: '2023',
      },
    ],
  },
  {
    id: 'metrics',
    title: 'Performance Metrics',
    label: '04',
    items: [
      {
        title: '50+ Government Clients',
        desc: 'Serving defence, PWD, petroleum, railways, and municipal corporations across India.',
        year: 'Ongoing',
      },
      {
        title: '1200+ Projects Completed',
        desc: 'Successfully delivered projects ranging from small works to large‑scale infrastructure.',
        year: 'Since 2017',
      },
      {
        title: '98% On‑Time Delivery',
        desc: 'Proven track record of meeting deadlines without compromising quality.',
        year: 'Consistent',
      },
      {
        title: '98% Client Retention',
        desc: 'Long‑standing relationships with government departments and public sector units.',
        year: 'Ongoing',
      },
    ],
  },
];

const HERO_STATS = [
  { value: '1200+', label: 'Projects\nCompleted' },
  { value: '50+', label: 'Govt.\nClients' },
  { value: '98%', label: 'On-Time\nDelivery' },
  { value: '9+', label: 'Years of\nService' },
];

// ==================== STYLES ====================

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

  .ach-page * { box-sizing: border-box; }
  .ach-page { background: var(--cream); font-family: var(--fb); color: var(--ink); }

  /* ── HERO ── */
  .hero-wrap {
    position: relative;
    background: linear-gradient(135deg, rgba(10,8,6,0.88) 0%, rgba(15,12,8,0.85) 50%, rgba(8,6,4,0.92) 100%),
      url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85&fm=webp') center/cover no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow: hidden;
    min-height: 92vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  .hero-left {
    padding: 7rem 4rem 7rem 5rem;
    position: relative;
    z-index: 4;
  }
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: var(--fb);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #d4af37;
    margin-bottom: 2.5rem;
    opacity: 0.95;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #d4af37 0%, rgba(212,175,55,0.3) 100%);
  }
  .hero-h1 {
    font-family: var(--fd);
    font-size: clamp(3.2rem, 6vw, 6rem);
    font-weight: 300;
    line-height: 1.08;
    color: var(--white);
    margin: 0 0 1.8rem;
    letter-spacing: -0.015em;
    text-shadow: 0 2px 12px rgba(0,0,0,0.6);
  }
  .hero-h1 em { font-style: italic; color: #d4af37; font-weight: 400; }
  .hero-desc {
    font-family: var(--fb);
    font-size: 17px;
    font-weight: 400;
    line-height: 1.9;
    color: rgba(255,255,255,0.88);
    max-width: 520px;
    margin: 0 0 3rem;
    letter-spacing: 0.3px;
  }
  .hero-desc strong { color: #d4af37; font-weight: 500; }

  /* hero stats row */
  .hero-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 2.5rem;
    max-width: 520px;
  }
  .hstat {
    padding-right: 24px;
    border-right: 1px solid rgba(255,255,255,0.1);
  }
  .hstat:last-child { border-right: none; }
  .hstat-val {
    font-family: var(--fd);
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 300;
    line-height: 1;
    color: var(--gold);
    display: block;
  }
  .hstat-lbl {
    font-family: var(--fb);
    font-size: 10.5px;
    font-weight: 300;
    color: rgba(255,255,255,0.4);
    display: block;
    margin-top: 5px;
    line-height: 1.5;
    white-space: pre-line;
  }

  /* hero right — SVG illustration area */
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
    background: linear-gradient(135deg, rgba(200,134,74,0.04) 0%, rgba(200,134,74,0.01) 100%);
    border-left: 1px solid rgba(200,134,74,0.15);
  }

  /* decorative gold lines in bg */
  .hero-bg-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  /* ── SECTION INTRO ── */
  .section-intro {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 56px 56px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 3rem;
    border-bottom: 1px solid var(--border);
  }
  .intro-left { max-width: 560px; }
  .section-tag {
    font-family: var(--fb);
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1rem;
  }
  .section-tag::before { content: ''; display: block; width: 24px; height: 1px; background: var(--gold); }
  .section-h2 {
    font-family: var(--fd);
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 400;
    line-height: 1.2;
    color: var(--ink);
    margin: 0;
  }
  .section-h2 em { font-style: italic; color: var(--gold); }
  .intro-right {
    font-family: var(--fb);
    font-size: 15px;
    font-weight: 300;
    line-height: 1.85;
    color: var(--ink-3);
    max-width: 360px;
  }

  /* ── CATEGORIES ── */
  .cat-wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 56px 80px;
  }
  .cat-block {
    padding: 52px 0;
    border-bottom: 1px solid var(--border);
  }
  .cat-block:last-child { border-bottom: none; }
  .cat-header {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 0 32px;
    margin-bottom: 36px;
    align-items: baseline;
  }
  .cat-num {
    font-family: var(--fd);
    font-size: 3rem;
    font-weight: 300;
    color: var(--gold-l);
    line-height: 1;
  }
  .cat-title {
    font-family: var(--fd);
    font-size: clamp(1.4rem, 2.2vw, 1.9rem);
    font-weight: 400;
    color: var(--ink);
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }
  .items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .ach-item {
    background: var(--white);
    padding: 28px 28px 24px;
    position: relative;
    transition: background 0.3s ease;
    cursor: default;
  }
  .ach-item:hover { background: var(--warm); }
  .ach-item:hover .ach-item-title { color: var(--gold-d); }
  .ach-year {
    font-family: var(--fb);
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.18em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 10px;
    display: block;
  }
  .ach-item-title {
    font-family: var(--fd);
    font-size: clamp(1rem, 1.3vw, 1.2rem);
    font-weight: 400;
    line-height: 1.35;
    color: var(--ink);
    margin: 0 0 10px;
    transition: color 0.3s;
  }
  .ach-item-desc {
    font-family: var(--fb);
    font-size: 13px;
    font-weight: 300;
    line-height: 1.75;
    color: var(--ink-3);
    margin: 0;
  }
  .ach-corner {
    position: absolute;
    bottom: 16px;
    right: 20px;
    font-size: 20px;
    color: var(--gold-l);
    transition: color 0.3s, transform 0.3s;
  }
  .ach-item:hover .ach-corner { color: var(--gold); transform: translate(2px, -2px); }

  /* ── CTA ── */
  .cta-section {
    background: var(--ink);
    padding: 80px 56px;
  }
  .cta-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 4rem;
    align-items: center;
  }
  .cta-h {
    font-family: var(--fd);
    font-size: clamp(2rem, 3.5vw, 3.2rem);
    font-weight: 400;
    color: var(--white);
    line-height: 1.2;
    margin: 0 0 1rem;
  }
  .cta-h em { font-style: italic; color: var(--gold); }
  .cta-p {
    font-family: var(--fb);
    font-size: 15px;
    font-weight: 300;
    color: rgba(255,255,255,0.45);
    margin: 0;
    line-height: 1.7;
  }
  .cta-buttons { display: flex; flex-direction: column; gap: 12px; }
  .cta-btn-primary {
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
  .cta-btn-primary:hover { background: var(--gold-l); transform: translateY(-2px); }
  .cta-btn-secondary {
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
  .cta-btn-secondary:hover { border-color: rgba(255,255,255,0.4); color: var(--white); }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .hero-wrap { grid-template-columns: 1fr; min-height: auto; }
    .hero-left { padding: 5rem 1.5rem 3rem; }
    .hero-right { display: none; }
    .hero-stats { max-width: 100%; grid-template-columns: repeat(2,1fr); gap: 1.5rem 0; }
    .hstat { border-right: none; padding-right: 0; }
    .section-intro { flex-direction: column; padding: 48px 24px 36px; }
    .cat-wrap { padding: 0 24px 56px; }
    .items-grid { grid-template-columns: 1fr; }
    .cta-inner { grid-template-columns: 1fr; gap: 2rem; }
    .cta-section { padding: 56px 24px; }
  }
`;

// ==================== HERO SVG ILLUSTRATION ====================
// Professional architecture/achievement themed SVG
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 480, height: 'auto', position: 'relative', zIndex: 1 }}
      aria-hidden="true"
    >
      {/* Background subtle grid */}
      <defs>
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(200,134,74,0.06)" strokeWidth="0.5"/>
        </pattern>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8864a"/>
          <stop offset="100%" stopColor="#e8c99a"/>
        </linearGradient>
        <linearGradient id="buildGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(200,134,74,0.15)"/>
          <stop offset="100%" stopColor="rgba(200,134,74,0.04)"/>
        </linearGradient>
      </defs>

      <rect width="520" height="600" fill="url(#grid)"/>

      {/* Large abstract building silhouette */}
      {/* Main tower */}
      <rect x="200" y="120" width="120" height="380" fill="rgba(200,134,74,0.06)" stroke="rgba(200,134,74,0.2)" strokeWidth="0.75"/>
      {/* Tower floors */}
      {[160,200,240,280,320,360,400,440].map((y,i) => (
        <line key={i} x1="200" y1={y} x2="320" y2={y} stroke="rgba(200,134,74,0.12)" strokeWidth="0.5"/>
      ))}
      {/* Tower vertical divide */}
      <line x1="260" y1="120" x2="260" y2="500" stroke="rgba(200,134,74,0.12)" strokeWidth="0.5"/>

      {/* Left wing */}
      <rect x="120" y="240" width="80" height="260" fill="rgba(200,134,74,0.04)" stroke="rgba(200,134,74,0.14)" strokeWidth="0.75"/>
      {[280,320,360,400,440].map((y,i) => (
        <line key={i} x1="120" y1={y} x2="200" y2={y} stroke="rgba(200,134,74,0.08)" strokeWidth="0.5"/>
      ))}

      {/* Right wing */}
      <rect x="320" y="200" width="80" height="300" fill="rgba(200,134,74,0.04)" stroke="rgba(200,134,74,0.14)" strokeWidth="0.75"/>
      {[240,280,320,360,400,440].map((y,i) => (
        <line key={i} x1="320" y1={y} x2="400" y2={y} stroke="rgba(200,134,74,0.08)" strokeWidth="0.5"/>
      ))}

      {/* Ground line */}
      <line x1="60" y1="500" x2="460" y2="500" stroke="rgba(200,134,74,0.3)" strokeWidth="1"/>

      {/* Spire / finial */}
      <line x1="260" y1="120" x2="260" y2="60" stroke="url(#goldGrad)" strokeWidth="1.5"/>
      <circle cx="260" cy="56" r="5" fill="none" stroke="#c8864a" strokeWidth="1.5"/>
      <circle cx="260" cy="56" r="2" fill="#c8864a"/>

      {/* Trophy / award icon — top left floating card */}
      <g transform="translate(40, 60)">
        <rect width="100" height="80" rx="2" fill="rgba(18,16,14,0.6)" stroke="rgba(200,134,74,0.3)" strokeWidth="0.75"/>
        {/* trophy cup */}
        <path d="M34 52 Q34 38 50 36 Q66 38 66 52 L62 52 Q62 42 50 40 Q38 42 38 52Z" fill="none" stroke="#c8864a" strokeWidth="1.2"/>
        <line x1="50" y1="52" x2="50" y2="58" stroke="#c8864a" strokeWidth="1.2"/>
        <line x1="43" y1="58" x2="57" y2="58" stroke="#c8864a" strokeWidth="1.2"/>
        <text x="50" y="24" textAnchor="middle" fill="rgba(200,134,74,0.7)" fontSize="8" fontFamily="'Jost',sans-serif" letterSpacing="1" fontWeight="400">AWARD</text>
        <text x="50" y="72" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="'Jost',sans-serif" letterSpacing="0.5">2024</text>
      </g>

      {/* ISO cert card — right floating */}
      <g transform="translate(370, 130)">
        <rect width="110" height="90" rx="2" fill="rgba(18,16,14,0.6)" stroke="rgba(200,134,74,0.3)" strokeWidth="0.75"/>
        <circle cx="55" cy="42" r="18" fill="none" stroke="rgba(200,134,74,0.4)" strokeWidth="1"/>
        <circle cx="55" cy="42" r="12" fill="none" stroke="rgba(200,134,74,0.6)" strokeWidth="0.75"/>
        <text x="55" y="46" textAnchor="middle" fill="#c8864a" fontSize="9" fontFamily="'Jost',sans-serif" fontWeight="500">ISO</text>
        <text x="55" y="18" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="'Jost',sans-serif" letterSpacing="1">CERTIFIED</text>
        <text x="55" y="74" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6.5" fontFamily="'Jost',sans-serif" letterSpacing="0.5">9001 · 14001</text>
        <text x="55" y="83" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="'Jost',sans-serif">OHSAS 18001</text>
      </g>

      {/* Stats mini card — bottom left */}
      <g transform="translate(28, 380)">
        <rect width="130" height="95" rx="2" fill="rgba(18,16,14,0.7)" stroke="rgba(200,134,74,0.25)" strokeWidth="0.75"/>
        <text x="14" y="22" fill="rgba(200,134,74,0.6)" fontSize="7" fontFamily="'Jost',sans-serif" letterSpacing="1.2" fontWeight="500">PERFORMANCE</text>
        <text x="14" y="44" fill="#c8864a" fontSize="22" fontFamily="'Cormorant Garamond',serif" fontWeight="300">98%</text>
        <text x="14" y="58" fill="rgba(255,255,255,0.3)" fontSize="7.5" fontFamily="'Jost',sans-serif" letterSpacing="0.5" fontWeight="300">On-Time Delivery</text>
        <line x1="14" y1="66" x2="116" y2="66" stroke="rgba(200,134,74,0.15)" strokeWidth="0.5"/>
        <text x="14" y="80" fill="#c8864a" fontSize="18" fontFamily="'Cormorant Garamond',serif" fontWeight="300">150+</text>
        <text x="58" y="80" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="'Jost',sans-serif" fontWeight="300">Projects</text>
      </g>

      {/* Connecting dot lines */}
      <line x1="140" y1="100" x2="200" y2="120" stroke="rgba(200,134,74,0.1)" strokeWidth="0.5" strokeDasharray="3,4"/>
      <line x1="370" y1="175" x2="320" y2="200" stroke="rgba(200,134,74,0.1)" strokeWidth="0.5" strokeDasharray="3,4"/>
      <line x1="158" y1="380" x2="200" y2="380" stroke="rgba(200,134,74,0.1)" strokeWidth="0.5" strokeDasharray="3,4"/>

      {/* Small accent dots */}
      <circle cx="140" cy="100" r="2" fill="rgba(200,134,74,0.4)"/>
      <circle cx="370" cy="175" r="2" fill="rgba(200,134,74,0.4)"/>
      <circle cx="158" cy="380" r="2" fill="rgba(200,134,74,0.4)"/>

      {/* Measurement lines — architectural feel */}
      <line x1="80" y1="510" x2="440" y2="510" stroke="rgba(200,134,74,0.2)" strokeWidth="0.5"/>
      <line x1="80" y1="506" x2="80" y2="514" stroke="rgba(200,134,74,0.3)" strokeWidth="0.75"/>
      <line x1="440" y1="506" x2="440" y2="514" stroke="rgba(200,134,74,0.3)" strokeWidth="0.75"/>
      <text x="260" y="526" textAnchor="middle" fill="rgba(200,134,74,0.35)" fontSize="7.5" fontFamily="'Jost',sans-serif" letterSpacing="2" fontWeight="300">BUILDING CREATORS & CONSULTING</text>

      {/* Est line */}
      <text x="260" y="542" textAnchor="middle" fill="rgba(200,134,74,0.2)" fontSize="6.5" fontFamily="'Jost',sans-serif" letterSpacing="1.5">EST. 2017</text>
    </svg>
  );
}

// ==================== SUB-COMPONENTS ====================

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }),
};

function AchievementItem({ item, index }) {
  return (
    <motion.div
      className="ach-item"
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <span className="ach-year">{item.year}</span>
      <h4 className="ach-item-title">{item.title}</h4>
      <p className="ach-item-desc">{item.desc}</p>
      <span className="ach-corner" aria-hidden="true">→</span>
    </motion.div>
  );
}

function CategoryBlock({ category }) {
  return (
    <motion.div
      className="cat-block"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="cat-header">
        <span className="cat-num">{category.label}</span>
        <h3 className="cat-title">{category.title}</h3>
      </div>
      <div className="items-grid">
        {category.items.map((item, idx) => (
          <AchievementItem key={idx} item={item} index={idx} />
        ))}
      </div>
    </motion.div>
  );
}

// ==================== JSON-LD SCHEMAS ====================

const buildSchemas = () => {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BCC Building Creators And Consulting',
    url: 'https://bcc.net.in',
    logo: 'https://bcc.net.in/logo.png',
    description: 'Award-winning construction and consulting firm with 1200+ projects, ISO certifications, and recognition from government bodies across 8 countries.',
    foundingDate: '2017',
    founder: { '@type': 'Person', name: 'Er. Yaseen Ahmad Khan' },
    numberOfEmployees: { '@type': 'QuantitativeValue', value: '50+' },
    award: ACHIEVEMENT_CATEGORIES.flatMap(c => c.items.map(i => i.title)).join(', '),
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'ISO 9001:2015', name: 'Quality Management System' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'ISO 14001:2015', name: 'Environmental Management System' },
    ],
    sameAs: ['https://bcc.net.in'],
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bcc.net.in' },
      { '@type': 'ListItem', position: 2, name: 'Achievements', item: 'https://bcc.net.in/achievements' },
    ],
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is BCC ISO certified?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes, BCC holds ISO 9001:2015, ISO 14001:2015, and OHSAS 18001 certifications.' },
      },
      {
        '@type': 'Question',
        name: 'How many projects has BCC completed?',
        acceptedAnswer: { '@type': 'Answer', text: 'BCC has successfully completed 1200+ projects across 6 states since 2010.' },
      },
    ],
  };

  return { org, breadcrumb, faq };
};

// ==================== MAIN COMPONENT ====================

export default function AchievementsPage() {
  const { org, breadcrumb, faq } = buildSchemas();

  return (
    <>
      <SEO
        title="Awards, Certifications & Milestones | BCC Building Creators and Consulting"
        description="Explore BCC's 200+ awards, ISO 9001/14001/OHSAS certifications, 1200+ completed projects, and 15+ years of engineering excellence across India and 8 countries."
        keywords="BCC achievements, ISO certified construction firm, construction awards India, Uttarakhand contractor awards, engineering milestones, government contractor certifications, best construction firm 2024"
        url="https://bcc.net.in/achievements"
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(org)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(faq)}</script>
        <style>{css}</style>
      </Helmet>

      <div className="ach-page">

        {/* ══ HERO ══ */}
        <AchievementsHero />

        {/* ══ SECTION INTRO ══ */}
        <div className="section-intro">
          <div className="intro-left">
            <p className="section-tag">Our Journey</p>
            <h2 className="section-h2">
              Milestones That<br />
              <em>Define Us</em>
            </h2>
          </div>
          <p className="intro-right">
            Every award, certification, and milestone tells the story of our dedication
            to building better futures — with precision, integrity, and technical excellence.
          </p>
        </div>

        {/* ══ CATEGORIES ══ */}
        <div className="cat-wrap">
          {ACHIEVEMENT_CATEGORIES.map((cat) => (
            <CategoryBlock key={cat.id} category={cat} />
          ))}
        </div>

        {/* ══ CTA ══ */}
        <section className="cta-section" aria-label="Call to action">
          <div className="cta-inner">
            <div>
              <h2 className="cta-h">
                Want to Be Our<br />
                <em>Next Success Story?</em>
              </h2>
              <p className="cta-p">
                Partner with BCC and let's build something award‑worthy together.
                From concept to completion, with precision and trust.
              </p>
            </div>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-btn-primary">
                Start Your Project →
              </Link>
              <Link to="/clients" className="cta-btn-secondary">
                View Our Clients
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}