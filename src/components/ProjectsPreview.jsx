
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicAPI } from '../api/endpoints';
import { getImageUrl } from '../api/clients';

const FALLBACK = 'https://placehold.co/800x600/1a1a2e/ffffff?text=BCC+Project';

const StatusColors = {
  Completed: { bg: '#dcfce7', color: '#15803d' },
  Ongoing:   { bg: '#dbeafe', color: '#1d4ed8' },
  Upcoming:  { bg: '#fef9c3', color: '#854d0e' },
};

export default function ProjectsPreview() {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await publicAPI.getProjects();
        if (res.data?.success) {
          setProjects((res.data.data || []).slice(0, 3));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                height: 340, borderRadius: 16, background: '#e2e8f0',
                animation: 'bcc-pulse 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }} />
            ))}
          </div>
        </div>
        <style>{`@keyframes bcc-pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section style={{ padding: '80px 0', background: '#f8fafc' }}>
      <div className="container">
        {/* header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#eff6ff', border: '1px solid #bfdbfe',
              padding: '4px 14px', borderRadius: 30,
              marginBottom: 12,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563eb', display: 'inline-block' }} />
              <span style={{ color: '#1d4ed8', fontSize: 11, fontWeight: 700, letterSpacing: '.6px', textTransform: 'uppercase' }}>
                Our Portfolio
              </span>
            </div>
            <h2 style={{ margin: 0, fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
              The Proof Is in the Projects
            </h2>
            <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: '1rem', maxWidth: 440 }}>
    Proof of precision, passion, and partnership.
  </p>
          </div>
          <Link
            to="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 22px', borderRadius: 10,
              border: '2px solid #2563eb',
              color: '#2563eb', fontWeight: 700, fontSize: 14,
              textDecoration: 'none', whiteSpace: 'nowrap',
              transition: 'all .2s',
            }}
          >
            View All Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {projects.map((project, i) => (
            <PreviewCard key={project.id || i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PreviewCard({ project, index }) {
  const [imgSrc,  setImgSrc]  = useState(getImageUrl(project.coverImageUrl) || FALLBACK);
  const [hovered, setHovered] = useState(false);
  const sc = StatusColors[project.status] || { bg: '#f1f5f9', color: '#475569' };

  return (
    <Link
      to="/projects"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none',
        borderRadius: 16, overflow: 'hidden',
        background: '#fff',
        border: '1px solid #e8ecf0',
        transition: 'transform .28s ease, box-shadow .28s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,.12)' : '0 2px 12px rgba(0,0,0,.06)',
        animation: 'bcc-fadeup .5s ease both',
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* image with blur effect - blurred on idle, clear on hover */}
      <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
        <img
          src={imgSrc}
          alt={project.title}
          onError={() => setImgSrc(FALLBACK)}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform .45s ease, filter .3s ease',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            filter: hovered ? 'blur(0)' : 'blur(4px)',
            display: 'block',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top,rgba(10,15,30,.55) 0%,transparent 60%)',
          opacity: hovered ? 1 : 0, transition: 'opacity .28s ease',
        }} />
        {/* type badge */}
        {project.projectType && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(255,255,255,.9)',
            backdropFilter: 'blur(4px)',
            padding: '3px 10px', borderRadius: 20,
            fontSize: 10, fontWeight: 700,
            color: '#0f172a', textTransform: 'uppercase', letterSpacing: '.4px',
          }}>{project.projectType}</div>
        )}
        {/* status */}
        {project.status && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: sc.bg, color: sc.color,
            padding: '3px 10px', borderRadius: 20,
            fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '.4px',
          }}>{project.status}</div>
        )}
      </div>

      {/* body - remains sharp */}
      <div style={{ padding: '16px 18px 18px' }}>
        <h3 style={{
          margin: '0 0 6px', fontSize: 15, fontWeight: 700,
          color: '#0f172a', lineHeight: 1.35,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{project.title}</h3>

        {(project.location || project.clientName) && (
          <p style={{ margin: '0 0 8px', fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            {project.location || project.clientName}
          </p>
        )}

        <p style={{
          margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.6,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {project.description || 'Professional construction project delivered with quality and precision.'}
        </p>

        <div style={{
          marginTop: 14, height: 2, borderRadius: 2,
          background: 'linear-gradient(90deg,#2563eb,#0ea5e9)',
          width: hovered ? '100%' : '28px',
          transition: 'width .35s ease',
        }} />
      </div>
    </Link>
  );
}