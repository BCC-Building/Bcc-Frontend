/**
 * Environment Configuration
 * Centralized environment variable management
 */

const getEnvVar = (key, fallback = '') => {
  return import.meta.env[key] || fallback;
};

const configuredApiBaseUrl = getEnvVar(
  'VITE_API_BASE_URL',
  import.meta.env.DEV
    ? 'http://localhost:8081/api'
    : 'https://api.bcc.net.in/api'
);
const isLocalApiUrl = /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?:\/|$)/i.test(
  configuredApiBaseUrl
);

export const ENV = {
  // API Configuration
  API_BASE_URL:
    import.meta.env.DEV && isLocalApiUrl ? '/api' : configuredApiBaseUrl,
  API_IMAGE_BASE_URL: getEnvVar(
    'VITE_API_IMAGE_BASE_URL',
    import.meta.env.DEV ? 'http://localhost:8081' : 'https://api.bcc.net.in'
  ),
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
