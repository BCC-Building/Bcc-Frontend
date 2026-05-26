/**
 * Public Blogs Service
 * 
 * Responsibility: Handle all public blog API calls
 */

import apiClient from '../../client';

export const publicBlogsService = {
  /**
   * Get all blogs (public)
   */
  getAll: async (params = {}, signal) => {
    const { data } = await apiClient.get('/blogs', {
      params,
      signal,
    });
    return data;
  },

  /**
   * Get blog by ID/slug
   */
  getById: async (id, signal) => {
    const { data } = await apiClient.get(`/blogs/${id}`, { signal });
    return data;
  },

  /**
   * Get blogs by tag
   */
  getByTag: async (tag, params = {}, signal) => {
    const { data } = await apiClient.get('/blogs', {
      params: { ...params, tag },
      signal,
    });
    return data;
  },
};

export default publicBlogsService;
