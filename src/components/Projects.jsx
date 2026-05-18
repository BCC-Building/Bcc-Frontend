// src/components/Projects.jsx
// Production-Ready | Big Company Format | BCC Construction & Consulting
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { publicAPI } from '../api/endpoints';
import { getImageUrl } from '../api/clients';

// ─── constants ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { value: 'all',            label: 'All Projects' },
  { value: 'Residential',   label: 'Residential'  },
  { value: 'Commercial',    label: 'Commercial'   },
  { value: 'Industrial',    label: 'Industrial'   },
  { value: 'Infrastructure',label: 'Infrastructure'},
  { value: 'Renovation',    label: 'Renovation'   },
  { value: 'Interior',      label: 'Interior'     },
];

const STATUS = [
  { value: 'all',       label: 'All'       },
  { value: 'Ongoing',   label: 'Ongoing'   },
  { value: 'Completed', label: 'Completed' },
  { value: 'Upcoming',  label: 'Upcoming'  },
];

const PER_PAGE = 9;
const FALLBACK = 'https://placehold.co/800x600/1a1a2e/ffffff?text=BCC+Project';

const TRUST_BADGES = [
  "1200+ Projects Delivered",
  "98% Client Satisfaction",
  "09+ Years Experience",
];

// ─── status pill (unchanged) ──────────────────────────────────────────────────
const StatusPill = ({ status }) => {
  const map = {
    Ongoing:   { bg: '#dbeafe', color: '#1d4ed8' },
    Completed: { bg: '#dcfce7', color: '#15803d' },
    Upcoming:  { bg: '#fef9c3', color: '#854d0e' },
  };
  const s = map[status] || { bg: '#f1f5f9', color: '#475569' };
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '.4px',
      textTransform: 'uppercase',
      background: s.bg,
      color: s.color,
    }}>{status}</span>
  );
};

// ─── skeleton (unchanged) ─────────────────────────────────────────────────────
const Skeleton = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 24 }}>
    {[...Array(6)].map((_, i) => (
      <div key={i} style={{
        borderRadius: 16, overflow: 'hidden',
        background: '#f1f5f9', animation: 'bcc-pulse 1.5s ease-in-out infinite',
        animationDelay: `${i * 0.1}s`,
      }}>
        <div style={{ height: 220, background: '#e2e8f0' }} />
        <div style={{ padding: 20 }}>
          <div style={{ height: 16, background: '#e2e8f0', borderRadius: 6, marginBottom: 10, width: '70%' }} />
          <div style={{ height: 12, background: '#e2e8f0', borderRadius: 6, width: '45%' }} />
        </div>
      </div>
    ))}
  </div>
);

// ─── project card (unchanged) ─────────────────────────────────────────────────
const ProjectCard = ({ project, onClick, index }) => {
  const [imgSrc, setImgSrc]   = useState(getImageUrl(project.coverImageUrl) || FALLBACK);
  const [hovered, setHovered] = useState(false);
  const year = project.completionDate
    ? new Date(project.completionDate).getFullYear()
    : project.startDate
      ? new Date(project.startDate).getFullYear()
      : null;

  return (
    <div
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        background: '#fff',
        border: '1px solid #e8ecf0',
        cursor: 'pointer',
        transition: 'transform .28s ease, box-shadow .28s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 48px rgba(0,0,0,.13)'
          : '0 2px 12px rgba(0,0,0,.06)',
        animationDelay: `${index * 0.06}s`,
        animationFillMode: 'both',
        animation: 'bcc-fadeup .5s ease',
      }}
    >
      {/* image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
        <img
          src={imgSrc}
          alt={project.title}
          onError={() => setImgSrc(FALLBACK)}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform .45s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        {/* overlay on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,15,30,.7) 0%, transparent 55%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity .28s ease',
          display: 'flex', alignItems: 'flex-end',
          padding: '16px 18px',
        }}>
          <span style={{
            color: '#fff', fontSize: 13, fontWeight: 600,
            letterSpacing: '.3px', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            View Case Study
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
        {/* type tag top-left */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(255,255,255,.92)',
          backdropFilter: 'blur(6px)',
          padding: '4px 10px',
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 700,
          color: '#0f172a',
          letterSpacing: '.4px',
          textTransform: 'uppercase',
        }}>{project.projectType || 'Project'}</div>
        {/* status top-right */}
        {project.status && (
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <StatusPill status={project.status} />
          </div>
        )}
      </div>

      {/* body */}
      <div style={{ padding: '18px 20px 20px' }}>
        <h3 style={{
          margin: '0 0 8px', fontSize: 16, fontWeight: 700,
          color: '#0f172a', lineHeight: 1.35,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{project.title}</h3>

        {/* meta row */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 10 }}>
          {(project.location || project.clientName) && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              {project.location || project.clientName}
            </span>
          )}
          {year && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              {year}
            </span>
          )}
        </div>

        <p style={{
          margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.6,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {project.description || 'Professional construction project delivered with quality and precision.'}
        </p>

        {/* bottom accent line */}
        <div style={{
          marginTop: 16,
          height: 2,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #2563eb, #0ea5e9)',
          width: hovered ? '100%' : '32px',
          transition: 'width .35s ease',
        }} />
      </div>
    </div>
  );
};

// ─── project modal (FIXED z‑index) ───────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgErrors, setImgErrors]  = useState({});

  const allImages = (() => {
    const imgs = [];
    if (project.coverImageUrl) imgs.push(getImageUrl(project.coverImageUrl));
    (project.imageUrls || []).forEach(u => { const g = getImageUrl(u); if (g && !imgs.includes(g)) imgs.push(g); });
    return imgs.length ? imgs : [FALLBACK];
  })();

  const stageLabels = ['Cover', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'];

  useEffect(() => {
    const esc = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [onClose]);

  const year = project.completionDate
    ? new Date(project.completionDate).getFullYear()
    : null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,   // ← 1000 → 10000, ab navbar (9000) ke upar
        background: 'rgba(5,10,20,.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        animation: 'bcc-fadein .2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 20,
          width: '100%',
          maxWidth: 900,
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          animation: 'bcc-slideup .28s ease',
        }}
      >
        {/* close */}
        <button
          onClick={onClose}
          style={{
            position: 'sticky', top: 12, left: '100%', zIndex: 10,
            float: 'right',
            marginRight: 12,
            width: 36, height: 36,
            borderRadius: '50%',
            border: '1px solid #e2e8f0',
            background: '#fff',
            fontSize: 18, cursor: 'pointer', color: '#475569',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            lineHeight: 1,
          }}
        >×</button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 460 }}>
          {/* gallery side */}
          <div style={{ background: '#f8fafc', padding: 24, borderRadius: '20px 0 0 20px' }}>
            <div style={{
              borderRadius: 12, overflow: 'hidden',
              height: 280, marginBottom: 12,
            }}>
              <img
                src={imgErrors[activeIdx] ? FALLBACK : allImages[activeIdx]}
                alt={`${project.title} - ${stageLabels[activeIdx] || ''}`}
                onError={() => setImgErrors(p => ({ ...p, [activeIdx]: true }))}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {/* thumbnails */}
            {allImages.length > 1 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    style={{
                      width: 60, height: 45,
                      borderRadius: 8, overflow: 'hidden',
                      border: idx === activeIdx ? '2px solid #2563eb' : '2px solid transparent',
                      cursor: 'pointer', padding: 0, background: 'none',
                      transition: 'border-color .2s',
                    }}
                  >
                    <img
                      src={imgErrors[idx] ? FALLBACK : img}
                      alt={`thumb-${idx}`}
                      onError={() => setImgErrors(p => ({ ...p, [idx]: true }))}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* info side */}
          <div style={{ padding: '28px 28px 28px 24px' }}>
            {/* type + status */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              {project.projectType && (
                <span style={{
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '.5px', color: '#2563eb',
                  background: '#eff6ff', padding: '3px 10px', borderRadius: 20,
                }}>{project.projectType}</span>
              )}
              {project.status && <StatusPill status={project.status} />}
            </div>

            <h2 style={{ margin: '0 0 14px', fontSize: 22, fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>
              {project.title}
            </h2>

            {/* meta grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '10px 16px', marginBottom: 18,
              padding: '14px 16px',
              background: '#f8fafc', borderRadius: 10,
            }}>
              {project.clientName && <MetaItem label="Client" value={project.clientName} />}
              {project.location   && <MetaItem label="Location" value={project.location} />}
              {project.startDate  && <MetaItem label="Start" value={new Date(project.startDate).toLocaleDateString('en-IN',{month:'short',year:'numeric'})} />}
              {project.completionDate && <MetaItem label="Completed" value={new Date(project.completionDate).toLocaleDateString('en-IN',{month:'short',year:'numeric'})} />}
            </div>

            {project.description && (
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, margin: '0 0 16px' }}>
                {project.description}
              </p>
            )}

            {project.testimonial && (
              <blockquote style={{
                margin: '0 0 18px',
                padding: '12px 16px',
                borderLeft: '3px solid #2563eb',
                background: '#f0f7ff',
                borderRadius: '0 8px 8px 0',
                fontStyle: 'italic',
                fontSize: 13,
                color: '#334155',
                lineHeight: 1.65,
              }}>
                "{project.testimonial}"
                {project.clientName && (
                  <footer style={{ marginTop: 6, fontStyle: 'normal', fontWeight: 700, fontSize: 12, color: '#2563eb' }}>
                    — {project.clientName}
                  </footer>
                )}
              </blockquote>
            )}

            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg,#2563eb,#0ea5e9)',
                color: '#fff',
                padding: '11px 22px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: 'none',
                transition: 'opacity .2s',
              }}
              onClick={onClose}
            >
              Start a Similar Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetaItem = ({ label, value }) => (
  <div>
    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: '#94a3b8', marginBottom: 2 }}>{label}</div>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{value}</div>
  </div>
);

// ─── Hero illustration (unchanged) ──────────────────────────────────────────
const ProjectsIllustration = () => (
  <svg
    viewBox="0 0 520 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', maxWidth: 480, height: 'auto' }}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="goldGradProjects" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c8864a" />
        <stop offset="100%" stopColor="#e8c99a" />
      </linearGradient>
      <pattern id="gridProjects" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(200,134,74,0.08)" strokeWidth="0.5" />
      </pattern>
    </defs>

    <rect width="520" height="600" fill="url(#gridProjects)" />

    {/* Central blueprint / building */}
    <rect x="160" y="80" width="200" height="400" rx="4" fill="rgba(200,134,74,0.04)" stroke="rgba(200,134,74,0.4)" strokeWidth="1.5" />
    {/* Floors */}
    {[120,160,200,240,280,320,360,400,440].map((y, i) => (
      <line key={i} x1="160" y1={y} x2="360" y2={y} stroke="rgba(200,134,74,0.25)" strokeWidth="0.6" />
    ))}
    {/* Vertical structure */}
    <line x1="260" y1="80" x2="260" y2="480" stroke="rgba(200,134,74,0.3)" strokeWidth="0.8" strokeDasharray="6,4" />
    <line x1="210" y1="120" x2="210" y2="440" stroke="rgba(200,134,74,0.2)" strokeWidth="0.5" />
    <line x1="310" y1="120" x2="310" y2="440" stroke="rgba(200,134,74,0.2)" strokeWidth="0.5" />

    {/* Roof */}
    <polygon points="160,80 260,30 360,80" fill="none" stroke="rgba(200,134,74,0.5)" strokeWidth="1.2" />
    <line x1="260" y1="30" x2="260" y2="50" stroke="url(#goldGradProjects)" strokeWidth="1.8" />
    <circle cx="260" cy="26" r="5" fill="none" stroke="#c8864a" strokeWidth="1.5" />
    <circle cx="260" cy="26" r="2.5" fill="#c8864a" />

    {/* Ground line */}
    <line x1="100" y1="480" x2="420" y2="480" stroke="rgba(200,134,74,0.5)" strokeWidth="1.2" />

    {/* Floating cards */}
    <g transform="translate(30, 50)">
      <rect width="100" height="70" rx="3" fill="rgba(18,16,14,0.7)" stroke="rgba(200,134,74,0.5)" strokeWidth="0.8" />
      <text x="50" y="22" textAnchor="middle" fill="#e8c99a" fontSize="8" fontFamily="'Jost',sans-serif" letterSpacing="1" fontWeight="500">PROJECTS</text>
      <text x="50" y="48" textAnchor="middle" fill="#c8864a" fontSize="24" fontFamily="'Cormorant Garamond',serif" fontWeight="300">250+</text>
      <text x="50" y="62" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="'Jost',sans-serif">Completed</text>
    </g>

    <g transform="translate(380, 100)">
      <rect width="110" height="75" rx="3" fill="rgba(18,16,14,0.7)" stroke="rgba(200,134,74,0.4)" strokeWidth="0.8" />
      <circle cx="55" cy="32" r="14" fill="none" stroke="url(#goldGradProjects)" strokeWidth="1.2" />
      <text x="55" y="36" textAnchor="middle" fill="#c8864a" fontSize="9" fontFamily="'Jost',sans-serif" fontWeight="600">✓</text>
      <text x="55" y="14" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="'Jost',sans-serif" letterSpacing="1">CERTIFIED</text>
      <text x="55" y="58" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="'Jost',sans-serif">ISO 9001</text>
      <text x="55" y="69" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="'Jost',sans-serif">Quality Assured</text>
    </g>

    <circle cx="130" cy="85" r="3" fill="rgba(200,134,74,0.7)" />
    <circle cx="490" cy="137" r="3" fill="rgba(200,134,74,0.7)" />
    <line x1="130" y1="85" x2="160" y2="115" stroke="rgba(200,134,74,0.25)" strokeWidth="0.6" strokeDasharray="3,4" />
    <line x1="490" y1="137" x2="460" y2="155" stroke="rgba(200,134,74,0.25)" strokeWidth="0.6" strokeDasharray="3,4" />

    {/* Bottom label */}
    <text x="260" y="520" textAnchor="middle" fill="rgba(200,134,74,0.6)" fontSize="8" fontFamily="'Jost',sans-serif" letterSpacing="2.5" fontWeight="400">PROJECT PORTFOLIO</text>
    <text x="260" y="538" textAnchor="middle" fill="rgba(200,134,74,0.35)" fontSize="6.5" fontFamily="'Jost',sans-serif" letterSpacing="1.5">BUILDING CREATORS & CONSULTING</text>
  </svg>
);

// ─── main Projects component ──────────────────────────────────────────────────
export default function Projects() {
  const [projects,    setProjects]    = useState([]);
  const [isLoading,   setIsLoading]   = useState(true);
  const [apiError,    setApiError]    = useState(null);
  const [filter,      setFilter]      = useState('all');
  const [statusFilter,setStatusFilter]= useState('all');
  const [search,      setSearch]      = useState('');
  const [page,        setPage]        = useState(1);
  const [selected,    setSelected]    = useState(null);
  const gridRef = useRef(null);

  // fetch
  useEffect(() => {
    (async () => {
      setIsLoading(true); setApiError(null);
      try {
        const res = await publicAPI.getProjects();
        if (res.data?.success) setProjects(res.data.data || []);
        else throw new Error(res.data?.message || 'Failed');
      } catch (e) {
        console.error(e);
        setApiError('Failed to load projects. Please try again.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // reset page on filter change
  useEffect(() => { setPage(1); }, [filter, statusFilter, search]);

  // filtered list
  const filtered = projects.filter(p => {
    const cat    = filter       === 'all' || p.projectType === filter;
    const stat   = statusFilter === 'all' || p.status      === statusFilter;
    const srch   = !search || p.title?.toLowerCase().includes(search.toLowerCase())
                           || p.location?.toLowerCase().includes(search.toLowerCase())
                           || p.clientName?.toLowerCase().includes(search.toLowerCase());
    return cat && stat && srch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const current    = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // live stats from API data
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const ongoingProjects = projects.filter(p => p.status === 'Ongoing').length;

  const HERO_STATS = [
    { value: `${totalProjects}+`, label: "Total\nProjects" },
    { value: `${completedProjects}+`, label: "Completed" },
    { value: `${ongoingProjects}+`, label: "In Progress" },
  ];

  // Inline styles for the new hero (scoped to avoid clashes)
  const heroStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
    
    .projects-hero-wrapper {
      position: relative;
      background: #12100e;
      overflow: hidden;
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }

    .projects-hero-left {
      padding: 7rem 4rem 7rem 5rem;
      position: relative;
      z-index: 2;
    }

    .projects-hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: 'Jost', sans-serif;
      font-size: 10.5px;
      font-weight: 500;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: #e8c99a;
      margin-bottom: 2rem;
    }
    .projects-hero-eyebrow::before {
      content: '';
      display: block;
      width: 32px;
      height: 1px;
      background: #c8864a;
    }

    .projects-hero-h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(3rem, 5.5vw, 5.5rem);
      font-weight: 400;
      line-height: 1.06;
      color: #ffffff;
      margin: 0 0 1.5rem;
      letter-spacing: -0.01em;
    }
    .projects-hero-h1 em {
      font-style: italic;
      color: #c8864a;
    }

    .projects-hero-desc {
      font-family: 'Jost', sans-serif;
      font-size: 16px;
      font-weight: 300;
      line-height: 1.85;
      color: rgba(255,255,255,0.5);
      max-width: 460px;
      margin: 0 0 2.5rem;
    }
    .projects-hero-desc strong {
      color: rgba(255,255,255,0.85);
      font-weight: 400;
    }

    .projects-hero-ctas {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 3rem;
    }

    .projects-btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      font-family: 'Jost', sans-serif;
      font-size: 11.5px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #12100e;
      background: #c8864a;
      text-decoration: none;
      padding: 16px 36px;
      transition: background 0.3s, transform 0.3s;
      white-space: nowrap;
    }
    .projects-btn-primary:hover {
      background: #e8c99a;
      transform: translateY(-2px);
    }

    .projects-btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      font-family: 'Jost', sans-serif;
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
    .projects-btn-secondary:hover {
      border-color: rgba(255,255,255,0.4);
      color: #ffffff;
    }

    .projects-hero-trust {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
    }
    .projects-hero-trust-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(255,255,255,0.45);
      font-size: 12px;
      font-weight: 500;
    }
    .projects-hero-trust-item svg {
      color: #c8864a;
    }

    .projects-hero-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 2.5rem;
      max-width: 480px;
      margin-top: 2rem;
    }
    .projects-hero-stat {
      padding-right: 24px;
      border-right: 1px solid rgba(255,255,255,0.1);
    }
    .projects-hero-stat:last-child {
      border-right: none;
    }
    .projects-hero-stat-val {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1.8rem, 3vw, 2.6rem);
      font-weight: 300;
      line-height: 1;
      color: #c8864a;
      display: block;
    }
    .projects-hero-stat-lbl {
      font-family: 'Jost', sans-serif;
      font-size: 10.5px;
      font-weight: 300;
      color: rgba(255,255,255,0.4);
      display: block;
      margin-top: 5px;
      line-height: 1.5;
      white-space: pre-line;
    }

    .projects-hero-right {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 3rem;
    }
    .projects-hero-right::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(200,134,74,0.06) 0%, rgba(200,134,74,0.02) 100%);
      border-left: 1px solid rgba(200,134,74,0.2);
    }

    @media (max-width: 900px) {
      .projects-hero-wrapper {
        grid-template-columns: 1fr;
        min-height: auto;
      }
      .projects-hero-left {
        padding: 5rem 1.5rem 3rem;
      }
      .projects-hero-right {
        height: auto;
        min-height: 50vh;
        padding: 2rem 1.5rem;
        border-left: none;
        border-top: 1px solid rgba(200,134,74,0.15);
      }
      .projects-hero-right::before {
        border-left: none;
        border-top: 1px solid rgba(200,134,74,0.1);
      }
    }
  `;

  return (
    <>
      <style>{heroStyles}</style>

      {/* ── HERO (INK & GOLD) ── */}
      <section className="projects-hero-wrapper" aria-label="Projects hero">
        <div className="projects-hero-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="projects-hero-eyebrow">Our Portfolio</p>
          </motion.div>

          <motion.h1
            className="projects-hero-h1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Projects That Define{" "}
            <em>Excellence</em>
          </motion.h1>

          <motion.p
            className="projects-hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            From concept to completion — explore our portfolio of landmark projects spanning <strong>residential, commercial, and infrastructure sectors</strong>.
          </motion.p>

          <motion.div
            className="projects-hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Link to="/contact" className="projects-btn-primary">
              Start Your Project <FaArrowRight />
            </Link>
            <Link to="/services" className="projects-btn-secondary">
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            className="projects-hero-trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {TRUST_BADGES.map((badge, i) => (
              <span key={i} className="projects-hero-trust-item">
                <FaCheckCircle /> {badge}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="projects-hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {HERO_STATS.map((s, i) => (
              <div className="projects-hero-stat" key={i}>
                <span className="projects-hero-stat-val">{s.value}</span>
                <span className="projects-hero-stat-lbl">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="projects-hero-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          aria-hidden="true"
        >
          <ProjectsIllustration />
        </motion.div>
      </section>

      {/* ── FILTERS + SEARCH ── */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e8ecf0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container" style={{ padding: '16px 0' }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* category pills */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {CATEGORIES.map(c => (
                <button key={c.value} onClick={() => setFilter(c.value)} style={{
                  padding: '7px 16px',
                  borderRadius: 30,
                  border: filter === c.value ? 'none' : '1px solid #e2e8f0',
                  background: filter === c.value
                    ? 'linear-gradient(135deg,#2563eb,#0ea5e9)'
                    : '#fff',
                  color: filter === c.value ? '#fff' : '#475569',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  transition: 'all .2s',
                  whiteSpace: 'nowrap',
                }}>
                  {c.label}
                </button>
              ))}
            </div>

            {/* right: status + search */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  fontSize: 13, color: '#475569', cursor: 'pointer',
                  background: '#fff',
                }}
              >
                {STATUS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>

              <div style={{ position: 'relative' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    paddingLeft: 32, paddingRight: 14, paddingTop: 8, paddingBottom: 8,
                    borderRadius: 8, border: '1px solid #e2e8f0',
                    fontSize: 13, width: 190, color: '#0f172a',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section style={{ background: '#f8fafc', padding: '48px 0 64px' }}>
        <div className="container" ref={gridRef}>
          {/* result count */}
          {!isLoading && !apiError && (
            <div style={{ marginBottom: 24, color: '#64748b', fontSize: 14 }}>
              Showing <strong style={{ color: '#0f172a' }}>{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
              {filter !== 'all' || statusFilter !== 'all' || search
                ? ' — matching your filters'
                : ''}
            </div>
          )}

          {/* states */}
          {isLoading && <Skeleton />}

          {!isLoading && apiError && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
              <h3 style={{ color: '#0f172a', marginBottom: 8 }}>Failed to Load</h3>
              <p style={{ color: '#64748b', marginBottom: 20 }}>{apiError}</p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '10px 24px', borderRadius: 8,
                  background: '#2563eb', color: '#fff',
                  border: 'none', fontWeight: 700, cursor: 'pointer',
                }}
              >Try Again</button>
            </div>
          )}

          {!isLoading && !apiError && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📂</div>
              <h3 style={{ color: '#0f172a', marginBottom: 8 }}>No Projects Found</h3>
              <p style={{ color: '#64748b', marginBottom: 20 }}>Try adjusting your filters or search term.</p>
              <button
                onClick={() => { setFilter('all'); setStatusFilter('all'); setSearch(''); }}
                style={{
                  padding: '10px 24px', borderRadius: 8,
                  background: '#2563eb', color: '#fff',
                  border: 'none', fontWeight: 700, cursor: 'pointer',
                }}
              >Clear Filters</button>
            </div>
          )}

          {!isLoading && !apiError && current.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}>
              {current.map((p, i) => (
                <ProjectCard key={p.id} project={p} onClick={setSelected} index={i} />
              ))}
            </div>
          )}

          {/* pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 48 }}>
              <button
                onClick={() => { setPage(p => Math.max(p - 1, 1)); gridRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                disabled={page === 1}
                style={pgBtnStyle(page === 1)}
              >← Prev</button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPage(i + 1); gridRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{
                    width: 38, height: 38, borderRadius: 8,
                    border: page === i + 1 ? 'none' : '1px solid #e2e8f0',
                    background: page === i + 1 ? 'linear-gradient(135deg,#2563eb,#0ea5e9)' : '#fff',
                    color: page === i + 1 ? '#fff' : '#475569',
                    fontWeight: 700, fontSize: 14, cursor: 'pointer',
                  }}
                >{i + 1}</button>
              ))}

              <button
                onClick={() => { setPage(p => Math.min(p + 1, totalPages)); gridRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                disabled={page === totalPages}
                style={pgBtnStyle(page === totalPages)}
              >Next →</button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: 'linear-gradient(135deg,#0a0f1e,#0d1b3e)',
        padding: '80px 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, marginBottom: 14 }}>
            Have a Project in Mind?
          </h2>
          <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1.05rem', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Let's discuss how we can bring your vision to life with the same quality and precision you see in our portfolio.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'linear-gradient(135deg,#2563eb,#0ea5e9)',
              color: '#fff', padding: '14px 32px',
              borderRadius: 12, fontWeight: 700, fontSize: 15,
              textDecoration: 'none', letterSpacing: '.2px',
            }}
          >
            Start Your Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ── MODAL ── */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

      {/* ── STYLES ── */}
      <style>{`
        @keyframes bcc-fadeup {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes bcc-fadein {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes bcc-slideup {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes bcc-pulse {
          0%,100% { opacity: 1; } 50% { opacity: .5; }
        }
        @media(max-width: 640px) {
          .bcc-modal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

const pgBtnStyle = (disabled) => ({
  padding: '8px 16px', borderRadius: 8,
  border: '1px solid #e2e8f0',
  background: '#fff',
  color: disabled ? '#cbd5e1' : '#475569',
  fontWeight: 700, fontSize: 13,
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? .5 : 1,
});