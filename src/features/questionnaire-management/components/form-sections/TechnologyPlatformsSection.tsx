'use client'

import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormField } from './FormField'
import { CheckboxGroup } from './CheckboxGroup'
import { SectionWrapper } from './SectionWrapper'
import { AD_PLATFORM_OPTIONS, ATS_OPTIONS } from '../../constants/questionnaireFormConstants'
import { serializeAdvertisingPlatforms } from '../../utils/questionnaireSerializers'
import type { FormSectionProps } from '../../types/questionnaireForm'

export function TechnologyPlatformsSection({ formData, onInputChange, onCheckboxChange, setFieldValue }: FormSectionProps) {
  useEffect(() => {
    const serialized = serializeAdvertisingPlatforms(
      formData.jobAdvertisingPlatformSelections,
      formData.jobAdvertisingPlatformsOther
    )

    if (serialized !== formData.jobAdvertisingPlatforms) {
      setFieldValue('jobAdvertisingPlatforms', serialized)
    }
  }, [
    formData.jobAdvertisingPlatformSelections,
    formData.jobAdvertisingPlatforms,
    formData.jobAdvertisingPlatformsOther,
    setFieldValue,
  ])

  return (
    <SectionWrapper title="5. Technology & Platforms" description="Current tools and systems you use">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
        Strategia is a <strong className="font-semibold">Workforce Intelligence platform</strong>, not
        an ATS. It sits as an intelligence layer on top of your existing tools, enriching and connecting
        them rather than replacing them. The information below helps us understand your current
        ecosystem so Strategia can be configured to integrate cleanly.
      </div>

      <CheckboxGroup
        label="Job Advertising Platforms Used"
        options={AD_PLATFORM_OPTIONS}
        field="jobAdvertisingPlatformSelections"
        formData={formData}
        onCheckboxChange={onCheckboxChange}
        otherField="jobAdvertisingPlatformsOther"
        otherPlaceholder="Please specify other platform(s)..."
        onInputChange={onInputChange}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Current ATS">
          <select
            name="currentATS"
            value={formData.currentATS}
            onChange={onInputChange}
            className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm outline-none"
          >
            <option value="">Select ATS...</option>
            {ATS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Current HRIS Platform">
          <Input
            name="currentHRIS"
            value={formData.currentHRIS}
            onChange={onInputChange}
            placeholder="e.g. SAP SuccessFactors"
          />
        </FormField>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Payroll Provider">
          <Input
            name="payrollProvider"
            value={formData.payrollProvider}
            onChange={onInputChange}
            placeholder="e.g. ADP, Xero"
          />
        </FormField>
        <FormField label="Learning Management System (LMS)">
          <Input
            name="lms"
            value={formData.lms}
            onChange={onInputChange}
            placeholder="e.g. Cornerstone, Moodle"
          />
        </FormField>
      </div>

      <FormField label="Performance Management System">
        <Input
          name="performanceManagementSystem"
          value={formData.performanceManagementSystem}
          onChange={onInputChange}
          placeholder="e.g. Lattice, 15Five, Culture Amp"
        />
      </FormField>

      <FormField label="Do You Use Any Psychometric Or Assessment Tools Currently?" required>
        <RadioGroup
          value={formData.usePsychometricTools}
          onValueChange={(value) => setFieldValue('usePsychometricTools', value as typeof formData.usePsychometricTools)}
          className="grid gap-3 md:grid-cols-2"
        >
          {[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700">
              <RadioGroupItem value={option.value} id={`psychometric-tools-${option.value}`} />
              <span>{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </FormField>

      {formData.usePsychometricTools === 'yes' ? (
        <FormField label="Please Name The Tools Used">
          <Input
            name="psychometricToolsUsed"
            value={formData.psychometricToolsUsed}
            onChange={onInputChange}
            placeholder="e.g. Hogan, SHL, Saville"
          />
        </FormField>
      ) : null}
    </SectionWrapper>
  )
}
