

import axios from 'axios';
import { ENV } from '../config/env';

// Create axios instance with base configuration
export const createApiClient = (baseURL = ENV.API_BASE_URL) => {
  return axios.create({
    baseURL,
    timeout: ENV.API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Singleton instance
const apiClient = createApiClient();

export default apiClient;
