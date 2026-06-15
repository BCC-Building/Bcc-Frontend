// src/api/endpoints.js
import client from './clients';

// Auth Endpoints
export const authAPI = {
  login: (username, password) =>
    client.post('/v1/auth/login', { username, password }),

  verifyLoginOTP: (email, otp) =>
    client.post('/v1/auth/login/verify-otp', { email, otp }),

  signup: (username, email, password) =>
    client.post('/v1/auth/signup/request-otp', { username, email, password }),

  verifySignupOTP: (payload) =>
    client.post('/v1/auth/signup/verify-otp', payload),

  resendOTP: (email) => client.post('/v1/auth/resend-otp', { email }),  

  refreshToken: (refreshToken) =>
    client.post('/v1/auth/refresh', { refreshToken }),

  logout: (refreshToken) =>
    client.post('/v1/auth/logout', { refreshToken }),
};

// Admin Endpoints
export const adminAPI = {
  // Projects
  getProjects: () => client.get('/projects'),
 createProject: (formData) => client.post('/projects', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
}),
updateProject: (id, formData) => client.put(`/projects/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
}),
  deleteProject: (id) => client.delete(`/projects/${id}`),

  // Blogs
  getBlogs: () => client.get('/v1/blogs'),
 createBlog: (formData) => client.post('/v1/blogs', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
}),
updateBlog: (id, formData) => client.put(`/v1/blogs/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
}),
  deleteBlog: (id) => client.delete(`/v1/blogs/${id}`),

  // Team Members: details are JSON; image is uploaded separately.
  getTeam: () => client.get('/team-members'),
  createTeamMember: (data) => client.post('/team-members', data),
  updateTeamMember: (id, data) => client.put(`/team-members/${id}`, data),
  uploadTeamImage: (id, formData) =>
    client.put(`/team-members/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteTeamMember: (id) => client.delete(`/team-members/${id}`),

  // Job Postings
  getJobPostings: () => client.get('/job-postings'),
  createJobPosting: (data) => client.post('/job-postings', data),
  updateJobPosting: (id, data) => client.put(`/job-postings/${id}`, data),
  deleteJobPosting: (id) => client.delete(`/job-postings/${id}`),

  // Job Applications
  getApplications: () => client.get('/job-applications'),
  deleteApplication: (id) => client.delete(`/job-applications/${id}`),

  // Gallery
  getGallery: () => client.get('/gallery'),
  createGalleryItem: (formData) =>
    client.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateGalleryItem: (id, formData) =>
    client.put(`/gallery/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteGalleryItem: (id) => client.delete(`/gallery/${id}`),

  // Contact Messages
  getContactMessages: () => client.get('/contact'),
  deleteContactMessage: (id) => client.delete(`/contact/${id}`),
};

// Public Endpoints
export const publicAPI = {
  getProjects: () => client.get('/projects'),
  getProjectById: (id) => client.get(`/projects/${id}`),

  getBlogs: () => client.get('/blogs'),
  getBlogBySlug: (slug) => client.get(`/blogs/slug/${slug}`),

  getActiveJobPostings: () => client.get('/job-postings/active'),// 
  getActiveTeamMembers: () => client.get('/team-members/active'),

  getGallery: () => client.get('/gallery'),

  submitContact: (data) => client.post('/contact', data),

submitJobApplication: (formData) => client.post('/job-applications', formData)
};
