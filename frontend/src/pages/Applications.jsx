import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { applicationsApi } from '../api/applicationsApi'
import Navbar from '../components/layout/Navbar'
import { useNavigate } from 'react-router-dom'
import useWindowSize from '../hooks/useWindowSize'

function Applications() {
  const [applications, setApplications] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState('saved')
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

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const res = await applicationsApi.create({
        company_name: companyName,
        job_title: jobTitle,
        job_description: jobDescription,
        location,
        status,
      })
      setApplications([res.data, ...applications])
      setShowModal(false)
      setCompanyName('')
      setJobTitle('')
      setJobDescription('')
      setLocation('')
      setStatus('saved')
    } catch (e) { console.log(e) }
  }

  const getStatusStyle = (status) => ({
    saved: { color: '#888', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' },
    applied: { color: '#60A5FA', background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)' },
    interview: { color: '#7B61FF', background: 'rgba(123,97,255,0.08)', border: '1px solid rgba(123,97,255,0.2)' },
    offer: { color: '#00FFD1', background: 'rgba(0,255,209,0.08)', border: '1px solid rgba(0,255,209,0.2)' },
    rejected: { color: '#EF4444', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' },
  }[status] || { color: '#888', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' })

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    borderRadius: '10px',
    padding: '10px 14px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
  }

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: '#050505', padding: isMobile ? '24px 20px' : '48px', }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div>
            <h1 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: '800',
              fontSize: isMobile ? '28px' : '36px',
              color: '#FFFFFF',
              letterSpacing: '-1.5px',
              marginBottom: '8px',
            }}>
              Applications
            </h1>
            <p style={{ color: '#444', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
              {applications.length} total applications
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            style={{
              background: '#C8FF00',
              color: '#000',
              border: 'none',
              padding: isMobile ? '8px 14px' : '10px 20px',
              borderRadius: '10px',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',  
              whiteSpace: 'nowrap',
            }}
          >
            {isMobile ? '+ Add' : '+ Add Application'}
          </motion.button>    
        </motion.div>

        {/* Applications List */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}>
          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#444', fontFamily: 'Inter, sans-serif' }}>
              Loading...
            </div>
          ) : applications.length === 0 ? (
            <div style={{ padding: '64px', textAlign: 'center' }}>
              <p style={{ color: '#444', fontFamily: 'Inter, sans-serif', marginBottom: '16px' }}>
                No applications yet
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowModal(true)}
                style={{
                  background: '#C8FF00',
                  color: '#000',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Add First Application
              </motion.button>
            </div>
          ) : (
            applications.map((app, i) => (
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
                  padding: '18px 24px',
                  borderBottom: i < applications.length - 1
                    ? '1px solid rgba(255,255,255,0.04)'
                    : 'none',
                  cursor: 'pointer',
                }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(200,255,0,0.08)',
                    border: '1px solid rgba(200,255,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#C8FF00',
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: '700',
                    fontSize: '16px',
                  }}>
                    {app.company_name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p style={{
                      color: '#FFFFFF',
                      fontWeight: '600',
                      fontSize: '14px',
                      marginBottom: '3px',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {app.company_name}
                    </p>
                    <p style={{ color: '#444', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                      {app.job_title}
                      {app.location && ` · ${app.location}`}
                    </p>
                  </div>
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
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: isMobile ? 'flex-end' : 'center',
              justifyContent: 'center',
              zIndex: 100,
              padding: isMobile ? '0' : '24px',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowModal(false)
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                background: '#0E0E0E',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: isMobile ? '20px 20px 0 0' : '20px',
                padding: isMobile ? '24px 20px' : '32px',
                width: '100%',
                maxWidth: isMobile ? '100%' : '480px',
              }}
            >
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: '700',
                fontSize: '22px',
                color: '#FFFFFF',
                letterSpacing: '-0.5px',
                marginBottom: '24px',
              }}>
                Add Application
              </h2>

              <form onSubmit={handleCreate}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ color: '#444', fontSize: '12px', fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: '6px' }}>
                      Company Name
                    </label>
                    <input
                      style={inputStyle}
                      type="text"
                      placeholder="Google"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ color: '#444', fontSize: '12px', fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: '6px' }}>
                      Job Title
                    </label>
                    <input
                      style={inputStyle}
                      type="text"
                      placeholder="Backend Developer"
                      value={jobTitle}
                      onChange={e => setJobTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ color: '#444', fontSize: '12px', fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: '6px' }}>
                    Location
                  </label>
                  <input
                    style={inputStyle}
                    type="text"
                    placeholder="Remote"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ color: '#444', fontSize: '12px', fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: '6px' }}>
                    Job Description
                  </label>
                  <textarea
                    style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ color: '#444', fontSize: '12px', fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: '6px' }}>
                    Status
                  </label>
                  <select
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                  >
                    <option value="saved">Saved</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(false)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: '#555',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '12px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      background: '#C8FF00',
                      color: '#000',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Save
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Applications