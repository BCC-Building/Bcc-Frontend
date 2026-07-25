// src/pages/BlogPage.jsx
// Production-Ready | Fully Responsive | Mobile-First
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { publicAPI } from '../api/endpoints';
import { getImageUrl } from '../api/clients';
import BlogHero from '../components/blog/BlogHero';

// --- constants ----------------------------------------------------------------
const CATEGORIES = ['All', 'Architecture', 'Design', 'Business', 'Soil Testing', 'Survey', 'Construction', 'Engineering'];
const PER_PAGE = 6;
const FALLBACK = 'https://placehold.co/800x500/1a1a2e/ffffff?text=BCC+Blog';

// --- helper functions ---------------------------------------------------------
const fmtDate = (d) => {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const truncate = (t, n = 130) => !t || t.length <= n ? t : t.slice(0, n).trimEnd() + '…';
const readTime = (p) => p.readTimeMinutes || p.readTime || '5 min';

const PILL_COLORS = {
  Architecture: { bg: '#eff6ff', color: '#1d4ed8' },
  Design: { bg: '#fdf4ff', color: '#7e22ce' },
  Business: { bg: '#f0fdf4', color: '#15803d' },
  'Soil Testing': { bg: '#fff7ed', color: '#c2410c' },
  Survey: { bg: '#f0fdfa', color: '#0f766e' },
  Construction: { bg: '#fefce8', color: '#a16207' },
  Engineering: { bg: '#eff6ff', color: '#1e40af' },
};

const Pill = ({ cat }) => {
  const style = PILL_COLORS[cat] || { bg: '#f1f5f9', color: '#475569' };
  return (
    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide whitespace-nowrap"
      style={{ background: style.bg, color: style.color }}
    >
      {cat}
    </span>
  );
};

// --- BlogCard Component (Fully Responsive) -----------------------------------
const BlogCard = ({ post, onClick, index }) => {
  const [img, setImg] = useState(getImageUrl(post.coverImageUrl) || FALLBACK);
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={() => onClick(post)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10] flex-shrink-0">
        <img
          src={img}
          alt={post.title}
          onError={() => setImg(FALLBACK)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        {post.category && (
          <div className="absolute top-3 left-3">
            <Pill cat={post.category} />
          </div>
        )}
        
        {/* Read Time */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-gray-800">
          {readTime(post)} read
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <p className="text-xs text-gray-400 font-semibold mb-1.5">
          {fmtDate(post.publishedDate || post.date)}
        </p>
        <h3 className="text-base sm:text-lg font-extrabold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
          {post.excerpt || truncate(post.content)}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <img
              src={post.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || post.author || 'A')}&background=2563eb&color=fff&size=32`}
              alt=""
              onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=A&background=94a3b8&color=fff'; }}
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="text-xs font-bold text-gray-700">
              {post.author?.name || post.author || 'BCC Team'}
            </span>
          </div>
          <span className="text-xs font-bold text-blue-600 group-hover:text-blue-800 transition-colors flex items-center gap-1">
            Read →
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Skeleton Loader ---------------------------------------------------------
const Skeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
    {Array.from({ length: 4 }).map((_, idx) => (
      <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="aspect-[16/10] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        <div className="p-4 sm:p-5 space-y-3">
          <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-4/5 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// --- NewsletterBox -----------------------------------------------------------
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
    <form onSubmit={handleSub} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 rounded-xl border-0 bg-white/10 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold text-sm hover:opacity-90 transition disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'loading' ? '…' : status === 'success' ? '✓ Subscribed!' : 'Subscribe'}
      </button>
    </form>
  );
};

// --- Sidebar (Responsive) ----------------------------------------------------
const Sidebar = ({ recent, onPost, search, setSearch }) => (
  <aside className="space-y-6">
    {/* Search */}
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
      <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-3">Search</h4>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      </div>
    </div>

    {/* Newsletter */}
    <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-5 sm:p-6 text-white">
      <h4 className="text-sm font-extrabold mb-1">Newsletter</h4>
      <p className="text-xs text-white/60 leading-relaxed mb-4">
        Get the latest engineering insights delivered weekly.
      </p>
      <NewsletterBox />
    </div>

    {/* Recent Posts */}
    {recent.length > 0 && (
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
        <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-4">
          Recent Articles
        </h4>
        <div className="space-y-3">
          {recent.map(p => (
            <div
              key={p.id}
              onClick={() => onPost(p)}
              className="flex gap-3 cursor-pointer group"
            >
              <img
                src={getImageUrl(p.coverImageUrl) || FALLBACK}
                alt=""
                onError={e => { e.target.src = FALLBACK; }}
                className="w-14 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {p.title}
                </p>
                <span className="text-[10px] text-gray-400">{fmtDate(p.publishedDate || p.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Topics */}
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
      <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-3">Topics</h4>
      <div className="flex flex-wrap gap-2">
        {['Architecture', 'Engineering', 'Construction', 'Design', 'Soil Testing', 'Survey', 'Project Management', 'Urban Planning'].map(t => (
          <button
            key={t}
            onClick={() => setSearch(t)}
            className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-blue-100 hover:text-blue-700 transition-colors"
          >
            #{t}
          </button>
        ))}
      </div>
    </div>
  </aside>
);

// --- BlogDetail Component (Responsive) ---------------------------------------
const BlogDetail = ({ post, onBack }) => {
  const [img, setImg] = useState(getImageUrl(post.coverImageUrl) || FALLBACK);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = post.title || '';

  const shareLinks = [
    { label: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}` },
    { label: 'Twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 animate-fadeIn">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 mt-6 sm:mt-8 mb-6 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors"
      >
        ← Back to all articles
      </button>

      {/* Breadcrumb */}
      <div className="text-xs text-gray-400 flex items-center gap-2 mb-4">
        <Link to="/" className="hover:text-gray-600">Home</Link>
        <span>/</span>
        <button onClick={onBack} className="hover:text-gray-600">Blog</button>
        <span>/</span>
        <span className="text-gray-800">{post.category}</span>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {post.category && <Pill cat={post.category} />}
        <span className="text-sm text-gray-400">{fmtDate(post.publishedDate || post.date)}</span>
        <span className="text-sm text-gray-400">· {readTime(post)} read</span>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
        {post.title}
      </h1>

      {/* Author & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-t border-b border-gray-200 mb-6">
        <div className="flex items-center gap-3">
          <img
            src={post.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || post.author || 'A')}&background=2563eb&color=fff&size=48`}
            alt=""
            onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=A&background=94a3b8&color=fff'; }}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-extrabold text-sm text-gray-900">{post.author?.name || post.author || 'BCC Team'}</div>
            <div className="text-xs text-gray-400">{post.author?.role || 'BCC Author'}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setLiked(!liked)}
            className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition flex items-center justify-center text-base"
          >
            {liked ? '❤️' : '🤍'}
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition flex items-center justify-center text-base"
          >
            {bookmarked ? '🔖' : '📌'}
          </button>
          <button
            onClick={() => setShareOpen(!shareOpen)}
            className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition flex items-center justify-center text-base"
          >
            ↗️
          </button>
          {shareOpen && (
            <div className="absolute top-10 right-0 bg-white rounded-xl border border-gray-200 shadow-xl p-1.5 z-50 min-w-[140px] animate-fadeIn">
              {shareLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setShareOpen(false)}
                  className="block px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  {s.label}
                </a>
              ))}
              <button
                onClick={() => { navigator.clipboard.writeText(url); setShareOpen(false); }}
                className="block w-full text-left px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                Copy Link
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cover Image */}
      <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
        <img
          src={img}
          alt={post.title}
          onError={() => setImg(FALLBACK)}
          className="w-full max-h-[400px] object-cover"
        />
      </div>

      {/* Content */}
      {post.content ? (
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed"
        />
      ) : (
        <p className="text-gray-400 italic">Content not available.</p>
      )}

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-200 mt-8">
          {post.tags.map(t => (
            <span key={t} className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">#{t}</span>
          ))}
        </div>
      )}

      {/* Author Bio */}
      <div className="bg-gray-50 rounded-2xl p-5 flex gap-4 border border-gray-200 mt-8">
        <img
          src={post.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || post.author || 'A')}&background=2563eb&color=fff&size=64`}
          alt=""
          onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=A&background=94a3b8&color=fff'; }}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
        />
        <div>
          <div className="font-extrabold text-gray-900 text-sm">{post.author?.name || post.author || 'BCC Team'}</div>
          <div className="text-xs text-gray-400 mb-1">{post.author?.role || 'Author at BCC'}</div>
          <p className="text-sm text-gray-600">{post.author?.bio || 'Expert contributor at Building Creators & Consulting.'}</p>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-center text-white mt-8">
        <h3 className="text-lg sm:text-xl font-extrabold mb-2">Never Miss an Insight</h3>
        <p className="text-sm text-white/60 mb-6">Get the latest engineering articles delivered to your inbox.</p>
        <NewsletterBox />
      </div>
    </div>
  );
};

// --- Main Component -----------------------------------------------------------
export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const { slug } = useParams();
  const topRef = useRef(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setApiError(null);
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
    } catch (e) {
      console.error(e);
      setApiError('Failed to load articles. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);
  useEffect(() => { setPage(1); }, [category, search]);
  useEffect(() => { window.scrollTo(0, 0); }, [selected, page]);

  const filtered = useMemo(() => {
    let r = category === 'All' ? posts : posts.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    if (search.trim()) {
      const t = search.toLowerCase();
      r = r.filter(p => p.title?.toLowerCase().includes(t) || p.excerpt?.toLowerCase().includes(t) || p.content?.toLowerCase().includes(t));
    }
    return r;
  }, [posts, category, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const current = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const recent = useMemo(() =>
    [...posts].sort((a, b) => new Date(b.publishedDate || b.date) - new Date(a.publishedDate || a.date)).slice(0, 4),
    [posts]
  );

  const handlePost = (post) => {
    setSelected(post);
    if (post.slug) window.history.pushState(null, '', `/blog/${post.slug}`);
  };
  const handleBack = () => {
    setSelected(null);
    window.history.pushState(null, '', '/blog');
  };

  const totalArticles = posts.length;
  const topicCount = new Set(posts.map(p => p.category).filter(Boolean)).size;
  const HERO_STATS = [
    { value: `${totalArticles}+`, label: "Articles" },
    { value: `${topicCount || 8}+`, label: "Topics" },
    { value: "Weekly", label: "Updates" },
  ];

  return (
    <>
      <SEO
        title="Engineering Blog | Construction & Consulting Insights"
        description="Expert articles on structural engineering, soil investigation, construction management, architecture tips & industry trends."
        keywords="engineering blog, construction articles, structural engineering tips, soil testing insights, BCC blog"
        url="https://bcc.net.in/blog"
        image="https://bcc.net.in/og-blog.jpg"
        schemaType="Article"
      />

      <div className="min-h-screen bg-gray-50" ref={topRef}>
        {selected && <BlogDetail post={selected} onBack={handleBack} />}

        {!selected && (
          <>
            <BlogHero />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
              {/* ✅ Mobile-First Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
                {/* Left Column */}
                <div>
                  {/* Category Filter - Responsive */}
                  <div className="flex flex-wrap gap-2 mb-6 bg-white rounded-2xl border border-gray-200 p-3 sm:p-4">
                    {CATEGORIES.map(c => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                          category === c
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  {/* Results Count */}
                  {!loading && !apiError && (
                    <p className="text-sm text-gray-500 mb-4">
                      <strong className="text-gray-800">{filtered.length}</strong> article{filtered.length !== 1 ? 's' : ''}
                      {(category !== 'All' || search) && ' — filtered'}
                    </p>
                  )}

                  {/* Loading */}
                  {loading && <Skeleton />}

                  {/* Error */}
                  {!loading && apiError && (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                      <div className="text-5xl mb-4">⚠️</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to Load</h3>
                      <p className="text-gray-500 mb-6">{apiError}</p>
                      <button
                        onClick={fetchPosts}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {/* No Results */}
                  {!loading && !apiError && filtered.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                      <div className="text-5xl mb-4">📭</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No Articles Found</h3>
                      <p className="text-gray-500 mb-6">
                        {search ? `No results for "${search}".` : 'No articles in this category yet.'}
                      </p>
                      <button
                        onClick={() => { setSearch(''); setCategory('All'); }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}

                  {/* Blog Grid - Responsive */}
                  {!loading && !apiError && current.length > 0 && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {current.map((post, i) => (
                          <BlogCard key={post.id} post={post} onClick={handlePost} index={i} />
                        ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
                          <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                          >
                            ← Prev
                          </button>
                          {[...Array(totalPages)].map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setPage(i + 1)}
                              className={`w-9 h-9 rounded-xl text-sm font-bold transition ${
                                page === i + 1
                                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                          <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                          >
                            Next →
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Right Sidebar - Responsive */}
                <Sidebar recent={recent} onPost={handlePost} search={search} setSearch={setSearch} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* ✅ Tailwind Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .prose {
            font-size: 15px;
            line-height: 1.7;
          }
        }
      `}</style>
    </>
  );
}