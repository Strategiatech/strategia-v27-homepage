'use client'

/**
 * Questionnaire Admin Authentication Hook
 * Thin wrapper around useQuestionnaireAccess with admin config.
 * Kept for backward compatibility with existing consumers (DetailsClient).
 */

import { useQuestionnaireAccess, ADMIN_ACCESS_CONFIG } from './useQuestionnaireAccess'
import type { UseQuestionnaireAccessPorts, UseQuestionnaireAccessReturn } from './useQuestionnaireAccess'

export type UseQuestionnaireAuthPorts = UseQuestionnaireAccessPorts

export function useQuestionnaireAuth(ports?: UseQuestionnaireAuthPorts): UseQuestionnaireAccessReturn {
  return useQuestionnaireAccess(ADMIN_ACCESS_CONFIG, ports)
}
