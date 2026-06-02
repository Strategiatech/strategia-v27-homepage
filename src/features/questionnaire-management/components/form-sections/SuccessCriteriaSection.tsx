'use client'

import { SectionWrapper } from './SectionWrapper'
import { CheckboxGroup } from './CheckboxGroup'
import { SUCCESS_CRITERIA_OPTIONS } from '../../constants/questionnaireFormConstants'
import type { FormSectionProps } from '../../types/questionnaireForm'

export function SuccessCriteriaSection({ formData, onInputChange, onCheckboxChange }: FormSectionProps) {
  return (
    <SectionWrapper title="8. Success Criteria" description="What would define success for your organisation">
      <CheckboxGroup
        label="Success Criteria"
        options={SUCCESS_CRITERIA_OPTIONS}
        field="successCriteria"
        formData={formData}
        onCheckboxChange={onCheckboxChange}
        otherField="successCriteriaOther"
        otherPlaceholder="Any additional success measures..."
        onInputChange={onInputChange}
        gridClassName="grid gap-3"
      />
    </SectionWrapper>
  )
}
