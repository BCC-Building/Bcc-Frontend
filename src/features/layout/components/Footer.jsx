// src/components/Footer.jsx
// ✅ Fixed Service Links - Match actual slugs
import { Link } from 'react-router-dom';
import logo from "../../../assets/img.webp";

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

  // ✅ FIXED: Service links with actual slugs from servicesData.js
  const serviceLinks = [
    { to: "/services/architecture-work", label: "Architecture Work" },
    { to: "/services/structure-design", label: "Structural Design" },
    { to: "/services/interior-design", label: "Interior Works" },
    { to: "/services/survey-work", label: "Site Surveys" },
    { to: "/services/soil-investigation", label: "Soil Investigation" },
    { to: "/services/material-testing", label: "Material Testing" },
    { to: "/services/ndt-testing", label: "NDT Testing" },
    { to: "/services/bridge-design", label: "Bridge Design" },
    { to: "/services/water-supply-design", label: "Water Supply Design" },
    { to: "/services/irrigation-design", label: "Irrigation Design" },
    { to: "/services/estimation-consultancy", label: "Estimation & Consultancy" },
  ];

  const socialLinks = [
    { href: "https://www.facebook.com/buildingcreatorsconsulting", icon: "bi bi-facebook", label: "Facebook" },
    { href: "#", icon: "bi bi-twitter-x", label: "Twitter" },
    { href: "https://www.linkedin.com/in/building-creators-and-consulting/", icon: "bi bi-linkedin", label: "LinkedIn" },
    { href: "https://www.instagram.com/bcc.rudrapur/", icon: "bi bi-instagram", label: "Instagram" },
    { href: "#", icon: "bi bi-youtube", label: "YouTube" },
    { href: "https://wa.me/918057540906", icon: "bi bi-whatsapp", label: "WhatsApp" },
  ];

  return (
    <footer className="footer" aria-label="Site footer">
      {/* Top Wave SVG */}
      <div className="footer-wave-wrap">
        <svg viewBox="0 0 1200 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 35 C200 70 400 0 600 35 C800 70 1000 0 1200 35 L1200 70 L0 70 Z" fill="#131b2f"/>
          <path d="M0 45 C200 80 400 10 600 45 C800 80 1000 10 1200 45 L1200 70 L0 70 Z" fill="rgba(59,130,246,0.06)"/>
        </svg>
      </div>

      <div className="footer-body">
        <div className="footer-grid-bg" aria-hidden="true"/>
        <div className="footer-glow-accent" aria-hidden="true"/>

        {/* ── Top Bar ── */}
        <div className="footer-topbar">
          <div className="footer-brand-lockup">
            <div className="footer-logo-box">
              <img
                src={logo}
                alt="BCC Logo"
                className="footer-logo-img"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <span className="footer-logo-fallback" style={{ display: 'none' }}>BCC</span>
            </div>
            <div className="footer-brand-text">
              <h2>Building Creators And Consulting</h2>
              <p>Engineering Excellence</p>
            </div>
          </div>
          <div className="footer-est-badge">
            <span className="footer-est-dot" aria-hidden="true"/>
            Est. 2017 &nbsp;·&nbsp; Rudrapur, Uttarakhand
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="footer-main-grid">
          {/* About + Contact */}
          <div className="footer-col">
            <p className="footer-section-label">About Us</p>
            <p className="footer-about-desc">
              Trusted construction &amp; engineering partner delivering quality, safety, and professionalism across every project we undertake.
            </p>
            <div className="footer-contacts">
              <a href="tel:+918057540906" className="footer-contact-item">
                <span className="footer-contact-icon"><i className="bi bi-telephone-fill" aria-hidden="true"/></span>
                +91 80575 40906
              </a>
              <a href="mailto:bcc06.info@gmail.com" className="footer-contact-item">
                <span className="footer-contact-icon"><i className="bi bi-envelope-fill" aria-hidden="true"/></span>
                bcc06.info@gmail.com
              </a>
              <span className="footer-contact-item">
                <span className="footer-contact-icon"><i className="bi bi-geo-alt-fill" aria-hidden="true"/></span>
                Rudrapur, Uttarakhand
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <p className="footer-section-label">Navigate</p>
            <nav aria-label="Footer navigation">
              <ul className="footer-link-list">
                {quickLinks.map((link) => (
                  <li key={link.to} className="footer-link-item">
                    <Link to={link.to} className="footer-nav-link">
                      {link.label}
                      <i className="bi bi-chevron-right footer-link-arrow" aria-hidden="true"/>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ✅ Services - Fixed Links */}
          <div className="footer-col">
            <p className="footer-section-label">Services</p>
            <nav aria-label="Footer services">
              <ul className="footer-link-list">
                {serviceLinks.slice(0, 6).map((link) => (
                  <li key={link.to} className="footer-link-item">
                    <Link to={link.to} className="footer-nav-link">
                      {link.label}
                      <i className="bi bi-chevron-right footer-link-arrow" aria-hidden="true"/>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social + Dev Credit */}
          <div className="footer-col">
            <p className="footer-section-label">Connect</p>
            <div className="footer-social-grid">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="footer-social-btn"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={social.icon} aria-hidden="true"/>
                  <span>{social.label}</span>
                </a>
              ))}
            </div>

            <div className="footer-dev-card">
              <p>Designed &amp; Developed by</p>
              <a
                href="https://portfolio-nadeem-ali.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-code-slash" aria-hidden="true"/>
                Nadeem Ali
              </a>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="footer-divider"/>

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {currentYear} <strong>Building Creators And Consulting.</strong> All Rights Reserved.
          </p>
          <nav aria-label="Legal links" className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link to="/terms-of-service">Terms of Service</Link>
          </nav>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .footer {
          position: relative;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
        }

        .footer-wave-wrap {
          display: block;
          margin-bottom: -2px;
          line-height: 0;
        }

        .footer-wave-wrap svg {
          display: block;
          width: 100%;
          height: 70px;
        }

        .footer-body {
          background: #131b2f;
          position: relative;
          overflow: hidden;
          padding: 0 0 8px;
        }

        .footer-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .footer-glow-accent {
          position: absolute;
          top: -60px; right: -60px;
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .footer-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding: 32px 48px 28px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }

        .footer-brand-lockup {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .footer-logo-box {
          width: 54px; height: 54px;
          border-radius: 14px;
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #3b82f6 100%);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 1px rgba(59,130,246,0.3), 0 8px 28px rgba(59,130,246,0.2);
          flex-shrink: 0;
          overflow: hidden;
        }

        .footer-logo-img {
          width: 100%; height: 100%;
          object-fit: cover;
        }

        .footer-logo-fallback {
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 700;
          color: #131b2f;
          width: 100%; height: 100%;
          align-items: center;
          justify-content: center;
        }

        .footer-brand-text h2 {
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-weight: 700;
          color: #ffffff;
          margin: 0 0 3px;
          letter-spacing: 0.01em;
          line-height: 1.2;
        }

        .footer-brand-text p {
          font-size: 10.5px; font-weight: 500;
          color: #7ab7ef;
          margin: 0;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .footer-est-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border: 1px solid rgba(59,130,246,0.35);
          border-radius: 40px;
          font-size: 11px;
          font-weight: 400;
          color: #8ab4f0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .footer-est-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #5b9aff;
          box-shadow: 0 0 8px rgba(59,130,246,0.6);
          flex-shrink: 0;
        }

        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
          gap: 44px;
          padding: 0 48px 44px;
          position: relative;
          z-index: 1;
        }

        .footer-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #7ab7ef;
          margin: 0 0 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(59,130,246,0.25);
          max-width: 36px;
        }

        .footer-about-desc {
          font-size: 13.5px;
          font-weight: 300;
          line-height: 1.8;
          color: #8a9bb0;
          margin: 0 0 24px;
        }

        .footer-contacts {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #8a9bb0;
          font-size: 12.5px;
          font-weight: 400;
          transition: color 0.2s ease;
        }

        a.footer-contact-item:hover { color: #7ab7ef; }
        a.footer-contact-item:hover .footer-contact-icon {
          background: rgba(59,130,246,0.15);
          border-color: rgba(59,130,246,0.45);
        }

        .footer-contact-icon {
          width: 34px; height: 34px;
          border-radius: 9px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          color: #7ab7ef;
          flex-shrink: 0;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .footer-link-list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .footer-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #7e8ea3;
          text-decoration: none;
          font-size: 13px;
          font-weight: 400;
          padding: 7px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        }

        .footer-nav-link:hover {
          color: #7ab7ef;
          padding-left: 5px;
          border-bottom-color: rgba(59,130,246,0.25);
        }

        .footer-link-arrow {
          font-size: 10px;
          color: rgba(59,130,246,0.4);
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .footer-nav-link:hover .footer-link-arrow {
          color: #7ab7ef;
          transform: translateX(3px);
        }

        .footer-social-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 20px;
        }

        .footer-social-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 12px 4px;
          border-radius: 11px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          text-decoration: none;
          color: #7e8ea3;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.03em;
          transition: all 0.22s ease;
          cursor: pointer;
        }

        .footer-social-btn i {
          font-size: 17px;
        }

        .footer-social-btn:hover {
          background: rgba(59,130,246,0.12);
          border-color: rgba(59,130,246,0.4);
          color: #7ab7ef;
          transform: translateY(-2px);
        }

        .footer-dev-card {
          padding: 14px 16px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .footer-dev-card p {
          font-size: 10px;
          color: #5b6e85;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin: 0 0 6px;
          font-weight: 500;
        }

        .footer-dev-card a {
          font-size: 13px;
          font-weight: 600;
          color: #5b9aff;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
        }

        .footer-dev-card a:hover { color: #7ab7ef; }

        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 0 48px;
          position: relative;
          z-index: 1;
        }

        .footer-divider::after {
          content: '';
          position: absolute;
          left: 0; top: 0;
          width: 100px; height: 1px;
          background: linear-gradient(90deg, #5b9aff, transparent);
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 20px 48px 28px;
          position: relative;
          z-index: 1;
        }

        .footer-copy {
          font-size: 11.5px;
          color: #5b6e85;
          margin: 0;
          letter-spacing: 0.02em;
        }

        .footer-copy strong {
          color: #7e8ea3;
          font-weight: 500;
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-legal a {
          font-size: 11px;
          color: #5b6e85;
          text-decoration: none;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .footer-legal a:hover { color: #7ab7ef; }

        .footer-legal span {
          color: rgba(255,255,255,0.08);
          font-size: 10px;
        }

        @media (max-width: 1100px) {
          .footer-main-grid {
            grid-template-columns: 1.6fr 1fr 1fr;
          }
          .footer-main-grid .footer-col:last-child {
            grid-column: span 1;
          }
        }

        @media (max-width: 768px) {
          .footer-topbar {
            padding: 28px 24px 24px;
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
            padding: 0 24px 36px;
            gap: 28px;
          }
          .footer-main-grid .footer-col:first-child {
            grid-column: span 2;
          }
          .footer-divider { margin: 0 24px; }
          .footer-bottom { padding: 18px 24px 24px; }
        }

        @media (max-width: 480px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            padding: 0 20px 32px;
          }
          .footer-main-grid .footer-col:first-child {
            grid-column: span 1;
          }
          .footer-topbar { padding: 24px 20px 20px; }
          .footer-bottom {
            padding: 16px 20px 20px;
            flex-direction: column;
            text-align: center;
          }
          .footer-divider { margin: 0 20px; }
        }
      `}</style>
    </footer>
  );
}