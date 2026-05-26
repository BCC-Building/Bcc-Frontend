/**
 * Error Interceptor
 * 
 * Responsibility: Standardize error responses
 */

import { HTTP_STATUS, ERROR_TYPES } from '../../config/constants';
import LoggerService from '../../core/services/logger.service';

/**
 * Map HTTP status to error type
 */
const getErrorType = (status) => {
  switch (status) {
    case HTTP_STATUS.BAD_REQUEST:
    case HTTP_STATUS.UNPROCESSABLE_ENTITY:
      return ERROR_TYPES.VALIDATION;
    case HTTP_STATUS.UNAUTHORIZED:
      return ERROR_TYPES.AUTHENTICATION;
    case HTTP_STATUS.FORBIDDEN:
      return ERROR_TYPES.AUTHORIZATION;
    case HTTP_STATUS.NOT_FOUND:
      return ERROR_TYPES.NOT_FOUND;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      return ERROR_TYPES.SERVER;
    default:
      return ERROR_TYPES.UNKNOWN;
  }
};

/**
 * Normalize error response
 */
export const normalizeError = (error) => {
  if (!error) {
    return {
      type: ERROR_TYPES.UNKNOWN,
      status: null,
      message: 'An unknown error occurred',
    };
  }

  // Network error
  if (!error.response) {
    return {
      type: ERROR_TYPES.NETWORK,
      status: null,
      message: error.message || 'Network error occurred',
    };
  }

  const { status, data } = error.response;

  return {
    type: getErrorType(status),
    status,
    message: data?.message || data?.error || `Error: ${status}`,
    errors: data?.errors || null,
  };
};

/**
 * Setup error interceptor
 */
export const setupErrorInterceptor = (client) => {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const normalizedError = normalizeError(error);

      // Log error in development
      if (import.meta.env.DEV) {
        LoggerService.error('API Error:', normalizedError);
      }

      // Attach normalized error for easier handling
      error.normalized = normalizedError;

      return Promise.reject(error);
    }
  );

  return client;
};

export default setupErrorInterceptor;
