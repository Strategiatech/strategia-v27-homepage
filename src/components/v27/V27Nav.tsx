'use client'

/* V27 nav — snapshot of the VX homepage shipped as a stand-alone page.
   Visually identical to VxNav (same menu items + CTA) so the design
   review captures what the nav looks like — but every menu link is
   inert (preventDefault on click) because /v27 is "just the homepage"
   with no V27 subpages to point to. The CTA is an in-page jump to
   #demo. */

import Link from 'next/link'
import { type MouseEvent, useEffect, useRef } from 'react'
import '@/components/vx/VxNav.css'

const LINKS = [
  { label: 'Platform' },
  { label: 'Science' },
  { label: 'Solutions' },
  { label: 'Security' },
  { label: 'Process' },
]

type CtaConfig = { label: string; href: string }
const DEFAULT_CTA: CtaConfig = { label: 'Book demo', href: '#demo' }

const inert = (e: MouseEvent<HTMLAnchorElement>) => e.preventDefault()

export default function V27Nav({ cta = DEFAULT_CTA }: { cta?: CtaConfig } = {}) {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const _nav = navRef.current
    if (!_nav) return
    const nav: HTMLElement = _nav
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="v25-nav vx-nav" ref={navRef}>
      <Link href="/v27" className="v25-nav-logo">
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
        <img src="/images/brand/strategia-wordmark-white.svg" alt="Strategia" />
      </Link>

      <ul className="v25-nav-links">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a href="#" onClick={inert} className="v25-nav-link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <Link href={cta.href} className="v25-nav-cta">
        {cta.label}
      </Link>
    </nav>
  )
}
