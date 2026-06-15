// src/components/services/ServicesCTA.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle, FaBolt, FaTrophy, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const TRUST_ITEMS = [
  { icon: FaCheckCircle, text: "Free Quote" },
  { icon: FaCheckCircle, text: "No Obligation" },
  { icon: FaBolt, text: "24hr Response" },
  { icon: FaTrophy, text: "100% Satisfaction" },
];

export default function ServicesCTA() {
  return (
    <section className="services-cta-wrapper" aria-label="Call to action">
      <div className="services-cta-container">
        <motion.div
          className="services-cta-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow */}
          <div className="cta-eyebrow">
            <span className="eyebrow-dot" />
            Trusted by 1000+ Clients
          </div>

          {/* Heading */}
          <h2 className="cta-heading">
            Ready to Transform Your
            <br />
            <span>Vision into Reality?</span>
          </h2>

          {/* Description */}
          <p className="cta-description">
            Join <strong>1000+ satisfied clients</strong> who trusted us with
            their projects. Get expert consultation and a customized quote
            within <strong>24 hours</strong>.
          </p>

          {/* Buttons */}
          <div className="cta-buttons">
            <Link to="/contact" className="btn-primary">
              Get Free Consultation <FaArrowRight className="btn-icon" />
            </Link>
            <Link to="/projects" className="btn-secondary">
              View Success Stories
            </Link>
          </div>

          {/* Trust items */}
          <div className="cta-trust">
            {TRUST_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <span key={idx} className="trust-item">
                  <Icon /> {item.text}
                </span>
              );
            })}
          </div>

          {/* Contact info */}
          <div className="cta-contact">
            <span><FaPhoneAlt /> Call us: <a href="tel:+918057540906">+91 8057540906</a></span>
            <span className="contact-sep">|</span>
            <span><FaEnvelope /> Email: <a href="mailto:bcc06.info@gmail.com">bcc06.info@gmail.com</a></span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .services-cta-wrapper {
          position: relative;
          background: linear-gradient(135deg, #0a0f1e 0%, #0f172a 100%);
          padding: 5rem 2rem;
          overflow: hidden;
        }

        /* Subtle animated glow orbs (very light, no distraction) */
        .services-cta-wrapper::before {
          content: '';
          position: absolute;
          top: -30%;
          left: -20%;
          width: 80%;
          height: 80%;
          background: radial-gradient(circle, rgba(59,130,246,0.08), transparent);
          border-radius: 50%;
          pointer-events: none;
        }
        .services-cta-wrapper::after {
          content: '';
          position: absolute;
          bottom: -30%;
          right: -20%;
          width: 70%;
          height: 70%;
          background: radial-gradient(circle, rgba(96,165,250,0.06), transparent);
          border-radius: 50%;
          pointer-events: none;
        }

        .services-cta-container {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .services-cta-content {
          text-align: center;
        }

        /* Eyebrow */
        .cta-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(59,130,246,0.12);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(59,130,246,0.3);
          border-radius: 40px;
          padding: 5px 16px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 1px;
          color: #a5c9ff;
          margin-bottom: 1.5rem;
        }
        .eyebrow-dot {
          width: 6px;
          height: 6px;
          background: #3b82f6;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 6px #3b82f6;
        }

        /* Heading */
        .cta-heading {
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .cta-heading span {
          background: linear-gradient(135deg, #b9d8ff, #60a5fa);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        /* Description */
        .cta-description {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.8);
          max-width: 600px;
          margin: 0 auto 2rem;
        }
        .cta-description strong {
          color: #b9d8ff;
          font-weight: 600;
        }

        /* Buttons */
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(105deg, #2563eb, #1e3a8a);
          border: none;
          border-radius: 50px;
          padding: 12px 28px;
          color: white;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 8px 20px -6px rgba(37,99,235,0.4);
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 28px -8px rgba(37,99,235,0.6);
        }
        .btn-icon {
          transition: transform 0.2s;
        }
        .btn-primary:hover .btn-icon {
          transform: translateX(4px);
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.4);
          border-radius: 50px;
          padding: 12px 28px;
          color: white;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.8);
        }

        /* Trust items */
        .cta-trust {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.7);
          font-size: 0.85rem;
          font-weight: 500;
        }
        .trust-item svg {
          color: #60a5fa;
          font-size: 1rem;
        }

        /* Contact info */
        .cta-contact {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .cta-contact span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .cta-contact a {
          color: #b9d8ff;
          text-decoration: none;
          transition: color 0.2s;
        }
        .cta-contact a:hover {
          color: #60a5fa;
          text-decoration: underline;
        }
        .contact-sep {
          color: rgba(255,255,255,0.2);
        }

        @media (max-width: 640px) {
          .services-cta-wrapper {
            padding: 4rem 1.5rem;
          }
          .cta-trust {
            flex-direction: column;
            align-items: center;
          }
          .cta-contact {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
          .contact-sep {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}