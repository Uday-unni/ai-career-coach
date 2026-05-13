 import api from './axios'

export const aiApi = {
  analyze: (applicationId) =>
    api.post('/ai/analyze/', { application_id: applicationId }),
  generateCoverLetter: (applicationId) =>
    api.post('/ai/cover-letter/', { application_id: applicationId }),
  getResults: (applicationId) =>
    api.get(`/ai/results/${applicationId}/`),
  interviewCoach: (applicationId) =>
    api.post('/ai/interview/', { application_id: applicationId }), 
}