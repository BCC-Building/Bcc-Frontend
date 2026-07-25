// src/components/ServicesPreview.jsx
// ✅ Production-Ready | With Image Support
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { services } from '../data/servicesData';

const AUTOPLAY_DELAY = 5000;
const MAX_SERVICES = 6;
const FALLBACK_IMAGE = 'https://placehold.co/800x600/1a1a2e/ffffff?text=BCC+Service';

// ─── Service Slide ──────────────────────────────────────────────────────────
const ServiceSlide = ({ service, isActive }) => {
  const [imgSrc, setImgSrc] = useState(service.image || FALLBACK_IMAGE);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`transition-all duration-700 ease-in-out ${
        isActive ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        <div className="grid md:grid-cols-2 min-h-[320px] md:min-h-[400px]">
          {/* Image - Left Side */}
          <div className="relative h-56 md:h-auto overflow-hidden bg-gray-100">
            <img
              src={imgSrc}
              alt={service.name}
              onError={() => setImgSrc(FALLBACK_IMAGE)}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
            
            {/* Icon Overlay on Image */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-2xl shadow-lg">
              {service.icon}
            </div>

            {/* Category Badge on Image */}
            <div className="absolute top-4 left-4">
              <span className="text-[10px] font-bold uppercase tracking-wide text-purple-600 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                {service.category}
              </span>
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-2">
              {service.name}
            </h3>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3 mb-4">
              {service.shortDesc || service.desc || 'Professional service delivered with quality and precision.'}
            </p>

            {/* Features Preview - 3 features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {service.features?.slice(0, 3).map((feature, idx) => (
                <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                  ✓ {feature.length > 20 ? feature.slice(0, 20) + '…' : feature}
                </span>
              ))}
              {service.features?.length > 3 && (
                <span className="text-xs bg-purple-100 text-purple-600 px-2.5 py-1 rounded-full font-semibold">
                  +{service.features.length - 3} more
                </span>
              )}
            </div>

            <Link
              to={`/services/${service.slug}`}
              className="inline-flex items-center gap-2 text-purple-600 font-bold text-sm hover:gap-3 transition-all group"
            >
              Learn More
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Accent Line */}
            <div className="mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Navigation ──────────────────────────────────────────────────────────────
const Navigation = ({ total, current, onClick, onPrev, onNext }) => (
  <div className="flex items-center justify-center gap-4 mt-6">
    <button
      onClick={onPrev}
      className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-purple-300 transition-all shadow-sm"
      aria-label="Previous service"
    >
      <FaArrowLeft className="text-sm text-gray-600" />
    </button>

    <div className="flex gap-2" role="tablist">
      {[...Array(total)].map((_, index) => (
        <button
          key={index}
          onClick={() => onClick(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === current ? 'w-8 bg-purple-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to slide ${index + 1}`}
          role="tab"
          aria-selected={index === current}
        />
      ))}
    </div>

    <button
      onClick={onNext}
      className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-purple-300 transition-all shadow-sm"
      aria-label="Next service"
    >
      <FaArrowRight className="text-sm text-gray-600" />
    </button>
  </div>
);

// ─── Skeleton ────────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 animate-pulse">
    <div className="grid md:grid-cols-2 min-h-[320px] md:min-h-[400px]">
      <div className="h-56 md:h-auto bg-gray-200" />
      <div className="p-6 md:p-8 space-y-4">
        <div className="h-8 w-3/4 bg-gray-200 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-4/5 bg-gray-100 rounded" />
          <div className="h-4 w-3/4 bg-gray-100 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
        </div>
        <div className="h-5 w-32 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ServicesPreview() {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const displayServices = services.slice(0, MAX_SERVICES);

  // ─── Navigation ─────────────────────────────────────────────────────────────
  const goToSlide = useCallback((index) => {
    setCurrentIndex((index + displayServices.length) % displayServices.length);
  }, [displayServices.length]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // ─── Autoplay ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (displayServices.length === 0 || isPaused) return;
    const timer = setInterval(nextSlide, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [displayServices.length, isPaused, nextSlide]);

  // ─── Keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // ─── Touch ─────────────────────────────────────────────────────────────────
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

  // ─── Loading ──────────────────────────────────────────────────────────────
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-gray-50">
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

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      className="py-16 md:py-20 bg-gray-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
              <span className="text-purple-700 text-[10px] font-bold tracking-wider uppercase">
                Our Services
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              What We <span className="text-purple-600">Offer</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mt-1">
              {displayServices.length} services • Swipe to explore
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-purple-600 text-purple-600 font-bold text-sm hover:bg-purple-50 transition whitespace-nowrap"
          >
            View All Services
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Slider */}
        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {displayServices.map((service, index) => (
            <ServiceSlide
              key={service.id}
              service={service}
              isActive={index === currentIndex}
            />
          ))}
        </div>

        {/* Navigation */}
        <Navigation
          total={displayServices.length}
          current={currentIndex}
          onClick={goToSlide}
          onPrev={prevSlide}
          onNext={nextSlide}
        />

        {/* Mobile View All */}
        <div className="text-center mt-6 sm:hidden">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition"
          >
            View All Services
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
}