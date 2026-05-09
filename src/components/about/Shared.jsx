/**
 * BCC Shared Micro-Components
 * ─────────────────────────────
 * Reveal      — scroll-triggered fade-up wrapper (use on any block)
 * Eyebrow     — section label above headings
 * Chip        — small tag pill (skills, expertise)
 * Counter     — animated number that counts up on scroll
 *
 * Import what you need:
 *   import { Reveal, Eyebrow, Chip, Counter } from '../components/shared/Shared';
 */

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { C } from "../../utils/tokens";

/* ── Scroll-triggered fade-up ─────────────────── */
export function Reveal({ children, delay = 0, y = 36, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section eyebrow label ────────────────────── */
export function Eyebrow({ children, light = false, center = false }) {
  return (
    <div style={{
      display: center ? "flex" : "inline-flex",
      alignItems: "center",
      justifyContent: center ? "center" : "flex-start",
      gap: 10,
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: light ? "#93C5FD" : C.blue,
      marginBottom: 20,
    }}>
      <span style={{
        width: 24, height: 2,
        background: light ? "#93C5FD" : C.blue,
        borderRadius: 2,
      }} />
      {children}
    </div>
  );
}

/* ── Expertise / skill chip ───────────────────── */
export function Chip({ children }) {
  return (
    <span style={{
      background: "rgba(37,99,235,0.10)",
      color: C.azure,
      padding: "3px 11px",
      borderRadius: 100,
      fontSize: 11,
      fontWeight: 700,
    }}>
      {children}
    </span>
  );
}

/* ── Animated counter ─────────────────────────── */
export function Counter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref  = useRef(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!seen) return;
    let n = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      n += step;
      if (n >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(n));
    }, 16);
    return () => clearInterval(timer);
  }, [seen, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
