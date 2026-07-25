
import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/img.webp";

export default function WelcomePopup() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const showTimerRef = useRef(null);
  const autoCloseTimerRef = useRef(null);

  // ─── Check if popup should show ──────────────────────────────────────────
  useEffect(() => {
    const checkPopup = () => {
      //  1. Check if already seen
      const hasSeen = localStorage.getItem("bcc_welcome_seen");
      if (hasSeen) {
        setVisible(false);
        return;
      }

      //  2. Don't show on admin dashboard
      const path = location.pathname;
      if (path.includes("/admin") || path.includes("/dashboard")) {
        setVisible(false);
        return;
      }

      //  3. Show popup after 600ms
      showTimerRef.current = setTimeout(() => {
        setVisible(true);
        //  3. Mark as seen immediately when shown
        localStorage.setItem("bcc_welcome_seen", "true");
      }, 600);
    };

    checkPopup();

    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
    };
  }, [location.pathname]);

  // ─── Auto-close after 10 seconds ──────────────────────────────────────────
  useEffect(() => {
    if (visible) {
      autoCloseTimerRef.current = setTimeout(() => {
        handleClose();
      }, 10000);
    }
    return () => {
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    };
  }, [visible]);

  const handleClose = useCallback(() => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
    setClosing(true);
    setTimeout(() => setVisible(false), 450);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className={`wp-overlay ${closing ? "wp-overlay--out" : "wp-overlay--in"}`}
        onClick={handleClose}
        aria-modal="true"
        role="dialog"
        aria-label="Welcome to BCC"
      >
        <div
          className={`wp-popup ${closing ? "wp-popup--out" : "wp-popup--in"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ─── Particles ─────────────────────────────────────────────────── */}
          {[15, 28, 45, 60, 75, 88].map((left, i) => (
            <span
              key={i}
              className="wp-particle"
              style={{
                left: `${left}%`,
                animationDuration: `${3.5 + i * 0.6}s`,
                animationDelay: `${i * 0.4}s`,
                width: i % 2 === 0 ? "4px" : "3px",
                height: i % 2 === 0 ? "4px" : "3px",
              }}
            />
          ))}

          {/* Top glow */}
          <div className="wp-top-glow" aria-hidden="true" />

          {/* Close button */}
          <button
            className="wp-close"
            onClick={handleClose}
            aria-label="Close welcome popup"
          >
            ✕
          </button>

          {/* Header */}
          <div className="wp-header">
            <div className="wp-logo-ring">
              <svg
                className="wp-logo-svg"
                viewBox="0 0 72 72"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="36" cy="36" r="34"
                  stroke="rgba(234,163,32,0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="36" cy="36" r="34"
                  stroke="rgba(234,163,32,0.7)"
                  strokeWidth="1.5"
                  strokeDasharray="12 200"
                  strokeLinecap="round"
                />
              </svg>
              <div className="wp-logo-inner">
                <img src={logo} alt="BCC Logo" />
              </div>
            </div>

            <p className="wp-eyebrow">— Welcome to —</p>
            <h2 className="wp-title">
              Building Creators<br />And Consulting
            </h2>
            <p className="wp-sub">Rudrapur, Uttarakhand · Est. 2017</p>
          </div>

          {/* Divider */}
          <div className="wp-divider" aria-hidden="true">
            <div className="wp-divider-line" />
            <div className="wp-divider-diamond" />
            <div className="wp-divider-line" />
          </div>

          {/* Body */}
          <div className="wp-body">
            <p className="wp-message">
              Aapka haardik swagat hai!<br />
              Hum <strong>quality, safety aur professionalism</strong> ke saath
              aapke sapno ko haqeeqat mein badalne ke liye yahan hain.
            </p>

            <div className="wp-stats">
              {[
                { num: "9+", label: "Years" },
                { num: "1200+", label: "Projects" },
                { num: "100%", label: "Quality" },
              ].map((s) => (
                <div key={s.label} className="wp-stat">
                  <div className="wp-stat-num">{s.num}</div>
                  <div className="wp-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>

            <button className="wp-cta" onClick={handleClose}>
              Explore Our Work →
            </button>
            <button className="wp-skip" onClick={handleClose}>
              Skip for now
            </button>
          </div>

          {/* Animated gold bar */}
          <div className="wp-footer-bar" aria-hidden="true" />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ─── Overlay ─── */
        .wp-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
          transition: opacity 0.4s ease;
        }

        .wp-overlay--in  { animation: wp-overlay-in 0.4s ease forwards; }
        .wp-overlay--out { animation: wp-overlay-in 0.4s ease reverse forwards; }

        @keyframes wp-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ─── Popup card ─── */
        .wp-popup {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: linear-gradient(145deg, #0d1629 0%, #111827 60%, #0d1629 100%);
          border-radius: 24px;
          border: 1px solid rgba(234, 163, 32, 0.22);
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(234,163,32,0.07),
            0 40px 80px rgba(0,0,0,0.7),
            0 0 60px rgba(234,163,32,0.04) inset;
        }

        .wp-popup--in {
          animation: wp-popup-in 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .wp-popup--out {
          animation: wp-popup-out 0.4s cubic-bezier(0.55, 0, 1, 0.45) forwards;
        }

        @keyframes wp-popup-in {
          from { opacity: 0; transform: scale(0.62) translateY(40px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes wp-popup-out {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to   { opacity: 0; transform: scale(0.88) translateY(24px); }
        }

        /* ─── Particles ─── */
        .wp-particle {
          position: absolute;
          bottom: 0;
          border-radius: 50%;
          background: rgba(234,163,32,0.55);
          pointer-events: none;
          animation: wp-float linear infinite;
        }

        @keyframes wp-float {
          0%   { transform: translateY(0) scale(0);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-460px) scale(1.2); opacity: 0; }
        }

        /* ─── Top glow ─── */
        .wp-top-glow {
          position: absolute;
          top: -70px; left: 50%;
          transform: translateX(-50%);
          width: 320px; height: 140px;
          background: radial-gradient(ellipse, rgba(234,163,32,0.14) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ─── Close button ─── */
        .wp-close {
          position: absolute;
          top: 14px; right: 14px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #445566;
          font-size: 13px;
          z-index: 10;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          line-height: 1;
        }

        .wp-close:hover {
          background: rgba(234,163,32,0.12);
          border-color: rgba(234,163,32,0.32);
          color: #eaa320;
        }

        /* ─── Header ─── */
        .wp-header {
          padding: 36px 32px 0;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .wp-logo-ring {
          width: 72px; height: 72px;
          position: relative;
          margin: 0 auto 18px;
        }

        .wp-logo-svg {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          animation: wp-spin 4s linear infinite;
        }

        @keyframes wp-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .wp-logo-inner {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          background: transparent;
          box-shadow: none;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .wp-logo-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .wp-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #eaa320;
          margin: 0 0 10px;
          animation: wp-fade-up 0.5s 0.5s both;
        }

        .wp-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px; font-weight: 700;
          color: #ffffff;
          line-height: 1.25;
          margin: 0 0 6px;
          animation: wp-fade-up 0.5s 0.65s both;
        }

        .wp-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 500;
          color: #eaa320;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0 0 22px;
          animation: wp-fade-up 0.5s 0.75s both;
        }

        @keyframes wp-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Divider ─── */
        .wp-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 32px;
          margin-bottom: 22px;
          animation: wp-fade-up 0.5s 0.85s both;
          position: relative; z-index: 1;
        }

        .wp-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(234,163,32,0.3), transparent);
        }

        .wp-divider-diamond {
          width: 6px; height: 6px;
          background: #eaa320;
          transform: rotate(45deg);
          animation: wp-diamond-pulse 1.6s ease-in-out infinite;
        }

        @keyframes wp-diamond-pulse {
          0%, 100% { box-shadow: 0 0 5px rgba(234,163,32,0.5); transform: rotate(45deg) scale(1); }
          50%       { box-shadow: 0 0 14px rgba(234,163,32,0.9); transform: rotate(45deg) scale(1.4); }
        }

        /* ─── Body ─── */
        .wp-body {
          padding: 0 32px 30px;
          text-align: center;
          position: relative; z-index: 1;
          animation: wp-fade-up 0.5s 0.9s both;
        }

        .wp-message {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 300;
          line-height: 1.78;
          color: #6a7e94;
          margin: 0 0 22px;
        }

        .wp-message strong {
          color: #d4a93a;
          font-weight: 500;
        }

        /* ─── Stats ─── */
        .wp-stats {
          display: flex;
          border: 1px solid rgba(234,163,32,0.12);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .wp-stat {
          flex: 1;
          padding: 14px 8px;
          border-right: 1px solid rgba(234,163,32,0.1);
          text-align: center;
        }

        .wp-stat:last-child { border-right: none; }

        .wp-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 21px; font-weight: 700;
          color: #eaa320;
          line-height: 1;
          margin-bottom: 4px;
        }

        .wp-stat-lbl {
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px; font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #384858;
        }

        /* ─── CTA Button ─── */
        .wp-cta {
          display: block;
          width: 100%;
          padding: 15px 24px;
          background: linear-gradient(135deg, #c8922a 0%, #eaa320 50%, #f5c842 100%);
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #0a0f1e;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          margin-bottom: 12px;
          box-shadow: 0 6px 24px rgba(234,163,32,0.25);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .wp-cta::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 55%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          animation: wp-shimmer 2.6s ease-in-out infinite;
        }

        @keyframes wp-shimmer {
          0%      { left: -100%; }
          50%, 100% { left: 160%; }
        }

        .wp-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(234,163,32,0.38);
        }

        .wp-cta:active {
          transform: translateY(0);
        }

        /* ─── Skip ─── */
        .wp-skip {
          display: block;
          width: 100%;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #384858;
          cursor: pointer;
          transition: color 0.2s;
          padding: 4px 0;
        }

        .wp-skip:hover { color: #6a8099; }

        /* ─── Animated gold footer bar ─── */
        .wp-footer-bar {
          height: 3px;
          background: linear-gradient(90deg, #c8922a, #eaa320, #f5c842, #eaa320, #c8922a);
          background-size: 200% 100%;
          animation: wp-gold-move 3s linear infinite;
        }

        @keyframes wp-gold-move {
          0%   { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }

        /* ─── Responsive ─── */
        @media (max-width: 480px) {
          .wp-header { padding: 28px 22px 0; }
          .wp-body { padding: 0 22px 24px; }
          .wp-divider { padding: 0 22px; }
          .wp-title { font-size: 22px; }
        }
      `}</style>
    </>
  );
}