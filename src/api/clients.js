// src/api/client.js
import axios from 'axios';
import StorageService from '../utils/storage';
import { API_BASE_URL } from '../utils/constants';

// ─── Single, safe image URL helper ───────────────────────────────
/**
 * Returns an absolute image URL.
 * - If path is empty, returns a placeholder.
 * - If path is already absolute, returns it unchanged.
 * - Otherwise, prepends the backend base URL (without /api).
 */
export function getImageUrl(path) {
  if (!path) return 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image';
  if (path.startsWith('http')) return path;
  const base = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:8080';
  return base + (path.startsWith('/') ? path : '/' + path);
}

// ─── Axios client ─────────────────────────────────────────────────
const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Request interceptor – attach token & set correct Content-Type
client.interceptors.request.use(
  (config) => {
    const token = StorageService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // For FormData, let the browser set the Content-Type (multipart)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – token refresh logic
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

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
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
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = data.data?.accessToken || data.accessToken;
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

export default client;