/**
 * Protected Route Component
 * 
 * Responsibility: Guard admin routes
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../core/context/AuthContext';
import PageLoader from '../../../shared/components/Loading/PageLoader';
import { ROUTES } from '../../../shared/constants';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  return children;
}

export default ProtectedRoute;
