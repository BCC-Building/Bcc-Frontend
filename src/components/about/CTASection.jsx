/**
 * CTASection
 * ───────────
 * Dark gradient call-to-action banner with ambient blobs.
 * Two buttons + contact strip below.
 *
 * Props:
 *   heading       string  — main headline (default provided)
 *   subtext       string  — paragraph below heading
 *   primaryLabel  string  — label for primary button
 *   primaryTo     string  — react-router path for primary button
 *   secondaryLabel string — label for secondary button
 *   secondaryTo   string  — react-router path for secondary button
 *   phone         string
 *   email         string
 *   address       string
 */

import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { C } from "../../utils/tokens";
import { Reveal, Eyebrow } from "./Shared";

export default function CTASection({
  heading       = "Ready to Build Your Dream Project?",
  subtext       = "Let's discuss your vision and turn it into reality with BCC's proven expertise, transparent process, and dedicated team.",
  primaryLabel  = "Get Free Consultation",
  primaryTo     = "/contact",
  secondaryLabel= "View Portfolio",
  secondaryTo   = "/projects",
  phone         = "+91-XXXXXXXXXX",
  email         = "bcc06.info@gmail.com",
  address       = "Rudrapur, UK",
}) {
  return (
    <section style={{ padding: "80px 0 100px" }}>
      <div className="bcc-wrap">
        <Reveal>
          <div style={{
            background: `linear-gradient(135deg, ${C.ink} 0%, #0d1b4b 100%)`,
            borderRadius: 32, padding: "clamp(48px, 9vw, 96px)",
            position: "relative", overflow: "hidden", textAlign: "center",
          }}>

            {/* Ambient blobs */}
            <div style={{
              position: "absolute", width: 500, height: 500, borderRadius: "50%",
              background: `radial-gradient(circle, ${C.blue}30 0%, transparent 70%)`,
              top: -180, right: -120, pointerEvents: "none",
            }}/>
            <div style={{
              position: "absolute", width: 420, height: 420, borderRadius: "50%",
              background: `radial-gradient(circle, ${C.teal}20 0%, transparent 70%)`,
              bottom: -160, left: -100, pointerEvents: "none",
            }}/>

            <div style={{ position: "relative", zIndex: 1 }}>
              <Eyebrow light center>Start Today</Eyebrow>

              <h2 className="serif" style={{
                fontSize: "clamp(2rem, 5.5vw, 3.8rem)", fontWeight: 900,
                color: C.white, marginBottom: 16, lineHeight: 1.08, marginTop: 8,
              }}>
                {heading.split("Dream Project?").length > 1 ? (
                  <>
                    {heading.split("Dream Project?")[0]}
                    <span className="bcc-gr">Dream Project?</span>
                  </>
                ) : heading}
              </h2>

              <p style={{
                color: "rgba(255,255,255,.5)", fontSize: 17,
                maxWidth: 480, margin: "0 auto 44px", lineHeight: 1.75,
              }}>
                {subtext}
              </p>

              {/* Buttons */}
              <div style={{
                display: "flex", gap: 16, justifyContent: "center",
                flexWrap: "wrap", marginBottom: 40,
              }}>
                <Link to={primaryTo} style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: C.white, color: C.ink,
                  padding: "16px 36px", borderRadius: 8,
                  fontWeight: 800, fontSize: 15, textDecoration: "none",
                  transition: "all .28s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,.22)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >
                  {primaryLabel} <FaArrowRight/>
                </Link>
                <Link to={secondaryTo} className="btn-g">{secondaryLabel}</Link>
              </div>

              {/* Contact strip */}
              <div style={{
                display: "flex", gap: 32, justifyContent: "center",
                flexWrap: "wrap", color: "rgba(255,255,255,.38)", fontSize: 14,
              }}>
                <span>📞 {phone}</span>
                <span>✉️ {email}</span>
                <span>🏢 {address}</span>
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
