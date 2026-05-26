// src/components/WhatsAppButton.jsx - Production-Ready Enhanced Version
import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==================== CONFIGURATION ====================

const WHATSAPP_CONFIG = {
  singleMode: false,
  contacts: [
    {
      id: 1,
      name: 'Architecture & Design',
      number: '9411311544',
      message: "Hi! I'm interested in your architecture and design services.",
      icon: '🏗️',
      role: 'Architecture Specialist',
      available: 'Online',
      responseTime: '< 5 min',
      department: 'Design',
    },
    {
      id: 2,
      name: 'Technical Support',
      number: '9411311544',
      message: 'Hello! I need technical assistance with my project.',
      icon: '🛠️',
      role: 'Technical Expert',
      available: 'Online',
      responseTime: '< 10 min',
      department: 'Support',
    },
    {
      id: 3,
      name: 'Customer Care',
      number: '9411311544',
      message: 'I have a query about your services.',
      icon: '💬',
      role: 'Customer Support',
      available: '24/7',
      responseTime: '< 2 hours',
      department: 'Customer Service',
    },
    {
      id: 4,
      name: 'Emergency Support',
      number: '9411311544',
      message: 'URGENT: Need immediate assistance!',
      icon: '🚨',
      role: 'Emergency Response',
      available: '24/7',
      responseTime: 'Immediate',
      department: 'Emergency',
      urgent: true,
    },
  ],
  settings: {
    buttonSize: 56,
    buttonPosition: 'right',
    bottomOffset: 30,
    sideOffset: 30,
    showTooltip: true,
    tooltipText: 'Chat with us 💬',
    showOnlineBadge: true,
    trackAnalytics: true,
    closeOnOutsideClick: true,
    closeOnEscape: true,
  },
  quickMessages: [
    'I need a quote for construction',
    'Tell me about your services',
    'Schedule a consultation',
    'Technical support needed',
  ],
};

// ==================== ANALYTICS HOOK ====================

const useWhatsAppAnalytics = () => {
  const trackEvent = useCallback((eventName, eventData = {}) => {
    if (!WHATSAPP_CONFIG.settings.trackAnalytics) return;
    const payload = {
      ...eventData,
      timestamp: new Date().toISOString(),
      source: 'whatsapp_button',
    };
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, payload);
    }
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, payload);
    }
    if (import.meta.env?.DEV) {
      console.log(`[Analytics] ${eventName}:`, payload);
    }
  }, []);
  return { trackEvent };
};

// ==================== SINGLE CONTACT BUTTON ====================

const SingleContactButton = ({ config, trackEvent }) => {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappUrl = `https://wa.me/${config.number}?text=${encodeURIComponent(config.message)}`;
  const handleClick = () => {
    trackEvent('whatsapp_click', { type: 'single', department: config.department });
  };
  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Chat with ${config.name} on WhatsApp`}
      className="relative flex items-center justify-center rounded-full shadow-2xl cursor-pointer"
      style={{
        width: WHATSAPP_CONFIG.settings.buttonSize,
        height: WHATSAPP_CONFIG.settings.buttonSize,
        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
        boxShadow: '0 8px 30px rgba(37, 211, 102, 0.35)',
      }}
    >
      <AnimatePresence>
        {isHovered && WHATSAPP_CONFIG.settings.showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-full mr-3 whitespace-nowrap z-10"
            role="tooltip"
          >
            <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-xl">
              {WHATSAPP_CONFIG.settings.tooltipText}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.89.58 3.65 1.6 5.12L2 22l5.04-1.78A9.56 9.56 0 0012 21.6c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="white"/>
        <path d="M16.95 14.53c-.27-.27-.76-.63-1.08-.73-.32-.1-.55-.15-.78.12-.23.27-.87 1.07-1.05 1.28-.18.21-.36.25-.63.08-.27-.17-1.17-.5-2.22-1.42-.84-.74-1.39-1.64-1.56-1.91-.17-.27-.01-.42.13-.56.13-.13.29-.33.42-.5.13-.17.18-.3.27-.5.09-.2.04-.37-.04-.54-.08-.17-.62-1.16-.83-1.59-.21-.43-.42-.37-.58-.38-.15-.01-.33-.01-.51-.01s-.47.07-.72.35c-.25.28-1 1-1 2.46 0 1.46 1.07 2.88 1.2 3.06.13.18 2.02 3.04 4.6 4.08.7.32 1.24.51 1.67.65.71.25 1.36.21 1.87.12.57-.1 1.76-.72 2.02-1.4.26-.68.26-1.26.18-1.4-.08-.14-.54-.77-.81-1.04z" fill="#25D366"/>
      </svg>
      {WHATSAPP_CONFIG.settings.showOnlineBadge && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-1 -right-1 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white"
          aria-label="Online"
        />
      )}
    </motion.a>
  );
};

// ==================== MULTI CONTACT MENU ====================

const MultiContactMenu = ({ contacts, trackEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && WHATSAPP_CONFIG.settings.closeOnEscape) {
      setIsOpen(false);
    }
  }, []);

  const handleClickOutside = useCallback((e) => {
    if (WHATSAPP_CONFIG.settings.closeOnOutsideClick && menuRef.current && !menuRef.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, handleKeyDown, handleClickOutside]);

  const handleContactClick = (contact) => {
    const message = selectedMessage || contact.message;
    const whatsappUrl = `https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`;
    trackEvent('whatsapp_click', { type: 'multi', department: contact.department, contact_name: contact.name });
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setSelectedMessage('');
  };

  const handleQuickMessage = (message) => {
    setSelectedMessage((prev) => (prev === message ? '' : message));
  };

  return (
    <div className="relative" ref={menuRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="absolute bottom-full right-0 mb-4 w-80 md:w-96 z-50"
            role="dialog"
            aria-label="WhatsApp contact options"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                <h3 className="font-bold text-lg flex items-center gap-2"><span aria-hidden="true">💬</span><span>Chat with us</span></h3>
                <p className="text-sm text-green-100 mt-1">Choose a department to connect instantly</p>
              </div>
              <div className="p-4 border-b border-gray-100">
                <p className="text-xs text-gray-500 mb-2 font-medium">Quick message (optional):</p>
                <div className="flex flex-wrap gap-2">
                  {WHATSAPP_CONFIG.quickMessages.map((msg, idx) => (
                    <button key={idx} onClick={() => handleQuickMessage(msg)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-all font-medium ${selectedMessage === msg ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      aria-pressed={selectedMessage === msg}>
                      {msg}
                    </button>
                  ))}
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {contacts.map((contact) => (
                  <button key={contact.id} onClick={() => handleContactClick(contact)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors group border-b border-gray-50 last:border-0 text-left"
                    aria-label={`Chat with ${contact.name} on WhatsApp`}>
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${contact.urgent ? 'bg-red-100' : 'bg-green-100'}`} aria-hidden="true">
                      {contact.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 flex items-center gap-2">
                        <span className="truncate">{contact.name}</span>
                        {contact.urgent && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full flex-shrink-0">Urgent</span>}
                      </div>
                      <div className="text-xs text-gray-500">{contact.role}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-green-600 font-medium">{contact.available}</span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-400">⏱️ {contact.responseTime}</span>
                      </div>
                    </div>
                    <span className="text-gray-400 group-hover:text-green-500 transition-colors flex-shrink-0" aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
              <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                <p className="text-xs text-gray-500">Response time: Typically within minutes</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        onClick={() => {
          if (!isOpen) {
            // Scroll down 200px so the full menu is visible
            window.scrollBy({ top: 200, behavior: 'smooth' });
          }
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center rounded-full shadow-2xl relative z-10"
        style={{
          width: WHATSAPP_CONFIG.settings.buttonSize,
          height: WHATSAPP_CONFIG.settings.buttonSize,
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow: '0 8px 30px rgba(37, 211, 102, 0.35)',
        }}
        aria-label={isOpen ? 'Close WhatsApp menu' : 'Open WhatsApp chat options'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.89.58 3.65 1.6 5.12L2 22l5.04-1.78A9.56 9.56 0 0012 21.6c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="white"/><path d="M16.95 14.53c-.27-.27-.76-.63-1.08-.73-.32-.1-.55-.15-.78.12-.23.27-.87 1.07-1.05 1.28-.18.21-.36.25-.63.08-.27-.17-1.17-.5-2.22-1.42-.84-.74-1.39-1.64-1.56-1.91-.17-.27-.01-.42.13-.56.13-.13.29-.33.42-.5.13-.17.18-.3.27-.5.09-.2.04-.37-.04-.54-.08-.17-.62-1.16-.83-1.59-.21-.43-.42-.37-.58-.38-.15-.01-.33-.01-.51-.01s-.47.07-.72.35c-.25.28-1 1-1 2.46 0 1.46 1.07 2.88 1.2 3.06.13.18 2.02 3.04 4.6 4.08.7.32 1.24.51 1.67.65.71.25 1.36.21 1.87.12.57-.1 1.76-.72 2.02-1.4.26-.68.26-1.26.18-1.4-.08-.14-.54-.77-.81-1.04z" fill="#25D366"/></svg>
        )}
      </motion.button>

      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 3 }}
        className="absolute inset-0 rounded-full -z-0"
        style={{ background: 'rgba(37, 211, 102, 0.25)' }}
        aria-hidden="true"
      />
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

const WhatsAppButton = () => {
  const { trackEvent } = useWhatsAppAnalytics();
  const positionStyles = {
    right: { right: WHATSAPP_CONFIG.settings.sideOffset },
    left: { left: WHATSAPP_CONFIG.settings.sideOffset },
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="fixed z-[9999]"
      style={{
        bottom: WHATSAPP_CONFIG.settings.bottomOffset,
        ...positionStyles[WHATSAPP_CONFIG.settings.buttonPosition],
      }}
    >
      {WHATSAPP_CONFIG.singleMode ? (
        <SingleContactButton config={WHATSAPP_CONFIG.contacts[0]} trackEvent={trackEvent} />
      ) : (
        <MultiContactMenu contacts={WHATSAPP_CONFIG.contacts} trackEvent={trackEvent} />
      )}
    </motion.div>
  );
};

export default WhatsAppButton;