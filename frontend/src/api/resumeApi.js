 import api from './axios'

export const resumeApi = {
  get: () => api.get('/resumes/'),

  upload: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/resumes/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  delete: () => api.delete('/resumes/'),
}