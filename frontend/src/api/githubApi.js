 import api from './axios'

export const githubApi = {
  scan: (githubUsername, applicationId) =>
    api.post('/github/', {
      github_username: githubUsername,
      application_id: applicationId
    }),

  getResult: (id) => api.get(`/github/result/${id}/`),
}