import axios from 'axios';

// Backend URL
const API_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (data) => api.post('/auth/signup', data),
};

// Dashboard APIs
export const dashboardAPI = {
  getPublicStats: () => api.get('/dashboard/public-stats'),
  getAdminStats: () => api.get('/dashboard/admin-stats'),
};

// Complaint APIs
export const complaintAPI = {
  getAll: () => api.get('/complaints'),
  getMy: () => api.get('/complaints/my'),
  create: (data) => api.post('/complaints', data),
  updateStatus: (id, status) => api.put(`/complaints/${id}/status?status=${status}`),
};

// Notice APIs
export const noticeAPI = {
  getAll: () => api.get('/notices'),
  create: (data) => api.post('/notices', data),
};

// User APIs
export const userAPI = {
  getMe: () => api.get('/users/me'),
  getPending: () => api.get('/users/pending'),
  approve: (id) => api.put(`/users/${id}/approve`),
};

export default api;