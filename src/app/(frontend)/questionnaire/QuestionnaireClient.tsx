'use client'

import {
  useQuestionnaireAccess,
  QuestionnaireAccessScreen,
  QuestionnaireReferenceExperience,
} from '@/features/questionnaire-management'

export default function QuestionnaireClient() {
  const auth = useQuestionnaireAccess()

  if (!auth.isAuthenticated) {
    return (
      <QuestionnaireAccessScreen
        password={auth.password}
        setPassword={auth.setPassword}
        isValidating={auth.isValidating}
        onSubmit={auth.handlePasswordSubmit}
      />
    )
  }

  return <QuestionnaireReferenceExperience />
}
