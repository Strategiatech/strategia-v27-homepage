'use client'

import { Input } from '@/components/ui/input'
import { FormField } from './FormField'
import { CurrencyInput } from './CurrencyInput'
import { CheckboxGroup } from './CheckboxGroup'
import { SectionWrapper } from './SectionWrapper'
import { JOB_TYPE_OPTIONS } from '../../constants/questionnaireFormConstants'
import type { FormSectionProps } from '../../types/questionnaireForm'

export function RecruitmentActivitySection({ formData, onInputChange, onCheckboxChange, setFieldValue }: FormSectionProps) {
  return (
    <SectionWrapper
      title="3. Recruitment Activity Overview"
      description="Your hiring activity from the last 12 months — this helps Strategia's Workforce Intelligence engine benchmark and model your outcomes"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Total Vacancies Advertised" required note="Last 12 months">
          <Input
            name="totalRolesRecruited"
            type="number"
            value={formData.totalRolesRecruited}
            onChange={onInputChange}
            placeholder="e.g. 250"
            required
          />
        </FormField>
        <FormField label="Total CVs Received" note="Last 12 months">
          <Input
            name="totalCVsReceived"
            type="number"
            value={formData.totalCVsReceived}
            onChange={onInputChange}
            placeholder="e.g. 12,000"
          />
        </FormField>
      </div>

      <FormField
        label="Total Job Applications"
        note="Total formal applications submitted through your ATS or application portal."
      >
        <Input
          name="totalApplicationsReceived"
          type="number"
          value={formData.totalApplicationsReceived}
          onChange={onInputChange}
          placeholder="e.g. 8,500"
        />
      </FormField>

      <CheckboxGroup
        label="Cross-section Of Jobs Recruited (Last 12 Months)"
        options={JOB_TYPE_OPTIONS}
        field="jobTypes"
        formData={formData}
        onCheckboxChange={onCheckboxChange}
        otherField="jobTypesOther"
        otherPlaceholder="Please specify other role categories"
        onInputChange={onInputChange}
        gridClassName="grid gap-3 md:grid-cols-2"
      />

      <FormField label="Estimated Total Number Of Roles To Recruit In The Next 12 Months">
        <Input
          name="forecastedRoles"
          type="number"
          value={formData.forecastedRoles}
          onChange={onInputChange}
          placeholder="e.g. 300"
        />
      </FormField>

      <FormField
        label="Total Spend On Job Advertising (Last 12 Months)"
        note="Include job board subscriptions, sponsored posts, recruitment marketing platforms, print media, and other paid attraction channels."
      >
        <CurrencyInput
          value={formData.jobAdvertisingSpend}
          currency={formData.currencyCode}
          onValueChange={(value) => setFieldValue('jobAdvertisingSpend', value)}
          onCurrencyChange={(value) => setFieldValue('currencyCode', value)}
          placeholder="e.g. 150,000"
        />
      </FormField>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="% Agency Vs Internal Placements">
          <Input
            name="agencyVsInternalPercentage"
            value={formData.agencyVsInternalPercentage}
            onChange={onInputChange}
            placeholder="e.g. 40% agency"
          />
        </FormField>
        <FormField label="Current Annual Agency Spend (Approx.)">
          <CurrencyInput
            value={formData.annualAgencySpend}
            currency={formData.currencyCode}
            onValueChange={(value) => setFieldValue('annualAgencySpend', value)}
            onCurrencyChange={(value) => setFieldValue('currencyCode', value)}
            placeholder="e.g. 500,000"
          />
        </FormField>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label="Typical Cost-per-Hire"
          tooltip="Cost-per-hire includes job advertising, agency fees, recruiter time, and screening costs. Leave blank if you want Strategia to use market benchmarks instead."
        >
          <CurrencyInput
            value={formData.avgCostPerHire}
            currency={formData.currencyCode}
            onValueChange={(value) => setFieldValue('avgCostPerHire', value)}
            onCurrencyChange={(value) => setFieldValue('currencyCode', value)}
            placeholder="e.g. 4,200"
          />
        </FormField>
        <FormField label="Typical Time-to-Fill (Working Days)">
          <Input
            name="avgTimeToFill"
            type="number"
            value={formData.avgTimeToFill}
            onChange={onInputChange}
            placeholder="e.g. 45"
          />
        </FormField>
      </div>
    </SectionWrapper>
  )
}
