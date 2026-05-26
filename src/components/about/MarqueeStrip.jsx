/**
 * MarqueeStrip
 * ─────────────
 * Infinite horizontal scrolling ticker in brand blue.
 * Sits between HeroSection and StatsSection.
 *
 * Props:
 *   items  string[]  — override default badge list if needed
 *   speed  number    — animation duration in seconds (default 24)
 */

import React from "react";
import { motion } from "framer-motion";
import { C } from "../../utils/tokens";

const DEFAULT_ITEMS = [
  "1200+ Projects", "ISO 9001:2015", "CIDC Award Winner",
  "10+ State", "40+ Engineers", "Green Certified",
  "Est. 2017", "BCC India",
];

export default function MarqueeStrip({ items = DEFAULT_ITEMS, speed = 24 }) {
  const doubled = [...items, ...items];

  return (
    <div style={{ background: C.blue, overflow: "hidden", padding: "14px 0" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 0, whiteSpace: "nowrap", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{
            color: "#fff", fontSize: 12, fontWeight: 800,
            letterSpacing: "2.5px", textTransform: "uppercase", padding: "0 40px",
          }}>
            {item}&nbsp;&nbsp;
            <span style={{ color: "rgba(255,255,255,.3)" }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
