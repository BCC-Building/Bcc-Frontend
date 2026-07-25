// src/components/ProjectsPreview.jsx
// ✅ Arrows + Dots ek saath neeche (Option 1)
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { publicAPI } from '../api/endpoints';
import { getImageUrl } from '../api/clients';

const FALLBACK = 'https://placehold.co/800x600/1a1a2e/ffffff?text=BCC+Project';
const MAX_PROJECTS = 6;
const AUTOPLAY_DELAY = 5000;

const StatusColors = {
  Completed: { bg: 'bg-emerald-100', color: 'text-emerald-700', dot: 'bg-emerald-500' },
  Ongoing: { bg: 'bg-blue-100', color: 'text-blue-700', dot: 'bg-blue-500' },
  Upcoming: { bg: 'bg-amber-100', color: 'text-amber-700', dot: 'bg-amber-500' },
};

// ─── Sub-Components ──────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const style = StatusColors[status] || { bg: 'bg-gray-100', color: 'text-gray-600' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${style.bg} ${style.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot || 'bg-gray-400'}`} />
      {status}
    </span>
  );
};

const Slide = ({ project, isActive }) => {
  const [imgSrc, setImgSrc] = useState(getImageUrl(project.coverImageUrl) || FALLBACK);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`transition-all duration-700 ease-in-out ${
        isActive ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        <div className="grid md:grid-cols-2 min-h-[320px] md:min-h-[400px]">
          <div className="relative h-56 md:h-auto overflow-hidden bg-gray-100">
            <img
              src={imgSrc}
              alt={project.title}
              onError={() => setImgSrc(FALLBACK)}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {project.status && <StatusBadge status={project.status} />}
              {project.projectType && (
                <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {project.projectType}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-2">
              {project.title}
            </h3>
            {(project.location || project.clientName) && (
              <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-3">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                {project.location || project.clientName}
              </p>
            )}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3 mb-4">
              {project.description || 'Professional construction project delivered with quality and precision.'}
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all group"
              aria-label={`View details of ${project.title}`}
            >
              View Project Details
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Skeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 animate-pulse">
    <div className="grid md:grid-cols-2 min-h-[320px] md:min-h-[400px]">
      <div className="h-56 md:h-auto bg-gray-200" />
      <div className="p-6 md:p-8 space-y-4">
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>
        <div className="h-8 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-4/5 bg-gray-100 rounded" />
        </div>
        <div className="h-5 w-32 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

// ─── Dots + Arrows Combined ──────────────────────────────────────────────────

const Navigation = ({ total, current, onClick, onPrev, onNext }) => (
  <div className="flex items-center justify-center gap-4 mt-6">
    {/* Left Arrow */}
    <button
      onClick={onPrev}
      className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-blue-300 transition-all shadow-sm"
      aria-label="Previous project"
    >
      <FaArrowLeft className="text-sm text-gray-600" />
    </button>

    {/* Dots */}
    <div className="flex gap-2" role="tablist" aria-label="Project slides">
      {[...Array(total)].map((_, index) => (
        <button
          key={index}
          onClick={() => onClick(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === current ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to slide ${index + 1}`}
          role="tab"
          aria-selected={index === current}
        />
      ))}
    </div>

    {/* Right Arrow */}
    <button
      onClick={onNext}
      className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-blue-300 transition-all shadow-sm"
      aria-label="Next project"
    >
      <FaArrowRight className="text-sm text-gray-600" />
    </button>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ProjectsPreview() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await publicAPI.getProjects();
        if (res.data?.success) {
          setProjects((res.data.data || []).slice(0, MAX_PROJECTS));
        } else {
          throw new Error(res.data?.message || 'Failed');
        }
      } catch (e) {
        console.error('Projects fetch error:', e);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // ─── Navigation ─────────────────────────────────────────────────────────────
  const goToSlide = useCallback((index) => {
    setCurrentIndex((index + projects.length) % projects.length);
  }, [projects.length]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // ─── Touch Support ─────────────────────────────────────────────────────────
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  // ─── Autoplay ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (projects.length === 0 || isPaused) return;
    const timer = setInterval(nextSlide, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [projects.length, isPaused, nextSlide]);

  // ─── Keyboard Support ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse mb-2" />
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <Skeleton />
        </div>
      </section>
    );
  }

  if (error || projects.length === 0) return null;

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      className="py-12 sm:py-16 bg-gray-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-blue-700 text-[10px] font-bold tracking-wider uppercase">
                Featured Projects
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              The Proof Is in the <span className="text-blue-600">Projects</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mt-1">
              {projects.length} projects • Swipe to explore
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-50 transition whitespace-nowrap"
          >
            View All Projects
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Slider */}
        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {projects.map((project, index) => (
            <Slide
              key={project.id || index}
              project={project}
              isActive={index === currentIndex}
            />
          ))}
        </div>

        {/* ✅ Navigation: Arrows + Dots Ek Saath Neeche */}
        <Navigation
          total={projects.length}
          current={currentIndex}
          onClick={goToSlide}
          onPrev={prevSlide}
          onNext={nextSlide}
        />

        {/* Mobile View All */}
        <div className="text-center mt-6 sm:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
          >
            View All Projects
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
}