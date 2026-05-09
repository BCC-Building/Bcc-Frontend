/**
 * StatsSection
 * ─────────────
 * Grid of animated stat counters.
 * Numbers count up when the section scrolls into view.
 *
 * Props:
 *   stats  — override with custom array (defaults to aboutData.STATS)
 *            Shape: { value, suffix, label, icon, color }[]
 */

import React from "react";
import { C } from "../../utils/tokens";
import { Reveal, Counter } from "./Shared";
import { STATS } from "../../data/aboutData";

export default function StatsSection({ stats = STATS }) {
  return (
    <section style={{ padding: "72px 0", background: C.snow, borderBottom: `1px solid ${C.fog}` }}>
      <div className="bcc-wrap">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 2,
          background: C.fog,
          border: `1px solid ${C.fog}`,
          borderRadius: 20,
          overflow: "hidden",
        }}>
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={i * 0.07}>
                <div
                  style={{
                    background: C.white, padding: "38px 20px",
                    textAlign: "center", transition: "background .22s", cursor: "default",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.snow}
                  onMouseLeave={e => e.currentTarget.style.background = C.white}
                >
                  <div style={{ color: s.color, fontSize: 30, marginBottom: 14 }}>
                    <Icon/>
                  </div>
                  <div className="serif" style={{
                    fontSize: "2.5rem", fontWeight: 800, color: C.ink, lineHeight: 1,
                  }}>
                    <Counter target={s.value} suffix={s.suffix}/>
                  </div>
                  <div style={{
                    fontSize: 11, color: C.muted, marginTop: 7,
                    letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600,
                  }}>
                    {s.label}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
