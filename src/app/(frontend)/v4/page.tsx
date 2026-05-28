import '../v2/v3.css'
import '../v3/v5.css'
import './v6.css'

import {
  VariantAurora,
  VariantMesh,
  VariantNebula,
  VariantOrbs,
  VariantParticles,
  VariantTriParticles,
  VariantGlowTriangle,
  VariantTriParticlesOnly,
  VariantGlowTriangleOnly,
  VariantConcentricParticles,
  VariantBeaconTriangle,
} from '@/components/sections/v6/V6HeroShowcase'

export default function HomePageV6() {
  return (
    <div className="v3-page">
      {/* ── Option A — Aurora Drift ── */}
      <div className="v6-variant-label">
        <span className="tag">Option A</span>
        <span className="desc">Aurora Drift — gradient blobs that shift like northern lights</span>
      </div>
      <VariantAurora />

      <div className="v6-divider" />

      {/* ── Option B — Mesh Gradient Pulse ── */}
      <div className="v6-variant-label">
        <span className="tag">Option B</span>
        <span className="desc">Mesh Gradient Pulse — overlapping radial gradients that breathe and shift</span>
      </div>
      <VariantMesh />

      <div className="v6-divider" />

      {/* ── Option C — Nebula Smoke ── */}
      <div className="v6-variant-label">
        <span className="tag">Option C</span>
        <span className="desc">Nebula Smoke — soft luminous clouds drifting and morphing with color transitions</span>
      </div>
      <VariantNebula />

      <div className="v6-divider" />

      {/* ── Option D — Orb Float ── */}
      <div className="v6-variant-label">
        <span className="tag">Option D</span>
        <span className="desc">Orb Float — large luminous orbs with a glow behind the dashboard</span>
      </div>
      <VariantOrbs />

      <div className="v6-divider" />

      {/* ── Option E — Particle Field ── */}
      <div className="v6-variant-label">
        <span className="tag">Option E</span>
        <span className="desc">Particle Field — floating particles with connections that react to your mouse</span>
      </div>
      <VariantParticles />

      <div className="v6-divider" />

      {/* ── Option F — Particle Triangle ── */}
      <div className="v6-variant-label">
        <span className="tag">Option F</span>
        <span className="desc">Particle Triangle — the Strategia logo triangle formed from particles behind the dashboard, ripples on hover</span>
      </div>
      <VariantTriParticles />

      <div className="v6-divider" />

      {/* ── Option G — Glow Triangle ── */}
      <div className="v6-variant-label">
        <span className="tag">Option G</span>
        <span className="desc">Glow Triangle — luminous triangle outline behind the dashboard with layered glow and color-shifting</span>
      </div>
      <VariantGlowTriangle />

      <div className="v6-divider" />

      {/* ── Option H — Particle Triangle (no dashboard) ── */}
      <div className="v6-variant-label">
        <span className="tag">Option H</span>
        <span className="desc">Particle Triangle — logo triangle as the centrepiece, no dashboard mockup, mouse-reactive</span>
      </div>
      <VariantTriParticlesOnly />

      <div className="v6-divider" />

      {/* ── Option I — Glow Triangle (no dashboard) ── */}
      <div className="v6-variant-label">
        <span className="tag">Option I</span>
        <span className="desc">Glow Triangle — luminous triangle centrepiece with energy pulses, sparks, and floating echoes</span>
      </div>
      <VariantGlowTriangleOnly />

      <div className="v6-divider" />

      {/* ── Option J — Concentric Particle Triangles (no dashboard) ── */}
      <div className="v6-variant-label">
        <span className="tag">Option J</span>
        <span className="desc">Concentric Particle Triangles — 3 nested counter-rotating particle rings with energy conduits, mouse-scatter sparks</span>
      </div>
      <VariantConcentricParticles />

      <div className="v6-divider" />

      {/* ── Option K — Beacon Triangle (no dashboard) ── */}
      <div className="v6-variant-label">
        <span className="tag">Option K</span>
        <span className="desc">Beacon Triangle — luminous triangle with light rays from vertices, dashed orbit rings, pulsing core glow, mouse-reactive lens flares</span>
      </div>
      <VariantBeaconTriangle />
    </div>
  )
}
