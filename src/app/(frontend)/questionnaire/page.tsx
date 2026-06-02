import type { Metadata } from 'next'

import QuestionnaireClient from './QuestionnaireClient'
import QuestionnaireProviders from './QuestionnaireProviders'

export const metadata: Metadata = {
  title: 'Discovery Questionnaire | Strategia',
  description: 'Initial pilot setup discovery questionnaire for Strategia',
}

export default function QuestionnairePage() {
  return (
    <QuestionnaireProviders>
      <QuestionnaireClient />
    </QuestionnaireProviders>
  )
}
