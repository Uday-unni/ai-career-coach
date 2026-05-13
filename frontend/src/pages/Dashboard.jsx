import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { applicationsApi } from '../api/applicationsApi'
import Navbar from '../components/layout/Navbar'
import { useNavigate } from 'react-router-dom'
import useWindowSize from '../hooks/useWindowSize'

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1000
    const step = Math.ceil(value / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setDisplay(value)
        clearInterval(timer)
      } else {
        setDisplay(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [value])

  return <span>{display}</span>
}

function Dashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const isMobile = width < 768

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await applicationsApi.getAll()
        setApplications(res.data)
      } catch (e) { console.log(e) }
      setLoading(false)
    }
    fetch()
  }, [])

  const stats = [
    { label: 'Total', value: applications.length, color: '#C8FF00' },
    { label: 'Applied', value: applications.filter(a => a.status === 'applied').length, color: '#60A5FA' },
    { label: 'Interviews', value: applications.filter(a => a.status === 'interview').length, color: '#7B61FF' },
    { label: 'Offers', value: applications.filter(a => a.status === 'offer').length, color: '#00FFD1' },
    { label: 'Rejected', value: applications.filter(a => a.status === 'rejected').length, color: '#EF4444' },
  ]

  const getStatusStyle = (status) => ({
    saved: { color: '#888', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' },
    applied: { color: '#60A5FA', background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)' },
    interview: { color: '#7B61FF', background: 'rgba(123,97,255,0.08)', border: '1px solid rgba(123,97,255,0.2)' },
    offer: { color: '#00FFD1', background: 'rgba(0,255,209,0.08)', border: '1px solid rgba(0,255,209,0.2)' },
    rejected: { color: '#EF4444', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' },
  }[status] || { color: '#888', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' })

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: '#050505', padding: isMobile ? '24px 20px' : '48px', }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px' }}
        >
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: '800',
            fontSize: isMobile ? '28px' : '36px',
            color: '#FFFFFF',
            letterSpacing: '-1.5px',
            marginBottom: '8px',
          }}>
            Dashboard
          </h1>
          <p style={{ color: '#444', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
            Track your job search progress
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
          gap: '16px',
          marginBottom: '48px',
        }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${stat.color}22`,
                borderRadius: '16px',
                padding: '24px',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${stat.color}55`}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${stat.color}22`}
            >
              <p style={{
                color: '#444',
                fontSize: '11px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '12px',
                fontFamily: 'Inter, sans-serif',
              }}>
                {stat.label}
              </p>
              <p style={{
                color: stat.color,
                fontSize: '42px',
                fontWeight: '800',
                fontFamily: 'Syne, sans-serif',
                letterSpacing: '-2px',
              }}>
                {loading ? '-' : <AnimatedNumber value={stat.value} />}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: '700',
              fontSize: '20px',
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
            }}>
              Recent Applications
            </h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/applications')}
              style={{
                background: 'transparent',
                color: '#555',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '7px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              View All
            </motion.button>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            {loading ? (
              <div style={{ padding: '48px', textAlign: 'center', color: '#444' }}>
                Loading...
              </div>
            ) : applications.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <p style={{ color: '#444', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
                  No applications yet
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate('/applications')}
                  style={{
                    background: '#C8FF00',
                    color: '#000',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Add First Application
                </motion.button>
              </div>
            ) : (
              applications.slice(0, 6).map((app, i) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => navigate(`/applications/${app.id}`)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    borderBottom: i < applications.slice(0, 6).length - 1
                      ? '1px solid rgba(255,255,255,0.04)'
                      : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  <div>
                    <p style={{
                      color: '#FFFFFF',
                      fontWeight: '600',
                      fontSize: '14px',
                      marginBottom: '4px',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {app.company_name}
                    </p>
                    <p style={{ color: '#444', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
                      {app.job_title}
                      {app.location && ` · ${app.location}`}
                    </p>
                  </div>
                  <span style={{
                    ...getStatusStyle(app.status),
                    padding: '4px 12px',
                    borderRadius: '100px',
                    fontSize: '11px',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {app.status}
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Dashboard