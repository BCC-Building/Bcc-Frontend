import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Project Data - Replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "Commercial Complex",
      category: "architecture",
      location: "Mumbai, India",
      year: "2024",
      description: "A state-of-the-art commercial complex with sustainable design and modern architecture.",
      fullDescription: "This 20-story commercial tower features energy-efficient glass facade, rainwater harvesting, and smart building management systems. The project was completed in 18 months with a team of 50+ professionals.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        "https://images.unsplash.com/photo-1497366216548-37526070297c",
        "https://images.unsplash.com/photo-1497366811353-2a2cfcb4b3e1"
      ],
      tags: ["Commercial", "Green Building", "Modern"]
    },
    {
      id: 2,
      title: "Luxury Residential Towers",
      category: "structure",
      location: "Delhi NCR, India",
      year: "2023",
      description: "Premium residential towers with world-class amenities and earthquake-resistant structure.",
      fullDescription: "Three residential towers of 30 floors each, featuring earthquake-resistant design, premium finishes, and smart home automation. Project won 'Best Residential Design' award 2024.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
      ],
      tags: ["Residential", "Luxury", "Earthquake Resistant"]
    },
    {
      id: 3,
      title: "Corporate Headquarters",
      category: "interior",
      location: "Bangalore, India",
      year: "2024",
      description: "Modern corporate office with innovative interior design and sustainable features.",
      fullDescription: "100,000 sq.ft. corporate office featuring open floor plans, biophilic design elements, and advanced HVAC systems. Designed for 1000+ employees with focus on productivity and wellness.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      images: [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
        "https://images.unsplash.com/photo-1497366216548-37526070297c",
        "https://images.unsplash.com/photo-1497366811353-2a2cfcb4b3e1"
      ],
      tags: ["Corporate", "Interior", "Sustainable"]
    },
    {
      id: 4,
      title: "River Bridge Project",
      category: "bridge",
      location: "Kolkata, India",
      year: "2023",
      description: "Major bridge infrastructure project connecting two districts.",
      fullDescription: "1.2km cable-stayed bridge over river Ganges. Project included soil investigation, pile foundation, and seismic design considerations.",
      image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c",
      images: [
        "https://images.unsplash.com/photo-1519003722824-194d4455a60c",
        "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
        "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342"
      ],
      tags: ["Infrastructure", "Bridge", "Civil"]
    },
    {
      id: 5,
      title: "Water Treatment Plant",
      category: "water",
      location: "Pune, India",
      year: "2024",
      description: "Advanced water supply and treatment facility for urban area.",
      fullDescription: "50 MLD water treatment plant serving 500,000+ residents. Includes advanced filtration, UV treatment, and automated control systems.",
      image: "https://images.unsplash.com/photo-1544717305-38e63ec685b5",
      images: [
        "https://images.unsplash.com/photo-1544717305-38e63ec685b5",
        "https://images.unsplash.com/photo-1581092335871-4d7d8f2ac643",
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758"
      ],
      tags: ["Water Supply", "Infrastructure", "Sustainable"]
    },
    {
      id: 6,
      title: "Irrigation Canal System",
      category: "irrigation",
      location: "Punjab, India",
      year: "2023",
      description: "Large-scale irrigation project for agricultural development.",
      fullDescription: "150km canal network bringing water to 50,000+ acres of farmland. Includes automated gates, flow measurement systems, and farmer training programs.",
      image: "https://images.unsplash.com/photo-1628624747186-a1e5195a7ca4",
      images: [
        "https://images.unsplash.com/photo-1628624747186-a1e5195a7ca4",
        "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51",
        "https://images.unsplash.com/photo-1589924691995-4002509e3fc2"
      ],
      tags: ["Irrigation", "Agriculture", "Water Management"]
    }
  ];

  // Filter categories
  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'architecture', label: 'Architecture' },
    { value: 'structure', label: 'Structure' },
    { value: 'interior', label: 'Interior' },
    { value: 'bridge', label: 'Bridge' },
    { value: 'water', label: 'Water Supply' },
    { value: 'irrigation', label: 'Irrigation' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Schema.org markup for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Our Projects",
          "description": "View our portfolio of completed construction and consulting projects",
          "url": window.location.href
        })}
      </script>

      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="hero-title">Our <span className="highlight">Projects</span></h1>
            <p className="hero-subtitle">Showcasing excellence in engineering, architecture, and construction</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">150+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Satisfied Clients</span>
              </div>
              <div className="stat">
                <span className="stat-number">12+</span>
                <span className="stat-label">Industry Awards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-wrapper">
            <div className="filter-buttons">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`filter-btn ${filter === cat.value ? 'active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-image-wrapper">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <button 
                      onClick={() => openModal(project)}
                      className="view-project-btn"
                    >
                      View Project
                    </button>
                  </div>
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-meta">
                    <span className="project-location">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                      {project.location}
                    </span>
                    <span className="project-year">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      {project.year}
                    </span>
                  </div>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-wrapper">
            <h2 className="cta-title">Have a Project in Mind?</h2>
            <p className="cta-text">Let's discuss how we can bring your vision to life</p>
            <Link to="/contact" className="cta-button">
              Start Your Project
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal for Project Details */}
      {isModalOpen && selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-content">
              <div className="modal-gallery">
                <img 
                  src={selectedProject.images[0]} 
                  alt={selectedProject.title}
                  className="modal-main-image"
                />
                <div className="modal-thumbnails">
                  {selectedProject.images.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img}
                      alt={`${selectedProject.title} view ${idx + 1}`}
                      className="modal-thumb"
                    />
                  ))}
                </div>
              </div>
              
              <div className="modal-info">
                <h2 className="modal-title">{selectedProject.title}</h2>
                <div className="modal-meta">
                  <span>📍 {selectedProject.location}</span>
                  <span>📅 {selectedProject.year}</span>
                </div>
                <p className="modal-description">{selectedProject.fullDescription}</p>
                
                <div className="modal-tags">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="modal-tag">{tag}</span>
                  ))}
                </div>
                
                <Link to="/contact" className="modal-cta">
                  Request Similar Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Hero Section */
        .projects-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 80px 0 60px;
          color: white;
          margin-top: 0;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .hero-title .highlight {
          color: #ffd700;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          opacity: 0.95;
          max-width: 600px;
          margin: 0 auto 40px;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 800;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        /* Filter Section */
        .filter-section {
          padding: 40px 0;
          background: #f8f9fa;
          position: sticky;
          top: 70px;
          z-index: 100;
        }

        .filter-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        .filter-btn {
          padding: 8px 24px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .filter-btn:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
        }

        /* Projects Grid */
        .projects-grid-section {
          padding: 60px 0;
          background: #ffffff;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .project-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease backwards;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .project-image-wrapper {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/10;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-image {
          transform: scale(1.1);
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .view-project-btn {
          padding: 12px 24px;
          background: white;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-project-btn:hover {
          transform: scale(1.05);
          background: #667eea;
          color: white;
        }

        .project-tags {
          position: absolute;
          top: 16px;
          left: 16px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .project-tag {
          padding: 4px 12px;
          background: rgba(0,0,0,0.7);
          color: white;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
          backdrop-filter: blur(4px);
        }

        .project-info {
          padding: 20px;
        }

        .project-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #1a1a1a;
        }

        .project-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
          font-size: 13px;
          color: #666;
        }

        .project-location, .project-year {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .project-description {
          color: #666;
          line-height: 1.5;
          font-size: 14px;
        }

        /* CTA Section */
        .cta-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .cta-wrapper {
          text-align: center;
          color: white;
        }

        .cta-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .cta-text {
          font-size: 1.1rem;
          margin-bottom: 32px;
          opacity: 0.95;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: white;
          color: #667eea;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
          color: #764ba2;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-container {
          background: white;
          border-radius: 20px;
          max-width: 1200px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-close {
          position: sticky;
          top: 16px;
          right: 16px;
          float: right;
          width: 40px;
          height: 40px;
          background: white;
          border: none;
          border-radius: 50%;
          font-size: 28px;
          cursor: pointer;
          z-index: 10;
          margin: 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .modal-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          padding: 30px;
        }

        .modal-gallery {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal-main-image {
          width: 100%;
          border-radius: 12px;
          aspect-ratio: 16/9;
          object-fit: cover;
        }

        .modal-thumbnails {
          display: flex;
          gap: 12px;
        }

        .modal-thumb {
          width: 80px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .modal-thumb:hover {
          opacity: 0.8;
        }

        .modal-info {
          padding: 20px 0;
        }

        .modal-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .modal-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          color: #666;
        }

        .modal-description {
          color: #555;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .modal-tags {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .modal-tag {
          padding: 6px 14px;
          background: #f0f0f0;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .modal-cta {
          display: inline-block;
          padding: 12px 28px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .modal-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102,126,234,0.4);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-stats {
            gap: 30px;
          }
          
          .stat-number {
            font-size: 1.5rem;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .filter-buttons {
            gap: 8px;
          }
          
          .filter-btn {
            padding: 6px 16px;
            font-size: 12px;
          }
          
          .modal-content {
            grid-template-columns: 1fr;
            padding: 20px;
          }
          
          .modal-title {
            font-size: 1.4rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}