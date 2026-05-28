import type { Metadata } from 'next'
import ModulePage from '@/components/vx/ModulePage'

export const metadata: Metadata = {
  title: 'V-Onboarding | Strategia Tech',
  description:
    "Custom 90-day plans tailored to the hire's psychometric profile, role, and team composition. Stop the sink-or-swim onboarding.",
}

export default function VOnboardingPage() {
  return (
    <ModulePage
      name="V-Onboarding"
      tagline="Personalized Integration Plans"
      num="M07"
      phase="Operate"
      accent="lime"
      headline="The first ninety days, personalized for the person you actually hired."
      headlineAccent="personalized for the person you actually hired."
      description="V-Onboarding turns the assessment into a 90-day plan. Roadmaps are generated from the hire's psychometric profile, role family, and team composition, and managers receive coaching nudges tuned to how the new hire is wired."
      statValue="45%"
      statLabel="Reduction in 90-day churn"
      statSub="Across health systems running V-Onboarding for two cohorts or more"
      features={[
        {
          title: 'Coaching nudges',
          body: 'Automated tips for managers on how to lead the new hire, drawn from their psychometric profile and team norms.',
        },
        {
          title: 'Skill gap bridging',
          body: 'Targeted learning modules for the competency gaps surfaced during assessment, not a generic onboarding checklist.',
        },
        {
          title: 'Culture fit alignment',
          body: 'Context on team norms, communication style, and meeting cadence so the new hire integrates socially, not just operationally.',
        },
      ]}
      related={[
        {
          slug: 'v-insights',
          num: 'M08',
          name: 'V-Insights',
          phase: 'Operate',
          blurb: 'Workforce-wide visibility: flight risk, mobility, succession.',
        },
        {
          slug: 'v-psych',
          num: 'M03',
          name: 'V-Psych',
          phase: 'Assess',
          blurb: 'Big Five profile with role-cohort T-scores.',
        },
        {
          slug: 'v-scenario',
          num: 'M06',
          name: 'V-Scenario',
          phase: 'Assess',
          blurb: 'Live work simulation. Strengths and risks, not a single score.',
        },
      ]}
      ctaLead="Keep the hire you fought to make."
      ctaAccent="From day one."
      ctaDesc="See V-Onboarding generate a 90-day plan from an assessment profile, with manager nudges already in the queue."
    />
  )
}
