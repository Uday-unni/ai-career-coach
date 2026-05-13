import { useState } from 'react'
import { motion } from 'framer-motion'
import { authApi } from '../api/authApi'
import useAuthStore from '../store/authStore'
import { useNavigate, Link } from 'react-router-dom'
import useWindowSize from '../hooks/useWindowSize'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const { width } = useWindowSize()
  const isMobile = width < 768

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await authApi.login({ email, password })
      login(
        { access: response.data.access, refresh: response.data.refresh },
        null
      )
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    }
    setLoading(false)
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    borderRadius: '10px',
    padding: '12px 14px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '24px 20px' : '48px',
    }}>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: isMobile ? '16px' : '24px',
          left: isMobile ? '16px' : '24px',
          background: 'transparent',
          border: 'none',
          color: '#555',
          fontSize: '13px',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: 0,
        }}
      >
        ← Back
      </motion.button>

      <div style={{ width: '100%', maxWidth: '400px' }}>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: '800',
            fontSize: '28px',
            color: '#C8FF00',
            letterSpacing: '-1px',
            marginBottom: '8px',
          }}>
            Rezumi
          </h1>
          <p style={{
            color: '#444',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Welcome back
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            padding: isMobile ? '24px 20px' : '32px',
          }}
        >
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: '700',
            fontSize: '20px',
            color: '#FFFFFF',
            letterSpacing: '-0.5px',
            marginBottom: '24px',
          }}>
            Sign In
          </h2>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '20px',
                color: '#EF4444',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                color: '#444',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                display: 'block',
                marginBottom: '6px',
                fontWeight: '500',
              }}>
                Email
              </label>
              <input
                style={inputStyle}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={e => e.target.style.borderColor = 'rgba(200,255,0,0.3)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                required
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                color: '#444',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                display: 'block',
                marginBottom: '6px',
                fontWeight: '500',
              }}>
                Password
              </label>
              <input
                style={inputStyle}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={e => e.target.style.borderColor = 'rgba(200,255,0,0.3)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                required
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={loading}
              style={{
                background: '#C8FF00',
                color: '#000',
                border: 'none',
                padding: '13px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Inter, sans-serif',
                width: '100%',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          {/* Register Link */}
          <p style={{
            textAlign: 'center',
            marginTop: '20px',
            color: '#444',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{ color: '#C8FF00', textDecoration: 'none', fontWeight: '500' }}
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Login