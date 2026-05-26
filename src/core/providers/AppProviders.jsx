/**
 * App Providers
 * 
 * Responsibility: Setup all global providers
 */

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../../shared/components/Toast/ToastContext';
import ErrorBoundary from '../../shared/components/ErrorBoundary/ErrorBoundary';

export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <HelmetProvider>
          <AuthProvider>
            <ToastProvider>
              <LazyMotion features={domAnimation}>
                {children}
              </LazyMotion>
            </ToastProvider>
          </AuthProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default AppProviders;
