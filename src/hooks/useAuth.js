import { useState, useCallback } from 'react';
import { authAPI } from '../api/endpoints';
import StorageService from '../utils/storage';

/**
 * useAuth
 *
 * Handles all authentication logic for the AdminLogin flow.
 * Works with AdminLogin.jsx (useReducer-based) — hook does NOT manage
 * its own error state since the component handles that via reducer.
 *
 * Methods:
 *  - login(username, password)  → { success, email, message }
 *  - verifyOTP(email, otp)      → { success, message? }
 *  - resendOTP(email)           → { success, message? }
 *  - logout()                   → void (async — invalidates backend token)
 *  - isAuthenticated()          → boolean
 */
export function useAuth() {
  const [loading, setLoading] = useState(false);

  // ─── Shared call wrapper ─────────────────────────────────────────────────
  // Handles loading state + network-level errors in one place.
  // Does NOT manage error state — AdminLogin.jsx reducer does that.
  const call = useCallback(async (fn) => {
    setLoading(true);
    try {
      return await fn();
    } catch (err) {
      // Network error (no response at all)
      const message = err.response?.data?.message || 'Network error. Please try again.';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Step 1: Validate credentials & send OTP ────────────────────────────
  const login = useCallback(
    (username, password) =>
      call(async () => {
        const { data } = await authAPI.login(username, password);
        if (data.success) {
          return {
            success: true,
            email: data.data.email,   // masked e.g. "a***@gmail.com"
            message: data.message,
          };
        }
        return { success: false, message: data.message };
      }),
    [call]
  );

  // ─── Step 2: Verify OTP & store tokens ──────────────────────────────────
  const verifyOTP = useCallback(
    (email, otp) =>
      call(async () => {
        const { data } = await authAPI.verifyLoginOTP(email, otp);
        if (data.success) {
          // Store tokens in sessionStorage (cleared on tab close)
          StorageService.setTokens(data.data.accessToken, data.data.refreshToken);
          // Store only display info — never use for auth checks
          StorageService.setAdminUser({ username: data.data.username });
          return { success: true };
        }
        return { success: false, message: data.message };
      }),
    [call]
  );

  // ─── Resend OTP — email only, no credentials re-sent ────────────────────
  const resendOTP = useCallback(
    (email) =>
      call(async () => {
        const { data } = await authAPI.resendOTP(email);
        if (data.success) {
          return { success: true };
        }
        return { success: false, message: data.message };
      }),
    [call]
  );

  // ─── Logout — invalidates token on backend first ─────────────────────────
  const logout = useCallback(async () => {
    const refreshToken = StorageService.getRefreshToken();
    try {
      if (refreshToken) {
        await authAPI.logout(refreshToken);
      }
    } catch {
      // Even if backend call fails, clear local storage and redirect
    } finally {
      StorageService.clearAuth();
      window.location.href = '/admin/login';
    }
  }, []);

  // ─── Auth check — simple getter, no useCallback needed ──────────────────
  const isAuthenticated = () => StorageService.isAuthenticated();

  return {
    login,
    verifyOTP,
    resendOTP,
    logout,
    isAuthenticated,
    loading,
    // Note: error state is intentionally NOT returned here.
    // AdminLogin.jsx manages errors via its own useReducer.
  };
}
