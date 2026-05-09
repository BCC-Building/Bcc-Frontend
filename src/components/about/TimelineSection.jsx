/**
 * TimelineSection
 * ────────────────
 * Interactive year-selector timeline.
 * Click a year tab → animated card transitions in with icon + title + description.
 *
 * Props:
 *   timeline  — override with custom TIMELINE array (defaults to aboutData.TIMELINE)
 *               Shape: { year, title, desc, icon }[]
 */

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { C } from "../../utils/tokens";
import { Reveal, Eyebrow } from "./Shared";
import { TIMELINE } from "../../data/aboutData";

export default function TimelineSection({ timeline = TIMELINE }) {
  const [active, setActive] = useState(timeline.length - 1);
  const ActiveIcon = timeline[active].icon;

  return (
    <section style={{ padding: "100px 0" }}>
      <div className="bcc-wrap">

        {/* Header */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Eyebrow center>Our Journey</Eyebrow>
            <h2 className="serif" style={{
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: C.ink,
            }}>
              9 Years of Excellence
            </h2>
          </div>
        </Reveal>

        {/* Year tab strip */}
        <Reveal delay={0.1}>
          <div style={{
            display: "flex", overflowX: "auto", paddingBottom: 28,
            borderBottom: `2px solid ${C.fog}`,
            scrollbarWidth: "none", gap: 4,
          }}>
            {timeline.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  flex: "0 0 auto", background: "none", border: "none",
                  cursor: "pointer", padding: "0 22px 24px", position: "relative", outline: "none",
                }}
              >
                <div style={{
                  fontSize: 14, fontWeight: 800,
                  color: active === i ? C.blue : C.muted,
                  transition: "color .2s",
                }}>
                  {item.year}
                </div>
                {/* Indicator dot */}
                <div style={{
                  position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)",
                  width: active === i ? 12 : 7,
                  height: active === i ? 12 : 7,
                  borderRadius: "50%",
                  background: active === i ? C.blue : C.fog,
                  border: active === i ? `2px solid ${C.blue}` : "none",
                  transition: "all .2s",
                }}/>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active milestone card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38 }}
            style={{ marginTop: 52 }}
          >
            <div style={{
              display: "grid", gridTemplateColumns: "auto 1fr",
              gap: 32, alignItems: "flex-start", maxWidth: 680,
            }}>
              {/* Icon box */}
              <div style={{
                width: 72, height: 72, borderRadius: 20, flexShrink: 0,
                background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 28,
                boxShadow: `0 14px 32px -8px ${C.blue}55`,
              }}>
                <ActiveIcon/>
              </div>

              <div>
                <div style={{
                  fontSize: 10, fontWeight: 800, color: C.blue,
                  letterSpacing: "3px", textTransform: "uppercase", marginBottom: 10,
                }}>
                  {timeline[active].year}
                </div>
                <h3 className="serif" style={{
                  fontSize: "2.1rem", fontWeight: 800, color: C.ink, marginBottom: 14,
                }}>
                  {timeline[active].title}
                </h3>
                <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.78 }}>
                  {timeline[active].desc}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
