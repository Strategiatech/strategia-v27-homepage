/**
 * Questionnaire Management Feature - Public API
 */

// Components
export {
  QuestionnaireLoginScreen,
  QuestionnaireStatsCard,
  QuestionnaireFilters,
  QuestionnaireTable,
  QuestionnaireDetailsModal,
  QuestionnaireAccessScreen,
  QuestionnaireSuccessScreen,
  QuestionnaireReferenceExperience,
  QuestionnaireProgressBar,
  QuestionnaireHeroSection,
  OrganisationInfoSection,
  ProjectChampionSection,
  RecruitmentActivitySection,
  OrganisationalInsightsSection,
  TechnologyPlatformsSection,
  PsychometricsAssessmentSection,
  RecruitmentWorkflowSection,
  SuccessCriteriaSection,
  PilotProjectSection,
  ProjectedValueSection,
  SignOffSection,
} from './components'
export type { QuestionnaireAccessScreenProps, QuestionnaireAccessVariant } from './components'
export { ADMIN_VARIANT } from './components'
export type { QuestionnaireSuccessScreenProps } from './components'
export type { QuestionnaireProgressBarProps } from './components'

// Hooks
export { useQuestionnaireAuth, useQuestionnaireSubmissions, useQuestionnaireAccess, useQuestionnaireForm } from './hooks'
export type { UseQuestionnaireFormReturn } from './hooks'

// Types
export type { QuestionnaireSubmission } from './types/questionnaire'
export type {
  QuestionnaireFormData,
  QuestionnaireSection,
  FormSectionProps,
  SignOffSectionProps,
  OfficeLocation,
  PilotRoleEntry,
  PilotJobDescriptionEntry,
} from './types/questionnaireForm'

// Constants
export {
  QUESTIONNAIRE_SECTIONS,
  INITIAL_FORM_DATA,
  REGIONS,
  REGION_CITIES,
  INDUSTRY_OPTIONS,
  CURRENCY_OPTIONS,
  JOB_TYPE_OPTIONS,
  AD_PLATFORM_OPTIONS,
  ATS_OPTIONS,
  RECRUITMENT_ASSESSMENT_OPTIONS,
  INTERNAL_STAFF_OPTIONS,
  REPORT_ACCESS_OPTIONS,
  LEADERSHIP_INTEREST_OPTIONS,
  WORKFLOW_STEPS_DEFAULT,
  WORKFLOW_PERSONNEL_OPTIONS,
  SUCCESS_CRITERIA_OPTIONS,
  TOTAL_SECTIONS,
} from './constants'

// Ports
export type {
  IQuestionnaireApiPort,
  ISessionStoragePort,
  INotificationPort,
  QuestionnaireSubmitResult,
  QuestionnaireAccessResult,
} from './ports'

// Adapters
export { FunctionAppAdapter, BrowserSessionAdapter, SonnerNotificationAdapter } from './adapters'

// Container (composition root)
export { defaultApiAdapter, defaultSessionAdapter, defaultNotificationAdapter } from './container'

// Hook port types
export type { UseQuestionnaireFormPorts } from './hooks/useQuestionnaireForm'
export type { UseQuestionnaireAccessPorts, UseQuestionnaireAccessConfig } from './hooks/useQuestionnaireAccess'
export { ADMIN_ACCESS_CONFIG } from './hooks/useQuestionnaireAccess'
export type { UseQuestionnaireAuthPorts } from './hooks/useQuestionnaireAuth'
export type { UseQuestionnaireSubmissionsPorts } from './hooks/useQuestionnaireSubmissions'

// Utils
export { renderValue, formatDate, getStatusColor } from './utils/formatters'
export { exportAsPDF, exportAsWord, exportAsTXT, exportAsJSON } from './utils/exportHelpers'
