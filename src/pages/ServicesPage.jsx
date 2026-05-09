// src/pages/ServicesPage.jsx - Production-Ready
import { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import { services } from '../data/ServicesData';
import ServicesHero from '../components/services/ServicesHero';
import ServiceFilter from '../components/services/ServiceFilter';
import ServicesGrid from '../components/services/ServicesGrid';
import ServicesPagination from '../components/services/ServicesPagination';
import ServicesCTA from '../components/services/ServicesCTA';

/**
 * ServicesPage Component
 * Lists all services with filtering, search, and pagination
 * 
 * To add new services: Edit ../data/ServicesData.js
 * To change categories: Update ServiceFilter component
 * To change services per page: Update SERVICES_PER_PAGE constant
 */

/** Number of services shown per page */
const SERVICES_PER_PAGE = 6;

export default function ServicesPage() {
  // ==================== STATE ====================
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // ==================== FILTERING ====================

  /** Filter services by category and search term */
  const filteredServices = useMemo(() => services.filter((service) => {
    const matchesCategory =
      selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [selectedCategory, searchTerm]);

  // ==================== PAGINATION ====================

  const totalPages = Math.ceil(filteredServices.length / SERVICES_PER_PAGE);
  const currentServices = filteredServices.slice(
    (currentPage - 1) * SERVICES_PER_PAGE,
    currentPage * SERVICES_PER_PAGE
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ==================== HANDLERS ====================

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // ==================== RENDER ====================
  return (
    <>
      {/* SEO */}
      <SEO
        title="Our Services | Architecture, Soil Testing, NDT, Survey & More | BCC"
        description="BCC offers 14+ expert services in Rudrapur, Uttarakhand — Architecture, Structure Design, Soil Investigation, NDT, Material Testing, Survey, Bridge Design & more."
        keywords="architecture Rudrapur, soil testing Uttarakhand, NDT testing, land survey, structure design, interior design, bridge design, material testing"
        url="https://bcc.net.in/services"
      />

      <div className="font-sans overflow-x-hidden">
        {/* Hero */}
        <ServicesHero totalServices={services.length} />

        {/* Filters */}
        <ServiceFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
          searchTerm={searchTerm}
          setSearchTerm={handleSearchChange}
          services={services}
        />

        {/* Services Grid */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <ServicesGrid
              services={currentServices}
              filteredCount={filteredServices.length}
              searchTerm={searchTerm}
              onClearFilters={handleClearFilters}
            />

            {/* Pagination */}
            <ServicesPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>

        {/* CTA */}
        <ServicesCTA />
      </div>

      {/* Utility Styles */}
      <style>{`
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
      `}</style>
    </>
  );
}
