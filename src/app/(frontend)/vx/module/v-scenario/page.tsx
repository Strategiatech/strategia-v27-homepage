import type { Metadata } from 'next'
import ModulePage from '@/components/vx/ModulePage'

export const metadata: Metadata = {
  title: 'V-Scenario | Strategia Tech',
  description:
    'Interactive role-specific scenarios from patient care to executive decisions. Multi-dimensional scoring with strengths and risks.',
}

export default function VScenarioPage() {
  return (
    <ModulePage
      name="V-Scenario"
      tagline="Immersive Work Simulations"
      num="M06"
      phase="Assess"
      accent="sky"
      headline="See the candidate work. Then score how they worked."
      headlineAccent="Then score how they worked."
      description="V-Scenario runs role-specific simulations from bedside patient care to executive decisions. Multi-branching narratives adapt to the candidate's choices, and a multi-dimensional scoring model returns both strengths and risks instead of a single composite."
      statValue="90%"
      statLabel="Candidate engagement rate"
      statSub="Realistic scenarios candidates actually want to finish"
      features={[
        {
          title: 'Scenario library',
          body: 'Pre-built libraries for clinical, nursing, allied health, and administrative roles, expanded on a quarterly release cadence.',
        },
        {
          title: 'Adaptive narratives',
          body: 'Multi-branching scenarios that adapt to candidate choices, so two candidates rarely see the same path through the same case.',
        },
        {
          title: 'Cognitive load testing',
          body: 'Timed stressors and competing priorities surface how the candidate performs when the floor is busy, not when it is quiet.',
        },
      ]}
      related={[
        {
          slug: 'v-psych',
          num: 'M03',
          name: 'V-Psych',
          phase: 'Assess',
          blurb: 'Big Five profile with role-cohort T-scores.',
        },
        {
          slug: 'v-interview',
          num: 'M04',
          name: 'V-Interview',
          phase: 'Assess',
          blurb: 'Same questions for every candidate, scored by NLP.',
        },
        {
          slug: 'v-onboarding',
          num: 'M07',
          name: 'V-Onboarding',
          phase: 'Operate',
          blurb: 'Generates the 90-day plan from the assessment profile.',
        },
      ]}
      ctaLead="Stop hiring on hypotheticals."
      ctaAccent="Hire on observed work."
      ctaDesc="See V-Scenario run a role-specific simulation against your competency model. Strengths and risks delivered with the score."
    />
  )
}
