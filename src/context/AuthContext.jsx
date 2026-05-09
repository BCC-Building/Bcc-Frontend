import { createContext, useContext, useState, useCallback } from 'react';
import StorageService from '../utils/storage';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const initialUser = StorageService.getAccessToken()
    ? StorageService.getAdminUser()
    : null;
  const [user, setUser] = useState(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(initialUser));
  const navigate = useNavigate();

  // Login
  const login = useCallback((accessToken, refreshToken, userData) => {
    StorageService.setTokens(accessToken, refreshToken);
    StorageService.setAdminUser(userData);
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  // Logout
  const logout = useCallback(() => {
    StorageService.clearAuth();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/admin/login', { replace: true });
  }, [navigate]);

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}
