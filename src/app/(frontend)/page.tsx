import type { Metadata } from 'next'
import Navigation from '@/components/sections/Navigation'
import Hero from '@/components/sections/Hero'
import Problem from '@/components/sections/Problem'
import Pillars from '@/components/sections/Pillars'
import HowItWorks from '@/components/sections/HowItWorks'
import DeepDive from '@/components/sections/DeepDive'
import Outcomes from '@/components/sections/Outcomes'
import Enterprise from '@/components/sections/Integrations'
import Security from '@/components/sections/Security'
import RoiCalculator from '@/components/sections/RoiCalculator'
import Footer from '@/components/sections/Footer'
import ScrollRevealProvider from '@/components/ScrollRevealProvider'
import V27Home from '@/components/v27/V27Home'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://strategiatech.ai/',
  },
}

export default function HomePage() {
  if (process.env.NEXT_PUBLIC_PUBLISH_V27_AS_HOME === 'true') {
    return <V27Home />
  }

  return (
    <>
      <ScrollRevealProvider />
      <Navigation />
      <Hero />
      <Problem />
      <Pillars />
      <HowItWorks />
      <DeepDive />
      <Outcomes />
      <Enterprise />
      <Security />
      <RoiCalculator />
      <Footer />
    </>
  )
}
