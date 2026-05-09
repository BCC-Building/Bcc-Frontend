// src/pages/ServiceDetail.jsx - Production-Ready
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { services } from '../data/ServicesData';
import ServiceDetailTabs from '../components/services/ServiceDetailTabs';

/**
 * ServiceDetail Component
 * Shows detailed information for a single service by URL slug
 * 
 * URL: /services/:slug
 * Example: /services/architecture-design
 * 
 * To add new service detail fields: Edit ServicesData.js
 * To change tabs: Edit ServiceDetailTabs component
 */

export default function ServiceDetail() {
  // ==================== URL PARAMS ====================
  const { slug } = useParams();

  // ==================== FIND SERVICE ====================
  const service = services.find((s) => s.slug === slug);

  // ==================== SCROLL TO TOP ====================
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // ==================== NOT FOUND STATE ====================
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center py-24 px-4 max-w-md">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Service Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The service you're looking for doesn't exist or may have been moved.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
          >
            ← Back to All Services
          </Link>
        </div>
      </div>
    );
  }

  // ==================== RENDER ====================
  return (
    <>
      {/* SEO */}
      <SEO
        title={`${service.name} | BCC Consulting Services`}
        description={service.shortDesc}
        keywords={`${service.name}, ${service.category}, BCC services, Rudrapur`}
        url={`https://bcc.net.in/services/${service.slug}`}
        image={service.image}
      />

      <div className="service-detail-page">
        <div className="container">
          {/* Back Link */}
          <Link to="/services" className="back-link" aria-label="Back to all services">
            ← Back to Services
          </Link>

          {/* Main Grid */}
          <div className="service-detail-grid">
            {/* Left: Content */}
            <div className="service-detail-content">
              {/* Icon */}
              <div className="service-icon-large" aria-hidden="true">
                {service.icon}
              </div>

              {/* Title */}
              <h1 className="service-detail-title">{service.name}</h1>

              {/* Category Badge */}
              <div className="service-category-badge">{service.category}</div>

              {/* Tabs (Overview, Features, Tech Stack, Certifications) */}
              <ServiceDetailTabs service={service} />
            </div>

            {/* Right: Image */}
            <div className="service-detail-image">
              <img
                src={service.image}
                alt={service.name}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .service-detail-page {
          padding: 60px 0;
          background: #f8fafc;
          min-height: 100vh;
        }
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 40px;
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          padding: 8px 16px;
          border-radius: 50px;
          background: #eef2ff;
        }
        .back-link:hover {
          transform: translateX(-4px);
          background: #e0e7ff;
        }
        .service-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: start;
        }
        .service-icon-large {
          font-size: 4rem;
          margin-bottom: 20px;
        }
        .service-detail-title {
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .service-category-badge {
          display: inline-block;
          padding: 6px 14px;
          background: #e0e7ff;
          color: #4338ca;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 30px;
        }

        /* Tabs */
        .service-tabs {
          display: flex;
          gap: 12px;
          border-bottom: 2px solid #e2e8f0;
          margin-bottom: 24px;
          overflow-x: auto;
        }
        .tab-btn {
          padding: 10px 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 600;
          color: #64748b;
          white-space: nowrap;
          transition: all 0.3s ease;
          position: relative;
        }
        .tab-btn.active {
          color: #667eea;
        }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #667eea;
        }

        /* Content */
        .service-description-full {
          color: #475569;
          line-height: 1.8;
          margin-bottom: 24px;
        }
        .service-stats {
          display: flex;
          gap: 30px;
          margin-top: 30px;
          padding: 20px;
          background: #f1f5f9;
          border-radius: 12px;
          flex-wrap: wrap;
        }
        .stat-item {
          text-align: center;
          flex: 1;
          min-width: 80px;
        }
        .stat-item strong {
          display: block;
          font-size: 1.1rem;
          color: #0f172a;
        }
        .stat-item span {
          font-size: 0.85rem;
          color: #64748b;
        }

        /* Features */
        .features-list {
          list-style: none;
          padding: 0;
        }
        .features-list li {
          padding: 12px 0;
          color: #475569;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .features-list li::before {
          content: '✓';
          color: #10b981;
          font-weight: bold;
        }

        /* Tech Tags */
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 30px;
        }
        .tech-tag {
          padding: 8px 16px;
          background: #e0e7ff;
          color: #4338ca;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
        }

        /* Certifications */
        .certifications {
          padding: 20px;
          background: #f1f5f9;
          border-radius: 12px;
        }
        .certifications h3 {
          margin-bottom: 12px;
          color: #0f172a;
        }

        /* CTA Button */
        .inquiry-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 30px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .inquiry-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        /* Image */
        .service-detail-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .service-detail-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .service-detail-title {
            font-size: 1.8rem;
          }
          .service-detail-image img {
            height: 300px;
          }
          .service-tabs {
            gap: 8px;
          }
          .tab-btn {
            padding: 8px 14px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
}