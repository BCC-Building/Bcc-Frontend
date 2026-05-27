// src/pages/GalleryPage.jsx
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import { getMediaUrl } from "../utils/media";
import { publicAPI } from "../api/endpoints";
import GalleryHero from "../components/gallery/GalleryHero";

// ==================== CONSTANTS ====================

const CATEGORIES = [
  { id: "all", name: "All Projects" },
  { id: "Construction", name: "Construction" },
  { id: "Interior", name: "Interior Design" },
  { id: "Survey", name: "Survey Work" },
  { id: "Testing", name: "Testing" },
];

const ITEMS_PER_PAGE = 6;

// Trust badges (same style as About hero)
const TRUST_BADGES = [
  "1200+ Projects Delivered",
  "98% Client Satisfaction",
  "10+ States Covered",
];

// Hero stats
const HERO_STATS = [
  { value: "1200+", label: "Projects\nCompleted" },
  { value: "10+", label: "States\nServed" },
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
          <span className="text-3xl mb-2 font-semibold text-gray-500">Image</span>
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
          <span className="truncate flex-1 mr-2">{item.location}</span>
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



  return (
    <>
      <SEO
        title="Project Gallery | BCC Construction Portfolio"
        description="Browse 1200+ completed construction projects including architectural designs, structural work, surveys & testing services across India. View our portfolio."
        keywords="construction projects, architectural portfolio, structural engineering projects, project gallery, construction gallery, engineering portfolio India"
        url="https://bcc.net.in/gallery"
        image="https://bcc.net.in/og-gallery.jpg"
      />

      {/* HERO */}
      <GalleryHero />

      {/* FILTER SECTION */}
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
                  x
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
                {category.icon && <span aria-hidden="true">{category.icon}</span>}
                <span>{category.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* GALLERY CONTENT */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && <LoadingSkeleton />}

          {!isLoading && apiError && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4 font-bold text-amber-500">!</div>
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
                  <span className="font-semibold text-blue-600">Gallery</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Showing <strong className="text-blue-600 dark:text-blue-400">{currentImages.length}</strong> of{" "}
                    <strong className="text-blue-600 dark:text-blue-400">{filteredImages.length}</strong> projects
                  </span>
                </div>
              </div>

              {filteredImages.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4 font-bold text-gray-400">No results</div>
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
                        Previous
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
                        Next
                      </button>
                    </nav>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
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
                x
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-lg mb-8 text-blue-100 max-w-xl mx-auto">
            Let's bring your vision to life. Get a free consultation today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="px-8 py-3.5 bg-white text-blue-600 rounded-full font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              Start Your Project
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


