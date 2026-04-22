// src/components/WhatsAppButton.jsx - Always Visible Version
import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Configuration - Easy to maintain
const WHATSAPP_CONFIG = {
  // Single Contact Mode
  singleMode: false,
  
  // Multiple Contacts Mode
  contacts: [
    {
      id: 1,
      name: "Architecture & Design",
      number: "919876543210",
      message: "Hi! I'm interested in your architecture and design services. Can you provide more details?",
      icon: "💰",
      role: "Sales Executive",
      available: "Online",
      responseTime: "< 5 min",
      department: "Design"
    },
    {
      id: 2,
      name: "Technical Support",
      number: "919876543211",
      message: "Hello! I need technical assistance with my project.",
      icon: "🛠️",
      role: "Technical Expert",
      available: "Online",
      responseTime: "< 10 min",
      department: "Support"
    },
    {
      id: 3,
      name: "Customer Care",
      number: "919876543212",
      message: "I have a query about your services.",
      icon: "💬",
      role: "Customer Support",
      available: "24/7",
      responseTime: "< 2 hours",
      department: "Customer Service"
    },
    {
      id: 4,
      name: "Emergency",
      number: "919876543213",
      message: "URGENT: Need immediate assistance!",
      icon: "🚨",
      role: "Emergency Support",
      available: "24/7",
      responseTime: "Immediate",
      department: "Emergency",
      urgent: true
    }
  ],
  
  // Default Settings
  settings: {
    buttonSize: 56,
    buttonPosition: "right", // right | left
    bottomOffset: 30,
    sideOffset: 30,
    showTooltip: true,
    tooltipText: "Chat with us 💬",
    showOnlineBadge: true,
    animationDuration: 0.3,
    enableSound: false,
    trackAnalytics: true
  },
  
  // Pre-written messages
  quickMessages: [
    "I need a quote for construction",
    "Tell me about your services",
    "Schedule a consultation",
    "Technical support needed"
  ]
};

// Custom Hook for Analytics
const useAnalytics = () => {
  const trackEvent = useCallback((eventName, eventData = {}) => {
    if (!WHATSAPP_CONFIG.settings.trackAnalytics) return;
    
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, {
        ...eventData,
        timestamp: new Date().toISOString()
      });
    }
    
    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', eventName, eventData);
    }
    
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${eventName}:`, eventData);
    }
  }, []);
  
  return { trackEvent };
};

// Single Contact Button Component
const SingleContactButton = ({ config, trackEvent }) => {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappLink = `https://wa.me/${config.number}?text=${encodeURIComponent(config.message)}`;

  const handleClick = () => {
    trackEvent('whatsapp_click', {
      type: 'single',
      department: 'general'
    });
  };

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center justify-center rounded-full shadow-2xl cursor-pointer transition-all duration-300"
      style={{
        width: WHATSAPP_CONFIG.settings.buttonSize,
        height: WHATSAPP_CONFIG.settings.buttonSize,
        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
        boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)'
      }}
    >
      <AnimatePresence>
        {isHovered && WHATSAPP_CONFIG.settings.showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-full mr-3 whitespace-nowrap z-10"
          >
            <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-xl">
              {WHATSAPP_CONFIG.settings.tooltipText}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 13.89 2.58 15.65 3.6 17.12L2 22L7.04 20.22C8.46 21.08 10.11 21.6 12 21.6C17.52 21.6 22 17.12 22 12C22 6.48 17.52 2 12 2Z" fill="white"/>
        <path d="M16.95 14.53C16.68 14.26 15.92 13.9 15.6 13.8C15.28 13.7 15.05 13.65 14.82 13.92C14.59 14.19 13.95 14.99 13.77 15.2C13.59 15.41 13.41 15.45 13.14 15.28C12.87 15.11 11.97 14.78 10.92 13.86C10.08 13.12 9.53 12.22 9.36 11.95C9.19 11.68 9.35 11.53 9.49 11.39C9.62 11.26 9.78 11.06 9.91 10.89C10.04 10.72 10.09 10.59 10.18 10.39C10.27 10.19 10.22 10.02 10.14 9.85C10.06 9.68 9.52 8.69 9.31 8.26C9.1 7.83 8.89 7.89 8.73 7.88C8.58 7.87 8.4 7.87 8.22 7.87C8.04 7.87 7.75 7.94 7.5 8.22C7.25 8.5 6.5 9.22 6.5 10.68C6.5 12.14 7.57 13.56 7.7 13.74C7.83 13.92 9.52 16.56 12.1 17.6C12.8 17.92 13.34 18.11 13.77 18.25C14.48 18.5 15.13 18.46 15.64 18.37C16.21 18.27 17.4 17.65 17.66 16.97C17.92 16.29 17.92 15.71 17.84 15.57C17.76 15.43 17.22 14.8 16.95 14.53Z" fill="#25D366"/>
      </svg>

      {WHATSAPP_CONFIG.settings.showOnlineBadge && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-white"
        >
          ●
        </motion.div>
      )}
    </motion.a>
  );
};

// Multiple Contacts Menu Component
const MultiContactMenu = ({ contacts, trackEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');

  const handleContactClick = (contact) => {
    const message = selectedMessage || contact.message;
    const whatsappLink = `https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`;
    
    trackEvent('whatsapp_click', {
      type: 'multi',
      department: contact.department,
      contact_name: contact.name
    });
    
    window.open(whatsappLink, '_blank');
    setIsOpen(false);
    setSelectedMessage('');
  };

  const handleQuickMessage = (message) => {
    setSelectedMessage(message);
  };

  return (
    <div className="relative">
      {/* Floating Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute bottom-full right-0 mb-4 w-80 md:w-96"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span>💬</span>
                  <span>Chat with us</span>
                </h3>
                <p className="text-sm text-green-100 mt-1">
                  We're here to help! Choose a department
                </p>
              </div>

              {/* Quick Messages */}
              <div className="p-4 border-b border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Quick messages:</p>
                <div className="flex flex-wrap gap-2">
                  {WHATSAPP_CONFIG.quickMessages.map((msg, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickMessage(msg)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                        selectedMessage === msg
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contacts List */}
              <div className="max-h-96 overflow-y-auto">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => handleContactClick(contact)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors group border-b border-gray-50 last:border-0"
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      contact.urgent ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      {contact.icon}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-800 flex items-center gap-2">
                        {contact.name}
                        {contact.urgent && (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{contact.role}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-green-600">{contact.available}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">⏱️ {contact.responseTime}</span>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="text-gray-400 group-hover:text-green-500 transition-colors">
                      →
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="p-3 bg-gray-50 text-center">
                <p className="text-xs text-gray-500">
                  Response time: Typically within minutes
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: isOpen ? 45 : 0,
          transition: { duration: 0.3 }
        }}
        className="flex items-center justify-center rounded-full shadow-2xl transition-all duration-300"
        style={{
          width: WHATSAPP_CONFIG.settings.buttonSize,
          height: WHATSAPP_CONFIG.settings.buttonSize,
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)'
        }}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 13.89 2.58 15.65 3.6 17.12L2 22L7.04 20.22C8.46 21.08 10.11 21.6 12 21.6C17.52 21.6 22 17.12 22 12C22 6.48 17.52 2 12 2Z" fill="white"/>
            <path d="M16.95 14.53C16.68 14.26 15.92 13.9 15.6 13.8C15.28 13.7 15.05 13.65 14.82 13.92C14.59 14.19 13.95 14.99 13.77 15.2C13.59 15.41 13.41 15.45 13.14 15.28C12.87 15.11 11.97 14.78 10.92 13.86C10.08 13.12 9.53 12.22 9.36 11.95C9.19 11.68 9.35 11.53 9.49 11.39C9.62 11.26 9.78 11.06 9.91 10.89C10.04 10.72 10.09 10.59 10.18 10.39C10.27 10.19 10.22 10.02 10.14 9.85C10.06 9.68 9.52 8.69 9.31 8.26C9.1 7.83 8.89 7.89 8.73 7.88C8.58 7.87 8.4 7.87 8.22 7.87C8.04 7.87 7.75 7.94 7.5 8.22C7.25 8.5 6.5 9.22 6.5 10.68C6.5 12.14 7.57 13.56 7.7 13.74C7.83 13.92 9.52 16.56 12.1 17.6C12.8 17.92 13.34 18.11 13.77 18.25C14.48 18.5 15.13 18.46 15.64 18.37C16.21 18.27 17.4 17.65 17.66 16.97C17.92 16.29 17.92 15.71 17.84 15.57C17.76 15.43 17.22 14.8 16.95 14.53Z" fill="#25D366"/>
          </svg>
        )}
      </motion.button>

      {/* Pulse Animation */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
        className="absolute inset-0 rounded-full -z-10"
        style={{
          background: 'rgba(37, 211, 102, 0.3)',
        }}
      />
    </div>
  );
};

// Main Component - ALWAYS VISIBLE (No scroll hiding)
const WhatsAppButton = () => {
  const { trackEvent } = useAnalytics();
  
  const positionStyles = {
    right: { right: WHATSAPP_CONFIG.settings.sideOffset },
    left: { left: WHATSAPP_CONFIG.settings.sideOffset }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed z-[9999]"
      style={{
        bottom: WHATSAPP_CONFIG.settings.bottomOffset,
        ...positionStyles[WHATSAPP_CONFIG.settings.buttonPosition]
      }}
    >
      {WHATSAPP_CONFIG.singleMode ? (
        <SingleContactButton 
          config={WHATSAPP_CONFIG.contacts[0]} 
          trackEvent={trackEvent}
        />
      ) : (
        <MultiContactMenu 
          contacts={WHATSAPP_CONFIG.contacts} 
          trackEvent={trackEvent}
        />
      )}
    </motion.div>
  );
};

export default WhatsAppButton;