
import { lazy, Suspense, memo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"

// ==================== SHARED COMPONENTS ====================
import PageLoader     from './shared/components/Loading/PageLoader';
import ScrollToTop    from './features/layout/components/ScrollToTop';
import ProtectedRoute from './features/layout/components/ProtectedRoute';

// ==================== LAYOUT COMPONENTS ====================
import Navbar         from './features/layout/components/Navbar';
import Footer         from './features/layout/components/Footer';
import WhatsAppButton from './features/layout/components/WhatsAppButton';

// ==================== PUBLIC PAGES (EAGER LOADED - CRITICAL) ====================
import HomePage  from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage  from './pages/TeamPage';
import FaqPage   from './pages/FaqPage';

// ==================== PUBLIC PAGES (LAZY LOADED - NON-CRITICAL) ====================
const ServicesPage     = lazy(() => import('./pages/ServicesPage'));
const ServiceDetail    = lazy(() => import('./pages/ServiceDetail'));
const ProjectsPage     = lazy(() => import('./pages/ProjectsPage'));
const ClientsPage      = lazy(() => import('./pages/ClientsPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const ContactPage      = lazy(() => import('./pages/ContactPage'));
const GalleryPage      = lazy(() => import('./pages/GalleryPage'));
const BlogPage         = lazy(() => import('./pages/BlogPage'));
const CareersPage      = lazy(() => import('./pages/CareersPage'));
const NotFoundPage     = lazy(() => import('./pages/NotFoundPage'));

// ==================== ADMIN PAGES (LAZY LOADED) ====================
const AdminRegister  = lazy(() => import('./components/admin/AdminRegister'));
const AdminLogin     = lazy(() => import('./components/admin/AdminLogin'));
const AdminVerifyOTP = lazy(() => import('./components/admin/AdminVerifyOTP'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

//  WelcomePopup only on home page
const WelcomePopup = lazy(() => import('./features/layout/components/WelcomePopup'));

// ==================== PUBLIC LAYOUT ====================
const Layout = memo(({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      {/* WelcomePopup only on home page */}
      {isHomePage && (
        <Suspense fallback={null}>
          <WelcomePopup />
        </Suspense>
      )}

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
      <WhatsAppButton />
    </>
  );
});

// ==================== ADMIN LAYOUT ====================
const AdminLayout = memo(({ children }) => {
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
});

// ==================== APP COMPONENT ====================
export default function App() {
  return (
    <>
      <Analytics />
      <ScrollToTop />

      <Routes>
        {/* ==================== PUBLIC ROUTES ==================== */}
        <Route path="/"               element={<Layout><HomePage /></Layout>} />
        <Route path="/about"          element={<Layout><AboutPage /></Layout>} />
        <Route path="/team"           element={<Layout><TeamPage /></Layout>} />
        <Route path="/services"       element={<Layout><ServicesPage /></Layout>} />
        <Route path="/services/:slug" element={<Layout><ServiceDetail /></Layout>} />
        <Route path="/projects"       element={<Layout><ProjectsPage /></Layout>} />
        <Route path="/achievements"   element={<Layout><AchievementsPage /></Layout>} />
        <Route path="/clients"        element={<Layout><ClientsPage /></Layout>} />
        <Route path="/careers"        element={<Layout><CareersPage /></Layout>} />
        <Route path="/contact"        element={<Layout><ContactPage /></Layout>} />
        <Route path="/gallery"        element={<Layout><GalleryPage /></Layout>} />
        <Route path="/blog"           element={<Layout><BlogPage /></Layout>} />
        <Route path="/blog/:slug"     element={<Layout><BlogPage /></Layout>} />
        <Route path="/faq"            element={<Layout><FaqPage /></Layout>} />

        {/* ==================== ADMIN ROUTES ==================== */}
        <Route path="/admin/register"   element={<AdminLayout><AdminRegister /></AdminLayout>} />
        <Route path="/admin/login"      element={<AdminLayout><AdminLogin /></AdminLayout>} />
        <Route path="/admin/verify-otp" element={<AdminLayout><AdminVerifyOTP /></AdminLayout>} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout><AdminDashboard /></AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* ==================== 404 ROUTE ==================== */}
        <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
      </Routes>
    </>
  );
}