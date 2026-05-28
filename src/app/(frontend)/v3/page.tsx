import '../v2/v3.css'
import './v5.css'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'
import V3Navigation from '@/components/sections/v3/V3Navigation'
import V5Hero from '@/components/sections/v5/V5Hero'
import V3Problem from '@/components/sections/v3/V3Problem'
import V3Triangulate from '@/components/sections/v3/V3Triangulate'
import V3Science from '@/components/sections/v3/V3Science'
import V5HowItWorks from '@/components/sections/v5/V5HowItWorks'
import V5Modules from '@/components/sections/v5/V5Modules'
import V5Outcomes from '@/components/sections/v5/V5Outcomes'
import V3DeepDive from '@/components/sections/v3/V3DeepDive'
import V3Enterprise from '@/components/sections/v3/V3Enterprise'
import V3Sovereignty from '@/components/sections/v3/V3Sovereignty'
import V3Implementation from '@/components/sections/v3/V3Implementation'
import V3Traction from '@/components/sections/v3/V3Traction'
import V3RoiCalculator from '@/components/sections/v3/V3RoiCalculator'
import V3Contact from '@/components/sections/v3/V3Contact'
import V3Footer from '@/components/sections/v3/V3Footer'

export default function HomePageV5() {
  return (
    <div className="v3-page">
      <div className="v3-stage" />
      <div className="v3-stage-net" />
      <div className="v3-stage-grain" />
      <ScrollRevealProvider />
      <V3Navigation />
      <V5Hero />
      <V3Problem />
      <V3Triangulate />
      <V3Science />
      <V5HowItWorks />
      <V5Modules />
      <V5Outcomes />
      <V3DeepDive />
      <V3Enterprise />
      <V3Sovereignty />
      <V3Implementation />
      <V3Traction />
      <V3RoiCalculator />
      <V3Contact />
      <V3Footer />
    </div>
  )
}
