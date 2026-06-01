'use client'

/* V27 nav — snapshot of the VX homepage shipped as a stand-alone page.
   Links stay in-page because /v27 is "just the homepage" with no V27
   subpages to point to. The CTA is an in-page jump to #demo. */

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import '@/components/vx/VxNav.css'
import { assetPath } from '@/lib/sitePath'

const homeHref = process.env.NEXT_PUBLIC_PUBLISH_V27_AS_HOME === 'true' ? '/' : '/v27'

const LINKS = [
  { label: 'Industries', href: '#industries' },
  { label: 'Platform', href: '#modules' },
  { label: 'Science', href: '#science' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Security', href: '#security' },
  { label: 'Process', href: '#process' },
]

type CtaConfig = { label: string; href: string }
const DEFAULT_CTA: CtaConfig = { label: 'Book demo', href: '#demo' }

export default function V27Nav({ cta = DEFAULT_CTA }: { cta?: CtaConfig } = {}) {
  const navRef = useRef<HTMLElement>(null)

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

  return (
    <nav className="v25-nav vx-nav" ref={navRef}>
      <Link href={homeHref} className="v25-nav-logo">
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

      <Link href={cta.href} className="v25-nav-cta">
        {cta.label}
      </Link>
    </nav>
  )
}
