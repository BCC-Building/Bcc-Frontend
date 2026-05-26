/**
 * ReusableHeroSection Component
 * 
 * Flexible hero section that can be customized for any page
 * Features: Image backgrounds, animations, CTA buttons, stats
 * 
 * @example
 * <ReusableHeroSection
 *   title="Our Services"
 *   subtitle="Expert solutions across architecture, design, and construction"
 *   backgroundImage="services.webp"
 *   primaryCta={{ text: "Explore Services", link: "#services" }}
 *   stats={[
 *     { value: "14+", label: "Services" },
 *     { value: "250+", label: "Projects" }
 *   ]}
 * />
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

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

  .hero-section * { box-sizing: border-box; }
  .hero-section { background: var(--cream); font-family: var(--fb); color: var(--ink); }

  .hero-section-wrapper {
    position: relative;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    min-height: 430px;
    display: flex;
    align-items: center;
    isolation: isolate;
  }

  .hero-section-wrapper::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background:
      linear-gradient(90deg, rgba(4, 18, 42, 0.86) 0%, rgba(6, 30, 75, 0.72) 48%, rgba(6, 30, 75, 0.42) 100%);
  }

  .hero-section-left {
    width: min(1140px, calc(100% - 32px));
    margin: 0 auto;
    padding: 5.5rem 0;
    position: relative;
    z-index: 2;
  }

  .hero-section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: var(--fb);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #67e8f9;
    margin-bottom: 1rem;
    opacity: 0.95;
  }
  .hero-section-eyebrow::before {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #67e8f9 0%, rgba(103,232,249,0.25) 100%);
  }

  .hero-section-h1 {
    font-family: var(--fb);
    font-size: clamp(2.35rem, 5vw, 4.75rem);
    font-weight: 800;
    line-height: 1.05;
    color: #ffffff;
    max-width: 780px;
    margin: 0 0 1.1rem;
    letter-spacing: 0;
    text-shadow: 0 3px 18px rgba(0,0,0,0.38);
  }
  .hero-section-h1 em {
    font-style: italic;
    color: #d4af37;
    font-weight: 400;
  }

  .hero-section-desc {
    font-family: var(--fb);
    font-size: 17px;
    font-weight: 500;
    line-height: 1.75;
    color: rgba(255,255,255,0.92);
    max-width: 680px;
    margin: 0 0 2rem;
    letter-spacing: 0;
  }
  .hero-section-desc strong {
    color: #d4af37;
    font-weight: 500;
  }

  .hero-section-ctas {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }

  .hero-section-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: var(--fb);
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-primary-dark, #1d4ed8);
    background: #ffffff;
    text-decoration: none;
    padding: 13px 28px;
    transition: background 0.3s, transform 0.3s;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.24);
  }
  .hero-section-btn-primary:hover {
    background: #f8fafc;
    transform: translateY(-2px);
  }

  .hero-section-btn-secondary {
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
    padding: 13px 28px;
    border: 1px solid rgba(255,255,255,0.72);
    transition: border-color 0.3s, color 0.3s;
    white-space: nowrap;
    background: transparent;
    cursor: pointer;
    border-radius: 10px;
  }
  .hero-section-btn-secondary:hover {
    border-color: rgba(255,255,255,0.4);
    color: var(--white);
  }

  .hero-section-trust {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
  .hero-section-trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255,255,255,0.82);
    font-size: 12px;
    font-weight: 500;
  }
  .hero-section-trust-item svg {
    color: #67e8f9;
  }

  .hero-section-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 1px;
    max-width: 640px;
    margin-top: 1.75rem;
    background: rgba(255,255,255,0.18);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 16px;
    overflow: hidden;
    backdrop-filter: blur(8px);
  }
  .hero-section-stat {
    padding: 18px 20px;
    background: rgba(255,255,255,0.08);
  }
  .hero-section-stat-val {
    font-family: var(--fd);
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 300;
    line-height: 1;
    color: #ffffff;
    display: block;
  }
  .hero-section-stat-lbl {
    font-family: var(--fb);
    font-size: 10.5px;
    font-weight: 300;
    color: rgba(255,255,255,0.76);
    display: block;
    margin-top: 5px;
    line-height: 1.5;
    white-space: pre-line;
  }

  @media (max-width: 900px) {
    .hero-section-wrapper {
      min-height: auto;
    }
    .hero-section-left {
      padding: 4.5rem 0 3.5rem;
    }
    .hero-section-eyebrow::before {
      width: 30px;
    }
  }
`;

export default function ReusableHeroSection({
  eyebrow = "",
  title = "",
  subtitle = "",
  backgroundImage = "",
  backgroundGradient = "linear-gradient(135deg, rgba(10,8,6,0.88) 0%, rgba(15,12,8,0.85) 50%, rgba(8,6,4,0.92) 100%)",
  primaryCta = null,
  secondaryCta = null,
  trustBadges = [],
  stats = [],
  animationDelay = 0,
}) {
  return (
    <>
      <style>{css}</style>
      <div className="hero-section">
        <section 
          className="hero-section-wrapper" 
          aria-label="Hero"
          style={{
            background: backgroundImage
              ? `${backgroundGradient}, url('${backgroundImage}') center/cover no-repeat`
              : backgroundGradient,
          }}
        >
          {/* Left Column */}
          <div className="hero-section-left">
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: animationDelay }}
              >
                <p className="hero-section-eyebrow">{eyebrow}</p>
              </motion.div>
            )}

            {title && (
              <motion.h1
                className="hero-section-h1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.7, 
                  delay: animationDelay + 0.1, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                {title}
              </motion.h1>
            )}

            {subtitle && (
              <motion.p
                className="hero-section-desc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: animationDelay + 0.25 }}
              >
                {subtitle}
              </motion.p>
            )}

            {/* CTA Buttons */}
            {(primaryCta || secondaryCta) && (
              <motion.div
                className="hero-section-ctas"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: animationDelay + 0.35 }}
              >
                {primaryCta && (
                  <Link to={primaryCta.link} className="hero-section-btn-primary">
                    {primaryCta.text} <FaArrowRight />
                  </Link>
                )}
                {secondaryCta && (
                  <Link to={secondaryCta.link} className="hero-section-btn-secondary">
                    {secondaryCta.text} <FaArrowRight />
                  </Link>
                )}
              </motion.div>
            )}

            {/* Trust Badges */}
            {trustBadges.length > 0 && (
              <motion.div
                className="hero-section-trust"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: animationDelay + 0.45 }}
              >
                {trustBadges.map((badge, idx) => (
                  <div key={idx} className="hero-section-trust-item">
                    <FaCheckCircle />
                    {badge}
                  </div>
                ))}
              </motion.div>
            )}

            {/* Stats */}
            {stats.length > 0 && (
              <div className="hero-section-stats">
                {stats.map((stat, idx) => (
                  <div key={idx} className="hero-section-stat">
                    <span className="hero-section-stat-val">{stat.value}</span>
                    <span className="hero-section-stat-lbl">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </section>
      </div>
    </>
  );
}
