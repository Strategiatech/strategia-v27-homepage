'use client'

import { useState, useEffect } from 'react'

export default function V3Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="v3-nav"
      style={scrolled ? { background: 'rgba(10,10,10,0.82)' } : undefined}
    >
      <a href="#top" className="logo-lockup">
        <svg className="logo-triangle" viewBox="0 0 28 24" fill="none">
          <path
            d="M14 2L26 22H2L14 2Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        <span className="logo-wordmark">Strategia</span>
      </a>

      <ul className="v3-nav-links">
        <li><a href="#method">Platform</a></li>
        <li><a href="#science">Science</a></li>
        <li><a href="#solutions">Solutions</a></li>
        <li><a href="#enterprise">Enterprise</a></li>
        <li><a href="#contact">About</a></li>
      </ul>

      <a href="#contact" className="v3-nav-cta">
        <span>Request Briefing</span>
      </a>
    </nav>
  )
}
