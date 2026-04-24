import { lazy, Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes, useLocation } from 'react-router-dom';

// Critical components - eager load (immediately needed)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WhatsAppButton from './components/WhatsAppButton';

// Non-critical pages - lazy load (load when needed)
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Simple loader (CSS-only, no extra JS library)
function PageLoader() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '60vh' 
    }}>
      <div style={{
        width: 48,
        height: 48,
        border: '4px solid #e5e7eb',
        borderTopColor: '#3b82f6',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

// Smooth Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus({ preventScroll: true });
    }
  }, [pathname]);

  return null;
}

// Layout Wrapper
function Layout({ children }) {
  return (
    <>
      <a href="#main-content" className="skip-link visually-hidden-focusable">
        Skip to main content
      </a>
      
      <Navbar />
      
      <main 
        id="main-content" 
        tabIndex={-1}
        style={{ minHeight: '80vh', outline: 'none' }}
        aria-label="Main content"
      >
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </main>
      
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <WhatsAppButton />

      <Routes>
        {/* Homepage - eager loaded */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        
        {/* Lazy loaded pages */}
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/team" element={<Layout><TeamPage /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/services/:slug" element={<Layout><ServiceDetail /></Layout>} />
        <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
        <Route path="/careers" element={<Layout><CareersPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />
        <Route path="/faq" element={<Layout><FaqPage /></Layout>} />
        <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider>
  );
}