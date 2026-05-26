/**
 * Global Constants
 * Centralized constant definitions
 */

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  ADMIN_USER: 'admin_user',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  AUTHENTICATION: 'AUTHENTICATION_ERROR',
  AUTHORIZATION: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 9,
  DEFAULT_SORT: 'createdAt',
};

export const CACHE_DURATION = {
  NONE: 0,
  SHORT: 5 * 60 * 1000,      // 5 minutes
  MEDIUM: 30 * 60 * 1000,    // 30 minutes
  LONG: 60 * 60 * 1000,      // 1 hour
};

export const REQUEST_TIMEOUT = {
  SHORT: 5000,
  MEDIUM: 15000,
  LONG: 30000,
};

export const PROJECT_CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'Residential', label: 'Residential' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Industrial', label: 'Industrial' },
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'Renovation', label: 'Renovation' },
  { value: 'Interior', label: 'Interior' },
];

export const PROJECT_STATUS = [
  { value: 'all', label: 'All' },
  { value: 'Ongoing', label: 'Ongoing' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Upcoming', label: 'Upcoming' },
];

export const STATUS_COLORS = {
  Ongoing: { bg: '#dbeafe', color: '#1d4ed8' },
  Completed: { bg: '#dcfce7', color: '#15803d' },
  Upcoming: { bg: '#fef9c3', color: '#854d0e' },
};

export const TRUST_BADGES = [
  "1200+ Projects Delivered",
  "98% Client Satisfaction",
  "09+ Years Experience",
];

export const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image';
export const FALLBACK_PROJECT_IMAGE = 'https://placehold.co/800x600/1a1a2e/ffffff?text=BCC+Project';

export default {
  STORAGE_KEYS,
  HTTP_STATUS,
  ERROR_TYPES,
  PAGINATION,
  CACHE_DURATION,
  REQUEST_TIMEOUT,
  PROJECT_CATEGORIES,
  PROJECT_STATUS,
  STATUS_COLORS,
  TRUST_BADGES,
  PLACEHOLDER_IMAGE,
  FALLBACK_PROJECT_IMAGE,
};
