'use client'

import { useState, useCallback } from 'react'
import './brand.css'
/* eslint-disable @next/next/no-img-element */

/* -------------------------------------------------------
   COPY HELPER
   ------------------------------------------------------- */
function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1600)
  }, [])
  return { copied, copy }
}

/* -------------------------------------------------------
   DATA
   ------------------------------------------------------- */
const colors = {
  primary: [
    { name: 'Navy', hex: '#06293E', rgb: 'R6 G41 B62', cssVar: '--navy', dark: true },
    { name: 'Black', hex: '#1C1C1C', rgb: 'R28 G28 B28', cssVar: '--black', dark: true },
  ],
  secondary: [
    { name: 'Steel', hex: '#BFBFBE', rgb: 'R191 G191 B190', cssVar: '--steel', dark: false },
    { name: 'Silver', hex: '#ECEDEB', rgb: 'R236 G237 B235', cssVar: '--silver', dark: false },
  ],
  accent: [
    { name: 'Lemon', hex: '#FCF099', rgb: 'R252 G240 B153', cssVar: '--lemon', dark: false },
  ],
  functional: [
    { name: 'Signal', hex: '#10B981', rgb: 'R16 G185 B129', cssVar: '--signal', dark: true },
    { name: 'Amber', hex: '#F59E0B', rgb: 'R245 G158 B11', cssVar: '--amber', dark: false },
    { name: 'Rose', hex: '#E11D48', rgb: 'R225 G29 B72', cssVar: '--rose', dark: true },
  ],
}

const gradients = [
  { name: 'Navy to Black', css: 'radial-gradient(circle at 30% 30%, #06293E, #1C1C1C)', label: 'Primary' },
  { name: 'Steel to Black', css: 'linear-gradient(135deg, #BFBFBE, #1C1C1C)', label: 'Dark' },
  { name: 'Silver to Navy', css: 'linear-gradient(135deg, #ECEDEB, #06293E)', label: 'Blend' },
  { name: 'Logo Silver', css: 'linear-gradient(180deg, #ECEDEB, #BFBFBE)', label: 'Logo' },
]

const spacingScale = [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112]

const radii = [
  { name: 'xs', value: '6px', var: '--r-xs' },
  { name: 'sm', value: '10px', var: '--r-sm' },
  { name: 'md', value: '14px', var: '--r-md' },
  { name: 'lg', value: '20px', var: '--r-lg' },
  { name: 'xl', value: '28px', var: '--r-xl' },
  { name: 'pill', value: '999px', var: '--r-pill' },
]

const logos = [
  { src: '/images/logos/STRATEGIA_STACKED_NAVY.png', label: 'Stacked Navy', bg: '#ECEDEB' },
  { src: '/images/logos/STRATEGIA_STACKED_WHITE.png', label: 'Stacked White', bg: '#06293E' },
  { src: '/images/logos/STRATEGIA_INLINE_NAVY.png', label: 'Inline Navy', bg: '#ECEDEB' },
  { src: '/images/logos/STRATEGIA_INLINE_WHITE.png', label: 'Inline White', bg: '#06293E' },
]

const navItems = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'logos', label: 'Logos' },
  { id: 'spacing', label: 'Spacing' },
]

const typeScale = [
  { label: 'Display', font: 'var(--font-display)', size: 56, weight: 400, ls: '-0.03em', text: 'Display heading' },
  { label: 'H1', font: 'var(--font-display)', size: 44, weight: 400, ls: '-0.025em', text: 'Page heading' },
  { label: 'H2', font: 'var(--font-display)', size: 36, weight: 400, ls: '-0.02em', text: 'Section heading' },
  { label: 'H3', font: 'var(--font-tight)', size: 24, weight: 700, ls: '-0.01em', text: 'Subsection heading' },
  { label: 'H4', font: 'var(--font-tight)', size: 18, weight: 600, ls: '-0.005em', text: 'Card heading' },
  { label: 'Body', font: 'var(--font-sans)', size: 16, weight: 400, ls: '0', text: 'Body text for paragraphs and long-form content' },
  { label: 'Small', font: 'var(--font-sans)', size: 14, weight: 400, ls: '0', text: 'Supporting text, captions, and metadata' },
  { label: 'Mono', font: 'var(--font-monospace)', size: 12, weight: 500, ls: '0.06em', text: 'LABELS AND CODE' },
]

/* -------------------------------------------------------
   MAIN PAGE
   ------------------------------------------------------- */
export default function BrandPage() {
  const { copied, copy } = useCopy()

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      {/* ========== HERO ========== */}
      <section className="brand-hero">
        <div className="brand-hero-grid" />
        <div className="brand-hero-glow" />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <p className="brand-hero-eyebrow">Brand Guidelines v1.0</p>
          <h1>Strategia Design System</h1>
          <p className="brand-hero-sub">
            The complete visual language for Strategia Tech. Colors, type, components, and patterns
            -- everything you need to build on-brand experiences.
          </p>
          <div className="brand-nav-pills">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="brand-nav-pill">{n.label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COLORS ========== */}
      <section className="brand-section">
        <div className="container">
          <div className="brand-section-label" id="colors"><span>Colors</span></div>
          <h2 className="brand-h2">Color Palette</h2>
          <p className="brand-desc">
            A calming yet authoritative palette. Navy and Black anchor the brand, Steel and Silver provide structure,
            and Lemon adds targeted emphasis.
          </p>

          {(Object.entries(colors) as [string, typeof colors.primary][]).map(([group, items]) => (
            <div key={group}>
              <h3 className="brand-group-label">{group}</h3>
              <div className="brand-grid brand-grid--colors">
                {items.map((c) => (
                  <div key={c.hex} className="brand-color-card" onClick={() => copy(c.hex)}>
                    <span className="brand-copy-badge" style={{ opacity: copied === c.hex ? 1 : 0, transform: copied === c.hex ? 'translateY(0)' : 'translateY(-4px)' }}>Copied</span>
                    <div className="brand-color-swatch" style={{ background: c.hex }}>
                      <span style={{ color: c.dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>Click to copy</span>
                    </div>
                    <div className="brand-color-info">
                      <div className="brand-color-row">
                        <span className="brand-color-name">{c.name}</span>
                        <code className="brand-color-hex">{c.hex}</code>
                      </div>
                      <div className="brand-color-meta">
                        <span>{c.rgb}</span>
                        <span>{c.cssVar}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Gradients */}
          <h3 className="brand-group-label">Gradients</h3>
          <div className="brand-grid brand-grid--colors" style={{ marginBottom: 0 }}>
            {gradients.map((g) => (
              <div key={g.name} className="brand-gradient-card" onClick={() => copy(g.css)}>
                <span className="brand-copy-badge" style={{ opacity: copied === g.css ? 1 : 0, transform: copied === g.css ? 'translateY(0)' : 'translateY(-4px)' }}>Copied</span>
                <div className="brand-gradient-preview" style={{ background: g.css }} />
                <div className="brand-gradient-info">
                  <div>{g.name}</div>
                  <code>{g.label}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TYPOGRAPHY ========== */}
      <section className="brand-section--alt">
        <div className="container">
          <div className="brand-section-label" id="typography"><span>Typography</span></div>
          <h2 className="brand-h2">Typography</h2>
          <p className="brand-desc" style={{ marginBottom: 56 }}>
            Literata for headlines, Inter Tight for subheadings, Inter for body text. A system that balances editorial elegance with digital clarity.
          </p>

          {/* Literata */}
          <div style={{ marginBottom: 56 }}>
            <div className="brand-type-header">
              <h3 style={{ fontFamily: 'var(--font-display)' }}>Literata</h3>
              <span>--font-display / Headlines</span>
            </div>
            <div className="brand-type-card">
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--navy)', lineHeight: 1.1, margin: '0 0 24px' }}>
                The quick brown fox
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, letterSpacing: '-0.015em', color: 'var(--navy)', lineHeight: 1.3, margin: '0 0 20px' }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: 'var(--graphite-500)', lineHeight: 1.5, margin: 0 }}>
                abcdefghijklmnopqrstuvwxyz 0123456789 !@#$%&*
              </p>
            </div>
          </div>

          {/* Inter Tight */}
          <div style={{ marginBottom: 56 }}>
            <div className="brand-type-header">
              <h3 style={{ fontFamily: 'var(--font-tight)' }}>Inter Tight</h3>
              <span>--font-tight / Subheadings</span>
            </div>
            <div className="brand-type-card">
              <p style={{ fontFamily: 'var(--font-tight)', fontSize: 32, fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--navy)', lineHeight: 1.2, margin: '0 0 16px' }}>
                Inter Tight Regular for subheadings
              </p>
              <p style={{ fontFamily: 'var(--font-tight)', fontSize: 32, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--navy)', lineHeight: 1.2, margin: '0 0 16px' }}>
                Inter Tight Bold for emphasis
              </p>
              <p style={{ fontFamily: 'var(--font-tight)', fontSize: 16, fontWeight: 400, color: 'var(--graphite-500)', lineHeight: 1.5, margin: 0 }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
              </p>
            </div>
          </div>

          {/* Inter */}
          <div style={{ marginBottom: 56 }}>
            <div className="brand-type-header">
              <h3 style={{ fontFamily: 'var(--font-sans)' }}>Inter</h3>
              <span>--font-sans / Body text</span>
            </div>
            <div className="brand-type-card">
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 18, color: 'var(--graphite)', lineHeight: 1.65, margin: '0 0 16px' }}>
                Inter is used for body copy throughout the platform. Its wider tracking and clean geometry make it
                highly readable at small sizes, particularly for long-form content and data-heavy interfaces.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--graphite-500)', lineHeight: 1.6, margin: 0 }}>
                Regular 14px -- The standard body size for interface text, descriptions, and secondary content.
              </p>
            </div>
          </div>

          {/* Mono */}
          <div style={{ marginBottom: 56 }}>
            <div className="brand-type-header">
              <h3 style={{ fontFamily: 'var(--font-monospace)' }}>JetBrains Mono</h3>
              <span>--font-monospace / Code &amp; labels</span>
            </div>
            <div className="brand-type-card">
              <p style={{ fontFamily: 'var(--font-monospace)', fontSize: 14, color: 'var(--graphite)', lineHeight: 1.7, margin: 0 }}>
                const strategia = new DesignSystem({'{'} navy: &apos;#06293E&apos;, lemon: &apos;#FCF099&apos; {'}'});<br />
                // Used for code samples, eyebrow labels, data values, and monospace UI elements.
              </p>
            </div>
          </div>

          {/* Type Scale */}
          <h3 className="brand-group-label" style={{ marginBottom: 20 }}>Type Hierarchy</h3>
          <div className="brand-type-scale">
            {typeScale.map((row) => (
              <div key={row.label} className="brand-type-row">
                <span className="label">{row.label}</span>
                <span className="size">{row.size}px</span>
                <span style={{ fontFamily: row.font, fontSize: row.size, fontWeight: row.weight, letterSpacing: row.ls, color: 'var(--navy)', lineHeight: 1.2 }}>{row.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LOGO USAGE ========== */}
      <section className="brand-section">
        <div className="container">
          <div className="brand-section-label" id="logos"><span>Logo Usage</span></div>
          <h2 className="brand-h2">Logo Variants</h2>
          <p className="brand-desc">
            The Strategia triangle mark symbolizes stability and forward momentum. The wordmark uses a distinctive serif
            typeface with crossbar-less A characters.
          </p>

          <div className="brand-grid brand-grid--logos" style={{ marginBottom: 48 }}>
            {logos.map((logo) => (
              <div key={logo.label} className="brand-logo-card">
                <div className="brand-logo-preview" style={{ background: logo.bg }}>
                  <img src={logo.src} alt={logo.label} style={{ objectFit: 'contain', maxHeight: 100, maxWidth: 200 }} />
                </div>
                <div className="brand-logo-label">{logo.label}</div>
              </div>
            ))}
          </div>

          {/* Do / Don't */}
          <h3 className="brand-group-label">Logo Rules</h3>
          <div className="brand-rules">
            <div className="brand-rule-card">
              <div className="brand-rule-header">
                <span className="brand-rule-icon brand-rule-icon--do">&#10003;</span>
                <span className="brand-rule-title">Do</span>
              </div>
              <ul className="brand-rule-list">
                {['Use approved color variants only', 'Maintain minimum clear space (S-height around all edges)', 'Use on solid or simple gradient backgrounds', 'Scale proportionally'].map((d) => (
                  <li key={d}><span style={{ color: 'var(--signal)' }}>&#8226;</span>{d}</li>
                ))}
              </ul>
            </div>
            <div className="brand-rule-card">
              <div className="brand-rule-header">
                <span className="brand-rule-icon brand-rule-icon--dont">&#10005;</span>
                <span className="brand-rule-title">Don&apos;t</span>
              </div>
              <ul className="brand-rule-list">
                {['Change brand colors', 'Rotate or angle the logo', 'Add drop shadows', 'Apply transparency', 'Stretch or distort', 'Resize icon vs wordmark independently'].map((d) => (
                  <li key={d}><span style={{ color: 'var(--rose)' }}>&#10005;</span>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SPACING & RADII ========== */}
      <section className="brand-section--alt">
        <div className="container">
          <div className="brand-section-label" id="spacing"><span>Spacing &amp; Radii</span></div>
          <h2 className="brand-h2" style={{ marginBottom: 48 }}>Spacing Scale</h2>

          <div className="brand-spacing-blocks">
            {spacingScale.map((s) => (
              <div key={s} className="brand-spacing-item">
                <div style={{ width: s, height: s, background: 'var(--navy)', borderRadius: Math.min(s / 4, 8), opacity: 0.8 }} />
                <span>{s}</span>
              </div>
            ))}
          </div>

          <h3 className="brand-group-label" style={{ marginBottom: 20 }}>Border Radius</h3>
          <div className="brand-grid brand-grid--radii" style={{ marginBottom: 0 }}>
            {radii.map((r) => (
              <div key={r.name} className="brand-radius-card">
                <div className="brand-radius-preview" style={{ borderRadius: r.value }} />
                <div className="brand-radius-name">{r.name}</div>
                <div className="brand-radius-value">{r.value}</div>
                <div className="brand-radius-var">{r.var}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="brand-footer">
        <p>STRATEGIA DESIGN SYSTEM v1.0</p>
      </div>
    </div>
  )
}
