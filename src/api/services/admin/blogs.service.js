/**
 * Admin Blogs Service
 * 
 * Responsibility: Handle all admin blog-related API calls
 */

import apiClient from '../../client';

export const adminBlogsService = {
  /**
   * Get all blogs (admin)
   */
  getAll: async (params = {}, signal) => {
    const { data } = await apiClient.get('/admin/blogs', {
      params,
      signal,
    });
    return data;
  },

  /**
   * Get blog by ID
   */
  getById: async (id, signal) => {
    const { data } = await apiClient.get(`/admin/blogs/${id}`, { signal });
    return data;
  },

  /**
   * Create new blog
   */
  create: async (payload, signal) => {
    const { data } = await apiClient.post('/admin/blogs', payload, { signal });
    return data;
  },

  /**
   * Update blog
   */
  update: async (id, payload, signal) => {
    const { data } = await apiClient.put(`/admin/blogs/${id}`, payload, { signal });
    return data;
  },

  /**
   * Delete blog
   */
  delete: async (id, signal) => {
    const { data } = await apiClient.delete(`/admin/blogs/${id}`, { signal });
    return data;
  },
};

export default adminBlogsService;
