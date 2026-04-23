import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { services } from '../data/servicesData';
import ServicesHero from '../components/services/ServicesHero';
import ServiceFilter from '../components/services/ServiceFilter';
import ServicesGrid from '../components/services/ServicesGrid';
import ServicesPagination from '../components/services/ServicesPagination';
import ServicesCTA from '../components/services/ServicesCTA';

function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;

  // Filter services
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

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

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
        <ServicesHero totalServices={services.length} />
        
        <ServiceFilter 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          services={services}
        />

        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <ServicesGrid 
              services={currentServices}
              filteredCount={filteredServices.length}
              searchTerm={searchTerm}
              onClearFilters={handleClearFilters}
            />
            
            <ServicesPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>

        <ServicesCTA />
      </div>



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

export default ServicesPage;