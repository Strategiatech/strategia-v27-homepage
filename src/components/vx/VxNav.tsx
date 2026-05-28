'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import './VxNav.css'

const LINKS = [
  { href: '/vx/platform', label: 'Platform' },
  { href: '/vx/science', label: 'Science' },
  { href: '/vx/solutions', label: 'Solutions' },
  { href: '/vx/institutional', label: 'Security' },
  { href: '/vx/process', label: 'Process' },
]

type CtaConfig = { label: string; href: string }
const DEFAULT_CTA: CtaConfig = { label: 'Book demo', href: '/vx#demo' }

export default function VxNav({ cta = DEFAULT_CTA }: { cta?: CtaConfig } = {}) {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

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
      <Link href="/vx" className="v25-nav-logo">
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
        {LINKS.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`v25-nav-link${isActive ? ' v25-nav-link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>

      <Link href={cta.href} className="v25-nav-cta">
        {cta.label}
      </Link>
    </nav>
  )
}
