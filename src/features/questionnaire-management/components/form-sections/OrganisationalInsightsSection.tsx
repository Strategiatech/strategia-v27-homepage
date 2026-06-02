'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from './FormField'
import { SectionWrapper } from './SectionWrapper'
import type { FormSectionProps } from '../../types/questionnaireForm'

export function OrganisationalInsightsSection({ formData, onInputChange }: FormSectionProps) {
  return (
    <SectionWrapper
      title="4. Organisational Insights"
      description="Workforce dynamics that help Strategia calibrate to your organisation"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Avg. Employees Exiting Per Annum" required>
          <Input
            name="annualEmployeeExits"
            type="number"
            value={formData.annualEmployeeExits}
            onChange={onInputChange}
            placeholder="e.g. 200"
            required
          />
        </FormField>
        <FormField label="Internal Moves / Promotions Per Annum" required>
          <Input
            name="internalMobility"
            type="number"
            value={formData.internalMobility}
            onChange={onInputChange}
            placeholder="e.g. 80"
            required
          />
        </FormField>
      </div>

      <FormField label="Derived Annual Turnover Rate" note="Calculated from annual exits and total internal staff.">
        <Input value={formData.annualTurnoverRate ? `${formData.annualTurnoverRate}%` : ''} disabled placeholder="Auto-calculated" />
      </FormField>

      <FormField label="DEI Priorities" note="Optional strategic context for pilot design.">
        <Textarea
          name="deiPriorities"
          value={formData.deiPriorities}
          onChange={onInputChange}
          rows={4}
          placeholder="Describe any DEI priorities that should shape the pilot..."
          className="bg-white"
        />
      </FormField>

      <FormField
        label="Key Talent Challenges Or Organisational Pain Points"
        note="For example: unfilled critical roles, long hiring cycles, weak candidate quality, or over-reliance on agencies."
      >
        <Textarea
          name="talentChallenges"
          value={formData.talentChallenges}
          onChange={onInputChange}
          rows={5}
          placeholder="Describe the main workforce and hiring challenges your organisation is dealing with..."
          className="bg-white"
        />
      </FormField>
    </SectionWrapper>
  )
}
