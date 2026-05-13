 import { create } from 'zustand'

const useApplicationStore = create((set) => ({
  applications: [],
  loading: false,
  error: null,

  setApplications: (applications) =>
    set({ applications }),

  addApplication: (application) =>
    set((state) => ({
      applications: [...state.applications, application]
    })),

  updateApplication: (id, updated) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id ? updated : app
      )
    })),

  deleteApplication: (id) =>
    set((state) => ({
      applications: state.applications.filter((app) => app.id !== id)
    })),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),
}))

export default useApplicationStore