import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { motion } from 'framer-motion'
import { applicationsApi } from '../api/applicationsApi'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import useWindowSize from '../hooks/useWindowSize'

const COLUMNS = [
  { id: 'saved', label: 'Saved', color: '#888888' },
  { id: 'applied', label: 'Applied', color: '#60A5FA' },
  { id: 'interview', label: 'Interview', color: '#7B61FF' },
  { id: 'offer', label: 'Offer', color: '#00FFD1' },
  { id: 'rejected', label: 'Rejected', color: '#EF4444' },
]

function KanbanBoard() {
  const [applications, setApplications] = useState([])
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const isMobile = width < 768

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await applicationsApi.getAll()
        setApplications(res.data)
      } catch (e) { console.log(e) }
    }
    fetch()
  }, [])

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId) return
    const newStatus = destination.droppableId
    setApplications(applications.map(app =>
      app.id === parseInt(draggableId)
        ? { ...app, status: newStatus }
        : app
    ))
    try {
      await applicationsApi.update(draggableId, { status: newStatus })
    } catch (e) { console.log(e) }
  }

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: '#050505', padding: isMobile ? '24px 20px' : '48px' }}>

        {/* Info Banner */}
        <motion.div 
        id='kanban-info'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            background: 'rgba(200,255,0,0.04)',
            border: '1px solid rgba(200,255,0,0.1)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          {/* Icon */}
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(200,255,0,0.08)',
            border: '1px solid rgba(200,255,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: '14px',
          }}>
            💡
          </div>

          {/* Text */}
          <div >
            <p style={{
              color: '#C8FF00',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '4px',
            }}>
              What is a Kanban Board?
            </p>
            <p style={{
              color: '#555',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.6',
            }}>
              A Kanban board helps you visually track your job applications.
              Each column represents a stage in your job search.
              Simply <span style={{ color: '#888' }}>drag and drop</span> any
              application card to update its status instantly.
            </p>

            {/* Steps */}
            <div style={{
              display: 'flex',
              gap: '24px',
              marginTop: '12px',
              flexWrap: 'wrap',
            }}>
              {[
                { step: '01', label: 'Saved', desc: 'Jobs you want to apply to' },
                { step: '02', label: 'Applied', desc: 'Applications submitted' },
                { step: '03', label: 'Interview', desc: 'Interview scheduled' },
                { step: '04', label: 'Offer', desc: 'Offer received' },
                { step: '05', label: 'Rejected', desc: 'Not selected' },
              ].map((item) => (
                <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    color: '#C8FF00',
                    fontSize: '10px',
                    fontWeight: '700',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '1px',
                  }}>
                    {item.step}
                  </span>
                  <div>
                    <p style={{
                      color: '#888',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {item.label}
                    </p>
                    <p style={{
                      color: '#444',
                      fontSize: '11px',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={() => {
              document.getElementById('kanban-info').style.display = 'none'
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#444',
              cursor: 'pointer',
              fontSize: '16px',
              flexShrink: 0,
              padding: '0',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </motion.div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div style={{
            display: 'flex',
            gap: isMobile ? '10px' : '16px',
            overflowX: 'auto',
            paddingBottom: '24px',
            WebkitOverflowScrolling: 'touch',
          }}>
            {COLUMNS.map((col, colIndex) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: colIndex * 0.1 }}
                style={{ minWidth: isMobile ? '160px' : '240px', flex: isMobile ? '0 0 160px' : '1' }}
              >
                {/* Column Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  padding: '0 4px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '100%',
                      background: col.color,
                    }} />
                    <span style={{
                      color: '#888',
                      fontSize: isMobile ? '10px' : '12px',
                      fontWeight: '600',
                      fontFamily: 'Inter, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}>
                      {col.label}
                    </span>
                  </div>
                  <span style={{
                    color: '#444',
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {applications.filter(a => a.status === col.id).length}
                  </span>
                </div>

                {/* Droppable */}
                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        minHeight: '400px',
                        background: snapshot.isDraggingOver
                          ? `${col.color}08`
                          : 'rgba(255,255,255,0.01)',
                        border: `1px solid ${snapshot.isDraggingOver
                          ? col.color + '33'
                          : 'rgba(255,255,255,0.04)'}`,
                        borderRadius: '16px',
                        padding: '12px',
                        transition: 'all 0.2s',
                      }}
                    >
                      {applications
                        .filter(app => app.status === col.id)
                        .map((app, index) => (
                          <Draggable
                            key={app.id}
                            draggableId={String(app.id)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => navigate(`/applications/${app.id}`)}
                                style={{
                                  ...provided.draggableProps.style,
                                  background: snapshot.isDragging
                                    ? 'rgba(255,255,255,0.08)'
                                    : 'rgba(255,255,255,0.03)',
                                  border: `1px solid ${snapshot.isDragging
                                    ? col.color + '44'
                                    : 'rgba(255,255,255,0.06)'}`,
                                  borderRadius: '12px',
                                  padding: isMobile ? '10px' : '14px',
                                  marginBottom: '8px',
                                  cursor: 'grab',
                                  transform: snapshot.isDragging
                                    ? `${provided.draggableProps.style?.transform} rotate(2deg)`
                                    : provided.draggableProps.style?.transform,
                                  boxShadow: snapshot.isDragging
                                    ? `0 20px 40px rgba(0,0,0,0.4)`
                                    : 'none',
                                }}
                              >
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  marginBottom: '8px',
                                }}>
                                  <div style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '8px',
                                    background: `${col.color}15`,
                                    border: `1px solid ${col.color}30`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: col.color,
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    fontFamily: 'Syne, sans-serif',
                                  }}>
                                    {app.company_name?.[0]?.toUpperCase()}
                                  </div>
                                  <p style={{
                                    color: '#FFFFFF',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    fontFamily: 'Inter, sans-serif',
                                  }}>
                                    {app.company_name}
                                  </p>
                                </div>
                                <p style={{
                                  color: '#555',
                                  fontSize: '12px',
                                  fontFamily: 'Inter, sans-serif',
                                }}>
                                  {app.job_title}
                                </p>
                                {app.location && (
                                  <p style={{
                                    color: '#333',
                                    fontSize: '11px',
                                    fontFamily: 'Inter, sans-serif',
                                    marginTop: '4px',
                                  }}>
                                    {app.location}
                                  </p>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </motion.div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </>
  )
}

export default KanbanBoard