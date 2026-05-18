/**
 * FounderSection
 * ───────────────
 * Dark cinematic section with founder quote (left) and portrait (right).
 * Features: large decorative quote mark, stat strip, branded badge on image.
 *
 * Props:
 *   imageUrl      string  — override portrait photo
 *   name          string  — founder name
 *   designation   string  — title line
 *   quote         string  — the message text
 *   stats         array   — [["15+","Years"],["250+","Projects"],["100%","Commitment"]]
 */

import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaCrown, FaStar } from "react-icons/fa";
import { C } from "../../utils/tokens";
import { Reveal, Eyebrow } from "./Shared";

// ── Same folder as your logo image ──────────────────────────
import MDImage from "../../assets/MD_Image.png";
const DEFAULTS = {
  name: "Er. Yaseen Ahmad Khan",
  designation: "Founder & Managing Director",
  tagline: "Building India's Future, One Project at a Time",
  quote:
    "At BCC, construction is not merely about bricks and mortar — it is about building dreams, creating safe spaces, and contributing to India's growth story.",
  subQuote:
    "Every project we undertake is a responsibility we deliver with unwavering integrity, uncompromising quality, and relentless passion.",
  stats: [
    ["15+", "Years of Excellence"],
    ["1200+", "Projects Delivered"],
    ["100%", "Client Commitment"],
  ],
};

export default function FounderSection({
  imageUrl    = null,                      // pass a URL to override the local import
  name        = DEFAULTS.name,
  designation = DEFAULTS.designation,
  tagline     = DEFAULTS.tagline,
  quote       = DEFAULTS.quote,
  subQuote    = DEFAULTS.subQuote,
  stats       = DEFAULTS.stats,
}) {
  const portraitSrc = imageUrl || MDImage;

  return (
    <section
      style={{
        padding: "110px 0 100px",
        background: C.slate,
        color: C.white,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Decorative large quote glyph ── */}
      <div
        style={{
          position: "absolute",
          top: -40,
          left: -10,
          fontSize: 380,
          color: "rgba(255,255,255,.02)",
          fontFamily: "Georgia, serif",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        "
      </div>

      {/* ── Subtle grid texture overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div className="bcc-wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="g2" style={{ gap: 80, alignItems: "center" }}>

          {/* ══ LEFT — Quote + Info ══════════════════════════ */}
          <Reveal delay={0.1}>
            <div>

              {/* Eyebrow label */}
              <Eyebrow light>Leadership Message</Eyebrow>

              {/* Section heading */}
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 800,
                  color: C.white,
                  marginBottom: 8,
                  lineHeight: 1.2,
                }}
              >
                A Word From Our Founder
              </h2>

              {/* Tagline */}
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: C.azure,
                  marginBottom: 36,
                }}
              >
                {tagline}
              </p>

              {/* Quote icon */}
              <FaQuoteLeft
                style={{
                  color: `${C.blue}66`,
                  fontSize: 48,
                  marginBottom: 20,
                }}
              />

              {/* Primary quote */}
              <blockquote
                style={{
                  fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                  lineHeight: 1.82,
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "rgba(255,255,255,.88)",
                  marginBottom: 20,
                  borderLeft: `4px solid ${C.blue}`,
                  paddingLeft: 24,
                }}
              >
                "{quote}"
              </blockquote>

              {/* Secondary / continuation quote */}
              <p
                style={{
                  fontSize: "clamp(.95rem, 1.6vw, 1.1rem)",
                  lineHeight: 1.78,
                  color: "rgba(255,255,255,.55)",
                  paddingLeft: 28,
                  marginBottom: 36,
                  borderLeft: `2px solid rgba(255,255,255,.1)`,
                }}
              >
                {subQuote}
              </p>

              {/* Divider */}
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid rgba(255,255,255,.08)",
                  marginBottom: 28,
                }}
              />

              {/* ── Founder identity chip ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  marginBottom: 40,
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 22,
                    boxShadow: `0 0 0 3px rgba(37,99,235,.25)`,
                  }}
                >
                  <FaCrown />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 17,
                      color: C.white,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {name}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,.4)",
                      fontSize: 13,
                      marginTop: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <FaStar style={{ color: C.amber, fontSize: 10 }} />
                    {designation}
                  </div>
                </div>
              </div>

              {/* ── Quick stats strip ── */}
              <div
                style={{
                  display: "flex",
                  gap: 0,
                  flexWrap: "wrap",
                  background: "rgba(255,255,255,.04)",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,.07)",
                  overflow: "hidden",
                }}
              >
                {stats.map(([value, label], i) => (
                  <div
                    key={i}
                    style={{
                      flex: "1 1 100px",
                      padding: "22px 20px",
                      textAlign: "center",
                      borderRight:
                        i < stats.length - 1
                          ? "1px solid rgba(255,255,255,.07)"
                          : "none",
                    }}
                  >
                    <div
                      className="serif"
                      style={{
                        fontSize: "2rem",
                        fontWeight: 900,
                        color: C.azure,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,.35)",
                        marginTop: 6,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </Reveal>

          {/* ══ RIGHT — Portrait ════════════════════════════ */}
          <Reveal delay={0.25} y={20}>
            <div style={{ position: "relative" }}>

              {/* Glow halo behind image */}
              <div
                style={{
                  position: "absolute",
                  inset: -24,
                  borderRadius: 32,
                  background: `radial-gradient(ellipse at 60% 40%, ${C.blue}33, transparent 70%)`,
                  filter: "blur(24px)",
                  pointerEvents: "none",
                }}
              />

              {/* Portrait frame */}
              <div
                style={{
                  borderRadius: 24,
                  overflow: "hidden",
                  boxShadow: "0 40px 80px -20px rgba(0,0,0,.6)",
                  position: "relative",
                }}
              >
                <img
                  src={portraitSrc}
                  alt={`${name} — ${designation}`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: 540,
                    objectFit: "cover",
                    objectPosition: "top center",
                    display: "block",
                  }}
                />

                {/* Bottom gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(10,14,30,.75) 0%, transparent 50%)",
                  }}
                />
              </div>

              {/* ── Visionary Leader badge ── */}
              <div
                style={{
                  position: "absolute",
                  bottom: 28,
                  left: 28,
                  background: "rgba(0,0,0,.72)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,.12)",
                  padding: "12px 22px",
                  borderRadius: 100,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: C.white,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                <FaCrown style={{ color: C.amber, fontSize: 15 }} />
                Visionary Leader
              </div>

              {/* ── Experience badge (top-right) ── */}
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`,
                  padding: "10px 18px",
                  borderRadius: 100,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  boxShadow: `0 8px 24px ${C.blue}55`,
                }}
              >
                <FaStar style={{ fontSize: 11 }} />
                15+ Years Experience
              </div>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}