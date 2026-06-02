import React from 'react'

export interface OfficeLocation {
  region: string
  location: string
  isHeadOffice?: boolean
}

export interface PilotRoleEntry {
  title: string
  department: string
  positions: string
  notes: string
}

export interface PilotJobDescriptionEntry {
  roleIndex: string
  title: string
  text: string
}

/** All fields across the 11 questionnaire sections. */
export interface QuestionnaireFormData {
  // Section 1: Organisation Information
  organisationName: string
  headOfficeRegion: string
  headOfficeLocation: string
  officeLocations: OfficeLocation[]
  otherOfficeLocations: string
  industrySector: string
  organisationType: 'public' | 'private' | 'nfp' | ''
  totalInternalStaff: string
  hrRecruitmentStaffCount: string
  avgRecruiterSalary: string
  totalHiringManagers: string
  avgManagerSalary: string
  currencyCode: string

  // Section 2: Project Champion
  keyContactPerson: string
  keyContactTitle: string
  keyContactDepartment: string
  contactEmail: string
  contactNumber: string

  // Section 3: Recruitment Activity
  totalRolesRecruited: string
  totalCVsReceived: string
  totalApplicationsReceived: string
  jobTypes: string[]
  jobTypesOther: string
  specialistRolePercentage: string
  generalRolePercentage: string
  forecastedRoles: string
  jobAdvertisingSpend: string
  jobAdvertisingPlatformSelections: string[]
  jobAdvertisingPlatformsOther: string
  jobAdvertisingPlatforms: string
  annualAgencySpend: string
  agencyVsInternalPercentage: string
  avgTimeToFill: string
  avgCostPerHire: string

  // Section 4: Organisational Insights
  annualEmployeeExits: string
  annualTurnoverRate: string
  internalMobility: string
  deiPriorities: string
  talentChallenges: string

  // Section 5: Technology & Platforms
  currentATS: string
  currentHRIS: string
  payrollProvider: string
  lms: string
  performanceManagementSystem: string
  usePsychometricTools: 'yes' | 'no' | ''
  psychometricToolsUsed: string

  // Section 6: Psychometrics & Assessment
  internalStaffAssessment: string[]
  internalAssessmentUseCases: string
  reportAccessRoles: string[]
  reportAccessOther: string
  leadershipAssessmentInterest: string
  leadershipAssessmentNotes: string
  recruitmentAssessment: string[]
  recruitmentAssessmentOther: string
  internalStaffDepartments: string

  // Section 7: Recruitment Workflow
  workflowSteps: string[]
  workflowPersonnelMap: Record<string, string[]>
  workflowAdditionalNotes: string
  recruitmentWorkflow: string

  // Section 8: Success Criteria
  successCriteria: string[]
  successCriteriaOther: string

  // Section 9: Pilot Details
  proposedStartDate: string
  pilotDuration: string
  pilotOfficeLocations: OfficeLocation[]
  regionsOffices: string
  businessUnitsInvolved: string
  approximateRoles: string
  pilotRoles: PilotRoleEntry[]
  pilotRolesDetails: string
  pilotJobDescriptions: PilotJobDescriptionEntry[]
  jobDescriptions: string

  // Section 10: Projected Value
  projectedValueSummary: string

  // Section 11: Sign-Off
  signOffName: string
  signOffTitle: string
  signOffDate: string
}

/** Section metadata for the progress indicator. */
export interface QuestionnaireSection {
  id: number
  title: string
  description: string
}

/** Props shared by interactive form section components. */
export interface FormSectionProps {
  formData: QuestionnaireFormData
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onCheckboxChange: (field: keyof QuestionnaireFormData, value: string, checked: boolean) => void
  setFieldValue: <K extends keyof QuestionnaireFormData>(field: K, value: QuestionnaireFormData[K]) => void
}

/** Additional props for the Sign-Off section. */
export interface SignOffSectionProps extends FormSectionProps {
  termsAccepted: boolean
  authorityConfirmed: boolean
  setTermsAccepted: (accepted: boolean) => void
  setAuthorityConfirmed: (accepted: boolean) => void
  turnstileToken: string | null
  onTurnstileVerify: (token: string) => void
  onTurnstileError: () => void
  onTurnstileExpire: () => void
}
