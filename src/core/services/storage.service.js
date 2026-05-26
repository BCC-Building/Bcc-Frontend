/**
 * Storage Service
 * 
 * Responsibility: Centralized local storage management
 * Principle: Single Responsibility - only storage concerns
 */

import { STORAGE_KEYS } from '../../config/constants';

class StorageService {
  /**
   * Set generic item
   */
  static set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Storage set failed:', error);
    }
  }

  /**
   * Get generic item
   */
  static get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage get failed:', error);
      return null;
    }
  }

  /**
   * Remove items
   */
  static remove(...keys) {
    keys.forEach((key) => localStorage.removeItem(key));
  }

  /**
   * Clear all auth data
   */
  static clearAuth() {
    this.remove(
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.ADMIN_USER
    );
  }

  /**
   * Token management
   */
  static getAccessToken() {
    return this.get(STORAGE_KEYS.ACCESS_TOKEN);
  }

  static setAccessToken(accessToken) {
    this.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  }

  static getRefreshToken() {
    return this.get(STORAGE_KEYS.REFRESH_TOKEN);
  }

  static setRefreshToken(refreshToken) {
    this.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  static setTokens(accessToken, refreshToken) {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  /**
   * User management
   */
  static getAdminUser() {
    return this.get(STORAGE_KEYS.ADMIN_USER);
  }

  static setAdminUser(user) {
    this.set(STORAGE_KEYS.ADMIN_USER, user);
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated() {
    return !!this.getAccessToken();
  }
}

export default StorageService;
