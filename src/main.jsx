import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App.jsx';
import AppProviders from './core/providers/AppProviders';
import apiClient from './api/client';
import { setupAuthInterceptor, setupErrorInterceptor } from './api/interceptors';

/**
 * Setup API Interceptors
 */
setupAuthInterceptor(apiClient);
setupErrorInterceptor(apiClient);

/**
 * Load Bootstrap JS after page is interactive
 */
const loadBootstrap = () => {
  import('bootstrap/dist/js/bootstrap.bundle.min.js').catch(() => {
    console.warn('Bootstrap JS failed to load - core features may be limited');
  });
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    loadBootstrap();
  } else {
    window.addEventListener('load', loadBootstrap, { once: true });
  }
}

/**
 * Render App
 */
createRoot(document.getElementById('root')).render(
  <AppProviders>
    <App />
  </AppProviders>
);