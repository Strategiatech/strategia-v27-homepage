'use client'

import { useEffect, useRef, useState } from 'react'

interface DataStream {
  id: string
  label: string
  color: string
  points: number[]
}

const DATA_STREAMS: DataStream[] = [
  { id: 'behavioral', label: 'Behavioral', color: '#13B5B1', points: [0.7, 0.4, 0.9, 0.6, 0.3, 0.8, 0.5] },
  { id: 'contextual', label: 'Contextual', color: '#F5E54D', points: [0.3, 0.8, 0.5, 0.9, 0.7, 0.4, 0.6] },
  { id: 'structural', label: 'Structural', color: '#06293E', points: [0.9, 0.3, 0.7, 0.4, 0.8, 0.6, 0.5] },
]

const PLATFORM_MODULES = [
  { title: 'Intelligent Assessment', desc: 'AI-powered psychometric evaluation that goes beyond surface-level skills matching.', icon: '◆' },
  { title: 'Workforce Mapping', desc: 'Visualize your entire talent ecosystem with predictive gap analysis.', icon: '◈' },
  { title: 'Retention Signals', desc: 'Machine learning models that predict turnover risk 12+ months in advance.', icon: '◉' },
  { title: 'Bias Elimination', desc: 'Algorithmic fairness engine ensures equitable hiring decisions at scale.', icon: '◎' },
]

const OUTCOMES = [
  { value: '80%', label: 'Reduction in HR Workflow Time', delta: '+12%' },
  { value: '<24h', label: 'Time to Shortlist Qualified Candidates', delta: '-68%' },
  { value: '100%', label: 'Psychometric Coverage Across Roles', delta: 'Complete' },
  { value: '342', label: 'Active Intelligence Queries Daily', delta: 'Growing' },
]

export default function V8HeroShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [converged, setConverged] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let w = 0, h = 0
    let time = 0

    const resize = () => {
      w = canvas.parentElement?.clientWidth || window.innerWidth
      h = canvas.parentElement?.clientHeight || window.innerHeight
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      time += 0.016

      const convergenceProgress = Math.min(scrollY / 600, 1)
      const centerX = w / 2
      const centerY = h / 2
      const triangleSize = Math.min(w, h) * 0.15

      // Draw data streams
      DATA_STREAMS.forEach((stream, idx) => {
        const angle = (idx / 3) * Math.PI * 2 - Math.PI / 2
        const startX = centerX + Math.cos(angle) * Math.max(w, h) * 0.4
        const startY = centerY + Math.sin(angle) * Math.max(w, h) * 0.4

        const endX = centerX + Math.cos(angle) * triangleSize * (1 - convergenceProgress * 0.7)
        const endY = centerY + Math.sin(angle) * triangleSize * (1 - convergenceProgress * 0.7)

        // Stream line
        ctx.beginPath()
        ctx.moveTo(startX, startY)

        const cp1x = startX + (endX - startX) * 0.3 + Math.sin(time * 2 + idx) * 30
        const cp1y = startY + (endY - startY) * 0.3 + Math.cos(time * 1.5 + idx) * 30
        const cp2x = startX + (endX - startX) * 0.6 + Math.cos(time * 1.8 + idx) * 25
        const cp2y = startY + (endY - startY) * 0.6 + Math.sin(time * 2.2 + idx) * 25

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY)
        ctx.strokeStyle = stream.color
        ctx.lineWidth = 2 + convergenceProgress * 3
        ctx.globalAlpha = 0.3 + convergenceProgress * 0.4
        ctx.stroke()

        // Data points along stream
        for (let i = 0; i < stream.points.length; i++) {
          const t = (i / stream.points.length + time * 0.1) % 1
          const px = (1 - t) ** 3 * startX + 3 * (1 - t) ** 2 * t * cp1x + 3 * (1 - t) * t ** 2 * cp2x + t ** 3 * endX
          const py = (1 - t) ** 3 * startY + 3 * (1 - t) ** 2 * t * cp1y + 3 * (1 - t) * t ** 2 * cp2y + t ** 3 * endY

          ctx.beginPath()
          ctx.arc(px, py, 3 + stream.points[i] * 4, 0, Math.PI * 2)
          ctx.fillStyle = stream.color
          ctx.globalAlpha = 0.4 + stream.points[i] * 0.4
          ctx.fill()
        }

        // Mouse interaction glow
        const distToMouse = Math.sqrt((endX - mousePos.x) ** 2 + (endY - mousePos.y) ** 2)
        if (distToMouse < 150) {
          const glowR = 150 - distToMouse
          const gradient = ctx.createRadialGradient(endX, endY, 0, endX, endY, glowR)
          gradient.addColorStop(0, stream.color + '40')
          gradient.addColorStop(1, stream.color + '00')
          ctx.fillStyle = gradient
          ctx.globalAlpha = 0.5
          ctx.fillRect(endX - glowR, endY - glowR, glowR * 2, glowR * 2)
        }
      })

      // Convergence triangle
      if (convergenceProgress > 0.3) {
        const triAlpha = (convergenceProgress - 0.3) / 0.7
        ctx.globalAlpha = triAlpha
        ctx.beginPath()

        const vertices = []
        for (let i = 0; i < 3; i++) {
          const angle = (i / 3) * Math.PI * 2 - Math.PI / 2
          vertices.push({
            x: centerX + Math.cos(angle) * triangleSize,
            y: centerY + Math.sin(angle) * triangleSize,
          })
        }

        ctx.moveTo(vertices[0].x, vertices[0].y)
        ctx.lineTo(vertices[1].x, vertices[1].y)
        ctx.lineTo(vertices[2].x, vertices[2].y)
        ctx.closePath()

        // Triangle fill gradient
        const triGrad = ctx.createLinearGradient(vertices[0].x, vertices[0].y, centerX, centerY)
        triGrad.addColorStop(0, '#13B5B1' + Math.round(triAlpha * 40).toString(16).padStart(2, '0'))
        triGrad.addColorStop(0.5, '#06293E' + Math.round(triAlpha * 30).toString(16).padStart(2, '0'))
        triGrad.addColorStop(1, '#F5E54D' + Math.round(triAlpha * 20).toString(16).padStart(2, '0'))
        ctx.fillStyle = triGrad
        ctx.fill()

        ctx.strokeStyle = '#13B5B1'
        ctx.lineWidth = 2
        ctx.stroke()

        // Center glow
        const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, triangleSize * 0.5)
        centerGlow.addColorStop(0, '#13B5B1' + Math.round(triAlpha * 60).toString(16).padStart(2, '0'))
        centerGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = centerGlow
        ctx.globalAlpha = 1
        ctx.fillRect(centerX - triangleSize * 0.5, centerY - triangleSize * 0.5, triangleSize, triangleSize)
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [scrollY, mousePos])

  return (
    <div className="v8-page">
      {/* Navigation */}
      <nav className="v8-nav">
        <a href="#" className="v8-logo">
          <svg viewBox="0 0 28 24" className="v8-logo-icon">
            <polygon points="14,2 26,22 2,22" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="v8-logo-text">Strategia</span>
        </a>
        <ul className="v8-nav-links">
          <li><a href="#platform">Platform</a></li>
          <li><a href="#outcomes">Outcomes</a></li>
          <li><a href="#science">Science</a></li>
          <li><a href="#enterprise">Enterprise</a></li>
        </ul>
        <a href="#" className="v8-cta">Request Briefing</a>
      </nav>

      {/* Hero Section */}
      <section className="v8-hero">
        <canvas ref={canvasRef} className="v8-canvas" />

        <div className="v8-hero-content">
          <div className="v8-eyebrow">
            <span className="v8-eyebrow-dot" />
            AI-Native Workforce Intelligence
          </div>
          <h1 className="v8-headline">
            Intelligence that mirrors<br />
            <span className="v8-accent">how decisions are made.</span>
          </h1>
          <p className="v8-subtitle">
            Strategia triangulates behavioral, contextual, and structural data to eliminate execution risk where it matters most — the hiring decision.
          </p>
          <div className="v8-ctas">
            <a href="#" className="v8-btn-primary">Request Executive Briefing →</a>
            <a href="#" className="v8-btn-secondary">Explore Platform</a>
          </div>
        </div>

        <div className="v8-scroll-indicator">
          <span>Scroll to converge</span>
          <div className="v8-scroll-line" />
        </div>
      </section>

      {/* Platform Modules - Bento Grid */}
      <section id="platform" className="v8-section v8-platform">
        <div className="v8-section-header">
          <div className="v8-section-eyebrow">Platform Modules</div>
          <h2 className="v8-section-title">Four pillars of workforce intelligence</h2>
        </div>
        <div className="v8-bento-grid">
          {PLATFORM_MODULES.map((module, i) => (
            <div key={i} className={`v8-bento-card v8-bento-${i}`}>
              <div className="v8-bento-icon">{module.icon}</div>
              <h3 className="v8-bento-title">{module.title}</h3>
              <p className="v8-bento-desc">{module.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Outcomes - Horizontal Stats */}
      <section id="outcomes" className="v8-section v8-outcomes">
        <div className="v8-section-header">
          <div className="v8-section-eyebrow">Proven Impact</div>
          <h2 className="v8-section-title">Measurable outcomes at scale</h2>
        </div>
        <div className="v8-stats-row">
          {OUTCOMES.map((stat, i) => (
            <div key={i} className="v8-stat-card">
              <div className="v8-stat-value">{stat.value}</div>
              <div className="v8-stat-label">{stat.label}</div>
              <div className="v8-stat-delta">{stat.delta}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="v8-section v8-cta-section">
        <div className="v8-cta-content">
          <h2 className="v8-cta-title">Ready to eliminate hiring risk?</h2>
          <p className="v8-cta-desc">Join enterprise healthcare operators who trust Strategia for critical workforce decisions.</p>
          <div className="v8-cta-buttons">
            <a href="#" className="v8-btn-primary v8-btn-large">Request Executive Briefing</a>
            <a href="#" className="v8-btn-secondary v8-btn-large">Schedule Demo</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="v8-footer">
        <div className="v8-footer-content">
          <div className="v8-footer-brand">
            <svg viewBox="0 0 28 24" className="v8-footer-logo">
              <polygon points="14,2 26,22 2,22" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>Strategia Intelligence Systems</span>
          </div>
          <div className="v8-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
          <div className="v8-footer-copy">© 2026 Strategia. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
