'use client'

import { useEffect, useState } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Announce bar ── */}
      <div className="topbar">
        <div className="container">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--signal)',
                animation: 'pulseDot 2s infinite',
                flexShrink: 0,
              }}
            />
            Strategia Intelligence Engine v2.0 Live
          </span>
        </div>
      </div>

      {/* ── Sticky nav ── */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            {/* Logo */}
            <a href="/" className="logo">
              <img
                src="/images/logos/STRATEGIA_INLINE_NAVY.svg"
                alt="Strategia"
                style={{ height: 24, width: 'auto' }}
              />
            </a>

            {/* Center links */}
            <div className="nav-links">
              <a className="nav-link" href="#">
                Platform
                <svg className="chev" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a className="nav-link" href="#">
                Science
              </a>
              <a className="nav-link" href="#">
                Solutions
                <svg className="chev" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a className="nav-link" href="#">Enterprise</a>
              <a className="nav-link" href="#">Our Process</a>
            </div>

            {/* Right CTA */}
            <div className="nav-cta">
              <a className="nav-signin" href="#">Sign in</a>
              <a className="btn btn-primary btn-sm" href="#">Request Demo</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
