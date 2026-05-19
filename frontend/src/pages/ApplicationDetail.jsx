import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { applicationsApi } from '../api/applicationsApi'
import { aiApi } from '../api/aiApi'
import { githubApi } from '../api/githubApi'
import Navbar from '../components/layout/Navbar'
import useWindowSize from '../hooks/useWindowSize'

function ApplicationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const isMobile = width < 768

  const [application, setApplication] = useState(null)
  const [activeTab, setActiveTab] = useState('analysis')
  const [aiResult, setAiResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [githubUsername, setGithubUsername] = useState('')
  const [githubResult, setGithubResult] = useState(null)
  const [interviewPrep, setInterviewPrep] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const response = await applicationsApi.getOne(id)
        setApplication(response.data)
      } catch (e) { console.log(e) }
    }
    fetchOne()
  }, [id])

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const response = await aiApi.analyze(id)
      setAiResult(response.data)
    } catch (e) { console.log(e) }
    setLoading(false)
  }

  const handleCoverLetter = async () => {
    setLoading(true)
    try {
      const response = await aiApi.generateCoverLetter(id)
      setCoverLetter(response.data.cover_letter)
    } catch (e) { console.log(e) }
    setLoading(false)
  }

  const handleGithubScan = async () => {
    setLoading(true)
    try {
      const response = await githubApi.scan(githubUsername, id)
      setGithubResult(response.data)
    } catch (e) { console.log(e) }
    setLoading(false)
  }

  const handleInterviewCoach = async () => {
    setLoading(true)
    try {
      const response = await aiApi.interviewCoach(id)
      setInterviewPrep(response.data)
    } catch (e) { console.log(e) }
    setLoading(false)
  }

  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(coverLetter)
        .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
        .catch(() => fallbackCopy())
    } else {
      fallbackCopy()
    }
  }

  const fallbackCopy = () => {
    const textArea = document.createElement('textarea')
    textArea.value = coverLetter
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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

  const LoadingSpinner = ({ text }) => (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
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
        {text}
      </p>
    </div>
  )

  const tabs = [
    { id: 'analysis', label: 'AI Analysis' },
    { id: 'cover', label: 'Cover Letter' },
    { id: 'github', label: 'GitHub' },
    { id: 'interview', label: 'Interview Prep' },
  ]

  if (!application) return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <p style={{ color: '#444', fontFamily: 'Inter, sans-serif' }}>Loading...</p>
    </div>
  )


  

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        background: '#050505',
        padding: isMobile ? '24px 20px' : '48px'
      }}>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/applications')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#555',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0,
          }}
        >
          ← Back to Applications
        </motion.button>

        {/* Application Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '28px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '16px' : '0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(200,255,0,0.08)',
              border: '1px solid rgba(200,255,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C8FF00',
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: 'Syne, sans-serif',
              flexShrink: 0,
            }}>
              {application.company_name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: '700',
                fontSize: isMobile ? '20px' : '24px',
                color: '#FFFFFF',
                letterSpacing: '-0.5px',
                marginBottom: '4px',
              }}>
                {application.company_name}
              </h1>
              <p style={{
                color: '#555',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
              }}>
                {application.job_title}
                {application.location && ` · ${application.location}`}
              </p>
            </div>
          </div>
          <span style={{
            ...getStatusStyle(application.status),
            padding: '6px 14px',
            borderRadius: '100px',
            fontSize: '12px',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
          }}>
            {application.status}
          </span>
        </motion.div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '24px',
          overflowX: 'auto',
          paddingBottom: '4px',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id
                  ? 'rgba(200,255,0,0.08)'
                  : 'transparent',
                border: activeTab === tab.id
                  ? '1px solid rgba(200,255,0,0.2)'
                  : '1px solid rgba(255,255,255,0.06)',
                color: activeTab === tab.id ? '#C8FF00' : '#555',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">

          {/* ── AI Analysis Tab ── */}
          {activeTab === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: isMobile ? '20px' : '32px',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '28px',
                flexWrap: 'wrap',
                gap: '12px',
              }}>
                <h2 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: '700',
                  fontSize: '18px',
                  color: '#FFFFFF',
                }}>
                  Resume Analysis
                </h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnalyze}
                  disabled={loading}
                  style={{
                    background: '#C8FF00',
                    color: '#000',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    opacity: loading ? 0.7 : 1,
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  {loading ? 'Analyzing...' : 'Analyze Resume'}
                </motion.button>
              </div>
              {/* AI Precaution */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                background: 'rgba(245,158,11,0.04)',
                border: '1px solid rgba(245,158,11,0.1)',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '24px',
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#F59E0B',
                  flexShrink: 0,
                  marginTop: '6px',
                }} />
                <p style={{
                  color: '#888',
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: '1.6',
                }}>
                  <span style={{ color: '#F59E0B', fontWeight: '600' }}>AI Generated — </span>
                  Results are AI generated and may not be 100% accurate.
                  Use as a guide to improve your resume, not as a guarantee
                  of interview success. Always review suggestions carefully.
                </p>
              </div>

              {!aiResult && !loading && (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <p style={{ color: '#444', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                    Click "Analyze Resume" to get AI powered insights
                  </p>
                </div>
              )}

              {loading && <LoadingSpinner text="Analyzing your resume..." />}

              {aiResult && (
                <div>
                  {/* Match Score */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    marginBottom: '32px',
                    padding: '24px',
                    background: 'rgba(200,255,0,0.04)',
                    border: '1px solid rgba(200,255,0,0.1)',
                    borderRadius: '12px',
                    flexWrap: 'wrap',
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{
                        color: '#C8FF00',
                        fontSize: '64px',
                        fontWeight: '800',
                        fontFamily: 'Syne, sans-serif',
                        letterSpacing: '-3px',
                        lineHeight: 1,
                      }}>
                        {aiResult.match_score}
                      </p>
                      <p style={{ color: '#555', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                        Match Score
                      </p>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{
                        height: '6px',
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: '100px',
                        overflow: 'hidden',
                        marginBottom: '8px',
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${aiResult.match_score}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          style={{
                            height: '100%',
                            background: aiResult.match_score >= 70
                              ? '#C8FF00'
                              : aiResult.match_score >= 40
                                ? '#F59E0B'
                                : '#EF4444',
                            borderRadius: '100px',
                          }}
                        />
                      </div>
                      <p style={{ color: '#444', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                        {aiResult.match_score >= 70
                          ? 'Strong match for this role'
                          : aiResult.match_score >= 40
                            ? 'Moderate match — room to improve'
                            : 'Low match — consider upskilling'}
                      </p>
                    </div>
                  </div>
                  {/* ATS Score */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    marginBottom: '32px',
                    padding: '24px',
                    background: 'rgba(123,97,255,0.04)',
                    border: '1px solid rgba(123,97,255,0.1)',
                    borderRadius: '12px',
                    flexWrap: 'wrap',
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{
                        color: '#7B61FF',
                        fontSize: '64px',
                        fontWeight: '800',
                        fontFamily: 'Syne, sans-serif',
                        letterSpacing: '-3px',
                        lineHeight: 1,
                      }}>
                        {aiResult.ats_score}
                      </p>
                      <p style={{ color: '#555', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                        ATS Score
                      </p>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{
                        height: '6px',
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: '100px',
                        overflow: 'hidden',
                        marginBottom: '8px',
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${aiResult.ats_score}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          style={{
                            height: '100%',
                            background: aiResult.ats_score >= 70
                              ? '#7B61FF'
                              : aiResult.ats_score >= 40
                                ? '#F59E0B'
                                : '#EF4444',
                            borderRadius: '100px',
                          }}
                        />
                      </div>
                      <p style={{ color: '#444', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                        {aiResult.ats_score >= 70
                          ? 'Good ATS compatibility'
                          : aiResult.ats_score >= 40
                            ? 'Moderate ATS compatibility — needs improvement'
                            : 'Poor ATS compatibility — major fixes needed'}
                      </p>
                    </div>
                  </div>

                  {/* ATS Keywords */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '16px',
                    marginBottom: '24px',
                  }}>
                    {/* Keywords Found */}
                    <div style={{
                      background: 'rgba(0,255,209,0.04)',
                      border: '1px solid rgba(0,255,209,0.1)',
                      borderRadius: '12px',
                      padding: '20px',
                    }}>
                      <p style={{
                        color: '#00FFD1',
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        marginBottom: '16px',
                        fontFamily: 'Inter, sans-serif',
                      }}>
                        Keywords Found
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {aiResult.ats_keywords_found?.map((keyword, i) => (
                          <span key={i} style={{
                            background: 'rgba(0,255,209,0.08)',
                            border: '1px solid rgba(0,255,209,0.2)',
                            color: '#00FFD1',
                            padding: '4px 10px',
                            borderRadius: '100px',
                            fontSize: '11px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '500',
                          }}>
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Keywords Missing */}
                    <div style={{
                      background: 'rgba(239,68,68,0.04)',
                      border: '1px solid rgba(239,68,68,0.1)',
                      borderRadius: '12px',
                      padding: '20px',
                    }}>
                      <p style={{
                        color: '#EF4444',
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        marginBottom: '16px',
                        fontFamily: 'Inter, sans-serif',
                      }}>
                        Keywords Missing
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {aiResult.ats_keywords_missing?.map((keyword, i) => (
                          <span key={i} style={{
                            background: 'rgba(239,68,68,0.08)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            color: '#EF4444',
                            padding: '4px 10px',
                            borderRadius: '100px',
                            fontSize: '11px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '500',
                          }}>
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ATS Issues */}
                  <div style={{
                    background: 'rgba(245,158,11,0.04)',
                    border: '1px solid rgba(245,158,11,0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '24px',
                  }}>
                    <p style={{
                      color: '#F59E0B',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      marginBottom: '16px',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      ATS Issues to Fix
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {aiResult.ats_issues?.map((issue, i) => (
                        <li key={i} style={{
                          color: '#888',
                          fontSize: '13px',
                          fontFamily: 'Inter, sans-serif',
                          lineHeight: '1.6',
                          marginBottom: '8px',
                          paddingLeft: '12px',
                          borderLeft: '2px solid rgba(245,158,11,0.3)',
                        }}>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Results Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: '16px',
                  }}>
                    {[
                      { title: 'Strengths', data: aiResult.strengths, color: '#00FFD1' },
                      { title: 'Gaps', data: aiResult.gaps, color: '#EF4444' },
                      { title: 'Suggestions', data: aiResult.suggestions, color: '#C8FF00' },
                    ].map((section, i) => (
                      <div key={i} style={{
                        background: `${section.color}08`,
                        border: `1px solid ${section.color}18`,
                        borderRadius: '12px',
                        padding: '20px',
                      }}>
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── Cover Letter Tab ── */}
          {activeTab === 'cover' && (
            <motion.div
              key="cover"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: isMobile ? '20px' : '32px',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '28px',
                flexWrap: 'wrap',
                gap: '12px',
              }}>
                <h2 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: '700',
                  fontSize: '18px',
                  color: '#FFFFFF',
                }}>
                  Cover Letter
                </h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCoverLetter}
                  disabled={loading}
                  style={{
                    background: '#C8FF00',
                    color: '#000',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    opacity: loading ? 0.7 : 1,
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  {loading ? 'Generating...' : 'Generate Cover Letter'}
                </motion.button>
              </div>

              {!coverLetter && !loading && (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <p style={{ color: '#444', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                    Click "Generate Cover Letter" to create a personalized letter
                  </p>
                </div>
              )}

              {loading && <LoadingSpinner text="Generating your cover letter..." />}

              {coverLetter && (
                <div>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    style={{
                      ...inputStyle,
                      height: isMobile ? '300px' : '400px',
                      lineHeight: '1.7',
                      resize: 'vertical',
                      marginBottom: '16px',
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCopy}
                    style={{
                      background: copied ? 'rgba(0,255,209,0.08)' : 'rgba(255,255,255,0.04)',
                      color: copied ? '#00FFD1' : '#888',
                      border: `1px solid ${copied ? 'rgba(0,255,209,0.2)' : 'rgba(255,255,255,0.08)'}`,
                      padding: '10px 20px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s',
                    }}
                  >
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* ── GitHub Tab ── */}
          {activeTab === 'github' && (
            <motion.div
              key="github"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: isMobile ? '20px' : '32px',
              }}
            >
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: '700',
                fontSize: '18px',
                color: '#FFFFFF',
                marginBottom: '24px',
              }}>
                GitHub Scanner
              </h2>

              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '28px',
                flexDirection: isMobile ? 'column' : 'row',
              }}>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Enter GitHub username"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGithubScan}
                  disabled={loading}
                  style={{
                    background: '#C8FF00',
                    color: '#000',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    whiteSpace: 'nowrap',
                    opacity: loading ? 0.7 : 1,
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  {loading ? 'Scanning...' : 'Scan GitHub'}
                </motion.button>
              </div>

              {!githubResult && !loading && (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <p style={{ color: '#444', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                    Enter your GitHub username to analyze your profile
                  </p>
                </div>
              )}

              {loading && <LoadingSpinner text="Scanning GitHub profile..." />}

              {githubResult && (
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    marginBottom: '24px',
                    padding: '24px',
                    background: 'rgba(123,97,255,0.04)',
                    border: '1px solid rgba(123,97,255,0.1)',
                    borderRadius: '12px',
                    flexWrap: 'wrap',
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{
                        color: '#7B61FF',
                        fontSize: '64px',
                        fontWeight: '800',
                        fontFamily: 'Syne, sans-serif',
                        letterSpacing: '-3px',
                        lineHeight: 1,
                      }}>
                        {githubResult.profile_score}
                      </p>
                      <p style={{ color: '#555', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                        Profile Score
                      </p>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{
                        height: '6px',
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: '100px',
                        overflow: 'hidden',
                        marginBottom: '8px',
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${githubResult.profile_score}%` }}
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

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '16px',
                  }}>
                    {[
                      { title: 'Technical Strengths', data: githubResult.technical_strengths, color: '#00FFD1' },
                      { title: 'Missing Skills', data: githubResult.missing_skills, color: '#EF4444' },
                      { title: 'Standout Projects', data: githubResult.standout_projects, color: '#C8FF00' },
                      { title: 'Suggestions', data: githubResult.suggestions, color: '#7B61FF' },
                    ].map((section, i) => (
                      <div key={i} style={{
                        background: `${section.color}06`,
                        border: `1px solid ${section.color}15`,
                        borderRadius: '12px',
                        padding: '20px',
                      }}>
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── Interview Prep Tab ── */}
          {activeTab === 'interview' && (
            <motion.div
              key="interview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: isMobile ? '20px' : '32px',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '28px',
                flexWrap: 'wrap',
                gap: '12px',
              }}>
                <div>
                <h2 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: '700',
                  fontSize: '18px',
                  color: '#FFFFFF',
                  marginBottom: '4px',
                }}>
                  Interview Coach
                </h2>
                <p style={{
                  color: '#444',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '6px',
                }}>
                  AI generated interview prep based on your resume
                </p>
                {/* Disclaimer */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(245,158,11,0.06)',
                  border: '1px solid rgba(245,158,11,0.15)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#F59E0B',
                    flexShrink: 0,
                  }} />
                  <p style={{
                    color: '#F59E0B',
                    fontSize: '11px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                  }}>
                    AI generated — use as a guide, not a guarantee
                  </p>
                </div>
              </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleInterviewCoach}
                  disabled={loading}
                  style={{
                    background: '#C8FF00',
                    color: '#000',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    opacity: loading ? 0.7 : 1,
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  {loading ? 'Preparing...' : 'Prepare Me'}
                </motion.button>
              </div>

              {!interviewPrep && !loading && (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <p style={{ color: '#444', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                    Click "Prepare Me" to get your personalized interview prep
                  </p>
                </div>
              )}

              {loading && <LoadingSpinner text="Preparing your interview package..." />}

              {interviewPrep && (
                <div>

                  {/* Key Strengths */}
                  <div style={{
                    background: 'rgba(200,255,0,0.04)',
                    border: '1px solid rgba(200,255,0,0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                  }}>
                    <p style={{
                      color: '#C8FF00',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      marginBottom: '16px',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      Your Key Strengths for This Role
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {interviewPrep.key_strengths?.map((s, i) => (
                        <span key={i} style={{
                          background: 'rgba(200,255,0,0.08)',
                          border: '1px solid rgba(200,255,0,0.15)',
                          color: '#C8FF00',
                          padding: '6px 14px',
                          borderRadius: '100px',
                          fontSize: '12px',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: '500',
                        }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Company Insights */}
                  <div style={{
                    background: 'rgba(123,97,255,0.04)',
                    border: '1px solid rgba(123,97,255,0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                  }}>
                    <p style={{
                      color: '#7B61FF',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      marginBottom: '16px',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      Company Insights
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {interviewPrep.company_insights?.map((insight, i) => (
                        <li key={i} style={{
                          color: '#888',
                          fontSize: '13px',
                          fontFamily: 'Inter, sans-serif',
                          lineHeight: '1.6',
                          marginBottom: '8px',
                          paddingLeft: '12px',
                          borderLeft: '2px solid rgba(123,97,255,0.3)',
                        }}>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Top Questions */}
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: '700',
                      fontFamily: 'Syne, sans-serif',
                      marginBottom: '16px',
                    }}>
                      Top Interview Questions
                    </p>
                    {interviewPrep.top_questions?.map((q, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '12px',
                          padding: '20px',
                          marginBottom: '12px',
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          marginBottom: '12px',
                        }}>
                          <span style={{
                            background: q.type === 'behavioral'
                              ? 'rgba(200,255,0,0.08)'
                              : q.type === 'technical'
                                ? 'rgba(0,255,209,0.08)'
                                : 'rgba(123,97,255,0.08)',
                            color: q.type === 'behavioral'
                              ? '#C8FF00'
                              : q.type === 'technical'
                                ? '#00FFD1'
                                : '#7B61FF',
                            border: `1px solid ${q.type === 'behavioral'
                              ? 'rgba(200,255,0,0.2)'
                              : q.type === 'technical'
                                ? 'rgba(0,255,209,0.2)'
                                : 'rgba(123,97,255,0.2)'}`,
                            padding: '3px 10px',
                            borderRadius: '100px',
                            fontSize: '10px',
                            fontWeight: '700',
                            fontFamily: 'Inter, sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}>
                            {q.type}
                          </span>
                          <p style={{
                            color: '#FFFFFF',
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: 'Inter, sans-serif',
                            lineHeight: '1.5',
                          }}>
                            Q{i + 1}: {q.question}
                          </p>
                        </div>
                        <div style={{
                          background: 'rgba(255,255,255,0.02)',
                          borderRadius: '8px',
                          padding: '14px',
                          borderLeft: '2px solid rgba(200,255,0,0.2)',
                        }}>
                          <p style={{
                            color: '#444',
                            fontSize: '11px',
                            fontWeight: '700',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            marginBottom: '8px',
                            fontFamily: 'Inter, sans-serif',
                          }}>
                            Suggested Answer
                          </p>
                          <p style={{
                            color: '#888',
                            fontSize: '13px',
                            fontFamily: 'Inter, sans-serif',
                            lineHeight: '1.7',
                          }}>
                            {q.answer}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Questions to Ask */}
                  <div style={{
                    background: 'rgba(0,255,209,0.04)',
                    border: '1px solid rgba(0,255,209,0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                  }}>
                    <p style={{
                      color: '#00FFD1',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      marginBottom: '16px',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      Questions to Ask the Interviewer
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {interviewPrep.questions_to_ask?.map((q, i) => (
                        <li key={i} style={{
                          color: '#888',
                          fontSize: '13px',
                          fontFamily: 'Inter, sans-serif',
                          lineHeight: '1.6',
                          marginBottom: '8px',
                          paddingLeft: '12px',
                          borderLeft: '2px solid rgba(0,255,209,0.3)',
                        }}>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Red Flags */}
                  <div style={{
                    background: 'rgba(239,68,68,0.04)',
                    border: '1px solid rgba(239,68,68,0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                  }}>
                    <p style={{
                      color: '#EF4444',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      marginBottom: '16px',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      Watch Out For
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {interviewPrep.red_flags?.map((flag, i) => (
                        <li key={i} style={{
                          color: '#888',
                          fontSize: '13px',
                          fontFamily: 'Inter, sans-serif',
                          lineHeight: '1.6',
                          marginBottom: '12px',
                          paddingLeft: '12px',
                          borderLeft: '2px solid rgba(239,68,68,0.3)',
                        }}>
                          {/* Handle both string and object formats */}
                          {typeof flag === 'string' ? (
                            flag
                          ) : (
                            <div>
                              <p style={{ color: '#EF4444', marginBottom: '4px', fontWeight: '500' }}>
                                {flag.potential_weakness}
                              </p>
                              <p style={{ color: '#666', fontSize: '12px' }}>
                                {flag.how_to_handle_it}
                              </p>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </>
  )
}

export default ApplicationDetail