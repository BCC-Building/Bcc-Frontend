/**
 * Public Projects Service
 * 
 * Responsibility: Handle all public/client-side project API calls
 */

import apiClient from '../../client';

export const publicProjectsService = {
  /**
   * Get all projects (public view)
   */
  getAll: async (params = {}, signal) => {
    const { data } = await apiClient.get('/projects', {
      params,
      signal,
    });
    return data;
  },

  /**
   * Get project by ID
   */
  getById: async (id, signal) => {
    const { data } = await apiClient.get(`/projects/${id}`, { signal });
    return data;
  },

  /**
   * Get projects by category
   */
  getByCategory: async (category, params = {}, signal) => {
    const { data } = await apiClient.get('/projects', {
      params: { ...params, category },
      signal,
    });
    return data;
  },

  /**
   * Get featured projects
   */
  getFeatured: async (signal) => {
    const { data } = await apiClient.get('/projects/featured', { signal });
    return data;
  },
};

export default publicProjectsService;
