import { Link } from 'react-router-dom';
import logo from '../assets/img.webp'; // 👈 Import logo

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
    { href: "#", icon: "bi bi-facebook", label: "Facebook" },
    { href: "#", icon: "bi bi-twitter-x", label: "Twitter" },
    { href: "#", icon: "bi bi-linkedin", label: "LinkedIn" },
    { href: "#", icon: "bi bi-instagram", label: "Instagram" },
    { href: "#", icon: "bi bi-youtube", label: "YouTube" },
    { href: "https://wa.me/919876543210", icon: "bi bi-whatsapp", label: "WhatsApp" },
  ];

  return (
    <footer className="footer" aria-label="Site footer">
      {/* Top Wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none">
          <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" fill="#0f172a"/>
        </svg>
      </div>

      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            
            {/* Company Info */}
            <div className="footer-col footer-brand">
              <div className="footer-logo">
                <img 
                  src={logo} 
                  alt="BCC Logo" 
                  className="footer-logo-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback logo */}
                <div className="footer-logo-fallback" style={{ display: 'none' }}>
                  BCC
                </div>
              </div>
              <h3 className="footer-company-name">Building Creators And Consulting</h3>
              <p className="footer-tagline">
                Trusted construction & engineering partner delivering quality, safety, and professionalism since 2018.
              </p>
              <div className="footer-contact">
                <a href="tel:+919876543210" className="footer-contact-item">
                  <i className="bi bi-telephone-fill"></i> +91 98765 43210
                </a>
                <a href="mailto:info@bcc.net.in" className="footer-contact-item">
                  <i className="bi bi-envelope-fill"></i> info@bcc.net.in
                </a>
                <span className="footer-contact-item">
                  <i className="bi bi-geo-alt-fill"></i> Rudrapur, Uttarakhand
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-heading">Quick Links</h4>
              <nav aria-label="Footer quick links">
                <ul className="footer-links">
                  {quickLinks.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="footer-link">
                        <i className="bi bi-chevron-right"></i> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social & Developer */}
            <div className="footer-col">
              <h4 className="footer-heading">Connect With Us</h4>
              <div className="footer-social">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="footer-social-icon"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>

              {/* Developer Credit */}
              <div className="footer-dev-credit">
                <p className="footer-dev-label">Designed & Developed by</p>
                <a
                  href="https://portfolio-nadeem-ali.vercel.app/"
                  className="footer-dev-name"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-code-slash"></i> Nadeem Ali
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {currentYear} Building Creators And Consulting. All Rights Reserved.
            </p>
            <nav aria-label="Legal links" className="footer-legal">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <span className="footer-divider">|</span>
              <Link to="/terms-of-service">Terms of Service</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .footer {
          position: relative;
          background: #0f172a;
          color: #e2e8f0;
          margin-top: 0;
        }

        .footer-wave {
          position: relative;
          margin-top: -2px;
        }

        .footer-wave svg {
          display: block;
          width: 100%;
          height: auto;
        }

        .footer-content {
          padding: 60px 0 30px;
          background: #0f172a;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .footer-logo-img {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        }

        .footer-logo-fallback {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
          font-weight: 800;
          font-size: 1.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        }

        .footer-company-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .footer-tagline {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.88rem;
          transition: color 0.3s ease;
        }

        .footer-contact-item i {
          color: #3b82f6;
          font-size: 0.9rem;
          width: 18px;
          text-align: center;
        }

        a.footer-contact-item:hover {
          color: #60a5fa;
        }

        .footer-heading {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 16px;
          position: relative;
          padding-bottom: 10px;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 1px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 8px;
        }

        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
          padding: 4px 0;
        }

        .footer-link i {
          font-size: 0.7rem;
          color: #3b82f6;
          transition: transform 0.3s ease;
        }

        .footer-link:hover {
          color: #60a5fa;
          padding-left: 5px;
        }

        .footer-link:hover i {
          transform: translateX(3px);
        }

        .footer-social {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }

        .footer-social-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-social-icon:hover {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
          border-color: transparent;
        }

        .footer-dev-credit {
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-dev-label {
          color: #64748b;
          font-size: 0.78rem;
          margin-bottom: 4px;
        }

        .footer-dev-name {
          color: #38bdf8;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.88rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.3s ease;
        }

        .footer-dev-name:hover {
          color: #7dd3fc;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-copyright {
          color: #64748b;
          font-size: 0.82rem;
          margin: 0;
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-legal a {
          color: #64748b;
          text-decoration: none;
          font-size: 0.82rem;
          transition: color 0.3s ease;
        }

        .footer-legal a:hover {
          color: #60a5fa;
        }

        .footer-divider {
          color: #475569;
          font-size: 0.8rem;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand {
            grid-column: span 2;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .footer-brand {
            grid-column: span 1;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          .footer-content {
            padding: 40px 0 20px;
          }
        }
      `}</style>
    </footer>
  );
}