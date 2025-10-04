import axios from 'axios';

const myBaseUrl = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: myBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Django TokenAuthentication
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.reload()
    }
    return Promise.reject(error);
  }
);

export const AuthAPI = {
  register: (formData) => api.post('/register/', formData),
  login: (credentials) => api.post('/login/', credentials),
};

export const PublicationAPI = {
  list: () => api.get('/publications/'),
  create: (data) => api.post('/publications/', data),
  detail: (id) => api.get(`/publications/${id}/`),
  update: (id, data) => api.put(`/publications/${id}/`, data),
  delete: (id) => api.delete(`/publications/${id}/`),
  userPublications: (userId) => api.get(`/users/${userId}/publications/`),
};

export const CategoryAPI = {
  list: () => api.get('/categories/'),
  detail: (id) => api.get(`/categories/${id}/`),
  create: (data) => api.post('/categories/', data),
  update: (id, data) => api.put(`/categories/${id}/`, data),
  delete: (id) => api.delete(`/categories/${id}/`),
};

export const ViewsAPI = {
  create: (publicationId, data) => api.post(`/publications/${publicationId}/views/`, data),
  detail: (publicationId) => api.get(`/publications/${publicationId}/views/me/`),
  update: (publicationId, data) => api.put(`/publications/${publicationId}/views/me/`, data),
};

export default api;