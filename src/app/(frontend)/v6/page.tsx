import '../v2/v3.css'
import '../v3/v5.css'
import './v8.css'

import ScrollRevealProvider from '@/components/ScrollRevealProvider'
import V3Navigation from '@/components/sections/v3/V3Navigation'
import V5Hero from '@/components/sections/v5/V5Hero'
import V3Problem from '@/components/sections/v3/V3Problem'
import V3Triangulate from '@/components/sections/v3/V3Triangulate'
import V5HowItWorks from '@/components/sections/v5/V5HowItWorks'
import V3Science from '@/components/sections/v3/V3Science'
import V5Modules from '@/components/sections/v5/V5Modules'
import V3DeepDive from '@/components/sections/v3/V3DeepDive'
import V3Enterprise from '@/components/sections/v3/V3Enterprise'
import V3Sovereignty from '@/components/sections/v3/V3Sovereignty'
import V5Outcomes from '@/components/sections/v5/V5Outcomes'
import V3Traction from '@/components/sections/v3/V3Traction'
import V3RoiCalculator from '@/components/sections/v3/V3RoiCalculator'
import V3Contact from '@/components/sections/v3/V3Contact'
import V3Footer from '@/components/sections/v3/V3Footer'

function OrbBg({ variant }: { variant: 'hero' | 'a' | 'b' | 'c' }) {
  return (
    <div className={`v8-orb-bg v8-orb-${variant}`}>
      <div className="v8-orb" />
      <div className="v8-orb" />
      <div className="v8-orb" />
      {variant === 'hero' && <div className="v8-orb" />}
    </div>
  )
}

export default function HomePageV8() {
  return (
    <div className="v3-page v8-page">
      <ScrollRevealProvider />
      <V3Navigation />

      {/* ── 1. HERO (DARK + orbs) ── */}
      <div className="v8-dark">
        <OrbBg variant="hero" />
        <V5Hero />
      </div>

      {/* ── 2. PROBLEM (LIGHT) ── */}
      <div className="v8-light">
        <V3Problem />
      </div>

      {/* ── 3. TRIANGULATE METHOD (DARK + orbs) ── */}
      <div className="v8-dark">
        <OrbBg variant="a" />
        <V3Triangulate />
      </div>

      {/* ── 4. HOW IT WORKS (LIGHT) ── */}
      <div className="v8-light">
        <V5HowItWorks />
      </div>

      {/* ── 5. OCEAN SCIENCE (DARK + orbs) ── */}
      <div className="v8-dark">
        <OrbBg variant="b" />
        <V3Science />
      </div>

      {/* ── 6. PLATFORM MODULES (LIGHT) ── */}
      <div className="v8-light">
        <V5Modules />
      </div>

      {/* ── 7. INDUSTRY DEEP DIVE (DARK + orbs) ── */}
      <div className="v8-dark">
        <OrbBg variant="c" />
        <V3DeepDive />
      </div>

      {/* ── 8. ENTERPRISE INFRA (LIGHT) ── */}
      <div className="v8-light">
        <V3Enterprise />
      </div>

      {/* ── 9. DATA SOVEREIGNTY (DARK + orbs) ── */}
      <div className="v8-dark">
        <OrbBg variant="a" />
        <V3Sovereignty />
      </div>

      {/* ── 10. OUTCOMES (LIGHT) ── */}
      <div className="v8-light">
        <V5Outcomes />
      </div>

      {/* ── 11. TRACTION (DARK + orbs) ── */}
      <div className="v8-dark">
        <OrbBg variant="b" />
        <V3Traction />
      </div>

      {/* ── 12. ROI CALCULATOR (LIGHT) ── */}
      <div className="v8-light">
        <V3RoiCalculator />
      </div>

      {/* ── 13. CONTACT (DARK + orbs) ── */}
      <div className="v8-dark">
        <OrbBg variant="c" />
        <V3Contact />
      </div>

      {/* ── 14. FOOTER (DARK) ── */}
      <div className="v8-dark">
        <V3Footer />
      </div>
    </div>
  )
}
