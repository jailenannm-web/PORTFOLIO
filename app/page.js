'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const EMAILJS_SERVICE_ID = 'service_iexfwj4'
const EMAILJS_TEMPLATE_ID = 'template_4a2090c'
const EMAILJS_PUBLIC_KEY = '92y8BwA5JXl9ehFDc'

// Helper to load EmailJS SDK from CDN (more reliable than npm in Next.js client components)
let emailJsPromise = null

function loadEmailJS() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.emailjs) return Promise.resolve(window.emailjs)

  if (!emailJsPromise) {
    emailJsPromise = new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
      script.async = true
      script.onload = () => {
        if (window.emailjs) {
          window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
          resolve(window.emailjs)
        } else {
          resolve(null)
        }
      }
      script.onerror = () => {
        console.error('Failed to load EmailJS script')
        resolve(null)
      }
      document.head.appendChild(script)
    })
  }
  return emailJsPromise
}

// ============================================
// DATA
// ============================================
const projectsData = {
  sonder: {
    title: "Sonder - Mental Health Awareness Website",
    description: "Sonder is a comprehensive mental health awareness platform dedicated to promoting psychological wellness and breaking the stigma surrounding mental health.",
    fullDescription: "Sonder combines modern web technologies with a compassionate design approach to create a safe, accessible space for mental health awareness and support.",
    technologies: ["HTML", "CSS", "JavaScript"],
    features: [
      "Comprehensive mental health resource library",
      "Peer support communities and forums",
      "Professional consultation booking system",
      "Wellness tracking and progress monitoring",
      "Crisis resource hotline integration",
      "Personalized mental health recommendations",
      "Secure user authentication and privacy protection"
    ],
  },
  escpms: {
    title: "Sta. Cruz Elementary School Property Custodian Management System",
    description: "A specialized property management system designed specifically for Sta. Cruz Elementary School's custodial operations.",
    fullDescription: "The system provides comprehensive tools for managing school property inventory, scheduling maintenance tasks, tracking repairs and replacements, and maintaining custodial records.",
    technologies: ["Visual Basic", "MySQL", ".NET", "WinForms"],
    features: [
      "Comprehensive property inventory management",
      "Maintenance scheduling and tracking",
      "Work order assignment and monitoring",
      "Repair and replacement documentation",
      "Custodial task assignment system",
      "Automated compliance reporting",
      "Real-time asset status updates"
    ],
  },
  cnscpos: {
    title: "CNSC Auxiliary - Local Only Point of Sale System",
    description: "A dedicated point-of-sale system developed for CNSC Auxiliary's local operations.",
    fullDescription: "This POS system prioritizes reliability and ease of use for local auxiliary operations with no cloud dependencies.",
    technologies: ["JAVA", "PHP"],
    features: [
      "Fast transaction processing and checkout",
      "Real-time inventory management",
      "Sales analytics and reporting",
      "Receipt and invoice generation",
      "Product categorization and pricing",
      "Inventory reconciliation tools",
      "Secure local data storage"
    ],
  }
}

// ============================================
// STAR RATING COMPONENT
// ============================================
function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="rating-input" style={{ display: 'flex', gap: '4px', fontSize: '1.5rem', cursor: 'pointer' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="star-label"
          role="button"
          tabIndex={0}
          aria-label={`Rate ${star} stars`}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setRating(star) }}
          style={{ color: (hover || rating) >= star ? 'var(--primary-color)' : 'rgba(255, 140, 0, 0.3)', transition: 'color 0.2s' }}
        >
          {'★'}
        </span>
      ))}
    </div>
  )
}

// ============================================
// FEEDBACK CARD COMPONENT
// ============================================
function FeedbackCard({ feedback }) {
  const initials = feedback.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)

  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <div className="testimonial-avatar">{initials}</div>
        <div>
          <div className="testimonial-name">{feedback.name}</div>
          <div className="testimonial-role">{feedback.role || 'User'}</div>
        </div>
      </div>
      <div className="testimonial-text">{`"${feedback.message}"`}</div>
      <div className="testimonial-rating">
        {Array(feedback.rating || 5).fill(0).map((_, i) => (
          <i key={i} className="fas fa-star" />
        ))}
      </div>
    </div>
  )
}

// ============================================
// MODAL COMPONENT
// ============================================
function Modal({ id, isOpen, onClose, children, className = '' }) {
  if (!isOpen) return null
  return (
    <div
      id={id}
      className={`modal ${className}`}
      style={{ display: 'flex' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content">
        <span className="close" onClick={onClose} role="button" tabIndex={0} aria-label="Close modal">{'×'}</span>
        {children}
      </div>
    </div>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function Page() {
  // Modal states
  const [contactModal, setContactModal] = useState(false)
  const [inquiryModal, setInquiryModal] = useState(false)
  const [projectModal, setProjectModal] = useState(false)
  const [feedbackModal, setFeedbackModal] = useState(false)
  const [aboutModal, setAboutModal] = useState(null) // 'background'|'education'|'goals'|'interests'|null

  // Selected project for inquiry / detail
  const [selectedProject, setSelectedProject] = useState(null)
  const [inquiryProjectName, setInquiryProjectName] = useState('')

  // Feedback list
  const [feedbacks, setFeedbacks] = useState([])
  const [feedbacksLoading, setFeedbacksLoading] = useState(true)

  // Contact form
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [contactStatus, setContactStatus] = useState({ type: '', message: '' })
  const [contactSubmitting, setContactSubmitting] = useState(false)

  // Inquiry form
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', company: '', budget: '', details: '' })
  const [inquiryStatus, setInquiryStatus] = useState({ type: '', message: '' })
  const [inquirySubmitting, setInquirySubmitting] = useState(false)

  // Feedback form
  const [feedbackForm, setFeedbackForm] = useState({ name: '', email: '', role: '', rating: 0, message: '' })
  const [feedbackStatus, setFeedbackStatus] = useState({ type: '', message: '' })
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false)

  // Chat
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: "Hi there! Thanks for visiting my website. Feel free to ask me anything about programming, web development, or my experiences in tech. Let me know how I can help!" }
  ])
  const [chatInput, setChatInput] = useState('')
  const chatMessagesRef = useRef(null)

  // ============================================
  // LOAD FEEDBACKS
  // ============================================
  const loadFeedbacks = useCallback(async () => {
    setFeedbacksLoading(true)
    try {
      const res = await fetch('/api/feedback')
      if (res.ok) {
        const data = await res.json()
        setFeedbacks(data)
      } else {
        throw new Error('API unavailable')
      }
    } catch (err) {
      // Fallback to local storage if API fails
      console.warn('Using local storage for feedbacks')
      const local = JSON.parse(localStorage.getItem('portfolio_feedbacks') || '[]')
      setFeedbacks(local)
    } finally {
      setFeedbacksLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFeedbacks()
  }, [loadFeedbacks])

  // Load and initialize EmailJS SDK from CDN
  useEffect(() => {
    loadEmailJS()
  }, [])

  // Load leaflet script for map
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
    script.onload = () => {
      const mapEl = document.getElementById('map')
      if (mapEl && window.L && !mapEl._leaflet_id) {
        const map = window.L.map('map').setView([14.1995, 122.5705], 13)
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map)
        window.L.marker([14.1995, 122.5705]).addTo(map)
          .bindPopup('<b>Labo, Camarines Norte</b><br>Philippines')
          .openPopup()
      }
    }
    document.body.appendChild(script)
  }, [])

  // Scroll chat to bottom
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [chatMessages])

  // Animation Observer for scroll effects
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, { threshold: 0.1 })

    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // ============================================
  // FORM HANDLERS
  // ============================================
  const handleContactSubmit = async (e) => {
    e.preventDefault()
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setContactStatus({ type: 'error', message: 'Please fill in all required fields.' })
      return
    }
    setContactSubmitting(true)
    setContactStatus({ type: '', message: '' })

    const templateParams = {
      from_name: contactForm.name.trim(),
      from_email: contactForm.email.trim(),
      subject: `New Contact Message from ${contactForm.name.trim()}`,
      message: `Name: ${contactForm.name.trim()}\nEmail: ${contactForm.email.trim()}\nPhone: ${contactForm.phone || 'Not provided'}\n\nMessage:\n${contactForm.message.trim()}`,
      to_email: 'jailenannm@gmail.com',
      reply_to: contactForm.email.trim(),
    }

    // Try EmailJS first
    const ejs = await loadEmailJS()
    let sent = false
    if (ejs) {
      try {
        await ejs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
        sent = true
      } catch (err) {
        console.error('EmailJS send failed:', err)
      }
    }

    // Fallback to API route
    if (!sent) {
      try {
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'contact',
            name: contactForm.name.trim(),
            email: contactForm.email.trim(),
            phone: contactForm.phone || '',
            message: contactForm.message.trim(),
          })
        })
        const data = await res.json()
        if (data.success) {
          sent = true
        } else {
          setContactStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' })
          setContactSubmitting(false)
          return
        }
      } catch (apiErr) {
        console.error('API fallback also failed:', apiErr)
        setContactStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
        setContactSubmitting(false)
        return
      }
    }

    if (sent) {
      setContactStatus({ type: 'success', message: 'Message sent successfully! Thank you for reaching out.' })
      setContactForm({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => { setContactModal(false); setContactStatus({ type: '', message: '' }) }, 2500)
    }
    setContactSubmitting(false)
  }

  const handleInquirySubmit = async (e) => {
    e.preventDefault()
    if (!inquiryForm.name.trim() || !inquiryForm.email.trim() || !inquiryForm.budget || !inquiryForm.details.trim()) {
      setInquiryStatus({ type: 'error', message: 'Please fill in all required fields.' })
      return
    }
    setInquirySubmitting(true)
    setInquiryStatus({ type: '', message: '' })

    const templateParams = {
      from_name: inquiryForm.name.trim(),
      from_email: inquiryForm.email.trim(),
      subject: `New Project Inquiry from ${inquiryForm.name.trim()}`,
      message: `Name: ${inquiryForm.name.trim()}\nEmail: ${inquiryForm.email.trim()}\nCompany: ${inquiryForm.company || 'Not provided'}\nBudget: ${inquiryForm.budget}\nProject: ${inquiryProjectName || 'General Inquiry'}\n\nProject Details:\n${inquiryForm.details.trim()}`,
      to_email: 'jailenannm@gmail.com',
      reply_to: inquiryForm.email.trim(),
    }

    const ejs = await loadEmailJS()
    let sent = false
    if (ejs) {
      try {
        await ejs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
        sent = true
      } catch (err) {
        console.error('EmailJS inquiry send failed:', err)
      }
    }

    if (!sent) {
      try {
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'inquiry',
            name: inquiryForm.name.trim(),
            email: inquiryForm.email.trim(),
            company: inquiryForm.company || '',
            budget: inquiryForm.budget,
            details: inquiryForm.details.trim(),
            projectName: inquiryProjectName || 'General Inquiry',
          })
        })
        const data = await res.json()
        if (data.success) {
          sent = true
        } else {
          setInquiryStatus({ type: 'error', message: data.error || 'Failed to submit inquiry. Please try again.' })
          setInquirySubmitting(false)
          return
        }
      } catch (apiErr) {
        console.error('API fallback also failed:', apiErr)
        setInquiryStatus({ type: 'error', message: 'Failed to submit inquiry. Please try again.' })
        setInquirySubmitting(false)
        return
      }
    }

    if (sent) {
      setInquiryStatus({ type: 'success', message: 'Inquiry submitted successfully! I will review it shortly.' })
      setInquiryForm({ name: '', email: '', company: '', budget: '', details: '' })
      setTimeout(() => { setInquiryModal(false); setInquiryStatus({ type: '', message: '' }) }, 2500)
    }
    setInquirySubmitting(false)
  }

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault()
    if (!feedbackForm.name.trim() || !feedbackForm.email.trim() || !feedbackForm.rating || !feedbackForm.message.trim()) {
      setFeedbackStatus({ type: 'error', message: 'Please fill in all required fields including rating.' })
      return
    }
    setFeedbackSubmitting(true)
    setFeedbackStatus({ type: '', message: '' })
    
    const payload = {
        name: feedbackForm.name.trim(),
        email: feedbackForm.email.trim(),
        role: feedbackForm.role || 'User',
        rating: feedbackForm.rating,
        message: feedbackForm.message.trim(),
        timestamp: new Date().toISOString()
    }

    // 1. Send EmailJS Notification (Priority)
    const ejs = await loadEmailJS()
    if (ejs) {
      try {
        const templateParams = {
          from_name: payload.name,
          from_email: payload.email,
          subject: `New Feedback from ${payload.name} (${'\u2605'.repeat(payload.rating)})`,
          message: `Name: ${payload.name}\nEmail: ${payload.email}\nRole: ${payload.role}\nRating: ${'\u2605'.repeat(payload.rating)}\n\nFeedback:\n${payload.message}`,
          to_email: 'jailenannm@gmail.com',
          reply_to: payload.email,
        }
        await ejs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      } catch (emailErr) {
        console.error('EmailJS notification failed:', emailErr)
      }
    }

    // 2. Save Feedback (Try API, Fallback to LocalStorage)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('API failed')
      await loadFeedbacks()
    } catch (err) {
      // Fallback to local storage so the UI still updates for the user
      const current = JSON.parse(localStorage.getItem('portfolio_feedbacks') || '[]')
      localStorage.setItem('portfolio_feedbacks', JSON.stringify([payload, ...current]))
      setFeedbacks(prev => [payload, ...prev])
    }

    try {
      setFeedbackStatus({ type: 'success', message: 'Thank you! Your feedback has been submitted successfully.' })
      setFeedbackForm({ name: '', email: '', role: '', rating: 0, message: '' })
      setTimeout(() => { setFeedbackModal(false); setFeedbackStatus({ type: '', message: '' }) }, 2500)
    } catch (err) {
      console.error('Feedback form error:', err)
      setFeedbackStatus({ type: 'error', message: err.message || 'Failed to submit feedback. Please try again.' })
    } finally {
      setFeedbackSubmitting(false)
    }
  }

  // ============================================
  // CHAT HANDLER
  // ============================================
  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    const userMsg = chatInput.trim()
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }])
    setChatInput('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      })
      const data = await res.json()
      setChatMessages(prev => [...prev, { sender: 'bot', text: data.message || 'Sorry, I could not process that.' }])
    } catch {
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'bot', text: "Thanks for your message! I'm currently operating in offline mode, but please feel free to use the Contact form to reach me directly." }])
      }, 1000)
    }
  }

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  const openInquiry = (projectName) => {
    setInquiryProjectName(projectName)
    setInquiryModal(true)
  }

  const openProjectDetail = (projectId) => {
    setSelectedProject(projectsData[projectId])
    setProjectModal(true)
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Particle Background */}
      <div className="particle-container">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .hero-animate-title { opacity: 0; animation: slideInLeft 0.8s ease-out forwards; }
        .hero-animate-subtitle { opacity: 0; animation: fadeInUp 0.8s ease-out 0.3s forwards; }
        .hero-animate-text { opacity: 0; animation: fadeInUp 0.8s ease-out 0.6s forwards; }
        .hero-animate-btn { opacity: 0; animation: fadeInUp 0.8s ease-out 0.9s forwards; }

        .scroll-animate {
          opacity: 0;
          transform: translateY(25px);
          filter: blur(4px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out, filter 0.6s ease-out;
        }
        .scroll-animate.is-visible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
        
        /* Stagger delays */
        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-300 { transition-delay: 0.3s; }

        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .gentle-float {
          animation: gentle-float 5s ease-in-out infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .circular-text-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .circular-text {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          animation: rotate 30s linear infinite;
        }
        .circular-text span {
          position: absolute;
          left: 50%;
          top: 0;
          height: 50%;
          transform-origin: bottom center;
          font-size: 1rem;
          font-weight: 600;
          color: var(--accent-color);
          text-transform: uppercase;
        }

        /* Global Font Size Reduction */
        html {
          font-size: 82.5%; /* Sets base size to approx 13.2px */
        }

        h1 { font-size: 2.2rem !important; }
        h2 { font-size: 1.8rem !important; }
        h3 { font-size: 1.3rem !important; }
        p, li, a, button, input, textarea, select { font-size: 0.95rem; }
        
        .hero-text h1 { font-size: 2.8rem !important; }
        .subtitle { font-size: 1.1rem !important; }
        .intro-text { font-size: 1rem !important; }
        
        .nav-link { font-size: 0.9rem !important; }
        .btn { font-size: 0.9rem !important; }

        /* Skills Section Specific Font Increase */
        .skills h2 { font-size: 2.5rem !important; }
        .skills .card-category { font-size: 1.8rem !important; }
        .skills .card-description { font-size: 1.2rem !important; }
      `}} />

      {/* Navigation Header */}
      <header className="navbar" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
        <nav className="nav-container">
          <div className="nav-logo" style={{ cursor: 'pointer' }}>
            <i className="fas fa-code"></i> JAI DEV
          </div>
          <ul className="nav-menu">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#skills" className="nav-link">Skills</a></li>
            <li><a href="#projects" className="nav-link">Projects</a></li>
            <li><a href="#testimonials" className="nav-link">Feedback</a></li>
          </ul>
        </nav>
      </header>

      {/* ============================================ */}
      {/* HOME SECTION */}
      {/* ============================================ */}
      <section id="home" className="section hero">
        <div className="container">
          <div className="hero-wrapper">
            <div className="hero-text">
              <h1 className="hero-animate-title"><span className="typing-text">{"Hello! I'm "}<span className="gradient-text">Jailen Ann</span></span></h1>
              <p className="subtitle hero-animate-subtitle">Bachelor of Science in Information Technology</p>
              <p className="intro-text hero-animate-text">Specializing in Full-Stack Development, Database Management, and UI/UX Design. Passionate about building innovative solutions.</p>
              <div className="cta-buttons hero-animate-btn">
                <button className="btn btn-primary" onClick={() => scrollTo('projects')}>View My Work</button>
                <button className="btn btn-secondary" onClick={() => setContactModal(true)}>Get In Touch</button>
              </div>
            </div>
            <div className="hero-image gentle-float">
              <div className="circular-text-wrapper">
                <div className="circular-text">
                  {"• HIRE ME • FULL-STACK DEVELOPER • UI/UX DESIGNER ".split('').map((char, i) => (
                    <span key={i} style={{ transform: `rotate(${i * 7.5}deg)` }}>{char}</span>
                  ))}
                </div>
                <div className="profile-3d-container noselect">
                  <div className="canvas-3d">
                    <div className="tracker tr-1"></div>
                    <div className="tracker tr-2"></div>
                    <div className="tracker tr-3"></div>
                    <div className="tracker tr-4"></div>
                    <div className="tracker tr-5"></div>
                    <div className="tracker tr-6"></div>
                    <div className="tracker tr-7"></div>
                    <div className="tracker tr-8"></div>
                    <div className="tracker tr-9"></div>
                    <div id="profile-card">
                      <div className="card-content">
                        <div className="card-glare"></div>
                        <div className="cyber-lines">
                          <span></span><span></span><span></span><span></span>
                        </div>
                        <img id="profileImage" src="/profile.jpg" alt="Profile Picture of Jailen Ann A. Mostoles" className="profile-img-3d" />
                        <div className="glowing-elements">
                          <div className="glow-1"></div>
                          <div className="glow-2"></div>
                          <div className="glow-3"></div>
                        </div>
                        <div className="card-particles">
                          <span></span><span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <div className="corner-elements">
                          <span></span><span></span><span></span><span></span>
                        </div>
                        <div className="scan-line"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="profile-name">Jailen Ann A. Mostoles</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ABOUT SECTION */}
      {/* ============================================ */}
      <section id="about" className="section about">
        <div className="container">
          <h2 className="scroll-animate">About Me</h2>
          <div className="about-grid">
            {[
              { type: 'background', icon: 'fa-user', title: 'Background', desc: '20-year-old BSIT student from Camarines Norte State College. Born and raised in Labo, with a passion for technology and continuous learning.' },
              { type: 'education', icon: 'fa-graduation-cap', title: 'Education', desc: 'Completed elementary with honors and graduated high school with honors. Currently pursuing Bachelor of Science in Information Technology.' },
              { type: 'goals', icon: 'fa-bullseye', title: 'Career Goals', desc: 'Aspire to become a professional full-stack developer and Database Specialist. Passionate about solving real-world problems through technology.' },
              { type: 'interests', icon: 'fa-star', title: 'Interests', desc: 'Web Development, Database Design, System Development, UI/UX Design, and Software Engineering. Always eager to learn new technologies.' },
            ].map((item, i) => (
              <div key={item.type} className={`about-card clickable-card scroll-animate delay-${(i % 4) * 100}`} onClick={() => setAboutModal(item.type)} style={{ cursor: 'pointer' }}>
                <div className="card-icon"><i className={`fas ${item.icon}`}></i></div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="card-link">{"Learn More →"}</span>
              </div>
            ))}
          </div>

          <div className="about-content">
            <div className="location-section">
              <h3 className="scroll-animate">{"Location & Connect"}</h3>
              <div id="map" className="map-container"></div>
              <p className="location-info">Labo, Camarines Norte, Philippines</p>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/jailen-ann-a-mostoles-b3b2b22a9/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/jailenannm-web" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://x.com/leneeeiee_" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SKILLS SECTION */}
      {/* ============================================ */}
      <section id="skills" className="section skills">
        <div className="container">
          <h2 className="scroll-animate">{"Skills & Technologies"}</h2>
          <div className="skills-grid">
            {[
              { title: 'FRONTEND', desc: 'HTML - CSS - JavaScript - React - Building responsive and interactive UIs' },
              { title: 'BACKEND', desc: 'PHP - MySQL - Supabase - Server-side development and database management' },
              { title: 'TOOLS', desc: 'Git - GitHub - Figma - VS Code - Development tools and version control systems' },
            ].map((skill, i) => (
              <div key={skill.title} className={`skill-parent scroll-animate delay-${i * 100}`}>
                <div className="skill-card">
                  <div className="glass"></div>
                  <div className="card-content">
                    <h3 className="card-category">{skill.title}</h3>
                    <p className="card-description">{skill.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PROJECTS SECTION */}
      {/* ============================================ */}
      <section id="projects" className="section projects">
        <div className="container">
          <h2 className="scroll-animate">Featured Projects</h2>
          <div className="projects-grid">
            {[
              { id: 'sonder', icon: 'fa-heart', title: 'Sonder - Mental Health Awareness Website', desc: 'A comprehensive mental health awareness platform designed to provide resources, support, and education on mental wellness.', tech: ['React', 'Node.js', 'MongoDB'] },
              { id: 'escpms', icon: 'fa-building', title: 'Sta. Cruz Elementary School Property Custodian Management System', desc: 'A specialized management system for tracking school property, maintenance schedules, and custodial tasks.', tech: ['PHP', 'MySQL', 'Laravel'] },
              { id: 'cnscpos', icon: 'fa-cash-register', title: 'CNSC Auxiliary - Local Only Point of Sale System', desc: 'A local point-of-sale system designed for CNSC Auxiliary operations with inventory management and transaction processing.', tech: ['Python', 'SQLite', 'Tkinter'] },
            ].map((project, i) => (
              <div key={project.id} className={`project-card scroll-animate delay-${i * 100}`} onClick={() => openProjectDetail(project.id)} style={{ cursor: 'pointer' }}>
                <div className="project-img"><i className={`fas ${project.icon}`}></i></div>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="project-tech">
                  {project.tech.map(t => <span key={t}>{t}</span>)}
                </div>
                <button
                  className="btn btn-small"
                  onClick={(e) => { e.stopPropagation(); openInquiry(project.title) }}
                  type="button"
                >
                  Inquire
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS & FEEDBACK SECTION */}
      {/* ============================================ */}
      <section id="testimonials" className="section testimonials">
        <div className="container">
          <h2>{"Testimonials & Feedback"}</h2>
          <div className="feedback-action">
            <button className="btn btn-primary" onClick={() => setFeedbackModal(true)} type="button">Share Your Feedback</button>
          </div>
          <div className="testimonials-grid" id="testimonialsGrid">
            {feedbacksLoading ? (
              <div className="loading-message">Loading testimonials...</div>
            ) : feedbacks.length > 0 ? (
              feedbacks.map((fb, i) => <FeedbackCard key={fb.id || i} feedback={fb} />)
            ) : (
              <div className="loading-message">No testimonials yet. Be the first to share your feedback!</div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CONTACT MODAL */}
      {/* ============================================ */}
      <Modal id="contactModal" isOpen={contactModal} onClose={() => { setContactModal(false); setContactStatus({ type: '', message: '' }) }}>
        <h2>Get In Touch</h2>
        <form onSubmit={handleContactSubmit}>
          <div className="form-group">
            <label htmlFor="contactName">{"Full Name *"}</label>
            <input type="text" id="contactName" placeholder="Your name" required value={contactForm.name} onChange={(e) => setContactForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="form-group">
            <label htmlFor="contactEmail">{"Email Address *"}</label>
            <input type="email" id="contactEmail" placeholder="Your email" required value={contactForm.email} onChange={(e) => setContactForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="form-group">
            <label htmlFor="contactPhone">Phone (Optional)</label>
            <input type="tel" id="contactPhone" placeholder="Your phone" value={contactForm.phone} onChange={(e) => setContactForm(f => ({ ...f, phone: e.target.value }))} />
          </div>
          <div className="form-group">
            <label htmlFor="contactMessage">{"Message *"}</label>
            <textarea id="contactMessage" placeholder="Your message" rows={5} required value={contactForm.message} onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={contactSubmitting} style={{ width: '100%', opacity: contactSubmitting ? 0.7 : 1 }}>
            {contactSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        {contactStatus.message && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            borderRadius: '8px',
            borderLeft: `4px solid ${contactStatus.type === 'success' ? '#ff8c00' : '#ff6600'}`,
            background: contactStatus.type === 'success' ? 'rgba(255,140,0,0.1)' : 'rgba(255,102,0,0.1)',
            color: contactStatus.type === 'success' ? '#ff8c00' : '#ff6600',
          }}>
            {contactStatus.type === 'success' ? '✓ ' : '✗ '}{contactStatus.message}
          </div>
        )}
      </Modal>

      {/* ============================================ */}
      {/* INQUIRY MODAL */}
      {/* ============================================ */}
      <Modal id="inquiryModal" isOpen={inquiryModal} onClose={() => { setInquiryModal(false); setInquiryStatus({ type: '', message: '' }) }}>
        <h2>Project Inquiry</h2>
        {inquiryProjectName && <p className="inquiry-project">{"Inquiring about: "}{inquiryProjectName}</p>}
        <form onSubmit={handleInquirySubmit}>
          <div className="form-group">
            <label htmlFor="inquiryName">{"Full Name *"}</label>
            <input type="text" id="inquiryName" placeholder="Your name" required value={inquiryForm.name} onChange={(e) => setInquiryForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="form-group">
            <label htmlFor="inquiryEmail">{"Email Address *"}</label>
            <input type="email" id="inquiryEmail" placeholder="Your email" required value={inquiryForm.email} onChange={(e) => setInquiryForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="form-group">
            <label htmlFor="inquiryCompany">Company/Organization</label>
            <input type="text" id="inquiryCompany" placeholder="Company name" value={inquiryForm.company} onChange={(e) => setInquiryForm(f => ({ ...f, company: e.target.value }))} />
          </div>
          <div className="form-group">
            <label htmlFor="inquiryBudget">{"Budget Range *"}</label>
            <select id="inquiryBudget" required value={inquiryForm.budget} onChange={(e) => setInquiryForm(f => ({ ...f, budget: e.target.value }))}>
              <option value="">Select budget range</option>
              <option value="Under $1,000">{"Under $1,000"}</option>
              <option value="$1,000 - $5,000">{"$1,000 - $5,000"}</option>
              <option value="$5,000 - $10,000">{"$5,000 - $10,000"}</option>
              <option value="Above $10,000">{"Above $10,000"}</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="inquiryDetails">{"Project Details *"}</label>
            <textarea id="inquiryDetails" placeholder="Tell me about your project" rows={5} required value={inquiryForm.details} onChange={(e) => setInquiryForm(f => ({ ...f, details: e.target.value }))} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={inquirySubmitting} style={{ width: '100%', opacity: inquirySubmitting ? 0.7 : 1 }}>
            {inquirySubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </form>
        {inquiryStatus.message && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            borderRadius: '8px',
            borderLeft: `4px solid ${inquiryStatus.type === 'success' ? '#ff8c00' : '#ff6600'}`,
            background: inquiryStatus.type === 'success' ? 'rgba(255,140,0,0.1)' : 'rgba(255,102,0,0.1)',
            color: inquiryStatus.type === 'success' ? '#ff8c00' : '#ff6600',
          }}>
            {inquiryStatus.type === 'success' ? '✓ ' : '✗ '}{inquiryStatus.message}
          </div>
        )}
      </Modal>

      {/* ============================================ */}
      {/* PROJECT DETAIL MODAL */}
      {/* ============================================ */}
      <Modal id="projectModal" isOpen={projectModal} onClose={() => setProjectModal(false)} className="project-modal">
        {selectedProject && (
          <div className="project-detail-container">
            <div className="project-detail-info">
              <h2>{selectedProject.title}</h2>
              <p className="project-detail-description">{selectedProject.description}</p>
              <p>{selectedProject.fullDescription}</p>
              <div className="project-detail-tech">
                <h4>Technologies Used:</h4>
                <div className="tech-list">
                  {selectedProject.technologies.map(t => <span key={t} className="tech-badge">{t}</span>)}
                </div>
              </div>
              <div className="project-detail-features">
                <h4>Key Features:</h4>
                <ul>
                  {selectedProject.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
              <button className="btn btn-primary" onClick={() => { setProjectModal(false); openInquiry(selectedProject.title) }} type="button">
                Request More Info
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ============================================ */}
      {/* FEEDBACK MODAL */}
      {/* ============================================ */}
      <Modal id="feedbackModal" isOpen={feedbackModal} onClose={() => { setFeedbackModal(false); setFeedbackStatus({ type: '', message: '' }) }} className="feedback-modal">
        <h2>Share Your Feedback</h2>
        <form onSubmit={handleFeedbackSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="feedbackName">{"Your Name *"}</label>
            <input type="text" id="feedbackName" placeholder="Enter your name" required value={feedbackForm.name} onChange={(e) => setFeedbackForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="form-group">
            <label htmlFor="feedbackEmail">{"Your Email *"}</label>
            <input type="email" id="feedbackEmail" placeholder="Enter your email" required value={feedbackForm.email} onChange={(e) => setFeedbackForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="form-group">
            <label htmlFor="feedbackRole">Your Role</label>
            <select id="feedbackRole" value={feedbackForm.role} onChange={(e) => setFeedbackForm(f => ({ ...f, role: e.target.value }))}>
              <option value="">Select a role</option>
              <option value="Client">Client</option>
              <option value="Colleague">Colleague</option>
              <option value="Mentor">Mentor</option>
              <option value="Friend">Friend</option>
              <option value="Team Member">Team Member</option>
              <option value="Manager">Manager</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>{"Rating *"}</label>
            <StarRating rating={feedbackForm.rating} setRating={(r) => setFeedbackForm(f => ({ ...f, rating: r }))} />
          </div>
          <div className="form-group">
            <label htmlFor="feedbackMessage">{"Your Feedback *"}</label>
            <textarea id="feedbackMessage" placeholder="Share your thoughts and feedback..." rows={5} required value={feedbackForm.message} onChange={(e) => setFeedbackForm(f => ({ ...f, message: e.target.value }))} />
          </div>
          {feedbackStatus.message && (
            <div className={`feedback-status ${feedbackStatus.type}`} style={{
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              color: feedbackStatus.type === 'success' ? '#ff8c00' : '#ff6600',
              background: feedbackStatus.type === 'success' ? 'rgba(255,140,0,0.1)' : 'rgba(255,102,0,0.1)',
            }}>
              {feedbackStatus.message}
            </div>
          )}
          <button type="submit" className="btn btn-primary" disabled={feedbackSubmitting} style={{ width: '100%', opacity: feedbackSubmitting ? 0.7 : 1 }}>
            {feedbackSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </Modal>

      {/* ============================================ */}
      {/* ABOUT DETAIL MODALS */}
      {/* ============================================ */}
      <Modal id="backgroundModal" isOpen={aboutModal === 'background'} onClose={() => setAboutModal(null)}>
        <h2>My Background</h2>
        <div className="about-detail-content">
          <p>{"I am a 20-year-old Bachelor of Science in Information Technology student at "}<strong>Camarines Norte State College</strong>{", currently in my 2nd year of study. Born and raised in "}<strong>Labo, Camarines Norte, Philippines</strong>{", I have always had a deep passion for technology and continuous learning."}</p>
          <p>My journey in technology started at a young age, and I have consistently pushed myself to excel in my academic pursuits.</p>
          <p>Beyond academics, I am driven by a desire to create meaningful solutions that can positively impact people's lives.</p>
        </div>
      </Modal>

      <Modal id="educationModal" isOpen={aboutModal === 'education'} onClose={() => setAboutModal(null)}>
        <h2>My Education</h2>
        <div className="about-detail-content">
          {[
            { level: 'Primary Education', school: 'Labo Elementary School', ach: 'Graduated with Honors' },
            { level: 'Junior High School', school: 'Labo Science and Technology High School', ach: 'Graduated with Honors' },
            { level: 'Senior High School', school: 'Labo Science and Technology High School', ach: 'Graduated with High Honors' },
            { level: 'Tertiary Education - Present', school: 'Camarines Norte State College', ach: '2nd Year BSIT Student' },
          ].map((edu, i) => (
            <div key={i} className="education-item">
              <h3>{edu.level}</h3>
              <p><strong>{edu.school}</strong></p>
              <p className="achievement">{edu.ach}</p>
            </div>
          ))}
        </div>
      </Modal>

      <Modal id="goalsModal" isOpen={aboutModal === 'goals'} onClose={() => setAboutModal(null)}>
        <h2>Career Goals</h2>
        <div className="about-detail-content">
          <h3>Short-term Goals (1-2 years)</h3>
          <ul className="goals-list">
            <li>Master full-stack web development with React and Node.js</li>
            <li>Complete my BSIT degree with strong academic performance</li>
            <li>{"Build 5+ portfolio projects demonstrating advanced skills"}</li>
            <li>Contribute meaningfully to open-source projects</li>
          </ul>
          <h3>{"Long-term Goals (5+ years)"}</h3>
          <ul className="goals-list">
            <li>{"Become a professional Full-Stack Developer"}</li>
            <li>{"Develop expertise as a Database Specialist"}</li>
            <li>Lead development teams and mentor junior developers</li>
            <li>{"Build and launch my own tech products/startups"}</li>
          </ul>
        </div>
      </Modal>

      <Modal id="interestsModal" isOpen={aboutModal === 'interests'} onClose={() => setAboutModal(null)}>
        <h2>My Interests</h2>
        <div className="about-detail-content">
          {[
            { icon: 'fa-code', title: 'Web Development', desc: 'I love building responsive, interactive web applications using modern technologies.' },
            { icon: 'fa-database', title: 'Database Design & Management', desc: 'I enjoy designing efficient database schemas and optimizing queries.' },
            { icon: 'fa-pencil-ruler', title: 'UI/UX Design', desc: 'I have a strong interest in user interface and user experience design.' },
            { icon: 'fa-film', title: 'Editing, Layout & Filming', desc: 'Beyond coding, I am passionate about visual content creation.' },
            { icon: 'fa-palette', title: 'System Development', desc: 'I am fascinated by the architecture and design of complex systems.' },
          ].map((item, i) => (
            <div key={i} className="interest-category">
              <h3><i className={`fas ${item.icon}`}></i> {item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </Modal>

      {/* ============================================ */}
      {/* CHATBOT */}
      {/* ============================================ */}
      {chatOpen && (
        <div id="chatbot" className="chatbot-container" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
          <div className="chatbot-header" onClick={() => setChatOpen(false)} style={{ cursor: 'pointer' }}>
            <div className="chatbot-avatar">
              <span className="status-dot"></span>
            </div>
            <div className="chatbot-header-info">
              <h3>Chat with Jai</h3>
              <p className="status-text">Online</p>
            </div>
            <button className="chatbot-close" onClick={(e) => { e.stopPropagation(); setChatOpen(false) }} type="button" aria-label="Close chat">{'×'}</button>
          </div>
          <div className="chatbot-messages" id="chatMessages" ref={chatMessagesRef}>
            {chatMessages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}>
                {msg.sender === 'bot' && <div className="message-avatar">J</div>}
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="chatbot-input-area">
            <div className="help-text">Ask me about programming, web dev, or tech!</div>
            <form className="chatbot-form" onSubmit={handleChatSubmit}>
              <input
                type="text"
                className="chatbot-input"
                placeholder="Type a message..."
                autoComplete="off"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="chatbot-send">{"→"}</button>
            </form>
          </div>
        </div>
      )}

      <button
        id="chatbotToggle"
        className="chatbot-toggle"
        onClick={() => setChatOpen(prev => !prev)}
        title="Chat with Jai"
        type="button"
        style={{ display: chatOpen ? 'none' : 'flex', position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}
      >
        <span className="chat-icon">{"💬"}</span>
      </button>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Jailen Ann A. Mostoles</h4>
              <p>BSIT Student, Camarines Norte State College</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="footer-socials">
                <a href="https://www.linkedin.com/in/jailen-ann-a-mostoles-b3b2b22a9/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                <a href="https://github.com/jailenannm-web" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
                <a href="https://x.com/leneeeiee_" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Location</h4>
              <p>{"Labo, Camarines Norte"}<br />Philippines</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{"© 2024 Jailen Ann A. Mostoles. All rights reserved."}</p>
          </div>
        </div>
      </footer>
    </>
  )
}
