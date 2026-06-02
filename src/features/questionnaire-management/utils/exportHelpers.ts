/**
 * Export Helper Functions
 * Handle PDF, Word, TXT, and JSON exports.
 */

import { toast } from 'sonner'
import type { QuestionnaireSubmission } from '../types/questionnaire'
import { INITIAL_FORM_DATA } from '../constants'
import type { QuestionnaireFormData } from '../types/questionnaireForm'
import { calculateProjectedValue, formatUsd } from './projectedValue'
import { formatOfficeLocation } from './questionnaireSerializers'
import { formatDate } from './formatters'

interface ExportField {
  label: string
  value: string
  multiline?: boolean
}

interface ExportSection {
  title: string
  fields: ExportField[]
}

const toQuestionnaireFormData = (submission: QuestionnaireSubmission): QuestionnaireFormData => ({
  ...INITIAL_FORM_DATA,
  ...(submission.FormData ?? {}),
}) as QuestionnaireFormData

const textOrNA = (value: string | null | undefined) =>
  value && value.trim() ? value : 'N/A'

const listOrNA = (values: string[]) =>
  values.length > 0 ? values.join(', ') : 'N/A'

const formatMoney = (value: string | null | undefined, currencyCode: string) => {
  const normalized = value?.trim()
  if (!normalized) {
    return 'N/A'
  }
  return `${currencyCode || 'USD'} ${normalized}`
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

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

const buildSections = (submission: QuestionnaireSubmission): ExportSection[] => {
  const data = toQuestionnaireFormData(submission)
  const projected = calculateProjectedValue(data)
  const sources = [...projected.regionSources, ...projected.industrySources]

  return [
    {
      title: '1. Organisation Information',
      fields: [
        { label: 'Organisation Name', value: textOrNA(data.organisationName) },
        {
          label: 'Head Office Location',
          value: textOrNA(
            data.headOfficeLocation || getOfficeText(data.officeLocations.slice(0, 1))
          ),
        },
        {
          label: 'Head Office Region',
          value: textOrNA(data.headOfficeRegion || data.officeLocations[0]?.region),
        },
        { label: 'Other Office Locations', value: getAdditionalOfficesText(data) },
        { label: 'Industry / Sector', value: textOrNA(data.industrySector) },
        { label: 'Organisation Type', value: textOrNA(data.organisationType) },
        { label: 'Total Internal Staff', value: textOrNA(data.totalInternalStaff) },
        {
          label: 'HR Personnel Dedicated To Recruitment',
          value: textOrNA(data.hrRecruitmentStaffCount),
        },
        {
          label: 'Avg. Annual Salary Of Recruiters',
          value: formatMoney(data.avgRecruiterSalary, data.currencyCode),
        },
        {
          label: 'Total Hiring Managers With Authority',
          value: textOrNA(data.totalHiringManagers),
        },
        {
          label: 'Avg. Annual Salary Of Managers',
          value: formatMoney(data.avgManagerSalary, data.currencyCode),
        },
      ],
    },
    {
      title: '2. Strategia Project Champion',
      fields: [
        { label: 'Full Name', value: textOrNA(data.keyContactPerson) },
        { label: 'Title', value: textOrNA(data.keyContactTitle) },
        { label: 'Department', value: textOrNA(data.keyContactDepartment) },
        { label: 'Email', value: textOrNA(data.contactEmail) },
        { label: 'Telephone', value: textOrNA(data.contactNumber) },
      ],
    },
    {
      title: '3. Recruitment Activity Overview',
      fields: [
        {
          label: 'Total Vacancies Advertised',
          value: textOrNA(data.totalRolesRecruited),
        },
        { label: 'Total CVs Received', value: textOrNA(data.totalCVsReceived) },
        {
          label: 'Total Job Applications',
          value: textOrNA(data.totalApplicationsReceived),
        },
        { label: 'Job Types', value: listOrNA(data.jobTypes) },
        { label: 'Other Job Types', value: textOrNA(data.jobTypesOther) },
        {
          label: '% Specialist / Hard-to-Fill',
          value: textOrNA(data.specialistRolePercentage),
        },
        {
          label: '% General / High-Volume',
          value: textOrNA(data.generalRolePercentage),
        },
        { label: 'Forecasted Roles', value: textOrNA(data.forecastedRoles) },
        {
          label: 'Job Advertising Spend',
          value: formatMoney(data.jobAdvertisingSpend, data.currencyCode),
        },
        {
          label: '% Agency Vs Internal Placements',
          value: textOrNA(data.agencyVsInternalPercentage),
        },
        {
          label: 'Current Annual Agency Spend',
          value: formatMoney(data.annualAgencySpend, data.currencyCode),
        },
        {
          label: 'Typical Cost-per-Hire',
          value: formatMoney(data.avgCostPerHire, data.currencyCode),
        },
        { label: 'Typical Time-to-Fill', value: textOrNA(data.avgTimeToFill) },
      ],
    },
    {
      title: '4. Organisational Insights',
      fields: [
        {
          label: 'Avg. Employees Exiting Per Annum',
          value: textOrNA(data.annualEmployeeExits),
        },
        {
          label: 'Derived Annual Turnover Rate',
          value: textOrNA(data.annualTurnoverRate ? `${data.annualTurnoverRate}%` : ''),
        },
        {
          label: 'Internal Moves / Promotions Per Annum',
          value: textOrNA(data.internalMobility),
        },
        { label: 'DEI Priorities', value: textOrNA(data.deiPriorities), multiline: true },
        {
          label: 'Key Talent Challenges',
          value: textOrNA(data.talentChallenges),
          multiline: true,
        },
      ],
    },
    {
      title: '5. Technology & Platforms',
      fields: [
        {
          label: 'Job Advertising Platforms',
          value: textOrNA(data.jobAdvertisingPlatforms),
        },
        { label: 'Current ATS', value: textOrNA(data.currentATS) },
        { label: 'Current HRIS Platform', value: textOrNA(data.currentHRIS) },
        { label: 'Payroll Provider', value: textOrNA(data.payrollProvider) },
        { label: 'Learning Management System', value: textOrNA(data.lms) },
        {
          label: 'Performance Management System',
          value: textOrNA(data.performanceManagementSystem),
        },
        {
          label: 'Uses Psychometric Tools',
          value: textOrNA(data.usePsychometricTools),
        },
        {
          label: 'Psychometric Tools Used',
          value: textOrNA(data.psychometricToolsUsed),
        },
      ],
    },
    {
      title: '6. Psychometrics & Assessment Scope',
      fields: [
        {
          label: 'Internal Staff Assessment',
          value: listOrNA(data.internalStaffAssessment),
        },
        {
          label: 'Internal Assessment Use Cases',
          value: textOrNA(data.internalAssessmentUseCases),
          multiline: true,
        },
        { label: 'Report Access Roles', value: listOrNA(data.reportAccessRoles) },
        {
          label: 'Other Report Access Roles',
          value: textOrNA(data.reportAccessOther),
        },
        {
          label: 'Leadership Assessment Interest',
          value: textOrNA(data.leadershipAssessmentInterest),
        },
        {
          label: 'Leadership Assessment Notes',
          value: textOrNA(data.leadershipAssessmentNotes),
          multiline: true,
        },
        {
          label: 'Legacy Recruitment Assessment Inputs',
          value:
            [
              data.recruitmentAssessment.length > 0
                ? listOrNA(data.recruitmentAssessment)
                : '',
              data.recruitmentAssessmentOther.trim()
                ? `Other: ${data.recruitmentAssessmentOther}`
                : '',
            ]
              .filter(Boolean)
              .join('\n') || 'N/A',
          multiline: true,
        },
      ],
    },
    {
      title: '7. Recruitment Workflow & Process',
      fields: [
        {
          label: 'Workflow',
          value: textOrNA(data.recruitmentWorkflow),
          multiline: true,
        },
      ],
    },
    {
      title: '8. Success Criteria',
      fields: [
        { label: 'Success Criteria', value: listOrNA(data.successCriteria) },
        {
          label: 'Other Success Criteria',
          value: textOrNA(data.successCriteriaOther),
          multiline: true,
        },
      ],
    },
    {
      title: '9. Platform Setup',
      fields: [
        { label: 'Proposed Start Date', value: textOrNA(data.proposedStartDate) },
        { label: 'Desired Initial Duration', value: textOrNA(data.pilotDuration) },
        { label: 'Deployment Locations', value: getPilotOfficesText(data) },
        {
          label: 'Business Units / Functions Involved',
          value: textOrNA(data.businessUnitsInvolved),
        },
        {
          label: 'Approx. Number Of Roles To Onboard',
          value: textOrNA(data.approximateRoles),
        },
        ...(data.pilotRolesDetails.trim()
          ? [{
              label: 'Legacy Roles To Include In Pilot',
              value: textOrNA(data.pilotRolesDetails),
              multiline: true,
            }]
          : []),
        ...(data.jobDescriptions.trim()
          ? [{
              label: 'Legacy Job Descriptions',
              value: textOrNA(data.jobDescriptions),
              multiline: true,
            }]
          : []),
      ],
    },
    {
      title: '10. Projected Value',
      fields: [
        { label: 'Region', value: textOrNA(projected.regionName) },
        { label: 'Industry', value: textOrNA(projected.industryName) },
        {
          label: 'Average Cost-per-Hire Benchmark',
          value: projected.adjustedCostPerHire
            ? formatUsd(projected.adjustedCostPerHire)
            : 'N/A',
        },
        {
          label: 'Average Time-to-Fill Benchmark',
          value: projected.adjustedTimeToFill
            ? `${projected.adjustedTimeToFill} days`
            : 'N/A',
        },
        {
          label: 'Annual Employee Churn Benchmark',
          value: projected.adjustedTurnover ? `${projected.adjustedTurnover}%` : 'N/A',
        },
        {
          label: 'Projected Agency Spend Reduction',
          value: projected.projectedAgencySavings
            ? `${formatUsd(projected.projectedAgencySavings.low)}-${formatUsd(projected.projectedAgencySavings.high)}`
            : 'N/A',
        },
        {
          label: 'Projected Time-to-Fill Improvement',
          value: projected.projectedTimeToFill
            ? `${projected.projectedTimeToFill} days`
            : 'N/A',
        },
        {
          label: 'Projected Annual Hiring Savings',
          value: projected.projectedAnnualHiringSavings
            ? formatUsd(projected.projectedAnnualHiringSavings)
            : 'N/A',
        },
        {
          label: 'Potential Annual Value',
          value: projected.potentialAnnualValue
            ? `~${formatUsd(projected.potentialAnnualValue)}+`
            : 'N/A',
        },
        {
          label: 'Projected Value Summary',
          value: textOrNA(data.projectedValueSummary),
          multiline: true,
        },
        {
          label: 'Benchmark Sources',
          value:
            sources.length > 0
              ? sources.map((source) => `${source.statement} — ${source.source}`).join('\n')
              : 'N/A',
          multiline: true,
        },
      ],
    },
    {
      title: '11. Sign-Off',
      fields: [
        { label: 'Name', value: textOrNA(data.signOffName) },
        { label: 'Title', value: textOrNA(data.signOffTitle) },
        { label: 'Date', value: textOrNA(data.signOffDate) },
      ],
    },
  ]
}

const formatSubmissionText = (submission: QuestionnaireSubmission): string => {
  const sections = buildSections(submission)

  const body = sections
    .map((section) => {
      const fields = section.fields
        .map((field) => {
          if (field.multiline) {
            return `${field.label}:\n${field.value}`
          }
          return `${field.label}: ${field.value}`
        })
        .join('\n')

      return `${section.title.toUpperCase()}\n${'-'.repeat(80)}\n${fields}`
    })
    .join(`\n\n${'='.repeat(80)}\n\n`)

  return [
    'DISCOVERY QUESTIONNAIRE SUBMISSION',
    '='.repeat(80),
    `Submission ID: #${submission.Id}`,
    `Submission Date: ${formatDate(submission.SubmissionDate)}`,
    `Status: ${submission.Status}`,
    '='.repeat(80),
    '',
    body,
    '',
    '='.repeat(80),
    `Generated: ${new Date().toLocaleString()}`,
    '© Strategia - Discovery Questionnaire System',
  ].join('\n')
}

const renderSectionHtml = (section: ExportSection): string => {
  const fields = section.fields
    .map((field) => {
      const value = escapeHtml(field.value).replace(/\n/g, '<br/>')
      if (field.multiline) {
        return `<div class="field"><span class="label">${escapeHtml(field.label)}:</span><div class="long-text">${value}</div></div>`
      }
      return `<div class="field"><span class="label">${escapeHtml(field.label)}:</span><span class="value">${value}</span></div>`
    })
    .join('')

  return `<div class="section"><h2>${escapeHtml(section.title)}</h2>${fields}</div>`
}

const generateHTMLDocument = (
  submission: QuestionnaireSubmission,
  mode: 'pdf' | 'word'
): string => {
  const sections = buildSections(submission)
  const content = sections.map(renderSectionHtml).join('')
  const fontFamily =
    mode === 'word' ? 'Calibri, Arial, sans-serif' : 'Arial, sans-serif'

  return `
<!DOCTYPE html>
<html ${mode === 'word' ? "xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'" : ''}>
<head>
  <meta charset="UTF-8" />
  <title>Questionnaire #${submission.Id}</title>
  <style>
    body { font-family: ${fontFamily}; padding: 40px; max-width: 900px; margin: 0 auto; line-height: 1.6; color: #333; }
    h1 { color: #1e40af; border-bottom: 3px solid #1e40af; padding-bottom: 10px; margin-bottom: 20px; }
    h2 { color: #1e40af; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
    .field { margin-bottom: 12px; page-break-inside: avoid; }
    .label { font-weight: bold; color: #4b5563; display: block; margin-bottom: 4px; font-size: 12px; }
    .value { color: #1f2937; }
    .meta-info { background: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #1e40af; }
    .section { margin-bottom: 30px; page-break-inside: avoid; }
    .long-text { background: #f9fafb; padding: 10px; border-radius: 4px; margin-top: 5px; font-size: 13px; }
  </style>
</head>
<body>
  <h1>Discovery Questionnaire Submission</h1>
  <div class="meta-info">
    <div class="field"><span class="label">Submission ID:</span><span class="value">#${submission.Id}</span></div>
    <div class="field"><span class="label">Submission Date:</span><span class="value">${escapeHtml(formatDate(submission.SubmissionDate))}</span></div>
    <div class="field"><span class="label">Status:</span><span class="value">${escapeHtml(submission.Status)}</span></div>
  </div>
  ${content}
  <div style="margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
    Generated: ${escapeHtml(new Date().toLocaleString())}<br/>© Strategia - Discovery Questionnaire System
  </div>
  ${mode === 'pdf' ? '<script>window.onload = function() { window.print(); }</script>' : ''}
</body>
</html>
  `
}

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export const exportAsTXT = (submission: QuestionnaireSubmission) => {
  const textContent = formatSubmissionText(submission)
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' })
  downloadBlob(
    blob,
    `questionnaire-${submission.Id}-${submission.OrganisationName || 'submission'}.txt`
  )
  toast.success('TXT file downloaded successfully')
}

export const exportAsJSON = (submission: QuestionnaireSubmission) => {
  const dataStr = JSON.stringify(submission, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  downloadBlob(
    blob,
    `questionnaire-${submission.Id}-${submission.OrganisationName || 'submission'}.json`
  )
  toast.success('JSON file downloaded successfully')
}

export const exportAsPDF = (submission: QuestionnaireSubmission) => {
  try {
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      toast.error('Please allow pop-ups to export PDF')
      return
    }

    const htmlContent = generateHTMLDocument(submission, 'pdf')
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    toast.success('PDF print dialog opened')
  } catch (error) {
    toast.error('Failed to generate PDF')
    console.error('PDF export error:', error)
  }
}

export const exportAsWord = (submission: QuestionnaireSubmission) => {
  try {
    const htmlContent = generateHTMLDocument(submission, 'word')
    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' })
    downloadBlob(
      blob,
      `questionnaire-${submission.Id}-${submission.OrganisationName || 'submission'}.doc`
    )
    toast.success('Word document downloaded successfully')
  } catch (error) {
    toast.error('Failed to export Word document')
    console.error('Word export error:', error)
  }
}
