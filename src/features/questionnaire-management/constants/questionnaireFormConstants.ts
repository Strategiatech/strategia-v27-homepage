import type {
  OfficeLocation,
  PilotJobDescriptionEntry,
  PilotRoleEntry,
  QuestionnaireFormData,
  QuestionnaireSection,
} from '../types/questionnaireForm'

const createDefaultOffices = (): OfficeLocation[] => [
  { region: '', location: '', isHeadOffice: true },
  { region: '', location: '', isHeadOffice: false },
]

const createDefaultPilotOffices = (): OfficeLocation[] => [
  { region: '', location: '', isHeadOffice: false },
]

const createDefaultPilotRoles = (): PilotRoleEntry[] => [
  { title: '', department: '', positions: '', notes: '' },
]

const createDefaultJobDescriptions = (): PilotJobDescriptionEntry[] => [
  { roleIndex: '', title: '', text: '' },
]

export const QUESTIONNAIRE_SECTIONS: QuestionnaireSection[] = [
  { id: 1, title: 'Organisation Information', description: 'Basic details about your organisation' },
  { id: 2, title: 'Project Champion', description: 'Primary contact for the engagement' },
  { id: 3, title: 'Recruitment Activity', description: "Hiring activity from the last 12 months to benchmark and model Strategia's outcomes" },
  { id: 4, title: 'Organisational Insights', description: 'Workforce dynamics that help Strategia calibrate to your organisation' },
  { id: 5, title: 'Technology & Platforms', description: 'Current tools and systems you use' },
  { id: 6, title: 'Psychometrics & Assessment', description: 'How assessments could support your workforce' },
  { id: 7, title: 'Recruitment Workflow', description: "Map the process Strategia's Workforce Intelligence layer will enhance" },
  { id: 8, title: 'Success Criteria', description: 'What would define success for your organisation' },
  { id: 9, title: 'Platform Setup', description: 'Configure your Strategia Workforce Intelligence deployment' },
  { id: 10, title: 'Projected Value', description: 'Data-backed benchmarks and indicative savings' },
  { id: 11, title: 'Sign-Off', description: 'Final acknowledgment and authorisation' },
]

export const REGIONS = [
  'United Kingdom',
  'Europe',
  'Middle East',
  'South Asia',
  'Southeast Asia',
  'Australasia',
  'North America',
] as const

export const REGION_CITIES: Record<(typeof REGIONS)[number], string[]> = {
  'United Kingdom': ['London, UK', 'Manchester, UK', 'Birmingham, UK', 'Edinburgh, UK', 'Glasgow, UK'],
  Europe: ['Paris, France', 'Berlin, Germany', 'Amsterdam, Netherlands', 'Madrid, Spain', 'Dublin, Ireland'],
  'Middle East': ['Dubai, UAE', 'Abu Dhabi, UAE', 'Riyadh, Saudi Arabia', 'Doha, Qatar', 'Muscat, Oman'],
  'South Asia': ['Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Colombo, Sri Lanka', 'Dhaka, Bangladesh'],
  'Southeast Asia': ['Singapore, Singapore', 'Kuala Lumpur, Malaysia', 'Bangkok, Thailand', 'Jakarta, Indonesia', 'Manila, Philippines'],
  Australasia: ['Sydney, Australia', 'Melbourne, Australia', 'Brisbane, Australia', 'Perth, Australia', 'Auckland, New Zealand'],
  'North America': ['New York, USA', 'Los Angeles, USA', 'Chicago, USA', 'Toronto, Canada', 'Vancouver, Canada'],
}

export const INDUSTRY_OPTIONS = [
  'Aviation & Airlines',
  'Banking & Finance',
  'Healthcare / Medical',
  'Hospitality & Tourism',
  'Mining & Resources',
  'Oil & Gas / Energy',
  'Pharmaceuticals & Biotech',
  'Shipping & Maritime',
] as const

export const CURRENCY_OPTIONS = [
  'USD',
  'GBP',
  'EUR',
  'AED',
  'AUD',
  'SGD',
  'INR',
  'MYR',
  'SAR',
  'QAR',
  'NZD',
  'CAD',
  'ZAR',
  'PHP',
  'THB',
] as const

export const JOB_TYPE_OPTIONS = [
  'All',
  'C-Suite / Executives',
  'Operations',
  'Finance',
  'Human Resources',
  'Information Technology',
  'Marketing & Communications',
  'Legal & Risk',
  'Sales & Business Development',
  'Clinical / Medical',
  'Research & Innovation',
  'Customer or Patient Services',
  'Other',
] as const

export const AD_PLATFORM_OPTIONS = [
  'LinkedIn',
  'Indeed',
  'Seek',
  'Monster',
  'ZipRecruiter',
  'Glassdoor',
  'Google for Jobs',
  'JobStreet',
  'JobsDB',
  'Naukri',
  'Bayt',
  'Internal Website / Job Board',
  'Current HRIS Platform',
  'Other',
] as const

export const ATS_OPTIONS = [
  'Workday',
  'SAP SuccessFactors',
  'iCIMS',
  'Greenhouse',
  'Lever',
  'BambooHR',
  'SmartRecruiters',
  'Taleo',
  'Teamtailor',
  'Bullhorn',
  'Other',
] as const

export const RECRUITMENT_ASSESSMENT_OPTIONS = [
  'Behavioural / Personality Assessments',
  'Cognitive / Aptitude Testing',
  'Values / Culture Fit Assessments',
  'Technical / Skills Assessments',
  'Scenario-Based Assessments',
  'Other',
] as const

export const INTERNAL_STAFF_OPTIONS = [
  'Leadership Team Only',
  'Selected Departments or Roles',
  'Entire Organisation',
  'Not Applicable',
] as const

export const REPORT_ACCESS_OPTIONS = [
  'HR',
  'Hiring Manager',
  'Line Manager',
  'Executive Team',
  'Other',
] as const

export const LEADERSHIP_INTEREST_OPTIONS = [
  "Yes — we'd like to explore this",
  'Possibly — tell us more during onboarding',
  'Not at this stage',
] as const

export const WORKFLOW_STEPS_DEFAULT = [
  'Job Requisition Approval',
  'Job Description Crafting',
  'Job Advertising Management',
  'Candidate Application / CV Review & Shortlisting',
  'Candidate Interview #1',
  'Candidate Interview #2',
  'Candidate Interview #3',
  'Profile Assessments / Psychometrics',
  'Scenario / Practical Testing',
  'Employment Offer Process',
  'Candidate Onboarding',
] as const

export const WORKFLOW_PERSONNEL_OPTIONS = [
  'HR / Recruitment Officer',
  'Hiring Manager',
  'Senior Manager',
  'Peer Group Employees',
] as const

export const SUCCESS_CRITERIA_OPTIONS = [
  'Streamlined Application Screening',
  'Increased Candidate Quality',
  'Increased Candidate Fit (with Organisation)',
  'Reduced Time-to-Hire',
  'Reduction in Agency Spend',
  'Improved Onboarding Insights',
  'Other',
] as const

export const INITIAL_FORM_DATA: QuestionnaireFormData = {
  organisationName: '',
  headOfficeRegion: '',
  headOfficeLocation: '',
  officeLocations: createDefaultOffices(),
  otherOfficeLocations: '',
  industrySector: '',
  organisationType: '',
  totalInternalStaff: '',
  hrRecruitmentStaffCount: '',
  avgRecruiterSalary: '',
  totalHiringManagers: '',
  avgManagerSalary: '',
  currencyCode: 'USD',
  keyContactPerson: '',
  keyContactTitle: '',
  keyContactDepartment: '',
  contactEmail: '',
  contactNumber: '',
  totalRolesRecruited: '',
  totalCVsReceived: '',
  totalApplicationsReceived: '',
  jobTypes: [],
  jobTypesOther: '',
  specialistRolePercentage: '',
  generalRolePercentage: '',
  forecastedRoles: '',
  jobAdvertisingSpend: '',
  jobAdvertisingPlatformSelections: [],
  jobAdvertisingPlatformsOther: '',
  jobAdvertisingPlatforms: '',
  annualAgencySpend: '',
  agencyVsInternalPercentage: '',
  avgTimeToFill: '',
  avgCostPerHire: '',
  annualEmployeeExits: '',
  annualTurnoverRate: '',
  internalMobility: '',
  deiPriorities: '',
  talentChallenges: '',
  currentATS: '',
  currentHRIS: '',
  payrollProvider: '',
  lms: '',
  performanceManagementSystem: '',
  usePsychometricTools: '',
  psychometricToolsUsed: '',
  internalStaffAssessment: [],
  internalAssessmentUseCases: '',
  reportAccessRoles: [],
  reportAccessOther: '',
  leadershipAssessmentInterest: '',
  leadershipAssessmentNotes: '',
  recruitmentAssessment: [],
  recruitmentAssessmentOther: '',
  internalStaffDepartments: '',
  workflowSteps: [...WORKFLOW_STEPS_DEFAULT],
  workflowPersonnelMap: {},
  workflowAdditionalNotes: '',
  recruitmentWorkflow: '',
  successCriteria: [],
  successCriteriaOther: '',
  proposedStartDate: '',
  pilotDuration: '',
  pilotOfficeLocations: createDefaultPilotOffices(),
  regionsOffices: '',
  businessUnitsInvolved: '',
  approximateRoles: '',
  pilotRoles: createDefaultPilotRoles(),
  pilotRolesDetails: '',
  pilotJobDescriptions: createDefaultJobDescriptions(),
  jobDescriptions: '',
  projectedValueSummary: '',
  signOffName: '',
  signOffTitle: '',
  signOffDate: '',
}

export const TOTAL_SECTIONS = QUESTIONNAIRE_SECTIONS.length
