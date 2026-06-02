'use client'

import { useEffect, useRef } from 'react'
import VxNav from '@/components/vx/VxNav'
import '../v25/v25.css'
import '../vx/vx-overrides.css'
import './vx-hero-concepts.css'

/* eslint-disable @next/next/no-img-element */

/* ============================================================================
   /vx-hero-concepts — internal review page. Stacks four hero treatments
   one above the other. Each section has the full VX nav and a different
   triangular treatment of the video on the right.

   Every visible angled line is at 60° from horizontal (the angle of an
   equilateral triangle's side). The tri-box per variant is sized so the
   clip-path polygon coordinates render as a true equilateral / 60°
   diagonal in real pixels. See vx-hero-concepts.css for the aspect-ratio
   math.

   No intro section, no per-variant captions. Each variant is identified
   only by a small letter badge sitting beside the Book a demo button.
   ============================================================================ */

const VIDEO_SRC = '/vx/videos/hero-explainer.mp4'

type Variant = {
  key: string
  badge: string
  /** SVG polyline points inside the variant's tri-box (0-100 viewBox). */
  strokePoints: string
}

const VARIANTS: Variant[] = [
  // A — rising diagonal at 60°. tri-box aspect 1/√3 so the BL-TR
  //     diagonal rises at 60° (tan 60° = √3). Triangle vertices
  //     BL (0,100), TR (100,0), BR (100,100). Visible stroke is just
  //     the hypotenuse from BL up to TR.
  { key: 'rising-diag', badge: 'A', strokePoints: '0,100 100,0' },

  // B — up-pointing true equilateral. tri-box aspect 2/√3 so the
  //     polygon (50,0)-(100,100)-(0,100) renders with all sides equal
  //     and all interior angles 60°.
  { key: 'up-eq', badge: 'B', strokePoints: '50,0 100,100 0,100 50,0' },

  // C — up-pointing true equilateral, larger sibling of B. Same
  //     orientation (horizontal base, apex up), bigger footprint.
  //     Same stroke polyline as B.
  { key: 'right-eq', badge: 'C', strokePoints: '50,0 100,100 0,100 50,0' },

  // D — falling diagonal at 60°. Mirror of A.
  { key: 'falling-diag', badge: 'D', strokePoints: '0,0 100,100' },

  // E — soft fade. Video covers the right portion and its left edge
  //     fades into the dark hero via a horizontal mask. No stroke.
  { key: 'fade', badge: 'E', strokePoints: '' },

  // F — half-and-half. Video fills the right half with a hard vertical
  //     edge at 50%; a vertical stroke marks the split.
  { key: 'split', badge: 'F', strokePoints: '0,0 0,100' },
]

function HeroVariant({ variant }: { variant: Variant }) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const headlineEndRef = useRef<HTMLSpanElement>(null)

  // The diagonal slashes (A, D) anchor to the right edge of "Intelligence."
  // and span the full stage height at 60°. CSS can't know the rendered
  // text width or the actual stage height (the hero can be taller than
  // 100vh-72px depending on content/viewport). Measure both and publish
  // them as --text-right and --stage-h so the clip-path AND the stroke
  // are derived from identical numbers, eliminating any angle/length gap.
  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const hlEnd = headlineEndRef.current
    if (!section || !stage || !hlEnd) return

    const update = () => {
      const stageRect = stage.getBoundingClientRect()
      const hlRect = hlEnd.getBoundingClientRect()
      section.style.setProperty(
        '--text-right',
        `${Math.round(hlRect.right - stageRect.left)}px`,
      )
      section.style.setProperty('--stage-h', `${Math.round(stageRect.height)}px`)
    }

    update()
    window.addEventListener('resize', update)
    // Fonts can change the headline width after first paint.
    document.fonts?.ready.then(update).catch(() => {})
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section ref={sectionRef} className={`vx-concept vx-concept--${variant.key}`}>
      <VxNav />

      <div className="vx-concept-hero">
        <div className="vx-concept-video-stage" ref={stageRef} aria-hidden="true">
          <div className="vx-concept-tri-box">
            <div className="vx-concept-tri-clip">
              <video
                className="vx-concept-video"
                src={VIDEO_SRC}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="vx-concept-video-tint" />
            </div>
            <svg
              className="vx-concept-tri-stroke"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points={variant.strokePoints} />
            </svg>
            {/* Diagonal stroke for A and D — CSS positions and rotates
                this rect so the endpoints land exactly on the clip-path
                edge of those variants. Hidden by CSS for B and C. */}
            <div className="vx-concept-diag-line" />
          </div>
        </div>

        <div className="v25-hero-copy vx-concept-copy">
          <h1>
            AI-Native<br />Workforce<br />
            <span ref={headlineEndRef} className="accent accent--sky">Intelligence.</span>
          </h1>
          <p>
            Predict performance before it lands. Build the engine that finds the next one.
            A multi-module workforce intelligence platform built on structured scientific
            frameworks, automating 80% of the recruitment lifecycle.
          </p>
          <p className="vx-hero-sub">
            For HR, Talent, and Executive teams making better, faster, more defensible
            decisions at scale, and compounding every hire into the internal engine that
            finds the next one.
          </p>
          <div className="v25-hero-actions">
            <a href="#demo" className="v25-btn-primary">Book a demo</a>
            <span className="vx-concept-badge" aria-hidden="true">{variant.badge}</span>
            <a href="#modules" className="v25-link-arrow">
              Explore the platform<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function VxHeroConceptsPage() {
  return (
    <div className="v25 v25--complete vx-concepts">
      {VARIANTS.map((v) => (
        <HeroVariant key={v.key} variant={v} />
      ))}
    </div>
  )
}
