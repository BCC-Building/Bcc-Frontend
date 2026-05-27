// src/pages/CareersPage.jsx
// Production-Ready | Bechtel + Skanska + Turner Style | BCC
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { publicAPI } from '../api/endpoints';

// ─── constants ────────────────────────────────────────────────────────────────
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80';

const BENEFITS = [
  { icon: '🚀', title: 'Fast-Track Growth',   desc: 'Structured career paths with leadership programs and mentorship from senior engineers.' },
  { icon: '📚', title: 'Learning Budget',      desc: '₹50,000/year for certifications, workshops and industry conferences.' },
  { icon: '💰', title: 'Top Compensation',     desc: 'Industry-best CTC with performance bonuses and equity-linked incentives.' },
  { icon: '⚖️', title: 'Work-Life Balance',    desc: 'Flexible work hours, hybrid options, and 30 days of annual paid leave.' },
  { icon: '🏆', title: 'Recognition',          desc: 'Annual excellence awards, peer recognition and public project credits.' },
  { icon: '💊', title: 'Health & Wellness',    desc: 'Comprehensive medical insurance covering self, spouse, children and parents.' },
];

const PROCESS = [
  { step: '01', title: 'Apply Online',       desc: 'Submit your resume and cover letter through our simple form below.' },
  { step: '02', title: 'Screening Call',     desc: 'A 20-min call with our HR team to discuss your background and goals.' },
  { step: '03', title: 'Technical Round',    desc: 'Role-specific assessment — design challenge, case study or coding test.' },
  { step: '04', title: 'Final Interview',    desc: 'Meet the team lead and senior management for a culture fit discussion.' },
  { step: '05', title: 'Offer & Onboarding', desc: 'Receive your offer within 48 hrs and join a world-class team.' },
];

const POSITIONS = [
  'Architect','Site Engineer','Surveyor','Soil Investigation Engineer',
  'Structural Engineer','Project Manager','Quality Control Engineer',
  'BIM Modeler','Interior Designer','Safety Officer',
  'Construction Manager','Geotechnical Engineer',
  'Quantity Surveyor','Urban Planner','Landscape Architect',
];

const PER_PAGE = 6;

const TYPEWRITER_WORDS = ['Infrastructure', 'Skyline', 'Innovation'];

// ─── tiny helpers ─────────────────────────────────────────────────────────────
const Tag = ({ children, color = '#e0e7ff', textColor = '#3730a3' }) => (
  <span style={{
    display: 'inline-block', padding: '3px 10px',
    borderRadius: 20, fontSize: 11, fontWeight: 700,
    letterSpacing: '.4px', textTransform: 'uppercase',
    background: color, color: textColor,
  }}>{children}</span>
);

const typeColor = (type) => {
  const map = {
    'Full-time': { bg: '#dcfce7', c: '#15803d' },
    'Part-time': { bg: '#fef9c3', c: '#854d0e' },
    'Contract':  { bg: '#fce7f3', c: '#9d174d' },
    'Remote':    { bg: '#ede9fe', c: '#5b21b6' },
  };
  return map[type] || { bg: '#e0e7ff', c: '#3730a3' };
};

// ─── Helper for safe array handling ────────────────────────────────────────
function toLines(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split('\n').filter(line => line.trim().length > 0);
}

// ─── Job Card ─────────────────────────────────────────────────────────────────
const JobCard = ({ job, onView, onApply, index }) => {
  const [hovered, setHovered] = useState(false);
  const tc = typeColor(job.type);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: hovered ? '1.5px solid #6366f1' : '1.5px solid #e8ecf0',
        borderRadius: 16,
        padding: '24px 26px',
        transition: 'all .25s ease',
        boxShadow: hovered ? '0 12px 36px rgba(99,102,241,.12)' : '0 2px 8px rgba(0,0,0,.05)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        animation: 'cc-fadeup .4s ease both',
        animationDelay: `${index * 0.07}s`,
        display: 'flex', flexDirection: 'column', gap: 14,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
            {job.title}
          </h3>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {job.department && <Tag>{job.department}</Tag>}
            {job.type && <Tag color={tc.bg} textColor={tc.c}>{job.type}</Tag>}
          </div>
        </div>
        <div style={{
          fontSize: 13, fontWeight: 700,
          color: hovered ? '#6366f1' : '#94a3b8',
          transition: 'color .2s', whiteSpace: 'nowrap', minWidth: 80, textAlign: 'right',
        }}>
          {hovered && job.salary ? job.salary : '💼 Competitive'}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {job.location && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            {job.location}
          </span>
        )}
        {job.experience && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {job.experience}
          </span>
        )}
      </div>

      {job.description && (
        <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.65,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {job.description}
        </p>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <button onClick={() => onView(job)} style={{
          flex: 1, padding: '9px 0',
          borderRadius: 10, border: '1.5px solid #6366f1',
          background: 'transparent', color: '#6366f1',
          fontWeight: 700, fontSize: 13, cursor: 'pointer',
          transition: 'all .2s',
        }}
          onMouseOver={e => { e.target.style.background = '#6366f1'; e.target.style.color = '#fff'; }}
          onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#6366f1'; }}
        >
          View Details
        </button>
        <button onClick={() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });   // 👈 add this line
  onView(job);
}} style={{
          flex: 1, padding: '9px 0',
          borderRadius: 10, border: 'none',
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
        }}>
          Quick Apply →
        </button>
      </div>
    </div>
  );
};

// ─── Job Modal ────────────────────────────────────────────────────────────────
const JobModal = ({ job, onClose, onApply }) => {
  useEffect(() => {
    const esc = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [onClose]);

  const tc = typeColor(job.type);
  const respLines = toLines(job.responsibilities);
  const reqLines  = toLines(job.requirements);

  return (
    <div onClick={onClose} style={{
     position: 'fixed', inset: 0, zIndex: 9999,  // ← changed
  background: 'rgba(5,10,30,.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'cc-fadein .2s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 20,
        width: '100%', maxWidth: 660,
        maxHeight: '90vh', overflow: 'auto',
        padding: '32px 36px',
        position: 'relative',
        animation: 'cc-slideup .25s ease',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16,
          width: 34, height: 34, borderRadius: '50%',
          border: '1px solid #e2e8f0', background: '#fff',
          fontSize: 18, cursor: 'pointer', color: '#64748b',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>×</button>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          {job.department && <Tag>{job.department}</Tag>}
          {job.type && <Tag color={tc.bg} textColor={tc.c}>{job.type}</Tag>}
        </div>

        <h2 style={{ margin: '0 0 16px', fontSize: 22, fontWeight: 900, color: '#0f172a' }}>{job.title}</h2>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))',
          gap: 12, padding: '14px 16px',
          background: '#f8fafc', borderRadius: 10, marginBottom: 20,
        }}>
          {[
            { label: 'Location',   val: job.location   },
            { label: 'Experience', val: job.experience },
            { label: 'Salary',     val: job.salary     },
            { label: 'Type',       val: job.type       },
          ].filter(m => m.val).map(m => (
            <div key={m.label}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', color: '#94a3b8', marginBottom: 3 }}>{m.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{m.val}</div>
            </div>
          ))}
        </div>

        {job.description && (
          <Section title="About this Role"><p style={{ color: '#475569', lineHeight: 1.7, fontSize: 14 }}>{job.description}</p></Section>
        )}

        {respLines.length > 0 && (
          <Section title="Key Responsibilities">
            <ul style={{ paddingLeft: 18, color: '#475569', lineHeight: 1.8, fontSize: 14 }}>
              {respLines.map((line, i) => <li key={i}>{line.trim()}</li>)}
            </ul>
          </Section>
        )}

        {reqLines.length > 0 && (
          <Section title="Requirements">
            <ul style={{ paddingLeft: 18, color: '#475569', lineHeight: 1.8, fontSize: 14 }}>
              {reqLines.map((line, i) => <li key={i}>{line.trim()}</li>)}
            </ul>
          </Section>
        )}

        <button onClick={() => { onClose(); onApply(job); }} style={{
          width: '100%', marginTop: 20,
          padding: '13px 0',
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          color: '#fff', border: 'none', borderRadius: 12,
          fontWeight: 800, fontSize: 15, cursor: 'pointer',
          letterSpacing: '.2px',
        }}>
          Apply for this Position →
        </button>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 18 }}>
    <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 800, color: '#0f172a', letterSpacing: '.2px' }}>{title}</h4>
    {children}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CareersPage() {
  const [jobs,        setJobs]        = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [jobsError,   setJobsError]   = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal,   setShowModal]   = useState(false);
  const [search,      setSearch]      = useState('');
  const [dept,        setDept]        = useState('All');
  const [page,        setPage]        = useState(1);

  const [form,        setForm]        = useState({
    fullName: '', email: '', phone: '', position: '',
    experience: '', currentCompany: '', portfolio: '', message: '',
  });
  const [errors,      setErrors]      = useState({});
  const [fileName,    setFileName]    = useState('');
  const [submitting,  setSubmitting]  = useState(false);
  const [success,     setSuccess]     = useState(false);
  const fileRef = useRef(null);
  const applyRef = useRef(null);

  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await publicAPI.getActiveJobPostings();
        if (res.data?.success) setJobs(res.data.data || []);
        else setJobs([]);
      } catch (e) {
        console.error(e);
        setJobsError('Failed to load positions. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[wordIdx];
    if (charIdx < currentWord.length) {
      const timeout = setTimeout(() => setCharIdx(prev => prev + 1), 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIdx(0);
        setWordIdx(prev => (prev + 1) % TYPEWRITER_WORDS.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIdx, wordIdx]);

  const departments = useMemo(() => {
    const s = new Set(jobs.map(j => j.department).filter(Boolean));
    return ['All', ...Array.from(s).sort()];
  }, [jobs]);

  const filtered = useMemo(() => {
    let r = dept === 'All' ? jobs : jobs.filter(j => j.department === dept);
    if (search) r = r.filter(j =>
      j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.department?.toLowerCase().includes(search.toLowerCase()) ||
      j.location?.toLowerCase().includes(search.toLowerCase())
    );
    return r;
  }, [jobs, dept, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const current    = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => { setPage(1); }, [dept, search]);

  const handleApply = (job) => {
    setSelectedJob(job);
    setForm(f => ({ ...f, position: job.title || '' }));
    setShowModal(false);
    setTimeout(() => applyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name required';
    if (!form.email)           e.email    = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone)           e.phone    = 'Phone required';
    else if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = '10-digit Indian number';
    if (!form.position)        e.position = 'Select a position';
    if (!form.experience)      e.experience = 'Select experience';
    if (!fileName && !fileRef.current?.files?.length) e.resume = 'Resume required';
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length) { setErrors(ve); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('application', new Blob([JSON.stringify({
        name: form.fullName, email: form.email, phone: form.phone,
        position: form.position, experience: form.experience,
        currentCompany: form.currentCompany, portfolio: form.portfolio,
        coverLetter: form.message,
      })], { type: 'application/json' }));
      if (fileRef.current?.files[0]) fd.append('resume', fileRef.current.files[0]);
      const res = await publicAPI.submitJobApplication(fd);
      if (res.data?.success) {
        setSuccess(true);
        setForm({ fullName:'',email:'',phone:'',position:'',experience:'',currentCompany:'',portfolio:'',message:'' });
        setFileName('');
        if (fileRef.current) fileRef.current.value = '';
        setTimeout(() => setSuccess(false), 6000);
      } else throw new Error(res.data?.message || 'Submission failed');
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <SEO
        title="Careers at BCC | Join Our Engineering Team"
        description="Join BCC's talented team of structural engineers & architects. Competitive salary, training programs, leadership opportunities & work-life balance in India."
        keywords="BCC careers, structural engineer jobs, architect jobs, engineering positions, construction jobs India, career opportunities"
        url="https://bcc.net.in/careers"
        image="https://bcc.net.in/og-careers.jpg"
      />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', minHeight: '88vh',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden',
        background: '#050a1a',
      }}>
        <img src={FALLBACK_IMG} alt=""
          style={{ position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:.2 }} />
        <div style={{
          position:'absolute',inset:0,opacity:.06,
          backgroundImage:'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)',
          backgroundSize:'64px 64px',
        }} />
        <div style={{position:'absolute',top:'-10%',right:'10%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,.3) 0%,transparent 70%)',pointerEvents:'none'}} />
        <div style={{position:'absolute',bottom:'-5%',left:'5%',width:350,height:350,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,.2) 0%,transparent 70%)',pointerEvents:'none'}} />

        <div className="cc-container" style={{ position:'relative',zIndex:2, paddingTop: 80, paddingBottom: 80 }}>
          <div style={{
            display:'inline-flex',alignItems:'center',gap:8,
            background:'rgba(99,102,241,.15)',
            border:'1px solid rgba(99,102,241,.3)',
            padding:'6px 18px',borderRadius:30,
            marginBottom:28,
          }}>
            <span style={{width:7,height:7,borderRadius:'50%',background:'#818cf8',display:'inline-block',boxShadow:'0 0 8px rgba(129,140,248,.8)'}} />
            <span style={{color:'#a5b4fc',fontSize:12,fontWeight:700,letterSpacing:'.7px',textTransform:'uppercase'}}>We're Hiring</span>
          </div>

          <h1 style={{color:'#fff',fontSize:'clamp(2.2rem,5vw,3.8rem)',fontWeight:900,lineHeight:1.1,margin:'0 0 22px',maxWidth:720}}>
            Build the Future of{' '}
            <span style={{background:'linear-gradient(135deg,#818cf8,#c084fc,#f472b6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
              {TYPEWRITER_WORDS[wordIdx].substring(0, charIdx)}
              <span className="cursor">|</span>
            </span>
          </h1>

          <p style={{color:'rgba(255,255,255,.65)',fontSize:'clamp(1rem,1.8vw,1.15rem)',lineHeight:1.75,maxWidth:600,margin:'0 0 42px'}}>
            Join BCC — where engineers, architects and visionaries come together to design and deliver projects that define skylines. Work on landmark projects with a team that invests in your future.
          </p>

          <div style={{display:'flex',gap:0,flexWrap:'wrap',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',borderRadius:14,overflow:'hidden',maxWidth:480,marginBottom:40}}>
            {[
              { n: `${jobs.length}+`, label: 'Open Roles' },
              { n: '8+',             label: 'Locations' },
              { n: '1000+',          label: 'Team Members' },
            ].map((s, i) => (
              <div key={i} style={{flex:1,padding:'16px 20px',textAlign:'center',borderRight:i<2?'1px solid rgba(255,255,255,.08)':'none'}}>
                <div style={{color:'#fff',fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:900,lineHeight:1}}>{s.n}</div>
                <div style={{color:'rgba(255,255,255,.5)',fontSize:11,marginTop:4,letterSpacing:'.4px',textTransform:'uppercase'}}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
            <a href="#openings" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'13px 28px',borderRadius:12,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',fontWeight:800,fontSize:15,textDecoration:'none',boxShadow:'0 8px 24px rgba(99,102,241,.35)'}}>
              View Openings
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#why-join" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 26px',borderRadius:12,border:'2px solid rgba(255,255,255,.25)',color:'#fff',fontWeight:700,fontSize:15,textDecoration:'none',background:'transparent'}}>Why BCC?</a>
          </div>
        </div>
      </section>

      {/* ══ WHY JOIN ══════════════════════════════════════════════════════════ */}
      <section id="why-join" style={{ padding:'90px 0', background:'#f8fafc' }}>
        <div className="cc-container">
          <SectionHeader eyebrow="Our Culture" title="Why Top Talent Chooses BCC" sub="We don't just build structures — we build careers that last a lifetime." />
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24}}>
            {BENEFITS.map((b, i) => <BenefitCard key={i} b={b} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══ HIRING PROCESS ════════════════════════════════════════════════════ */}
      <section style={{ padding:'90px 0', background:'#fff' }}>
        <div className="cc-container">
          <SectionHeader eyebrow="Our Process" title="How We Hire" sub="A transparent, respectful hiring journey — from application to offer in under 2 weeks." />
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:20,position:'relative'}}>
            {PROCESS.map((p, i) => (
              <div key={i} style={{background:'#f8fafc',border:'1.5px solid #e8ecf0',borderRadius:14,padding:'24px 20px',animation:'cc-fadeup .5s ease both',animationDelay:`${i*0.1}s`,position:'relative'}}>
                <div style={{fontSize:28,fontWeight:900,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:10}}>{p.step}</div>
                <h4 style={{margin:'0 0 8px',fontSize:14,fontWeight:800,color:'#0f172a'}}>{p.title}</h4>
                <p style={{margin:0,fontSize:13,color:'#64748b',lineHeight:1.6}}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OPEN POSITIONS ════════════════════════════════════════════════════ */}
      <section id="openings" style={{ padding:'90px 0', background:'#f8fafc' }}>
        <div className="cc-container">
          <SectionHeader eyebrow="Current Openings" title="Find Your Role at BCC" sub="Filter by department or search to find the perfect opportunity." />
          <div style={{background:'#fff',border:'1.5px solid #e8ecf0',borderRadius:14,padding:'18px 20px',marginBottom:32,display:'flex',flexDirection:'column',gap:14}}>
            <div style={{ position:'relative', maxWidth:400 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#94a3b8'}}><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <input type="text" placeholder="Search by title, department, location..." value={search} onChange={e => setSearch(e.target.value)} style={{paddingLeft:36,paddingRight:14,paddingTop:10,paddingBottom:10,borderRadius:10,border:'1.5px solid #e2e8f0',fontSize:14,width:'100%',color:'#0f172a',outline:'none'}} />
            </div>
            {departments.length > 1 && (
              <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
                {departments.map(d => (
                  <button key={d} onClick={() => setDept(d)} style={{padding:'6px 16px',borderRadius:30,border:dept===d?'none':'1.5px solid #e2e8f0',background:dept===d?'linear-gradient(135deg,#6366f1,#8b5cf6)':'#fff',color:dept===d?'#fff':'#475569',fontSize:13,fontWeight:600,cursor:'pointer',transition:'all .2s',whiteSpace:'nowrap'}}>{d}</button>
                ))}
              </div>
            )}
          </div>

          {!loading && !jobsError && (
            <div style={{ marginBottom:20, color:'#64748b', fontSize:14 }}>
              <strong style={{ color:'#0f172a' }}>{filtered.length}</strong> position{filtered.length !== 1 ? 's' : ''} found
            </div>
          )}

          {loading && (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:24 }}>
              {[...Array(6)].map((_,i) => <div key={i} style={{height:200,borderRadius:16,background:'#e2e8f0',animation:'cc-pulse 1.4s ease-in-out infinite',animationDelay:`${i*.1}s`}} />)}
            </div>
          )}

          {!loading && jobsError && (
            <div style={{ textAlign:'center',padding:'60px 20px' }}>
              <div style={{ fontSize:48,marginBottom:16 }}>⚠️</div>
              <h3 style={{ color:'#0f172a',marginBottom:8 }}>Could Not Load Jobs</h3>
              <p style={{ color:'#64748b',marginBottom:20 }}>{jobsError}</p>
              <button onClick={() => window.location.reload()} style={{padding:'10px 24px',borderRadius:8,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',border:'none',fontWeight:700,cursor:'pointer'}}>Retry</button>
            </div>
          )}

          {!loading && !jobsError && filtered.length === 0 && (
            <div style={{textAlign:'center',padding:'60px 24px',background:'#fff',borderRadius:16,border:'1.5px solid #e8ecf0'}}>
              <div style={{ fontSize:48,marginBottom:16 }}>📭</div>
              <h3 style={{ color:'#0f172a',marginBottom:8,fontSize:18 }}>No Openings Found</h3>
              <p style={{ color:'#64748b',maxWidth:400,margin:'0 auto 24px',lineHeight:1.6 }}>We don't have matching positions right now, but we're always looking for great talent. Send us an open application!</p>
              <Link to="/contact" style={{display:'inline-block',padding:'11px 24px',borderRadius:10,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',textDecoration:'none',fontWeight:700}}>Send Open Application</Link>
            </div>
          )}

          {!loading && !jobsError && current.length > 0 && (
            <>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:20}}>
                {current.map((job, i) => <JobCard key={job.id} job={job} index={i} onView={j => { setSelectedJob(j); setShowModal(true); }} onApply={handleApply} />)}
              </div>
              {totalPages > 1 && (
                <div style={{ display:'flex',justifyContent:'center',alignItems:'center',gap:10,marginTop:40 }}>
                  <button disabled={page===1} onClick={() => setPage(p=>p-1)} style={pgBtn(page===1)}>← Previous</button>
                  {[...Array(totalPages)].map((_,i) => <button key={i} onClick={() => setPage(i+1)} style={{width:38,height:38,borderRadius:8,border:page===i+1?'none':'1.5px solid #e2e8f0',background:page===i+1?'linear-gradient(135deg,#6366f1,#8b5cf6)':'#fff',color:page===i+1?'#fff':'#475569',fontWeight:700,fontSize:14,cursor:'pointer'}}>{i+1}</button>)}
                  <button disabled={page===totalPages} onClick={() => setPage(p=>p+1)} style={pgBtn(page===totalPages)}>Next →</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ══ APPLICATION FORM ══════════════════════════════════════════════════ */}
      <section id="apply-section" ref={applyRef} style={{ padding:'90px 0', background:'#fff' }}>
        <div className="cc-container">
          <SectionHeader eyebrow="Apply Now" title={selectedJob ? `Applying for: ${selectedJob.title}` : 'Submit Your Application'} sub="Our recruitment team responds within 48 hours of receiving your application." />
          <div style={{maxWidth:780,margin:'0 auto',background:'#f8fafc',border:'1.5px solid #e8ecf0',borderRadius:20,padding:'36px 40px'}}>
            {success && <div style={{padding:'14px 20px',background:'#dcfce7',color:'#15803d',borderRadius:10,marginBottom:24,display:'flex',alignItems:'center',gap:10,fontWeight:600,fontSize:14}}>✅ Application submitted! We'll be in touch within 48 hours.</div>}
            {errors.submit && <div style={{padding:'14px 20px',background:'#fee2e2',color:'#991b1b',borderRadius:10,marginBottom:24,fontWeight:600,fontSize:14}}>❌ {errors.submit}</div>}
            <form onSubmit={handleSubmit}>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px 20px' }}>
                <FormField label="Full Name *" error={errors.fullName}><input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Rahul Sharma" style={inputStyle} /></FormField>
                <FormField label="Email Address *" error={errors.email}><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="rahul@example.com" style={inputStyle} /></FormField>
                <FormField label="Phone Number *" error={errors.phone}><input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" style={inputStyle} /></FormField>
                <FormField label="Position Applying For *" error={errors.position}><select name="position" value={form.position} onChange={handleChange} style={inputStyle}><option value="">Select position</option>{POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}</select></FormField>
                <FormField label="Years of Experience *" error={errors.experience}><select name="experience" value={form.experience} onChange={handleChange} style={inputStyle}><option value="">Select experience</option>{['Fresher (0-1 years)','1-3 years','3-6 years','6-10 years','10+ years'].map(e => <option key={e} value={e}>{e}</option>)}</select></FormField>
                <FormField label="Current Company"><input name="currentCompany" value={form.currentCompany} onChange={handleChange} placeholder="Optional" style={inputStyle} /></FormField>
                <div style={{ gridColumn:'span 2' }}><FormField label="Portfolio / LinkedIn URL"><input name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" style={inputStyle} /></FormField></div>
                <div style={{ gridColumn:'span 2' }}><FormField label="Resume / CV *" error={errors.resume}>
                  <label style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',border:'2px dashed',borderColor:errors.resume?'#ef4444':'#cbd5e1',borderRadius:10,cursor:'pointer',background:'#fff'}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#6366f1" strokeWidth="2"/><path d="M14 2v6h6M12 12v6M9 15l3-3 3 3" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontSize:14, color: fileName ? '#0f172a' : '#94a3b8', fontWeight: fileName ? 600 : 400 }}>{fileName || 'Upload PDF or DOC (max 5MB)'}</span>
                    <input type="file" ref={fileRef} accept=".pdf,.doc,.docx" style={{ display:'none' }} onChange={e => { const f = e.target.files[0]; if (f) { const ok = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']; if (ok.includes(f.type)) { setFileName(f.name); setErrors(er => ({...er,resume:''})); } else setErrors(er => ({...er,resume:'Only PDF, DOC, DOCX allowed'})); } }} />
                  </label>
                </FormField></div>
                <div style={{ gridColumn:'span 2' }}><FormField label="Cover Letter (optional)"><textarea name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us why you're the perfect fit for this role..." style={{ ...inputStyle, resize:'vertical', minHeight:100 }} /></FormField></div>
              </div>
              <button type="submit" disabled={submitting} style={{width:'100%',marginTop:24,padding:'14px 0',background:submitting?'#94a3b8':'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',border:'none',borderRadius:12,fontWeight:800,fontSize:16,cursor:submitting?'not-allowed':'pointer',letterSpacing:'.2px',transition:'opacity .2s'}}>{submitting ? 'Submitting...' : 'Submit Application →'}</button>
            </form>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════════════════════════ */}
      <section style={{background:'linear-gradient(135deg,#0f0c29,#302b63,#24243e)',padding:'80px 0',textAlign:'center'}}>
        <div className="cc-container">
          <h2 style={{ color:'#fff',fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:900,marginBottom:14 }}>Don't See the Right Role?</h2>
          <p style={{ color:'rgba(255,255,255,.6)',fontSize:'1.05rem',maxWidth:480,margin:'0 auto 32px',lineHeight:1.7 }}>Send us your resume and we'll reach out the moment a position matches your profile.</p>
          <Link to="/contact" style={{display:'inline-flex',alignItems:'center',gap:10,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',padding:'14px 32px',borderRadius:12,fontWeight:800,fontSize:15,textDecoration:'none',boxShadow:'0 8px 24px rgba(99,102,241,.4)'}}>Send Open Application →</Link>
        </div>
      </section>

      {/* ══ MODAL ══════════════════════════════════════════════════════════════ */}
      {showModal && selectedJob && <JobModal job={selectedJob} onClose={() => setShowModal(false)} onApply={handleApply} />}

      <style>{`
        .cc-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        @keyframes cc-fadeup  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cc-fadein  { from{opacity:0} to{opacity:1} }
        @keyframes cc-slideup { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cc-pulse   { 0%,100%{opacity:1} 50%{opacity:.45} }
        .cursor { display: inline-block; font-weight: 100; color: #c084fc; margin-left: 2px; animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        @media(max-width:640px){ .cc-form-grid { grid-template-columns:1fr !important; } }
      `}</style>
    </>
  );
}

// ─── small sub-components ─────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div style={{ textAlign:'center', marginBottom:52 }}>
      <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'#ede9fe',border:'1px solid #ddd6fe',padding:'4px 16px',borderRadius:30,marginBottom:14}}>
        <span style={{width:6,height:6,borderRadius:'50%',background:'#7c3aed',display:'inline-block'}} />
        <span style={{color:'#5b21b6',fontSize:11,fontWeight:700,letterSpacing:'.6px',textTransform:'uppercase'}}>{eyebrow}</span>
      </div>
      <h2 style={{ margin:'0 0 12px',fontSize:'clamp(1.6rem,3vw,2.2rem)',fontWeight:900,color:'#0f172a',lineHeight:1.2 }}>{title}</h2>
      {sub && <p style={{ margin:0,color:'#64748b',fontSize:'1rem',maxWidth:520,marginInline:'auto',lineHeight:1.65 }}>{sub}</p>}
    </div>
  );
}

function BenefitCard({ b, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{background:'#fff',border:hovered?'1.5px solid #6366f1':'1.5px solid #e8ecf0',borderRadius:16,padding:'28px 24px',transition:'all .25s ease',boxShadow:hovered?'0 12px 32px rgba(99,102,241,.1)':'0 2px 8px rgba(0,0,0,.04)',transform:hovered?'translateY(-4px)':'none',animation:'cc-fadeup .5s ease both',animationDelay:`${index*.08}s`}}>
      <div style={{ fontSize:32, marginBottom:14 }}>{b.icon}</div>
      <h3 style={{ margin:'0 0 8px',fontSize:15,fontWeight:800,color:'#0f172a' }}>{b.title}</h3>
      <p style={{ margin:0,fontSize:13,color:'#64748b',lineHeight:1.65 }}>{b.desc}</p>
    </div>
  );
}

function FormField({ label, error, children }) {
  return (
    <div style={{ display:'flex',flexDirection:'column',gap:5 }}>
      <label style={{ fontSize:13,fontWeight:700,color:'#334155' }}>{label}</label>
      {children}
      {error && <span style={{ fontSize:11,color:'#dc2626',fontWeight:600 }}>{error}</span>}
    </div>
  );
}

const inputStyle = {
  padding:'10px 14px',
  borderRadius:10,
  border:'1.5px solid #e2e8f0',
  fontSize:14,
  color:'#0f172a',
  background:'#fff',
  outline:'none',
  width:'100%',
};

const pgBtn = (disabled) => ({
  padding:'8px 18px',borderRadius:8,
  border:'1.5px solid #e2e8f0',
  background:'#fff',
  color:disabled?'#cbd5e1':'#475569',
  fontWeight:700,fontSize:13,
  cursor:disabled?'not-allowed':'pointer',
  opacity:disabled?.5:1,
});