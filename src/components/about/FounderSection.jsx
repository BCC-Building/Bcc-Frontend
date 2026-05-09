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
import { FaQuoteLeft, FaCrown } from "react-icons/fa";
import { C } from "../../utils/tokens";
import { Reveal, Eyebrow } from "./Shared";

const DEFAULTS = {
  imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  name: "Er. Yaseen Ahmad Khan",
  designation: "Founder & Managing Director",
  quote: "At BCC, construction is not about bricks and mortar — it is about building dreams, creating safe spaces, and contributing to India's growth story. Every project we undertake is a responsibility we deliver with integrity, quality, and passion.",
  stats: [["15+", "Years"], ["250+", "Projects"], ["100%", "Commitment"]],
};

export default function FounderSection({
  imageUrl    = DEFAULTS.imageUrl,
  name        = DEFAULTS.name,
  designation = DEFAULTS.designation,
  quote       = DEFAULTS.quote,
  stats       = DEFAULTS.stats,
}) {
  return (
    <section style={{
      padding: "100px 0",
      background: C.slate,
      color: C.white,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative large quote glyph */}
      <div style={{
        position: "absolute", top: -60, left: -20,
        fontSize: 320, color: "rgba(255,255,255,.02)",
        fontFamily: "Georgia, serif", lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
      }}>"</div>

      <div className="bcc-wrap">
        <div className="g2" style={{ gap: 80 }}>

          {/* ── Quote + Info ───────────────────────── */}
          <Reveal delay={0.1}>
            <div>
              <Eyebrow light>Leadership Message</Eyebrow>

              <FaQuoteLeft style={{ color: "rgba(37,99,235,.4)", fontSize: 52, marginBottom: 28 }}/>

              <blockquote style={{
                fontSize: "clamp(1.05rem, 2vw, 1.3rem)", lineHeight: 1.78,
                fontStyle: "italic", color: "rgba(255,255,255,.78)", marginBottom: 36,
                borderLeft: `4px solid ${C.blue}`, paddingLeft: 24,
              }}>
                "{quote}"
              </blockquote>

              <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,.1)", marginBottom: 28 }}/>

              {/* Founder identity */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 36 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                  background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 24,
                }}>
                  <FaCrown/>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 17, color: C.white }}>{name}</div>
                  <div style={{ color: "rgba(255,255,255,.4)", fontSize: 13 }}>{designation}</div>
                </div>
              </div>

              {/* Quick stats */}
              <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
                {stats.map(([v, l], i) => (
                  <div key={i}>
                    <div className="serif" style={{ fontSize: "1.9rem", fontWeight: 900, color: C.azure, lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.38)", marginTop: 3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Portrait ──────────────────────────── */}
          <Reveal delay={0.25} y={20}>
            <div style={{ position: "relative" }}>
              <div style={{
                borderRadius: 24, overflow: "hidden",
                boxShadow: "0 40px 80px -20px rgba(0,0,0,.5)",
              }}>
                <img
                  src={imageUrl}
                  alt={`${name} — ${designation}`}
                  loading="lazy"
                  style={{ width: "100%", height: 520, objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Gradient overlay on image */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: 24,
                background: "linear-gradient(to top, rgba(15,18,37,.65) 0%, transparent 55%)",
              }}/>

              {/* Badge */}
              <div style={{
                position: "absolute", bottom: 28, left: 28,
                background: "rgba(0,0,0,.7)", backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,.1)",
                padding: "12px 24px", borderRadius: 100,
                display: "flex", alignItems: "center", gap: 10,
                color: C.white, fontSize: 14, fontWeight: 700,
              }}>
                <FaCrown style={{ color: C.amber }}/> Visionary Leader
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
