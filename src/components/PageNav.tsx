'use client'

import { useState, useEffect } from 'react'
import './PageNav.css'

const earlyPages = [
  { href: '/', label: 'Home', tag: 'v1' },
  { href: '/v2', label: 'V2', tag: 'v2' },
  { href: '/v3', label: 'V3', tag: 'v3' },
  { href: '/v4', label: 'V4', tag: 'v4' },
  { href: '/v5', label: 'V5', tag: 'v5' },
  { href: '/v6', label: 'V6', tag: 'v6' },
  { href: '/v7', label: 'V7', tag: 'v7' },
  { href: '/v8', label: 'V8', tag: 'v8' },
  { href: '/v9', label: 'V9 — Light & Open', tag: 'v9' },
  { href: '/v10', label: 'V10 — Tetrahedron Premium', tag: 'v10' },
  { href: '/v11', label: 'V11 — Blue Glow Variant', tag: 'v11' },
  { href: '/v12', label: 'V12 — Refined Contrast', tag: 'v12' },
  { href: '/v13', label: 'V13 — Dark Theme', tag: 'v13' },
  { href: '/v14', label: 'V14 — Light Inverted', tag: 'v14' },
  { href: '/v15', label: 'V15 — Page-wide Pulses', tag: 'v15' },
  { href: '/v16', label: 'V16 — Pulses Behind', tag: 'v16' },
  { href: '/v17', label: 'V17 — Brand V2 Teal', tag: 'v17' },
  { href: '/v18', label: 'V18 — Enhanced Teal Gradients', tag: 'v18' },
  { href: '/v19', label: 'V19 — WCAG Contrast Fix', tag: 'v19' },
  { href: '/brand', label: 'Brand Guidelines', tag: 'brand' },
  { href: '/brand-v2', label: 'Brand Guidelines V2', tag: 'brand-v2' },
  { href: '/brand-v3', label: 'Brand V3 — Teal Aurora', tag: 'brand-v3' },
]

const pages = [
  { href: '/v20', label: 'V20 — Dark Blue Gradient', tag: 'v20' },
  { href: '/v21', label: 'V21 — V20 Refinements', tag: 'v21' },
  { href: '/v22', label: 'V22 — WCAG AA Contrast Pass', tag: 'v22' },
  { href: '/v23', label: 'V23 — Brand-Deck Feedback', tag: 'v23' },
  { href: '/v24', label: 'V24 — V23 Refinements', tag: 'v24' },
  { href: '/v25', label: 'V25 — Triangulate Rework', tag: 'v25' },
  { href: '/v26', label: 'V26 — Triangulate Layout Variants', tag: 'v26' },
  { href: '/v27', label: 'V27 — Three-Pillar Content Rewrite', tag: 'v27' },
  { href: '/vx-hero-concepts', label: 'VX — Hero Video Concepts', tag: 'vx-hero' },
]

const resources = [
  { href: '/brand-v4', label: 'Brand V4 — Dark Depth', tag: 'brand-v4' },
  { href: '/brand-assets', label: 'Brand Assets', tag: 'assets' },
]

function NavList({ items, current }: { items: { href: string; label: string; tag: string }[]; current: string }) {
  return (
    <ul className="pnav-list">
      {items.map((p) => (
        <li key={p.href}>
          <a
            href={p.href}
            className={`pnav-link ${current === p.href ? 'pnav-link--active' : ''}`}
          >
            <span className="pnav-link-tag">{p.tag}</span>
            <span>{p.label}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function PageNav() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('')
  const [earlyOpen, setEarlyOpen] = useState(false)

  useEffect(() => {
    const path = window.location.pathname
    setCurrent(path)
    if (earlyPages.some(p => p.href === path)) {
      setEarlyOpen(true)
    }
  }, [])

  return (
    <>
      <button
        className="pnav-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle page navigation"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 250ms' }}>
          <path d="M4 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'none' : 'rotate(-90deg)', transformOrigin: 'center', transition: 'transform 250ms' }} />
        </svg>
        <span className="pnav-toggle-label">Pages</span>
      </button>

      <nav className={`pnav ${open ? 'pnav--open' : ''}`}>
        <div className="pnav-header">
          <span className="pnav-title">Site Pages</span>
          <button className="pnav-close" onClick={() => setOpen(false)} aria-label="Close navigation">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="pnav-group-label">Landing Pages</div>
        <NavList items={pages} current={current} />

        <button
          className={`pnav-accordion ${earlyOpen ? 'pnav-accordion--open' : ''}`}
          onClick={() => setEarlyOpen(!earlyOpen)}
        >
          <svg className="pnav-accordion-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3.5l3.5 3.5L5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Early Versions</span>
          <span className="pnav-accordion-count">{earlyPages.length}</span>
        </button>
        <div className={`pnav-accordion-body ${earlyOpen ? 'pnav-accordion-body--open' : ''}`}>
          <NavList items={earlyPages} current={current} />
        </div>

        <div className="pnav-group-label">Resources</div>
        <NavList items={resources} current={current} />
      </nav>

      {open && <div className="pnav-backdrop" onClick={() => setOpen(false)} />}
    </>
  )
}
