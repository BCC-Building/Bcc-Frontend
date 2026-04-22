import { Link } from 'react-router-dom';
import Testimonials from './Testimonials';

const teamMembers = [
  {
    name: 'Er. Yaseen Ahmad Khan',
    title: 'Founder & Managing Director',
    role: 'Civil & Construction Expert',
    experience: '15+ Years Experience',
  },
  {
    name: 'Rajesh Sir',
    title: 'Director - Consulting Services',
    role: 'Business & Strategy Consultant',
    experience: '10+ Years Experience',
  },
  {
    name: 'Amit Verma',
    title: 'Head - Architecture Design',
    role: 'Structure & Architecture Design Expert',
    experience: '8+ Years Experience',
  },
  {
    name: 'Neha Singh',
    title: 'Project Manager & Site Engineer',
    role: 'Execution & Site Management',
    experience: '7+ Years Experience',
  },
];

export default function About() {
  return (
    <>
      <section className="about-hero position-relative text-white overflow-hidden">
        <div className="about-hero-overlay"></div>
        <div className="container py-5 position-relative">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <span className="text-info fw-semibold letter-spacing mb-3 d-inline-block">About BCC</span>
              <h1 className="display-5 fw-bold mb-3">Building Trust, Creating Excellence</h1>
              <p className="lead text-white-75 mb-4">
                We deliver innovative construction, smart consulting and technology-driven solutions with commitment and quality.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/contact" className="btn btn-primary btn-lg">Contact Us</Link>
                <Link to="/services" className="btn btn-outline-light btn-lg">Explore Services</Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section className="about-story py-5">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <div className="section-label text-primary mb-3">Our Story</div>
              <h2 className="mb-4">Who We Are</h2>
              <p className="text-muted mb-4">
                Building Creators & Consulting  (BCC) was founded with a vision to redefine construction and consulting services in India through innovation, quality and integrity.
              </p>
              <p className="text-muted mb-4">
                From residential and commercial construction to strategic business consulting and digital solutions, BCC has become a trusted partner for clients who value excellence and long-term success.
              </p>
              <p className="text-muted mb-0">
                Our team of experts combines industry experience with modern technology to build spaces, strategies and solutions that create real value.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg overflow-hidden rounded-4">
                <img
                  src="https://images.unsplash.com/photo-1529429617124-1c7fe8c9f576?auto=format&fit=crop&w=1200&q=80"
                  alt="BCC office"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-purpose py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-label text-primary">Our Purpose</span>
            <h2 className="mt-3">Mission, Vision & Values</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="purpose-card p-4 rounded-4 shadow-sm h-100">
                <div className="purpose-icon bg-primary text-white mb-3">
                  <i className="bi bi-rocket-takeoff-fill fs-3"></i>
                </div>
                <h5>Our Mission</h5>
                <p className="text-muted mb-0">To deliver high-quality construction, consulting and digital solutions that exceed client expectations with innovation and commitment.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="purpose-card p-4 rounded-4 shadow-sm h-100">
                <div className="purpose-icon bg-success text-white mb-3">
                  <i className="bi bi-eye-fill fs-3"></i>
                </div>
                <h5>Our Vision</h5>
                <p className="text-muted mb-0">To be a leading company recognized for transforming ideas into reality and creating sustainable value for our clients and society.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="purpose-card p-4 rounded-4 shadow-sm h-100">
                <div className="purpose-icon bg-warning text-white mb-3">
                  <i className="bi bi-star-fill fs-3"></i>
                </div>
                <h5>Our Values</h5>
                <ul className="text-muted mb-0 list-unstyled">
                  <li>Integrity & Transparency</li>
                  <li>Quality & Excellence</li>
                  <li>Innovation & Growth</li>
                  <li>Commitment & Teamwork</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <div>
              <span className="section-label text-primary">Meet The Experts</span>
              <h2 className="mt-3">Our Expert Team</h2>
            </div>
            <Link to="/contact" className="btn btn-outline-primary mt-3 mt-md-0">
              Contact Our Team
            </Link>
          </div>
          <div className="row g-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-md-6 col-xl-3">
                <div className="team-card p-4 rounded-4 shadow-sm h-100">
                  <div className="avatar rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-4">
                    <span className="fs-4">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h5>{member.name}</h5>
                  <p className="text-primary small mb-2">{member.title}</p>
                  <p className="text-muted mb-2">{member.role}</p>
                  <p className="text-muted small mb-0">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-stats py-5 text-white">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <div className="stat-card p-4 rounded-4 h-100">
                <h3 className="mb-1">10+</h3>
                <p className="mb-0">Years of Experience</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card p-4 rounded-4 h-100">
                <h3 className="mb-1">150+</h3>
                <p className="mb-0">Projects Completed</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card p-4 rounded-4 h-100">
                <h3 className="mb-1">100%</h3>
                <p className="mb-0">Client Satisfaction</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card p-4 rounded-4 h-100">
                <h3 className="mb-1">20+</h3>
                <p className="mb-0">Expert Professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-expertise py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-label text-primary">What We Do</span>
            <h2 className="mt-3">Our Core Expertise</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="expertise-card p-4 rounded-4 shadow-sm h-100">
                <div className="expertise-icon bg-white text-primary shadow-sm mb-3">
                  <i className="bi bi-building fs-3"></i>
                </div>
                <h5>Construction Services</h5>
                <p className="text-muted">Residential, commercial & industrial construction with quality assurance.</p>
                <Link to="/services" className="text-primary fw-semibold">Learn More →</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="expertise-card p-4 rounded-4 shadow-sm h-100">
                <div className="expertise-icon bg-white text-success shadow-sm mb-3">
                  <i className="bi bi-graph-up-arrow fs-3"></i>
                </div>
                <h5>Consulting Services</h5>
                <p className="text-muted">Business strategy, project planning & feasibility consulting for growth.</p>
                <Link to="/services" className="text-success fw-semibold">Learn More →</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="expertise-card p-4 rounded-4 shadow-sm h-100">
                <div className="expertise-icon bg-white text-warning shadow-sm mb-3">
                  <i className="bi bi-laptop fs-3"></i>
                </div>
                <h5>Soil Investigation </h5>
                <p className="text-muted">Soil Testing and Detaild report.</p>
                <Link to="/services" className="text-warning fw-semibold">Learn More →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-founder py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              <div className="founder-card rounded-4 p-4 shadow-sm h-100">
                <div className="d-flex align-items-center mb-4">
                  <div className="founder-avatar rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3">
                    <span className="fs-4">RS</span>
                  </div>
                  <div>
                    <h5 className="mb-0">Er. Yaseen Ahmad Khan</h5>
                    <p className="text-muted mb-0">Founder & Managing Director</p>
                  </div>
                </div>
                <h4 className="mb-3">Founder’s Message</h4>
                <p className="text-muted mb-4">
                  “At BCC, our goal is simple – to turn your vision into reality with trust, quality and innovation. Every project we take is a responsibility we deliver with excellence.”
                </p>
                <p className="mb-0 text-primary fw-semibold">Er. Yaseen Ahmad Khan</p>
                <p className="text-muted small mb-0">Founder & Managing Director</p>
              </div>
            </div>
            <div className="col-lg-7">
              <Testimonials />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
