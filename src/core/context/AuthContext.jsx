/**
 * Refactored Auth Context
 * 
 * Responsibility: Manage authentication state globally
 * Principle: Single Responsibility - auth state only
 */

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import StorageService from '../../core/services/storage.service';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    const token = StorageService.getAccessToken();
    const storedUser = StorageService.getAdminUser();

    if (token && storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  /**
   * Login handler
   */
  const login = useCallback((accessToken, refreshToken, userData) => {
    StorageService.setTokens(accessToken, refreshToken);
    StorageService.setAdminUser(userData);
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  /**
   * Logout handler
   */
  const logout = useCallback(() => {
    StorageService.clearAuth();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/admin/login', { replace: true });
  }, [navigate]);

  /**
   * Update user profile
   */
  const updateUser = useCallback((updatedUser) => {
    StorageService.setAdminUser(updatedUser);
    setUser(updatedUser);
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Auth hook
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default AuthContext;
