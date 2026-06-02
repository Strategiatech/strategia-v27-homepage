import type { Metadata } from 'next'

import QuestionnaireProviders from '../QuestionnaireProviders'
import DetailsClient from './DetailsClient'

export const metadata: Metadata = {
  title: 'Questionnaire Submissions | Strategia Admin',
  description: 'View and manage questionnaire submissions',
}

export default function QuestionnaireDetailsPage() {
  return (
    <QuestionnaireProviders>
      <DetailsClient />
    </QuestionnaireProviders>
  )
}
