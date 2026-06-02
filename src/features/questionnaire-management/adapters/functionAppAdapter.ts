import { functionAppClient } from '@/lib/functionAppClient'
import type {
  IQuestionnaireApiPort,
  QuestionnaireSubmitResult,
  QuestionnaireAccessResult,
} from '../ports'
import type { QuestionnaireFormData } from '../types/questionnaireForm'
import type { QuestionnaireSubmission } from '../types/questionnaire'

const PUBLIC_TOKEN_KEY = 'questionnaire_access_token'
const ADMIN_TOKEN_KEY = 'questionnaire_admin_auth_token'

function getSessionToken(key: string): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.sessionStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * Adapter implementing IQuestionnaireApiPort using functionAppClient.
 * Encapsulates HTTP communication details for questionnaire operations.
 */
export class FunctionAppAdapter implements IQuestionnaireApiPort {
  async submitQuestionnaire(
    data: QuestionnaireFormData,
    turnstileToken: string
  ): Promise<QuestionnaireSubmitResult> {
    const accessToken = getSessionToken(PUBLIC_TOKEN_KEY) ?? getSessionToken(ADMIN_TOKEN_KEY)
    const result = await functionAppClient.post<{ submissionId: number }>(
      '/api/questionnaire',
      { ...data, turnstileToken },
      { accessToken }
    )

    if (result.success) {
      // Backend may return submissionId at top level (not nested in data)
      const id =
        (result as unknown as Record<string, unknown>).submissionId ??
        result.data?.submissionId ??
        undefined
      return {
        success: true,
        submissionId: typeof id === 'number' ? id : undefined,
      }
    }

    return {
      success: false,
      message: result.message,
      error: result.error,
    }
  }

  async validateAccess(password: string): Promise<QuestionnaireAccessResult> {
    const result = await functionAppClient.post<{
      success: boolean
      accessToken?: string
      expiresIn?: number
    }>(
      '/api/questionnaire/access',
      { password }
    )

    return {
      success: result.success,
      accessToken: (result as unknown as Record<string, unknown>).accessToken as string | undefined,
      expiresIn: (result as unknown as Record<string, unknown>).expiresIn as number | undefined,
      message: result.success
        ? undefined
        : result.message || 'Invalid password',
    }
  }

  async validateAdminAccess(password: string): Promise<QuestionnaireAccessResult> {
    const result = await functionAppClient.post<{
      success: boolean
      accessToken?: string
      expiresIn?: number
    }>(
      '/api/questionnaire/auth',
      { password }
    )

    return {
      success: result.success,
      accessToken: (result as unknown as Record<string, unknown>).accessToken as string | undefined,
      expiresIn: (result as unknown as Record<string, unknown>).expiresIn as number | undefined,
      message: result.success
        ? undefined
        : result.message || 'Invalid access key',
    }
  }

  async fetchSubmissions(status: string): Promise<QuestionnaireSubmission[]> {
    const accessToken = getSessionToken(ADMIN_TOKEN_KEY)
    const result = await functionAppClient.get<QuestionnaireSubmission[]>(
      '/api/questionnaire',
      { status, limit: '100' },
      { accessToken }
    )

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch submissions')
    }

    return result.data as QuestionnaireSubmission[]
  }
}
