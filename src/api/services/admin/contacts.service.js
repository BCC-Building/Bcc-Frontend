/**
 * Admin Contacts Service
 * 
 * Responsibility: Handle all contact submission management
 */

import apiClient from '../../client';

export const adminContactsService = {
  /**
   * Get all contact submissions
   */
  getAll: async (params = {}, signal) => {
    const { data } = await apiClient.get('/admin/contacts', {
      params,
      signal,
    });
    return data;
  },

  /**
   * Get contact by ID
   */
  getById: async (id, signal) => {
    const { data } = await apiClient.get(`/admin/contacts/${id}`, { signal });
    return data;
  },

  /**
   * Delete contact submission
   */
  delete: async (id, signal) => {
    const { data } = await apiClient.delete(`/admin/contacts/${id}`, { signal });
    return data;
  },

  /**
   * Mark contact as read
   */
  markAsRead: async (id, signal) => {
    const { data } = await apiClient.patch(`/admin/contacts/${id}/read`, {}, { signal });
    return data;
  },
};

export default adminContactsService;
