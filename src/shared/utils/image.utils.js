/**
 * Shared Utilities - Image Utils
 */

import { PLACEHOLDER_IMAGE, FALLBACK_PROJECT_IMAGE } from '../../config/constants';
import { ENV } from '../../config/env';

/**
 * Get absolute image URL
 */
export function getImageUrl(path, type = 'general') {
  if (!path) {
    return type === 'project' ? FALLBACK_PROJECT_IMAGE : PLACEHOLDER_IMAGE;
  }

  if (path.startsWith('http')) {
    return path;
  }

  const baseUrl = ENV.API_IMAGE_BASE_URL || 'http://localhost:8080';
  return baseUrl + (path.startsWith('/') ? path : '/' + path);
}

/**
 * Validate image file
 */
export function isValidImageFile(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  return validTypes.includes(file.type) && file.size <= maxSize;
}

/**
 * Get image alt text
 */
export function getImageAlt(title, fallback = 'Image') {
  return title || fallback;
}

export default {
  getImageUrl,
  isValidImageFile,
  getImageAlt,
};
