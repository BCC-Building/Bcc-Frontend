/**
 * StorySection
 * ─────────────
 * Two-column layout: construction image (left) + brand story copy (right).
 * Features overlapping award badge and "Est. 2010" chip on the image.
 *
 * Props:
 *   imageUrl  string  — override the Unsplash placeholder with your own photo
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaAward, FaArrowRight } from "react-icons/fa";
import { C } from "../../utils/tokens";
import { Reveal, Eyebrow } from "./Shared";

export default function StorySection({
  imageUrl = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
}) {
  return (
    <section style={{ padding: "100px 0" }}>
      <div className="bcc-wrap">
        <div className="g2">

          {/* ── Image ─────────────────────────────── */}
          <Reveal delay={0}>
            <div style={{ position: "relative" }}>
              <div style={{
                borderRadius: 24, overflow: "hidden",
                boxShadow: "0 40px 80px -20px rgba(0,0,0,.18)",
              }}>
                <img
                  src={imageUrl}
                  alt="BCC Construction project site"
                  loading="lazy"
                  style={{ width: "100%", height: 520, objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Award badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                style={{
                  position: "absolute", bottom: 28, right: -20,
                  background: C.white, borderRadius: 16, padding: "18px 24px",
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,.14)",
                  display: "flex", alignItems: "center", gap: 14, maxWidth: 256,
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 22,
                }}>
                  <FaAward/>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: C.ink }}>CIDC Award 2023</div>
                  <div style={{ fontSize: 12, color: C.muted }}>Best Construction Company</div>
                </div>
              </motion.div>

              {/* Est. chip */}
              <div style={{
                position: "absolute", top: 24, left: 24,
                background: C.blue, color: "#fff",
                padding: "8px 18px", borderRadius: 100,
                fontSize: 12, fontWeight: 800, letterSpacing: "1.5px",
              }}>
                Est. 2010
              </div>
            </div>
          </Reveal>

          {/* ── Text ──────────────────────────────── */}
          <Reveal delay={0.2}>
            <div>
              <Eyebrow>Our Legacy</Eyebrow>
              <h2 className="serif" style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900,
                color: C.ink, lineHeight: 1.12, marginBottom: 24,
              }}>
                From Vision to<br/>
                <span className="bcc-gr">Industry Leadership</span>
              </h2>

              <p style={{ color: C.muted, lineHeight: 1.82, marginBottom: 18, fontSize: 16 }}>
                Building Creators & Consulting (BCC) was founded on one revolutionary idea:
                bring radical transparency, precision engineering, and genuine integrity to
                India's construction industry.
              </p>
              <p style={{ color: C.muted, lineHeight: 1.82, marginBottom: 40, fontSize: 16 }}>
                A three-person team with a single ambition has grown into a 30+ strong
                powerhouse — trusted by homeowners, developers, and government bodies
                across 15+ cities.
              </p>

              {/* Quick stats */}
              <div style={{
                display: "flex", gap: 44,
                borderTop: `1px solid ${C.fog}`, paddingTop: 32, flexWrap: "wrap",
              }}>
                {[["250+", "Projects"], ["₹500Cr+", "Value Delivered"], ["100%", "Satisfaction"]].map(([v, l], i) => (
                  <div key={i}>
                    <div className="serif" style={{
                      fontSize: "2rem", fontWeight: 900, color: C.blue, lineHeight: 1,
                    }}>{v}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 4, fontWeight: 600 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
