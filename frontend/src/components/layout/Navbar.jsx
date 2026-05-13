import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useAuthStore from '../../store/authStore'
import useWindowSize from '../../hooks/useWindowSize'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useAuthStore((state) => state.logout)
  const { width } = useWindowSize()
  const isMobile = width < 768
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/applications', label: 'Applications' },
    { to: '/kanban', label: 'Kanban' },
    { to: '/resume', label: 'Resume' },
    { to: '/github', label: 'GitHub' },
  ]

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(5,5,5,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: isMobile ? '0 20px' : '0 48px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <motion.h1
          onClick={() => navigate('/dashboard')}
          whileHover={{ scale: 1.02 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: '800',
            fontSize: '22px',
            color: '#C8FF00',
            letterSpacing: '-1px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          Rezumi
        </motion.h1>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
            {links.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    color: isActive ? '#FFFFFF' : '#555555',
                    fontSize: '14px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'color 0.2s',
                    position: 'relative',
                    paddingBottom: '2px',
                    borderBottom: isActive ? '1px solid #C8FF00' : '1px solid transparent',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}

        {/* Desktop Logout */}
        {!isMobile && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { logout(); navigate('/login') }}
            style={{
              background: 'transparent',
              color: '#888',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Logout
          </motion.button>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                  y: menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
                style={{
                  width: '18px',
                  height: '1.5px',
                  background: '#888',
                  borderRadius: '2px',
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '60px',
              left: 0,
              right: 0,
              zIndex: 49,
              background: 'rgba(5,5,5,0.98)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '16px 20px',
            }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    color: location.pathname === link.to ? '#C8FF00' : '#888',
                    fontSize: '15px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => { logout(); navigate('/login') }}
              style={{
                marginTop: '16px',
                background: 'transparent',
                color: '#EF4444',
                border: '1px solid rgba(239,68,68,0.2)',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                width: '100%',
              }}
            >
              Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar