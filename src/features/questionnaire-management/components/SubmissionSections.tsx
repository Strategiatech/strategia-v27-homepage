/**
 * Submission detail sections for questionnaire data.
 */

import { Label } from '@/components/ui/label'
import { INITIAL_FORM_DATA } from '../constants'
import type { QuestionnaireFormData } from '../types/questionnaireForm'
import { calculateProjectedValue, formatUsd } from '../utils/projectedValue'
import { formatOfficeLocation } from '../utils/questionnaireSerializers'

interface SectionProps {
  formData: Record<string, unknown>
}

interface FieldProps {
  label: string
  value: string
  multiline?: boolean
}

const toQuestionnaireFormData = (formData: Record<string, unknown>): QuestionnaireFormData => ({
  ...INITIAL_FORM_DATA,
  ...formData,
}) as QuestionnaireFormData

const textOrNA = (value: string | null | undefined) => value && value.trim() ? value : 'N/A'
const listOrNA = (values: string[]) => values.length > 0 ? values.join(', ') : 'N/A'
const formatMoney = (value: string | null | undefined, currencyCode: string) => {
  const normalized = value?.trim()
  if (!normalized) {
    return 'N/A'
  }
  return `${currencyCode || 'USD'} ${normalized}`
}

function Field({ label, value, multiline = false }: FieldProps) {
  return (
    <div>
      <Label className="text-gray-600">{label}</Label>
      <p className={multiline ? 'whitespace-pre-wrap font-medium' : 'font-medium'}>{value}</p>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 border-b pb-2 text-lg font-bold text-gray-900">{children}</h3>
}

const getOfficeText = (offices: QuestionnaireFormData['officeLocations']) => {
  const values = offices.map(formatOfficeLocation).filter(Boolean)
  return values.length > 0 ? values.join(', ') : 'N/A'
}

const getAdditionalOfficesText = (data: QuestionnaireFormData) => {
  if (data.otherOfficeLocations.trim()) {
    return data.otherOfficeLocations
  }
  const values = data.officeLocations.slice(1).map(formatOfficeLocation).filter(Boolean)
  return values.length > 0 ? values.join(', ') : 'N/A'
}

const getPilotOfficesText = (data: QuestionnaireFormData) => {
  if (data.regionsOffices.trim()) {
    return data.regionsOffices
  }
  const values = data.pilotOfficeLocations.map(formatOfficeLocation).filter(Boolean)
  return values.length > 0 ? values.join(', ') : 'N/A'
}

export function OrganisationSubmissionSection({ formData }: SectionProps) {
  const data = toQuestionnaireFormData(formData)

  return (
    <div>
      <SectionTitle>1. Organisation Information</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Organisation Name" value={textOrNA(data.organisationName)} />
        <Field label="Head Office Location" value={textOrNA(data.headOfficeLocation || getOfficeText(data.officeLocations.slice(0, 1)))} />
        <Field label="Head Office Region" value={textOrNA(data.headOfficeRegion || data.officeLocations[0]?.region)} />
        <Field label="Other Office Locations" value={getAdditionalOfficesText(data)} />
        <Field label="Industry / Sector" value={textOrNA(data.industrySector)} />
        <Field label="Organisation Type" value={textOrNA(data.organisationType)} />
        <Field label="Total Internal Staff" value={textOrNA(data.totalInternalStaff)} />
        <Field label="HR Personnel Dedicated To Recruitment" value={textOrNA(data.hrRecruitmentStaffCount)} />
        <Field label="Avg. Annual Salary Of Recruiters" value={formatMoney(data.avgRecruiterSalary, data.currencyCode)} />
        <Field label="Total Hiring Managers With Authority" value={textOrNA(data.totalHiringManagers)} />
        <Field label="Avg. Annual Salary Of Managers" value={formatMoney(data.avgManagerSalary, data.currencyCode)} />
      </div>
    </div>
  )
}

export function ProjectChampionSubmissionSection({ formData }: SectionProps) {
  const data = toQuestionnaireFormData(formData)

  return (
    <div>
      <SectionTitle>2. Strategia Project Champion</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full Name" value={textOrNA(data.keyContactPerson)} />
        <Field label="Title" value={textOrNA(data.keyContactTitle)} />
        <Field label="Department" value={textOrNA(data.keyContactDepartment)} />
        <Field label="Email" value={textOrNA(data.contactEmail)} />
        <Field label="Telephone" value={textOrNA(data.contactNumber)} />
      </div>
    </div>
  )
}

export function RecruitmentActivitySubmissionSection({ formData }: SectionProps) {
  const data = toQuestionnaireFormData(formData)

  return (
    <div>
      <SectionTitle>3. Recruitment Activity Overview</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Total Vacancies Advertised" value={textOrNA(data.totalRolesRecruited)} />
        <Field label="Total CVs Received" value={textOrNA(data.totalCVsReceived)} />
        <Field label="Total Job Applications" value={textOrNA(data.totalApplicationsReceived)} />
        <Field label="Forecasted Roles" value={textOrNA(data.forecastedRoles)} />
        <Field label="Job Types" value={listOrNA(data.jobTypes)} />
        <Field label="Other Job Types" value={textOrNA(data.jobTypesOther)} />
        <Field label="% Specialist / Hard-to-Fill" value={textOrNA(data.specialistRolePercentage)} />
        <Field label="% General / High-Volume" value={textOrNA(data.generalRolePercentage)} />
        <Field label="Job Advertising Spend" value={formatMoney(data.jobAdvertisingSpend, data.currencyCode)} />
        <Field label="% Agency Vs Internal Placements" value={textOrNA(data.agencyVsInternalPercentage)} />
        <Field label="Current Annual Agency Spend" value={formatMoney(data.annualAgencySpend, data.currencyCode)} />
        <Field label="Typical Cost-per-Hire" value={formatMoney(data.avgCostPerHire, data.currencyCode)} />
        <Field label="Typical Time-to-Fill" value={textOrNA(data.avgTimeToFill)} />
      </div>
    </div>
  )
}

export function InsightsSubmissionSection({ formData }: SectionProps) {
  const data = toQuestionnaireFormData(formData)

  return (
    <div>
      <SectionTitle>4. Organisational Insights</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Avg. Employees Exiting Per Annum" value={textOrNA(data.annualEmployeeExits)} />
        <Field label="Derived Annual Turnover Rate" value={textOrNA(data.annualTurnoverRate ? `${data.annualTurnoverRate}%` : '')} />
        <Field label="Internal Moves / Promotions Per Annum" value={textOrNA(data.internalMobility)} />
      </div>
      <div className="mt-4 grid gap-4">
        <Field label="DEI Priorities" value={textOrNA(data.deiPriorities)} multiline />
        <Field label="Key Talent Challenges" value={textOrNA(data.talentChallenges)} multiline />
      </div>
    </div>
  )
}

export function TechnologySubmissionSection({ formData }: SectionProps) {
  const data = toQuestionnaireFormData(formData)

  return (
    <div>
      <SectionTitle>5. Technology & Platforms</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Job Advertising Platforms" value={textOrNA(data.jobAdvertisingPlatforms)} />
        <Field label="Current ATS" value={textOrNA(data.currentATS)} />
        <Field label="Current HRIS Platform" value={textOrNA(data.currentHRIS)} />
        <Field label="Payroll Provider" value={textOrNA(data.payrollProvider)} />
        <Field label="Learning Management System" value={textOrNA(data.lms)} />
        <Field label="Performance Management System" value={textOrNA(data.performanceManagementSystem)} />
        <Field label="Uses Psychometric Tools" value={textOrNA(data.usePsychometricTools)} />
        <Field label="Psychometric Tools Used" value={textOrNA(data.psychometricToolsUsed)} />
      </div>
    </div>
  )
}

export function PsychometricsSubmissionSection({ formData }: SectionProps) {
  const data = toQuestionnaireFormData(formData)

  return (
    <div>
      <SectionTitle>6. Psychometrics & Assessment Scope</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Internal Staff Assessment" value={listOrNA(data.internalStaffAssessment)} />
        <Field label="Report Access Roles" value={listOrNA(data.reportAccessRoles)} />
        <Field label="Other Report Access Roles" value={textOrNA(data.reportAccessOther)} />
        <Field label="Leadership Assessment Interest" value={textOrNA(data.leadershipAssessmentInterest)} />
      </div>
      <div className="mt-4 grid gap-4">
        <Field label="Internal Assessment Use Cases" value={textOrNA(data.internalAssessmentUseCases)} multiline />
        <Field label="Leadership Assessment Notes" value={textOrNA(data.leadershipAssessmentNotes)} multiline />
        {data.recruitmentAssessment.length > 0 || data.recruitmentAssessmentOther.trim() ? (
          <Field
            label="Legacy Recruitment Assessment Inputs"
            value={[
              data.recruitmentAssessment.length > 0 ? listOrNA(data.recruitmentAssessment) : '',
              data.recruitmentAssessmentOther.trim() ? `Other: ${data.recruitmentAssessmentOther}` : '',
            ].filter(Boolean).join('\n')}
            multiline
          />
        ) : null}
      </div>
    </div>
  )
}

export function WorkflowSubmissionSection({ formData }: SectionProps) {
  const data = toQuestionnaireFormData(formData)

  return (
    <div>
      <SectionTitle>7. Recruitment Workflow & Process</SectionTitle>
      <Field label="Workflow" value={textOrNA(data.recruitmentWorkflow)} multiline />
    </div>
  )
}

export function SuccessCriteriaSubmissionSection({ formData }: SectionProps) {
  const data = toQuestionnaireFormData(formData)

  return (
    <div>
      <SectionTitle>8. Success Criteria</SectionTitle>
      <div className="grid gap-4">
        <Field label="Success Criteria" value={listOrNA(data.successCriteria)} />
        <Field label="Other Success Criteria" value={textOrNA(data.successCriteriaOther)} multiline />
      </div>
    </div>
  )
}

export function PilotProjectSubmissionSection({ formData }: SectionProps) {
  const data = toQuestionnaireFormData(formData)
  const legacyFields = [
    data.pilotRolesDetails.trim()
      ? { label: 'Legacy Roles To Include In Pilot', value: textOrNA(data.pilotRolesDetails) }
      : null,
    data.jobDescriptions.trim()
      ? { label: 'Legacy Job Descriptions', value: textOrNA(data.jobDescriptions) }
      : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>

  return (
    <div>
      <SectionTitle>9. Platform Setup</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Proposed Start Date" value={textOrNA(data.proposedStartDate)} />
        <Field label="Desired Initial Duration" value={textOrNA(data.pilotDuration)} />
        <Field label="Deployment Locations" value={getPilotOfficesText(data)} />
        <Field label="Business Units / Functions Involved" value={textOrNA(data.businessUnitsInvolved)} />
        <Field label="Approx. Number Of Roles To Onboard" value={textOrNA(data.approximateRoles)} />
      </div>
      {legacyFields.length > 0 ? (
        <div className="mt-4 grid gap-4">
          {legacyFields.map((field) => (
            <Field key={field.label} label={field.label} value={field.value} multiline />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function ProjectedValueSubmissionSection({ formData }: SectionProps) {
  const data = toQuestionnaireFormData(formData)
  const result = calculateProjectedValue(data)
  const benchmarkSources = [...result.regionSources, ...result.industrySources]

  return (
    <div>
      <SectionTitle>10. Projected Value</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Region" value={textOrNA(result.regionName)} />
        <Field label="Industry" value={textOrNA(result.industryName)} />
        <Field label="Average Cost-per-Hire Benchmark" value={result.adjustedCostPerHire ? formatUsd(result.adjustedCostPerHire) : 'N/A'} />
        <Field label="Average Time-to-Fill Benchmark" value={result.adjustedTimeToFill ? `${result.adjustedTimeToFill} days` : 'N/A'} />
        <Field label="Annual Employee Churn Benchmark" value={result.adjustedTurnover ? `${result.adjustedTurnover}%` : 'N/A'} />
        <Field label="Projected Agency Spend Reduction" value={result.projectedAgencySavings ? `${formatUsd(result.projectedAgencySavings.low)}-${formatUsd(result.projectedAgencySavings.high)}` : 'N/A'} />
        <Field label="Projected Time-to-Fill Improvement" value={result.projectedTimeToFill ? `${result.projectedTimeToFill} days` : 'N/A'} />
        <Field label="Projected Annual Hiring Savings" value={result.projectedAnnualHiringSavings ? formatUsd(result.projectedAnnualHiringSavings) : 'N/A'} />
        <Field label="Potential Annual Value" value={result.potentialAnnualValue ? `~${formatUsd(result.potentialAnnualValue)}+` : 'N/A'} />
      </div>
      <div className="mt-4 grid gap-4">
        <Field label="Projected Value Summary" value={textOrNA(data.projectedValueSummary)} multiline />
        <Field
          label="Benchmark Sources"
          value={benchmarkSources.length > 0
            ? benchmarkSources.map((source) => `${source.statement} — ${source.source}`).join('\n')
            : 'N/A'}
          multiline
        />
      </div>
    </div>
  )
}

export function SignOffSubmissionSection({ formData }: SectionProps) {
  const data = toQuestionnaireFormData(formData)

  return (
    <div>
      <SectionTitle>11. Sign-Off</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" value={textOrNA(data.signOffName)} />
        <Field label="Title" value={textOrNA(data.signOffTitle)} />
        <Field label="Date" value={textOrNA(data.signOffDate)} />
      </div>
    </div>
  )
}
