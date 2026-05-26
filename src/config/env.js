/**
 * Environment Configuration
 * Centralized environment variable management
 */

const getEnvVar = (key, fallback = '') => {
  return import.meta.env[key] || fallback;
};

export const ENV = {
  // API Configuration
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:8080/api'),
  API_IMAGE_BASE_URL: getEnvVar('VITE_API_IMAGE_BASE_URL', 'http://localhost:8080'),
  API_TIMEOUT: 30000,

  // Environment
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  SSR: import.meta.env.SSR,

  // Feature Flags
  ENABLE_LOGGING: getEnvVar('VITE_ENABLE_LOGGING', 'true') === 'true',
  ENABLE_ANALYTICS: getEnvVar('VITE_ENABLE_ANALYTICS', 'false') === 'true',
  ENABLE_ERROR_TRACKING: getEnvVar('VITE_ENABLE_ERROR_TRACKING', 'false') === 'true',
};

export default ENV;
