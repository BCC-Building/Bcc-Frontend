/**
 * Public Common Service
 * 
 * Responsibility: Handle general/common public API calls
 */

import apiClient from '../../client';

export const publicCommonService = {
  /**
   * Get services list
   */
  getServices: async (signal) => {
    const { data } = await apiClient.get('/services', { signal });
    return data;
  },

  /**
   * Get team members
   */
  getTeam: async (signal) => {
    const { data } = await apiClient.get('/team', { signal });
    return data;
  },

  /**
   * Get testimonials
   */
  getTestimonials: async (signal) => {
    const { data } = await apiClient.get('/testimonials', { signal });
    return data;
  },

  /**
   * Get gallery
   */
  getGallery: async (params = {}, signal) => {
    const { data } = await apiClient.get('/gallery', {
      params,
      signal,
    });
    return data;
  },

  /**
   * Submit contact form
   */
  submitContact: async (payload, signal) => {
    const { data } = await apiClient.post('/contacts', payload, { signal });
    return data;
  },

  /**
   * Submit career application
   */
  submitApplication: async (payload, signal) => {
    const { data } = await apiClient.post('/careers/apply', payload, { signal });
    return data;
  },

  /**
   * Get career listings
   */
  getCareers: async (signal) => {
    const { data } = await apiClient.get('/careers', { signal });
    return data;
  },

  /**
   * Get career by ID
   */
  getCareerById: async (id, signal) => {
    const { data } = await apiClient.get(`/careers/${id}`, { signal });
    return data;
  },
};

export default publicCommonService;
