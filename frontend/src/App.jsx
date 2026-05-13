 import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import ApplicationDetail from './pages/ApplicationDetail'
import Resume from './pages/Resume'
import GitHub from './pages/GitHub'
import Landing from './pages/Landing'
import KanbanBoard from './pages/KanbanBoard'
import useAuthStore from './store/authStore'

function PrivateRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <PrivateRoute><Dashboard /></PrivateRoute>
            } />
            <Route path="/applications" element={
              <PrivateRoute><Applications /></PrivateRoute>
            } />
            <Route path="/applications/:id" element={
              <PrivateRoute><ApplicationDetail /></PrivateRoute>
            } />
            <Route path="/resume" element={
              <PrivateRoute><Resume /></PrivateRoute>
            } />
            <Route path="/github" element={
              <PrivateRoute><GitHub /></PrivateRoute>
            } />
            <Route path="/kanban" element={
              <PrivateRoute><KanbanBoard /></PrivateRoute>
            } />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default App