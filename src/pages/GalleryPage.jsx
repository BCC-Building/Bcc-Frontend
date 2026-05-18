// src/pages/GalleryPage.jsx – Hero updated to ink & gold brand style
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { getMediaUrl } from "../utils/media";
import { publicAPI } from "../api/endpoints";

// ==================== CONSTANTS ====================

const CATEGORIES = [
  { id: "all", name: "All Projects", icon: "🎯" },
  { id: "Construction", name: "Construction", icon: "🏗️" },
  { id: "Interior", name: "Interior Design", icon: "🛋️" },
  { id: "Survey", name: "Survey Work", icon: "📏" },
  { id: "Testing", name: "Testing", icon: "🔬" },
];

const ITEMS_PER_PAGE = 6;

// Trust badges (same style as About hero)
const TRUST_BADGES = [
  "1200+ Projects Delivered",
  "98% Client Satisfaction",
  "15+ Cities Covered",
];

// Hero stats
const HERO_STATS = [
  { value: "1200+", label: "Projects\nCompleted" },
  { value: "10+", label: "Cities\nServed" },
  { value: "98%", label: "Client\nSatisfaction" },
];

// ==================== SUB-COMPONENTS ====================

const ImageWithFallback = ({ src, alt, className, onLoad }) => {
  const [status, setStatus] = useState("loading");
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    const img = imgRef.current;
    if (!img) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.src = src;
            observerRef.current.unobserve(img);
          }
        });
      },
      { rootMargin: "100px" }
    );
    observerRef.current.observe(img);
    return () => observerRef.current?.disconnect();
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {status === "loading" && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center">
          <span className="text-4xl mb-2">🖼️</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Image unavailable</span>
        </div>
      )}
      <img
        ref={imgRef}
        alt={alt}
        className={`${className} ${status === "loaded" ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        onLoad={() => {
          setStatus("loaded");
          onLoad?.();
        }}
        onError={() => setStatus("error")}
      />
    </div>
  );
};

const GalleryCard = ({ item, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ y: -6 }}
    className="group cursor-pointer"
    onClick={() => onClick(item)}
    role="button"
    aria-label={`View details of ${item.title}`}
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick(item)}
  >
    <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
        <ImageWithFallback
          src={getMediaUrl(item.imageUrl || item.thumbnail)}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full shadow-lg">
            {item.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
          <p className="text-gray-200 text-sm mb-2">{item.location}</p>
          {item.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-white/20 rounded-full text-white backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">{item.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span className="truncate flex-1 mr-2">📍 {item.location}</span>
          <span className="flex-shrink-0">{item.date}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md">
        <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

// ==================== HERO ILLUSTRATION (Gallery‑themed SVG) ====================
function GalleryIllustration() {
  return (
    <svg
      viewBox="0 0 520 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 480, height: 'auto', position: 'relative', zIndex: 1 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldGrad3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8864a" />
          <stop offset="100%" stopColor="#e8c99a" />
        </linearGradient>
        <pattern id="gridGallery" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(200,134,74,0.08)" strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect width="520" height="600" fill="url(#gridGallery)" />

      {/* Central frame (portfolio / lightbox) */}
      <rect x="120" y="100" width="280" height="340" rx="12" fill="rgba(200,134,74,0.04)" stroke="rgba(200,134,74,0.4)" strokeWidth="1.5" />
      <rect x="135" y="115" width="250" height="250" rx="8" fill="rgba(18,16,14,0.4)" stroke="rgba(200,134,74,0.25)" strokeWidth="0.8" />
      
      {/* Image placeholder inside frame */}
      <path d="M160 180 L240 140 L300 190 L340 160 L360 200 L360 330 L160 330 Z" fill="rgba(200,134,74,0.08)" stroke="rgba(200,134,74,0.3)" strokeWidth="0.6" strokeDasharray="3,3" />
      
      {/* Small thumbnails */}
      <rect x="135" y="385" width="55" height="40" rx="4" fill="rgba(200,134,74,0.1)" stroke="rgba(200,134,74,0.3)" strokeWidth="0.8" />
      <rect x="200" y="385" width="55" height="40" rx="4" fill="rgba(200,134,74,0.1)" stroke="rgba(200,134,74,0.3)" strokeWidth="0.8" />
      <rect x="265" y="385" width="55" height="40" rx="4" fill="rgba(200,134,74,0.1)" stroke="rgba(200,134,74,0.3)" strokeWidth="0.8" />
      <rect x="330" y="385" width="55" height="40" rx="4" fill="rgba(200,134,74,0.1)" stroke="rgba(200,134,74,0.3)" strokeWidth="0.8" />

      {/* Floating award card */}
      <g transform="translate(30, 50)">
        <rect width="100" height="80" rx="3" fill="rgba(18,16,14,0.65)" stroke="rgba(200,134,74,0.5)" strokeWidth="0.8" />
        <circle cx="50" cy="35" r="16" fill="none" stroke="url(#goldGrad3)" strokeWidth="1.2" />
        <text x="50" y="39" textAnchor="middle" fill="#c8864a" fontSize="8" fontFamily="'Jost',sans-serif" fontWeight="600">★</text>
        <text x="50" y="16" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="'Jost',sans-serif" letterSpacing="1">AWARD</text>
        <text x="50" y="62" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="'Jost',sans-serif">Best Portfolio</text>
        <text x="50" y="73" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="'Jost',sans-serif">2024</text>
      </g>

      {/* Performance card */}
      <g transform="translate(380, 120)">
        <rect width="110" height="90" rx="3" fill="rgba(18,16,14,0.7)" stroke="rgba(200,134,74,0.4)" strokeWidth="0.8" />
        <text x="12" y="20" fill="rgba(200,134,74,0.8)" fontSize="7" fontFamily="'Jost',sans-serif" letterSpacing="1.2" fontWeight="600">REACH</text>
        <text x="12" y="48" fill="#c8864a" fontSize="26" fontFamily="'Cormorant Garamond',serif" fontWeight="300">10+</text>
        <text x="12" y="62" fill="rgba(255,255,255,0.45)" fontSize="7.5" fontFamily="'Jost',sans-serif" fontWeight="300">Cities Covered</text>
        <line x1="12" y1="70" x2="98" y2="70" stroke="rgba(200,134,74,0.3)" strokeWidth="0.5" />
        <text x="12" y="84" fill="rgba(255,255,255,0.4)" fontSize="6.5" fontFamily="'Jost',sans-serif">Nationwide Presence</text>
      </g>

      {/* Connecting lines */}
      <line x1="130" y1="90" x2="180" y2="110" stroke="rgba(200,134,74,0.25)" strokeWidth="0.6" strokeDasharray="3,4" />
      <line x1="380" y1="170" x2="490" y2="145" stroke="rgba(200,134,74,0.25)" strokeWidth="0.6" strokeDasharray="3,4" />
      
      <circle cx="130" cy="90" r="3" fill="rgba(200,134,74,0.7)" />
      <circle cx="490" cy="145" r="3" fill="rgba(200,134,74,0.7)" />

      {/* Bottom label */}
      <text x="260" y="520" textAnchor="middle" fill="rgba(200,134,74,0.6)" fontSize="8" fontFamily="'Jost',sans-serif" letterSpacing="2.5" fontWeight="400">PROJECT GALLERY</text>
      <text x="260" y="538" textAnchor="middle" fill="rgba(200,134,74,0.35)" fontSize="6.5" fontFamily="'Jost',sans-serif" letterSpacing="1.5">BUILDING CREATORS & CONSULTING</text>
    </svg>
  );
}

// ==================== MAIN COMPONENT ====================
export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const fetchGalleryData = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await publicAPI.getGallery();
      if (response.data?.success) {
        setGalleryData(response.data.data || []);
      } else throw new Error(response.data?.message || "Failed to load gallery");
    } catch (err) {
      console.error("Gallery fetch error:", err);
      setApiError("Failed to load gallery items. Please try again later.");
      setGalleryData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGalleryData();
  }, [fetchGalleryData]);

  const filteredImages = useMemo(() => {
    let filtered = galleryData;
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (item) => item.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(term) ||
          item.location?.toLowerCase().includes(term)
      );
    }
    return filtered;
  }, [galleryData, activeCategory, searchTerm]);

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const currentImages = useMemo(
    () =>
      filteredImages.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [filteredImages, currentPage]
  );

  useEffect(() => setCurrentPage(1), [activeCategory, searchTerm]);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedImage) setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  // ─── Inline styles for the new hero (scoped) ───
  const heroStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
    .gallery-hero-wrapper {
      background: #12100e;
      overflow: hidden;
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .gallery-hero-left {
      padding: 7rem 4rem 7rem 5rem;
      position: relative;
      z-index: 2;
    }
    .gallery-hero-eyebrow {
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
    .gallery-hero-eyebrow::before {
      content: '';
      display: block;
      width: 32px;
      height: 1px;
      background: #c8864a;
    }
    .gallery-hero-h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(3rem, 5.5vw, 5.5rem);
      font-weight: 400;
      line-height: 1.06;
      color: #ffffff;
      margin: 0 0 1.5rem;
      letter-spacing: -0.01em;
    }
    .gallery-hero-h1 em {
      font-style: italic;
      color: #c8864a;
    }
    .gallery-hero-desc {
      font-family: 'Jost', sans-serif;
      font-size: 16px;
      font-weight: 300;
      line-height: 1.85;
      color: rgba(255,255,255,0.5);
      max-width: 460px;
      margin: 0 0 2.5rem;
    }
    .gallery-hero-desc strong {
      color: rgba(255,255,255,0.85);
      font-weight: 400;
    }
    .gallery-hero-ctas {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 3rem;
    }
    .gallery-btn-primary {
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
    .gallery-btn-primary:hover { background: #e8c99a; transform: translateY(-2px); }
    .gallery-btn-secondary {
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
    .gallery-btn-secondary:hover { border-color: rgba(255,255,255,0.4); color: #ffffff; }
    .gallery-hero-trust {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
    }
    .gallery-hero-trust-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(255,255,255,0.45);
      font-size: 12px;
      font-weight: 500;
    }
    .gallery-hero-trust-item svg { color: #c8864a; }
    .gallery-hero-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 2.5rem;
      max-width: 480px;
      margin-top: 2rem;
    }
    .gallery-hero-stat {
      padding-right: 24px;
      border-right: 1px solid rgba(255,255,255,0.1);
    }
    .gallery-hero-stat:last-child { border-right: none; }
    .gallery-hero-stat-val {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1.8rem, 3vw, 2.6rem);
      font-weight: 300;
      line-height: 1;
      color: #c8864a;
      display: block;
    }
    .gallery-hero-stat-lbl {
      font-family: 'Jost', sans-serif;
      font-size: 10.5px;
      font-weight: 300;
      color: rgba(255,255,255,0.4);
      display: block;
      margin-top: 5px;
      line-height: 1.5;
      white-space: pre-line;
    }
    .gallery-hero-right {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 3rem;
    }
    .gallery-hero-right::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(200,134,74,0.06) 0%, rgba(200,134,74,0.02) 100%);
      border-left: 1px solid rgba(200,134,74,0.2);
    }
    @media (max-width: 900px) {
      .gallery-hero-wrapper { grid-template-columns: 1fr; min-height: auto; }
      .gallery-hero-left { padding: 5rem 1.5rem 3rem; }
      .gallery-hero-right { display: none; }
    }
  `;

  return (
    <>
      <Helmet>
        <title>Project Gallery | Building Creators & Consulting</title>
        <meta name="description" content="Explore our portfolio of engineering and construction projects." />
        <meta name="keywords" content="construction gallery, engineering projects, architecture portfolio" />
        <link rel="canonical" href="https://bcc.net.in/gallery" />
      </Helmet>

      <style>{heroStyles}</style>

      {/* ════════════ HERO (INK & GOLD) ════════════ */}
      <section className="gallery-hero-wrapper" aria-label="Gallery hero">
        <div className="gallery-hero-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="gallery-hero-eyebrow">Our Portfolio</p>
          </motion.div>

          <motion.h1
            className="gallery-hero-h1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Project{" "}
            <em>Gallery</em>
          </motion.h1>

          <motion.p
            className="gallery-hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Explore our finest work across <strong>engineering, construction, and design</strong>. 
            Every project reflects our commitment to precision and excellence.
          </motion.p>

          <motion.div
            className="gallery-hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Link to="/contact" className="gallery-btn-primary">
              Start Your Project <FaArrowRight />
            </Link>
            <Link to="/services" className="gallery-btn-secondary">
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            className="gallery-hero-trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {TRUST_BADGES.map((badge, i) => (
              <span key={i} className="gallery-hero-trust-item">
                <FaCheckCircle /> {badge}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="gallery-hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {HERO_STATS.map((s, i) => (
              <div className="gallery-hero-stat" key={i}>
                <span className="gallery-hero-stat-val">{s.value}</span>
                <span className="gallery-hero-stat-lbl">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="gallery-hero-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          aria-hidden="true"
        >
          <GalleryIllustration />
        </motion.div>
      </section>

      {/* ════════════ FILTER SECTION (unchanged) ════════════ */}
      <section className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                aria-label="Search gallery projects"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-2" aria-label="Gallery categories">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                aria-pressed={activeCategory === category.id}
                aria-label={`Filter by ${category.name}`}
              >
                <span aria-hidden="true">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* ════════════ GALLERY CONTENT (unchanged) ════════════ */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && <LoadingSkeleton />}

          {!isLoading && apiError && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Failed to Load Gallery</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{apiError}</p>
              <button onClick={fetchGalleryData} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !apiError && (
            <>
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                  <span>📷</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Showing <strong className="text-blue-600 dark:text-blue-400">{currentImages.length}</strong> of{" "}
                    <strong className="text-blue-600 dark:text-blue-400">{filteredImages.length}</strong> projects
                  </span>
                </div>
              </div>

              {filteredImages.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No projects found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">We couldn't find any projects matching "{searchTerm}"</p>
                  <button
                    onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                      {currentImages.map((item) => (
                        <GalleryCard key={item.id} item={item} onClick={setSelectedImage} />
                      ))}
                    </AnimatePresence>
                  </div>

                  {totalPages > 1 && (
                    <nav className="flex justify-center items-center gap-3 mt-12" aria-label="Gallery pagination">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-5 py-2.5 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium"
                        aria-label="Previous page"
                      >
                        ← Previous
                      </button>

                      <div className="flex gap-1.5">
                        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                          let pageNum;
                          if (totalPages <= 5) pageNum = i + 1;
                          else if (currentPage <= 3) pageNum = i + 1;
                          else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                          else pageNum = currentPage - 2 + i;

                          if (pageNum > 0 && pageNum <= totalPages) {
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                                  currentPage === pageNum
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                                    : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500"
                                }`}
                                aria-label={`Go to page ${pageNum}`}
                                aria-current={currentPage === pageNum ? "page" : undefined}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                          return null;
                        })}
                      </div>

                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-5 py-2.5 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium"
                        aria-label="Next page"
                      >
                        Next →
                      </button>
                    </nav>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* ════════════ LIGHTBOX (unchanged) ════════════ */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
            role="dialog"
            aria-modal="true"
            aria-label={`Viewing ${selectedImage.title}`}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getMediaUrl(selectedImage.imageUrl || selectedImage.src)}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-bold mb-1">{selectedImage.title}</h3>
                <p className="text-gray-300 text-sm">{selectedImage.location}</p>
                {selectedImage.description && (
                  <p className="text-gray-400 text-sm mt-2">{selectedImage.description}</p>
                )}
                {selectedImage.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedImage.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 bg-white/20 rounded-full text-white backdrop-blur-sm">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center text-lg transition-colors"
                aria-label="Close lightbox"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════ CTA SECTION (original colors kept) ════════════ */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-lg mb-8 text-blue-100 max-w-xl mx-auto">
            Let's bring your vision to life. Get a free consultation today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="px-8 py-3.5 bg-white text-blue-600 rounded-full font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              Start Your Project →
            </Link>
            <Link to="/services" className="px-8 py-3.5 border-2 border-white/80 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}