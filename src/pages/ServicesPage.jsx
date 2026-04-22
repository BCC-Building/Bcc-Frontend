// src/pages/ServicesPage.jsx - Optimized with Tailwind CSS
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { services, categories } from "../data/servicesData";

function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;
  const heroRef = useRef(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const currentServices = filteredServices.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Stats with animation
  const stats = [
    { number: `${services.length}+`, label: "Expert Services", icon: "🏗️", delay: 0.1 },
    { number: "1000+", label: "Projects Completed", icon: "🏆", delay: 0.2 },
    { number: "98%", label: "Client Satisfaction", icon: "⭐", delay: 0.3 },
    { number: "24/7", label: "Technical Support", icon: "🛠️", delay: 0.4 }
  ];

  return (
    <>
     <Helmet>
  <title>Our Services | Architecture, Soil Testing, NDT, Survey & More | BCC Rudrapur</title>
  <meta name="description" content="BCC offers 14+ expert services in Rudrapur, Uttarakhand — Architecture, Structure Design, Interior Design, Soil Investigation, NDT, Material Testing, Survey, Bridge Design, Irrigation, Water Supply, Plate Load Test & Estimation Consultancy." />
  <meta name="keywords" content="architecture Rudrapur, soil testing Uttarakhand, NDT testing Rudrapur, land survey Uttarakhand, structure design Rudrapur, interior design Rudrapur, bridge design Uttarakhand, material testing Rudrapur, irrigation design, water supply design, plate load test, estimation consultancy Rudrapur" />
  <link rel="canonical" href="https://yoursite.com/services" />
  <meta property="og:title" content="Services | BCC Building Creators & Consulting Rudrapur" />
  <meta property="og:description" content="14+ professional services — Architecture, Soil Testing, NDT, Survey Work, Bridge Design & more in Rudrapur, Uttarakhand." />
  <meta property="og:url" content="https://yoursite.com/services" />
</Helmet>

      <div className="font-sans overflow-x-hidden">
        {/* Enhanced Hero Section with Parallax */}
      {/* ==================== REDESIGNED HERO SECTION ==================== */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Premium Background - Clean Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
  
  {/* Subtle Pattern Overlay */}
  <div className="absolute inset-0 opacity-10" style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: '30px 30px'
  }}></div>
  
  {/* Subtle Gradient Overlay for Depth */}
  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
  
  <div className="container mx-auto px-4 md:px-6 relative z-10">
    <div className="max-w-5xl mx-auto">
      
      {/* Professional Badge */}
      <motion.div 
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-sm text-white/90 font-medium">Trusted Since 2010</span>
        </div>
      </motion.div>
      
      {/* Main Heading - Crystal Clear */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          We Provide{' '}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Engineering Excellence
          </span>
          <br />
          <span className="text-white/90">That Builds Tomorrow</span>
        </h1>
      </motion.div>
      
      {/* Description - Clear and Readable */}
      <motion.p 
        className="text-center text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        From concept to completion, we deliver innovative engineering solutions 
        that stand the test of time. <span className="text-white font-semibold">{services.length}+ specialized services</span> 
        tailored to your needs.
      </motion.p>
      
      {/* CTA Buttons - Clear and Actionable */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link 
          to="/contact" 
          className="group px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
        >
          Start Your Project
          <svg className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        
        <Link 
          to="/portfolio" 
          className="px-8 py-3.5 rounded-full font-semibold text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-center backdrop-blur-sm"
        >
          View Our Work
        </Link>
      </motion.div>
      
      {/* Stats - Clean Numbers */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {[
          { value: "15+", label: "Years Experience", color: "text-blue-400" },
          { value: "500+", label: "Projects Done", color: "text-cyan-400" },
          { value: "98%", label: "Satisfaction", color: "text-teal-400" },
          { value: "24/7", label: "Support", color: "text-emerald-400" }
        ].map((stat, idx) => (
          <div key={idx} className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </motion.div>
      
      {/* Trust Badges */}
      <motion.div 
        className="flex flex-wrap justify-center gap-6 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>ISO 9001:2015 Certified</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>NABL Accredited Lab</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>100% Client Satisfaction</span>
        </div>
      </motion.div>
    </div>
  </div>
</section>
        {/* Filter Section - Enhanced */}
        <section className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-md mx-auto mb-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="🔍 Search services by name, category, or keyword..." 
                  className="w-full px-5 py-3 pl-12 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                  {category !== "All" && (
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === category ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      {services.filter(s => s.category === category).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid - Enhanced */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm text-gray-600">
                <span>🔍</span>
                <span>Showing <strong className="text-purple-600">{currentServices.length}</strong> of <strong>{filteredServices.length}</strong> services</span>
              </div>
            </div>
            
            {filteredServices.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No services found</h3>
                <p className="text-gray-600 mb-6">We couldn't find any services matching "{searchTerm}"</p>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                          <span className="text-2xl">{service.icon}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span className="text-white text-sm font-semibold">{service.category}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{service.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{service.shortDesc}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            ✓ {feature.length > 25 ? feature.substring(0, 25) + '...' : feature}
                          </span>
                        ))}
                        {service.features.length > 2 && (
                          <span className="text-xs text-purple-600 px-2 py-1">
                            +{service.features.length - 2} more
                          </span>
                        )}
                      </div>
                      
                      <Link 
                        to={`/services/${service.slug}`} 
                        className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all group"
                      >
                        Learn More
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button 
                  className="px-5 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-purple-500 disabled:opacity-50 transition-all hover:shadow-md"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
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
                          className={`w-10 h-10 rounded-lg transition-all ${
                            currentPage === pageNum 
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                              : 'bg-white border-2 border-gray-200 hover:border-purple-500'
                          }`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
                <button 
                  className="px-5 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-purple-500 disabled:opacity-50 transition-all hover:shadow-md"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Enhanced CTA Section with Better Text Visibility */}
        <section className="relative py-24 overflow-hidden">
          {/* Premium Background with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"></div>
          
          {/* Animated Background Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
          </div>
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Trust Badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm text-white">Trusted by 1000+ Clients</span>
              </motion.div>
              
              {/* Main CTA Title */}
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Ready to Transform Your
                <span className="block gradient-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Vision into Reality?
                </span>
              </motion.h2>
              
              {/* Description with Better Contrast */}
              <motion.p 
                className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Join <span className="text-purple-400 font-bold">1000+ satisfied clients</span> who trusted us with their projects.
                Get expert consultation and a customized quote within <span className="text-purple-400">24 hours</span>.
              </motion.p>
              
              {/* Enhanced CTA Buttons */}
              <motion.div 
                className="flex flex-wrap gap-4 justify-center mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  to="/contact" 
                  className="group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Free Consultation
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                
                <Link 
                  to="/portfolio" 
                  className="px-8 py-4 rounded-full font-semibold text-white border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:-translate-y-1"
                >
                  View Success Stories
                </Link>
              </motion.div>
              
              {/* Trust Indicators with Icons */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {[
                  { icon: "✓", text: "Free Quote", bg: "bg-green-500/20" },
                  { icon: "✓", text: "No Obligation", bg: "bg-blue-500/20" },
                  { icon: "⚡", text: "24hr Response", bg: "bg-yellow-500/20" },
                  { icon: "🏆", text: "100% Satisfaction", bg: "bg-purple-500/20" }
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full ${item.bg} backdrop-blur-sm border border-white/10`}>
                    <span className="text-green-400 font-bold">{item.icon}</span>
                    <span className="text-sm text-white">{item.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* Contact Info */}
              <motion.div 
                className="mt-8 pt-6 border-t border-white/10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-gray-400">
                  📞 Call us: <a href="tel:+911234567890" className="text-purple-400 hover:text-purple-300">+91 1234567890</a>
                  {' '}or{' '}
                  📧 Email: <a href="mailto:info@buildingcreators.com" className="text-purple-400 hover:text-purple-300">info@buildingcreators.com</a>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

export default ServicesPage;