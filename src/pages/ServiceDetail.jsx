import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { services } from '../data/ServicesData';
import ServiceDetailTabs from '../components/services/ServiceDetailTabs';

function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="text-center py-24 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Service Not Found</h1>
        <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
        <Link to="/services" className="text-purple-600 hover:text-purple-700 font-semibold">
          ← Back to Services
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{service.name} | Building Creators & Consulting</title>
        <meta name="description" content={service.shortDesc} />
        <meta property="og:title" content={service.name} />
        <meta property="og:description" content={service.shortDesc} />
        <link rel="canonical" href={`https://buildingcreators.com/services/${service.slug}`} />
      </Helmet>

      <div className="service-detail-page">
        <div className="container">
          <Link to="/services" className="back-link">← Back to Services</Link>
          
          <div className="service-detail-grid">
            <div className="service-detail-content">
              <div className="service-icon-large">{service.icon}</div>
              <h1 className="service-detail-title">{service.name}</h1>
              <div className="service-category-badge">{service.category}</div>
              
              <ServiceDetailTabs service={service} />
            </div>

            <div className="service-detail-image">
              <img src={service.image} alt={service.name} />
            </div>
          </div>
        </div>
      </div>

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
          display: inline-block;
          margin-bottom: 40px;
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .back-link:hover {
          transform: translateX(-5px);
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
          font-size: 2.5rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
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
        .service-tabs {
          display: flex;
          gap: 12px;
          border-bottom: 2px solid #e2e8f0;
          margin-bottom: 24px;
        }
        .tab-btn {
          padding: 10px 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 600;
          color: #64748b;
          transition: all 0.3s ease;
        }
        .tab-btn.active {
          color: #667eea;
          border-bottom: 2px solid #667eea;
          margin-bottom: -2px;
        }
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
        }
        .stat-item {
          text-align: center;
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
        .features-list {
          list-style: none;
          padding: 0;
        }
        .features-list li {
          padding: 10px 0;
          color: #475569;
          border-bottom: 1px solid #e2e8f0;
        }
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
        .certifications {
          padding: 20px;
          background: #f1f5f9;
          border-radius: 12px;
        }
        .certifications h3 {
          margin-bottom: 12px;
          color: #0f172a;
        }
        .inquiry-btn {
          display: inline-block;
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
          box-shadow: 0 10px 25px rgba(102,126,234,0.4);
        }
        .service-detail-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
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
            padding: 8px 16px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}

export default ServiceDetail;