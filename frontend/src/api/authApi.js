 import api from './axios'

export const authApi = {
  login: (data) => api.post('/users/login/', data),
  register: (data) => api.post('/users/register/', data),
  logout: (refresh) => api.post('/users/logout/', { refresh }),
  getProfile: () => api.get('/users/profile/'),
  updateProfile: (data) => api.patch('/users/profile/', data),
}