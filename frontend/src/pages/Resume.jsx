import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { resumeApi } from '../api/resumeApi'
import Navbar from '../components/layout/Navbar'
import useWindowSize from '../hooks/useWindowSize'

function Resume() {
  const [resume, setResume] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const { width } = useWindowSize()
  const isMobile = width < 768

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await resumeApi.get()
        setResume(response.data)
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }
    fetchResume()
  }, [])

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const response = await resumeApi.upload(file)
      setResume(response.data)
    } catch (e) {
      console.log(e)
    }
    setUploading(false)
  }

  const handleDelete = async () => {
    try {
      await resumeApi.delete()
      setResume(null)
    } catch (e) {
      console.log(e)
    }
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
            My Resume
          </h1>
          <p style={{ color: '#444', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
            Upload your resume to enable AI powered analysis
          </p>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: '#444', fontFamily: 'Inter, sans-serif' }}>Loading...</p>
          </div>
        ) : resume ? (
          /* Resume Exists */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Status Card */}
            <div style={{
              background: 'rgba(0,255,209,0.04)',
              border: '1px solid rgba(0,255,209,0.1)',
              borderRadius: '16px',
              padding: isMobile ? '20px' : '28px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(0,255,209,0.08)',
                  border: '1px solid rgba(0,255,209,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}>
                  📄
                </div>
                <div>
                  <p style={{
                    color: '#00FFD1',
                    fontWeight: '600',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '4px',
                  }}>
                    Resume Uploaded
                  </p>
                  <p style={{ color: '#555', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                    Uploaded {new Date(resume.uploaded_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <label style={{
                  background: 'rgba(255,255,255,0.04)',
                  color: '#888',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {uploading ? 'Uploading...' : 'Replace'}
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDelete}
                  style={{
                    background: 'rgba(239,68,68,0.08)',
                    color: '#EF4444',
                    border: '1px solid rgba(239,68,68,0.2)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Delete
                </motion.button>
              </div>
            </div>

            {/* Extracted Text Preview */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: isMobile ? '20px' : '28px',
            }}>
              <p style={{
                color: '#555',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '16px',
                fontFamily: 'Inter, sans-serif',
              }}>
                Extracted Text Preview
              </p>
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: '10px',
                padding: '16px',
                maxHeight: '300px',
                overflowY: 'auto',
              }}>
                <p style={{
                  color: '#dfdfdf',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: '1.7',
                  whiteSpace: 'pre-wrap',
                }}>
                  {resume.extracted_text?.slice(0, 800)}
                  {resume.extracted_text?.length > 800 && '...'}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* No Resume */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px dashed rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: isMobile ? '48px 24px' : '80px',
              textAlign: 'center',
            }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'rgba(200,255,0,0.06)',
              border: '1px solid rgba(200,255,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '28px',
            }}>
              📄
            </div>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: '700',
              fontSize: '20px',
              color: '#FFFFFF',
              marginBottom: '8px',
            }}>
              No Resume Uploaded
            </h2>
            <p style={{
              color: '#444',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '32px',
              lineHeight: '1.6',
            }}>
              Upload your PDF resume to enable AI powered<br />
              resume analysis and cover letter generation
            </p>
            <label style={{
              display: 'inline-block',
              background: '#C8FF00',
              color: '#000',
              padding: '12px 28px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}>
              {uploading ? 'Uploading...' : 'Upload Resume (PDF)'}
              <input
                type="file"
                accept=".pdf"
                onChange={handleUpload}
                style={{ display: 'none' }}
              />
            </label>
            <p style={{
              color: '#333',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              marginTop: '12px',
            }}>
              PDF files only · Max 5MB
            </p>
          </motion.div>
        )}
      </div>
    </>
  )
}

export default Resume