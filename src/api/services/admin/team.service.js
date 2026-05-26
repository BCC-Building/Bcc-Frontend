/**
 * Admin Team Service
 * 
 * Responsibility: Handle all team member management
 */

import apiClient from '../../client';

export const adminTeamService = {
  /**
   * Get all team members
   */
  getAll: async (params = {}, signal) => {
    const { data } = await apiClient.get('/admin/team', {
      params,
      signal,
    });
    return data;
  },

  /**
   * Get team member by ID
   */
  getById: async (id, signal) => {
    const { data } = await apiClient.get(`/admin/team/${id}`, { signal });
    return data;
  },

  /**
   * Create team member
   */
  create: async (payload, signal) => {
    const { data } = await apiClient.post('/admin/team', payload, { signal });
    return data;
  },

  /**
   * Update team member
   */
  update: async (id, payload, signal) => {
    const { data } = await apiClient.put(`/admin/team/${id}`, payload, { signal });
    return data;
  },

  /**
   * Delete team member
   */
  delete: async (id, signal) => {
    const { data } = await apiClient.delete(`/admin/team/${id}`, { signal });
    return data;
  },
};

export default adminTeamService;
