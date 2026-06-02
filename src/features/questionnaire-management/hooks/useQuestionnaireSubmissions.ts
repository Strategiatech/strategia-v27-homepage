'use client'

/**
 * Questionnaire Submissions Data Hook
 * Fetches and manages questionnaire submission data via injected port.
 */

import { useQuery } from '@tanstack/react-query'
import type { IQuestionnaireApiPort } from '../ports'
import { defaultApiAdapter } from '../container'
import type { QuestionnaireSubmission } from '../types/questionnaire'

export interface UseQuestionnaireSubmissionsPorts {
  api?: IQuestionnaireApiPort
}

export function useQuestionnaireSubmissions(
  status: string,
  isAuthenticated: boolean,
  ports?: UseQuestionnaireSubmissionsPorts
) {
  const api = ports?.api ?? defaultApiAdapter

  return useQuery<QuestionnaireSubmission[]>({
    queryKey: ['questionnaire-submissions', status],
    queryFn: () => api.fetchSubmissions(status),
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  })
}
