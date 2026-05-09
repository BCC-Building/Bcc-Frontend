/**
 * MissionSection
 * ───────────────
 * Dark section containing:
 *  • Mission card  (left)
 *  • Vision card   (right)
 *  • 6-item values grid below
 *
 * Props:
 *   values  — override with custom VALUES array (defaults to aboutData.VALUES)
 */

import React from "react";
import { FaRocket, FaEye } from "react-icons/fa";
import { C } from "../../utils/tokens";
import { Reveal, Eyebrow } from "./Shared";
import { VALUES } from "../../data/aboutData";
import { motion } from "framer-motion";

const MV_CARDS = [
  {
    icon: FaRocket,
    label: "Mission",
    color: C.azure,
    text: "To deliver exceptional construction, consulting, and soil investigation services that exceed client expectations through innovation, integrity, and engineering precision.",
  },
  {
    icon: FaEye,
    label: "Vision",
    color: C.teal,
    text: "To become India's most trusted construction partner — recognised for transforming ideas into iconic realities while creating sustainable, lasting value for communities.",
  },
];

export default function MissionSection({ values = VALUES }) {
  return (
    <section style={{
      padding: "100px 0",
      background: C.carbon,
      color: C.white,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`,
        backgroundSize: "44px 44px",
      }}/>

      <div className="bcc-wrap" style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Eyebrow light center>Our Purpose</Eyebrow>
            <h2 className="serif" style={{
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900,
              color: C.white, marginBottom: 14,
            }}>
              Mission, Vision & Values
            </h2>
            <p style={{
              color: "rgba(255,255,255,.45)", maxWidth: 460, margin: "0 auto",
              fontSize: 15, lineHeight: 1.75,
            }}>
              Principles that have guided every brick we've laid since 2010
            </p>
          </div>
        </Reveal>

        {/* Mission + Vision cards */}
        <div className="g2" style={{ gap: 24, marginBottom: 56 }}>
          {MV_CARDS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={i} delay={i * 0.15}>
                <div className="dcard" style={{ padding: "36px 32px" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: `${item.color}22`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 20, color: item.color, fontSize: 22,
                  }}>
                    <Icon/>
                  </div>
                  <div style={{
                    fontSize: 10, fontWeight: 800, letterSpacing: "3px",
                    textTransform: "uppercase", color: item.color, marginBottom: 12,
                  }}>
                    Our {item.label}
                  </div>
                  <p style={{ color: "rgba(255,255,255,.65)", lineHeight: 1.78, fontSize: 15 }}>
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Values grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}>
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={i} delay={i * 0.07}>
                <motion.div whileHover={{ y: -4 }} className="dcard" style={{ padding: "26px 22px", cursor: "default" }}>
                  <div style={{ color: v.color, fontSize: 26, marginBottom: 14 }}><Icon/></div>
                  <h4 style={{ color: C.white, fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{v.title}</h4>
                  <p style={{ color: "rgba(255,255,255,.42)", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
