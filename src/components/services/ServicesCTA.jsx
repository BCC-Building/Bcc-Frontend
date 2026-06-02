import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle, FaBolt, FaTrophy } from "react-icons/fa";

// ═══════════════════════════════════════════════════════════
// DATA – mapped from original trustItems
// ═══════════════════════════════════════════════════════════
const TRUST_ITEMS = [
  { icon: FaCheckCircle, text: "Free Quote" },
  { icon: FaCheckCircle, text: "No Obligation" },
  { icon: FaBolt, text: "24hr Response" },
  { icon: FaTrophy, text: "100% Satisfaction" },
];

// ═══════════════════════════════════════════════════════════
// STYLES – premium ink/gold palette, same as About hero
// ═══════════════════════════════════════════════════════════
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --ink: #12100e;
    --ink-2: #3d3830;
    --ink-3: #7a7068;
    --cream: #faf8f4;
    --warm: #f2ece0;
    --gold: #c8864a;
    --gold-l: #e8c99a;
    --gold-d: #9a6030;
    --white: #ffffff;
    --border: rgba(18,16,14,0.1);
    --fd: 'Cormorant Garamond', Georgia, serif;
    --fb: 'Jost', system-ui, sans-serif;
  }

  .services-cta-page * { box-sizing: border-box; }
  .services-cta-page { background: var(--cream); font-family: var(--fb); color: var(--ink); }

  .services-cta-wrapper {
    position: relative;
    background: var(--ink);
    overflow: hidden;
    padding: 7rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
  }

  .services-cta-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    width: 100%;
    text-align: center;
  }

  .services-cta-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--fb);
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold-l);
    margin-bottom: 2rem;
  }
  .services-cta-eyebrow::before {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: var(--gold);
  }

  .services-cta-h2 {
    font-family: var(--fd);
    font-size: clamp(2.4rem, 4vw, 4rem);
    font-weight: 400;
    line-height: 1.12;
    color: var(--white);
    margin: 0 0 1.5rem;
    letter-spacing: -0.01em;
  }
  .services-cta-h2 em {
    font-style: italic;
    color: var(--gold);
  }

  .services-cta-desc {
    font-family: var(--fb);
    font-size: 16px;
    font-weight: 300;
    line-height: 1.85;
    color: rgba(255,255,255,0.5);
    max-width: 600px;
    margin: 0 auto 2.5rem;
  }
  .services-cta-desc strong {
    color: rgba(255,255,255,0.85);
    font-weight: 400;
  }

  .services-cta-buttons {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 3rem;
  }

  .cta-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: var(--fb);
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink);
    background: var(--gold);
    text-decoration: none;
    padding: 16px 36px;
    transition: background 0.3s, transform 0.3s;
    white-space: nowrap;
  }
  .cta-btn-primary:hover {
    background: var(--gold-l);
    transform: translateY(-2px);
  }

  .cta-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: var(--fb);
    font-size: 11.5px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    padding: 16px 36px;
    border: 1px solid rgba(255,255,255,0.15);
    transition: border-color 0.3s, color 0.3s;
    white-space: nowrap;
  }
  .cta-btn-secondary:hover {
    border-color: rgba(255,255,255,0.4);
    color: var(--white);
  }

  .services-cta-trust {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
  }
  .services-cta-trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255,255,255,0.45);
    font-size: 12px;
    font-weight: 500;
  }
  .services-cta-trust-item svg {
    color: var(--gold);
  }

  .services-cta-contact {
    margin-top: 2.5rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255,255,255,0.1);
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    line-height: 1.7;
  }
  .services-cta-contact a {
    color: var(--gold);
    text-decoration: none;
    transition: color 0.3s;
  }
  .services-cta-contact a:hover {
    color: var(--gold-l);
  }

  /* Subtle gold grain overlay */
  .services-cta-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 30%, rgba(200,134,74,0.04) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(200,134,74,0.04) 0%, transparent 50%);
    pointer-events: none;
  }

  @media (max-width: 600px) {
    .services-cta-wrapper {
      padding: 5rem 1.5rem;
    }
    .services-cta-trust {
      flex-direction: column;
      align-items: center;
    }
  }
`;

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function ServicesCTA() {
  return (
    <>
      <style>{css}</style>
      <div className="services-cta-page">
        <section className="services-cta-wrapper" aria-label="Call to action">
          <motion.div
            className="services-cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Eyebrow */}
            <div className="services-cta-eyebrow">
              Trusted by 1000+ Clients
            </div>

            {/* Heading */}
            <h2 className="services-cta-h2">
              Ready to Transform Your
              <br />
              <em>Vision into Reality?</em>
            </h2>

            {/* Description */}
            <p className="services-cta-desc">
              Join <strong>1000+ satisfied clients</strong> who trusted us with
              their projects. Get expert consultation and a customized quote
              within <strong>24 hours</strong>.
            </p>

            {/* Buttons */}
            <div className="services-cta-buttons">
              <Link to="/contact" className="cta-btn-primary">
                Get Free Consultation <FaArrowRight />
              </Link>
              <Link to="/projects" className="cta-btn-secondary">
                View Success Stories
              </Link>
            </div>

            {/* Trust items */}
            <div className="services-cta-trust">
              {TRUST_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <span key={idx} className="services-cta-trust-item">
                    <Icon /> {item.text}
                  </span>
                );
              })}
            </div>

            {/* Contact info */}
            <div className="services-cta-contact">
              📞 Call us: <a href="tel:+918057540906">+91 8057540906</a>{" "}
              &nbsp;or&nbsp; 📧 Email:{" "}
              <a href="mailto:bcc06.info@gmail.com">bcc06.info@gmail.com</a>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}