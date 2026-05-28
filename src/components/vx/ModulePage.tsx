'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import VxNav from '@/components/vx/VxNav'
import VxFooter from '@/components/vx/VxFooter'

export type ModulePhase = 'Foundation' | 'Screen' | 'Assess' | 'Decide' | 'Operate'

export type ModuleFeature = { title: string; body: string }

export type RelatedModule = {
  slug: string
  num: string
  name: string
  phase: ModulePhase
  blurb: string
}

export type ModuleAccent = 'sky' | 'teal' | 'lime'

export type ModulePageProps = {
  /** e.g. "V-Parse" */
  name: string
  /** Short subtitle under the h1, e.g. "Semantic CV Analysis Engine" */
  tagline: string
  /** e.g. "M02" */
  num: string
  /** Phase classification */
  phase: ModulePhase
  /** Hero h1 lead phrase, e.g. "One thousand CVs an hour, scored against the spec." Single sentence, no dashes. */
  headline: string
  /** Phrase inside headline to colour with .accent--<accentColor>. Must appear verbatim in headline. */
  headlineAccent: string
  /** Accent colour for the headline-accent span and the headline stat. */
  accent: ModuleAccent
  /** One-paragraph description, plain prose. */
  description: string
  /** Big stat number (e.g. "1,000+", "0.85", "60%") */
  statValue: string
  /** Stat label, e.g. "CVs processed per hour" */
  statLabel: string
  /** Stat sub, e.g. "Domain-specific algorithms, not keyword filters" */
  statSub: string
  /** Three feature cards. */
  features: ModuleFeature[]
  /** Two to three sibling modules to surface in the related row. */
  related: RelatedModule[]
  /** Final CTA headline (split into lead phrase + accent phrase). */
  ctaLead: string
  ctaAccent: string
  /** Final CTA description sentence. */
  ctaDesc: string
}

export default function ModulePage(props: ModulePageProps) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.v25-reveal')
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const {
    name,
    tagline,
    num,
    phase,
    headline,
    headlineAccent,
    accent,
    description,
    statValue,
    statLabel,
    statSub,
    features,
    related,
    ctaLead,
    ctaAccent,
    ctaDesc,
  } = props

  // Split the headline around the accent phrase so we can wrap it in the
  // .accent span without HTML-injecting it. The phrase must appear verbatim.
  const accentIndex = headline.indexOf(headlineAccent)
  const before = accentIndex >= 0 ? headline.slice(0, accentIndex) : headline
  const after = accentIndex >= 0 ? headline.slice(accentIndex + headlineAccent.length) : ''

  return (
    <div className="v25 v25--complete">
      <VxNav />

      {/* ================================================================
          HERO
          ================================================================ */}
      <section
        className="v25-section"
        style={{ paddingTop: 'clamp(140px, 18vw, 220px)' }}
      >
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">
            {num} &middot; {phase}
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Literata", Georgia, serif)',
              fontSize: 'clamp(2.5rem, 6.4vw, 5.6rem)',
              fontWeight: 400,
              lineHeight: 0.98,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 1.25rem',
              maxWidth: '20ch',
              textWrap: 'balance',
            }}
          >
            {name}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-tight, "Inter Tight", sans-serif)',
              fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)',
              fontWeight: 400,
              lineHeight: 1.25,
              color: 'rgba(255,255,255,0.82)',
              margin: '0 0 2rem',
              maxWidth: '32ch',
              letterSpacing: '-0.005em',
            }}
          >
            {tagline}
          </p>

          <p
            className="v25-desc"
            style={{ maxWidth: '60ch', fontSize: '1.1rem' }}
          >
            {description}
          </p>

          <div className="v25-hero-actions" style={{ marginTop: 32 }}>
            <a href="/vx#demo" className="v25-btn-primary">
              Book a demo
            </a>
            <Link href="/vx/platform" className="v25-link-arrow">
              See all modules<span aria-hidden="true"> ↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          HEADLINE STAT + DESCRIPTION HEAD
          ================================================================ */}
      <section className="v25-stats v25-section--light v25-reveal">
        <div className="v25-stats-grid">
          <div className="v25-stat-card">
            <div className="v25-stat-value">{statValue}</div>
            <div className="v25-stat-label">{statLabel}</div>
            <div className="v25-stat-sub">{statSub}</div>
          </div>
          <div className="v25-stat-card">
            <div className="v25-stat-value">{num}</div>
            <div className="v25-stat-label">Module reference</div>
            <div className="v25-stat-sub">Phase {phase}, in the eight module loop</div>
          </div>
          <div className="v25-stat-card">
            <div className="v25-stat-value">API</div>
            <div className="v25-stat-label">Deploy standalone</div>
            <div className="v25-stat-sub">Or as part of the full Strategia suite</div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FEATURES (3 per module)
          ================================================================ */}
      <section className="v25-section" id="features">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Capabilities</div>
              <h2 className="v25-h2">
                {before}
                <span className={`accent accent--${accent}`}>{headlineAccent}</span>
                {after}
              </h2>
            </div>
            <Link href="/vx/science" className="v25-link-arrow">
              Read the research<span aria-hidden="true"> ↗</span>
            </Link>
          </div>

          <div className="v25-science-grid">
            {features.map((f, i) => {
              const idx = (i + 1).toString().padStart(2, '0')
              return (
                <div key={f.title} className="v25-science-stat">
                  <div className="v25-science-stat-header">
                    <span className="value">{idx}</span>
                    <span className="evidence">Capability</span>
                  </div>
                  <div className="label">{f.title}</div>
                  <div className="sub">{f.body}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          RELATED MODULES
          ================================================================ */}
      <section className="v25-section v25-section--light" id="modules">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Related modules</div>
              <h2 className="v25-h2">
                {name} runs alongside{' '}
                <span className="accent accent--teal">the rest of the loop</span>.
              </h2>
            </div>
            <Link href="/vx/platform" className="v25-link-arrow">
              All eight modules<span aria-hidden="true"> ↗</span>
            </Link>
          </div>

          <div
            className={`v25-module-phase-cards${
              related.length === 1
                ? ' v25-module-phase-cards--1'
                : related.length === 2
                ? ' v25-module-phase-cards--2'
                : ''
            }`}
          >
            {related.map((m) => (
              <Link
                key={m.slug}
                href={`/vx/module/${m.slug}`}
                className="v25-module"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div className="v25-module-header">
                  <span className="v25-module-num">{m.num}</span>
                  <span className="v25-module-tag">{m.phase}</span>
                </div>
                <div className="v25-module-title">{m.name}</div>
                <p className="v25-module-desc">{m.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CORE CAPABILITIES CTA BAR
          ================================================================ */}
      <section className="v25-section">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Core capabilities</div>
          <h2 className="v25-h2">
            Ready to deploy.{' '}
            <span className="accent accent--lime">Standalone or end to end.</span>
          </h2>
          <p className="v25-desc" style={{ maxWidth: '60ch' }}>
            Integrate {name} on its own through the Strategia API, or run it as
            one signal in the full eight module hire and retain loop.
          </p>
          <div className="v25-hero-actions" style={{ marginTop: 32 }}>
            <Link href="/vx/platform" className="v25-btn-outline">
              Explore the platform
            </Link>
            <Link href="/vx/process" className="v25-link-arrow">
              See the process<span aria-hidden="true"> ↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
          ================================================================ */}
      <section className="v25-cta-section" id="demo">
        <div className="v25-cta-wrap v25-reveal">
          <div className="v25-cta-bg" aria-hidden="true" />
          <img
            src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png"
            alt="Strategia"
            className="v25-cta-logo"
          />
          <h2 className="v25-h2">
            {ctaLead} <span className="accent accent--teal">{ctaAccent}</span>
          </h2>
          <p className="v25-desc">{ctaDesc}</p>
          <div className="v25-cta-actions">
            <a href="/vx#demo" className="v25-btn-primary">
              Book a demo
            </a>
            <Link href="/vx/process" className="v25-link-arrow">
              Talk to us<span aria-hidden="true"> ↗</span>
            </Link>
          </div>
        </div>
      </section>

      <VxFooter />
    </div>
  )
}
