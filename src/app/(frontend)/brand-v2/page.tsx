'use client'

import { useState, useCallback, useRef } from 'react'
import './brand.css'
/* eslint-disable @next/next/no-img-element */

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1600)
  }, [])
  return { copied, copy }
}

function downloadFile(url: string, filename: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function downloadSvgBlob(svgMarkup: string, filename: string) {
  const blob = new Blob([svgMarkup], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  downloadFile(url, filename)
  URL.revokeObjectURL(url)
}

function CopyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function DownloadIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M8 2v8m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

function makeTriangleSvg(color: string, stroke = 7): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 174" width="200" height="174" fill="none">
  <polygon points="100,8 8,170 192,170" stroke="${color}" stroke-width="${stroke}" stroke-linejoin="round" fill="none"/>
</svg>`
}

/* -------------------------------------------------------
   DATA — New Brand (May 2026)
   ------------------------------------------------------- */

const colors = {
  primary: [
    { name: 'Abyss', hex: '#06293E', rgb: 'R6 G41 B62', cssVar: '--abyss', dark: true, desc: 'Deep navy primary. Headlines, hero backgrounds, and anchor sections.' },
    { name: 'Black', hex: '#1C1C1C', rgb: 'R28 G28 B28', cssVar: '--black', dark: true, desc: 'True dark. Text on light backgrounds and high-contrast elements.' },
  ],
  secondary: [
    { name: 'Harbour', hex: '#0B6477', rgb: 'R11 G100 B119', cssVar: '--harbour', dark: true, desc: 'Deep teal. Secondary headings, links, and accent surfaces.' },
    { name: 'Teal', hex: '#00C9B7', rgb: 'R0 G201 B183', cssVar: '--teal', dark: false, desc: 'Bright cyan. CTAs, highlights, interactive elements.' },
  ],
  accent: [
    { name: 'Lime', hex: '#8FD4A8', rgb: 'R143 G212 B168', cssVar: '--lime', dark: false, desc: 'Soft mint. Supporting highlights, success states, tags.' },
  ],
  neutral: [
    { name: 'Silver', hex: '#ECEDEB', rgb: 'R236 G237 B235', cssVar: '--silver', dark: false, desc: 'Light neutral. Page backgrounds and card surfaces.' },
    { name: 'Steel', hex: '#BFBFBE', rgb: 'R191 G191 B190', cssVar: '--steel', dark: false, desc: 'Mid-tone neutral. Borders, dividers, and metadata.' },
    { name: 'White', hex: '#FFFFFF', rgb: 'R255 G255 B255', cssVar: '--white', dark: false, desc: 'Pure white. Card backgrounds and text on dark.' },
  ],
}

const gradients = [
  {
    name: 'Dark Blue',
    css: 'linear-gradient(135deg, #1C1C1C, #00192E, #003D6B, #006988, #5CC8B8)',
    stops: ['#1C1C1C', '#00192E', '#003D6B', '#006988', '#5CC8B8'],
    label: 'Primary Brand Gradient',
    desc: 'The signature 5-stop gradient. Used on hero sections, feature backgrounds, and immersive surfaces.',
    img: '/images/brand/gradients/gradients-dark-blue-gradient.png',
  },
  {
    name: 'Teal',
    css: 'linear-gradient(135deg, #4AE2B7, #56C8C3)',
    stops: ['#4AE2B7', '#56C8C3'],
    label: 'Accent Gradient',
    desc: 'The vibrant teal accent gradient. Used for CTAs, badges, and energy highlights.',
    img: '/images/brand/gradients/gradients-teal-gradient.png',
  },
]

type LogoLayout = 'stacked' | 'inline'

const logoCategories = [
  {
    name: 'Gradient Mark',
    desc: 'The triangle icon uses a gradient fill while the wordmark remains solid. The primary treatment for digital applications.',
    logos: [
      { src: '/images/brand/gradient-mark/stacked/strategia-stacked-blue-gradient-+-white-text.png', label: 'Blue Gradient + White', bg: '#06293E', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/gradient-mark/stacked/strategia-stacked-blue-gradient-+-navy-text.png', label: 'Blue Gradient + Navy', bg: '#ECEDEB', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/gradient-mark/stacked/strategia-stacked-blue-gradient-+-black-text.png', label: 'Blue Gradient + Black', bg: '#FFFFFF', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/gradient-mark/stacked/strategia-stacked-teal-gradient-+-white-text.png', label: 'Teal Gradient + White', bg: '#06293E', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/gradient-mark/stacked/strategia-stacked-teal-gradient-+-black-text.png', label: 'Teal Gradient + Black', bg: '#ECEDEB', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/gradient-mark/inline/strategia-inline-blue-gradient-+-white-text.png', label: 'Inline Blue + White', bg: '#06293E', layout: 'inline' as LogoLayout },
      { src: '/images/brand/gradient-mark/inline/strategia-inline-blue-gradient-+-navy-text.png', label: 'Inline Blue + Navy', bg: '#ECEDEB', layout: 'inline' as LogoLayout },
      { src: '/images/brand/gradient-mark/inline/strategia-inline-teal-gradient-+-white-text.png', label: 'Inline Teal + White', bg: '#06293E', layout: 'inline' as LogoLayout },
      { src: '/images/brand/gradient-mark/inline/strategia-inline-teal-gradient-+-black-text.png', label: 'Inline Teal + Black', bg: '#FFFFFF', layout: 'inline' as LogoLayout },
      { src: '/images/brand/gradient-mark/inline/strategia-inline-blue-gradient-+-black-text.png', label: 'Inline Blue + Black', bg: '#FFFFFF', layout: 'inline' as LogoLayout },
    ],
  },
  {
    name: 'Solid Colour',
    desc: 'Monochromatic logo versions for print, merchandise, small sizes, and contexts where gradients are not suited.',
    logos: [
      { src: '/images/brand/solid/stacked/strategia-stacked-abyss.png', label: 'Stacked Abyss', bg: '#ECEDEB', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/solid/stacked/strategia-stacked-white.png', label: 'Stacked White', bg: '#06293E', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/solid/stacked/strategia-stacked-harbour.png', label: 'Stacked Harbour', bg: '#ECEDEB', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/solid/stacked/strategia-stacked-teal.png', label: 'Stacked Teal', bg: '#06293E', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/solid/stacked/strategia-stacked-lime.png', label: 'Stacked Lime', bg: '#06293E', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/solid/stacked/strategia-stacked-black.png', label: 'Stacked Black', bg: '#FFFFFF', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/solid/inline/strategia-inline-abyss.png', label: 'Inline Abyss', bg: '#ECEDEB', layout: 'inline' as LogoLayout },
      { src: '/images/brand/solid/inline/strategia-inline-white.png', label: 'Inline White', bg: '#06293E', layout: 'inline' as LogoLayout },
      { src: '/images/brand/solid/inline/strategia-inline-harbour.png', label: 'Inline Harbour', bg: '#ECEDEB', layout: 'inline' as LogoLayout },
      { src: '/images/brand/solid/inline/strategia-inline-teal.png', label: 'Inline Teal', bg: '#06293E', layout: 'inline' as LogoLayout },
      { src: '/images/brand/solid/inline/strategia-inline-lime.png', label: 'Inline Lime', bg: '#06293E', layout: 'inline' as LogoLayout },
      { src: '/images/brand/solid/inline/strategia-inline-black.png', label: 'Inline Black', bg: '#FFFFFF', layout: 'inline' as LogoLayout },
    ],
  },
  {
    name: 'Glow',
    desc: 'The stylised glow treatment for premium digital contexts. Best used on dark, immersive backgrounds with abstract imagery.',
    logos: [
      { src: '/images/brand/glow/stacked/strategia-stacked-white-glow.png', label: 'Stacked White Glow', bg: '#06293E', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/glow/stacked/strategia-stacked-light-blue-glow.png', label: 'Stacked Light Blue Glow', bg: '#06293E', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/glow/stacked/strategia-stacked-dark-blue-glow.png', label: 'Stacked Dark Blue Glow', bg: '#06293E', layout: 'stacked' as LogoLayout },
      { src: '/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png', label: 'Inline White Glow', bg: '#06293E', layout: 'inline' as LogoLayout },
      { src: '/images/brand/glow/inline/strategia-final-logo-strategia-inline-light-blue-glow.png', label: 'Inline Light Blue Glow', bg: '#06293E', layout: 'inline' as LogoLayout },
      { src: '/images/brand/glow/inline/strategia-final-logo-strategia-inline-dark-blue-glow.png', label: 'Inline Dark Blue Glow', bg: '#06293E', layout: 'inline' as LogoLayout },
    ],
  },
]

const triangleColors = [
  { name: 'Abyss', hex: '#06293E', bgPreview: '#ECEDEB' },
  { name: 'Black', hex: '#1C1C1C', bgPreview: '#ECEDEB' },
  { name: 'White', hex: '#FFFFFF', bgPreview: '#06293E' },
  { name: 'Harbour', hex: '#0B6477', bgPreview: '#ECEDEB' },
  { name: 'Teal', hex: '#00C9B7', bgPreview: '#06293E' },
  { name: 'Lime', hex: '#8FD4A8', bgPreview: '#06293E' },
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

const spacingScale = [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112]

const radii = [
  { name: 'xs', value: '6px', var: '--r-xs' },
  { name: 'sm', value: '10px', var: '--r-sm' },
  { name: 'md', value: '14px', var: '--r-md' },
  { name: 'lg', value: '20px', var: '--r-lg' },
  { name: 'xl', value: '28px', var: '--r-xl' },
  { name: 'pill', value: '999px', var: '--r-pill' },
]

const navItems = [
  { id: 'colors', label: 'Colors' },
  { id: 'gradients', label: 'Gradients' },
  { id: 'typography', label: 'Typography' },
  { id: 'logos', label: 'Logos' },
  { id: 'components', label: 'Components' },
  { id: 'rules', label: 'Logo Rules' },
  { id: 'spacing', label: 'Spacing' },
]

export default function BrandPage() {
  const { copied, copy } = useCopy()
  const [activeLogoCategory, setActiveLogoCategory] = useState(0)

  return (
    <div className="brand-root">
      {/* ========== HERO ========== */}
      <section className="brand-hero">
        <div className="brand-hero-gradient" />
        <div className="brand-hero-glow" />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <p className="brand-hero-eyebrow">Brand Guidelines v2.0</p>
          <h1 className="brand-hero-title">Strategia<br />Design System</h1>
          <p className="brand-hero-sub">
            The refreshed visual identity for Strategia Tech. Updated colors, gradients,
            logo suite, and typography -- everything you need to build on-brand.
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
            A calming yet brooding, professional palette. Click any value to copy it to your clipboard.
          </p>

          {(Object.entries(colors) as [string, typeof colors.primary][]).map(([group, items]) => (
            <div key={group}>
              <h3 className="brand-group-label">{group}</h3>
              <div className="brand-grid brand-grid--colors">
                {items.map((c) => (
                  <div key={c.hex + c.name} className="brand-color-card">
                    <div className="brand-color-swatch" style={{ background: c.hex }}>
                      <span className="brand-color-swatch-name" style={{ color: c.dark ? '#fff' : '#06293E' }}>{c.name}</span>
                    </div>
                    <div className="brand-color-info">
                      <div className="brand-color-chips">
                        <button className="brand-chip" onClick={() => copy(c.hex)}>
                          {copied === c.hex ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                          <span>{c.hex}</span>
                        </button>
                        <button className="brand-chip" onClick={() => copy(c.rgb)}>
                          {copied === c.rgb ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                          <span>{c.rgb}</span>
                        </button>
                        <button className="brand-chip" onClick={() => copy(c.cssVar)}>
                          {copied === c.cssVar ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                          <span>{c.cssVar}</span>
                        </button>
                      </div>
                      <p className="brand-color-desc">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== GRADIENTS ========== */}
      <section className="brand-section--alt">
        <div className="container">
          <div className="brand-section-label" id="gradients"><span>Gradients</span></div>
          <h2 className="brand-h2">Brand Gradients</h2>
          <p className="brand-desc">
            Two signature gradients define the Strategia visual language. Click the preview to copy the CSS, or download the reference image.
          </p>

          <div className="brand-gradient-grid">
            {gradients.map((g) => (
              <div key={g.name} className="brand-gradient-card-large">
                <div className="brand-gradient-preview-large" style={{ background: g.css }} onClick={() => copy(g.css)}>
                  <span className="brand-gradient-copy-overlay">
                    {copied === g.css ? <><CheckIcon size={16} /> Copied CSS</> : <><CopyIcon size={16} /> Click to copy CSS</>}
                  </span>
                </div>
                <div className="brand-gradient-body">
                  <div className="brand-gradient-title-row">
                    <h3>{g.name} Gradient</h3>
                    <code>{g.label}</code>
                  </div>
                  <p className="brand-gradient-desc">{g.desc}</p>
                  <div className="brand-gradient-actions">
                    <div className="brand-gradient-stops">
                      {g.stops.map((stop) => (
                        <button key={stop} className="brand-gradient-stop" onClick={() => copy(stop)}>
                          <span className="brand-gradient-stop-dot" style={{ background: stop }} />
                          <code>{stop}</code>
                          {copied === stop ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                        </button>
                      ))}
                    </div>
                    <button
                      className="brand-download-btn"
                      onClick={() => downloadFile(g.img, `strategia-${g.name.toLowerCase().replace(/ /g, '-')}-gradient.png`)}
                    >
                      <DownloadIcon size={14} />
                      <span>Download PNG</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TYPOGRAPHY ========== */}
      <section className="brand-section">
        <div className="container">
          <div className="brand-section-label" id="typography"><span>Typography</span></div>
          <h2 className="brand-h2">Typography</h2>
          <p className="brand-desc" style={{ marginBottom: 56 }}>
            Literata for headlines, Inter Tight for subheadings, Inter for body text, JetBrains Mono for code and labels.
          </p>

          {/* Literata */}
          <div style={{ marginBottom: 56 }}>
            <div className="brand-type-header">
              <h3 style={{ fontFamily: 'var(--font-display)' }}>Literata</h3>
              <span>--font-display / Headlines</span>
            </div>
            <div className="brand-type-card">
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 400, letterSpacing: '-0.03em', color: '#06293E', lineHeight: 1.1, margin: '0 0 24px' }}>
                The quick brown fox
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, letterSpacing: '-0.015em', color: '#06293E', lineHeight: 1.3, margin: '0 0 20px' }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.5, margin: 0 }}>
                abcdefghijklmnopqrstuvwxyz 0123456789 !@#$%&amp;*
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
              <p style={{ fontFamily: 'var(--font-tight)', fontSize: 32, fontWeight: 400, letterSpacing: '-0.01em', color: '#06293E', lineHeight: 1.2, margin: '0 0 16px' }}>
                Inter Tight Regular for subheadings
              </p>
              <p style={{ fontFamily: 'var(--font-tight)', fontSize: 32, fontWeight: 700, letterSpacing: '-0.01em', color: '#06293E', lineHeight: 1.2, margin: '0 0 16px' }}>
                Inter Tight Bold for emphasis
              </p>
              <p style={{ fontFamily: 'var(--font-tight)', fontSize: 16, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.5, margin: 0 }}>
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
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 18, color: '#2a2a2a', lineHeight: 1.65, margin: '0 0 16px' }}>
                Inter is used for body copy throughout the platform. Its wider tracking and clean geometry
                make it highly readable at small sizes.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#6b6b6b', lineHeight: 1.6, margin: 0 }}>
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
              <p style={{ fontFamily: 'var(--font-monospace)', fontSize: 14, color: '#2a2a2a', lineHeight: 1.7, margin: 0 }}>
                const strategia = new DesignSystem({'{'} abyss: &apos;#06293E&apos;, teal: &apos;#00C9B7&apos; {'}'});<br />
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
                <span style={{ fontFamily: row.font, fontSize: Math.min(row.size, 44), fontWeight: row.weight, letterSpacing: row.ls, color: '#06293E', lineHeight: 1.2 }}>{row.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LOGO VARIANTS ========== */}
      <section className="brand-section--alt">
        <div className="container">
          <div className="brand-section-label" id="logos"><span>Logo Suite</span></div>
          <h2 className="brand-h2">Logo Variants</h2>
          <p className="brand-desc">
            The Strategia triangle mark symbolizes stability and forward momentum. Download any logo as a transparent PNG.
          </p>

          <div className="brand-logo-tabs">
            {logoCategories.map((cat, i) => (
              <button
                key={cat.name}
                className={`brand-logo-tab ${activeLogoCategory === i ? 'active' : ''}`}
                onClick={() => setActiveLogoCategory(i)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <p className="brand-logo-cat-desc">{logoCategories[activeLogoCategory].desc}</p>

          <div className="brand-grid brand-grid--logos">
            {logoCategories[activeLogoCategory].logos.map((logo) => (
              <div key={logo.label} className={`brand-logo-card brand-logo-card--${logo.layout}`}>
                <div className="brand-logo-preview" style={{ background: logo.bg }}>
                  <img src={logo.src} alt={logo.label} />
                </div>
                <div className="brand-logo-footer">
                  <span className="brand-logo-label">{logo.label}</span>
                  <button
                    className="brand-logo-download"
                    onClick={() => downloadFile(logo.src, logo.src.split('/').pop() || 'logo.png')}
                    title="Download PNG"
                  >
                    <DownloadIcon size={14} />
                    <span>PNG</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LOGO COMPONENTS ========== */}
      <section className="brand-section">
        <div className="container">
          <div className="brand-section-label" id="components"><span>Logo Components</span></div>
          <h2 className="brand-h2">Standalone Triangle Mark</h2>
          <p className="brand-desc">
            The equilateral triangle icon can be used independently as a favicon, app icon, or brand accent.
            Download the SVG or copy the markup directly. The wordmark is a custom serif typeface and is only
            available as part of the complete logo files above.
          </p>

          <div className="brand-grid brand-grid--triangles">
            {triangleColors.map((t) => (
              <div key={t.name} className="brand-triangle-card">
                <div className="brand-triangle-preview" style={{ background: t.bgPreview }}>
                  <div dangerouslySetInnerHTML={{ __html: makeTriangleSvg(t.hex) }} />
                </div>
                <div className="brand-triangle-footer">
                  <span className="brand-triangle-name">{t.name}</span>
                  <div className="brand-triangle-actions">
                    <button
                      className="brand-action-btn"
                      onClick={() => { copy(makeTriangleSvg(t.hex)); }}
                      title="Copy SVG markup"
                    >
                      {copied === makeTriangleSvg(t.hex) ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
                      <span>SVG</span>
                    </button>
                    <button
                      className="brand-action-btn"
                      onClick={() => downloadSvgBlob(makeTriangleSvg(t.hex), `strategia-triangle-${t.name.toLowerCase()}.svg`)}
                      title="Download SVG file"
                    >
                      <DownloadIcon size={13} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LOGO RULES ========== */}
      <section className="brand-section--alt">
        <div className="container">
          <div className="brand-section-label" id="rules"><span>Logo Rules</span></div>
          <h2 className="brand-h2">Logo Usage Guidelines</h2>
          <p className="brand-desc">
            Consistent logo usage protects brand equity. Follow these rules across all applications.
          </p>

          <h3 className="brand-group-label">Clear Space</h3>
          <div className="brand-spacing-guide">
            <div className="brand-spacing-guide-visual">
              <div className="brand-spacing-guide-box">
                <span className="brand-spacing-s brand-spacing-s--top">S</span>
                <span className="brand-spacing-s brand-spacing-s--right">S</span>
                <span className="brand-spacing-s brand-spacing-s--bottom">S</span>
                <span className="brand-spacing-s brand-spacing-s--left">S</span>
                <img src="/images/brand/solid/stacked/strategia-stacked-abyss.png" alt="Logo spacing" />
              </div>
            </div>
            <div className="brand-spacing-guide-text">
              <p>
                Always maintain minimum clear space around the logo using the letter <strong>S</strong> from
                the &ldquo;STRATEGIA&rdquo; wordmark as the unit of measurement. This space must remain
                free of other elements, text, or graphics.
              </p>
            </div>
          </div>

          <h3 className="brand-group-label" style={{ marginTop: 48 }}>Do&apos;s and Don&apos;ts</h3>
          <div className="brand-rules">
            <div className="brand-rule-card">
              <div className="brand-rule-header">
                <span className="brand-rule-icon brand-rule-icon--do">&#10003;</span>
                <span className="brand-rule-title">Do</span>
              </div>
              <ul className="brand-rule-list">
                {[
                  'Use approved color variants only',
                  'Maintain minimum clear space (S-height around all edges)',
                  'Use on solid or simple gradient backgrounds',
                  'Scale proportionally',
                  'Choose the variant with highest contrast for legibility',
                  'Use the glow treatment for premium digital placements',
                ].map((d) => (
                  <li key={d}><span className="brand-rule-bullet brand-rule-bullet--do">&#8226;</span>{d}</li>
                ))}
              </ul>
            </div>
            <div className="brand-rule-card">
              <div className="brand-rule-header">
                <span className="brand-rule-icon brand-rule-icon--dont">&#10005;</span>
                <span className="brand-rule-title">Don&apos;t</span>
              </div>
              <ul className="brand-rule-list">
                {[
                  'Change brand colors',
                  'Rotate or angle the logo',
                  'Add drop shadows (outside of the glow treatment)',
                  'Apply transparency or opacity changes',
                  'Stretch or distort',
                  'Resize icon vs wordmark independently',
                ].map((d) => (
                  <li key={d}><span className="brand-rule-bullet brand-rule-bullet--dont">&#10005;</span>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SPACING & RADII ========== */}
      <section className="brand-section">
        <div className="container">
          <div className="brand-section-label" id="spacing"><span>Spacing &amp; Radii</span></div>
          <h2 className="brand-h2" style={{ marginBottom: 48 }}>Spacing Scale</h2>

          <div className="brand-spacing-blocks">
            {spacingScale.map((s) => (
              <div key={s} className="brand-spacing-item" onClick={() => copy(`${s}px`)} style={{ cursor: 'pointer' }}>
                <div style={{ width: s, height: s, background: '#06293E', borderRadius: Math.min(s / 4, 8), opacity: 0.85 }} />
                <span>{copied === `${s}px` ? 'Copied' : `${s}`}</span>
              </div>
            ))}
          </div>

          <h3 className="brand-group-label" style={{ marginBottom: 20 }}>Border Radius</h3>
          <div className="brand-grid brand-grid--radii" style={{ marginBottom: 0 }}>
            {radii.map((r) => (
              <div key={r.name} className="brand-radius-card" onClick={() => copy(r.value)} style={{ cursor: 'pointer' }}>
                <div className="brand-radius-preview" style={{ borderRadius: r.value }} />
                <div className="brand-radius-name">{r.name}</div>
                <div className="brand-radius-value">{copied === r.value ? 'Copied!' : r.value}</div>
                <div className="brand-radius-var">{r.var}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="brand-footer">
        <p>STRATEGIA DESIGN SYSTEM v2.0</p>
      </div>
    </div>
  )
}
