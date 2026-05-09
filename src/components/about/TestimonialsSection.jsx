/**
 * TestimonialsSection
 * ────────────────────
 * Auto-fit grid of client testimonial cards.
 * Each card: star rating, italic quote, author initial avatar + name/role.
 *
 * Props:
 *   testimonials  — override with live data (defaults to aboutData.TESTIMONIALS)
 *                   Shape: { name, role, rating, text }[]
 */

import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { C } from "../../utils/tokens";
import { Reveal, Eyebrow } from "./Shared";
import { testimonials as TESTIMONIALS } from "../../data/aboutData";

export default function TestimonialsSection({ testimonials = TESTIMONIALS }) {
  return (
    <section style={{ padding: "100px 0" }}>
      <div className="bcc-wrap">

        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Eyebrow center>Client Stories</Eyebrow>
            <h2 className="serif" style={{
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: C.ink, marginBottom: 12,
            }}>
              Trusted Across India
            </h2>
            <p style={{ color: C.muted, maxWidth: 420, margin: "0 auto" }}>
              What the people who've built with us have to say.
            </p>
          </div>
        </Reveal>

        <div className="ga">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="card"
                style={{ padding: "36px 32px", position: "relative", overflow: "hidden" }}
              >
                {/* Decorative quote glyph */}
                <div style={{
                  position: "absolute", top: 12, right: 16, fontSize: 80,
                  color: `${C.blue}0D`, fontFamily: "Georgia, serif",
                  lineHeight: 1, userSelect: "none",
                }}>"</div>

                {/* Star rating */}
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <FaStar key={j} style={{ color: C.amber, fontSize: 14 }}/>
                  ))}
                </div>

                {/* Quote text */}
                <p style={{
                  color: "#334155", lineHeight: 1.78, fontStyle: "italic",
                  marginBottom: 28, fontSize: 15, position: "relative", zIndex: 1,
                }}>
                  "{t.text}"
                </p>

                {/* Author */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 14,
                  borderTop: `1px solid ${C.fog}`, paddingTop: 20,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                    background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 900, fontSize: 17,
                  }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: C.ink }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
