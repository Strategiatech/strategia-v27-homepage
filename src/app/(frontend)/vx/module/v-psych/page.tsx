import type { Metadata } from 'next'
import ModulePage from '@/components/vx/ModulePage'

export const metadata: Metadata = {
  title: 'V-Psych | Strategia Tech',
  description:
    'A 5 to 7 minute proprietary OCEAN based assessment with T-score conversion, validated against role-specific performance indicators.',
}

export default function VPsychPage() {
  return (
    <ModulePage
      name="V-Psych"
      tagline="Industrial-Organizational Profiling"
      num="M03"
      phase="Assess"
      accent="teal"
      headline="Big Five psychometrics, calibrated on the people who actually do the work."
      headlineAccent="calibrated on the people who actually do the work."
      description="V-Psych is a proprietary assessment suite built by clinical psychologists. It measures the Big Five personality traits alongside cognitive aptitude, and converts every score to a T-score benchmarked against high performers in the same role family."
      statValue="0.85"
      statLabel="Predictive validity coefficient"
      statSub="Versus 0.18 for resume review and 0.21 for unstructured interview"
      features={[
        {
          title: 'OCEAN methodology',
          body: 'Measures Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism, scored against role-fit cohorts.',
        },
        {
          title: 'Adaptive testing',
          body: 'Item Response Theory adjusts question difficulty in real time, producing a sharper signal in five to seven minutes.',
        },
        {
          title: 'Role benchmarking',
          body: 'Compare candidate profiles against high-performer baselines specific to your organization and service line.',
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
      ctaDesc="See V-Psych run against your role family. Validity studies and norm-group documentation included."
    />
  )
}
