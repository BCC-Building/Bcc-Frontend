

import React from "react";
import { C } from "../../utils/tokens";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .bcc {
    font-family: 'DM Sans', sans-serif;
    color: ${C.ink};
    overflow-x: hidden;
    background: ${C.white};
  }

  /* Serif display font */
  .bcc .serif { font-family: 'Cormorant Garamond', Georgia, serif; }

  /* Scroll progress bar */
  .bcc-prog {
    position: fixed; top: 0; left: 0; right: 0; height: 2.5px;
    background: linear-gradient(90deg, ${C.blue}, ${C.teal});
    transform-origin: 0%;
    z-index: 9999;
    pointer-events: none;
  }

  /* Max-width wrapper */
  .bcc-wrap { max-width: 1160px; margin: 0 auto; padding: 0 24px; }

  /* Gradient text */
  .bcc-gr {
    background: linear-gradient(135deg, ${C.blue} 0%, ${C.teal} 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* ── Grid helpers ─────────────────────────────── */
  .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .ga { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }

  @media(max-width: 960px) {
    .g2 { grid-template-columns: 1fr; gap: 48px; }
    .g3 { grid-template-columns: repeat(2, 1fr); }
  }
  @media(max-width: 580px) {
    .g3 { grid-template-columns: 1fr; }
  }

  /* ── Cards ────────────────────────────────────── */
  .card {
    background: ${C.white};
    border: 1px solid ${C.fog};
    border-radius: 20px;
    transition: box-shadow .3s, transform .3s;
  }
  .card:hover {
    box-shadow: 0 20px 48px -12px rgba(0,0,0,.12);
    transform: translateY(-4px);
  }

  /* Dark section card */
  .dcard {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 20px;
    transition: background .3s, border-color .3s;
  }
  .dcard:hover {
    background: rgba(255,255,255,.07);
    border-color: rgba(255,255,255,.15);
  }

  /* ── Buttons ──────────────────────────────────── */
  .btn-p {
    display: inline-flex; align-items: center; gap: 10px;
    background: ${C.blue}; color: #fff;
    padding: 14px 30px; border-radius: 8px;
    font-weight: 700; font-size: 15px;
    text-decoration: none; border: 2px solid ${C.blue};
    transition: all .28s;
  }
  .btn-p:hover { background: transparent; color: ${C.blue}; transform: translateY(-2px); }

  .btn-o {
    display: inline-flex; align-items: center; gap: 10px;
    background: transparent; color: ${C.ink};
    padding: 14px 30px; border-radius: 8px;
    font-weight: 700; font-size: 15px;
    text-decoration: none; border: 2px solid ${C.fog};
    transition: all .28s;
  }
  .btn-o:hover { border-color: ${C.blue}; color: ${C.blue}; transform: translateY(-2px); }

  .btn-g {
    display: inline-flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,.10); color: #fff;
    padding: 14px 30px; border-radius: 8px;
    font-weight: 700; font-size: 15px;
    text-decoration: none; border: 2px solid rgba(255,255,255,.20);
    backdrop-filter: blur(12px); transition: all .28s;
  }
  .btn-g:hover { background: rgba(255,255,255,.18); color: #fff; }

  /* ── Animations ───────────────────────────────── */
  @keyframes blink  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(1.3)} }
  @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

  /* Hide hero float cards on mobile */
  @media(max-width: 960px) { .hero-floats { display: none !important; } }
`;

export default function GlobalStyles() {
  return <style>{css}</style>;
}
