import { useState, useEffect, useMemo, useCallback, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTimes } from 'react-icons/fa';
import { publicAPI } from '../api/endpoints';
import { getImageUrl } from '../api/clients';
import ErrorBoundary from './ErrorBoundary';

// ─── Constants ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'Residential', label: 'Residential' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Industrial', label: 'Industrial' },
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'Renovation', label: 'Renovation' },
  { value: 'Interior', label: 'Interior' },
];

const STATUS = [
  { value: 'all', label: 'All' },
  { value: 'Ongoing', label: 'Ongoing' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Upcoming', label: 'Upcoming' },
];

const PER_PAGE = 9;
const FALLBACK = 'https://placehold.co/800x600/1a1a2e/ffffff?text=BCC+Project';

// ─── Status Pill ─────────────────────────────────────────────────────────────
const StatusPill = memo(({ status }) => {
  const map = {
    Ongoing: { bg: 'bg-blue-100', color: 'text-blue-700' },
    Completed: { bg: 'bg-emerald-100', color: 'text-emerald-700' },
    Upcoming: { bg: 'bg-amber-100', color: 'text-amber-700' },
  };
  const s = map[status] || { bg: 'bg-gray-100', color: 'text-gray-600' };
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${s.bg} ${s.color}`}>
      {status}
    </span>
  );
});

StatusPill.displayName = 'StatusPill';

// ─── Skeleton Loader ─────────────────────────────────────────────────────────
const Skeleton = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-pulse">
        <div className="h-56 bg-gray-200" />
        <div className="p-5 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-2/3" />
        </div>
      </div>
    ))}
  </div>
));

Skeleton.displayName = 'Skeleton';

// ─── Project Card ────────────────────────────────────────────────────────────
const ProjectCard = memo(({ project, onClick }) => {
  const [imgSrc, setImgSrc] = useState(getImageUrl(project.coverImageUrl) || FALLBACK);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(project); }}
      aria-label={`View project: ${project.title}`}
    >
      <div className="relative overflow-hidden h-56 flex-shrink-0">
        <img
          src={imgSrc}
          alt={project.title}
          onError={() => setImgSrc(FALLBACK)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
          <span className="text-white font-bold text-sm flex items-center gap-2">
            View Project <FaArrowRight className="text-xs" />
          </span>
        </div>
        {project.projectType && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-gray-800 uppercase tracking-wide">
            {project.projectType}
          </div>
        )}
        {project.status && (
          <div className="absolute top-3 right-3">
            <StatusPill status={project.status} />
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
          {project.title}
        </h3>
        {project.location && (
          <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            {project.location}
          </p>
        )}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {project.description || 'Professional construction project delivered with quality and precision.'}
        </p>
        <div className="mt-4 h-0.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 group-hover:w-full w-8" />
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

// ─── Project Modal ───────────────────────────────────────────────────────────
const ProjectModal = memo(({ project, onClose }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgErrors, setImgErrors] = useState({});
  const modalRef = useRef(null);

  const allImages = useMemo(() => {
    const imgs = [];
    if (project.coverImageUrl) imgs.push(getImageUrl(project.coverImageUrl));
    (project.imageUrls || []).forEach(u => {
      const g = getImageUrl(u);
      if (g && !imgs.includes(g)) imgs.push(g);
    });
    return imgs.length ? imgs : [FALLBACK];
  }, [project]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveIdx((prev) => (prev + 1) % allImages.length);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, allImages.length]);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto relative animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-lg transition flex items-center justify-center text-xl font-bold text-gray-700 hover:text-gray-900"
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        <div className="flex flex-col md:grid md:grid-cols-2 min-h-[400px]">
          <div className="w-full md:rounded-l-2xl bg-gray-100 p-4 sm:p-6">
            <div className="relative rounded-xl overflow-hidden bg-gray-200 aspect-[4/3] md:aspect-auto md:h-[400px]">
              <img
                src={imgErrors[activeIdx] ? FALLBACK : allImages[activeIdx]}
                alt={`${project.title} - Image ${activeIdx + 1}`}
                onError={() => setImgErrors(prev => ({ ...prev, [activeIdx]: true }))}
                className="w-full h-full object-contain md:object-cover"
              />
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 mt-4 scrollbar-thin">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === activeIdx ? 'border-amber-600 ring-2 ring-amber-200' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={imgErrors[idx] ? FALLBACK : img}
                      alt={`Thumbnail ${idx + 1}`}
                      onError={() => setImgErrors(prev => ({ ...prev, [idx]: true }))}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-5 sm:p-6 md:p-8 flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project.projectType && (
                <span className="text-xs font-bold uppercase tracking-wide text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                  {project.projectType}
                </span>
              )}
              {project.status && <StatusPill status={project.status} />}
            </div>

            <h2 id="modal-title" className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
              {project.title}
            </h2>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 bg-gray-50 rounded-xl p-3 sm:p-4 mb-4">
              {project.clientName && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Client</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">{project.clientName}</p>
                </div>
              )}
              {project.location && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Location</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">{project.location}</p>
                </div>
              )}
              {project.startDate && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Start</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {new Date(project.startDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              )}
              {project.completionDate && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Completed</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {new Date(project.completionDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              )}
            </div>

            {project.description && (
              <div className="mb-4">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {project.testimonial && (
              <blockquote className="border-l-4 border-amber-500 bg-amber-50/50 p-3 sm:p-4 rounded-r-lg mb-4">
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "{project.testimonial}"
                </p>
                {project.clientName && (
                  <footer className="mt-2 text-sm font-bold text-amber-700">
                    — {project.clientName}
                  </footer>
                )}
              </blockquote>
            )}

            <Link
              to="/contact"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-400 text-gray-900 font-bold rounded-xl hover:opacity-90 transition shadow-md"
            >
              Start a Similar Project
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectModal.displayName = 'ProjectModal';

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const gridRef = useRef(null);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setApiError(null);
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
    };
    fetchProjects();
  }, []);

  // Reset page on filter change
  useEffect(() => { setPage(1); }, [filter, statusFilter, search]);

  // Filter projects with useMemo
  const filtered = useMemo(() => {
    return projects.filter(p => {
      const cat = filter === 'all' || p.projectType === filter;
      const stat = statusFilter === 'all' || p.status === statusFilter;
      const srch = !search ||
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.location?.toLowerCase().includes(search.toLowerCase()) ||
        p.clientName?.toLowerCase().includes(search.toLowerCase());
      return cat && stat && srch;
    });
  }, [projects, filter, statusFilter, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const current = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearFilters = () => {
    setFilter('all');
    setStatusFilter('all');
    setSearch('');
    setPage(1);
  };

  return (
    <ErrorBoundary>
      {/* Filters Section */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900">
              Our <span className="text-amber-600 font-medium italic">Projects</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mt-2">
              Explore our portfolio of landmark construction projects spanning residential, commercial, and infrastructure sectors.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button
                  key={c.value}
                  onClick={() => setFilter(c.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                    filter === c.value
                      ? 'bg-gradient-to-r from-amber-600 to-amber-400 text-gray-900 shadow-md'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 flex-1 lg:flex-none"
              >
                {STATUS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>

              <div className="relative flex-1 lg:flex-none">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full lg:w-52 pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Search projects"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-gray-50 py-8 sm:py-12" ref={gridRef}>
        {/* ... Rest of the component remains same ... */}
      </section>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease forwards; }
        .animate-slideUp { animation: slideUp 0.28s ease forwards; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-thin::-webkit-scrollbar { height: 4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </ErrorBoundary>
  );
}