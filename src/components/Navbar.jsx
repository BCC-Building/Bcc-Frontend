// src/components/Navbar.jsx
// Dual-Row Premium Navbar — Building Creators & Consulting Pvt. Ltd.
// Top info bar + Bottom nav strip | SEO | WCAG AA | Mobile-first | Production ready

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/img.webp';

/* ─── CONFIG ─── */
const COMPANY_FULL  = 'Building Creators And Consulting';
const COMPANY_SHORT = 'BCC';
const PHONE         = '+918057540906';
const PHONE_DISPLAY = '+91 80575 40906';
const EMAIL         = 'info@bcc.net.in';
const ADDRESS       = 'Guru Angad Dev Complex, 4th Floor, Rudrapur (U.S.Nagar), Uttarakhand';

const NAV_LINKS = [
  { path: '/',          name: 'Home'         },
  { path: '/about',     name: 'About Us'},
  { path: '/services',  name: 'Services'},
  { path: '/achievements', name: 'Achievements' },
  { path: '/team',      name: 'Our Experts'  },
  { path: '/clients',   name: 'Our Clients'  },
  { path: '/gallery',   name: 'Gallery'      },
  { path: '/projects',  name: 'Projects'     },
  {path: '/blog',     name: 'Blogs'        },
  {path: '/faq',  name: 'FAQ'      }, 
  { path: '/careers',   name: 'Career'       },
  { path: '/contact',   name: 'Contact Us'   },
];

/* ─── Dropdown hook ─── */
function useDropdown() {
  const [open, setOpen] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return { open, setOpen, ref };
}

export default function Navbar() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchVal,   setSearchVal]   = useState('');
  const [mobileExp,   setMobileExp]   = useState(null);
  const location = useLocation();
  const { open: ddOpen, setOpen: setDdOpen, ref: ddRef } = useDropdown();
  const searchRef = useRef(null);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', s, { passive: true });
    return () => window.removeEventListener('scroll', s);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width    = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width    = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width    = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const e = (ev) => {
      if (ev.key === 'Escape') { setMenuOpen(false); setSearchOpen(false); setDdOpen(null); }
    };
    document.addEventListener('keydown', e);
    return () => document.removeEventListener('keydown', e);
  }, []);

  useEffect(() => { setMenuOpen(false); setDdOpen(null); }, [location.pathname]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      // implement search routing as needed
      console.log('Search:', searchVal);
      setSearchVal('');
      setSearchOpen(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&display=swap');

        :root {
          --navy:      #1a2a5e;
          --navy-d:    #111e47;
          --navy-l:    #243470;
          --gold:      #c9a84c;
          --gold-l:    #e2c06a;
          --white:     #ffffff;
          --off:       #f4f6fb;
          --text:      #2d3a5c;
          --mid:       #6b7a99;
          --line:      rgba(26,42,94,.10);
          --line-w:    rgba(255,255,255,.12);
          --head:      'Barlow Condensed', sans-serif;
          --body:      'Barlow', sans-serif;
          --top-h:     68px;
          --bot-h:     48px;
          --total-h:   calc(var(--top-h) + var(--bot-h));
        }

        .nb * { box-sizing: border-box; margin: 0; padding: 0; }
        .nb { font-family: var(--body); }

        /* ══ WRAPPER ══ */
        .nb-wrap {
          position: fixed; top: 0; left: 0; right: 0; z-index: 9000;
          transition: box-shadow .3s ease;
        }
        .nb-wrap.scrolled {
          box-shadow: 0 4px 32px rgba(26,42,94,.18);
        }

        /* ══ TOP BAR ══ */
        .nb-top {
          background: var(--white);
          border-bottom: 1px solid var(--line);
          transition: height .3s ease, opacity .3s ease;
          overflow: hidden;
        }
        .nb-top-inner {
          max-width: 1320px; margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 48px);
          height: var(--top-h);
          display: flex; align-items: center; gap: 20px;
        }

        /* Logo block – no circle, clean rectangular logo */
        .nb-logo {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; flex-shrink: 0;
        }
        .nb-logo-img {
          width: auto;
          height: 48px;                /* adjust as needed */
          max-width: 180px;
          object-fit: contain;
          display: block;
          transition: transform .3s;
          border: none;                /* removed circular border */
          border-radius: 0;           /* removed border-radius */
        }
        .nb-logo:hover .nb-logo-img { transform: scale(1.03); }

        .nb-logo-fallback {
          height: 48px;
          width: 140px;
          background: var(--navy);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--head); font-weight: 800; font-size: 20px; color: var(--gold);
          flex-shrink: 0;
          transition: transform .3s;
          border: none;
          border-radius: 4px;          /* subtle radius, not circle */
        }

        .nb-logo-text { display: flex; flex-direction: column; gap: 2px; }
        .nb-logo-name {
          font-family: var(--head); font-weight: 800;
          font-size: clamp(14px, 1.4vw, 18px);
          color: var(--navy); line-height: 1.1; letter-spacing: .01em;
          text-transform: uppercase;
        }
        .nb-logo-addr {
          font-family: var(--body); font-size: 11px;
          color: var(--mid); line-height: 1.3;
          display: none;
        }
        @media (min-width: 900px) { .nb-logo-addr { display: block; } }

        /* Contact chips */
        .nb-contacts {
          display: none; align-items: center; gap: 20px; margin-left: auto;
        }
        @media (min-width: 768px) { .nb-contacts { display: flex; } }

        .nb-chip {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none;
        }
        .nb-chip-icon {
          width: 34px; height: 34px; border-radius: 8px;
          background: var(--off); border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background .2s, border-color .2s;
        }
        .nb-chip:hover .nb-chip-icon { background: var(--navy); border-color: var(--navy); }
        .nb-chip:hover .nb-chip-icon svg { stroke: #fff; }
        .nb-chip-body { display: flex; flex-direction: column; gap: 1px; }
        .nb-chip-label { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--mid); font-family: var(--body); }
        .nb-chip-val   { font-size: 13px; font-weight: 600; color: var(--text); font-family: var(--body); line-height: 1.2; }

        /* Divider */
        .nb-divider { width: 1px; height: 36px; background: var(--line); flex-shrink: 0; }

        /* Search button */
        .nb-search-btn {
          width: 36px; height: 36px; border-radius: 8px;
          background: var(--off); border: 1px solid var(--line);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          transition: background .2s, border-color .2s;
        }
        .nb-search-btn:hover { background: var(--navy); border-color: var(--navy); }
        .nb-search-btn:hover svg { stroke: #fff; }

        /* Search overlay */
        .nb-search-overlay {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: var(--white);
          display: flex; align-items: center;
          padding: 0 24px; gap: 12px;
          opacity: 0; pointer-events: none; z-index: 10;
          transition: opacity .2s;
        }
        .nb-search-overlay.open { opacity: 1; pointer-events: all; }
        .nb-search-form { flex: 1; display: flex; align-items: center; gap: 10px; }
        .nb-search-input {
          flex: 1; height: 42px; border: 1.5px solid var(--navy);
          border-radius: 8px; padding: 0 16px;
          font-family: var(--body); font-size: 15px; color: var(--text);
          outline: none; background: var(--off);
        }
        .nb-search-input::placeholder { color: var(--mid); }
        .nb-search-submit {
          height: 42px; padding: 0 20px; background: var(--navy); color: #fff;
          border: none; border-radius: 8px; cursor: pointer;
          font-family: var(--head); font-size: 14px; font-weight: 700;
          letter-spacing: .05em; text-transform: uppercase;
          transition: background .2s;
        }
        .nb-search-submit:hover { background: var(--navy-d); }
        .nb-search-close {
          width: 36px; height: 36px; background: none; border: none;
          cursor: pointer; color: var(--mid); font-size: 20px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          transition: background .2s, color .2s;
        }
        .nb-search-close:hover { background: var(--off); color: var(--text); }

        /* ══ BOTTOM NAV BAR ══ */
        .nb-bot {
          background: var(--navy);
          position: relative;
        }
        .nb-bot-inner {
          max-width: 1320px; margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 48px);
          height: var(--bot-h);
          display: flex; align-items: stretch;
        }

        /* Nav links */
        .nb-nav { display: none; align-items: stretch; gap: 0; }
        @media (min-width: 1024px) { .nb-nav { display: flex; } }

        .nb-item { position: relative; display: flex; align-items: stretch; }

        .nb-link {
          display: flex; align-items: center; gap: 5px;
          padding: 0 14px;
          font-family: var(--head); font-size: 14px; font-weight: 700;
          letter-spacing: .06em; text-transform: uppercase;
          color: rgba(255,255,255,.82);
          text-decoration: none; white-space: nowrap;
          border-bottom: 3px solid transparent;
          transition: color .2s, border-color .2s, background .2s;
          cursor: pointer; position: relative;
        }
        .nb-link:hover { color: var(--white); background: rgba(255,255,255,.07); }
        .nb-link.active {
          color: var(--gold);
          border-bottom-color: var(--gold);
        }
        .nb-link svg.dd-arrow {
          width: 12px; height: 12px; flex-shrink: 0;
          stroke: currentColor; fill: none;
          transition: transform .25s;
        }
        .nb-item.dd-open .nb-link svg.dd-arrow { transform: rotate(180deg); }

        /* Dropdown */
        .nb-dropdown {
          position: absolute; top: calc(100% + 4px); left: 0;
          min-width: 210px;
          background: var(--white);
          border-radius: 10px;
          border: 1px solid var(--line);
          box-shadow: 0 16px 48px rgba(26,42,94,.16);
          overflow: hidden;
          opacity: 0; transform: translateY(8px); pointer-events: none;
          transition: opacity .22s, transform .22s;
          z-index: 100;
        }
        .nb-item.dd-open .nb-dropdown {
          opacity: 1; transform: translateY(0); pointer-events: all;
        }
        .nb-dd-link {
          display: flex; align-items: center; gap: 8px;
          padding: 11px 16px;
          font-family: var(--body); font-size: 13.5px; font-weight: 500;
          color: var(--text); text-decoration: none;
          border-bottom: 1px solid var(--line);
          transition: background .15s, color .15s, padding-left .15s;
        }
        .nb-dd-link:last-child { border-bottom: none; }
        .nb-dd-link:hover { background: var(--off); color: var(--navy); padding-left: 22px; }
        .nb-dd-link::before {
          content: ''; width: 4px; height: 4px; border-radius: 50%;
          background: var(--gold); flex-shrink: 0;
        }

        /* Right side CTA in nav bar */
        .nb-bot-cta {
          margin-left: auto; display: none; align-items: center;
        }
        @media (min-width: 1024px) { .nb-bot-cta { display: flex; } }

        .nb-cta-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 0 18px; height: 34px; margin: auto 0;
          background: var(--gold); color: var(--navy-d);
          border-radius: 6px; text-decoration: none;
          font-family: var(--head); font-size: 13px; font-weight: 800;
          letter-spacing: .06em; text-transform: uppercase;
          transition: background .2s, transform .15s;
        }
        .nb-cta-btn:hover { background: var(--gold-l); transform: translateY(-1px); }

        /* Hamburger */
        .nb-ham {
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; margin: auto 0 auto auto;
          background: rgba(255,255,255,.1); border: none; border-radius: 8px;
          cursor: pointer; flex-direction: column; gap: 5px;
          -webkit-tap-highlight-color: transparent;
          transition: background .2s;
        }
        .nb-ham:hover { background: rgba(255,255,255,.18); }
        .nb-ham span {
          display: block; width: 20px; height: 1.5px;
          background: #fff; border-radius: 99px;
          transition: all .3s cubic-bezier(.16,1,.3,1); transform-origin: center;
        }
        .nb-ham.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nb-ham.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nb-ham.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
        @media (min-width: 1024px) { .nb-ham { display: none; } }

        /* ══ MOBILE DRAWER ══ */
        .nb-overlay {
          position: fixed; inset: 0; background: rgba(10,15,50,.55);
          backdrop-filter: blur(4px); z-index: 8900;
          opacity: 0; pointer-events: none;
          transition: opacity .35s;
        }
        .nb-overlay.open { opacity: 1; pointer-events: all; }

        .nb-drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(360px, 100vw);
          background: var(--white); z-index: 9100;
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform .38s cubic-bezier(.16,1,.3,1);
          overflow: hidden;
        }
        .nb-drawer.open { transform: translateX(0); }

        .nb-drawer-accent {
          height: 4px;
          background: linear-gradient(90deg, var(--navy), var(--gold), var(--navy));
          background-size: 200%;
          animation: accShimmer 3s linear infinite;
        }
        @keyframes accShimmer { to { background-position: 200% 0; } }

        .nb-drawer-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-bottom: 1px solid var(--line);
          background: var(--navy);
        }
        .nb-drawer-head .nb-logo-name { color: var(--white); font-size: 14px; }
        .nb-drawer-head .nb-logo-addr { color: rgba(255,255,255,.5); }

        .nb-drawer-close {
          width: 34px; height: 34px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.2);
          background: rgba(255,255,255,.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,.8); font-size: 16px;
          transition: background .2s;
        }
        .nb-drawer-close:hover { background: rgba(255,255,255,.22); color: #fff; }

        /* Mobile contact strip */
        .nb-m-contacts {
          display: flex; flex-direction: column; gap: 0;
          background: var(--off); border-bottom: 1px solid var(--line);
        }
        .nb-m-chip {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 20px; text-decoration: none;
          border-bottom: 1px solid var(--line);
        }
        .nb-m-chip:last-child { border-bottom: none; }
        .nb-m-chip-icon {
          width: 30px; height: 30px; border-radius: 6px;
          background: var(--navy); display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .nb-m-chip-val { font-family: var(--body); font-size: 13px; font-weight: 600; color: var(--text); }
        .nb-m-chip-label { font-family: var(--body); font-size: 10px; color: var(--mid); }

        /* Mobile nav links */
        .nb-m-nav { flex: 1; overflow-y: auto; padding: 8px 12px; }
        .nb-m-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px; border-radius: 8px;
          font-family: var(--head); font-size: 15px; font-weight: 700;
          letter-spacing: .06em; text-transform: uppercase;
          color: var(--text); text-decoration: none; cursor: pointer;
          margin-bottom: 2px;
          transition: background .15s, color .15s, padding-left .15s;
        }
        .nb-m-link:hover { background: var(--off); color: var(--navy); }
        .nb-m-link.active { background: rgba(26,42,94,.07); color: var(--navy); }
        .nb-m-link .m-arr { font-size: 13px; color: var(--mid); transition: transform .2s; }
        .nb-m-link.has-dd .m-arr { font-size: 11px; }
        .nb-m-link.dd-exp .m-arr { transform: rotate(90deg); }

        .nb-m-dropdown {
          overflow: hidden; max-height: 0;
          transition: max-height .3s ease;
          padding-left: 12px;
        }
        .nb-m-dropdown.open { max-height: 300px; }
        .nb-m-dd-link {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 14px; border-radius: 7px;
          font-family: var(--body); font-size: 13.5px; font-weight: 500;
          color: var(--mid); text-decoration: none; margin-bottom: 1px;
          transition: background .15s, color .15s;
        }
        .nb-m-dd-link:hover { background: var(--off); color: var(--navy); }
        .nb-m-dd-link::before {
          content: '—'; font-size: 10px; color: var(--gold);
        }

        /* Mobile CTA */
        .nb-m-footer {
          padding: 14px 16px; border-top: 1px solid var(--line);
        }
        .nb-m-cta {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 13px; border-radius: 10px;
          background: var(--navy); color: #fff; text-decoration: none;
          font-family: var(--head); font-size: 14px; font-weight: 800;
          letter-spacing: .06em; text-transform: uppercase;
          transition: background .2s;
        }
        .nb-m-cta:hover { background: var(--navy-d); }
        .nb-m-cta-gold { color: var(--gold); }

        /* Stagger animation */
        .nb-drawer.open .nb-m-link {
          animation: slideIn .4s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes slideIn {
          from { opacity:0; transform: translateX(16px); }
          to   { opacity:1; transform: translateX(0); }
        }

        /* ══ SPACER ══ */
        .nb-spacer { height: var(--total-h); }

        @media (max-width: 767px) {
          :root { --top-h: 60px; }
          .nb-spacer { height: var(--top-h); }
        }
      `}</style>

      {/* ══════════════════════════════════════════════
          NAVBAR WRAPPER
      ══════════════════════════════════════════════ */}
      <header role="banner" className="nb">
        <div className={`nb-wrap nb${scrolled ? ' scrolled' : ''}`} itemScope itemType="https://schema.org/SiteNavigationElement">

          {/* ─── TOP BAR ─── */}
          <div className="nb-top" style={{ position: 'relative' }}>
            <div className="nb-top-inner">

              {/* Logo – clean, no circle */}
              <Link to="/" className="nb-logo" aria-label={`${COMPANY_FULL} – Homepage`} itemProp="url">
                <img
                  src={logo}
                  alt={`${COMPANY_SHORT} Logo`}
                  className="nb-logo-img"
                  width="auto" height="48"
                  loading="eager" fetchPriority="high" decoding="sync"
                  itemProp="image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.insertAdjacentHTML('afterbegin',
                      `<div class="nb-logo-fallback">${COMPANY_SHORT}</div>`
                    );
                  }}
                />
                <div className="nb-logo-text" itemProp="name">
                  <span className="nb-logo-name">{COMPANY_FULL}</span>
                  <span className="nb-logo-addr">{ADDRESS}</span>
                </div>
              </Link>

              {/* Contact chips — desktop */}
              <div className="nb-contacts">
                <a href={`tel:${PHONE}`} className="nb-chip" aria-label={`Call us at ${PHONE_DISPLAY}`}>
                  <div className="nb-chip-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a2a5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                  <div className="nb-chip-body">
                    <span className="nb-chip-label">Call Us</span>
                    <span className="nb-chip-val">{PHONE_DISPLAY}</span>
                  </div>
                </a>

                <div className="nb-divider" aria-hidden="true" />

                <a href={`mailto:${EMAIL}`} className="nb-chip" aria-label={`Email us at ${EMAIL}`}>
                  <div className="nb-chip-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a2a5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="nb-chip-body">
                    <span className="nb-chip-label">Feel Free to Mail</span>
                    <span className="nb-chip-val">{EMAIL}</span>
                  </div>
                </a>

                <div className="nb-divider" aria-hidden="true" />

                {/* Search */}
                <button
                  className="nb-search-btn"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                  aria-expanded={searchOpen}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a2a5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </button>
              </div>

              {/* Search overlay (inside top bar) */}
              <div className={`nb-search-overlay${searchOpen ? ' open' : ''}`} role="search">
                <form onSubmit={handleSearch} className="nb-search-form">
                  <input
                    ref={searchRef}
                    type="search"
                    className="nb-search-input"
                    placeholder="Search projects, services…"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    aria-label="Search"
                  />
                  <button type="submit" className="nb-search-submit">Search</button>
                </form>
                <button
                  className="nb-search-close"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >✕</button>
              </div>
            </div>
          </div>

          {/* ─── BOTTOM NAV ─── */}
          <div className="nb-bot">
            <div className="nb-bot-inner" ref={ddRef}>

              {/* Desktop nav links */}
              <nav className="nb-nav" role="menubar" aria-label="Main navigation">
                {NAV_LINKS.map((link) => {
                  const isActive = location.pathname === link.path ||
                    (link.dropdown && link.dropdown.some(d => location.pathname === d.path));
                  const hasDd = !!link.dropdown;
                  const isOpen = ddOpen === link.path;

                  return (
                    <div
                      key={link.path}
                      className={`nb-item${isOpen ? ' dd-open' : ''}`}
                      onMouseEnter={() => hasDd && setDdOpen(link.path)}
                      onMouseLeave={() => hasDd && setDdOpen(null)}
                    >
                      {hasDd ? (
                        <button
                          className={`nb-link${isActive ? ' active' : ''}`}
                          onClick={() => setDdOpen(isOpen ? null : link.path)}
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                          role="menuitem"
                          itemProp="url"
                        >
                          <span itemProp="name">{link.name}</span>
                          <svg className="dd-arrow" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </button>
                      ) : (
                        <NavLink
                          to={link.path}
                          className={({ isActive: a }) => `nb-link${a ? ' active' : ''}`}
                          role="menuitem"
                          aria-current={location.pathname === link.path ? 'page' : undefined}
                          itemProp="url"
                          end={link.path === '/'}
                        >
                          <span itemProp="name">{link.name}</span>
                        </NavLink>
                      )}

                      {hasDd && (
                        <div className="nb-dropdown" role="menu" aria-label={`${link.name} submenu`}>
                          {link.dropdown.map((d) => (
                            <NavLink
                              key={d.path}
                              to={d.path}
                              className="nb-dd-link"
                              role="menuitem"
                              onClick={() => setDdOpen(null)}
                            >
                              {d.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Desktop CTA */}
              <div className="nb-bot-cta">
                <a href={`tel:${PHONE}`} className="nb-cta-btn" aria-label="Call us now">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  Get Quote
                </a>
              </div>

              {/* Hamburger */}
              <button
                className={`nb-ham${menuOpen ? ' open' : ''}`}
                onClick={() => setMenuOpen(p => !p)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="nb-mobile-menu"
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          MOBILE DRAWER
      ══════════════════════════════════════════════ */}
      <div className={`nb nb-overlay${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />

      <div
        id="nb-mobile-menu"
        className={`nb nb-drawer${menuOpen ? ' open' : ''}`}
        role="dialog" aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
      >
        <div className="nb-drawer-accent" aria-hidden="true" />

        {/* Drawer header */}
        <div className="nb-drawer-head">
          <Link to="/" className="nb-logo" onClick={() => setMenuOpen(false)}>
            <img
              src={logo} alt="BCC Logo"
              className="nb-logo-img" style={{ height: 40, maxWidth: 140 }}
              width="auto" height="40" loading="lazy" decoding="async"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.insertAdjacentHTML('afterbegin',
                  '<div class="nb-logo-fallback" style="height:40px; width:120px; font-size:16px">BCC</div>'
                );
              }}
            />
            <div className="nb-logo-text">
              <span className="nb-logo-name">BCC Consulting</span>
              <span className="nb-logo-addr" style={{ display: 'block', color: 'rgba(255,255,255,.5)', fontSize: 10 }}>Pvt. Ltd.</span>
            </div>
          </Link>
          <button className="nb-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
        </div>

        {/* Mobile contact strip */}
        <div className="nb-m-contacts">
          <a href={`tel:${PHONE}`} className="nb-m-chip" onClick={() => setMenuOpen(false)}>
            <div className="nb-m-chip-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </div>
            <div>
              <div className="nb-m-chip-label">Call Us</div>
              <div className="nb-m-chip-val">{PHONE_DISPLAY}</div>
            </div>
          </a>
          <a href={`mailto:${EMAIL}`} className="nb-m-chip" onClick={() => setMenuOpen(false)}>
            <div className="nb-m-chip-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <div className="nb-m-chip-label">Email Us</div>
              <div className="nb-m-chip-val">{EMAIL}</div>
            </div>
          </a>
        </div>

        {/* Mobile nav links */}
        <nav className="nb-m-nav" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, i) => {
            const isActive = location.pathname === link.path ||
              (link.dropdown && link.dropdown.some(d => location.pathname === d.path));
            const hasDd = !!link.dropdown;
            const isExp = mobileExp === link.path;

            return (
              <div key={link.path}>
                {hasDd ? (
                  <div
                    className={`nb-m-link has-dd${isActive ? ' active' : ''}${isExp ? ' dd-exp' : ''}`}
                    onClick={() => setMobileExp(isExp ? null : link.path)}
                    role="button"
                    aria-expanded={isExp}
                    style={{ animationDelay: `${i * 35}ms` }}
                  >
                    <span>{link.name}</span>
                    <span className="m-arr">▶</span>
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive: a }) => `nb-m-link${a ? ' active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                    style={{ animationDelay: `${i * 35}ms` }}
                    end={link.path === '/'}
                  >
                    <span>{link.name}</span>
                    <span className="m-arr">→</span>
                  </NavLink>
                )}

                {hasDd && (
                  <div className={`nb-m-dropdown${isExp ? ' open' : ''}`}>
                    {link.dropdown.map((d) => (
                      <NavLink
                        key={d.path}
                        to={d.path}
                        className="nb-m-dd-link"
                        onClick={() => setMenuOpen(false)}
                      >
                        {d.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile footer CTA */}
        <div className="nb-m-footer">
          <a href={`tel:${PHONE}`} className="nb-m-cta" onClick={() => setMenuOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Call <span className="nb-m-cta-gold">{PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>

      {/* Spacer */}
      <div className="nb nb-spacer" aria-hidden="true" />
    </>
  );
}