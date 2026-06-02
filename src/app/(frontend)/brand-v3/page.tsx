'use client'

import { useState, useCallback } from 'react'
import './brand.css'

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1600)
  }, [])
  return { copied, copy }
}

function CopyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* -------------------------------------------------------
   DATA — Brand V3: Teal Aurora
   ------------------------------------------------------- */

const colors = {
  primary: [
    { name: 'Harbour', hex: '#0B6477', rgb: 'R11 G100 B119', cssVar: '--harbour', dark: true, desc: 'Deep teal anchor. Page background base, section anchors, and footer tones.' },
    { name: 'Viridian', hex: '#00897B', rgb: 'R0 G137 B123', cssVar: '--viridian', dark: true, desc: 'Mid-teal. Accent bars, slider thumbs, and converge dots.' },
  ],
  secondary: [
    { name: 'Teal', hex: '#00C9B7', rgb: 'R0 G201 B183', cssVar: '--teal', dark: false, desc: 'Bright cyan-teal. Gradient midpoints and background washes.' },
    { name: 'Mint', hex: '#4AE2B7', rgb: 'R74 G226 B183', cssVar: '--mint', dark: false, desc: 'Vivid mint. Hero gradient highlights and marquee accents.' },
    { name: 'Aqua', hex: '#56C8C3', rgb: 'R86 G200 B195', cssVar: '--aqua', dark: false, desc: 'Soft aqua. Secondary gradient stops and glow tones.' },
  ],
  neutral: [
    { name: 'White', hex: '#FFFFFF', rgb: 'R255 G255 B255', cssVar: '--white', dark: false, desc: 'Primary text on teal backgrounds. Also cursor aura and plasma glow base.' },
    { name: 'Navy', hex: '#06293E', rgb: 'R6 G41 B62', cssVar: '--navy', dark: true, desc: 'Card text and headings on glassmorphic surfaces. Primary button fill.' },
  ],
  surface: [
    { name: 'Glass', hex: 'rgba(255,255,255,0.55)', rgb: 'White 55%', cssVar: '--glass', dark: false, desc: 'The signature glassmorphic surface. Cards, section panels, and stat rows. Always paired with backdrop-filter: blur(16px).' },
    { name: 'Glass Elevated', hex: 'rgba(255,255,255,0.62)', rgb: 'White 62%', cssVar: '--glass-elevated', dark: false, desc: 'Hover state for glass surfaces. Provides subtle lift on interaction.' },
    { name: 'Glass Subtle', hex: 'rgba(255,255,255,0.18)', rgb: 'White 18%', cssVar: '--glass-subtle', dark: false, desc: 'Hero copy box background. A lighter glass for overlaying the hero gradient.' },
  ],
}

const gradients = [
  {
    name: 'Teal Aurora',
    css: 'linear-gradient(160deg, #0B6477 0%, #00897B 18%, #00C9B7 38%, #4AE2B7 58%, #56C8C3 72%, #00C9B7 88%, #0B6477 100%)',
    stops: ['#0B6477', '#00897B', '#00C9B7', '#4AE2B7', '#56C8C3'],
    label: 'Primary Page Gradient',
    desc: 'The signature 7-stop page gradient (wraps back to origin). Used as the full-page background and hero backdrop. Creates the luminous, underwater-light atmosphere.',
  },
  {
    name: 'Hero Bloom',
    css: 'linear-gradient(135deg, #0B6477 0%, #00897B 25%, #00C9B7 50%, #4AE2B7 75%, #56C8C3 100%)',
    stops: ['#0B6477', '#00897B', '#00C9B7', '#4AE2B7', '#56C8C3'],
    label: 'Hero Background',
    desc: 'A 5-stop directional gradient for the hero section. Overlaid with soft radial white glows for depth.',
  },
  {
    name: 'Marquee Band',
    css: 'linear-gradient(135deg, #4AE2B7 0%, #56C8C3 40%, #0B6477 100%)',
    stops: ['#4AE2B7', '#56C8C3', '#0B6477'],
    label: 'Marquee / Banner Gradient',
    desc: 'Vivid accent gradient for the scrolling marquee strip. Transitions from bright mint to deep teal.',
  },
  {
    name: 'Accent Bar',
    css: 'linear-gradient(90deg, #00897B, rgba(0,137,123,0.5), rgba(0,137,123,0.2))',
    stops: ['#00897B', 'rgba(0,137,123,0.5)', 'rgba(0,137,123,0.2)'],
    label: 'Interactive Accent',
    desc: 'A 3px directional bar that appears on hover. Used on module cards (top edge) and solution cards (left edge) to signal interactivity.',
  },
]

const textHierarchy = [
  { role: 'H1', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: 'clamp(2.5rem, 6.4vw, 5.6rem)', weight: 400, ls: '-0.035em', lh: 0.98, color: '#FFFFFF', label: 'White', sample: 'Predict better hires', ctx: 'gradient', tt: undefined as 'uppercase' | undefined },
  { role: 'Hero Sub', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: 'clamp(1.1rem, 1.5vw, 1.25rem)', weight: 500, ls: '0', lh: 1.5, color: 'rgba(255,255,255,0.95)', label: 'White 95%', sample: 'Supporting headline text on the gradient', ctx: 'gradient', tt: undefined as 'uppercase' | undefined },
  { role: 'H2', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: 'clamp(1.75rem, 3.4vw, 2.75rem)', weight: 400, ls: '-0.025em', lh: 1.1, color: '#06293E', label: 'Navy', sample: 'Section heading', ctx: 'glass', tt: undefined as 'uppercase' | undefined },
  { role: 'Card Title', font: 'Inter Tight', ff: 'var(--font-inter-tight, Inter Tight, system-ui, sans-serif)', size: '18px', weight: 600, ls: '-0.01em', lh: 1.3, color: '#06293E', label: 'Navy', sample: 'Resume Intelligence Engine', ctx: 'glass', tt: undefined as 'uppercase' | undefined },
  { role: 'Body', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: '16px', weight: 400, ls: '0', lh: 1.7, color: 'rgba(6,41,62,0.88)', label: 'Navy 88%', sample: 'Paragraph and description text on glass surfaces', ctx: 'glass', tt: undefined as 'uppercase' | undefined },
  { role: 'Small', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: '14px', weight: 500, ls: '0', lh: 1.6, color: 'rgba(6,41,62,0.88)', label: 'Navy 88%', sample: 'Solution body, links, and supporting copy', ctx: 'glass', tt: undefined as 'uppercase' | undefined },
  { role: 'Stat Value', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: 'clamp(2rem, 3.5vw, 2.5rem)', weight: 400, ls: '-0.02em', lh: 1, color: '#06293E', label: 'Navy', sample: '94%', ctx: 'glass', tt: undefined as 'uppercase' | undefined },
  { role: 'Stat Label', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: '14px', weight: 400, ls: '0', lh: 1.4, color: '#06293E', label: 'Navy', sample: 'Prediction accuracy across roles', ctx: 'glass', tt: undefined as 'uppercase' | undefined },
  { role: 'Stat Sub', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: '12px', weight: 400, ls: '0', lh: 1.4, color: 'rgba(6,41,62,0.88)', label: 'Navy 88%', sample: 'Based on 14,000+ validated hires', ctx: 'glass', tt: undefined as 'uppercase' | undefined },
  { role: 'Eyebrow', font: 'JetBrains Mono', ff: 'var(--font-mono, JetBrains Mono, monospace)', size: '11px', weight: 600, ls: '0.14em', lh: 1.5, color: 'rgba(6,41,62,0.72)', label: 'Navy 72%', sample: 'THE SCIENCE', ctx: 'glass', tt: 'uppercase' as 'uppercase' | undefined },
  { role: 'Micro', font: 'JetBrains Mono', ff: 'var(--font-mono, JetBrains Mono, monospace)', size: '10px', weight: 500, ls: '0.14em', lh: 1.5, color: 'rgba(6,41,62,0.72)', label: 'Navy 72%', sample: 'MODULE 01 — RÉSUMÉ INTELLIGENCE', ctx: 'glass', tt: 'uppercase' as 'uppercase' | undefined },
]

const surfaces = [
  { name: 'Section Panel', bg: 'rgba(255,255,255,0.55)', blur: '16px', border: 'rgba(255,255,255,0.18)', radius: '24px', mockTitle: 'The Science', mockText: 'How AI-native signal triangulation predicts candidate success across healthcare roles.', light: false, stat: false, desc: 'Main content sections. Provides the frosted-glass enclosure for all content areas.' },
  { name: 'Card', bg: 'rgba(255,255,255,0.55)', blur: '16px', border: 'rgba(255,255,255,0.18)', radius: '16px', mockTitle: 'Resume Intelligence', mockText: 'Extracts 140+ structured signals from unstructured resumes.', light: false, stat: false, desc: 'Module cards, stat cards, and badge items. Hover lifts to 0.62 opacity.' },
  { name: 'Signal Chip', bg: 'rgba(255,255,255,0.45)', blur: 'none', border: 'rgba(255,255,255,0.15)', radius: '12px', mockTitle: 'Parse Signal', mockText: '', light: false, stat: false, desc: 'Small indicator chips inside the triangulate section.' },
  { name: 'Hero Copy', bg: 'rgba(255,255,255,0.18)', blur: '18px', border: 'none', radius: '20px', mockTitle: 'Predict better hires', mockText: 'AI-powered workforce intelligence for healthcare.', light: true, stat: false, desc: 'The headline container overlaying the hero gradient. Uses lighter glass for readability.' },
  { name: 'ROI Output', bg: 'rgba(255,255,255,0.55)', blur: '16px', border: 'rgba(255,255,255,0.2)', radius: '20px', mockTitle: '$2.4M', mockText: 'Projected annual savings', light: false, stat: true, desc: 'Calculator output display with a soft shadow: 0 8px 32px -8px rgba(0,0,0,0.06).' },
]

const effects = [
  { name: 'Cursor Aura', desc: 'A 520px radial white glow (rgba 255,255,255 at 0.40→0) that follows the mouse. Uses mix-blend-mode: screen and filter: blur(10px). Fades on touch/reduced-motion devices.' },
  { name: 'Plasma Blobs', desc: 'Floating white radial gradient circles (same gradient as cursor aura) that drift across the page using cubic-bezier easing. Hidden on mobile/reduced-motion.' },
  { name: 'Pulse Rings', desc: 'Expanding concentric circles with a ring-shaped radial gradient (transparent center, white band at 62-76%, fade out). Mix-blend-mode: screen.' },
  { name: 'Scroll Reveal', desc: 'Elements fade in from 24px below with opacity 0→1, using cubic-bezier(0.16, 1, 0.3, 1) over 0.7s. Triggered by IntersectionObserver.' },
  { name: 'Nav Appear', desc: 'Fixed nav starts at opacity 0, becomes visible after hero animation completes. On scroll, gains glass background (rgba 255,255,255,0.55) with blur(20px) and logo mark spins 1080deg.' },
  { name: 'Accent Bars', desc: 'Module cards show a 3px top gradient bar on hover; solution cards show a 3px left gradient bar. Both use the Accent Bar gradient with opacity 0→1 transition.' },
  { name: 'Marquee', desc: 'Infinite horizontal scroll at 40s duration, linear timing. White dot indicators (6px) with box-shadow glow. Track masked at edges with a fade gradient.' },
  { name: 'Tetrahedron', desc: '3D wireframe tetrahedron rendered to SVG. Follows cursor with inertia-damped rotation. Clicking locks it and reveals the brand wordmark. Wire color blends from white (front) to teal-tinted white (back: rgb 200,230,225).' },
]

const spacingScale = [4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 72, 96, 128, 180]

const radii = [
  { name: 'Button', value: '6px' },
  { name: 'Tag', value: '4px' },
  { name: 'Signal', value: '12px' },
  { name: 'Card', value: '16px' },
  { name: 'Hero Copy', value: '20px' },
  { name: 'Section', value: '24px' },
  { name: 'Pill', value: '999px' },
]

const navItems = [
  { id: 'logo', label: 'Logo' },
  { id: 'colors', label: 'Colors' },
  { id: 'gradients', label: 'Gradients' },
  { id: 'typography', label: 'Typography' },
  { id: 'surfaces', label: 'Surfaces' },
  { id: 'effects', label: 'Effects' },
  { id: 'spacing', label: 'Spacing' },
]

export default function BrandV3Page() {
  const { copied, copy } = useCopy()

  return (
    <div className="bv3-root">
      {/* ========== HERO ========== */}
      <section className="bv3-hero">
        <div className="bv3-hero-gradient" />
        <div className="bv3-hero-glow" />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <p className="bv3-hero-eyebrow">Brand Guidelines v3.0</p>
          <h1 className="bv3-hero-title">Teal Aurora<br />Design System</h1>
          <p className="bv3-hero-sub">
            The light, luminous visual identity for Strategia.
            Glassmorphic surfaces on a vivid teal gradient — energetic, modern, and approachable.
          </p>
          <div className="bv3-nav-pills">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="bv3-nav-pill">{n.label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LOGO & BRAND MARK ========== */}
      <section className="bv3-section">
        <div className="container">
          <div className="bv3-section-label" id="logo"><span>Logo &amp; Brand Mark</span></div>
          <h2 className="bv3-h2">Logo &amp; Brand Mark</h2>
          <p className="bv3-desc">
            Three elements compose the Strategia identity system: the triangle brand mark,
            the wordmark, and the combined logo. Below are the variants used across the
            Teal Aurora landing page.
          </p>

          {/* 1. Brand Mark */}
          <h3 className="bv3-group-label">Brand Mark</h3>
          <div className="bv3-logo-hero">
            <div className="bv3-logo-hero-card bv3-logo-hero-card--dark" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="120" height="120" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L36 34H4L20 4Z" stroke="#FFFFFF" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div className="bv3-logo-hero-card bv3-logo-hero-card--light" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="120" height="120" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L36 34H4L20 4Z" stroke="#06293E" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>
          <p className="bv3-clearspace-note">
            The standalone brand mark. Used in the navigation bar where it animates on scroll.
          </p>

          {/* 2. Wordmark */}
          <h3 className="bv3-group-label">Wordmark</h3>
          <div className="bv3-logo-hero">
            <div className="bv3-logo-hero-card bv3-logo-hero-card--dark">
              <img src="/images/brand/strategia-wordmark-white.svg" alt="Strategia wordmark, white on teal gradient" />
            </div>
            <div className="bv3-logo-hero-card bv3-logo-hero-card--light">
              <img src="/images/brand/strategia-wordmark-abyss.svg" alt="Strategia wordmark, abyss on white" />
            </div>
          </div>
          <p className="bv3-clearspace-note">
            The wordmark without the brand mark. Used in the navigation bar alongside the triangle and in the hero brand lockup.
          </p>

          {/* 3. Combined Logo — Inline */}
          <h3 className="bv3-group-label">Combined Logo &mdash; Inline</h3>
          <div className="bv3-logo-hero">
            <div className="bv3-logo-hero-card bv3-logo-hero-card--dark">
              <img src="/images/brand/solid/inline/strategia-inline-white.png" alt="Strategia combined inline logo, white on teal gradient" />
            </div>
            <div className="bv3-logo-hero-card bv3-logo-hero-card--light">
              <img src="/images/brand/solid/inline/strategia-inline-abyss.png" alt="Strategia combined inline logo, abyss on white" />
            </div>
          </div>
          <p className="bv3-clearspace-note">
            The primary combined logo. The abyss variant is used in the CTA section.
          </p>

          {/* 4. Combined Logo — Stacked */}
          <h3 className="bv3-group-label">Combined Logo &mdash; Stacked</h3>
          <div className="bv3-logo-hero">
            <div className="bv3-logo-hero-card bv3-logo-hero-card--dark">
              <img src="/images/brand/solid/stacked/strategia-stacked-white.png" alt="Strategia combined stacked logo, white on teal gradient" />
            </div>
            <div className="bv3-logo-hero-card bv3-logo-hero-card--light">
              <img src="/images/brand/solid/stacked/strategia-stacked-abyss.png" alt="Strategia combined stacked logo, abyss on white" />
            </div>
          </div>
          <p className="bv3-clearspace-note">
            The stacked layout for vertical or compact placements.
          </p>

          {/* 5. Glow Treatment */}
          <h3 className="bv3-group-label">Glow Treatment</h3>
          <div className="bv3-logo-hero" style={{ gridTemplateColumns: '1fr' }}>
            <div className="bv3-logo-hero-card bv3-logo-hero-card--dark">
              <img src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png" alt="Strategia inline logo, white glow treatment" />
            </div>
          </div>
          <p className="bv3-clearspace-note">
            The glow variant with a soft luminous halo. Used in the footer.
          </p>

          {/* 6. Clear Space & Minimum Size */}
          <h3 className="bv3-group-label">Clear Space &amp; Minimum Size</h3>
          <div className="bv3-clearspace">
            <div className="bv3-clearspace-demo">
              <div className="bv3-clearspace-inner">
                <span className="bv3-clearspace-label bv3-clearspace-label--top">x</span>
                <span className="bv3-clearspace-label bv3-clearspace-label--side">x</span>
                <img src="/images/brand/solid/inline/strategia-inline-white.png" alt="Strategia logo with clear space indicators" />
              </div>
            </div>
            <p className="bv3-clearspace-note">
              Minimum clear space equals the height of the brand mark (triangle) on all sides.
              Minimum reproduction width: 120px for inline, 80px for stacked.
            </p>
          </div>

        </div>
      </section>

      {/* ========== COLORS ========== */}
      <section className="bv3-section">
        <div className="container">
          <div className="bv3-section-label" id="colors"><span>Colors</span></div>
          <h2 className="bv3-h2">Color Palette</h2>
          <p className="bv3-desc">
            A teal-forward palette. The gradient background provides the warmth; glass surfaces and navy text provide contrast and legibility.
          </p>

          {(Object.entries(colors) as [string, typeof colors.primary][]).map(([group, items]) => (
            <div key={group}>
              <h3 className="bv3-group-label">{group}</h3>
              <div className="bv3-grid bv3-grid--colors">
                {items.map((c) => (
                  <div key={c.hex + c.name} className="bv3-color-card">
                    <div className="bv3-color-swatch" style={{ background: c.hex }}>
                      <span className="bv3-color-swatch-name" style={{ color: c.dark ? '#fff' : '#06293E' }}>{c.name}</span>
                    </div>
                    <div className="bv3-color-info">
                      <div className="bv3-color-chips">
                        <button className="bv3-chip" onClick={() => copy(c.hex)}>
                          {copied === c.hex ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                          <span>{c.hex}</span>
                        </button>
                        <button className="bv3-chip" onClick={() => copy(c.rgb)}>
                          {copied === c.rgb ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                          <span>{c.rgb}</span>
                        </button>
                        <button className="bv3-chip" onClick={() => copy(c.cssVar)}>
                          {copied === c.cssVar ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                          <span>{c.cssVar}</span>
                        </button>
                      </div>
                      <p className="bv3-color-desc">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ========== GRADIENTS ========== */}
      <section className="bv3-section--alt">
        <div className="container">
          <div className="bv3-section-label" id="gradients"><span>Gradients</span></div>
          <h2 className="bv3-h2">Signature Gradients</h2>
          <p className="bv3-desc">
            Four gradients define the Teal Aurora language. Click any preview to copy the CSS value.
          </p>

          <div className="bv3-gradient-grid">
            {gradients.map((g) => (
              <div key={g.name} className="bv3-gradient-card">
                <div className="bv3-gradient-preview" style={{ background: g.css }} onClick={() => copy(g.css)}>
                  <span className="bv3-gradient-copy-overlay">
                    {copied === g.css ? <><CheckIcon size={16} /> Copied CSS</> : <><CopyIcon size={16} /> Click to copy CSS</>}
                  </span>
                </div>
                <div className="bv3-gradient-body">
                  <div className="bv3-gradient-title-row">
                    <h3>{g.name}</h3>
                    <code>{g.label}</code>
                  </div>
                  <p className="bv3-gradient-desc">{g.desc}</p>
                  <div className="bv3-gradient-stops">
                    {g.stops.map((stop) => (
                      <button key={stop} className="bv3-gradient-stop" onClick={() => copy(stop)}>
                        <span className="bv3-gradient-stop-dot" style={{ background: stop }} />
                        <code>{stop}</code>
                        {copied === stop ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TYPOGRAPHY ========== */}
      <section className="bv3-section">
        <div className="container">
          <div className="bv3-section-label" id="typography"><span>Typography</span></div>
          <h2 className="bv3-h2">Typography</h2>
          <p className="bv3-desc">
            Three font families — Inter, Inter Tight, and JetBrains Mono — combined with specific sizes, weights, and colors to create a clear visual hierarchy. Each role is shown below at its actual rendering style.
          </p>

          <div className="bv3-hierarchy-list">
            {textHierarchy.map((t) => (
              <div key={t.role} className="bv3-hierarchy-card">
                <div className={`bv3-hierarchy-demo ${t.ctx === 'gradient' ? 'bv3-hierarchy-demo--gradient' : 'bv3-hierarchy-demo--glass'}`}>
                  <p style={{
                    fontFamily: t.ff,
                    fontSize: t.size,
                    fontWeight: t.weight,
                    letterSpacing: t.ls,
                    lineHeight: t.lh,
                    color: t.color,
                    textTransform: t.tt,
                    margin: 0,
                  }}>
                    {t.sample}
                  </p>
                </div>
                <div className="bv3-hierarchy-meta">
                  <span className="bv3-hierarchy-role">{t.role}</span>
                  <div className="bv3-hierarchy-chips">
                    <button className="bv3-chip" onClick={() => copy(t.font)}>
                      {copied === t.font ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                      <span>{t.font}</span>
                    </button>
                    <button className="bv3-chip" onClick={() => copy(t.size)}>
                      {copied === t.size ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                      <span>{t.size}</span>
                    </button>
                    <button className="bv3-chip" onClick={() => copy(String(t.weight))}>
                      {copied === String(t.weight) ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                      <span>w{t.weight}</span>
                    </button>
                    <button className="bv3-chip" onClick={() => copy(t.color)}>
                      {copied === t.color ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                      <span>{t.label}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SURFACES ========== */}
      <section className="bv3-section--alt">
        <div className="container">
          <div className="bv3-section-label" id="surfaces"><span>Surfaces &amp; Glass</span></div>
          <h2 className="bv3-h2">Glassmorphic Surfaces</h2>
          <p className="bv3-desc">
            The defining visual feature: frosted-glass panels layered over the teal gradient.
            Every content surface uses white-alpha backgrounds with backdrop-filter blur.
          </p>

          <div className="bv3-surfaces-grid">
            {surfaces.map((s) => (
              <div key={s.name} className="bv3-surface-item">
                <div className="bv3-surface-backdrop">
                  <div className="bv3-surface-mock" style={{
                    background: s.bg,
                    backdropFilter: s.blur !== 'none' ? `blur(${s.blur})` : undefined,
                    WebkitBackdropFilter: s.blur !== 'none' ? `blur(${s.blur})` : undefined,
                    border: s.border !== 'none' ? `1px solid ${s.border}` : undefined,
                    borderRadius: s.radius,
                  }}>
                    <p style={{
                      fontFamily: s.stat ? 'var(--font-inter, Inter, system-ui, sans-serif)' : 'var(--font-inter-tight, Inter Tight, system-ui, sans-serif)',
                      fontSize: s.stat ? 'clamp(1.75rem, 3vw, 2.25rem)' : '18px',
                      fontWeight: s.stat ? 400 : 600,
                      letterSpacing: s.stat ? '-0.02em' : '-0.01em',
                      color: s.light ? '#FFFFFF' : '#06293E',
                      lineHeight: 1.2, margin: 0,
                    }}>
                      {s.mockTitle}
                    </p>
                    {s.mockText && (
                      <p style={{
                        fontSize: 14, lineHeight: 1.6, margin: '8px 0 0',
                        color: s.light ? 'rgba(255,255,255,0.9)' : 'rgba(6,41,62,0.88)',
                      }}>
                        {s.mockText}
                      </p>
                    )}
                  </div>
                </div>
                <div className="bv3-surface-meta">
                  <div className="bv3-surface-meta-row">
                    <h4>{s.name}</h4>
                    <div className="bv3-surface-specs">
                      <button className="bv3-chip" onClick={() => copy(s.bg)}>
                        {copied === s.bg ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                        <span>{s.bg}</span>
                      </button>
                      {s.blur !== 'none' && (
                        <button className="bv3-chip" onClick={() => copy(`backdrop-filter: blur(${s.blur})`)}>
                          {copied === `backdrop-filter: blur(${s.blur})` ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                          <span>blur({s.blur})</span>
                        </button>
                      )}
                      <button className="bv3-chip" onClick={() => copy(s.radius)}>
                        {copied === s.radius ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                        <span>{s.radius}</span>
                      </button>
                    </div>
                  </div>
                  <p className="bv3-surface-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== EFFECTS ========== */}
      <section className="bv3-section">
        <div className="container">
          <div className="bv3-section-label" id="effects"><span>Effects &amp; Motion</span></div>
          <h2 className="bv3-h2">Visual Effects</h2>
          <p className="bv3-desc">
            Ambient motion and interactive feedback create a living, breathing visual experience.
            All effects use mix-blend-mode: screen and respect prefers-reduced-motion.
          </p>

          <div className="bv3-effects-grid">
            {effects.map((e) => (
              <div key={e.name} className="bv3-effect-card">
                <h4>{e.name}</h4>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SPACING & RADII ========== */}
      <section className="bv3-section--alt">
        <div className="container">
          <div className="bv3-section-label" id="spacing"><span>Spacing &amp; Radii</span></div>
          <h2 className="bv3-h2">Spacing Scale</h2>
          <p className="bv3-desc">
            A 16-step scale from 4px micro-gaps to 180px section padding. Click to copy.
          </p>

          <div className="bv3-spacing-blocks">
            {spacingScale.map((s) => (
              <div key={s} className="bv3-spacing-item" onClick={() => copy(`${s}px`)} style={{ cursor: 'pointer' }}>
                <div style={{ width: Math.min(s, 80), height: Math.min(s, 80), background: '#0B6477', borderRadius: Math.min(s / 4, 8), opacity: 0.85 }} />
                <span>{copied === `${s}px` ? 'Copied' : `${s}`}</span>
              </div>
            ))}
          </div>

          <h3 className="bv3-group-label" style={{ marginBottom: 20 }}>Border Radius</h3>
          <div className="bv3-grid bv3-grid--radii">
            {radii.map((r) => (
              <div key={r.name} className="bv3-radius-card" onClick={() => copy(r.value)} style={{ cursor: 'pointer' }}>
                <div className="bv3-radius-preview" style={{ borderRadius: r.value }} />
                <div className="bv3-radius-name">{r.name}</div>
                <div className="bv3-radius-value">{copied === r.value ? 'Copied!' : r.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DESIGN PRINCIPLES ========== */}
      <section className="bv3-section">
        <div className="container">
          <div className="bv3-section-label"><span>Principles</span></div>
          <h2 className="bv3-h2">Design Principles</h2>
          <div className="bv3-principles-grid">
            <div className="bv3-principle">
              <h4>Glass Over Gradient</h4>
              <p>Every content surface floats on the teal gradient via white-alpha glassmorphism. Never use opaque backgrounds — the gradient must breathe through.</p>
            </div>
            <div className="bv3-principle">
              <h4>Navy on Glass</h4>
              <p>Text on glass surfaces uses #06293E (Navy) at full or reduced opacity. White text is reserved for content sitting directly on the gradient (hero, marquee, footer).</p>
            </div>
            <div className="bv3-principle">
              <h4>White Glow Effects</h4>
              <p>All ambient effects (cursor aura, plasma, pulses) use white radial gradients with mix-blend-mode: screen. This keeps them harmonious against any teal tone.</p>
            </div>
            <div className="bv3-principle">
              <h4>Subtle Interaction</h4>
              <p>Hover states are gentle: opacity lifts (0.55→0.62), border brightening, and 3px accent bar reveals. No aggressive transforms or scale changes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="bv3-footer">
        <p>STRATEGIA DESIGN SYSTEM v3.0 — TEAL AURORA</p>
      </div>
    </div>
  )
}
