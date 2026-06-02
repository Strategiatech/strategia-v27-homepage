'use client'

/* V27 nav — snapshot of the VX homepage shipped as a stand-alone page.
   Links stay in-page because /v27 is "just the homepage" with no V27
   subpages to point to. The CTA is an in-page jump to #demo.

   Below 860px the inline links are hidden (see v25.css) and replaced by a
   hamburger that opens a slide-in drawer. The drawer markup is mobile-only
   behaviour — desktop never shows the toggle or the panel. */

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import '@/components/vx/VxNav.css'
import { assetPath } from '@/lib/sitePath'

const homeHref = process.env.NEXT_PUBLIC_PUBLISH_V27_AS_HOME === 'true' ? '/' : '/v27'

const LINKS = [
  { label: 'Industries', href: '#industries' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Platform', href: '#modules' },
  { label: 'Science', href: '#science' },
  { label: 'Process', href: '#process' },
  { label: 'Security', href: '#security' },
]

type CtaConfig = { label: string; href: string }
const DEFAULT_CTA: CtaConfig = { label: 'Book demo', href: '#demo' }

export default function V27Nav({ cta = DEFAULT_CTA }: { cta?: CtaConfig } = {}) {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const _nav = navRef.current
    if (!_nav) return
    const nav: HTMLElement = _nav
    const timeoutIds = new Set<number>()
    const frameIds = new Set<number>()
    const intervalIds = new Set<number>()

    const syncScrolledState = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    const queueSyncScrolledState = () => {
      syncScrolledState()

      const frameId = window.requestAnimationFrame(() => {
        frameIds.delete(frameId)
        syncScrolledState()
      })
      frameIds.add(frameId)

      const intervalId = window.setInterval(syncScrolledState, 120)
      intervalIds.add(intervalId)

      const timeoutId = window.setTimeout(() => {
        timeoutIds.delete(timeoutId)
        intervalIds.delete(intervalId)
        window.clearInterval(intervalId)
        syncScrolledState()
      }, 2600)
      timeoutIds.add(timeoutId)
    }

    window.addEventListener('scroll', syncScrolledState, { passive: true })
    window.addEventListener('hashchange', queueSyncScrolledState)
    queueSyncScrolledState()

    return () => {
      window.removeEventListener('scroll', syncScrolledState)
      window.removeEventListener('hashchange', queueSyncScrolledState)
      frameIds.forEach((frameId) => window.cancelAnimationFrame(frameId))
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId))
      intervalIds.forEach((intervalId) => window.clearInterval(intervalId))
    }
  }, [])

  // Mobile drawer: close on Escape, when the viewport grows back to the
  // desktop layout, and lock body scroll while it's open.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth > 860) setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  return (
    <nav className={`v25-nav vx-nav${menuOpen ? ' vx-nav--menu-open' : ''}`} ref={navRef}>
      <Link href={homeHref} className="v25-nav-logo" onClick={() => setMenuOpen(false)}>
        <svg
          className="v25-nav-mark vx-nav-mark-visible"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M20 4L36 34H4L20 4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <img src={assetPath('/images/brand/strategia-wordmark-white.svg')} alt="Strategia" />
      </Link>

      <ul className="v25-nav-links">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="v25-nav-link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="vx-nav-actions">
        <Link href={cta.href} className="v25-nav-cta" onClick={() => setMenuOpen(false)}>
          {cta.label}
        </Link>

        <button
          type="button"
          className="vx-nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="vx-nav-drawer"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="vx-nav-toggle-bar" />
          <span className="vx-nav-toggle-bar" />
          <span className="vx-nav-toggle-bar" />
        </button>
      </div>

      <div
        className="vx-nav-drawer-overlay"
        hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      <div
        id="vx-nav-drawer"
        className="vx-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!menuOpen}
      >
        <ul className="vx-nav-drawer-links">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="vx-nav-drawer-link" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <Link href={cta.href} className="vx-nav-drawer-cta" onClick={() => setMenuOpen(false)}>
          {cta.label}
        </Link>
      </div>
    </nav>
  )
}
