// src/pages/ClientsPage.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  LayoutGrid,
  Shield,
  Landmark,
  Zap,
  TrainFront,
  Building2,
  ScrollText,
  Award,
  Lock,
  ClipboardCheck,
  Star,
  ArrowUpRight,
  ArrowRight,
  PhoneCall,
  Clock3,
  UserCheck2,
} from "lucide-react";
import SEO from "../components/SEO";
import ClientsHero from "../components/clients/ClientsHero";

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

const CLIENT_CATEGORIES = [
  {
    id: "defence",
    label: "Defence & Strategic",
    icon: Shield,
    num: "01",
    clients: [
      {
        name: "Military Engineering Services",
        abbr: "MES",
        bg: "#1e3a5f",
        desc: "Defence infrastructure & cantonment projects",
        website: "https://mes.gov.in",
        logo: null, // add e.g. "/assets/clients/mes.svg" once cleared for use
      },
      {
        name: "DRDO",
        abbr: "DRDO",
        bg: "#1c2b3a",
        desc: "Research facility construction & labs",
        website: "https://drdo.gov.in",
        logo: null,
      },
      {
        name: "Indian Army",
        abbr: "IA",
        bg: "#3b5323",
        desc: "Barracks, training facilities & housing",
        website: "https://indianarmy.nic.in",
        logo: null,
      },
      {
        name: "Border Roads Organisation",
        abbr: "BRO",
        bg: "#5d4e37",
        desc: "Strategic road & bridge projects",
        website: "https://bro.gov.in",
        logo: null,
      },
      {
        name: "Indian Air Force",
        abbr: "IAF",
        bg: "#1a3a6b",
        desc: "Runway & hangar infrastructure",
        website: "https://indianairforce.nic.in",
        logo: null,
      },
    ],
  },
  {
    id: "government",
    label: "Government Departments",
    icon: Landmark,
    num: "02",
    clients: [
      {
        name: "Central PWD (CPWD)",
        abbr: "CPWD",
        bg: "#005a9e",
        desc: "Central government building & infrastructure",
        website: "https://cpwd.gov.in",
        logo: null,
      },
      {
        name: "State PWD Uttarakhand",
        abbr: "PWD",
        bg: "#2e7d32",
        desc: "State road, bridge & building projects",
        website: "https://pwduk.uk.gov.in",
        logo: null,
      },
      {
        name: "Nagar Nigam",
        abbr: "NN",
        bg: "#e65100",
        desc: "Urban civic infrastructure & development",
        website: "#",
        logo: null,
      },
      {
        name: "Rural Development Dept.",
        abbr: "RDD",
        bg: "#33691e",
        desc: "Rural infrastructure & connectivity",
        website: "#",
        logo: null,
      },
      {
        name: "Irrigation Department",
        abbr: "IRR",
        bg: "#0277bd",
        desc: "Canal, dam & water management projects",
        website: "#",
        logo: null,
      },
    ],
  },
  {
    id: "energy",
    label: "Energy & Petroleum",
    icon: Zap,
    num: "03",
    clients: [
      {
        name: "Bharat Petroleum (BPCL)",
        abbr: "BPCL",
        bg: "#d84315",
        desc: "Refinery & fuel station construction",
        website: "https://bharatpetroleum.com",
        logo: null,
      },
      {
        name: "Indian Oil Corporation",
        abbr: "IOCL",
        bg: "#bf360c",
        desc: "Terminal & pipeline infrastructure",
        website: "https://iocl.com",
        logo: null,
      },
      {
        name: "NHPC Limited",
        abbr: "NHPC",
        bg: "#01579b",
        desc: "Hydropower civil works",
        website: "https://nhpc.nic.in",
        logo: null,
      },
      {
        name: "Power Grid Corporation",
        abbr: "PGC",
        bg: "#4a148c",
        desc: "Substation & transmission infrastructure",
        website: "https://powergridindia.com",
        logo: null,
      },
      {
        name: "NTPC Limited",
        abbr: "NTPC",
        bg: "#1a237e",
        desc: "Thermal plant civil construction",
        website: "https://ntpc.co.in",
        logo: null,
      },
    ],
  },
  {
    id: "transport",
    label: "Transport & Infrastructure",
    icon: TrainFront,
    num: "04",
    clients: [
      {
        name: "Rail Vikas Nigam (RVNL)",
        abbr: "RVNL",
        bg: "#880e4f",
        desc: "Railway station & track infrastructure",
        website: "https://rvnl.org",
        logo: null,
      },
      {
        name: "Airports Authority of India",
        abbr: "AAI",
        bg: "#004d40",
        desc: "Airport terminal & runway projects",
        website: "https://aai.aero",
        logo: null,
      },
      {
        name: "NHAI",
        abbr: "NHAI",
        bg: "#1b5e20",
        desc: "Highway & expressway construction",
        website: "https://nhai.gov.in",
        logo: null,
      },
      {
        name: "RITES Limited",
        abbr: "RITES",
        bg: "#3e2723",
        desc: "Transport consultancy & project management",
        website: "https://rites.com",
        logo: null,
      },
    ],
  },
  {
    id: "psu",
    label: "Public Sector Undertakings",
    icon: Building2,
    num: "05",
    clients: [
      {
        name: "HAL",
        abbr: "HAL",
        bg: "#263238",
        desc: "Aerospace facility construction",
        website: "https://hal-india.co.in",
        logo: null,
      },
      {
        name: "BARC",
        abbr: "BARC",
        bg: "#311b92",
        desc: "Atomic research facility infrastructure",
        website: "https://barc.gov.in",
        logo: null,
      },
      {
        name: "CIDCO",
        abbr: "CIDCO",
        bg: "#bf360c",
        desc: "Township & urban planning projects",
        website: "https://cidco.maharashtra.gov.in",
        logo: null,
      },
    ],
  },
  {
    id: "state",
    label: "State Government Bodies",
    icon: ScrollText,
    num: "06",
    clients: [
      {
        name: "Uttarakhand Peyjal Nigam",
        abbr: "UPN",
        bg: "#006064",
        desc: "Water supply & sanitation projects",
        website: "#",
        logo: null,
      },
      {
        name: "UP Housing Board",
        abbr: "UPHB",
        bg: "#4e342e",
        desc: "Residential township development",
        website: "#",
        logo: null,
      },
      {
        name: "Delhi Development Authority",
        abbr: "DDA",
        bg: "#0d47a1",
        desc: "Urban development & housing",
        website: "https://dda.org.in",
        logo: null,
      },
      {
        name: "Punjab Mandi Board",
        abbr: "PMB",
        bg: "#827717",
        desc: "Agricultural market infrastructure",
        website: "#",
        logo: null,
      },
    ],
  },
];

const TABS = [
  { id: "all", label: "All Partners", icon: LayoutGrid },
  ...CLIENT_CATEGORIES.map((c) => ({ id: c.id, label: c.label, icon: c.icon })),
];

const STATS = [
  { value: 50, suffix: "+", label: "Government\nClients" },
  { value: 1200, suffix: "+", label: "Projects\nDelivered" },
  { value: 98, suffix: "%", label: "On-Time\nDelivery" },
  { value: 9, suffix: "+", label: "Years of\nExcellence" },
];

const MARQUEE_ITEMS = [
  "MES", "CPWD", "BPCL", "IOCL", "RVNL", "DRDO", "NTPC", "NHPC",
  "BHEL", "AAI", "NHAI", "DDA", "HAL", "BARC", "PWD", "BRO",
];

const TRUST_INDICATORS = [
  { icon: Award, title: "ISO 9001:2015 Certified", desc: "Quality management across all operations" },
  { icon: Lock, title: "Defence Cleared Contractor", desc: "Authorised for sensitive infrastructure" },
  { icon: ClipboardCheck, title: "Pre-Qualified Vendor", desc: "Empanelled with CPWD, MES, PWD & PSUs" },
  { icon: Star, title: "9+ Years Track Record", desc: "Zero default on delivery commitments" },
];

const CTA_FEATURES = [
  { icon: UserCheck2, text: "Free project consultation" },
  { icon: Clock3, text: "Response within 24 hours" },
  { icon: PhoneCall, text: "Dedicated account manager" },
];

// ═══════════════════════════════════════════════════════════
// STYLES (matching AchievementsPage palette & fonts)
// ═══════════════════════════════════════════════════════════
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --ink: #12100e;
    --ink-2: #3d3830;
    --ink-3: #7a7068;
    --cream: #faf8f4;
    --warm: #f2ece0;
    --gold: #c8864a;
    --gold-l: #e8c99a;
    --gold-d: #9a6030;
    --white: #ffffff;
    --border: rgba(18,16,14,0.1);
    --fd: 'Cormorant Garamond', Georgia, serif;
    --fb: 'Jost', system-ui, sans-serif;
  }

  .clients-page * { box-sizing: border-box; }
  .clients-page { background: var(--cream); font-family: var(--fb); color: var(--ink); }

  /* ── HERO ── */
  .cl-hero-wrap {
    position: relative;
    background: linear-gradient(135deg, rgba(10,8,6,0.88) 0%, rgba(15,12,8,0.85) 50%, rgba(8,6,4,0.92) 100%),
      url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85&fm=webp') center/cover no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow: hidden;
    min-height: 92vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  .cl-hero-left {
    padding: 7rem 4rem 7rem 5rem;
    position: relative;
    z-index: 4;
  }
  .cl-hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: var(--fb);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #d4af37;
    margin-bottom: 2.5rem;
    opacity: 0.95;
  }
  .cl-hero-eyebrow::before {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #d4af37 0%, rgba(212,175,55,0.3) 100%);
  }
  .cl-hero-h1 {
    font-family: var(--fd);
    font-size: clamp(3.2rem, 6vw, 6rem);
    font-weight: 300;
    line-height: 1.08;
    color: var(--white);
    margin: 0 0 1.8rem;
    letter-spacing: -0.015em;
    text-shadow: 0 2px 12px rgba(0,0,0,0.6);
  }
  .cl-hero-h1 em { font-style: italic; color: #d4af37; font-weight: 400; }
  .cl-hero-desc {
    font-family: var(--fb);
    font-size: 17px;
    font-weight: 400;
    line-height: 1.9;
    color: rgba(255,255,255,0.88);
    max-width: 520px;
    margin: 0 0 3rem;
    letter-spacing: 0.3px;
  }
  .cl-hero-desc strong { color: #d4af37; font-weight: 500; }

  .cl-hero-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 2.5rem;
    max-width: 520px;
  }
  .cl-hstat {
    padding-right: 24px;
    border-right: 1px solid rgba(255,255,255,0.1);
  }
  .cl-hstat:last-child { border-right: none; }
  .cl-hstat-val {
    font-family: var(--fd);
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 300;
    line-height: 1;
    color: var(--gold);
    display: block;
  }
  .cl-hstat-lbl {
    font-family: var(--fb);
    font-size: 10.5px;
    font-weight: 300;
    color: rgba(255,255,255,0.4);
    display: block;
    margin-top: 5px;
    line-height: 1.5;
    white-space: pre-line;
  }

  .cl-hero-right {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 3rem;
  }
  .cl-hero-right::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(200,134,74,0.04) 0%, rgba(200,134,74,0.01) 100%);
    border-left: 1px solid rgba(200,134,74,0.15);
  }

  /* ── MARQUEE ── */
  .cl-marquee {
    overflow: hidden;
    padding: 14px 0;
    background: rgba(200,134,74,0.04);
    border-top: 1px solid rgba(200,134,74,0.12);
    border-bottom: 1px solid rgba(200,134,74,0.12);
    white-space: nowrap;
    position: relative;
  }
  .cl-marquee-track {
    display: inline-block;
    animation: scroll 22s linear infinite;
  }
  .cl-marquee-item {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: var(--gold-d);
    opacity: 0.6;
    margin-right: 40px;
  }
  .cl-marquee-item::after {
    content: '✦';
    margin-left: 40px;
    opacity: 0.3;
  }
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* ── INTRO ── */
  .cl-intro {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 56px 56px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 3rem;
    border-bottom: 1px solid var(--border);
  }
  .cl-intro-left { max-width: 560px; }
  .cl-intro-tag {
    font-family: var(--fb);
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1rem;
  }
  .cl-intro-tag::before { content: ''; display: block; width: 24px; height: 1px; background: var(--gold); }
  .cl-intro-h2 {
    font-family: var(--fd);
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 400;
    line-height: 1.2;
    color: var(--ink);
    margin: 0;
  }
  .cl-intro-h2 em { font-style: italic; color: var(--gold); }
  .cl-intro-right {
    font-family: var(--fb);
    font-size: 15px;
    font-weight: 300;
    line-height: 1.85;
    color: var(--ink-3);
    max-width: 360px;
  }

  /* ── FILTER TABS ── */
  .cl-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-bottom: 56px;
  }
  .cl-tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border-radius: 100px;
    border: 1px solid var(--border);
    background: transparent;
    font-family: var(--fb);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--ink-2);
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .cl-tab-btn svg { width: 14px; height: 14px; flex-shrink: 0; }
  .cl-tab-btn:hover {
    border-color: var(--gold-l);
    color: var(--gold-d);
  }
  .cl-tab-btn.active {
    background: var(--gold);
    color: var(--white);
    border-color: var(--gold);
  }
  .cl-tab-btn:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 2px;
  }

  /* ── CATEGORY BLOCK ── */
  .cl-cat-wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 56px 80px;
  }
  .cl-cat-block {
    padding: 52px 0;
    border-bottom: 1px solid var(--border);
  }
  .cl-cat-block:last-child { border-bottom: none; }
  .cl-cat-header {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 0 32px;
    margin-bottom: 36px;
    align-items: baseline;
  }
  .cl-cat-num {
    font-family: var(--fd);
    font-size: 3rem;
    font-weight: 300;
    color: var(--gold-l);
    line-height: 1;
  }
  .cl-cat-title {
    font-family: var(--fd);
    font-size: clamp(1.4rem, 2.2vw, 1.9rem);
    font-weight: 400;
    color: var(--ink);
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cl-cat-title svg { width: 22px; height: 22px; color: var(--gold); flex-shrink: 0; }
  .cl-cat-count {
    font-family: var(--fb);
    font-size: 11.5px;
    font-weight: 500;
    color: var(--gold);
    background: var(--warm);
    border: 1px solid var(--gold-l);
    padding: 2px 12px;
    border-radius: 100px;
    margin-left: auto;
  }

  /* ── CLIENT CARD ── */
  .cl-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .cl-card {
    background: var(--white);
    padding: 28px 28px 24px;
    position: relative;
    transition: background 0.3s ease;
  }
  .cl-card:hover { background: var(--warm); }
  .cl-card:hover .cl-card-title { color: var(--gold-d); }
  .cl-card-logo {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 800;
    color: #fff;
    font-family: var(--fb);
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    flex-shrink: 0;
  }
  .cl-card-logo-img {
    width: 44px;
    height: 44px;
    object-fit: contain;
    margin-bottom: 12px;
    border-radius: 6px;
    background: #fff;
    padding: 6px;
    border: 1px solid var(--border);
    flex-shrink: 0;
  }
  .cl-card-category {
    font-family: var(--fb);
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.18em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 10px;
    display: block;
  }
  .cl-card-title {
    font-family: var(--fd);
    font-size: clamp(1rem, 1.3vw, 1.2rem);
    font-weight: 400;
    line-height: 1.35;
    color: var(--ink);
    margin: 0 0 10px;
    transition: color 0.3s;
  }
  .cl-card-desc {
    font-family: var(--fb);
    font-size: 13px;
    font-weight: 300;
    line-height: 1.75;
    color: var(--ink-3);
    margin: 0;
  }
  .cl-card-corner {
    position: absolute;
    bottom: 16px;
    right: 20px;
    color: var(--gold-l);
    transition: color 0.3s, transform 0.3s;
    display: inline-flex;
  }
  .cl-card-corner svg { width: 18px; height: 18px; }
  .cl-card:hover .cl-card-corner { color: var(--gold); transform: translate(2px, -2px); }

  /* ── TRUST INDICATORS ── */
  .cl-trust-section {
    background: var(--white);
    border-top: 1px solid var(--border);
    padding: 64px 56px;
  }
  .cl-trust-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 40px;
  }
  .cl-trust-item {
    display: flex;
    gap: 18px;
    align-items: flex-start;
  }
  .cl-trust-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: var(--warm);
    border: 1px solid rgba(200,134,74,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .cl-trust-icon svg { width: 22px; height: 22px; color: var(--gold-d); }
  .cl-trust-title {
    font-family: var(--fb);
    font-weight: 700;
    font-size: 14px;
    color: var(--ink);
    margin-bottom: 4px;
  }
  .cl-trust-desc {
    font-size: 13px;
    color: var(--ink-3);
    line-height: 1.5;
  }

  /* ── CTA ── */
  .cl-cta {
    position: relative;
    background: var(--ink);
    padding: 88px 56px;
    overflow: hidden;
    isolation: isolate;
  }
  .cl-cta::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -10%;
    width: 560px;
    height: 560px;
    background: radial-gradient(circle, rgba(200,134,74,0.16) 0%, rgba(200,134,74,0) 70%);
    z-index: -1;
    pointer-events: none;
  }
  .cl-cta::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 44px 44px;
    -webkit-mask-image: radial-gradient(ellipse at 70% 20%, black, transparent 65%);
    mask-image: radial-gradient(ellipse at 70% 20%, black, transparent 65%);
    z-index: -1;
    pointer-events: none;
  }
  .cl-cta-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 4rem;
    align-items: center;
  }
  .cl-cta-tag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--fb);
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.4rem;
  }
  .cl-cta-tag::before { content: ''; display: block; width: 24px; height: 1px; background: var(--gold); }
  .cl-cta-h {
    font-family: var(--fd);
    font-size: clamp(2rem, 3.5vw, 3.2rem);
    font-weight: 400;
    color: var(--white);
    line-height: 1.2;
    margin: 0 0 1rem;
  }
  .cl-cta-h em { font-style: italic; color: var(--gold); }
  .cl-cta-p {
    font-family: var(--fb);
    font-size: 15px;
    font-weight: 300;
    color: rgba(255,255,255,0.45);
    margin: 0 0 1.8rem;
    line-height: 1.7;
    max-width: 460px;
  }
  .cl-cta-features {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .cl-cta-feature {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--fb);
    font-size: 12px;
    font-weight: 400;
    color: rgba(255,255,255,0.75);
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 8px 14px 8px 10px;
    border-radius: 100px;
    transition: border-color 0.3s, background 0.3s;
  }
  .cl-cta-feature:hover {
    border-color: rgba(200,134,74,0.4);
    background: rgba(200,134,74,0.08);
  }
  .cl-cta-feature svg { width: 14px; height: 14px; color: var(--gold); flex-shrink: 0; }

  .cl-cta-buttons { display: flex; flex-direction: column; gap: 12px; }
  .cl-cta-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    font-family: var(--fb);
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink);
    background: var(--gold);
    text-decoration: none;
    padding: 16px 22px 16px 36px;
    transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
    white-space: nowrap;
    box-shadow: 0 0 0 0 rgba(200,134,74,0.4);
  }
  .cl-cta-btn-primary svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }
  .cl-cta-btn-primary:hover {
    background: var(--gold-l);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px -6px rgba(200,134,74,0.5);
  }
  .cl-cta-btn-primary:hover svg { transform: translateX(4px); }
  .cl-cta-btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    font-family: var(--fb);
    font-size: 11.5px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    padding: 16px 22px 16px 36px;
    border: 1px solid rgba(255,255,255,0.15);
    transition: border-color 0.3s, color 0.3s, background 0.3s;
    white-space: nowrap;
  }
  .cl-cta-btn-secondary svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }
  .cl-cta-btn-secondary:hover {
    border-color: rgba(255,255,255,0.4);
    color: var(--white);
    background: rgba(255,255,255,0.03);
  }
  .cl-cta-btn-secondary:hover svg { transform: translateX(4px); }

  .cl-cta-direct {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 4px;
    font-family: var(--fb);
    font-size: 12.5px;
    color: rgba(255,255,255,0.4);
  }
  .cl-cta-direct a {
    color: var(--gold-l);
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid rgba(232,201,154,0.3);
    transition: border-color 0.3s, color 0.3s;
  }
  .cl-cta-direct a:hover { color: var(--gold); border-color: var(--gold); }
  .cl-cta-direct svg { width: 14px; height: 14px; color: var(--gold-l); flex-shrink: 0; }

  @media (max-width: 900px) {
    .cl-cta-features { gap: 8px; }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .cl-hero-wrap { grid-template-columns: 1fr; min-height: auto; }
    .cl-hero-left { padding: 5rem 1.5rem 3rem; }
    .cl-hero-right { display: none; }
    .cl-hero-stats { max-width: 100%; grid-template-columns: repeat(2,1fr); gap: 1.5rem 0; }
    .cl-hstat { border-right: none; padding-right: 0; }
    .cl-intro { flex-direction: column; padding: 48px 24px 36px; }
    .cl-cat-wrap { padding: 0 24px 56px; }
    .cl-grid { grid-template-columns: 1fr; }
    .cl-cta-inner { grid-template-columns: 1fr; gap: 2rem; }
    .cl-cta, .cl-trust-section { padding: 56px 24px; }
  }
`;

// ═══════════════════════════════════════════════════════════
// SVG ILLUSTRATION — network/stars motif, no buildings
// ═══════════════════════════════════════════════════════════
function ClientsIllustration() {
  return (
    <svg
      viewBox="0 0 520 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 480, height: 'auto', position: 'relative', zIndex: 1 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="clGoldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8864a"/>
          <stop offset="100%" stopColor="#e8c99a"/>
        </linearGradient>
      </defs>

      {/* Central star */}
      <circle cx="260" cy="300" r="4" fill="#c8864a"/>
      {/* Orbiting nodes */}
      {[
        { x: 160, y: 160, r: 2.5 },
        { x: 380, y: 120, r: 3 },
        { x: 420, y: 280, r: 2 },
        { x: 340, y: 440, r: 2.5 },
        { x: 200, y: 480, r: 2 },
        { x: 100, y: 350, r: 3 },
        { x: 280, y: 60, r: 1.8 },
        { x: 460, y: 400, r: 2.2 },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r} fill="none" stroke="#c8864a" strokeWidth="1" opacity="0.6"/>
          <circle cx={n.x} cy={n.y} r="1" fill="#c8864a" opacity="0.8"/>
        </g>
      ))}

      {/* Connecting lines */}
      {[
        [260,300,160,160],
        [260,300,380,120],
        [260,300,420,280],
        [260,300,340,440],
        [260,300,200,480],
        [260,300,100,350],
        [260,300,280,60],
        [260,300,460,400],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(200,134,74,0.15)" strokeWidth="0.75" strokeDasharray="4,4"/>
      ))}

      {/* Client icon cards floating */}
      <g transform="translate(40, 50)">
        <rect width="90" height="70" rx="4" fill="rgba(18,16,14,0.5)" stroke="rgba(200,134,74,0.2)" strokeWidth="0.8"/>
        <text x="45" y="28" textAnchor="middle" fill="#c8864a" fontSize="11" fontWeight="800" fontFamily="'Jost',sans-serif" letterSpacing="1">50+</text>
        <text x="45" y="48" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7.5" fontFamily="'Jost',sans-serif">GOVT CLIENTS</text>
      </g>

      <g transform="translate(380, 460)">
        <rect width="90" height="70" rx="4" fill="rgba(18,16,14,0.5)" stroke="rgba(200,134,74,0.2)" strokeWidth="0.8"/>
        <text x="45" y="28" textAnchor="middle" fill="#c8864a" fontSize="11" fontWeight="800" fontFamily="'Jost',sans-serif" letterSpacing="1">15+</text>
        <text x="45" y="48" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7.5" fontFamily="'Jost',sans-serif">YRS SERVICE</text>
      </g>

      <g transform="translate(360, 200)">
        <rect width="80" height="60" rx="4" fill="rgba(18,16,14,0.4)" stroke="rgba(200,134,74,0.15)" strokeWidth="0.6"/>
        <text x="40" y="44" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="'Jost',sans-serif">ENERGY</text>
      </g>

      <g transform="translate(120, 420)">
        <rect width="80" height="60" rx="4" fill="rgba(18,16,14,0.4)" stroke="rgba(200,134,74,0.15)" strokeWidth="0.6"/>
        <text x="40" y="44" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="'Jost',sans-serif">DEFENCE</text>
      </g>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════
// COUNT-UP HOOK
// ═══════════════════════════════════════════════════════════
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    let rafId;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);
  return count;
}

// ═══════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════
function StatBlock({ value, suffix, label, index, inView }) {
  const current = useCountUp(value, 1800, inView);
  return (
    <motion.div
      className="cl-hstat"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="cl-hstat-val">{inView ? current : 0}{suffix}</span>
      <span className="cl-hstat-lbl">{label}</span>
    </motion.div>
  );
}

function ClientLogo({ client }) {
  const [failed, setFailed] = useState(false);

  if (client.logo && !failed) {
    return (
      <img
        src={client.logo}
        alt={`${client.name} logo`}
        className="cl-card-logo-img"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  // Fallback: initials badge — used until a cleared logo file is added,
  // or automatically if the image fails to load.
  return (
    <span className="cl-card-logo" style={{ background: client.bg }} aria-hidden="true">
      {client.abbr.slice(0, 2)}
    </span>
  );
}

function ClientCard({ client, index, categoryLabel }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] } }),
  };

  return (
    <motion.div
      className="cl-card"
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <ClientLogo client={client} />
      <span className="cl-card-category">{categoryLabel}</span>
      <h4 className="cl-card-title">{client.name}</h4>
      <p className="cl-card-desc">{client.desc}</p>
      <span className="cl-card-corner" aria-hidden="true">
        <ArrowUpRight />
      </span>
    </motion.div>
  );
}

function CategoryBlock({ category }) {
  const Icon = category.icon;
  return (
    <motion.div
      className="cl-cat-block"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="cl-cat-header">
        <span className="cl-cat-num">{category.num}</span>
        <h3 className="cl-cat-title">
          <Icon aria-hidden="true" />
          {category.label}
          <span className="cl-cat-count">{category.clients.length} Clients</span>
        </h3>
      </div>
      <div className="cl-grid">
        {category.clients.map((client, idx) => (
          <ClientCard key={idx} client={client} index={idx} categoryLabel={category.label} />
        ))}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCHEMA & SEO SETUP
// ═══════════════════════════════════════════════════════════
const buildSchemas = () => {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BCC Building Creators And Consulting',
    url: 'https://bcc.net.in',
    logo: 'https://bcc.net.in/logo.png',
    description: 'Trusted government & institutional construction partner with 50+ clients, ISO certifications.',
    foundingDate: '2017',
    founder: { '@type': 'Person', name: 'Er. Yaseen Ahmad Khan' },
    numberOfEmployees: { '@type': 'QuantitativeValue', value: '200' },
    areaServed: { '@type': 'Country', name: 'India' },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bcc.net.in' },
      { '@type': 'ListItem', position: 2, name: 'Clients', item: 'https://bcc.net.in/clients' },
    ],
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What types of clients does BCC serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BCC serves 50+ government and institutional clients across Defence, PWD, Petroleum, Railways, and Public Sector Undertakings.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is BCC an approved government contractor?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, BCC is an empanelled contractor with CPWD, MES, State PWDs, and several PSUs.',
        },
      },
    ],
  };

  return { org, breadcrumb, faq };
};

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════
export default function ClientsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const { org, breadcrumb, faq } = useMemo(() => buildSchemas(), []);

  const visibleCategories =
    activeTab === "all"
      ? CLIENT_CATEGORIES
      : CLIENT_CATEGORIES.filter((c) => c.id === activeTab);

  return (
    <>
      <SEO
        title="Clients & Success Stories | BCC Consulting"
        description="BCC has served 50+ government & corporate clients with 1200+ successful projects. Government bodies, PWD, railways & municipal corporations trust BCC."
        keywords="BCC clients, government clients, project success stories, client testimonials, government contracts"
        url="https://bcc.net.in/clients"
        image="https://bcc.net.in/og-clients.jpg"
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(org)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(faq)}</script>
        <style>{css}</style>
      </Helmet>

      <div className="clients-page">

        {/* ══ HERO ══ */}
        <ClientsHero />

        {/* ══ MARQUEE TRUST STRIP ══ */}
        <div className="cl-marquee" aria-hidden="true">
          <div className="cl-marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="cl-marquee-item">{item}</span>
            ))}
          </div>
        </div>

        {/* ══ INTRO ══ */}
        <div className="cl-intro">
          <div className="cl-intro-left">
            <p className="cl-intro-tag">Our Esteemed Partners</p>
            <h2 className="cl-intro-h2">
              Clients Who <em>Trust BCC</em>
            </h2>
          </div>
          <p className="cl-intro-right">
            Every partnership is a milestone. These government bodies and PSUs
            have chosen BCC for our precision, reliability, and unmatched track record.
          </p>
        </div>

        {/* ══ FILTER TABS ══ */}
        <div className="cl-tabs" role="tablist" aria-label="Filter clients by category">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cl-tab-btn${activeTab === tab.id ? ' active' : ''}`}
              >
                <Icon aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ══ CATEGORY SECTIONS ══ */}
        <div className="cl-cat-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {visibleCategories.map((cat) => (
                <CategoryBlock key={cat.id} category={cat} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══ TRUST INDICATORS ══ */}
        <section className="cl-trust-section" aria-label="Why trust BCC">
          <div className="cl-trust-grid">
            {TRUST_INDICATORS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="cl-trust-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="cl-trust-icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <div>
                    <div className="cl-trust-title">{item.title}</div>
                    <div className="cl-trust-desc">{item.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="cl-cta" aria-label="Partner call to action">
          <div className="cl-cta-inner">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="cl-cta-tag">Become a Partner</p>
              <h2 className="cl-cta-h">
                Ready to Join Our<br />
                <em>Trusted Network?</em>
              </h2>
              <p className="cl-cta-p">
                Partner with BCC and experience infrastructure delivery that sets
                benchmarks — from tender to handover.
              </p>
              <div className="cl-cta-features">
                {CTA_FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.span
                      key={i}
                      className="cl-cta-feature"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      <Icon aria-hidden="true" />
                      {f.text}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="cl-cta-buttons"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/contact" className="cl-cta-btn-primary">
                Start Your Project
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link to="/projects" className="cl-cta-btn-secondary">
                View Our Work
                <ArrowRight aria-hidden="true" />
              </Link>
              <p className="cl-cta-direct">
                <PhoneCall aria-hidden="true" />
                Or call us directly at <a href="tel:+911234567890">+91 8057540906</a>
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}