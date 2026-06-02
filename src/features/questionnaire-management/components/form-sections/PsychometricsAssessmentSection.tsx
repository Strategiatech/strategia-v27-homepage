'use client'

import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormField } from './FormField'
import { CheckboxGroup } from './CheckboxGroup'
import { SectionWrapper } from './SectionWrapper'
import {
  INTERNAL_STAFF_OPTIONS,
  LEADERSHIP_INTEREST_OPTIONS,
  REPORT_ACCESS_OPTIONS,
} from '../../constants/questionnaireFormConstants'
import type { FormSectionProps } from '../../types/questionnaireForm'

export function PsychometricsAssessmentSection({ formData, onInputChange, onCheckboxChange, setFieldValue }: FormSectionProps) {
  return (
    <SectionWrapper title="6. Psychometrics & Assessment Scope" description="Understanding how assessments can support your workforce">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
        Some of our clients&apos; preference is to leverage Strategia&apos;s psychometric capabilities beyond
        recruitment, gaining deeper insight into their <strong className="font-semibold">existing workforce</strong>,
        whether that&apos;s around leadership potential, succession readiness, team dynamics, or professional
        development pathways. This section helps us understand whether that&apos;s something your organisation
        would find valuable.
      </div>

      <CheckboxGroup
        label="Would You Like To Use Psychometric Assessments For Your Internal Staff?"
        options={INTERNAL_STAFF_OPTIONS}
        field="internalStaffAssessment"
        formData={formData}
        onCheckboxChange={onCheckboxChange}
        gridClassName="grid gap-3"
      />

      <FormField
        label="How Would You Envision Using Internal Assessments?"
        note="For example: succession planning, team development, identifying high-potential employees, or onboarding insights."
      >
        <Textarea
          name="internalAssessmentUseCases"
          value={formData.internalAssessmentUseCases}
          onChange={onInputChange}
          rows={4}
          placeholder="Describe how you'd like to use psychometric insights for your existing team..."
          className="bg-white"
        />
      </FormField>

      <CheckboxGroup
        label="Who Should Receive Access To Psychometric Reports?"
        options={REPORT_ACCESS_OPTIONS}
        field="reportAccessRoles"
        formData={formData}
        onCheckboxChange={onCheckboxChange}
        otherField="reportAccessOther"
        otherPlaceholder="Please specify other roles"
        onInputChange={onInputChange}
      />

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
        Strategia also offers <strong className="font-semibold">Leadership Assessments</strong>, structured
        evaluations that combine psychometric profiling with scenario-based analysis to provide a clear,
        data-driven view of leadership capability, readiness, and development needs across senior teams.
      </div>

      <FormField label="Would Your Organisation Be Interested In Leadership Assessments Or Scenario Analysis For Your Senior Team?">
        <RadioGroup
          value={formData.leadershipAssessmentInterest}
          onValueChange={(value) => setFieldValue('leadershipAssessmentInterest', value)}
          className="grid gap-3"
        >
          {LEADERSHIP_INTEREST_OPTIONS.map((option) => (
            <label key={option} className="flex items-start gap-3 rounded-md border border-slate-200 px-3 py-3 text-sm text-slate-700">
              <RadioGroupItem value={option} id={`leadership-interest-${option}`} className="mt-0.5" />
              <span>{option}</span>
            </label>
          ))}
        </RadioGroup>
      </FormField>

      {formData.leadershipAssessmentInterest && formData.leadershipAssessmentInterest !== 'Not at this stage' ? (
        <FormField
          label="What Would You Most Want To Understand About Your Leadership Team?"
          note="For example: succession readiness, decision-making under pressure, leadership style alignment, or executive team dynamics."
        >
          <Textarea
            name="leadershipAssessmentNotes"
            value={formData.leadershipAssessmentNotes}
            onChange={onInputChange}
            rows={4}
            placeholder="Describe what you'd like Strategia to surface about your leadership team..."
            className="bg-white"
          />
        </FormField>
      ) : null}
    </SectionWrapper>
  )
}
