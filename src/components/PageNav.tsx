'use client'

import { useState, useEffect } from 'react'
import './PageNav.css'

const earlyPages = [
  { href: '/', label: 'Home', tag: 'v1' },
  { href: '/brand', label: 'Brand Guidelines', tag: 'brand' },
  { href: '/brand-v2', label: 'Brand Guidelines V2', tag: 'brand-v2' },
  { href: '/brand-v3', label: 'Brand V3 — Teal Aurora', tag: 'brand-v3' },
]

const pages = [
  { href: '/v27', label: 'V27 — Three-Pillar Content Rewrite', tag: 'v27' },
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
