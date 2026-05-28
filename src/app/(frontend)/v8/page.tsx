import './v10.css'

import {
  VariantLiquid,
  VariantTerrain,
  VariantNeural,
  VariantWaveform,
  VariantPrismatic,
} from '@/components/sections/v10/V10HeroShowcase'

export default function HomePageV8() {
  return (
    <div className="v10-page">
      {/* ── Option A — Liquid Morphing ── */}
      <div className="v10-variant-label">
        <span className="tag">Option A</span>
        <span className="desc">Liquid Morphing — organic ink-drop blobs that merge and breathe across the page</span>
      </div>
      <VariantLiquid />

      <div className="v10-divider" />

      {/* ── Option B — Topographic Terrain ── */}
      <div className="v10-variant-label">
        <span className="tag">Option B</span>
        <span className="desc">Topographic Terrain — flowing contour lines with mouse-reactive ripple displacement</span>
      </div>
      <VariantTerrain />

      <div className="v10-divider" />

      {/* ── Option C — Neural Pulse Network ── */}
      <div className="v10-variant-label">
        <span className="tag">Option C</span>
        <span className="desc">Neural Pulse Network — living network graph with signal pulses traveling between nodes</span>
      </div>
      <VariantNeural />

      <div className="v10-divider" />

      {/* ── Option D — Waveform Interference ── */}
      <div className="v10-variant-label">
        <span className="tag">Option D</span>
        <span className="desc">Waveform Interference — overlapping sine waves with mouse-distorted interference patterns</span>
      </div>
      <VariantWaveform />

      <div className="v10-divider" />

      {/* ── Option E — Prismatic Light ── */}
      <div className="v10-variant-label">
        <span className="tag">Option E</span>
        <span className="desc">Prismatic Light — diagonal beams splitting into brand-colored refractions with floating flares</span>
      </div>
      <VariantPrismatic />
    </div>
  )
}
