const configuredApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:8081/api'
    : 'https://api.bcc.net.in/api');
const isLocalApiUrl = /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?:\/|$)/i.test(
  configuredApiBaseUrl
);

export const API_BASE_URL =
  import.meta.env.DEV && isLocalApiUrl ? '/api' : configuredApiBaseUrl;
export const API_IMAGE_BASE_URL =
  import.meta.env.VITE_API_IMAGE_BASE_URL ||
  (import.meta.env.DEV ? 'http://localhost:8081' : 'https://api.bcc.net.in');

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  ADMIN_USER: 'admin_user',
};

export const ADMIN_ROUTES = {
  LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard',
  PROJECTS: '/admin/projects',
  BLOGS: '/admin/blogs',
  CAREERS: '/admin/careers',
  GALLERY: '/admin/gallery',
  TEAM: '/admin/team',
  CONTACTS: '/admin/contacts',
};