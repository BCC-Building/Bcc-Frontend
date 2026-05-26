/**
 * Shared Constants
 */

export const ROUTES = {
  // Public
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  SERVICE_DETAIL: '/services/:id',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/:id',
  BLOG: '/blog',
  BLOG_DETAIL: '/blog/:slug',
  CAREERS: '/careers',
  CAREER_DETAIL: '/careers/:id',
  TEAM: '/team',
  GALLERY: '/gallery',
  CLIENTS: '/clients',
  ACHIEVEMENTS: '/achievements',
  FAQ: '/faq',
  CONTACT: '/contact',
  NOT_FOUND: '*',

  // Admin
  ADMIN_LOGIN: '/admin/login',
  ADMIN_REGISTER: '/admin/register',
  ADMIN_VERIFY_OTP: '/admin/verify-otp',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PROJECTS: '/admin/projects',
  ADMIN_BLOGS: '/admin/blogs',
  ADMIN_CAREERS: '/admin/careers',
  ADMIN_GALLERY: '/admin/gallery',
  ADMIN_TEAM: '/admin/team',
  ADMIN_CONTACTS: '/admin/contacts',
  ADMIN_APPLICATION: '/admin/application',
};

export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  SERVER: 'Server error. Please try again later.',
  VALIDATION: 'Please check your input.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  LOADING_FAILED: 'Failed to load content.',
  UNKNOWN: 'An unexpected error occurred.',
};

export const SUCCESS_MESSAGES = {
  CREATED: 'Successfully created.',
  UPDATED: 'Successfully updated.',
  DELETED: 'Successfully deleted.',
  SUBMITTED: 'Successfully submitted.',
  SAVED: 'Successfully saved.',
};

export default {
  ROUTES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
