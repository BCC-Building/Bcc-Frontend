// src/App.jsx - Production-Ready with Admin Routes + Blog Slug
import { lazy, Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

// ==================== EAGER LOADED (Critical) ====================
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import FaqPage from './pages/FaqPage';
import CareersPage from './pages/CareersPage';
// ==================== LAZY LOADED (Non-Critical Pages) ====================
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ClientsPage = lazy(() => import('./pages/ClientsPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// ==================== ADMIN PAGES (Lazy Loaded) ====================
const AdminRegister = lazy(() => import('./components/admin/AdminRegister'));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const AdminVerifyOTP = lazy(() => import('./components/admin/AdminVerifyOTP'));
// ==================== UTILITIES ====================
import StorageService from './utils/storage';

// ==================== PAGE LOADER ====================
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

// ==================== SCROLL TO TOP ====================
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

// ==================== PROTECTED ROUTE (Admin Only) ====================
/**
 * ProtectedRoute Component
 * Checks if user has valid access token
 * If not, redirects to admin login page
 * If yes, renders the children (admin dashboard)
 */
function ProtectedRoute({ children }) {
  const token = StorageService.getAccessToken();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Token exists - allow access
  return children;
}

// ==================== PUBLIC LAYOUT ====================
function Layout({ children }) {
  return (
    <>
      {/* Skip to main content - Accessibility */}
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

// ==================== ADMIN LAYOUT (No public nav/footer) ====================
function AdminLayout({ children }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      style={{ minHeight: '100vh', outline: 'none' }}
      aria-label="Admin panel"
    >
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </main>
  );
}

// ==================== APP COMPONENT ====================
export default function App() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <WhatsAppButton />

      <Routes>
        {/* ==================== PUBLIC ROUTES ==================== */}

        {/* Homepage - Eager Loaded */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />

        {/* About & Team - Eager Loaded */}
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/team" element={<Layout><TeamPage /></Layout>} />

        {/* Services */}
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/services/:slug" element={<Layout><ServiceDetail /></Layout>} />

        {/* Projects */}
        <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />

        {/* Achievements */}
        <Route path="/achievements" element={<Layout><AchievementsPage /></Layout>} />
        
           {/* clients */}
        <Route path="/clients" element={<Layout><ClientsPage /></Layout>} />

        {/* Careers */}
        <Route path="/careers" element={<Layout><CareersPage /></Layout>} />

        {/* Contact */}
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />

        {/* Gallery */}
        <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />

        {/* Blog - List + Slug Detail */}
        <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><BlogPage /></Layout>} />
      {/* FAQ */}
        <Route path="/faq" element={<Layout><FaqPage /></Layout>} />

        {/* ==================== ADMIN ROUTES ==================== */}

        {/* Admin Login - Public but hidden */}
        <Route
          path="/admin/register"
          element={
            <AdminLayout>
              <AdminRegister />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/verify-otp"
          element={
            <AdminLayout>
              <AdminVerifyOTP />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/login"
          element={
            <AdminLayout>
              <AdminLogin />
            </AdminLayout>
          }
        />

        {/* Admin Dashboard - Protected */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* ==================== 404 ROUTE ==================== */}
        <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
      </Routes>
    </HelmetProvider>
  );
}
