/**
 * Questionnaire Admin Login Screen
 * Thin wrapper around QuestionnaireAccessScreen with admin variant.
 * Kept for backward compatibility with existing consumers (DetailsClient).
 */

import { QuestionnaireAccessScreen, ADMIN_VARIANT } from './QuestionnaireAccessScreen'
import type { QuestionnaireAccessScreenProps } from './QuestionnaireAccessScreen'

type QuestionnaireLoginScreenProps = Omit<QuestionnaireAccessScreenProps, 'variant'>

export function QuestionnaireLoginScreen(props: QuestionnaireLoginScreenProps) {
  return <QuestionnaireAccessScreen {...props} variant={ADMIN_VARIANT} />
}
