// src/pages/BlogPage.jsx
// Production-Ready | Editorial Magazine Style | BCC Engineering Blog
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { publicAPI } from '../api/endpoints';
import { getImageUrl } from '../api/clients';
import BlogHero from '../components/blog/BlogHero';

// --- constants ----------------------------------------------------------------
const CATEGORIES = ['All','Architecture','Design','Business','Soil Testing','Survey','Construction','Engineering'];
const PER_PAGE = 6;
const FALLBACK = 'https://placehold.co/800x500/1a1a2e/ffffff?text=BCC+Blog';

const TRUST_BADGES = [
  'Weekly Expert Insights',
  '8+ Industry Topics',
  'By Senior Engineers',
];

// --- helper components (moved outside to be accessible) ----------------------
const PILL_COLORS = {
  Architecture:   { bg:'#eff6ff', color:'#1d4ed8' },
  Design:         { bg:'#fdf4ff', color:'#7e22ce' },
  Business:       { bg:'#f0fdf4', color:'#15803d' },
  'Soil Testing': { bg:'#fff7ed', color:'#c2410c' },
  Survey:         { bg:'#f0fdfa', color:'#0f766e' },
  Construction:   { bg:'#fefce8', color:'#a16207' },
  Engineering:    { bg:'#eff6ff', color:'#1e40af' },
};

const Pill = ({ cat }) => {
  const style = PILL_COLORS[cat] || { bg:'#f1f5f9', color:'#475569' };
  return (
    <span style={{
      padding:'3px 10px', borderRadius:20,
      background: style.bg, color: style.color,
      fontSize:11, fontWeight:700,
      letterSpacing:'.3px', whiteSpace:'nowrap',
    }}>{cat}</span>
  );
};

// --- helpers ------------------------------------------------------------------
const fmtDate = (d) => {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
};
const truncate = (t, n = 130) => !t || t.length <= n ? t : t.slice(0, n).trimEnd() + '…';
const readTime = (p) => p.readTimeMinutes || p.readTime || '5 min';

// --- BlogCard (using the top‑level Pill) -------------------------------------
const BlogCard = ({ post, onClick, index, featured = false }) => {
  const [img, setImg]     = useState(getImageUrl(post.coverImageUrl) || FALLBACK);
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={() => onClick(post)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius:16, overflow:'hidden',
        background:'#fff',
        border:'1.5px solid #e8ecf0',
        cursor:'pointer',
        transition:'transform .28s ease, box-shadow .28s ease',
        transform: hover ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hover ? '0 20px 48px rgba(0,0,0,.12)' : '0 2px 10px rgba(0,0,0,.05)',
        animation:`bp-fadeup .5s ease ${index*0.07}s both`,
        gridColumn: featured ? 'span 2' : 'span 1',
        display:'flex', flexDirection: featured ? 'row' : 'column',
      }}
    >
      {/* image */}
      <div style={{
        position:'relative', overflow:'hidden',
        height: featured ? '100%' : 210,
        minHeight: featured ? 280 : 210,
        flex: featured ? '0 0 55%' : 'none',
      }}>
        <img src={img} alt={post.title}
          onError={() => setImg(FALLBACK)}
          loading="lazy"
          style={{
            width:'100%', height:'100%', objectFit:'cover',
            transition:'transform .45s ease',
            transform: hover ? 'scale(1.06)' : 'scale(1)',
            display:'block',
          }}
        />
        {/* dark overlay on hover */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to top,rgba(5,10,30,.6) 0%,transparent 55%)',
          opacity: hover ? 1 : 0, transition:'opacity .28s',
        }} />
        {/* category top-left */}
        {post.category && (
          <div style={{ position:'absolute', top:12, left:12 }}>
            <Pill cat={post.category} />
          </div>
        )}
        {/* read time top-right */}
        <div style={{
          position:'absolute', top:12, right:12,
          background:'rgba(255,255,255,.9)',
          backdropFilter:'blur(4px)',
          padding:'3px 10px', borderRadius:20,
          fontSize:11, fontWeight:700, color:'#0f172a',
        }}>{readTime(post)} read</div>
      </div>

      {/* content */}
      <div style={{ padding: featured ? '32px 28px' : '18px 20px 20px', display:'flex', flexDirection:'column', justifyContent:'center', flex:1 }}>
        <p style={{ margin:'0 0 8px', fontSize:12, color:'#94a3b8', fontWeight:600 }}>
          {fmtDate(post.publishedDate || post.date)}
        </p>
        <h3 style={{
          margin:'0 0 10px',
          fontSize: featured ? 22 : 16,
          fontWeight:800, color:'#0f172a', lineHeight:1.3,
          display:'-webkit-box', WebkitLineClamp: featured ? 3 : 2,
          WebkitBoxOrient:'vertical', overflow:'hidden',
          transition:'color .2s',
          ...(hover ? { color:'#2563eb' } : {}),
        }}>{post.title}</h3>
        <p style={{
          margin:'0 0 16px', fontSize:13, color:'#64748b', lineHeight:1.65,
          display:'-webkit-box', WebkitLineClamp:2,
          WebkitBoxOrient:'vertical', overflow:'hidden',
        }}>
          {post.excerpt || truncate(post.content)}
        </p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <img
              src={post.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name||post.author||'A')}&background=2563eb&color=fff&size=32`}
              alt=""
              onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=A&background=94a3b8&color=fff'; }}
              style={{ width:28, height:28, borderRadius:'50%', objectFit:'cover' }}
            />
            <span style={{ fontSize:12, fontWeight:700, color:'#334155' }}>
              {post.author?.name || post.author || 'BCC Team'}
            </span>
          </div>
          <span style={{
            fontSize:12, fontWeight:700,
            color: hover ? '#2563eb' : '#94a3b8',
            transition:'color .2s',
            display:'flex', alignItems:'center', gap:4,
          }}>
            Read →
          </span>
        </div>
        <div style={{
          marginTop:14, height:2, borderRadius:2,
          background:'linear-gradient(90deg,#2563eb,#0ea5e9)',
          width: hover ? '100%' : '28px',
          transition:'width .35s ease',
        }} />
      </div>
    </div>
  );
};

// --- Skeleton (unchanged) ----------------------------------------------------
const Skeleton = () => (
  <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:20 }}>
    {Array.from({ length: 4 }).map((_, idx) => (
      <div key={idx} style={{ borderRadius:16, border:'1.5px solid #e8ecf0', background:'#fff', overflow:'hidden' }}>
        <div style={{ height:210, background:'linear-gradient(90deg,#eef2f7,#f8fafc,#eef2f7)', animation:'bp-pulse 1.4s ease-in-out infinite' }} />
        <div style={{ padding:20 }}>
          <div style={{ height:12, width:'35%', borderRadius:8, background:'#e2e8f0', marginBottom:14 }} />
          <div style={{ height:18, width:'82%', borderRadius:8, background:'#e2e8f0', marginBottom:10 }} />
          <div style={{ height:18, width:'62%', borderRadius:8, background:'#e2e8f0', marginBottom:18 }} />
          <div style={{ height:10, width:'100%', borderRadius:8, background:'#eef2f7', marginBottom:8 }} />
          <div style={{ height:10, width:'70%', borderRadius:8, background:'#eef2f7' }} />
        </div>
      </div>
    ))}
  </div>
);

// --- NewsletterBox (unchanged) ------------------------------------------------
const NewsletterBox = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSub = async e => {
    e.preventDefault();
    if (!email.includes('@')) { setStatus('error'); return; }
    setStatus('loading');
    await new Promise(r => setTimeout(r, 900));
    setStatus('success');
    setEmail('');
  };

  return (
    <form onSubmit={handleSub} style={{ display:'flex', gap:10, maxWidth:400, margin:'0 auto', flexWrap:'wrap' }}>
      <input
        type="email" value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        style={{
          flex:1, minWidth:200,
          padding:'11px 16px', borderRadius:10,
          border:'none', fontSize:14, color:'#0f172a',
          outline:'none',
        }}
      />
      <button type="submit" disabled={status==='loading'} style={{
        padding:'11px 22px', borderRadius:10,
        background:'linear-gradient(135deg,#2563eb,#0ea5e9)',
        color:'#fff', border:'none',
        fontWeight:700, fontSize:14, cursor:'pointer',
        whiteSpace:'nowrap',
      }}>
        {status==='loading' ? '…' : status==='success' ? '✓ Subscribed!' : 'Subscribe'}
      </button>
    </form>
  );
};

// --- Sidebar (unchanged) -----------------------------------------------------
const Sidebar = ({ recent, onPost, search, setSearch }) => (
  <aside style={{ display:'flex', flexDirection:'column', gap:24 }}>
    {/* search */}
    <div style={{ background:'#fff', borderRadius:14, border:'1.5px solid #e8ecf0', padding:'18px 20px' }}>
      <h4 style={{ margin:'0 0 12px', fontSize:13, fontWeight:800, color:'#0f172a', textTransform:'uppercase', letterSpacing:'.5px' }}>Search</h4>
      <div style={{ position:'relative' }}>
        <input
          type="text" value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search articles..."
          style={{
            width:'100%', padding:'9px 36px 9px 12px',
            borderRadius:10, border:'1.5px solid #e2e8f0',
            fontSize:13, color:'#0f172a', outline:'none',
          }}
        />
        <span style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', color:'#94a3b8' }}>🔍</span>
      </div>
    </div>

    {/* newsletter */}
    <div style={{ background:'linear-gradient(135deg,#1e3a5f,#0a0f1e)', borderRadius:14, padding:'22px 20px', color:'#fff' }}>
      <h4 style={{ margin:'0 0 6px', fontSize:15, fontWeight:900 }}>Newsletter</h4>
      <p style={{ margin:'0 0 14px', fontSize:12, color:'rgba(255,255,255,.6)', lineHeight:1.6 }}>
        Get the latest engineering insights delivered weekly.
      </p>
      <NewsletterBox />
    </div>

    {/* recent posts */}
    {recent.length > 0 && (
      <div style={{ background:'#fff', borderRadius:14, border:'1.5px solid #e8ecf0', padding:'18px 20px' }}>
        <h4 style={{ margin:'0 0 16px', fontSize:13, fontWeight:800, color:'#0f172a', textTransform:'uppercase', letterSpacing:'.5px' }}>
          Recent Articles
        </h4>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {recent.map(p => (
            <div key={p.id} onClick={() => onPost(p)} style={{ display:'flex', gap:10, cursor:'pointer' }}>
              <img
                src={getImageUrl(p.coverImageUrl) || FALLBACK}
                alt="" onError={e => { e.target.src = FALLBACK; }}
                style={{ width:56, height:46, borderRadius:8, objectFit:'cover', flexShrink:0 }}
              />
              <div>
                <p style={{ margin:'0 0 3px', fontSize:12, fontWeight:700, color:'#0f172a', lineHeight:1.4, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{p.title}</p>
                <span style={{ fontSize:11, color:'#94a3b8' }}>{fmtDate(p.publishedDate || p.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* topics */}
    <div style={{ background:'#fff', borderRadius:14, border:'1.5px solid #e8ecf0', padding:'18px 20px' }}>
      <h4 style={{ margin:'0 0 14px', fontSize:13, fontWeight:800, color:'#0f172a', textTransform:'uppercase', letterSpacing:'.5px' }}>
        Topics
      </h4>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
        {['Architecture','Engineering','Construction','Design','Soil Testing','Survey','Project Management','Urban Planning'].map(t => (
          <button key={t} onClick={() => setSearch(t)} style={{
            padding:'5px 12px', borderRadius:20,
            background:'#f1f5f9', border:'none',
            fontSize:12, fontWeight:600, color:'#475569',
            cursor:'pointer', transition:'all .2s',
          }}
            onMouseOver={e => { e.target.style.background='#dbeafe'; e.target.style.color='#1d4ed8'; }}
            onMouseOut={e => { e.target.style.background='#f1f5f9'; e.target.style.color='#475569'; }}
          >#{t}</button>
        ))}
      </div>
    </div>
  </aside>
);

// --- BlogDetail (using the top‑level Pill) ----------------------------------
const BlogDetail = ({ post, onBack }) => {
  const [img, setImg] = useState(getImageUrl(post.coverImageUrl) || FALLBACK);
  const [liked, setLiked]           = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareOpen, setShareOpen]   = useState(false);

  useEffect(() => { window.scrollTo(0,0); }, []);

  const url  = typeof window !== 'undefined' ? window.location.href : '';
  const text = post.title || '';

  const shareLinks = [
    { label:'LinkedIn', href:`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}` },
    { label:'Twitter',  href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
    { label:'Facebook', href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];

  return (
    <div style={{ maxWidth:780, margin:'0 auto', padding:'0 24px 80px', animation:'bp-fadein .3s ease' }}>
      <button onClick={onBack} style={{
        display:'inline-flex', alignItems:'center', gap:8,
        marginTop:32, marginBottom:28,
        background:'none', border:'none',
        color:'#2563eb', fontWeight:700, fontSize:14,
        cursor:'pointer', padding:0,
      }}>
        ← Back to all articles
      </button>

      <div style={{ fontSize:12, color:'#94a3b8', marginBottom:20, display:'flex', gap:6 }}>
        <Link to="/" style={{ color:'#94a3b8', textDecoration:'none' }}>Home</Link>
        <span>/</span>
        <span style={{ cursor:'pointer', color:'#94a3b8' }} onClick={onBack}>Blog</span>
        <span>/</span>
        <span style={{ color:'#0f172a' }}>{post.category}</span>
      </div>

      <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:18, flexWrap:'wrap' }}>
        {post.category && <Pill cat={post.category} />}
        <span style={{ fontSize:13, color:'#94a3b8' }}>{fmtDate(post.publishedDate || post.date)}</span>
        <span style={{ fontSize:13, color:'#94a3b8' }}>· {readTime(post)} read</span>
      </div>

      <h1 style={{ margin:'0 0 24px', fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:900, color:'#0f172a', lineHeight:1.15 }}>{post.title}</h1>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 0', borderTop:'1px solid #e8ecf0', borderBottom:'1px solid #e8ecf0', marginBottom:32, flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <img
            src={post.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name||post.author||'A')}&background=2563eb&color=fff&size=48`}
            alt=""
            onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=A&background=94a3b8&color=fff'; }}
            style={{ width:42, height:42, borderRadius:'50%', objectFit:'cover' }}
          />
          <div>
            <div style={{ fontWeight:800, fontSize:14, color:'#0f172a' }}>{post.author?.name || post.author || 'BCC Team'}</div>
            <div style={{ fontSize:12, color:'#94a3b8' }}>{post.author?.role || 'BCC Author'}</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:8, position:'relative' }}>
          <button onClick={() => setLiked(l=>!l)} title="Like" style={{ width:36, height:36, borderRadius:10, border:'1.5px solid #e2e8f0', background:'#fff', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>{liked ? '❤️' : '🤍'}</button>
          <button onClick={() => setBookmarked(b=>!b)} title="Bookmark" style={{ width:36, height:36, borderRadius:10, border:'1.5px solid #e2e8f0', background:'#fff', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>{bookmarked ? '🔖' : '📌'}</button>
          <button onClick={() => setShareOpen(s=>!s)} title="Share" style={{ width:36, height:36, borderRadius:10, border:'1.5px solid #e2e8f0', background:'#fff', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>↗️</button>
          {shareOpen && (
            <div style={{ position:'absolute', top:42, right:0, background:'#fff', borderRadius:12, border:'1.5px solid #e2e8f0', boxShadow:'0 12px 32px rgba(0,0,0,.12)', padding:8, zIndex:50, minWidth:160, animation:'bp-fadein .15s ease' }}>
              {shareLinks.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" onClick={() => setShareOpen(false)} style={{ display:'block', padding:'8px 14px', fontSize:13, fontWeight:600, color:'#334155', textDecoration:'none', borderRadius:8 }} onMouseOver={e => e.target.style.background='#f1f5f9'} onMouseOut={e => e.target.style.background='transparent'}>{s.label}</a>
              ))}
              <button onClick={() => { navigator.clipboard.writeText(url); setShareOpen(false); }} style={{ display:'block', width:'100%', textAlign:'left', padding:'8px 14px', fontSize:13, fontWeight:600, color:'#334155', background:'none', border:'none', cursor:'pointer', borderRadius:8 }}>Copy Link</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ borderRadius:16, overflow:'hidden', marginBottom:36, boxShadow:'0 8px 32px rgba(0,0,0,.1)' }}>
        <img src={img} alt={post.title} onError={() => setImg(FALLBACK)} style={{ width:'100%', maxHeight:480, objectFit:'cover', display:'block' }} />
      </div>

      {post.content ? (
        <div dangerouslySetInnerHTML={{ __html: post.content }} style={{ fontSize:16, lineHeight:1.85, color:'#334155', marginBottom:40 }} />
      ) : (
        <p style={{ color:'#94a3b8', fontStyle:'italic' }}>Content not available.</p>
      )}

      {post.tags?.length > 0 && (
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', paddingTop:24, borderTop:'1px solid #e8ecf0', marginBottom:32 }}>
          {post.tags.map(t => (
            <span key={t} style={{ padding:'4px 12px', borderRadius:20, background:'#f1f5f9', color:'#475569', fontSize:12, fontWeight:600 }}>#{t}</span>
          ))}
        </div>
      )}

      <div style={{ background:'#f8fafc', borderRadius:16, padding:'24px 20px', display:'flex', gap:16, border:'1.5px solid #e8ecf0', marginBottom:40 }}>
        <img src={post.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name||post.author||'A')}&background=2563eb&color=fff&size=64`} alt="" onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=A&background=94a3b8&color=fff'; }} style={{ width:56, height:56, borderRadius:'50%', objectFit:'cover', flexShrink:0 }} />
        <div>
          <div style={{ fontWeight:800, color:'#0f172a', marginBottom:3 }}>{post.author?.name || post.author || 'BCC Team'}</div>
          <div style={{ fontSize:12, color:'#94a3b8', marginBottom:6 }}>{post.author?.role || 'Author at BCC'}</div>
          <p style={{ fontSize:13, color:'#64748b', margin:0, lineHeight:1.6 }}>{post.author?.bio || 'Expert contributor at Building Creators & Consulting.'}</p>
        </div>
      </div>

      <div style={{ background:'linear-gradient(135deg,#0a0f1e,#1e3a5f)', borderRadius:16, padding:'36px 32px', textAlign:'center', color:'#fff' }}>
        <h3 style={{ margin:'0 0 10px', fontSize:20, fontWeight:900 }}>Never Miss an Insight</h3>
        <p style={{ margin:'0 0 24px', color:'rgba(255,255,255,.65)', fontSize:14 }}>Get the latest engineering articles and industry news in your inbox.</p>
        <NewsletterBox />
      </div>
    </div>
  );
};

// --- Main Component -----------------------------------------------------------
export default function BlogPage() {
  const [posts,    setPosts]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [apiError, setApiError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [page,     setPage]     = useState(1);
  const { slug } = useParams();
  const topRef = useRef(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true); setApiError(null);
    try {
      if (slug) {
        const res = await publicAPI.getBlogBySlug(slug);
        if (res.data?.success) setSelected(res.data.data);
        else throw new Error('Post not found');
      } else {
        const res = await publicAPI.getBlogs();
        if (res.data?.success) setPosts(res.data.data || []);
        else throw new Error(res.data?.message || 'Failed');
      }
    } catch(e) {
      console.error(e);
      setApiError('Failed to load articles. Please try again.');
    } finally { setLoading(false); }
  }, [slug]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);
  useEffect(() => { setPage(1); }, [category, search]);
  useEffect(() => { window.scrollTo(0,0); }, [selected, page]);

  const filtered = useMemo(() => {
    let r = category === 'All' ? posts : posts.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    if (search.trim()) {
      const t = search.toLowerCase();
      r = r.filter(p => p.title?.toLowerCase().includes(t) || p.excerpt?.toLowerCase().includes(t) || p.content?.toLowerCase().includes(t));
    }
    return r;
  }, [posts, category, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const current    = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);
  const recent     = useMemo(() =>
    [...posts].sort((a,b) => new Date(b.publishedDate||b.date) - new Date(a.publishedDate||a.date)).slice(0,4),
  [posts]);

  const handlePost = (post) => {
    setSelected(post);
    if (post.slug) window.history.pushState(null,'',`/blog/${post.slug}`);
  };
  const handleBack = () => {
    setSelected(null);
    window.history.pushState(null,'','/blog');
  };

  const totalArticles = posts.length;
  const topicCount = new Set(posts.map(p => p.category).filter(Boolean)).size;
  const HERO_STATS = [
    { value: `${totalArticles}+`, label: "Articles" },
    { value: `${topicCount || 8}+`, label: "Topics" },
    { value: "Weekly", label: "Updates" },
  ];

  const pgBtnStyle = (disabled) => ({
    padding:'8px 16px', borderRadius:8,
    border:'1.5px solid #e2e8f0', background:'#fff',
    color: disabled?'#cbd5e1':'#475569',
    fontWeight:700, fontSize:13,
    cursor: disabled?'not-allowed':'pointer',
    opacity: disabled ? 0.5 : 1,
  });

  return (
    <>
      <SEO
        title="Engineering Blog | Construction & Consulting Insights"
        description="Expert articles on structural engineering, soil investigation, construction management, architecture tips & industry trends. Weekly insights from BCC engineers."
        keywords="engineering blog, construction articles, structural engineering tips, soil testing insights, BCC blog, construction management articles"
        url="https://bcc.net.in/blog"
        image="https://bcc.net.in/og-blog.jpg"
        schemaType="Article"
      />

      <div style={{ background:'#f8fafc', minHeight:'100vh' }} ref={topRef}>

      {selected && <BlogDetail post={selected} onBack={handleBack} />}

      {!selected && (
        <>
          <BlogHero />

          <div className="bp-container" style={{ padding:'48px 24px 80px', maxWidth:1200, margin:'0 auto' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:32, alignItems:'start' }}>

              {/* left column */}
              <div>
                {/* category filter */}
                <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:28, background:'#fff', borderRadius:12, border:'1.5px solid #e8ecf0', padding:'12px 14px' }}>
                  {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setCategory(c)} style={{
                      padding:'7px 16px', borderRadius:30,
                      border: category===c ? 'none' : '1.5px solid #e2e8f0',
                      background: category===c ? 'linear-gradient(135deg,#2563eb,#0ea5e9)' : '#fff',
                      color: category===c ? '#fff' : '#475569',
                      fontSize:13, fontWeight:700,
                      cursor:'pointer', transition:'all .2s',
                      whiteSpace:'nowrap',
                    }}>{c}</button>
                  ))}
                </div>

                {!loading && !apiError && (
                  <p style={{ margin:'0 0 20px', fontSize:14, color:'#64748b' }}>
                    <strong style={{ color:'#0f172a' }}>{filtered.length}</strong> article{filtered.length!==1?'s':''}
                    {category!=='All'||search ? ' — filtered' : ''}
                  </p>
                )}

                {loading && <Skeleton />}

                {!loading && apiError && (
                  <div style={{ textAlign:'center', padding:'60px 20px' }}>
                    <div style={{ fontSize:48, marginBottom:16 }}>⚠️</div>
                    <h3 style={{ color:'#0f172a', marginBottom:8 }}>Failed to Load</h3>
                    <p style={{ color:'#64748b', marginBottom:20 }}>{apiError}</p>
                    <button onClick={fetchPosts} style={{ padding:'10px 24px', borderRadius:8, background:'linear-gradient(135deg,#2563eb,#0ea5e9)', color:'#fff', border:'none', fontWeight:700, cursor:'pointer' }}>Try Again</button>
                  </div>
                )}

                {!loading && !apiError && filtered.length===0 && (
                  <div style={{ textAlign:'center', padding:'60px 20px', background:'#fff', borderRadius:16, border:'1.5px solid #e8ecf0' }}>
                    <div style={{ fontSize:48, marginBottom:16 }}>📭</div>
                    <h3 style={{ color:'#0f172a', marginBottom:8 }}>No Articles Found</h3>
                    <p style={{ color:'#64748b', marginBottom:20 }}>{search ? `No results for "${search}".` : 'No articles in this category yet.'}</p>
                    <button onClick={() => { setSearch(''); setCategory('All'); }} style={{ padding:'10px 24px', borderRadius:8, background:'linear-gradient(135deg,#2563eb,#0ea5e9)', color:'#fff', border:'none', fontWeight:700, cursor:'pointer' }}>Clear Filters</button>
                  </div>
                )}

                {!loading && !apiError && current.length>0 && (
                  <>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:20 }}>
                      {current.map((post, i) => (
                        <BlogCard key={post.id} post={post} onClick={handlePost} index={i} featured={i===0 && page===1 && category==='All' && !search} />
                      ))}
                    </div>

                    {totalPages>1 && (
                      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:10, marginTop:40 }}>
                        <button disabled={page===1} onClick={() => setPage(p=>p-1)} style={pgBtnStyle(page===1)}>← Prev</button>
                        {[...Array(totalPages)].map((_,i) => (
                          <button key={i} onClick={() => setPage(i+1)} style={{ width:36, height:36, borderRadius:8, border: page===i+1?'none':'1.5px solid #e2e8f0', background: page===i+1?'linear-gradient(135deg,#2563eb,#0ea5e9)':'#fff', color: page===i+1?'#fff':'#475569', fontWeight:700, fontSize:14, cursor:'pointer' }}>{i+1}</button>
                        ))}
                        <button disabled={page===totalPages} onClick={() => setPage(p=>p+1)} style={pgBtnStyle(page===totalPages)}>Next →</button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* right sidebar */}
              <Sidebar recent={recent} onPost={handlePost} search={search} setSearch={setSearch} />
            </div>
          </div>
        </>
      )}

      <style>{`
        .bp-container { max-width:1200px; margin:0 auto; padding-left:24px; padding-right:24px; }
        @keyframes bp-fadeup  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bp-fadein  { from{opacity:0} to{opacity:1} }
        @keyframes bp-pulse   { 0%,100%{opacity:1} 50%{opacity:.45} }
        @media(max-width:900px){ .bp-main-grid { grid-template-columns:1fr !important; } }
        @media(max-width:640px){ .bp-card-grid { grid-template-columns:1fr !important; } }
      `}</style>
      </div>
    </>
  );
}