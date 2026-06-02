import type { QuestionnaireFormData } from '../types/questionnaireForm'
import type { QuestionnaireSubmission } from '../types/questionnaire'

/**
 * Result of submitting a questionnaire form.
 */
export interface QuestionnaireSubmitResult {
  success: boolean
  submissionId?: number
  message?: string
  error?: string
}

/**
 * Result of validating questionnaire access.
 */
export interface QuestionnaireAccessResult {
  success: boolean
  message?: string
  accessToken?: string
  expiresIn?: number
}

/**
 * Port interface for questionnaire API communication.
 * Core logic depends on this interface, not on functionAppClient directly.
 */
export interface IQuestionnaireApiPort {
  submitQuestionnaire(
    data: QuestionnaireFormData,
    turnstileToken: string
  ): Promise<QuestionnaireSubmitResult>

  validateAccess(password: string): Promise<QuestionnaireAccessResult>

  /** Validate admin access key for the submissions dashboard. */
  validateAdminAccess(password: string): Promise<QuestionnaireAccessResult>

  /** Fetch questionnaire submissions, optionally filtered by status. */
  fetchSubmissions(status: string): Promise<QuestionnaireSubmission[]>
}
