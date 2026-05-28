import type { Metadata } from 'next'
import ModulePage from '@/components/vx/ModulePage'

export const metadata: Metadata = {
  title: 'V-Interview | Strategia Tech',
  description:
    '24/7 on-demand AI avatar interviews. Structured NLP scoring reduces interviewer variability and mitigates bias.',
}

export default function VInterviewPage() {
  return (
    <ModulePage
      name="V-Interview"
      tagline="AI-Moderated Asynchronous Screening"
      num="M04"
      phase="Assess"
      accent="lime"
      headline="Standardize the first round. Score every candidate on the same questions."
      headlineAccent="Score every candidate on the same questions."
      description="V-Interview runs structured first-round interviews with an AI avatar. Candidates answer the same questions in the same order, and natural language analysis scores responses for content, sentiment, and decision quality, producing a defensible signal without interviewer drift."
      statValue="60%"
      statLabel="Reduction in screening time"
      statSub="Recruiters spend their hours on relationships, not first rounds"
      features={[
        {
          title: '24/7 availability',
          body: 'Candidates complete interviews on their own schedule across time zones, removing the calendar friction that kills time to hire.',
        },
        {
          title: 'Sentiment and content analysis',
          body: 'NLP scores responses for clarity, confidence, and decision quality alongside the spoken content of the answer.',
        },
        {
          title: 'Integrity controls',
          body: 'Monitors for tab switching, multiple voices, and off screen prompting, so the score reflects the candidate, not the room.',
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
      ctaLead="Interview the top 75 percent."
      ctaAccent="Not the top four."
      ctaDesc="See V-Interview moderate a structured round on a live requisition. Audit packet generated in real time."
    />
  )
}
