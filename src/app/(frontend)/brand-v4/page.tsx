'use client'

import { useState, useCallback } from 'react'
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
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// Render a CSS-style linear-gradient onto a canvas and trigger a PNG download.
// CSS gradient angle convention: 0deg = "to top", 90deg = "to right", etc.
function downloadGradientPng(
  angleDeg: number,
  stops: Array<{ color: string; pos: number }>,
  filename: string,
  width = 1920,
  height = 1080,
) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const _ctx = canvas.getContext('2d')
  if (!_ctx) return
  const ctx: CanvasRenderingContext2D = _ctx

  const theta = (angleDeg * Math.PI) / 180
  const dx = Math.sin(theta)
  const dy = -Math.cos(theta)
  const projLen = Math.abs(width * dx) + Math.abs(height * dy)
  const cx = width / 2
  const cy = height / 2
  const x0 = cx - (dx * projLen) / 2
  const y0 = cy - (dy * projLen) / 2
  const x1 = cx + (dx * projLen) / 2
  const y1 = cy + (dy * projLen) / 2

  const grad = ctx.createLinearGradient(x0, y0, x1, y1)
  stops.forEach((s) => grad.addColorStop(Math.max(0, Math.min(1, s.pos)), s.color))
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, width, height)

  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    downloadFile(url, filename)
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }, 'image/png')
}

function makeBrandMarkSvg(color: string, stroke = 1.8): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" fill="none">
  <path d="M20 4L36 34H4L20 4Z" stroke="${color}" stroke-width="${stroke}" stroke-linejoin="round" fill="none"/>
</svg>`
}

// Standalone brand mark with a soft luminous halo, painted entirely with SVG filters.
// The filter ID must be stable so server-render and client-hydration match — pass a deterministic
// id (typically slugged from the variant name).
function makeBrandMarkGlowSvg(strokeColor: string, haloColor: string, filterId: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 80 80" width="80" height="80" fill="none">
  <defs>
    <filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="b1"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b2"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b3"/>
      <feMerge>
        <feMergeNode in="b3"/>
        <feMergeNode in="b3"/>
        <feMergeNode in="b2"/>
        <feMergeNode in="b1"/>
      </feMerge>
    </filter>
  </defs>
  <path d="M20 4L36 34H4L20 4Z" stroke="${haloColor}" stroke-width="2.2" stroke-linejoin="round" fill="none" filter="url(#${filterId})"/>
  <path d="M20 4L36 34H4L20 4Z" stroke="${strokeColor}" stroke-width="1.6" stroke-linejoin="round" fill="none"/>
</svg>`
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

/* -------------------------------------------------------
   DATA — Brand V4: Dark Depth
   ------------------------------------------------------- */

const colors = {
  primary: [
    { name: 'Black', hex: '#1C1C1C', rgb: 'R28 G28 B28', cssVar: '--black', dark: true, desc: 'True dark. The deepest anchor of the primary gradient. Used at gradient origin and as the darkest tone.' },
    { name: 'Navy Black', hex: '#00192E', rgb: 'R0 G25 B46', cssVar: '--navy-black', dark: true, desc: 'Dark navy. The dominant background tone for most of the page. Scrolled nav background, footer base.' },
  ],
  secondary: [
    { name: 'Dark Blue', hex: '#003D6B', rgb: 'R0 G61 B107', cssVar: '--dark-blue', dark: true, desc: 'Rich midnight blue. Gradient midpoint, marquee band, and ambient radial glows.' },
    { name: 'Medium Blue', hex: '#006988', rgb: 'R0 G105 B136', cssVar: '--medium-blue', dark: true, desc: 'Ocean blue. Transitional gradient stop between the dark core and teal highlight.' },
  ],
  accent: [
    { name: 'Teal', hex: '#5CC8B8', rgb: 'R92 G200 B184', cssVar: '--accent', dark: false, desc: 'The single accent color. Stat values, eyebrow labels, badge checks, marquee dots, slider thumbs, solution links, and hover borders. The only chromatic break against the dark palette.' },
  ],
  neutral: [
    { name: 'White', hex: '#FFFFFF', rgb: 'R255 G255 B255', cssVar: '--primary', dark: false, desc: 'Primary text color. Headlines, card titles, and high-emphasis content.' },
  ],
  surface: [
    { name: 'Card', hex: 'rgba(255,255,255,0.04)', rgb: 'White 4%', cssVar: '--surface', dark: true, desc: 'Default card and section background. Barely visible — the content structure comes from borders and subtle opacity differences.' },
    { name: 'Card Elevated', hex: 'rgba(255,255,255,0.08)', rgb: 'White 8%', cssVar: '--elevated', dark: true, desc: 'Hover state for cards. Doubles the base opacity for a subtle lift effect.' },
    { name: 'Stat Surface', hex: 'rgba(255,255,255,0.05)', rgb: 'White 5%', cssVar: '--stat-surface', dark: true, desc: 'Slightly above the card base. Used for stat cards and science stats to create visual grouping.' },
    { name: 'CTA Surface', hex: 'rgba(255,255,255,0.06)', rgb: 'White 6%', cssVar: '--cta-surface', dark: true, desc: 'The call-to-action section. Paired with blur(20px) and a subtle 0.12 border.' },
  ],
}

type GradientStop = { color: string; pos: number }
type GradientEntry = {
  name: string
  css: string
  stops: string[]
  label: string
  desc: string
  angle: number
  pngStops: GradientStop[]
  staticPng?: string
  slug: string
}

const gradients: GradientEntry[] = [
  {
    name: 'Dark Depth',
    slug: 'dark-depth',
    css: 'linear-gradient(135deg, #1C1C1C 0%, #00192E 25%, #003D6B 50%, #006988 75%, #5CC8B8 100%)',
    stops: ['#1C1C1C', '#00192E', '#003D6B', '#006988', '#5CC8B8'],
    label: 'Primary Brand Gradient',
    desc: 'The signature 5-stop dark gradient. Transitions from pure dark through midnight blue to a teal highlight. Used as the page background, hero backdrop, and footer.',
    angle: 135,
    pngStops: [
      { color: '#1C1C1C', pos: 0 },
      { color: '#00192E', pos: 0.25 },
      { color: '#003D6B', pos: 0.5 },
      { color: '#006988', pos: 0.75 },
      { color: '#5CC8B8', pos: 1 },
    ],
    staticPng: '/images/brand/gradients/gradients-dark-blue-gradient.png',
  },
  {
    name: 'Marquee Band',
    slug: 'marquee-band',
    css: 'linear-gradient(135deg, #00192E 0%, #003D6B 40%, #006988 100%)',
    stops: ['#00192E', '#003D6B', '#006988'],
    label: 'Marquee / Banner Gradient',
    desc: 'A 3-stop dark-blue gradient for the scrolling marquee strip. Intentionally excludes the teal endpoint to keep the band subdued.',
    angle: 135,
    pngStops: [
      { color: '#00192E', pos: 0 },
      { color: '#003D6B', pos: 0.4 },
      { color: '#006988', pos: 1 },
    ],
  },
  {
    name: 'Teal Accent Bar',
    slug: 'teal-accent-bar',
    css: 'linear-gradient(90deg, #5CC8B8, rgba(92,200,184,0.5), rgba(92,200,184,0.2))',
    stops: ['#5CC8B8', 'rgba(92,200,184,0.5)', 'rgba(92,200,184,0.2)'],
    label: 'Interactive Accent',
    desc: 'The teal-based directional bar revealed on hover. Module cards show it on the top edge (3px), solution cards on the left edge (3px).',
    angle: 90,
    pngStops: [
      { color: 'rgba(92,200,184,1)', pos: 0 },
      { color: 'rgba(92,200,184,0.5)', pos: 0.5 },
      { color: 'rgba(92,200,184,0.2)', pos: 1 },
    ],
  },
  {
    name: 'Footer Fade',
    slug: 'footer-fade',
    css: 'linear-gradient(180deg, rgba(0,25,46,0.5) 0%, rgba(0,15,28,0.8) 30%, rgba(0,10,20,0.95) 100%)',
    stops: ['rgba(0,25,46,0.5)', 'rgba(0,15,28,0.8)', 'rgba(0,10,20,0.95)'],
    label: 'Footer Background',
    desc: 'A vertical fade to near-black for the footer section. Darkens progressively to ground the page.',
    angle: 180,
    pngStops: [
      { color: 'rgba(0,25,46,0.5)', pos: 0 },
      { color: 'rgba(0,15,28,0.8)', pos: 0.3 },
      { color: 'rgba(0,10,20,0.95)', pos: 1 },
    ],
  },
]

type LogoLayout = 'stacked' | 'inline'
type LogoVariant = {
  src: string
  label: string
  bg: 'dark' | 'light'
  layout: LogoLayout
  filename: string
}

const brandMarkVariants = [
  { name: 'White', hex: '#FFFFFF', bg: 'dark' as const },
  { name: 'Navy Black', hex: '#00192E', bg: 'light' as const },
  { name: 'Black', hex: '#1C1C1C', bg: 'light' as const },
  { name: 'Teal', hex: '#5CC8B8', bg: 'dark' as const },
  { name: 'Dark Blue', hex: '#003D6B', bg: 'light' as const },
  { name: 'Medium Blue', hex: '#006988', bg: 'light' as const },
]

const brandMarkGlowVariants = [
  { name: 'White Glow', slug: 'white-glow', stroke: '#FFFFFF', halo: '#FFFFFF', desc: 'Pure luminance bloom. Strongest variant; reads as soft light against any dark surface.' },
  { name: 'Light Blue Glow', slug: 'light-blue-glow', stroke: '#FFFFFF', halo: '#B8E5F0', desc: 'A lighter cyan halo. Sits more delicately against busy gradient backgrounds.' },
  { name: 'Dark Blue Glow', slug: 'dark-blue-glow', stroke: '#FFFFFF', halo: '#5CC8B8', desc: 'Saturated teal halo aligned to the V4 accent. The premium glow choice for CTAs and hero placements.' },
]

type LogoCategory = {
  key: string
  name: string
  desc: string
  logos: LogoVariant[]
}

const logoLibrary: LogoCategory[] = [
  {
    key: 'solid',
    name: 'Solid Colour',
    desc: 'Monochromatic logo versions. Use for print, merchandise, small sizes, and contexts where gradients are not suited.',
    logos: [
      { src: '/images/brand/solid/inline/strategia-inline-white.png', label: 'Inline White', bg: 'dark', layout: 'inline', filename: 'strategia-inline-white.png' },
      { src: '/images/brand/solid/inline/strategia-inline-abyss.png', label: 'Inline Abyss', bg: 'light', layout: 'inline', filename: 'strategia-inline-abyss.png' },
      { src: '/images/brand/solid/inline/strategia-inline-black.png', label: 'Inline Black', bg: 'light', layout: 'inline', filename: 'strategia-inline-black.png' },
      { src: '/images/brand/solid/inline/strategia-inline-harbour.png', label: 'Inline Harbour', bg: 'light', layout: 'inline', filename: 'strategia-inline-harbour.png' },
      { src: '/images/brand/solid/inline/strategia-inline-teal.png', label: 'Inline Teal', bg: 'dark', layout: 'inline', filename: 'strategia-inline-teal.png' },
      { src: '/images/brand/solid/inline/strategia-inline-lime.png', label: 'Inline Lime', bg: 'dark', layout: 'inline', filename: 'strategia-inline-lime.png' },
      { src: '/images/brand/solid/stacked/strategia-stacked-white.png', label: 'Stacked White', bg: 'dark', layout: 'stacked', filename: 'strategia-stacked-white.png' },
      { src: '/images/brand/solid/stacked/strategia-stacked-abyss.png', label: 'Stacked Abyss', bg: 'light', layout: 'stacked', filename: 'strategia-stacked-abyss.png' },
      { src: '/images/brand/solid/stacked/strategia-stacked-black.png', label: 'Stacked Black', bg: 'light', layout: 'stacked', filename: 'strategia-stacked-black.png' },
      { src: '/images/brand/solid/stacked/strategia-stacked-harbour.png', label: 'Stacked Harbour', bg: 'light', layout: 'stacked', filename: 'strategia-stacked-harbour.png' },
      { src: '/images/brand/solid/stacked/strategia-stacked-teal.png', label: 'Stacked Teal', bg: 'dark', layout: 'stacked', filename: 'strategia-stacked-teal.png' },
      { src: '/images/brand/solid/stacked/strategia-stacked-lime.png', label: 'Stacked Lime', bg: 'dark', layout: 'stacked', filename: 'strategia-stacked-lime.png' },
    ],
  },
  {
    key: 'gradient',
    name: 'Gradient Mark',
    desc: 'The triangle icon uses a gradient fill while the wordmark stays solid. Suited to large digital surfaces.',
    logos: [
      { src: '/images/brand/gradient-mark/inline/strategia-inline-blue-gradient-+-white-text.png', label: 'Inline Blue + White', bg: 'dark', layout: 'inline', filename: 'strategia-inline-blue-gradient-white-text.png' },
      { src: '/images/brand/gradient-mark/inline/strategia-inline-blue-gradient-+-navy-text.png', label: 'Inline Blue + Navy', bg: 'light', layout: 'inline', filename: 'strategia-inline-blue-gradient-navy-text.png' },
      { src: '/images/brand/gradient-mark/inline/strategia-inline-blue-gradient-+-black-text.png', label: 'Inline Blue + Black', bg: 'light', layout: 'inline', filename: 'strategia-inline-blue-gradient-black-text.png' },
      { src: '/images/brand/gradient-mark/inline/strategia-inline-teal-gradient-+-white-text.png', label: 'Inline Teal + White', bg: 'dark', layout: 'inline', filename: 'strategia-inline-teal-gradient-white-text.png' },
      { src: '/images/brand/gradient-mark/inline/strategia-inline-teal-gradient-+-black-text.png', label: 'Inline Teal + Black', bg: 'light', layout: 'inline', filename: 'strategia-inline-teal-gradient-black-text.png' },
      { src: '/images/brand/gradient-mark/stacked/strategia-stacked-blue-gradient-+-white-text.png', label: 'Stacked Blue + White', bg: 'dark', layout: 'stacked', filename: 'strategia-stacked-blue-gradient-white-text.png' },
      { src: '/images/brand/gradient-mark/stacked/strategia-stacked-blue-gradient-+-navy-text.png', label: 'Stacked Blue + Navy', bg: 'light', layout: 'stacked', filename: 'strategia-stacked-blue-gradient-navy-text.png' },
      { src: '/images/brand/gradient-mark/stacked/strategia-stacked-blue-gradient-+-black-text.png', label: 'Stacked Blue + Black', bg: 'light', layout: 'stacked', filename: 'strategia-stacked-blue-gradient-black-text.png' },
      { src: '/images/brand/gradient-mark/stacked/strategia-stacked-teal-gradient-+-white-text.png', label: 'Stacked Teal + White', bg: 'dark', layout: 'stacked', filename: 'strategia-stacked-teal-gradient-white-text.png' },
      { src: '/images/brand/gradient-mark/stacked/strategia-stacked-teal-gradient-+-black-text.png', label: 'Stacked Teal + Black', bg: 'light', layout: 'stacked', filename: 'strategia-stacked-teal-gradient-black-text.png' },
    ],
  },
  {
    key: 'glow',
    name: 'Glow',
    desc: 'A soft luminous halo treatment for premium dark placements. Used in the CTA section and footer.',
    logos: [
      { src: '/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png', label: 'Inline White Glow', bg: 'dark', layout: 'inline', filename: 'strategia-inline-white-glow.png' },
      { src: '/images/brand/glow/inline/strategia-final-logo-strategia-inline-light-blue-glow.png', label: 'Inline Light Blue Glow', bg: 'dark', layout: 'inline', filename: 'strategia-inline-light-blue-glow.png' },
      { src: '/images/brand/glow/inline/strategia-final-logo-strategia-inline-dark-blue-glow.png', label: 'Inline Dark Blue Glow', bg: 'dark', layout: 'inline', filename: 'strategia-inline-dark-blue-glow.png' },
      { src: '/images/brand/glow/stacked/strategia-stacked-white-glow.png', label: 'Stacked White Glow', bg: 'dark', layout: 'stacked', filename: 'strategia-stacked-white-glow.png' },
      { src: '/images/brand/glow/stacked/strategia-stacked-light-blue-glow.png', label: 'Stacked Light Blue Glow', bg: 'dark', layout: 'stacked', filename: 'strategia-stacked-light-blue-glow.png' },
      { src: '/images/brand/glow/stacked/strategia-stacked-dark-blue-glow.png', label: 'Stacked Dark Blue Glow', bg: 'dark', layout: 'stacked', filename: 'strategia-stacked-dark-blue-glow.png' },
    ],
  },
]

const textHierarchy = [
  { role: 'H1', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: 'clamp(2.5rem, 6.4vw, 5.6rem)', weight: 400, ls: '-0.035em', lh: 0.98, color: '#FFFFFF', label: 'White', sample: 'Predict better hires', tt: undefined as 'uppercase' | undefined },
  { role: 'Hero Sub', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: 'clamp(1.1rem, 1.5vw, 1.25rem)', weight: 500, ls: '0', lh: 1.5, color: 'rgba(255,255,255,0.82)', label: 'White 82%', sample: 'Supporting headline text', tt: undefined as 'uppercase' | undefined },
  { role: 'H2', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: 'clamp(1.75rem, 3.4vw, 2.75rem)', weight: 400, ls: '-0.025em', lh: 1.1, color: '#FFFFFF', label: 'White', sample: 'Section heading', tt: undefined as 'uppercase' | undefined },
  { role: 'H2 Muted', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: 'clamp(1.75rem, 3.4vw, 2.75rem)', weight: 400, ls: '-0.025em', lh: 1.1, color: 'rgba(255,255,255,0.55)', label: 'White 55%', sample: 'with muted emphasis', tt: undefined as 'uppercase' | undefined },
  { role: 'Card Title', font: 'Inter Tight', ff: 'var(--font-inter-tight, Inter Tight, system-ui, sans-serif)', size: '18px', weight: 600, ls: '-0.01em', lh: 1.3, color: '#FFFFFF', label: 'White', sample: 'Resume Intelligence Engine', tt: undefined as 'uppercase' | undefined },
  { role: 'Body', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: '16px', weight: 400, ls: '0', lh: 1.7, color: 'rgba(255,255,255,0.72)', label: 'White 72%', sample: 'Paragraph and description text', tt: undefined as 'uppercase' | undefined },
  { role: 'Card Desc', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: '14px', weight: 400, ls: '0', lh: 1.6, color: 'rgba(255,255,255,0.65)', label: 'White 65%', sample: 'Module descriptions and solution body copy', tt: undefined as 'uppercase' | undefined },
  { role: 'Stat Value', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: 'clamp(2rem, 3.5vw, 2.5rem)', weight: 400, ls: '-0.02em', lh: 1, color: '#5CC8B8', label: 'Teal', sample: '94%', tt: undefined as 'uppercase' | undefined },
  { role: 'Stat Label', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: '14px', weight: 400, ls: '0', lh: 1.4, color: 'rgba(255,255,255,0.88)', label: 'White 88%', sample: 'Prediction accuracy across roles', tt: undefined as 'uppercase' | undefined },
  { role: 'Stat Sub', font: 'Inter', ff: 'var(--font-inter, Inter, system-ui, sans-serif)', size: '12px', weight: 400, ls: '0', lh: 1.4, color: 'rgba(255,255,255,0.50)', label: 'White 50%', sample: 'Based on 14,000+ validated hires', tt: undefined as 'uppercase' | undefined },
  { role: 'Eyebrow', font: 'JetBrains Mono', ff: 'var(--font-mono, JetBrains Mono, monospace)', size: '11px', weight: 600, ls: '0.14em', lh: 1.5, color: '#5CC8B8', label: 'Teal', sample: 'THE SCIENCE', tt: 'uppercase' as 'uppercase' | undefined },
  { role: 'Micro', font: 'JetBrains Mono', ff: 'var(--font-mono, JetBrains Mono, monospace)', size: '10px', weight: 500, ls: '0.14em', lh: 1.5, color: 'rgba(255,255,255,0.40)', label: 'White 40%', sample: 'MODULE 01 — RÉSUMÉ INTELLIGENCE', tt: 'uppercase' as 'uppercase' | undefined },
  { role: 'Signal Label', font: 'JetBrains Mono', ff: 'var(--font-mono, JetBrains Mono, monospace)', size: '10px', weight: 500, ls: '0.14em', lh: 1.5, color: 'rgba(255,255,255,0.45)', label: 'White 45%', sample: 'PARSE SIGNAL', tt: 'uppercase' as 'uppercase' | undefined },
]

const surfaces = [
  { name: 'Section Background', bg: 'transparent', blur: 'none', border: 'none', radius: 'n/a', mockTitle: 'Hiring Intelligence', mockText: 'Content floats directly on the gradient — no enclosing surface or visible panel.', stat: false, desc: 'Sections have no enclosing panel — content sits directly on the gradient. Structure comes from card boundaries and thin borders.' },
  { name: 'Card', bg: 'rgba(255,255,255,0.04)', blur: '16px', border: 'rgba(255,255,255,0.10)', radius: '16px', mockTitle: 'Resume Intelligence', mockText: 'Extracts 140+ structured signals from unstructured resumes.', stat: false, desc: 'Module cards, solution cards, and badge grids. Hover lifts to rgba(255,255,255,0.08) with a teal border tint.' },
  { name: 'Inner Panel', bg: 'rgba(255,255,255,0.04)', blur: '16px', border: 'rgba(255,255,255,0.10)', radius: '24px', mockTitle: 'The V-FIT Method', mockText: 'Three signal types converge to predict candidate success with precision.', stat: false, desc: 'Triangulate section, enterprise section, and process section — larger enclosed areas that group related content.' },
  { name: 'Result Card', bg: 'rgba(255,255,255,0.05)', blur: '16px', border: 'rgba(255,255,255,0.10)', radius: '16px', mockTitle: '94%', mockText: 'Prediction accuracy across roles', stat: true, desc: 'The V-FIT result display. Slightly elevated above base cards with box-shadow: 0 24px 60px -24px rgba(0,0,0,0.3).' },
  { name: 'ROI Output', bg: 'rgba(255,255,255,0.05)', blur: '16px', border: 'rgba(255,255,255,0.10)', radius: '20px', mockTitle: '$2.4M', mockText: 'Projected annual savings', stat: true, desc: 'Calculator output display with shadow: 0 8px 32px -8px rgba(0,0,0,0.2).' },
]

const effects = [
  { name: 'Cursor Aura', desc: 'A 520px radial teal glow (rgba 92,200,184 at 0.30→0) that follows the mouse. Uses mix-blend-mode: screen and filter: blur(10px). The teal tone creates colored light on the dark canvas.' },
  { name: 'Plasma Blobs', desc: 'Floating teal radial gradient circles (same gradient as cursor aura) that drift across the page. The teal tint (rgba 92,200,184) creates colored light pools on the dark background.' },
  { name: 'Pulse Rings', desc: 'Expanding concentric circles with a ring-shaped radial gradient. The white ring effect works on dark backgrounds via screen blend mode.' },
  { name: 'Scroll Reveal', desc: 'Elements fade in from 24px below, opacity 0→1, cubic-bezier(0.16, 1, 0.3, 1), 0.7s duration. Triggered by IntersectionObserver.' },
  { name: 'Nav Appear', desc: 'Fixed nav starts invisible. On scroll, gains dark glass background (rgba 0,25,46,0.65) with blur(20px). Logo mark stays white. Spins 1080deg on appear.' },
  { name: 'Teal Accent Bars', desc: 'Module cards show a 3px top bar of teal gradient on hover; solution cards show a 3px left bar. Border color also shifts to rgba(92,200,184,0.3) — a teal tint rather than just brightening white.' },
  { name: 'Marquee', desc: '40s infinite scroll on a dark-blue gradient band. Dots are #5CC8B8 teal with box-shadow glow (rgba 92,200,184,0.4). Text at 0.85 white opacity.' },
  { name: 'Tetrahedron', desc: '3D wireframe tetrahedron rendered to SVG. Follows cursor with inertia-damped rotation. Clicking locks it and reveals the brand wordmark. Wire back-face color uses blue-tinted white (rgb 140,185,220) — cooler, more navy-aligned.' },
]

const spacingScale = [4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 72, 96, 128, 180]

const radii = [
  { name: 'Button', value: '6px' },
  { name: 'Tag / Verdict', value: '6px' },
  { name: 'Signal', value: '12px' },
  { name: 'Card', value: '16px' },
  { name: 'ROI Output', value: '20px' },
  { name: 'Section', value: '24px' },
  { name: 'Pill', value: '999px' },
]

const navItems = [
  { id: 'logo', label: 'Logo' },
  { id: 'assets', label: 'Assets' },
  { id: 'colors', label: 'Colors' },
  { id: 'gradients', label: 'Gradients' },
  { id: 'typography', label: 'Typography' },
  { id: 'surfaces', label: 'Surfaces' },
  { id: 'effects', label: 'Effects' },
  { id: 'spacing', label: 'Spacing' },
]

export default function BrandV4Page() {
  const { copied, copy } = useCopy()
  const [activeLogoCategory, setActiveLogoCategory] = useState(0)

  return (
    <div className="bv4-root">
      {/* ========== HERO ========== */}
      <section className="bv4-hero">
        <div className="bv4-hero-gradient" />
        <div className="bv4-hero-glow" />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <p className="bv4-hero-eyebrow">Brand Guidelines v4.0</p>
          <h1 className="bv4-hero-title">Dark Depth<br />Design System</h1>
          <p className="bv4-hero-sub">
            The dark, immersive visual identity for Strategia.
            Ultra-transparent surfaces on a deep blue-to-teal gradient — premium, professional, and dramatic.
          </p>
          <div className="bv4-nav-pills">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="bv4-nav-pill">{n.label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LOGO & BRAND MARK ========== */}
      <section className="bv4-section">
        <div className="container">
          <div className="bv4-section-label" id="logo"><span>Logo &amp; Brand Mark</span></div>
          <h2 className="bv4-h2">Logo &amp; Brand Mark</h2>
          <p className="bv4-desc">
            Three elements compose the Strategia identity system: the triangle brand mark, the wordmark, and the combined logo. Hover any card to copy or download the asset. Full variant grids appear below in the Asset Library.
          </p>

          {/* Brand Mark */}
          <h3 className="bv4-group-label">Brand Mark</h3>
          <div className="bv4-logo-hero">
            <div className="bv4-logo-hero-card bv4-logo-hero-card--dark">
              <div className="bv4-logo-hero-visual">
                <svg width="120" height="120" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4L36 34H4L20 4Z" stroke="#FFFFFF" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div className="bv4-logo-hero-actions">
                <button
                  className="bv4-asset-btn"
                  onClick={() => { copy(makeBrandMarkSvg('#FFFFFF')); }}
                  title="Copy SVG markup"
                >
                  {copied === makeBrandMarkSvg('#FFFFFF') ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                  <span>SVG</span>
                </button>
                <button
                  className="bv4-asset-btn"
                  onClick={() => downloadSvgBlob(makeBrandMarkSvg('#FFFFFF'), 'strategia-brand-mark-white.svg')}
                  title="Download SVG file"
                >
                  <DownloadIcon size={12} />
                  <span>Download</span>
                </button>
              </div>
            </div>
            <div className="bv4-logo-hero-card bv4-logo-hero-card--light">
              <div className="bv4-logo-hero-visual">
                <svg width="120" height="120" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4L36 34H4L20 4Z" stroke="#00192E" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div className="bv4-logo-hero-actions bv4-logo-hero-actions--light">
                <button
                  className="bv4-asset-btn bv4-asset-btn--light"
                  onClick={() => { copy(makeBrandMarkSvg('#00192E')); }}
                  title="Copy SVG markup"
                >
                  {copied === makeBrandMarkSvg('#00192E') ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                  <span>SVG</span>
                </button>
                <button
                  className="bv4-asset-btn bv4-asset-btn--light"
                  onClick={() => downloadSvgBlob(makeBrandMarkSvg('#00192E'), 'strategia-brand-mark-navy-black.svg')}
                  title="Download SVG file"
                >
                  <DownloadIcon size={12} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
          <p className="bv4-clearspace-note">
            The standalone brand mark. Used in the navigation bar where it animates on scroll. Download it as a scalable SVG, or pick a different color in the Brand Mark Variants grid below.
          </p>

          {/* Brand Mark Variants */}
          <h3 className="bv4-group-label" style={{ marginTop: 40 }}>Brand Mark Variants</h3>
          <div className="bv4-mark-grid">
            {brandMarkVariants.map((v) => {
              const svg = makeBrandMarkSvg(v.hex)
              const slug = v.name.toLowerCase().replace(/\s+/g, '-')
              return (
                <div key={v.name} className={`bv4-mark-card bv4-mark-card--${v.bg}`}>
                  <div className="bv4-mark-preview">
                    <span dangerouslySetInnerHTML={{ __html: makeBrandMarkSvg(v.hex).replace('width="40" height="40"', 'width="72" height="72"') }} />
                  </div>
                  <div className="bv4-mark-footer">
                    <div className="bv4-mark-name">
                      <span className="bv4-mark-swatch" style={{ background: v.hex, borderColor: v.bg === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)' }} />
                      <span>{v.name}</span>
                    </div>
                    <div className="bv4-mark-actions">
                      <button
                        className="bv4-asset-btn"
                        onClick={() => copy(svg)}
                        title="Copy SVG markup"
                      >
                        {copied === svg ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                        <span>SVG</span>
                      </button>
                      <button
                        className="bv4-asset-btn"
                        onClick={() => downloadSvgBlob(svg, `strategia-brand-mark-${slug}.svg`)}
                        title="Download SVG file"
                      >
                        <DownloadIcon size={11} />
                        <span>File</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Brand Mark, Glow */}
          <h3 className="bv4-group-label" style={{ marginTop: 40 }}>Brand Mark, Glow</h3>
          <p className="bv4-clearspace-note" style={{ marginBottom: 16 }}>
            A pure-SVG version of the glow brand mark. The halo is painted with SVG Gaussian-blur filters, so the file stays scalable and editable. Renders correctly in modern browsers and most vector tools; if a tool flattens filters on import, use the existing glow PNGs in the Asset Library instead.
          </p>
          <div className="bv4-mark-grid bv4-mark-grid--glow">
            {brandMarkGlowVariants.map((v) => {
              const filterId = `bm-glow-${v.slug}`
              const previewSvg = makeBrandMarkGlowSvg(v.stroke, v.halo, filterId).replace('width="80" height="80"', 'width="112" height="112"')
              const fileSvg = makeBrandMarkGlowSvg(v.stroke, v.halo, filterId)
              return (
                <div key={v.slug} className="bv4-mark-card bv4-mark-card--glow">
                  <div className="bv4-mark-preview bv4-mark-preview--glow">
                    <span dangerouslySetInnerHTML={{ __html: previewSvg }} />
                  </div>
                  <div className="bv4-mark-footer">
                    <div className="bv4-mark-name">
                      <span className="bv4-mark-swatch" style={{ background: v.halo, borderColor: 'rgba(255,255,255,0.25)', boxShadow: `0 0 8px ${v.halo}` }} />
                      <span>{v.name}</span>
                    </div>
                    <p className="bv4-mark-desc">{v.desc}</p>
                    <div className="bv4-mark-actions">
                      <button
                        className="bv4-asset-btn"
                        onClick={() => copy(fileSvg)}
                        title="Copy SVG markup"
                      >
                        {copied === fileSvg ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                        <span>SVG</span>
                      </button>
                      <button
                        className="bv4-asset-btn"
                        onClick={() => downloadSvgBlob(fileSvg, `strategia-brand-mark-${v.slug}.svg`)}
                        title="Download SVG file"
                      >
                        <DownloadIcon size={11} />
                        <span>File</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Wordmark */}
          <h3 className="bv4-group-label" style={{ marginTop: 40 }}>Wordmark</h3>
          <div className="bv4-logo-hero">
            <div className="bv4-logo-hero-card bv4-logo-hero-card--dark">
              <div className="bv4-logo-hero-visual">
                <img src="/images/brand/strategia-wordmark-white.svg" alt="Strategia wordmark, white on dark" />
              </div>
              <div className="bv4-logo-hero-actions">
                <button
                  className="bv4-asset-btn"
                  onClick={() => downloadFile('/images/brand/strategia-wordmark-white.svg', 'strategia-wordmark-white.svg')}
                  title="Download SVG"
                >
                  <DownloadIcon size={12} />
                  <span>SVG</span>
                </button>
              </div>
            </div>
            <div className="bv4-logo-hero-card bv4-logo-hero-card--light">
              <div className="bv4-logo-hero-visual">
                <img src="/images/brand/strategia-wordmark-abyss.svg" alt="Strategia wordmark, abyss on light" />
              </div>
              <div className="bv4-logo-hero-actions bv4-logo-hero-actions--light">
                <button
                  className="bv4-asset-btn bv4-asset-btn--light"
                  onClick={() => downloadFile('/images/brand/strategia-wordmark-abyss.svg', 'strategia-wordmark-abyss.svg')}
                  title="Download SVG"
                >
                  <DownloadIcon size={12} />
                  <span>SVG</span>
                </button>
              </div>
            </div>
          </div>
          <p className="bv4-clearspace-note">
            The wordmark without the brand mark. Available as scalable SVG for crisp rendering at any size.
          </p>

          {/* Combined Logo — Inline */}
          <h3 className="bv4-group-label" style={{ marginTop: 40 }}>Combined Logo, Inline</h3>
          <div className="bv4-logo-hero">
            <div className="bv4-logo-hero-card bv4-logo-hero-card--dark">
              <div className="bv4-logo-hero-visual">
                <img src="/images/brand/solid/inline/strategia-inline-white.png" alt="Strategia inline logo, white on dark" />
              </div>
              <div className="bv4-logo-hero-actions">
                <button
                  className="bv4-asset-btn"
                  onClick={() => downloadFile('/images/brand/strategia-inline-white.svg', 'strategia-inline-white.svg')}
                  title="Download SVG"
                >
                  <DownloadIcon size={12} />
                  <span>SVG</span>
                </button>
                <button
                  className="bv4-asset-btn"
                  onClick={() => downloadFile('/images/brand/solid/inline/strategia-inline-white.png', 'strategia-inline-white.png')}
                  title="Download PNG"
                >
                  <DownloadIcon size={12} />
                  <span>PNG</span>
                </button>
              </div>
            </div>
            <div className="bv4-logo-hero-card bv4-logo-hero-card--light">
              <div className="bv4-logo-hero-visual">
                <img src="/images/brand/solid/inline/strategia-inline-abyss.png" alt="Strategia inline logo, abyss on light" />
              </div>
              <div className="bv4-logo-hero-actions bv4-logo-hero-actions--light">
                <button
                  className="bv4-asset-btn bv4-asset-btn--light"
                  onClick={() => downloadFile('/images/brand/solid/inline/strategia-inline-abyss.png', 'strategia-inline-abyss.png')}
                  title="Download PNG"
                >
                  <DownloadIcon size={12} />
                  <span>PNG</span>
                </button>
              </div>
            </div>
          </div>
          <p className="bv4-clearspace-note">
            The primary combined logo in horizontal layout. White ships as both SVG and PNG; other solid variants live in the Asset Library below.
          </p>

          {/* Combined Logo — Stacked */}
          <h3 className="bv4-group-label" style={{ marginTop: 40 }}>Combined Logo, Stacked</h3>
          <div className="bv4-logo-hero">
            <div className="bv4-logo-hero-card bv4-logo-hero-card--dark">
              <div className="bv4-logo-hero-visual">
                <img src="/images/brand/solid/stacked/strategia-stacked-white.png" alt="Strategia stacked logo, white on dark" />
              </div>
              <div className="bv4-logo-hero-actions">
                <button
                  className="bv4-asset-btn"
                  onClick={() => downloadFile('/images/brand/solid/stacked/strategia-stacked-white.png', 'strategia-stacked-white.png')}
                  title="Download PNG"
                >
                  <DownloadIcon size={12} />
                  <span>PNG</span>
                </button>
              </div>
            </div>
            <div className="bv4-logo-hero-card bv4-logo-hero-card--light">
              <div className="bv4-logo-hero-visual">
                <img src="/images/brand/solid/stacked/strategia-stacked-abyss.png" alt="Strategia stacked logo, abyss on light" />
              </div>
              <div className="bv4-logo-hero-actions bv4-logo-hero-actions--light">
                <button
                  className="bv4-asset-btn bv4-asset-btn--light"
                  onClick={() => downloadFile('/images/brand/solid/stacked/strategia-stacked-abyss.png', 'strategia-stacked-abyss.png')}
                  title="Download PNG"
                >
                  <DownloadIcon size={12} />
                  <span>PNG</span>
                </button>
              </div>
            </div>
          </div>
          <p className="bv4-clearspace-note">
            The stacked layout for vertical or compact placements.
          </p>

          {/* Glow Treatment */}
          <h3 className="bv4-group-label" style={{ marginTop: 40 }}>Glow Treatment</h3>
          <div className="bv4-logo-hero" style={{ gridTemplateColumns: '1fr' }}>
            <div className="bv4-logo-hero-card bv4-logo-hero-card--dark">
              <div className="bv4-logo-hero-visual">
                <img src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png" alt="Strategia inline logo, white glow on dark" />
              </div>
              <div className="bv4-logo-hero-actions">
                <button
                  className="bv4-asset-btn"
                  onClick={() => downloadFile('/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png', 'strategia-inline-white-glow.png')}
                  title="Download PNG"
                >
                  <DownloadIcon size={12} />
                  <span>PNG</span>
                </button>
              </div>
            </div>
          </div>
          <p className="bv4-clearspace-note">
            The glow variant with a soft luminous halo. Used in the CTA section and footer. Light blue and dark blue tints are available in the Asset Library.
          </p>

          {/* Clear Space & Minimum Size */}
          <h3 className="bv4-group-label" style={{ marginTop: 40 }}>Clear Space &amp; Minimum Size</h3>
          <div className="bv4-clearspace">
            <div className="bv4-clearspace-demo">
              <div className="bv4-clearspace-inner">
                <span className="bv4-clearspace-label bv4-clearspace-label--top">1x</span>
                <span className="bv4-clearspace-label bv4-clearspace-label--side">1x</span>
                <img src="/images/brand/solid/inline/strategia-inline-white.png" alt="Strategia logo with clear space indicators" />
              </div>
            </div>
            <p className="bv4-clearspace-note">
              Minimum clear space equals the height of the brand mark (triangle) on all sides.
              Minimum reproduction width: 120px for inline, 80px for stacked.
            </p>
          </div>
        </div>
      </section>

      {/* ========== ASSET LIBRARY ========== */}
      <section className="bv4-section--alt">
        <div className="container">
          <div className="bv4-section-label" id="assets"><span>Asset Library</span></div>
          <h2 className="bv4-h2">Complete Logo Library</h2>
          <p className="bv4-desc">
            Every logo variant available, grouped by treatment. Click any tile to download the file as a transparent PNG.
          </p>

          <div className="bv4-asset-tabs">
            {logoLibrary.map((cat, i) => (
              <button
                key={cat.key}
                className={`bv4-asset-tab ${activeLogoCategory === i ? 'active' : ''}`}
                onClick={() => setActiveLogoCategory(i)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <p className="bv4-asset-cat-desc">{logoLibrary[activeLogoCategory].desc}</p>

          <div className="bv4-asset-grid">
            {logoLibrary[activeLogoCategory].logos.map((logo) => (
              <div key={logo.src} className={`bv4-asset-card bv4-asset-card--${logo.layout}`}>
                <div className={`bv4-asset-preview bv4-asset-preview--${logo.bg}`}>
                  <img src={logo.src} alt={logo.label} />
                </div>
                <div className="bv4-asset-footer">
                  <span className="bv4-asset-label">{logo.label}</span>
                  <button
                    className="bv4-asset-btn"
                    onClick={() => downloadFile(logo.src, logo.filename)}
                    title="Download PNG"
                  >
                    <DownloadIcon size={12} />
                    <span>PNG</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COLORS ========== */}
      <section className="bv4-section">
        <div className="container">
          <div className="bv4-section-label" id="colors"><span>Colors</span></div>
          <h2 className="bv4-h2">Color Palette</h2>
          <p className="bv4-desc">
            A dark, monochromatic base with a single teal accent (#5CC8B8). The accent does all the heavy lifting — it signals interactivity, highlights data, and provides the only chromatic relief.
          </p>

          {(Object.entries(colors) as [string, typeof colors.primary][]).map(([group, items]) => (
            <div key={group}>
              <h3 className="bv4-group-label">{group}</h3>
              <div className="bv4-grid bv4-grid--colors">
                {items.map((c) => (
                  <div key={c.hex + c.name} className="bv4-color-card">
                    <div className="bv4-color-swatch" style={{ background: c.hex }}>
                      <span className="bv4-color-swatch-name" style={{ color: c.dark ? '#fff' : '#06293E' }}>{c.name}</span>
                    </div>
                    <div className="bv4-color-info">
                      <div className="bv4-color-chips">
                        <button className="bv4-chip" onClick={() => copy(c.hex)}>
                          {copied === c.hex ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                          <span>{c.hex}</span>
                        </button>
                        <button className="bv4-chip" onClick={() => copy(c.rgb)}>
                          {copied === c.rgb ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                          <span>{c.rgb}</span>
                        </button>
                        <button className="bv4-chip" onClick={() => copy(c.cssVar)}>
                          {copied === c.cssVar ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
                          <span>{c.cssVar}</span>
                        </button>
                      </div>
                      <p className="bv4-color-desc">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ========== GRADIENTS ========== */}
      <section className="bv4-section--alt">
        <div className="container">
          <div className="bv4-section-label" id="gradients"><span>Gradients</span></div>
          <h2 className="bv4-h2">Signature Gradients</h2>
          <p className="bv4-desc">
            Four gradients define the Dark Depth language. Click any preview to copy the CSS value.
          </p>

          <div className="bv4-gradient-grid">
            {gradients.map((g) => {
              const pngFilename = `strategia-${g.slug}-gradient.png`
              const handlePngDownload = () => {
                if (g.staticPng) {
                  downloadFile(g.staticPng, pngFilename)
                } else {
                  downloadGradientPng(g.angle, g.pngStops, pngFilename)
                }
              }
              return (
                <div key={g.name} className="bv4-gradient-card">
                  <div className="bv4-gradient-preview" style={{ background: g.css }} onClick={() => copy(g.css)}>
                    <span className="bv4-gradient-copy-overlay">
                      {copied === g.css ? <><CheckIcon size={16} /> Copied CSS</> : <><CopyIcon size={16} /> Click to copy CSS</>}
                    </span>
                  </div>
                  <div className="bv4-gradient-body">
                    <div className="bv4-gradient-title-row">
                      <h3>{g.name}</h3>
                      <code>{g.label}</code>
                    </div>
                    <p className="bv4-gradient-desc">{g.desc}</p>
                    <div className="bv4-gradient-actions">
                      <div className="bv4-gradient-stops">
                        {g.stops.map((stop) => (
                          <button key={stop} className="bv4-gradient-stop" onClick={() => copy(stop)}>
                            <span className="bv4-gradient-stop-dot" style={{ background: stop }} />
                            <code>{stop}</code>
                            {copied === stop ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                          </button>
                        ))}
                      </div>
                      <button className="bv4-asset-btn" onClick={handlePngDownload} title="Download PNG">
                        <DownloadIcon size={12} />
                        <span>PNG</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== TYPOGRAPHY ========== */}
      <section className="bv4-section">
        <div className="container">
          <div className="bv4-section-label" id="typography"><span>Typography</span></div>
          <h2 className="bv4-h2">Typography</h2>
          <p className="bv4-desc">
            Three font families — Inter, Inter Tight, and JetBrains Mono — combined with a white opacity scale and teal accent to create a clear visual hierarchy. Each role is shown below at its actual rendering style.
          </p>

          <div className="bv4-hierarchy-list">
            {textHierarchy.map((t) => (
              <div key={t.role} className="bv4-hierarchy-card">
                <div className="bv4-hierarchy-demo">
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
                <div className="bv4-hierarchy-meta">
                  <span className="bv4-hierarchy-role">{t.role}</span>
                  <div className="bv4-hierarchy-chips">
                    <button className="bv4-chip" onClick={() => copy(t.font)}>
                      {copied === t.font ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                      <span>{t.font}</span>
                    </button>
                    <button className="bv4-chip" onClick={() => copy(t.size)}>
                      {copied === t.size ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                      <span>{t.size}</span>
                    </button>
                    <button className="bv4-chip" onClick={() => copy(String(t.weight))}>
                      {copied === String(t.weight) ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                      <span>w{t.weight}</span>
                    </button>
                    <button className="bv4-chip" onClick={() => copy(t.color)}>
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
      <section className="bv4-section--alt">
        <div className="container">
          <div className="bv4-section-label" id="surfaces"><span>Surfaces &amp; Depth</span></div>
          <h2 className="bv4-h2">Surface System</h2>
          <p className="bv4-desc">
            Content sections sit directly on the gradient with no enclosing panels — structure comes from ultra-subtle card backgrounds and thin borders. This creates an open, immersive feel.
          </p>

          <div className="bv4-surfaces-grid">
            {surfaces.map((s) => (
              <div key={s.name} className="bv4-surface-item">
                <div className="bv4-surface-backdrop">
                  <div className="bv4-surface-mock" style={{
                    background: s.bg,
                    backdropFilter: s.blur !== 'none' ? `blur(${s.blur})` : undefined,
                    WebkitBackdropFilter: s.blur !== 'none' ? `blur(${s.blur})` : undefined,
                    border: s.border !== 'none' ? `1px solid ${s.border}` : undefined,
                    borderRadius: s.radius !== 'n/a' ? s.radius : undefined,
                  }}>
                    <p style={{
                      fontFamily: s.stat ? 'var(--font-inter, Inter, system-ui, sans-serif)' : 'var(--font-inter-tight, Inter Tight, system-ui, sans-serif)',
                      fontSize: s.stat ? 'clamp(1.75rem, 3vw, 2.25rem)' : '18px',
                      fontWeight: s.stat ? 400 : 600,
                      letterSpacing: s.stat ? '-0.02em' : '-0.01em',
                      color: s.stat ? '#5CC8B8' : '#FFFFFF',
                      lineHeight: 1.2, margin: 0,
                    }}>
                      {s.mockTitle}
                    </p>
                    {s.mockText && (
                      <p style={{
                        fontSize: 14, lineHeight: 1.6, margin: '8px 0 0',
                        color: 'rgba(255,255,255,0.65)',
                      }}>
                        {s.mockText}
                      </p>
                    )}
                  </div>
                </div>
                <div className="bv4-surface-meta">
                  <div className="bv4-surface-meta-row">
                    <h4>{s.name}</h4>
                    <div className="bv4-surface-specs">
                      <button className="bv4-chip" onClick={() => copy(s.bg)}>
                        {copied === s.bg ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                        <span>{s.bg}</span>
                      </button>
                      {s.blur !== 'none' && (
                        <button className="bv4-chip" onClick={() => copy(`backdrop-filter: blur(${s.blur})`)}>
                          {copied === `backdrop-filter: blur(${s.blur})` ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                          <span>blur({s.blur})</span>
                        </button>
                      )}
                      {s.border !== 'none' && (
                        <button className="bv4-chip" onClick={() => copy(s.border)}>
                          {copied === s.border ? <CheckIcon size={11} /> : <CopyIcon size={11} />}
                          <span>{s.border}</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="bv4-surface-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== EFFECTS ========== */}
      <section className="bv4-section">
        <div className="container">
          <div className="bv4-section-label" id="effects"><span>Effects &amp; Motion</span></div>
          <h2 className="bv4-h2">Visual Effects</h2>
          <p className="bv4-desc">
            Ambient motion and interactive feedback tuned for the dark palette. Cursor and plasma effects use teal, creating colored light pools on the dark canvas.
          </p>

          <div className="bv4-effects-grid">
            {effects.map((e) => (
              <div key={e.name} className="bv4-effect-card">
                <h4>{e.name}</h4>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SPACING & RADII ========== */}
      <section className="bv4-section--alt">
        <div className="container">
          <div className="bv4-section-label" id="spacing"><span>Spacing &amp; Radii</span></div>
          <h2 className="bv4-h2">Spacing Scale</h2>
          <p className="bv4-desc">
            A 16-step scale from 4px micro-gaps to 180px section padding. Click to copy.
          </p>

          <div className="bv4-spacing-blocks">
            {spacingScale.map((s) => (
              <div key={s} className="bv4-spacing-item" onClick={() => copy(`${s}px`)} style={{ cursor: 'pointer' }}>
                <div style={{ width: Math.min(s, 80), height: Math.min(s, 80), background: '#5CC8B8', borderRadius: Math.min(s / 4, 8), opacity: 0.85 }} />
                <span>{copied === `${s}px` ? 'Copied' : `${s}`}</span>
              </div>
            ))}
          </div>

          <h3 className="bv4-group-label" style={{ marginBottom: 20 }}>Border Radius</h3>
          <div className="bv4-grid bv4-grid--radii">
            {radii.map((r) => (
              <div key={r.name} className="bv4-radius-card" onClick={() => copy(r.value)} style={{ cursor: 'pointer' }}>
                <div className="bv4-radius-preview" style={{ borderRadius: r.value }} />
                <div className="bv4-radius-name">{r.name}</div>
                <div className="bv4-radius-value">{copied === r.value ? 'Copied!' : r.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DESIGN PRINCIPLES ========== */}
      <section className="bv4-section">
        <div className="container">
          <div className="bv4-section-label"><span>Principles</span></div>
          <h2 className="bv4-h2">Design Principles</h2>
          <div className="bv4-principles-grid">
            <div className="bv4-principle">
              <h4>Open Canvas</h4>
              <p>No enclosing glass panels around content sections. The gradient is the canvas — cards float directly on it with ultra-subtle 0.04 backgrounds. The background gradient breathes through everything.</p>
            </div>
            <div className="bv4-principle">
              <h4>Single Accent</h4>
              <p>#5CC8B8 is the only chromatic color. It carries all interactive and emphatic meaning: stat values, links, checkmarks, eyebrows, slider thumbs, hover borders. This constraint creates a strong visual hierarchy.</p>
            </div>
            <div className="bv4-principle">
              <h4>Opacity as Hierarchy</h4>
              <p>Text hierarchy is built entirely from white opacity: 1.0 → 0.88 → 0.72 → 0.65 → 0.55 → 0.45 → 0.40. No secondary colors, no gray palette — just white at different opacities against dark backgrounds.</p>
            </div>
            <div className="bv4-principle">
              <h4>Teal-Colored Light</h4>
              <p>Ambient effects (cursor aura, plasma blobs) use teal instead of white. On the dark canvas, they create visible colored light pools rather than just luminance shifts. The interaction feel is immersive and dramatic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="bv4-footer">
        <p>STRATEGIA DESIGN SYSTEM v4.0 — DARK DEPTH</p>
      </div>
    </div>
  )
}
