/**
 * Authentication Service
 * 
 * Responsibility: Handle all authentication-related API calls
 * Principle: Single Responsibility - only auth concerns
 */

import apiClient from '../client';

export const authService = {
  /**
   * Register admin user
   */
  register: async (payload, signal) => {
    const { data } = await apiClient.post('/auth/register', payload, { signal });
    return data;
  },

  /**
   * Login admin user
   */
  login: async (payload, signal) => {
    const { data } = await apiClient.post('/auth/login', payload, { signal });
    return data;
  },

  /**
   * Verify OTP
   */
  verifyOTP: async (payload, signal) => {
    const { data } = await apiClient.post('/auth/verify-otp', payload, { signal });
    return data;
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken, signal) => {
    const { data } = await apiClient.post(
      '/auth/refresh',
      { refreshToken },
      { signal }
    );
    return data;
  },

  /**
   * Logout
   */
  logout: async (signal) => {
    const { data } = await apiClient.post('/auth/logout', {}, { signal });
    return data;
  },
};

export default authService;
