'use client'

import { useEffect } from 'react'
import VxNav from '@/components/vx/VxNav'
import VxFooter from '@/components/vx/VxFooter'

/* eslint-disable @next/next/no-img-element */

// =============================================================================
// DATA
// =============================================================================

type Swatch = {
  name: string
  hex: string
  use: string
  textOn: 'light' | 'dark'
  token: string
}

// Brand palette, sourced from the official brand guidelines and the V25 style guide section 2.
// "use" mirrors the style guide's notes on where each colour pulls weight.
const SWATCHES: Swatch[] = [
  {
    name: 'Abyss',
    hex: '#012236',
    use: 'Body background base. Dark-section title text on light surfaces.',
    textOn: 'dark',
    token: '--v25-abyss',
  },
  {
    name: 'Cobalt',
    hex: '#005072',
    use: 'Deep accent. Gradient stop. Navy accents on light surfaces.',
    textOn: 'dark',
    token: '--v25-cobalt',
  },
  {
    name: 'Sky',
    hex: '#5CC8E8',
    use: 'Sky-blue accent on dark surfaces. Default colour of .v25-h2 .accent.',
    textOn: 'dark',
    token: '--v25-sky',
  },
  {
    name: 'Teal',
    hex: '#00C6C1',
    use: 'Primary highlight on dark surfaces. Module top-edge, tetrahedron glow.',
    textOn: 'dark',
    token: '--v25-accent',
  },
  {
    name: 'Lime',
    hex: '#A1E2B7',
    use: 'Secondary highlight on dark surfaces. Phase ramp endpoint.',
    textOn: 'dark',
    token: '--v25-lime',
  },
  {
    name: 'Black',
    hex: '#1C1C1C',
    use: 'Background gradient origin. Use where pure black is required.',
    textOn: 'dark',
    token: 'literal',
  },
  {
    name: 'White',
    hex: '#FFFFFF',
    use: 'Primary text on dark surfaces. Card fills in light sections.',
    textOn: 'light',
    token: '--v25-primary',
  },
]

type TypeSpec = {
  family: string
  role: string
  varName: string
  fallback: string
  size: string
  weight: number
  letterSpacing: string
  lineHeight: number | string
  sample: string
  meta: string
  uppercase?: boolean
}

const TYPE_SPECS: TypeSpec[] = [
  {
    family: 'Literata',
    role: 'Display / Headlines',
    varName: '--font-display',
    fallback: 'Georgia, serif',
    size: 'clamp(2.5rem, 5vw, 4rem)',
    weight: 400,
    letterSpacing: '-0.025em',
    lineHeight: 0.98,
    sample: 'Workforce intelligence, end to end.',
    meta: 'h1 / h2. Regular weight. Negative tracking. Tight leading.',
  },
  {
    family: 'Inter Tight',
    role: 'Subheads / UI titles',
    varName: '--font-tight',
    fallback: 'system-ui, sans-serif',
    size: '1.25rem',
    weight: 600,
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
    sample: 'Eight modules. One hire-and-retain loop.',
    meta: '18 to 24px. SemiBold. Module titles, phase names, h3 patterns.',
  },
  {
    family: 'Inter',
    role: 'Body copy',
    varName: '--font-inter',
    fallback: 'system-ui, sans-serif',
    size: '1rem',
    weight: 400,
    letterSpacing: '0',
    lineHeight: 1.7,
    sample:
      'Predict performance before it lands. Defend every decision after it does. A multi-module platform that automates 80% of healthcare hiring.',
    meta: '14 to 16px. Regular. Section descriptions, card bodies, footer.',
  },
  {
    family: 'JetBrains Mono',
    role: 'Eyebrows / meta',
    varName: '--font-mono',
    fallback: 'monospace',
    size: '11px',
    weight: 600,
    letterSpacing: '0.14em',
    lineHeight: 1.4,
    sample: 'THE PLATFORM · 08 V-MODULES',
    meta: '10 to 12px. Uppercase. 14% tracking. Eyebrows, module-num, version strings.',
    uppercase: true,
  },
]

// =============================================================================
// PAGE
// =============================================================================

export default function VxBrandBody() {
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
          <div className="v25-eyebrow">Design System v2.0</div>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Literata", Georgia, serif)',
              fontSize: 'clamp(2.5rem, 6.4vw, 5.6rem)',
              fontWeight: 400,
              lineHeight: 0.98,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 2rem',
              maxWidth: '20ch',
              textWrap: 'balance',
            }}
          >
            Brand <span className="accent accent--teal">Guidelines</span>.
          </h1>
          <p
            className="v25-desc"
            style={{ maxWidth: '60ch', fontSize: '1.15rem' }}
          >
            The strategic foundation of our visual identity. Colour tokens,
            typography, and components engineered for consistency, accessibility,
            and elegance across the Strategia ecosystem.
          </p>
        </div>
      </section>

      {/* ================================================================
          LOGOMARK
          ================================================================ */}
      <section className="v25-section v25-section--light" id="logomark">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">01 · Logomark</div>
              <h2 className="v25-h2">
                A geometric mark. <span className="accent accent--teal">A confident wordmark.</span>
              </h2>
            </div>
          </div>
          <p className="v25-desc" style={{ maxWidth: '60ch' }}>
            The Strategia identity pairs a minimal wireframe triangle with a
            bold sans-serif wordmark. The triangle reads as a converging signal,
            the architectural shape behind every Triangulate score. The wordmark
            is set for maximum legibility at every size.
          </p>

          <div
            style={{
              marginTop: 48,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {/* Wireframe triangle on Abyss */}
            <div
              style={{
                background: 'var(--v25-abyss)',
                borderRadius: 24,
                padding: '64px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 280,
                border: '1px solid rgba(0, 25, 46, 0.10)',
              }}
            >
              <svg
                width="120"
                height="120"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Strategia wireframe mark"
              >
                <path
                  d="M20 4L36 34H4L20 4Z"
                  stroke="#ffffff"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Wordmark on Abyss */}
            <div
              style={{
                background: 'var(--v25-abyss)',
                borderRadius: 24,
                padding: '64px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 280,
                border: '1px solid rgba(0, 25, 46, 0.10)',
              }}
            >
              <img
                src="/images/brand/strategia-wordmark-white.svg"
                alt="Strategia wordmark"
                style={{ width: '70%', maxWidth: 280, height: 'auto' }}
              />
            </div>

            {/* Wordmark on Cloud */}
            <div
              style={{
                background: '#ECEDEB',
                borderRadius: 24,
                padding: '64px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 280,
                border: '1px solid rgba(0, 25, 46, 0.10)',
              }}
            >
              <img
                src="/images/brand/strategia-wordmark-abyss.svg"
                alt="Strategia wordmark on light"
                style={{ width: '70%', maxWidth: 280, height: 'auto' }}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: 48,
              padding: '32px',
              borderRadius: 20,
              background: '#ffffff',
              border: '1px solid rgba(1, 34, 54, 0.10)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 32,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'rgba(1, 34, 54, 0.70)',
                  marginBottom: 12,
                }}
              >
                Rule 01
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-tight, system-ui)',
                  fontWeight: 600,
                  fontSize: 18,
                  color: 'var(--v25-abyss)',
                  marginBottom: 8,
                }}
              >
                Preserve the tracking
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: 'rgba(1, 34, 54, 0.72)',
                }}
              >
                Do not alter the kerning of the wordmark or add embellishments,
                outlines, or drop shadows.
              </p>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'rgba(1, 34, 54, 0.70)',
                  marginBottom: 12,
                }}
              >
                Rule 02
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-tight, system-ui)',
                  fontWeight: 600,
                  fontSize: 18,
                  color: 'var(--v25-abyss)',
                  marginBottom: 8,
                }}
              >
                Maintain 50% clear space
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: 'rgba(1, 34, 54, 0.72)',
                }}
              >
                Keep clear space of at least 50% of the logo height on all
                sides. The mark needs room to breathe.
              </p>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'rgba(1, 34, 54, 0.70)',
                  marginBottom: 12,
                }}
              >
                Rule 03
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-tight, system-ui)',
                  fontWeight: 600,
                  fontSize: 18,
                  color: 'var(--v25-abyss)',
                  marginBottom: 8,
                }}
              >
                Use the right variant
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: 'rgba(1, 34, 54, 0.72)',
                }}
              >
                White wordmark on Abyss or Cobalt. Abyss wordmark on Cloud or
                White. The glow variant is reserved for hero closers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          COLOUR PALETTE
          ================================================================ */}
      <section className="v25-section" id="palette">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">02 · Colour</div>
              <h2 className="v25-h2">
                A palette tuned for <span className="accent accent--sky">contrast and depth</span>.
              </h2>
            </div>
          </div>
          <p
            className="v25-desc"
            style={{ maxWidth: '64ch', marginBottom: 48 }}
          >
            Seven brand tokens. Each clears WCAG AA at its sanctioned size on
            the surfaces where it appears. Cobalt-tinted complements step in
            when teal or lime fall on a light background.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {SWATCHES.map((s) => (
              <div
                key={s.name}
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  background: 'rgba(255, 255, 255, 0.04)',
                }}
              >
                <div
                  style={{
                    background: s.hex,
                    height: 140,
                    borderBottom:
                      s.name === 'White'
                        ? '1px solid rgba(1, 34, 54, 0.12)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                  aria-hidden="true"
                />
                <div style={{ padding: 20 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-tight, system-ui)',
                        fontWeight: 600,
                        fontSize: 18,
                        color: '#ffffff',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {s.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        color: 'rgba(255, 255, 255, 0.65)',
                      }}
                    >
                      {s.hex}
                    </div>
                  </div>
                  <p
                    style={{
                      margin: '0 0 12px',
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.65)',
                    }}
                  >
                    {s.use}
                  </p>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.55)',
                    }}
                  >
                    {s.token === 'literal' ? 'literal hex' : `var(${s.token})`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          TYPOGRAPHY
          ================================================================ */}
      <section className="v25-section v25-section--light" id="typography">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">03 · Typography</div>
              <h2 className="v25-h2">
                Four faces. <span className="accent accent--teal">One voice.</span>
              </h2>
            </div>
          </div>
          <p
            className="v25-desc"
            style={{ maxWidth: '60ch', marginBottom: 48 }}
          >
            Literata for headlines. Inter Tight for subheads and UI titles. Inter
            for body. JetBrains Mono for eyebrows and meta. The system is
            deliberately narrow so every page reads as one product.
          </p>

          <div style={{ display: 'grid', gap: 24 }}>
            {TYPE_SPECS.map((t) => (
              <div
                key={t.family}
                style={{
                  borderRadius: 20,
                  background: '#ffffff',
                  padding: 'clamp(28px, 4vw, 40px)',
                  border: '1px solid rgba(1, 34, 54, 0.08)',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(180px, 220px) 1fr',
                  gap: 32,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: 'rgba(1, 34, 54, 0.65)',
                      marginBottom: 12,
                    }}
                  >
                    {t.role}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-tight, system-ui)',
                      fontWeight: 600,
                      fontSize: 22,
                      color: 'var(--v25-abyss)',
                      marginBottom: 16,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {t.family}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: 'rgba(1, 34, 54, 0.72)',
                      marginBottom: 12,
                    }}
                  >
                    {t.meta}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(1, 34, 54, 0.55)',
                    }}
                  >
                    var({t.varName})
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 24,
                    borderLeft: '1px solid rgba(1, 34, 54, 0.10)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: `var(${t.varName}, ${t.fallback})`,
                      fontSize: t.size,
                      fontWeight: t.weight,
                      letterSpacing: t.letterSpacing,
                      lineHeight: t.lineHeight,
                      color: 'var(--v25-abyss)',
                      textTransform: t.uppercase ? 'uppercase' : 'none',
                      maxWidth: '40ch',
                    }}
                  >
                    {t.sample}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          COMPONENT PREVIEW
          ================================================================ */}
      <section className="v25-section" id="components">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">04 · Components</div>
              <h2 className="v25-h2">
                Live previews. <span className="accent accent--lime">Real markup.</span>
              </h2>
            </div>
          </div>
          <p
            className="v25-desc"
            style={{ maxWidth: '60ch', marginBottom: 48 }}
          >
            Each preview below renders the actual V25 class on the actual V25
            surface. What you see is what ships.
          </p>

          {/* Eyebrow + header pair */}
          <div style={{ marginBottom: 56 }}>
            <ComponentLabel name="Eyebrow + h2 pair" usage=".v25-eyebrow + .v25-h2" />
            <div
              style={{
                padding: 'clamp(28px, 4vw, 40px)',
                borderRadius: 20,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
              }}
            >
              <div className="v25-eyebrow">The Platform · 08 V-modules</div>
              <h2 className="v25-h2" style={{ marginBottom: 0 }}>
                Eight modules.{' '}
                <span className="accent accent--teal">One hire-and-retain loop.</span>
              </h2>
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ marginBottom: 56 }}>
            <ComponentLabel
              name="CTAs"
              usage=".v25-btn-primary, .v25-link-arrow"
            />
            <div
              style={{
                padding: 'clamp(28px, 4vw, 40px)',
                borderRadius: 20,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
              }}
            >
              <div className="v25-hero-actions">
                <a href="#components" className="v25-btn-primary">
                  Book a demo
                </a>
                <a href="#components" className="v25-link-arrow">
                  Explore the platform
                  <span aria-hidden="true"> ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Module card */}
          <div style={{ marginBottom: 56 }}>
            <ComponentLabel name="Module card" usage=".v25-module" />
            <div
              style={{
                padding: 'clamp(28px, 4vw, 40px)',
                borderRadius: 20,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 16,
              }}
            >
              <div className="v25-module">
                <div className="v25-module-header">
                  <span className="v25-module-num">M02</span>
                  <span className="v25-module-tag">Screen</span>
                </div>
                <div className="v25-module-title">V-Parse</div>
                <p className="v25-module-desc">
                  1,000 CVs per hour into structured talent data. Domain-specific
                  algorithms for high-precision matching beyond keyword filters.
                </p>
              </div>
              <div className="v25-module">
                <div className="v25-module-header">
                  <span className="v25-module-num">M03</span>
                  <span className="v25-module-tag">Assess</span>
                </div>
                <div className="v25-module-title">V-Psych</div>
                <p className="v25-module-desc">
                  5 to 7 minute proprietary OCEAN-based assessment with T-score
                  conversion. Validated against role-specific performance
                  indicators.
                </p>
              </div>
            </div>
          </div>

          {/* Stat card */}
          <div style={{ marginBottom: 0 }}>
            <ComponentLabel name="Stat card" usage=".v25-stat-card" />
            <div
              style={{
                padding: 'clamp(28px, 4vw, 40px)',
                borderRadius: 20,
                background: '#ECEDEB',
                border: '1px solid rgba(1, 34, 54, 0.08)',
              }}
            >
              <div className="v25-stats-grid">
                <div className="v25-stat-card">
                  <div className="v25-stat-value">80%</div>
                  <div className="v25-stat-label">Of internal recruitment automated</div>
                  <div className="v25-stat-sub">Median across deployed health systems</div>
                </div>
                <div className="v25-stat-card">
                  <div className="v25-stat-value">&lt;25 min</div>
                  <div className="v25-stat-label">1,000 CVs end-to-end</div>
                  <div className="v25-stat-sub">From requisition to ranked shortlist</div>
                </div>
                <div className="v25-stat-card">
                  <div className="v25-stat-value">0.74</div>
                  <div className="v25-stat-label">Match-score validity (mature)</div>
                  <div className="v25-stat-sub">vs. 0.18 for resume review (Sackett 2022)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
          ================================================================ */}
      <section className="v25-cta-section">
        <div className="v25-cta-wrap v25-reveal">
          <div className="v25-cta-bg" aria-hidden="true" />
          <img
            src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png"
            alt="Strategia"
            className="v25-cta-logo"
          />
          <h2 className="v25-h2">
            One system. <span className="accent accent--teal">Every surface.</span>
          </h2>
          <p className="v25-desc">
            The brand system is a living artefact. Use the tokens, reuse the
            components, and ship work that holds together at every scale.
          </p>
          <div className="v25-cta-actions">
            <a href="/vx/platform" className="v25-btn-primary">
              See it in product
            </a>
            <a href="/vx" className="v25-link-arrow">
              Back to overview
              <span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      <VxFooter />
    </div>
  )
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

function ComponentLabel({ name, usage }: { name: string; usage: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 16,
        marginBottom: 16,
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-tight, system-ui)',
          fontWeight: 600,
          fontSize: 16,
          color: '#ffffff',
          letterSpacing: '-0.01em',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.55)',
        }}
      >
        {usage}
      </div>
    </div>
  )
}
