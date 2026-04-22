import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    currentCompany: '',
    portfolio: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSalary, setShowSalary] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fileInputRef = useRef(null);
  const jobsPerPage = 6;

  // Job openings data
  const jobs = [
    {
      id: 1,
      title: "Senior Structural Engineer",
      department: "Engineering",
      experience: "5-8 Years",
      location: "Pune (On-site)",
      type: "Full-time",
      salary: "₹12-18 LPA",
      description: "Lead structural design projects for commercial and residential buildings. Expertise in STAAD Pro, ETABS, and Indian codes required.",
      requirements: [
        "BE/MTech in Civil Engineering",
        "5-8 years of experience in structural design",
        "Proficiency in STAAD Pro, ETABS, AutoCAD",
        "Knowledge of Indian building codes",
        "Experience with seismic design"
      ],
      responsibilities: [
        "Lead structural design team",
        "Review and approve design calculations",
        "Coordinate with architects and clients",
        "Ensure compliance with safety standards",
        "Mentor junior engineers"
      ]
    },
    {
      id: 2,
      title: "Senior Architect",
      department: "Architecture",
      experience: "4-7 Years",
      location: "Remote (India)",
      type: "Full-time",
      salary: "₹10-15 LPA",
      description: "Lead architectural design projects from concept to completion. Strong portfolio in residential and commercial projects required.",
      requirements: [
        "B.Arch degree (M.Arch preferred)",
        "4-7 years of architectural experience",
        "Proficiency in Revit, SketchUp, AutoCAD",
        "Strong portfolio of built projects",
        "Experience with sustainable design"
      ],
      responsibilities: [
        "Develop architectural concepts",
        "Create detailed drawings and specifications",
        "Coordinate with structural and MEP teams",
        "Present designs to clients",
        "Site visits and construction oversight"
      ]
    },
    {
      id: 3,
      title: "Site Engineer",
      department: "Construction",
      experience: "2-4 Years",
      location: "Multiple Locations",
      type: "Full-time",
      salary: "₹4-7 LPA",
      description: "Manage day-to-day construction activities, quality control, and site coordination.",
      requirements: [
        "Diploma/BE in Civil Engineering",
        "2-4 years of site experience",
        "Knowledge of construction methods",
        "Strong communication skills",
        "Willing to relocate"
      ],
      responsibilities: [
        "Supervise construction activities",
        "Maintain quality standards",
        "Coordinate with contractors",
        "Prepare daily progress reports",
        "Ensure safety compliance"
      ]
    },
    {
      id: 4,
      title: "Quality Control Engineer",
      department: "Quality Assurance",
      experience: "3-6 Years",
      location: "Mumbai",
      type: "Full-time",
      salary: "₹6-9 LPA",
      description: "Implement quality control procedures, conduct material testing, and ensure project quality standards.",
      requirements: [
        "BE in Civil Engineering",
        "3-6 years in quality control",
        "Knowledge of testing methods",
        "ISO certification knowledge",
        "Attention to detail"
      ],
      responsibilities: [
        "Develop QC procedures",
        "Conduct material testing",
        "Prepare quality reports",
        "Train site staff on QC",
        "Handle third-party inspections"
      ]
    },
    {
      id: 5,
      title: "Interior Designer",
      department: "Design",
      experience: "2-5 Years",
      location: "Bangalore",
      type: "Full-time",
      salary: "₹5-8 LPA",
      description: "Create innovative interior designs for residential and commercial spaces.",
      requirements: [
        "Degree in Interior Design",
        "2-5 years of experience",
        "Proficiency in 3DS Max, AutoCAD",
        "Strong portfolio",
        "Knowledge of materials and finishes"
      ],
      responsibilities: [
        "Develop interior concepts",
        "Create 3D visualizations",
        "Select materials and finishes",
        "Coordinate with vendors",
        "Site supervision"
      ]
    },
    {
      id: 6,
      title: "BIM Modeler",
      department: "Digital Engineering",
      experience: "2-4 Years",
      location: "Hyderabad",
      type: "Full-time",
      salary: "₹5-7 LPA",
      description: "Create and manage BIM models for architectural and structural projects.",
      requirements: [
        "Diploma/BE in Civil/Architecture",
        "2-4 years of BIM experience",
        "Proficiency in Revit, Navisworks",
        "Knowledge of clash detection",
        "Understanding of LOD requirements"
      ],
      responsibilities: [
        "Create detailed BIM models",
        "Coordinate with multiple disciplines",
        "Perform clash detection",
        "Generate construction documents",
        "Maintain BIM standards"
      ]
    },
    {
      id: 7,
      title: "Project Manager",
      department: "Engineering",
      experience: "8-12 Years",
      location: "Delhi NCR",
      type: "Full-time",
      salary: "₹20-25 LPA",
      description: "Lead multiple construction projects from inception to completion.",
      requirements: [
        "BE/MTech in Civil Engineering",
        "PMP certification preferred",
        "8-12 years of project management experience",
        "Strong leadership skills",
        "Budget and timeline management expertise"
      ],
      responsibilities: [
        "Manage project lifecycle",
        "Coordinate with stakeholders",
        "Resource allocation and management",
        "Risk assessment and mitigation",
        "Client relationship management"
      ]
    },
    {
      id: 8,
      title: "Safety Officer",
      department: "Quality Assurance",
      experience: "3-5 Years",
      location: "Chennai",
      type: "Full-time",
      salary: "₹5-7 LPA",
      description: "Ensure workplace safety and compliance with regulations.",
      requirements: [
        "Diploma in Safety Management",
        "3-5 years of safety experience",
        "Knowledge of OSHA standards",
        "First aid certification",
        "Strong communication skills"
      ],
      responsibilities: [
        "Conduct safety audits",
        "Train staff on safety protocols",
        "Investigate incidents",
        "Maintain safety documentation",
        "Emergency response planning"
      ]
    }
  ];

  // Departments for filtering
  const departments = ["All", "Engineering", "Architecture", "Construction", "Quality Assurance", "Design", "Digital Engineering"];

  // Load saved form data from localStorage
  useEffect(() => {
    const savedForm = localStorage.getItem('careerFormData');
    if (savedForm) {
      setFormData(JSON.parse(savedForm));
    }
  }, []);

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem('careerFormData', JSON.stringify(formData));
  }, [formData]);

  // Track analytics (simulated)
  const trackEvent = useCallback((action, label) => {
    console.log(`[Analytics] ${action}: ${label}`);
    // In production, integrate with actual analytics like Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, { event_label: label });
    }
  }, []);

  const [activeDepartment, setActiveDepartment] = useState("All");

  // Memoized filtered jobs
  const filteredJobs = useMemo(() => {
    let result = activeDepartment === "All" 
      ? jobs 
      : jobs.filter(job => job.department === activeDepartment);
    
    if (searchTerm) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return result;
  }, [activeDepartment, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = useMemo(() => {
    const indexOfLastJob = currentPage * jobsPerPage;
    return filteredJobs.slice(indexOfLastJob - jobsPerPage, indexOfLastJob);
  }, [filteredJobs, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeDepartment, searchTerm]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    if (!formData.position) {
      newErrors.position = 'Please select a position';
    }
    
    if (!formData.experience) {
      newErrors.experience = 'Please select years of experience';
    }
    
    if (!fileName && !fileInputRef.current?.files?.length) {
      newErrors.resume = 'Please upload your resume';
    }
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(file.type)) {
        setFileName(file.name);
        if (errors.resume) {
          setErrors({ ...errors, resume: '' });
        }
        trackEvent('file_upload', `Resume uploaded: ${file.name}`);
      } else {
        setErrors({ ...errors, resume: 'Please upload PDF or DOC file' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      trackEvent('form_error', 'Validation failed');
      return;
    }
    
    setIsSubmitting(true);
    trackEvent('form_submit', `Applying for: ${formData.position}`);
    
    // Simulate API call with FormData
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
    if (fileInputRef.current?.files[0]) {
      formDataToSend.append('resume', fileInputRef.current.files[0]);
    }
    
    try {
      // Replace with actual API endpoint
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formDataToSend
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      setShowSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        currentCompany: '',
        portfolio: '',
        message: ''
      });
      setFileName("");
      if (fileInputRef.current) fileInputRef.current.value = '';
      localStorage.removeItem('careerFormData');
      
      setTimeout(() => setShowSuccess(false), 5000);
      trackEvent('form_success', 'Application submitted successfully');
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setFormData({...formData, position: job.title});
    setShowModal(false);
    trackEvent('click', `Apply for ${job.title}`);
    document.getElementById('apply-section').scrollIntoView({ behavior: 'smooth' });
  };

  const toggleSalary = (jobId) => {
    setShowSalary(prev => ({ ...prev, [jobId]: !prev[jobId] }));
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Job Details Modal Component
  const JobDetailsModal = ({ job, onClose, onApply }) => (
    <motion.div 
      className="modal-overlay" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="modal-content" 
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <h2 className="modal-title">{job.title}</h2>
        <div className="modal-meta">
          <span className="modal-department">{job.department}</span>
          <span className="modal-type">{job.type}</span>
          <span className="modal-location">📍 {job.location}</span>
        </div>
        
        <div className="modal-section">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </div>
        
        <div className="modal-section">
          <h3>Key Responsibilities</h3>
          <ul>
            {job.responsibilities.map((resp, idx) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
        </div>
        
        <div className="modal-section">
          <h3>Requirements</h3>
          <ul>
            {job.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
        
        <div className="modal-salary">
          <strong>Salary Range:</strong> {job.salary}
        </div>
        
        <button 
          className="modal-apply-btn"
          onClick={() => onApply(job)}
        >
          Apply Now →
        </button>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {/* SEO Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Careers at Building Creators and Consulting",
          "description": "Join our team of engineering and construction professionals. Explore career opportunities at BCC.",
          "url": window.location.href,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": jobs.map((job, index) => ({
              "@type": "JobPosting",
              "position": index + 1,
              "url": window.location.href,
              "title": job.title,
              "description": job.description,
              "employmentType": job.type,
              "jobLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": job.location.split(" ")[0],
                  "addressCountry": "India"
                }
              }
            }))
          }
        })}
      </script>

      {/* Hero Section with Attractive Image */}
      <section className="careers-hero">
        <div className="hero-overlay">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80"
            alt="Modern construction site with engineers planning"
            className={`hero-bg-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="hero-gradient"></div>
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Join Our Team
            </motion.span>
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Build Your Future With<br />
              <span className="gradient-text">Building Creators</span>
            </motion.h1>
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Join India's fastest-growing construction and engineering company. 
              Work on landmark projects that shape the future of infrastructure.
            </motion.p>
            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Open Positions</span>
              </div>
              <div className="stat">
                <span className="stat-number">8+</span>
                <span className="stat-label">Locations</span>
              </div>
              <div className="stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Team Members</span>
              </div>
              <div className="stat">
                <span className="stat-number">200+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
            </motion.div>
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a href="#openings" className="btn-primary">View Openings</a>
              <a href="#why-join" className="btn-secondary">Why Join Us</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section id="why-join" className="why-join">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why BCC</span>
            <h2 className="section-title">Why Join <span className="gradient-text">Building Creators</span></h2>
            <p className="section-subtitle">We offer an environment that fosters growth, innovation, and excellence</p>
          </div>

          <div className="benefits-grid">
            {[
              { icon: "🚀", title: "Career Growth", desc: "Fast-track promotions and leadership development programs" },
              { icon: "📚", title: "Learning & Development", desc: "Continuous learning with certifications and workshops worth ₹50k/year" },
              { icon: "💰", title: "Competitive Salary", desc: "Industry-best compensation with performance bonuses up to 30%" },
              { icon: "🌍", title: "Work-Life Balance", desc: "Flexible hours, hybrid work model, and 30 days annual leave" },
              { icon: "🏆", title: "Recognition", desc: "Annual awards, employee of the month, and performance recognition programs" },
              { icon: "💊", title: "Health Benefits", desc: "Comprehensive medical insurance for family and wellness programs" }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                className="benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-desc">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="openings" className="open-positions">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Current Openings</span>
            <h2 className="section-title">Explore <span className="gradient-text">Career Opportunities</span></h2>
            <p className="section-subtitle">Find the perfect role that matches your skills and aspirations</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="search-filter-bar">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="🔍 Search by title, department, or keywords..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search jobs"
              />
            </div>
            
            <div className="filter-tabs">
              {departments.map(dept => (
                <button
                  key={dept}
                  className={`filter-tab ${activeDepartment === dept ? 'active' : ''}`}
                  onClick={() => setActiveDepartment(dept)}
                  aria-label={`Filter by ${dept}`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="results-count">
            Found {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''}
          </div>

          {/* Jobs Grid */}
          <div className="jobs-grid">
            <AnimatePresence>
              {currentJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="job-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="job-header">
                    <div>
                      <h3 className="job-title">{job.title}</h3>
                      <div className="job-meta">
                        <span className="job-department">{job.department}</span>
                        <span className="job-type">{job.type}</span>
                      </div>
                    </div>
                    <div className="job-salary-wrapper">
                      <div className="job-salary">
                        {showSalary[job.id] ? job.salary : 'Confidential'}
                      </div>
                      <button 
                        className="salary-toggle"
                        onClick={() => toggleSalary(job.id)}
                        aria-label={showSalary[job.id] ? "Hide salary" : "Show salary"}
                      >
                        {showSalary[job.id] ? '👁️‍🗨️' : '👁️'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="job-details">
                    <div className="job-info">
                      <span>📍 {job.location}</span>
                      <span>⏱️ {job.experience}</span>
                    </div>
                    <p className="job-description">{job.description.substring(0, 100)}...</p>
                  </div>

                  <div className="job-actions">
                    <button 
                      className="job-view-btn"
                      onClick={() => {
                        setSelectedJob(job);
                        setShowModal(true);
                        trackEvent('view_details', job.title);
                      }}
                    >
                      View Details →
                    </button>
                    <button 
                      className="job-apply-btn"
                      onClick={() => handleApply(job)}
                    >
                      Quick Apply
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-btn"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                ← Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                className="page-btn"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-section" className="application-form">
        <div className="container">
          <div className="form-wrapper">
            <div className="form-header">
              <span className="section-tag">Start Your Journey</span>
              <h2 className="section-title">Apply <span className="gradient-text">Now</span></h2>
              <p className="section-subtitle">Fill out the form below and our recruitment team will get back to you within 48 hours</p>
            </div>

            {showSuccess && (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                role="alert"
              >
                ✅ Application submitted successfully! Our team will contact you soon.
              </motion.div>
            )}

            {errors.submit && (
              <div className="error-message" role="alert">
                ❌ {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required 
                    placeholder="Enter your full name"
                    aria-invalid={!!errors.fullName}
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    placeholder="your.email@example.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                    placeholder="+91 XXXXX XXXXX"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label>Position Applying For *</label>
                  <select 
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    aria-invalid={!!errors.position}
                  >
                    <option value="">Select a position</option>
                    {jobs.map(job => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                  </select>
                  {errors.position && <span className="error-text">{errors.position}</span>}
                </div>

                <div className="form-group">
                  <label>Years of Experience *</label>
                  <select 
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    aria-invalid={!!errors.experience}
                  >
                    <option value="">Select experience</option>
                    <option>Fresher (0-1 years)</option>
                    <option>1-3 years</option>
                    <option>3-6 years</option>
                    <option>6-10 years</option>
                    <option>10+ years</option>
                  </select>
                  {errors.experience && <span className="error-text">{errors.experience}</span>}
                </div>

                <div className="form-group">
                  <label>Current Company</label>
                  <input 
                    type="text" 
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleInputChange}
                    placeholder="Current employer (if any)"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Portfolio / LinkedIn Profile</label>
                  <input 
                    type="url" 
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Resume/CV *</label>
                  <div className="file-upload">
                    <input 
                      type="file" 
                      id="resume" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                      aria-invalid={!!errors.resume}
                    />
                    <label htmlFor="resume" className="file-label">
                      📄 {fileName || "Click to upload resume (PDF, DOC, DOCX)"}
                    </label>
                  </div>
                  {errors.resume && <span className="error-text">{errors.resume}</span>}
                  <small className="file-hint">Max file size: 5MB. Accepted formats: PDF, DOC, DOCX</small>
                </div>

                <div className="form-group full-width">
                  <label>Cover Letter / Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tell us why you'd be a great fit for this role..."
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-btn" 
                disabled={isSubmitting}
                aria-label={isSubmitting ? "Submitting application" : "Submit application"}
              >
                {isSubmitting ? "Submitting..." : "Submit Application →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-title">Don't See the Right Role?</h2>
            <p className="cta-text">Send us your resume and we'll reach out when a position matches your profile</p>
            <Link to="/contact" className="cta-button" onClick={() => trackEvent('click', 'Open application CTA')}>
              Send Open Application →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Job Details Modal */}
      <AnimatePresence>
        {showModal && selectedJob && (
          <JobDetailsModal 
            job={selectedJob} 
            onClose={() => setShowModal(false)} 
            onApply={handleApply}
          />
        )}
      </AnimatePresence>

      <style>{`
        /* Global Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Hero Section */
        .careers-hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .hero-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .hero-bg-image.loaded {
          opacity: 0.4;
        }

        .hero-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          opacity: 0.85;
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          color: white;
          padding: 80px 0;
        }

        .hero-badge {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(102, 126, 234, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
          border: 1px solid rgba(102, 126, 234, 0.5);
        }

        .hero-title {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto 40px;
          opacity: 0.95;
          line-height: 1.6;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 800;
          color: #667eea;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          padding: 12px 32px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102,126,234,0.4);
        }

        .btn-secondary {
          border: 2px solid white;
          color: white;
          background: transparent;
        }

        .btn-secondary:hover {
          background: white;
          color: #0f172a;
        }

        /* Why Join Section */
        .why-join {
          padding: 80px 0;
          background: #f8fafc;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-tag {
          display: inline-block;
          padding: 6px 16px;
          background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
          color: #667eea;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
        }

        .section-subtitle {
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .benefit-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        .benefit-card:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .benefit-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #0f172a;
        }

        .benefit-desc {
          color: #64748b;
          line-height: 1.5;
        }

        /* Open Positions */
        .open-positions {
          padding: 80px 0;
          background: white;
        }

        .search-filter-bar {
          margin-bottom: 30px;
        }

        .search-box {
          margin-bottom: 20px;
        }

        .search-input {
          width: 100%;
          padding: 14px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
        }

        .filter-tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .filter-tab {
          padding: 10px 24px;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .filter-tab:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .filter-tab.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
        }

        .results-count {
          text-align: center;
          color: #64748b;
          margin-bottom: 30px;
          font-size: 14px;
        }

        .jobs-grid {
          display: grid;
          gap: 20px;
        }

        .job-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .job-card:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          border-color: transparent;
        }

        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .job-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .job-meta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .job-department, .job-type {
          font-size: 12px;
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: 600;
        }

        .job-department {
          background: #e0e7ff;
          color: #4338ca;
        }

        .job-type {
          background: #dcfce7;
          color: #15803d;
        }

        .job-salary-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .job-salary {
          font-weight: 700;
          color: #667eea;
        }

        .salary-toggle {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
          padding: 4px;
          border-radius: 50%;
          transition: background 0.3s ease;
        }

        .salary-toggle:hover {
          background: #f1f5f9;
        }

        .job-info {
          display: flex;
          gap: 20px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #64748b;
        }

        .job-description {
          color: #475569;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .job-actions {
          display: flex;
          gap: 16px;
          justify-content: flex-end;
        }

        .job-view-btn, .job-apply-btn {
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .job-view-btn {
          background: none;
          border: 2px solid #667eea;
          color: #667eea;
        }

        .job-view-btn:hover {
          background: #667eea;
          color: white;
        }

        .job-apply-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
        }

        .job-apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102,126,234,0.3);
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 40px;
        }

        .page-btn {
          padding: 10px 20px;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .page-btn:hover:not(:disabled) {
          border-color: #667eea;
          color: #667eea;
        }

        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-info {
          color: #64748b;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          max-width: 700px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          padding: 32px;
          position: relative;
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #f1f5f9;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: #e2e8f0;
        }

        .modal-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
          padding-right: 40px;
        }

        .modal-meta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .modal-department, .modal-type, .modal-location {
          font-size: 12px;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 600;
        }

        .modal-department {
          background: #e0e7ff;
          color: #4338ca;
        }

        .modal-type {
          background: #dcfce7;
          color: #15803d;
        }

        .modal-location {
          background: #fef3c7;
          color: #92400e;
        }

        .modal-section {
          margin-bottom: 24px;
        }

        .modal-section h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .modal-section ul {
          list-style: none;
          padding-left: 0;
        }

        .modal-section li {
          padding: 8px 0 8px 24px;
          position: relative;
          color: #475569;
        }

        .modal-section li:before {
          content: "▹";
          position: absolute;
          left: 0;
          color: #667eea;
        }

        .modal-salary {
          padding: 16px;
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .modal-apply-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102,126,234,0.4);
        }

        /* Application Form */
        .application-form {
          padding: 80px 0;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }

        .form-wrapper {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .success-message, .error-message {
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 24px;
          text-align: center;
        }

        .success-message {
          background: #dcfce7;
          color: #15803d;
        }

        .error-message {
          background: #fee2e2;
          color: #991b1b;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .full-width {
          grid-column: span 2;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 8px;
          color: #0f172a;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        .form-group input[aria-invalid="true"],
        .form-group select[aria-invalid="true"] {
          border-color: #ef4444;
        }

        .error-text {
          color: #ef4444;
          font-size: 12px;
          margin-top: 4px;
        }

        .file-upload input {
          display: none;
        }

        .file-label {
          display: block;
          padding: 40px;
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .file-label:hover {
          border-color: #667eea;
          background: #f8fafc;
        }

        .file-hint {
          font-size: 12px;
          color: #64748b;
          margin-top: 8px;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          margin-top: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(174, 198, 245, 0.94);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* CTA Section */
        .cta-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #fbb1b1 0%, #3d4f6c 100%);
        }

        .cta-content {
          text-align: center;
          color: white;
        }

        .cta-title {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 800;
          margin-bottom: 16px;
        }

        .cta-text {
          margin-bottom: 32px;
          opacity: 10;
          
        }

        .cta-button {
          display: inline-block;
          padding: 14px 32px;
         background: linear-gradient(135deg, #6b81b5 0%, #4f78b9 50%, #0f172a 100%);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(244, 100, 38, 0.89);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .full-width {
            grid-column: span 1;
          }
          
          .form-wrapper {
            padding: 24px;
          }
          
          .hero-stats {
            gap: 30px;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
          }
          
          .filter-tabs {
            gap: 8px;
          }
          
          .filter-tab {
            padding: 8px 16px;
            font-size: 12px;
          }
          
          .modal-content {
            padding: 20px;
          }
          
          .modal-title {
            font-size: 1.25rem;
          }
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #5a67d8;
        }
      `}</style>
    </>
  );
}