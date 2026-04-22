// src/pages/GalleryPage.jsx - Fixed Working Version
import { useState, useEffect, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Categories Data
const CATEGORIES = [
  { id: "all", name: "All Projects", icon: "🎯" },
  { id: "Construction", name: "Construction", icon: "🏗️" },
  { id: "Interior", name: "Interior Design", icon: "🛋️" },
  { id: "Survey", name: "Survey Work", icon: "📏" },
  { id: "Testing", name: "Testing", icon: "🔬" },
];

// Gallery Data with working images
const GALLERY_DATA = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
    category: "Construction",
    title: "High Rise Commercial Tower",
    location: "Pune, Maharashtra",
    date: "2024",
    description: "45-story commercial tower with sustainable design",
    tags: ["Commercial", "High-Rise", "Modern"]
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&h=600&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400&h=300&fit=crop",
    category: "Interior",
    title: "Luxury Penthouse Interior",
    location: "Mumbai, Maharashtra",
    date: "2024",
    description: "Modern minimalist interior with premium finishes",
    tags: ["Luxury", "Modern", "Residential"]
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    category: "Survey",
    title: "Topographical Land Survey",
    location: "Delhi NCR",
    date: "2024",
    description: "Precision land surveying using drone technology",
    tags: ["Survey", "Drone", "Technology"]
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",
    category: "Interior",
    title: "5-Star Hotel Lobby",
    location: "Goa",
    date: "2024",
    description: "Elegant hotel lobby design with natural elements",
    tags: ["Hotel", "Luxury", "Commercial"]
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1529429611270-5b6d27bdf3a5?w=800&h=600&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1529429611270-5b6d27bdf3a5?w=400&h=300&fit=crop",
    category: "Construction",
    title: "Luxury Residential Villa",
    location: "Bangalore, Karnataka",
    date: "2024",
    description: "Modern villa with sustainable architecture",
    tags: ["Villa", "Residential", "Luxury"]
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    category: "Construction",
    title: "Corporate Office Complex",
    location: "Pune, Maharashtra",
    date: "2024",
    description: "LEED-certified commercial building",
    tags: ["Commercial", "Corporate", "Green Building"]
  }
];

// Simple Image Component - No complex lazy loading
const GalleryCard = ({ item, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            const img = imgRef.current;
            img.src = item.thumbnail;
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [item.thumbnail]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={() => onClick(item)}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-slate-800">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-slate-700">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            ref={imgRef}
            data-src={item.thumbnail}
            alt={item.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
              {item.category}
            </span>
          </div>
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-gray-200 text-sm">{item.location}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags?.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-white/20 rounded-full text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Info Footer */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-1 truncate">
            {item.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span className="truncate">{item.location}</span>
            <span>{item.date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Gallery Component
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  // Filter images based on category and search
  const filteredImages = useMemo(() => {
    let filtered = GALLERY_DATA;
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [activeCategory, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const currentImages = filteredImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <>
      <Helmet>
        <title>Project Gallery | Building Creators & Consulting</title>
        <meta name="description" content="Explore our portfolio of engineering and construction projects. View our completed works including residential, commercial, and industrial projects." />
        <meta name="keywords" content="construction gallery, engineering projects, architecture portfolio, interior design projects" />
        <link rel="canonical" href="https://buildingcreators.com/gallery" />
        <meta property="og:title" content="Project Gallery | BCC Engineering Portfolio" />
        <meta property="og:description" content="View our completed engineering and construction projects" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://buildingcreators.com/gallery" />
        <meta property="og:image" content={GALLERY_DATA[0]?.src} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <span className="text-2xl">📸</span>
                <span className="text-sm font-semibold">Our Portfolio</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Project <span className="text-blue-400">Gallery</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Explore our finest work across engineering, construction, and design
              </p>
              
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                  <span>✅</span>
                  <span className="text-sm">{GALLERY_DATA.length}+ Projects</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                  <span>📍</span>
                  <span className="text-sm">10+ Cities</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                  <span>⭐</span>
                  <span className="text-sm">98% Satisfaction</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search projects by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 pl-12 rounded-full border-2 border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:outline-none transition-all bg-white dark:bg-slate-800"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                      : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Info */}
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                <span>📷</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <strong className="text-blue-600">{currentImages.length}</strong> of <strong>{filteredImages.length}</strong> projects
                </span>
              </div>
            </div>

            {/* No Results */}
            {filteredImages.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No projects found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We couldn't find any projects matching "{searchTerm}"
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {currentImages.map((item) => (
                      <GalleryCard key={item.id} item={item} onClick={setSelectedImage} />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-3 mt-12">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-5 py-2 rounded-lg bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500 disabled:opacity-50 transition-all"
                    >
                      ← Previous
                    </button>
                    
                    <div className="flex gap-2">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        if (pageNum > 0 && pageNum <= totalPages) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-10 h-10 rounded-lg transition-all ${
                                currentPage === pageNum
                                  ? "bg-blue-600 text-white shadow-md"
                                  : "bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                        return null;
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-5 py-2 rounded-lg bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500 disabled:opacity-50 transition-all"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-[90vw] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white text-xl font-bold mb-1">{selectedImage.title}</h3>
                  <p className="text-gray-300">{selectedImage.location}</p>
                  <p className="text-gray-400 text-sm mt-2">{selectedImage.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedImage.tags?.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-white/20 rounded-full text-white">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 mt-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Let's bring your vision to life. Get a free consultation today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Start Your Project →
              </Link>
              <Link
                to="/services"
                className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}