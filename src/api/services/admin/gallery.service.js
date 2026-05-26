/**
 * Admin Gallery Service
 * 
 * Responsibility: Handle all admin gallery management
 */

import apiClient from '../../client';

export const adminGalleryService = {
  /**
   * Get all gallery images
   */
  getAll: async (params = {}, signal) => {
    const { data } = await apiClient.get('/admin/gallery', {
      params,
      signal,
    });
    return data;
  },

  /**
   * Get gallery image by ID
   */
  getById: async (id, signal) => {
    const { data } = await apiClient.get(`/admin/gallery/${id}`, { signal });
    return data;
  },

  /**
   * Upload gallery image
   */
  upload: async (file, signal) => {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await apiClient.post('/admin/gallery/upload', formData, {
      signal,
    });
    return data;
  },

  /**
   * Delete gallery image
   */
  delete: async (id, signal) => {
    const { data } = await apiClient.delete(`/admin/gallery/${id}`, { signal });
    return data;
  },
};

export default adminGalleryService;
