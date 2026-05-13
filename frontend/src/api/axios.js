 import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
})

// Add token to requests
api.interceptors.request.use((config) => {
  const publicEndpoints = ['/users/register/', '/users/login/']
  const isPublic = publicEndpoints.some(url => config.url.includes(url))

  if (!isPublic) {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Auto refresh token when expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refresh = localStorage.getItem('refresh_token')
        const response = await axios.post(
          'http://127.0.0.1:8000/api/users/token/refresh/',
          { refresh }
        )
        const newAccess = response.data.access
        localStorage.setItem('access_token', newAccess)
        original.headers.Authorization = `Bearer ${newAccess}`
        return api(original)
      } catch {
        localStorage.clear()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api