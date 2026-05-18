import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Aurora from '../components/Aurora';
import useWindowSize from '../hooks/useWindowSize';

function Landing() {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      number: '01',
      title: 'Resume Analyzer',
      desc: 'Get an AI powered match score against any job description. Identify skill gaps instantly.',
      color: '#C8FF00',
    },
    {
      number: '02',
      title: 'Cover Letter Generator',
      desc: 'Generate personalized cover letters in seconds. Tailored to each specific job.',
      color: '#7B61FF',
    },
    {
      number: '03',
      title: 'GitHub Scanner',
      desc: 'Analyze your GitHub profile against job requirements. Know which projects to highlight.',
      color: '#00FFD1',
    },
    {
      number: '04',
      title: 'Interview Coach',
      desc: 'Get AI generated interview questions, STAR format answers, company insights, and smart questions to ask. Practice before you walk in.',
      color: '#F59E0B',
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // Close mobile menu after click
    }
  };

  return (
    <div style={{ background: '#050505', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ====================== DESKTOP NAV ====================== */}
      {!isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          padding: '20px 48px',
        }}>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '48px',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '100px',
              padding: '10px 12px 10px 32px',
              width: '100%',
              maxWidth: '720px',
            }}
          >
            <h1 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: '800',
              fontSize: '20px',
              color: '#C8FF00',
              letterSpacing: '-0.5px',
            }}>
              Rezumi
            </h1>

            <div style={{ display: 'flex', gap: '32px' }}>
              {[
                { label: 'Home', id: 'home' },
                { label: 'Features', id: 'features' },
                { label: 'About', id: 'about' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.id ? `#${link.id}` : '#'}
                  onClick={(e) => {
                    if (link.id) {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }
                  }}
                  style={{
                    color: '#aaa',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#aaa'}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/login')}
                style={{
                  background: 'transparent',
                  color: '#ccc',
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: '8px 20px',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Login
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/register')}
                style={{
                  background: '#C8FF00',
                  color: '#000',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ====================== MOBILE NAV ====================== */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(5,5,5,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '0 20px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: '800',
            fontSize: '22px',
            color: '#C8FF00',
            letterSpacing: '-0.5px',
          }}>
            Rezumi
          </h1>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontSize: '28px',
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(5,5,5,0.98)',
          zIndex: 49,
          padding: '40px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          {[
            { label: 'Home', id: 'home' },
            { label: 'Features', id: 'features' },
            { label: 'About', id: 'about' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.id ? `#${link.id}` : '#'}
              onClick={(e) => {
                if (link.id) {
                  e.preventDefault();
                  scrollToSection(link.id);
                }
              }}
              style={{
                color: '#fff',
                fontSize: '22px',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => { navigate('/login'); setMenuOpen(false); }}
              style={{
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '14px',
                borderRadius: '12px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Login
            </button>
            <button
              onClick={() => { navigate('/register'); setMenuOpen(false); }}
              style={{
                background: '#C8FF00',
                color: '#000',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              Get Started Free
            </button>
          </div>
        </div>
      )}

      {/* ====================== HERO SECTION ====================== */}
      <div id="home" style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <Aurora
          colorStops={['#C8FF00', '#7B61FF', '#00FFD1']}
          amplitude={0.8}
          blend={0.15}
          speed={0.4}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.65) 65%, rgba(5,5,5,1) 100%)',
        }} />

        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: isMobile ? '0 24px' : '0 48px',
          maxWidth: '820px',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={{
              display: 'inline-block',
              background: 'rgba(200,255,0,0.08)',
              border: '1px solid rgba(200,255,0,0.25)',
              color: '#C8FF00',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '6px 18px',
              borderRadius: '100px',
              marginBottom: '32px',
            }}>
              AI POWERED JOB SEARCH
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: '800',
              fontSize: isMobile ? '48px' : '72px',
              lineHeight: '1.05',
              letterSpacing: isMobile ? '-2px' : '-3.5px',
              color: '#FFFFFF',
              marginBottom: '24px',
            }}
          >
            Land Your <span style={{ color: '#C8FF00' }}>Dream Job</span> Faster
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              color: '#999',
              fontSize: isMobile ? '16px' : '18px',
              lineHeight: '1.6',
              marginBottom: '48px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            AI-powered resume analysis,Cover letter generation,Interview prepration and GitHub profiling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/register')}
              style={{
                background: '#C8FF00',
                color: '#000',
                border: 'none',
                padding: isMobile ? '14px 32px' : '16px 40px',
                borderRadius: '100px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Get Started Free
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/login')}
              style={{
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: isMobile ? '14px 32px' : '16px 40px',
                borderRadius: '100px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Login
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ====================== FEATURES ====================== */}
      <div id="features" style={{
        padding: isMobile ? '80px 24px' : '140px 48px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: '800',
            fontSize: isMobile ? '36px' : '52px',
            color: '#FFFFFF',
            letterSpacing: '-2px',
            marginBottom: '16px',
          }}>
            Everything You Need
          </h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Three powerful AI tools to accelerate your job search
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '20px',
        }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '20px',
                padding: '36px 28px',
                transition: 'border-color 0.4s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = `${f.color}40`}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
            >
              <p style={{ color: f.color, fontSize: '13px', fontWeight: '700', letterSpacing: '2px', marginBottom: '12px' }}>
                {f.number}
              </p>
              <h3 style={{
                color: '#fff',
                fontSize: '22px',
                fontWeight: '700',
                marginBottom: '14px',
                fontFamily: 'Syne, sans-serif',
              }}>
                {f.title}
              </h3>
              <p style={{ color: '#777', lineHeight: '1.7' }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ====================== STATS ====================== */}
      <div id="about" style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: isMobile ? '60px 24px' : '100px 48px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)',
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
          gap: '40px',
        }}>
          {[
            { value: 'AI', label: 'Powered Analysis' },
            { value: '4', label: 'Powerful Tools' },
            { value: '100%', label: 'Free to Start' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p style={{
                color: '#C8FF00',
                fontSize: isMobile ? '42px' : '56px',
                fontWeight: '800',
                fontFamily: 'Syne, sans-serif',
              }}>
                {stat.value}
              </p>
              <p style={{ color: '#555', marginTop: '8px' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ====================== FINAL CTA ====================== */}
      <div style={{
        textAlign: 'center',
        padding: isMobile ? '100px 24px' : '140px 48px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: '800',
            fontSize: isMobile ? '38px' : '56px',
            letterSpacing: '-2px',
            color: '#fff',
            marginBottom: '20px',
          }}>
            Ready to Get Hired?
          </h2>
          <p style={{ color: '#777', fontSize: '17px', marginBottom: '40px' }}>
            Start analyzing your resume today — completely free.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/register')}
            style={{
              background: '#C8FF00',
              color: '#000',
              border: 'none',
              padding: '16px 48px',
              borderRadius: '100px',
              fontSize: '17px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Start For Free
          </motion.button>
        </motion.div>
      </div>

      {/* ====================== FOOTER ====================== */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '40px 24px',
        textAlign: 'center',
        color: '#444',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
      }}>
        Built with Django, React, and Groq AI
      </div>
    </div>
  );
}

export default Landing;
