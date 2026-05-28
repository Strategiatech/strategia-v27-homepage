import type { Metadata } from 'next'
import ModulePage from '@/components/vx/ModulePage'

export const metadata: Metadata = {
  title: 'V-Parse | Strategia Tech',
  description:
    'Process 1,000 CVs per hour into structured talent data. Domain-specific algorithms for high-precision matching beyond keyword filters.',
}

export default function VParsePage() {
  return (
    <ModulePage
      name="V-Parse"
      tagline="Semantic CV Analysis Engine"
      num="M02"
      phase="Screen"
      accent="sky"
      headline="One thousand CVs an hour, scored against the spec."
      headlineAccent="scored against the spec."
      description="V-Parse turns unstructured CVs into structured talent data. It goes beyond keyword matching to understand context, chronology, and competency depth, so every applicant is scored against the V-Job specification."
      statValue="1,000+"
      statLabel="CVs processed per hour"
      statSub="Domain-specific algorithms, not keyword filters"
      features={[
        {
          title: 'Contextual taxonomy',
          body: 'Maps over 40,000 skills across 140 languages, distinguishing between clinical certifications, specializations, and adjacent competencies.',
        },
        {
          title: 'Format agnostic',
          body: 'Ingests PDF, DOCX, HTML, and image based resumes with 99.8% OCR accuracy. No template, no rejection.',
        },
        {
          title: 'Bias stripping',
          body: 'Automatically redacts personally identifiable information so screening runs on competency evidence, not demographic signal.',
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
          slug: 'v-scenario',
          num: 'M06',
          name: 'V-Scenario',
          phase: 'Assess',
          blurb: 'Live work simulation. Strengths and risks, not a single score.',
        },
      ]}
      ctaLead="Screen every applicant."
      ctaAccent="Surface the wildcards."
      ctaDesc="See V-Parse run on a live requisition. Ranked shortlist in under twenty five minutes, audit trail attached."
    />
  )
}
