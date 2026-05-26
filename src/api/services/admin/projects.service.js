/**
 * Admin Projects Service
 * 
 * Responsibility: Handle all admin project-related API calls
 * Principle: Single Responsibility - projects only
 */

import apiClient from '../client';

export const adminProjectsService = {
  /**
   * Get all projects (admin)
   */
  getAll: async (params = {}, signal) => {
    const { data } = await apiClient.get('/admin/projects', {
      params,
      signal,
    });
    return data;
  },

  /**
   * Get project by ID
   */
  getById: async (id, signal) => {
    const { data } = await apiClient.get(`/admin/projects/${id}`, { signal });
    return data;
  },

  /**
   * Create new project
   */
  create: async (payload, signal) => {
    const { data } = await apiClient.post('/admin/projects', payload, { signal });
    return data;
  },

  /**
   * Update project
   */
  update: async (id, payload, signal) => {
    const { data } = await apiClient.put(`/admin/projects/${id}`, payload, { signal });
    return data;
  },

  /**
   * Delete project
   */
  delete: async (id, signal) => {
    const { data } = await apiClient.delete(`/admin/projects/${id}`, { signal });
    return data;
  },

  /**
   * Bulk delete projects
   */
  bulkDelete: async (ids, signal) => {
    const { data } = await apiClient.post(
      '/admin/projects/bulk-delete',
      { ids },
      { signal }
    );
    return data;
  },
};

export default adminProjectsService;
