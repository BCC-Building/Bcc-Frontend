import { Link } from 'react-router-dom';
import logo from '../assets/img.webp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Projects" },
    { to: "/careers", label: "Careers" },
    { to: "/contact", label: "Contact" },
    { to: "/gallery", label: "Gallery" },
    { to: "/blog", label: "Blog" },
  ];

  const socialLinks = [
    { href: "#", icon: "bi bi-facebook", label: "Follow us on Facebook" },
    { href: "#", icon: "bi bi-twitter", label: "Follow us on Twitter" },
    { href: "#", icon: "bi bi-linkedin", label: "Follow us on LinkedIn" },
    { href: "#", icon: "bi bi-instagram", label: "Follow us on Instagram" },
    { href: "#", icon: "bi bi-youtube", label: "Follow us on YouTube" },
    { href: "https://wa.me/919876543210", icon: "bi bi-whatsapp", label: "Chat with us on WhatsApp" },
  ];

  return (
    <footer className="bg-dark text-white py-5" aria-label="Site footer">
      <div className="container">
        <div className="row gy-4">
          
          {/* Company Info */}
          <div className="col-md-4 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-3">
              <img 
                src={logo} 
                alt="Building Creators And Consulting official logo" 
                style={{ height: '42px', width: '42px' }} 
                className="me-2 rounded"
                width="42"
                height="42"
                loading="lazy"
              />
              <div>
                <h2 className="h5 text-white mb-0">Building Creators And Consulting</h2>
                <p className="text-white-50 small mb-0">Trusted construction and engineering partner.</p>
              </div>
            </div>
            <p className="text-muted mb-0">
              Delivering trusted construction, engineering, and survey solutions with quality, safety, and professionalism.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 text-center">
            <h2 className="h5 mb-3 text-white">Quick Links</h2>
            <nav aria-label="Footer quick links">
              <ul className="list-unstyled mb-0">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link 
                      className="text-white text-decoration-none d-block mb-2 hover-underline" 
                      to={link.to}
                      aria-label={`Go to ${link.label} page`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social Links & Developer Credit */}
          <div className="col-md-4 text-center text-md-end">
            <h2 className="h5 mb-3 text-white">Follow Us</h2>
            <div 
              className="d-flex justify-content-center justify-content-md-end gap-3 mb-3" 
              aria-label="Social media links"
            >
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  className="text-white fs-4 social-icon" 
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={social.icon} aria-hidden="true"></i>
                </a>
              ))}
            </div>

            {/* Developer Credit - Added as requested */}
            <div className="mt-3 pt-3 border-top border-secondary">
              <p className="small text-white-50 mb-1">
                Designed & Developed by
              </p>
              <a 
                href="https://portfolio-nadeem-ali.vercel.app/" 
                className="text-info text-decoration-none fw-semibold small"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Nadeem Ali's portfolio website"
              >
                Nadeem Ali
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary my-4" aria-hidden="true" />

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-white-50 small">
          <span>© Copyright {currentYear} Building Creators And Consulting | All Rights Reserved.</span>
          <nav aria-label="Legal links" className="mt-2 mt-md-0">
            <Link className="text-white-50 text-decoration-none me-3 hover-underline" to="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="text-white-50 text-decoration-none hover-underline" to="/terms-of-service">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>

      {/* CSS for hover effects */}
      <style>{`
        .hover-underline:hover {
          text-decoration: underline !important;
          color: #0dcaf0 !important;
        }
        .social-icon {
          transition: all 0.3s ease;
          display: inline-block;
        }
        .social-icon:hover {
          color: #0dcaf0 !important;
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
}