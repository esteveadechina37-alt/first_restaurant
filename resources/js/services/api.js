import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor pour ajouter le token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email, password) => api.post('/login', { email, password }),
  logout: () => api.post('/logout'),
  register: (data) => api.post('/register', data),
  me: () => api.get('/me'),
};

export const dishService = {
  list: () => api.get('/dishes'),
  show: (id) => api.get(`/dishes/${id}`),
  store: (data) => api.post('/dishes', data),
  update: (id, data) => api.put(`/dishes/${id}`, data),
  delete: (id) => api.delete(`/dishes/${id}`),
};

export const orderService = {
  list: () => api.get('/orders'),
  show: (id) => api.get(`/orders/${id}`),
  store: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.patch(`/orders/${id}`, { status }),
  cancel: (id, reason) => api.post(`/orders/${id}/cancel`, { reason }),
};

export const tableService = {
  list: () => api.get('/tables'),
  updateStatus: (id, status) => api.patch(`/tables/${id}`, { status }),
};

export const paymentService = {
  create: (data) => api.post('/payments', data),
  process: (id, paymentMethod) => api.post(`/payments/${id}/process`, { paymentMethod }),
};

export default api;