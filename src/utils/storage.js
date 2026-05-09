import { STORAGE_KEYS } from './constants';

class StorageService {
  // Set item
  static set(key, value) {
    try {
      const serialised = JSON.stringify(value);
      localStorage.setItem(key, serialised);
    } catch (error) {
      console.error('Storage set failed:', error);
    }
  }

  // Get item
  static get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage get failed:', error);
      return null;
    }
  }

  // Remove item(s)
  static remove(...keys) {
    keys.forEach(key => localStorage.removeItem(key));
  }

  // Clear all auth data
  static clearAuth() {
    this.remove(
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.ADMIN_USER
    );
  }

  // Token helpers
  static getAccessToken() {
    return this.get(STORAGE_KEYS.ACCESS_TOKEN);
  }

  static setAccessToken(accessToken) {
    this.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  }

  static getRefreshToken() {
    return this.get(STORAGE_KEYS.REFRESH_TOKEN);
  }

  static setTokens(accessToken, refreshToken) {
    this.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    this.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  static setAdminUser(user) {
    this.set(STORAGE_KEYS.ADMIN_USER, user);
  }

  static getAdminUser() {
    return this.get(STORAGE_KEYS.ADMIN_USER);
  }

  static isAuthenticated() {
    return Boolean(this.getAccessToken());
  }
}

export default StorageService;
