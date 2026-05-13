import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: '800',
          fontSize: '48px',
          color: '#C8FF00',
          letterSpacing: '-2px',
          marginBottom: '48px',
        }}>
          Rezumi
        </h1>
      </motion.div>

      {/* Progress Bar */}
      <div style={{
        width: '200px',
        height: '2px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '100px',
        overflow: 'hidden',
      }}>
        <motion.div
          style={{
            height: '100%',
            background: '#C8FF00',
            borderRadius: '100px',
            width: `${progress}%`,
          }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Progress Text */}
      <p style={{
        color: '#555',
        fontSize: '12px',
        marginTop: '16px',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '1px',
      }}>
        {progress}%
      </p>
    </motion.div>
  )
}

export default LoadingScreen