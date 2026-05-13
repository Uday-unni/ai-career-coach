 import { create } from 'zustand'

const useAuthStore = create((set) => ({
  // State
  user: null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  //               ↑ true if token exists, false if not

  // Actions
  login: (tokens, user) => {
    // Save tokens to browser storage
    localStorage.setItem('access_token', tokens.access)
    localStorage.setItem('refresh_token', tokens.refresh)
    // Update state
    set({ user: user, isAuthenticated: true })
  },

  logout: () => {
    // Remove tokens from browser storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    // Update state
    set({ user: null, isAuthenticated: false })
  },

  setUser: (user) => {
    set({ user: user })
  },

}))

export default useAuthStore