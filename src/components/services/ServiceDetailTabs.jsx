import { useState } from 'react';
import { Link } from 'react-router-dom';

const ServiceDetailTabs = ({ service }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'tech', label: 'Technology' }
  ];

  return (
    <>
      <div className="service-tabs">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div>
            <p className="service-description-full">{service.details}</p>
            <div className="service-stats">
              <div className="stat-item">
                <strong>{service.portfolio}</strong>
                <span>Track Record</span>
              </div>
              {service.certifications && (
                <div className="stat-item">
                  <strong>{service.certifications[0]}</strong>
                  <span>Certification</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <ul className="features-list">
            {service.features.map((feature, idx) => (
              <li key={idx}>✓ {feature}</li>
            ))}
          </ul>
        )}

        {activeTab === 'tech' && (
          <div>
            <div className="tech-tags">
              {service.technologies.map((tech, idx) => (
                <span key={idx} className="tech-tag">{tech}</span>
              ))}
            </div>
            {service.certifications && (
              <div className="certifications">
                <h3>Certifications</h3>
                {service.certifications.map((cert, idx) => (
                  <p key={idx}>🏆 {cert}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Link to="/contact" className="inquiry-btn">
        Request a Quote →
      </Link>
    </>
  );
};

export default ServiceDetailTabs;