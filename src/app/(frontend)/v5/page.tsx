import '../v2/v3.css'
import '../v3/v5.css'
import './v9.css'

import {
  LightVariantAurora,
  LightVariantMesh,
  LightVariantNebula,
  LightVariantOrbs,
  LightVariantParticles,
  LightVariantTriParticles,
  LightVariantGlowTriangle,
  LightVariantTriParticlesOnly,
  LightVariantGlowTriangleOnly,
  LightVariantConcentricParticles,
  LightVariantBeaconTriangle,
} from '@/components/sections/v9/V9HeroShowcase'

export default function HomePageV7() {
  return (
    <div className="v3-page v9-page">
      {/* â”€â”€ Option A â€” Aurora Drift â”€â”€ */}
      <div className="v9-variant-label">
        <span className="tag">Option A</span>
        <span className="desc">Aurora Drift â€” soft gradient washes that shift and breathe across the page</span>
      </div>
      <LightVariantAurora />

      <div className="v9-divider" />

      {/* â”€â”€ Option B â€” Mesh Gradient Pulse â”€â”€ */}
      <div className="v9-variant-label">
        <span className="tag">Option B</span>
        <span className="desc">Mesh Gradient Pulse â€” overlapping radial gradients that breathe and shift</span>
      </div>
      <LightVariantMesh />

      <div className="v9-divider" />

      {/* â”€â”€ Option C â€” Nebula Smoke â”€â”€ */}
      <div className="v9-variant-label">
        <span className="tag">Option C</span>
        <span className="desc">Nebula Smoke â€” soft coloured clouds drifting and morphing with gentle colour transitions</span>
      </div>
      <LightVariantNebula />

      <div className="v9-divider" />

      {/* â”€â”€ Option D â€” Orb Float â”€â”€ */}
      <div className="v9-variant-label">
        <span className="tag">Option D</span>
        <span className="desc">Orb Float â€” soft coloured orbs drifting behind the dashboard with subtle colour shifts</span>
      </div>
      <LightVariantOrbs />

      <div className="v9-divider" />

      {/* â”€â”€ Option E â€” Particle Field â”€â”€ */}
      <div className="v9-variant-label">
        <span className="tag">Option E</span>
        <span className="desc">Particle Field â€” floating particles with connections that react to your mouse</span>
      </div>
      <LightVariantParticles />

      <div className="v9-divider" />

      {/* â”€â”€ Option F â€” Particle Triangle â”€â”€ */}
      <div className="v9-variant-label">
        <span className="tag">Option F</span>
        <span className="desc">Particle Triangle â€” the Strategia logo triangle formed from particles behind the dashboard, ripples on hover</span>
      </div>
      <LightVariantTriParticles />

      <div className="v9-divider" />

      {/* â”€â”€ Option G â€” Glow Triangle â”€â”€ */}
      <div className="v9-variant-label">
        <span className="tag">Option G</span>
        <span className="desc">Glow Triangle â€” teal/navy triangle outline behind the dashboard with layered glow and colour-shifting</span>
      </div>
      <LightVariantGlowTriangle />

      <div className="v9-divider" />

      {/* â”€â”€ Option H â€” Particle Triangle (no dashboard) â”€â”€ */}
      <div className="v9-variant-label">
        <span className="tag">Option H</span>
        <span className="desc">Particle Triangle â€” logo triangle as the centrepiece, no dashboard mockup, mouse-reactive</span>
      </div>
      <LightVariantTriParticlesOnly />

      <div className="v9-divider" />

      {/* â”€â”€ Option I â€” Glow Triangle (no dashboard) â”€â”€ */}
      <div className="v9-variant-label">
        <span className="tag">Option I</span>
        <span className="desc">Glow Triangle â€” luminous triangle centrepiece with energy pulses, sparks, and floating echoes</span>
      </div>
      <LightVariantGlowTriangleOnly />

      <div className="v9-divider" />

      {/* â”€â”€ Option J â€” Concentric Particle Triangles (no dashboard) â”€â”€ */}
      <div className="v9-variant-label">
        <span className="tag">Option J</span>
        <span className="desc">Concentric Particle Triangles â€” 3 nested counter-rotating particle rings with energy conduits, mouse-scatter sparks</span>
      </div>
      <LightVariantConcentricParticles />

      <div className="v9-divider" />

      {/* â”€â”€ Option K â€” Beacon Triangle (no dashboard) â”€â”€ */}
      <div className="v9-variant-label">
        <span className="tag">Option K</span>
        <span className="desc">Beacon Triangle â€” triangle with light rays from vertices, dashed orbit rings, pulsing core glow, mouse-reactive lens flares</span>
      </div>
      <LightVariantBeaconTriangle />
    </div>
  )
}

