/**
 * Authentication Interceptor
 * 
 * Responsibility: Handle token refresh on 401 responses
 */

import apiClient from '../client';
import StorageService from '../../core/services/storage.service';
import { HTTP_STATUS } from '../../config/constants';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Setup authentication interceptor
 */
export const setupAuthInterceptor = (client = apiClient) => {
  // Request interceptor - attach token
  client.interceptors.request.use(
    (config) => {
      const token = StorageService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // For FormData, let browser set Content-Type
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - token refresh logic
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      // If 401 and not already retried
      if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
        if (isRefreshing) {
          // Queue this request while refreshing
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return client(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = StorageService.getRefreshToken();
        if (!refreshToken) {
          StorageService.clearAuth();
          window.location.href = '/admin/login';
          return Promise.reject(error);
        }

        try {
          const { data } = await client.post('/auth/refresh', {
            refreshToken,
          });

          const newAccessToken = data?.data?.accessToken || data?.accessToken;
          if (!newAccessToken) {
            throw new Error('No access token in refresh response');
          }

          StorageService.setAccessToken(newAccessToken);
          processQueue(null, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return client(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          StorageService.clearAuth();
          window.location.href = '/admin/login';
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export default setupAuthInterceptor;
