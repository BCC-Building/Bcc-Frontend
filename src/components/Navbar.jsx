// src/components/Navbar.jsx - Final Optimized Version
import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/img.webp';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll effect with passive listener for better performance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const navLinks = [
    { path: "/", name: "Home", icon: "🏠" },
    { path: "/about", name: "About", icon: "ℹ️" },
    { path: "/services", name: "Services", icon: "🛠️" },
    { path: "/projects", name: "Projects", icon: "📁" },
    { path: "/blog", name: "Blog", icon: "📝" },
    { path: "/faq", name: "FAQ", icon: "❓" },
    { path: "/gallery", name: "Gallery", icon: "🖼️" },
    { path: "/careers", name: "Careers", icon: "💼" },
    { path: "/contact", name: "Contact", icon: "📞" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full transition-all duration-300 z-[9999] ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white shadow-md'
        }`}
        style={{ 
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Logo Section - Desktop */}
            <Link 
              to="/" 
              className="flex items-center gap-2 md:gap-3 shrink-0"
              aria-label="Building Creators And Consulting - Go to homepage"
            >
              <img
                src={logo}
                alt="Building Creators And Consulting logo"
                className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-lg"
                width="48"
                height="48"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
              />
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs text-gray-500 font-medium hidden sm:block">
                  BUILDING CREATORS
                </span>
                <span className="text-sm md:text-base font-bold text-gray-800">
                  BCC <span className="hidden sm:inline">CONSULTING</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1" role="menubar" aria-label="Desktop navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  role="menuitem"
                  className={({ isActive }) => `
                    px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap
                    ${isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }
                  `}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-base" aria-hidden="true">{link.icon}</span>
                    <span>{link.name}</span>
                  </span>
                </NavLink>
              ))}
            </div>

            {/* Desktop Call Button */}
            <div className="hidden lg:block">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Call Building Creators And Consulting at +91 98765 43210"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 z-[10000] relative focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between" aria-hidden="true">
                <span className={`w-full h-0.5 bg-gray-800 transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-gray-800 transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-all duration-300 lg:hidden ${
          isOpen ? 'opacity-100 visible z-[9998]' : 'opacity-0 invisible -z-10'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-all duration-300 transform lg:hidden ${
          isOpen ? 'translate-x-0 z-[9999]' : 'translate-x-full -z-10'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        aria-hidden={!isOpen}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Building Creators And Consulting logo"
              className="h-10 w-10 rounded-lg"
              width="40"
              height="40"
              loading="lazy"
              decoding="async"
            />
            <div>
              <div className="text-xs text-gray-500">BUILDING CREATORS</div>
              <div className="font-bold text-gray-800">AND CONSULTING</div>
            </div>
          </div>
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close navigation menu"
            autoFocus={isOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 73px)' }} aria-label="Mobile navigation">
          <div className="space-y-1" role="menu">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                role="menuitem"
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                <span className="text-xl" aria-hidden="true">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
                {location.pathname === link.path && (
                  <span className="ml-auto text-blue-600" aria-label="Current page">✓</span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Call Button */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={closeMenu}
              aria-label="Call Building Creators And Consulting at +91 98765 43210"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Now: +91 98765 43210</span>
            </a>
          </div>

          {/* Mobile Social Links */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">Follow us on</p>
            <div className="flex justify-center gap-4 mt-3">
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                aria-label="Follow us on Facebook (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                aria-label="Follow us on LinkedIn (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                aria-label="Follow us on Twitter (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Spacer to prevent content hiding under navbar */}
      <div className="h-16 md:h-20" aria-hidden="true"></div>
    </>
  );
}