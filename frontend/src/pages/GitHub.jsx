import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { githubApi } from '../api/githubApi'
import { applicationsApi } from '../api/applicationsApi'
import Navbar from '../components/layout/Navbar'
import useWindowSize from '../hooks/useWindowSize'

function GitHub() {
  const [username, setUsername] = useState('')
  const [applications, setApplications] = useState([])
  const [selectedApp, setSelectedApp] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const { width } = useWindowSize()
  const isMobile = width < 768

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await applicationsApi.getAll()
        setApplications(response.data)
        if (response.data.length > 0) {
          setSelectedApp(response.data[0].id)
        }
      } catch (e) { console.log(e) }
    }
    fetchApplications()
  }, [])

  const handleScan = async () => {
    if (!username || !selectedApp) return
    setLoading(true)
    try {
      const response = await githubApi.scan(username, selectedApp)
      setResult(response.data)
    } catch (e) { console.log(e) }
    setLoading(false)
  }

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
      <div style={{
        minHeight: '100vh',
        background: '#050505',
        padding: isMobile ? '24px 20px' : '48px',
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '40px' }}
        >
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: '800',
            fontSize: isMobile ? '28px' : '36px',
            color: '#FFFFFF',
            letterSpacing: '-1.5px',
            marginBottom: '8px',
          }}>
            GitHub Scanner
          </h1>
          <p style={{ color: '#444', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
            Analyze your GitHub profile against job requirements
          </p>
        </motion.div>

        {/* Scanner Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '28px',
            marginBottom: '24px',
          }}
        >
          <p style={{
            color: '#555',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '20px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Scan Settings
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '16px',
            marginBottom: '16px',
          }}>
            <div>
              <label style={{
                color: '#444',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                display: 'block',
                marginBottom: '6px',
              }}>
                GitHub Username
              </label>
              <input
                style={inputStyle}
                type="text"
                placeholder="your-github-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label style={{
                color: '#444',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                display: 'block',
                marginBottom: '6px',
              }}>
                Compare Against Job
              </label>
              <select
                style={{ ...inputStyle, cursor: 'pointer' }}
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
              >
                {applications.length === 0 ? (
                  <option>No applications yet</option>
                ) : (
                  applications.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.company_name} — {app.job_title}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleScan}
            disabled={loading || !username || !selectedApp}
            style={{
              background: '#C8FF00',
              color: '#000',
              border: 'none',
              padding: '11px 24px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif',
              opacity: loading || !username ? 0.7 : 1,
              width: isMobile ? '100%' : 'auto',
            }}
          >
            {loading ? 'Scanning...' : 'Scan GitHub Profile'}
          </motion.button>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '32px',
                height: '32px',
                border: '2px solid rgba(200,255,0,0.2)',
                borderTop: '2px solid #C8FF00',
                borderRadius: '50%',
                margin: '0 auto 16px',
              }}
            />
            <p style={{ color: '#444', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
              Scanning GitHub profile...
            </p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Profile Score */}
            <div style={{
              background: 'rgba(123,97,255,0.04)',
              border: '1px solid rgba(123,97,255,0.1)',
              borderRadius: '16px',
              padding: isMobile ? '20px' : '28px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  color: '#7B61FF',
                  fontSize: '72px',
                  fontWeight: '800',
                  fontFamily: 'Syne, sans-serif',
                  letterSpacing: '-3px',
                  lineHeight: 1,
                }}>
                  {result.profile_score}
                </p>
                <p style={{ color: '#555', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                  Profile Score
                </p>
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <p style={{
                  color: '#FFFFFF',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: '700',
                  fontSize: '18px',
                  marginBottom: '8px',
                }}>
                  @{result.github_username || username}
                </p>
                <div style={{
                  height: '6px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '100px',
                  overflow: 'hidden',
                  marginBottom: '8px',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.profile_score}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: '#7B61FF',
                      borderRadius: '100px',
                    }}
                  />
                </div>
                <p style={{ color: '#444', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                  GitHub profile strength for this role
                </p>
              </div>
            </div>

            {/* Results Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px',
            }}>
              {[
                { title: 'Technical Strengths', data: result.technical_strengths, color: '#00FFD1' },
                { title: 'Missing Skills', data: result.missing_skills, color: '#EF4444' },
                { title: 'Standout Projects', data: result.standout_projects, color: '#C8FF00' },
                { title: 'Suggestions', data: result.suggestions, color: '#7B61FF' },
              ].map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: `${section.color}06`,
                    border: `1px solid ${section.color}15`,
                    borderRadius: '12px',
                    padding: '20px',
                  }}
                >
                  <p style={{
                    color: section.color,
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {section.title}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {section.data?.map((item, j) => (
                      <li key={j} style={{
                        color: '#888',
                        fontSize: '13px',
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '1.6',
                        marginBottom: '8px',
                        paddingLeft: '12px',
                        borderLeft: `2px solid ${section.color}40`,
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
}

export default GitHub