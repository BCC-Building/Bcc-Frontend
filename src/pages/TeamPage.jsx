// src/pages/TeamPage.jsx
import { useState, useEffect, useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaLinkedinIn,
  FaEnvelope,
  FaArrowRight,
  FaArrowLeft,
  FaUser,
} from 'react-icons/fa';
import { publicAPI } from '../api/endpoints';
import { getImageUrl } from '../api/clients';

// ─── constants ────────────────────────────────────────────────────────────
const FEATURED_COUNT = 3;
const HERO_IMAGE = // (no longer used for hero, but kept for fallback if needed)
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80';

const TYPEWRITER_WORDS = ['precision', 'dedication', 'excellence'];

const DEPT_PALETTE = {
  Admin:        { bg: '#EFF6FF', accent: '#1D4ED8', dot: '#3B82F6' },
  Architecture: { bg: '#F0FDF4', accent: '#15803D', dot: '#22C55E' },
  Structure:    { bg: '#F5F3FF', accent: '#6D28D9', dot: '#8B5CF6' },
  Estimate:     { bg: '#FFFBEB', accent: '#B45309', dot: '#F59E0B' },
  Tender:       { bg: '#FFF7ED', accent: '#C2410C', dot: '#F97316' },
  Survey:       { bg: '#FDF2F8', accent: '#9D174D', dot: '#EC4899' },
  Testing:      { bg: '#ECFDF5', accent: '#065F46', dot: '#10B981' },
  Accounts:     { bg: '#FEF3C7', accent: '#92400E', dot: '#D97706' },
  HR:           { bg: '#FEF2F2', accent: '#991B1B', dot: '#EF4444' },
};
const FALLBACK_PALETTE = { bg: '#F8FAFC', accent: '#334155', dot: '#94A3B8' };

function getDeptPalette(dept) {
  return DEPT_PALETTE[dept] || FALLBACK_PALETTE;
}

function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '??';
}

// ─── skeleton card ────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '32px 24px',
        border: '1px solid #F1F5F9',
        animation: 'bccPulse 1.6s ease-in-out infinite',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#F1F5F9', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 14, background: '#F1F5F9', borderRadius: 8, width: '65%', marginBottom: 8 }} />
          <div style={{ height: 11, background: '#F1F5F9', borderRadius: 8, width: '45%' }} />
        </div>
      </div>
      <div style={{ height: 10, background: '#F1F5F9', borderRadius: 8, marginBottom: 8 }} />
      <div style={{ height: 10, background: '#F1F5F9', borderRadius: 8, width: '80%' }} />
    </div>
  );
}

// ─── team card ───────────────────────────────────────────────────────────
function TeamCard({ member, detailed, imageErrors, onImageError, index }) {
  const [bioExpanded, setBioExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-60px' });

  const palette = getDeptPalette(member.department);
  const rawBio = member.bio || '';
  const bioLines = rawBio.split('\n').filter(l => l.trim());
  const bioHtml = bioLines
    .map(l => `<p style="margin:0 0 6px 0">${l}</p>`)
    .join('');
  const BIO_LIMIT = 110;
  const isLong = rawBio.length > BIO_LIMIT;
  const shortBio = rawBio.slice(0, BIO_LIMIT) + (isLong ? '…' : '');

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        background: '#FFFFFF',
        borderRadius: '20px',
        border: hovered ? `1.5px solid ${palette.dot}` : '1.5px solid #F1F5F9',
        padding: '28px 24px',
        cursor: 'default',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow: hovered
          ? `0 16px 48px -8px ${palette.dot}22`
          : '0 1px 4px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}
    >
      {/* dept color strip */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '24px',
          right: '24px',
          height: '3px',
          borderRadius: '0 0 3px 3px',
          background: palette.dot,
          opacity: 1,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            flexShrink: 0,
            overflow: 'hidden',
            background: palette.bg,
            border: `2px solid ${palette.dot}33`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {member.profileImageUrl && !imageErrors[member.id] ? (
            <img
              src={getImageUrl(member.profileImageUrl)}
              alt={member.name}
              loading="lazy"
              onError={() => onImageError(member.id)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.1rem',
                fontWeight: 700,
                color: palette.accent,
                userSelect: 'none',
              }}
            >
              {initials(member.name)}
            </span>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '1rem',
              fontWeight: 700,
              color: '#0F172A',
              margin: '0 0 3px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {member.name}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 600,
              color: palette.accent,
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {member.designation}
          </p>
        </div>
      </div>

      {member.department && (
        <div style={{ marginBottom: '14px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.72rem',
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: palette.accent,
              background: palette.bg,
              padding: '4px 10px',
              borderRadius: '6px',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: palette.dot, flexShrink: 0 }} />
            {member.department}
          </span>
        </div>
      )}

      {detailed && (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: rawBio ? '14px' : '0' }}>
            {member.yearsOfExperience && (
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  color: '#334155',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  padding: '4px 10px',
                  borderRadius: '6px',
                }}
              >
                {member.yearsOfExperience}+ yrs
              </span>
            )}
            {member.qualifications?.map((q, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.72rem',
                  fontFamily: "'DM Sans', sans-serif",
                  color: '#475569',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  padding: '4px 10px',
                  borderRadius: '6px',
                }}
              >
                {q}
              </span>
            ))}
          </div>

          {rawBio && (
            <div
              style={{
                background: '#F8FAFC',
                borderRadius: '10px',
                padding: '12px 14px',
                marginBottom: '14px',
              }}
            >
              <div
                style={{
                  fontSize: '0.82rem',
                  lineHeight: 1.7,
                  fontFamily: "'DM Sans', sans-serif",
                  color: '#475569',
                }}
                dangerouslySetInnerHTML={{
                  __html: bioExpanded ? bioHtml : `<p style="margin:0">${shortBio}</p>`,
                }}
              />
              {isLong && (
                <button
                  onClick={() => setBioExpanded(e => !e)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: palette.accent,
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    padding: '4px 0 0',
                    display: 'block',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {bioExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          )}
        </>
      )}

      <div style={{ flex: 1 }} />

      {(member.linkedinUrl || member.email) && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            paddingTop: '14px',
            borderTop: '1px solid #F1F5F9',
            marginTop: '4px',
          }}
        >
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              style={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: hovered ? palette.bg : '#F8FAFC',
                border: `1px solid ${hovered ? palette.dot + '44' : '#E2E8F0'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: hovered ? palette.accent : '#64748B',
                fontSize: '0.8rem',
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
            >
              <FaLinkedinIn />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              style={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: hovered ? palette.bg : '#F8FAFC',
                border: `1px solid ${hovered ? palette.dot + '44' : '#E2E8F0'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: hovered ? palette.accent : '#64748B',
                fontSize: '0.8rem',
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
            >
              <FaEnvelope />
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

// ─── stat counter (horizontal style for hero) ─────────────────────────────
function StatCounter({ value, label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      style={{
        textAlign: 'left',
        padding: '0 24px 0 0',
        borderRight: index < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
        minWidth: 'auto',
        background: 'transparent',
        borderRadius: 0,
        border: 'none',
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
          fontWeight: 300,
          color: '#c8864a',
          lineHeight: 1,
          marginBottom: '5px',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '10.5px',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          lineHeight: 1.5,
          whiteSpace: 'pre-line',
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

// ─── Team Hero Illustration (SVG) ────────────────────────────────────────
function TeamIllustration() {
  return (
    <svg
      viewBox="0 0 520 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 480, height: 'auto', position: 'relative', zIndex: 1 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldGradTeam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8864a" />
          <stop offset="100%" stopColor="#e8c99a" />
        </linearGradient>
        <pattern id="gridTeam" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(200,134,74,0.08)" strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect width="520" height="600" fill="url(#gridTeam)" />

      {/* Central hub / network */}
      <circle cx="260" cy="280" r="120" fill="none" stroke="rgba(200,134,74,0.15)" strokeWidth="1" />
      <circle cx="260" cy="280" r="90" fill="none" stroke="rgba(200,134,74,0.3)" strokeWidth="1.2" strokeDasharray="6,4" />
      <circle cx="260" cy="280" r="60" fill="none" stroke="rgba(200,134,74,0.5)" strokeWidth="1.5" />
      
      {/* Center hub */}
      <circle cx="260" cy="280" r="20" fill="rgba(200,134,74,0.1)" stroke="url(#goldGradTeam)" strokeWidth="1.8" />
      <circle cx="260" cy="280" r="8" fill="#c8864a" />

      {/* People nodes around the hub */}
      {[
        { x: 260, y: 140, label: 'Arch' },
        { x: 380, y: 200, label: 'Eng' },
        { x: 400, y: 320, label: 'Srvy' },
        { x: 340, y: 420, label: 'Test' },
        { x: 180, y: 420, label: 'Est' },
        { x: 100, y: 320, label: 'HR' },
        { x: 80, y: 200, label: 'Adm' },
        { x: 200, y: 130, label: 'Tend' },
      ].map((node, i) => (
        <g key={i} transform={`translate(${node.x}, ${node.y})`}>
          <circle cx="0" cy="0" r="14" fill="rgba(18,16,14,0.7)" stroke="rgba(200,134,74,0.6)" strokeWidth="1" />
          <circle cx="0" cy="0" r="6" fill="none" stroke="#c8864a" strokeWidth="1" />
          <text x="0" y="-18" textAnchor="middle" fill="rgba(200,134,74,0.5)" fontSize="6.5" fontFamily="'Jost',sans-serif" fontWeight="500">{node.label}</text>
        </g>
      ))}

      {/* Connecting lines */}
      {[
        [260,280, 260,140],
        [260,280, 380,200],
        [260,280, 400,320],
        [260,280, 340,420],
        [260,280, 180,420],
        [260,280, 100,320],
        [260,280, 80,200],
        [260,280, 200,130],
      ].map((line, i) => (
        <line key={i} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} stroke="rgba(200,134,74,0.15)" strokeWidth="0.8" strokeDasharray="4,4" />
      ))}

      {/* Floating badge */}
      <g transform="translate(30, 50)">
        <rect width="110" height="70" rx="3" fill="rgba(18,16,14,0.65)" stroke="rgba(200,134,74,0.5)" strokeWidth="0.8" />
        <text x="55" y="22" textAnchor="middle" fill="#e8c99a" fontSize="8" fontFamily="'Jost',sans-serif" letterSpacing="1" fontWeight="500">TEAM</text>
        <text x="55" y="46" textAnchor="middle" fill="#c8864a" fontSize="26" fontFamily="'Cormorant Garamond',serif" fontWeight="300">40+</text>
        <text x="55" y="60" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="'Jost',sans-serif">Professionals</text>
      </g>

      {/* Bottom label */}
      <text x="260" y="520" textAnchor="middle" fill="rgba(200,134,74,0.6)" fontSize="8" fontFamily="'Jost',sans-serif" letterSpacing="2.5" fontWeight="400">BUILDING CREATORS & CONSULTING</text>
      <text x="260" y="538" textAnchor="middle" fill="rgba(200,134,74,0.35)" fontSize="6.5" fontFamily="'Jost',sans-serif" letterSpacing="1.5">EST. 2010</text>
    </svg>
  );
}

// ─── main component ───────────────────────────────────────────────────────
export default function TeamPage({ featured = false }) {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [activeFilter, setActiveFilter] = useState('All');

  // typewriter state
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getActiveTeamMembers();
        if (response.data?.success) {
          const data = response.data.data || [];
          setTeamMembers(featured ? data.slice(0, FEATURED_COUNT) : data);
        } else throw new Error('Unable to load team');
      } catch (err) {
        console.error(err);
        setError('Failed to load team members.');
      } finally {
        setLoading(false);
      }
    })();
  }, [featured]);

  // typewriter effect
  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[wordIdx];
    if (charIdx < currentWord.length) {
      const timer = setTimeout(() => setCharIdx(prev => prev + 1), 90);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCharIdx(0);
        setWordIdx(prev => (prev + 1) % TYPEWRITER_WORDS.length);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [charIdx, wordIdx]);

  const handleImageError = id => setImageErrors(prev => ({ ...prev, [id]: true }));

  const departments = useMemo(
    () => ['All', ...new Set(teamMembers.map(m => m.department).filter(Boolean))],
    [teamMembers]
  );

  const filtered =
    activeFilter === 'All'
      ? teamMembers
      : teamMembers.filter(m => m.department === activeFilter);

  const STATS = [
    { value: '40+', label: 'Professionals' },
    { value: '1200+', label: 'Projects' },
    { value: '9', label: 'Departments' },
    { value: '98%', label: 'Satisfaction' },
  ];

  return (
    <>
      {/* ═══ FONTS & ANIMATIONS ═══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@500;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes bccPulse {
          0%, 100% { opacity: 1 }
          50% { opacity: 0.45 }
        }

        .bcc-filter-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 6px 16px;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          color: #64748B;
          cursor: pointer;
          transition: all 0.18s ease;
          letter-spacing: 0.01em;
        }
        .bcc-filter-btn:hover {
          border-color: #CBD5E1;
          color: #0F172A;
          background: #F8FAFC;
        }
        .bcc-filter-btn.active {
          background: #0F172A;
          border-color: #0F172A;
          color: #FFFFFF;
        }

        .bcc-retry-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 10px;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          color: #334155;
          cursor: pointer;
          margin-top: 12px;
          transition: all 0.18s ease;
        }
        .bcc-retry-btn:hover { background: #F8FAFC; }

        .bcc-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 12px 28px;
          background: #c8864a;
          color: #12100e;
          text-decoration: none;
          border-radius: 4px;
          transition: background 0.3s, transform 0.3s;
        }
        .bcc-cta-link:hover {
          background: #e8c99a;
          transform: translateY(-2px);
          color: #12100e;
        }

        .arrow-icon { transition: transform 0.2s ease; }
        .bcc-cta-link:hover .arrow-icon { transform: translateX(4px); }

        .bcc-back-link-hero {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.18s;
        }
        .bcc-back-link-hero:hover { color: #c8864a; }

        @media (max-width: 640px) {
          .bcc-stats-row { gap: 12px !important; }
          .bcc-stats-row > div { padding-right: 12px !important; }
          .bcc-team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ═══ SEO ═══ */}
      {!featured && (
        <Helmet>
          <title>Our Team | Expert Engineers & Consultants | BCC</title>
          <meta
            name="description"
            content="Meet the dedicated team of engineers, consultants and innovators at BCC. 50+ professionals with expertise in construction, design, and project management."
          />
          <meta
            name="keywords"
            content="BCC team, construction engineers, structural engineers, project managers, consultants, architects"
          />
          <link rel="canonical" href="https://bcc.net.in/team" />
          <meta property="og:title" content="Our Expert Team | BCC Consulting" />
          <meta property="og:description" content="Meet the professionals behind BCC's success." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://bcc.net.in/team" />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
      )}

      {/* ═══ HERO (ink & gold) ═══ */}
      <section
        aria-label={featured ? 'Featured team members' : 'Our team'}
        style={{
          position: 'relative',
          background: '#12100e',
          minHeight: featured ? 'auto' : '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Left Column */}
        <div style={{ padding: '7rem 4rem 7rem 5rem', position: 'relative', zIndex: 2 }}>
          {/* Back link */}
          {!featured && (
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: '40px' }}
            >
              <Link to="/about" className="bcc-back-link-hero">
                <FaArrowLeft style={{ fontSize: '0.7rem' }} />
                Back to About
              </Link>
            </motion.div>
          )}

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: "'Jost', sans-serif",
              fontSize: '10.5px',
              fontWeight: 500,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#e8c99a',
              marginBottom: '2rem',
            }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: '#c8864a' }}></span>
              Our People
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1.06,
              color: '#FFFFFF',
              margin: '0 0 1.5rem',
              letterSpacing: '-0.01em',
            }}
          >
            {featured ? 'Meet our core team' : 'The experts behind every project'}
          </motion.h1>

          {/* Description with typewriter */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: 1.85,
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '460px',
              margin: '0 0 2.5rem',
            }}
          >
            A team of engineers, architects, and consultants who bring{' '}
            <strong style={{ color: '#c8864a', fontWeight: 400, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
              {TYPEWRITER_WORDS[wordIdx].substring(0, charIdx)}
              <span style={{ color: '#e8c99a', fontWeight: 300 }}>|</span>
            </strong>{' '}
            to every project we take on.
          </motion.p>

          {/* Stats row (horizontal) */}
          {!featured && (
            <motion.div
              className="bcc-stats-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 0,
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '2.5rem',
                maxWidth: '480px',
              }}
            >
              {STATS.map((s, i) => (
                <StatCounter key={i} {...s} index={i} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Right Column – Illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 3rem',
            borderLeft: '1px solid rgba(200,134,74,0.2)',
          }}
          aria-hidden="true"
        >
          <TeamIllustration />
        </motion.div>
      </section>

      {/* ═══ REST OF PAGE (white bg) ═══ */}
      <section
        style={{
          background: '#FAFAFA',
          padding: featured ? '40px 0' : '60px 0',
        }}
      >
        {/* dot‑grid texture */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            backgroundImage: 'radial-gradient(circle, #E2E8F0 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: 0.55,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
          {/* ── FILTERS ── */}
          {!featured && !loading && !error && teamMembers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}
              role="group"
              aria-label="Filter by department"
            >
              {departments.map(dept => (
                <button
                  key={dept}
                  className={`bcc-filter-btn${activeFilter === dept ? ' active' : ''}`}
                  onClick={() => setActiveFilter(dept)}
                >
                  {dept}
                </button>
              ))}
            </motion.div>
          )}

          {/* ── LOADING ── */}
          {loading && (
            <div className="bcc-team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {Array.from({ length: featured ? 3 : 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* ── ERROR / EMPTY ── */}
          {!loading && error && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚠️</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>Could not load team</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem' }}>{error}</p>
              <button className="bcc-retry-btn" onClick={() => window.location.reload()}>Try again</button>
            </div>
          )}

          {!loading && !error && teamMembers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>👥</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>No team members yet</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem' }}>Our team page is being updated.</p>
            </div>
          )}

          {/* ── GRID ── */}
          {!loading && !error && filtered.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bcc-team-grid"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}
              >
                {filtered.map((member, i) => (
                  <TeamCard key={member.id || i} member={member} detailed={!featured} imageErrors={imageErrors} onImageError={handleImageError} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* ── CTA (full page) ── */}
          {!featured && !loading && teamMembers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              style={{ textAlign: 'center', marginTop: '48px' }}
            >
              <Link to="/contact" className="bcc-cta-link">
                Start your project <FaArrowRight className="arrow-icon" style={{ fontSize: '0.7rem' }} />
              </Link>
            </motion.div>
          )}

          {/* ── CTA (featured mode) ── */}
          {featured && !loading && teamMembers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              style={{ textAlign: 'center', marginTop: '48px', position: 'relative', zIndex: 2 }}
            >
              <Link to="/team" className="bcc-cta-link">
                Meet the full team <FaArrowRight className="arrow-icon" style={{ fontSize: '0.7rem' }} />
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}