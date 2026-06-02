import type { QuestionnaireFormData } from '../types/questionnaireForm'

export type QuestionnaireCompletionMap = Record<number, boolean>

export const getQuestionnaireCompletionMap = (
  formData: QuestionnaireFormData,
  termsAccepted: boolean,
  authorityConfirmed: boolean
): QuestionnaireCompletionMap => ({
  1: Boolean(
    formData.organisationName &&
      formData.headOfficeRegion &&
      formData.headOfficeLocation &&
      formData.industrySector &&
      formData.organisationType
  ),
  2: Boolean(formData.keyContactPerson && formData.contactEmail),
  3: Boolean(formData.totalRolesRecruited),
  4: Boolean(formData.annualEmployeeExits),
  5: Boolean(formData.currentATS || formData.currentHRIS),
  6: formData.internalStaffAssessment.length > 0,
  7: Object.values(formData.workflowPersonnelMap).some((personnel) => personnel.length > 0),
  8: formData.successCriteria.length > 0,
  9: Boolean(formData.approximateRoles),
  10: Boolean(formData.headOfficeRegion && formData.industrySector),
  11: Boolean(formData.signOffName && termsAccepted && authorityConfirmed),
})

export const getCompletedSectionCount = (completionMap: QuestionnaireCompletionMap) =>
  Object.values(completionMap).filter(Boolean).length
