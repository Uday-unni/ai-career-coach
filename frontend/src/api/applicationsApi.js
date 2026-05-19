 import api from './axios'

export const applicationsApi = {
  getAll: () => api.get('/applications/'),
  getOne: (id) => api.get(`/applications/${id}/`),
  create: (data) => api.post('/applications/', data),
  update: (id, data) => api.patch(`/applications/${id}/`, data),
  delete: (id) => api.delete(`/applications/${id}/`),
}
