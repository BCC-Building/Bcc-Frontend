/**
 * HeroSection
 * ────────────
 * Full-viewport dark hero with:
 *  • Parallax scroll (content fades + rises as you scroll)
 *  • Floating animated stat cards (hidden on mobile)
 *  • Ambient light blobs & grid overlay
 *  • Animated "live" badge, headline, sub-copy, CTA buttons, trust strip
 *  • Scroll-down indicator
 *
 * Props: none  (uses react-router Link — adjust if using Next.js <Link>)
 */

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight, FaArrowDown, FaCheckCircle } from "react-icons/fa";
import { C } from "../../utils/tokens";

export default function HeroSection() {
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const y    = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const blobs = [
    { w: 800, h: 800, bg: "rgba(37,99,235,.16)",  top: -220, left: -220   },
    { w: 560, h: 560, bg: "rgba(6,182,212,.11)",  bottom: -140, right: -100 },
    { w: 400, h: 400, bg: "rgba(167,139,250,.07)",top: "40%", left: "40%"  },
  ];

  const trustBadges = ["ISO 9001:2015 Certified", "CIDC Award Winner", "Green Certified"];

  const floatCards = [
    ["250+", "Projects Delivered"],
    ["15+",  "Years Excellence"],
    ["100%", "Client Satisfaction"],
  ];

  return (
    <section
      ref={wrapRef}
      style={{
        minHeight: "100vh",
        background: C.ink,
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* ── Ambient blobs ─────────────────────────── */}
      {blobs.map((b, i) => (
        <div key={i} style={{
          position: "absolute", width: b.w, height: b.h, borderRadius: "50%",
          background: `radial-gradient(circle, ${b.bg} 0%, transparent 70%)`,
          filter: "blur(48px)", pointerEvents: "none",
          ...(b.top    !== undefined ? { top:    b.top    } : {}),
          ...(b.bottom !== undefined ? { bottom: b.bottom } : {}),
          ...(b.left   !== undefined ? { left:   b.left   } : {}),
          ...(b.right  !== undefined ? { right:  b.right  } : {}),
        }}/>
      ))}

      {/* ── Grid overlay ──────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }}/>

      {/* ── Parallax content wrapper ──────────────── */}
      <motion.div
        className="bcc-wrap"
        style={{ position: "relative", zIndex: 5, y, opacity: fade, width: "100%" }}
      >
        <div style={{ maxWidth: 760 }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              background: "rgba(37,99,235,.15)", border: "1px solid rgba(37,99,235,.3)",
              padding: "8px 20px", borderRadius: 100,
              color: "#93C5FD", fontSize: 12, fontWeight: 700,
              letterSpacing: "2px", textTransform: "uppercase",
            }}>
              <span style={{
                width: 8, height: 8, background: C.emerald, borderRadius: "50%",
                animation: "blink 2s infinite",
              }}/>
              Est. 2010&nbsp;&nbsp;·&nbsp;&nbsp;Industry Leader
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="serif"
            style={{
              fontSize: "clamp(3.2rem, 7.5vw, 5.8rem)", lineHeight: 1.04,
              fontWeight: 900, color: C.white, margin: "28px 0 24px",
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Building India's<br/>
            <span className="bcc-gr">Future Together</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.18rem)", color: "rgba(255,255,255,.6)",
              lineHeight: 1.8, maxWidth: 540, marginBottom: 44,
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32 }}
          >
            We don't just construct buildings — we architect legacies. Delivering
            250+ landmark projects with uncompromising quality, transparency, and
            engineering innovation since 2010.
          </motion.p>

          {/* CTAs */}
          <motion.div
            style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 52 }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46 }}
          >
            <Link to="/contact" className="btn-p">
              Start Your Project <FaArrowRight/>
            </Link>
            <Link to="/projects" className="btn-g">View Portfolio</Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            style={{ display: "flex", gap: 28, flexWrap: "wrap" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.64 }}
          >
            {trustBadges.map((b, i) => (
              <span key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                color: "rgba(255,255,255,.5)", fontSize: 13,
              }}>
                <FaCheckCircle style={{ color: C.emerald }}/>{b}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Floating stat cards (desktop only) ──── */}
        <motion.div
          className="hero-floats"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.52 }}
          style={{
            position: "absolute", right: 0, top: "50%",
            transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", gap: 14,
          }}
        >
          {floatCards.map(([v, l], i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "rgba(255,255,255,.06)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,.1)", borderRadius: 16,
                padding: "20px 28px", textAlign: "center", minWidth: 168,
              }}
            >
              <div className="serif" style={{ fontSize: "2rem", fontWeight: 800, color: C.white, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 5, letterSpacing: "1.5px", textTransform: "uppercase" }}>{l}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          color: "rgba(255,255,255,.28)", fontSize: 10,
          letterSpacing: "2.5px", textTransform: "uppercase",
        }}
      >
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <FaArrowDown/>
        </motion.div>
        Scroll
      </motion.div>
    </section>
  );
}
