import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaAward,
  FaArrowRight,
  FaStar,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";

import { C } from "../../utils/tokens";
import { Reveal, Eyebrow } from "./Shared";

export default function StorySection({
  imageUrl = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
}) {
  return (
    <section
      style={{
        padding: "120px 0",
        background:
          "linear-gradient(to bottom, #f8fbff 0%, #ffffff 100%)",
        overflow: "hidden",
      }}
    >
      <div className="bcc-wrap">
        <div
          className="g2"
          style={{
            alignItems: "center",
            gap: 70,
          }}
        >
          {/* ───────── IMAGE SIDE ───────── */}
          <Reveal delay={0}>
            <div style={{ position: "relative" }}>
              
              {/* Main Image */}
              <div
                style={{
                  borderRadius: 34,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow:
                    "0 45px 100px rgba(0,0,0,0.16)",
                }}
              >
                <img
                  src={imageUrl}
                  alt="BCC Construction Project"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: 760,
                    objectFit: "cover",
                    display: "block",
                    transform: "scale(1.02)",
                  }}
                />

                {/* Overlay Gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.05))",
                  }}
                />
              </div>

              {/* Floating Experience Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{
                  position: "absolute",
                  top: 30,
                  left: -20,
                  background: "#fff",
                  borderRadius: 24,
                  padding: "22px 26px",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.14)",
                  minWidth: 220,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 22,
                    }}
                  >
                    <FaBuilding />
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 30,
                        fontWeight: 900,
                        color: C.ink,
                        lineHeight: 1,
                      }}
                    >
                      8+
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        color: C.muted,
                        fontWeight: 700,
                        marginTop: 4,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      Years Experience
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Award Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                style={{
                  position: "absolute",
                  bottom: 35,
                  right: -20,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 24,
                  padding: "20px 22px",
                  maxWidth: 260,
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.14)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 22,
                    }}
                  >
                    <FaAward />
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        color: C.ink,
                      }}
                    >
                      Trusted Construction Partner
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        color: C.muted,
                        marginTop: 4,
                      }}
                    >
                      Delivering excellence across India
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 3,
                        marginTop: 8,
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={11}
                          color="#F5A623"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Active Projects Pill */}
              <div
                style={{
                  position: "absolute",
                  bottom: 30,
                  left: 30,
                  background: "rgba(0,0,0,.65)",
                  color: "#fff",
                  borderRadius: 100,
                  padding: "10px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  backdropFilter: "blur(10px)",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#4ade80",
                    boxShadow: "0 0 10px #4ade80",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".5px",
                  }}
                >
                  Active Across 10+ State
                </span>
              </div>
            </div>
          </Reveal>

          {/* ───────── CONTENT SIDE ───────── */}
          <Reveal delay={0.2}>
            <div>
              <Eyebrow>Who We Are</Eyebrow>

              <h2
                className="serif"
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                  lineHeight: 1.08,
                  fontWeight: 900,
                  color: C.ink,
                  marginBottom: 28,
                  letterSpacing: "-1.5px",
                }}
              >
                Building Landmarks <br />
                with Vision, Precision & Trust
              </h2>

              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.9,
                  color: C.muted,
                  marginBottom: 24,
                }}
              >
                Building Creators & Consulting (BCC) is a modern
                construction and engineering company focused on
                delivering innovative, durable, and future-ready
                infrastructure solutions across India.
              </p>

              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.9,
                  color: C.muted,
                  marginBottom: 36,
                }}
              >
                From residential developments to large-scale
                commercial and government projects, our mission is
                simple — combine smart engineering, transparent
                execution, and world-class quality in every project
                we build.
              </p>

              {/* Features */}
              <div
                style={{
                  display: "grid",
                  gap: 16,
                  marginBottom: 40,
                }}
              >
                {[
                  "Innovative & Sustainable Construction",
                  "Experienced Engineering Team",
                  "Transparent Project Management",
                  "Trusted Across Multiple Cities",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: `${C.blue}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: C.blue,
                        flexShrink: 0,
                      }}
                    >
                      <FaCheckCircle size={13} />
                    </div>

                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: C.ink,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 50,
                  paddingTop: 34,
                  borderTop: `1px solid ${C.fog}`,
                }}
              >
                {[
                  ["1200+", "Projects Completed"],
                  ["₹500Cr+", "Project Value"],
                  ["98%", "Client Satisfaction"],
                ].map(([value, label], i) => (
                  <div key={i}>
                    <div
                      className="serif"
                      style={{
                        fontSize: "2.4rem",
                        fontWeight: 900,
                        color: C.blue,
                        lineHeight: 1,
                      }}
                    >
                      {value}
                    </div>

                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 13,
                        color: C.muted,
                        fontWeight: 600,
                        letterSpacing: ".4px",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ marginTop: 46 }}>
                <Link
                  to="/about"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`,
                    color: "#fff",
                    padding: "16px 28px",
                    borderRadius: 100,
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow:
                      "0 12px 30px rgba(24,95,165,.25)",
                  }}
                >
                  Explore Our Journey
                  <FaArrowRight size={13} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}