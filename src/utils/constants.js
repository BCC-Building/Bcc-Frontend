export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

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