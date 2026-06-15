/**
 * CTASection
 * ───────────
 * Full-width navy call-to-action banner with ambient glow.
 * Two buttons + contact strip below.
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function CTASection({
  heading       = "Ready to Build Your Dream Project?",
  subtext       = "Let's discuss your vision and turn it into reality with BCC's proven expertise, transparent process, and dedicated team.",
  primaryLabel  = "Get Free Consultation",
  primaryTo     = "/contact",
  secondaryLabel= "View Portfolio",
  secondaryTo   = "/projects",
  phone         = "+91 80575 40906",
  email         = "bcc06.info@gmail.com",
  address       = "Rudrapur, Uttarakhand",
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1e3a5f 100%)",
        padding: "60px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Ambient glow orbs – softer, smaller */}
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
            top: -100,
            right: -80,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%)",
            bottom: -80,
            left: -60,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(59,130,246,0.2)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(59,130,246,0.4)",
              borderRadius: 40,
              padding: "4px 16px",
              marginBottom: 20,
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: 1,
              color: "#a5c9ff",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: "#3b82f6",
                borderRadius: "50%",
                display: "inline-block",
                boxShadow: "0 0 6px #3b82f6",
              }}
            />
            Start Today
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            {heading.includes("Dream Project") ? (
              <>
                {heading.split("Dream Project")[0]}
                <span
                  style={{
                    background: "linear-gradient(135deg, #b9d8ff, #60a5fa)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Dream Project
                </span>
                {heading.split("Dream Project")[1] || "?"}
              </>
            ) : (
              heading
            )}
          </h2>

          {/* Subtext */}
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "0.95rem",
              maxWidth: 560,
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            {subtext}
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 36,
            }}
          >
            <Link
              to={primaryTo}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(105deg, #2563eb, #1e3a8a)",
                color: "white",
                padding: "12px 28px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: "0.85rem",
                textDecoration: "none",
                transition: "all 0.25s ease",
                boxShadow: "0 8px 20px -6px rgba(37,99,235,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 24px -6px rgba(37,99,235,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 20px -6px rgba(37,99,235,0.4)";
              }}
            >
              {primaryLabel} <FaArrowRight style={{ fontSize: "0.7rem" }} />
            </Link>
            <Link
              to={secondaryTo}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.5)",
                borderRadius: 50,
                padding: "12px 28px",
                color: "white",
                fontWeight: 600,
                fontSize: "0.85rem",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              }}
            >
              {secondaryLabel}
            </Link>
          </div>

          {/* Contact strip */}
          <div
            style={{
              display: "flex",
              gap: "clamp(16px, 2vw, 28px)",
              justifyContent: "center",
              flexWrap: "wrap",
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.55)",
              fontSize: "0.8rem",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FaPhoneAlt size={11} /> {phone}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FaEnvelope size={11} /> {email}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FaMapMarkerAlt size={11} /> {address}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}