import type { Metadata } from 'next'
import ModulePage from '@/components/vx/ModulePage'

export const metadata: Metadata = {
  title: 'V-Insights | Strategia Tech',
  description:
    'Group-level workforce visibility with phase-based maturity. Internal mobility scoring against every internal opening.',
}

export default function VInsightsPage() {
  return (
    <ModulePage
      name="V-Insights"
      tagline="Operational Talent Intelligence"
      num="M08"
      phase="Operate"
      accent="teal"
      headline="Turn HR data into board-level strategy."
      headlineAccent="board-level strategy."
      description="V-Insights is the real-time command center for the workforce already in the building. Attrition risk, succession depth, internal mobility, and diversity metrics flow into one view, with the same evidence trail Strategia uses to defend every hire."
      statValue="100%"
      statLabel="Visibility across the workforce"
      statSub="From individual flight risk to service-line succession depth"
      features={[
        {
          title: 'Flight risk prediction',
          body: 'Engagement signals, performance trend, and market comparables flag high-value employees at risk of leaving before they update their profile.',
        },
        {
          title: 'Succession modeling',
          body: 'Internal candidates scored for leadership roles on potential and performance, not tenure or proximity to the hiring manager.',
        },
        {
          title: 'DEI analytics',
          body: 'Tracks diversity metrics across every stage of the funnel, surfacing the points where the pipeline narrows.',
        },
      ]}
      related={[
        {
          slug: 'v-onboarding',
          num: 'M07',
          name: 'V-Onboarding',
          phase: 'Operate',
          blurb: 'Generates the 90-day plan from the assessment profile.',
        },
        {
          slug: 'v-psych',
          num: 'M03',
          name: 'V-Psych',
          phase: 'Assess',
          blurb: 'Big Five profile with role-cohort T-scores.',
        },
        {
          slug: 'v-parse',
          num: 'M02',
          name: 'V-Parse',
          phase: 'Screen',
          blurb: 'Structured CV evidence, scored against the V-Job spec.',
        },
      ]}
      ctaLead="Lead the workforce you have."
      ctaAccent="Not the one your HRIS reports."
      ctaDesc="See V-Insights compile a weekly brief on attrition risk, internal mobility, and succession depth for your system."
    />
  )
}
