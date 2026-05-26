/**
 * Admin Careers Service
 * 
 * Responsibility: Handle all admin career-related API calls
 */

import apiClient from '../../client';

export const adminCareersService = {
  /**
   * Get all career listings (admin)
   */
  getAll: async (params = {}, signal) => {
    const { data } = await apiClient.get('/admin/careers', {
      params,
      signal,
    });
    return data;
  },

  /**
   * Get career by ID
   */
  getById: async (id, signal) => {
    const { data } = await apiClient.get(`/admin/careers/${id}`, { signal });
    return data;
  },

  /**
   * Create career listing
   */
  create: async (payload, signal) => {
    const { data } = await apiClient.post('/admin/careers', payload, { signal });
    return data;
  },

  /**
   * Update career listing
   */
  update: async (id, payload, signal) => {
    const { data } = await apiClient.put(`/admin/careers/${id}`, payload, { signal });
    return data;
  },

  /**
   * Delete career listing
   */
  delete: async (id, signal) => {
    const { data } = await apiClient.delete(`/admin/careers/${id}`, { signal });
    return data;
  },
};

export default adminCareersService;
