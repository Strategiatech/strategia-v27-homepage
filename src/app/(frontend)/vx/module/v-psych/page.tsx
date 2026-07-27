import type { Metadata } from 'next'
import ModulePage from '@/components/vx/ModulePage'

export const metadata: Metadata = {
  title: 'V-Psych | Strategia Tech',
  description:
    'A proprietary OCEAN-based assessment with structured scoring and role-specific interpretation.',
}

export default function VPsychPage() {
  return (
    <ModulePage
      name="V-Psych"
      tagline="Industrial-Organizational Profiling"
      num="M03"
      phase="Assess"
      accent="teal"
      headline="Big Five psychometrics, structured for role-specific assessment."
      headlineAccent="structured for role-specific assessment."
      description="V-Psych is a proprietary assessment suite grounded in the Big Five model and structured scoring. It measures the Big Five personality traits and produces a role-specific profile for interpretation."
      statValue="Reviewed"
      statLabel="Independent methodology review"
      statSub="By a PhD-level Industrial-Organizational Psychologist"
      features={[
        {
          title: 'OCEAN methodology',
          body: 'Measures Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism, scored against role-fit cohorts.',
        },
        {
          title: 'Structured assessment',
          body: 'A consistent response format supports transparent scoring and repeatable administration.',
        },
        {
          title: 'Role context',
          body: 'Interpret candidate profiles against documented role requirements and assessment criteria.',
        },
      ]}
      related={[
        {
          slug: 'v-interview',
          num: 'M04',
          name: 'V-Interview',
          phase: 'Assess',
          blurb: 'Same questions for every candidate, scored by NLP.',
        },
        {
          slug: 'v-scenario',
          num: 'M06',
          name: 'V-Scenario',
          phase: 'Assess',
          blurb: 'Live work simulation. Strengths and risks, not a single score.',
        },
        {
          slug: 'v-parse',
          num: 'M02',
          name: 'V-Parse',
          phase: 'Screen',
          blurb: 'Structured CV evidence, scored against the V-Job spec.',
        },
      ]}
      ctaLead="Replace gut-feel screening."
      ctaAccent="Defend every assessment."
      ctaDesc="See V-Psych run against your role family. Methodology and evidence documentation available for review."
    />
  )
}
