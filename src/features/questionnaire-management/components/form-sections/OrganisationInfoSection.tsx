'use client'

import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormField } from './FormField'
import { CurrencyInput } from './CurrencyInput'
import { OfficeLocationsEditor } from './OfficeLocationsEditor'
import { SectionWrapper } from './SectionWrapper'
import { INDUSTRY_OPTIONS } from '../../constants/questionnaireFormConstants'
import { serializeOtherOfficeLocations } from '../../utils/questionnaireSerializers'
import type { FormSectionProps, OfficeLocation } from '../../types/questionnaireForm'

const normalizeOffices = (offices: OfficeLocation[]) => {
  const sanitized = offices.length > 0
    ? offices.map((office, index) => ({ ...office, isHeadOffice: index === 0 }))
    : [{ region: '', location: '', isHeadOffice: true }]

  return sanitized
}

export function OrganisationInfoSection({ formData, onInputChange, setFieldValue }: FormSectionProps) {
  useEffect(() => {
    const normalized = normalizeOffices(formData.officeLocations)
    const headOffice = normalized[0]
    const otherOfficeLocations = serializeOtherOfficeLocations(normalized)

    if (JSON.stringify(normalized) !== JSON.stringify(formData.officeLocations)) {
      setFieldValue('officeLocations', normalized)
      return
    }

    if (formData.headOfficeRegion !== headOffice.region) {
      setFieldValue('headOfficeRegion', headOffice.region)
    }
    if (formData.headOfficeLocation !== headOffice.location) {
      setFieldValue('headOfficeLocation', headOffice.location)
    }
    if (formData.otherOfficeLocations !== otherOfficeLocations) {
      setFieldValue('otherOfficeLocations', otherOfficeLocations)
    }
  }, [
    formData.officeLocations,
    formData.headOfficeLocation,
    formData.headOfficeRegion,
    formData.otherOfficeLocations,
    setFieldValue,
  ])

  return (
    <SectionWrapper title="1. Organisation Information" description="Basic details about your organisation">
      <FormField label="Organisation Name" required>
        <Input
          id="organisationName"
          name="organisationName"
          value={formData.organisationName}
          onChange={onInputChange}
          placeholder="e.g. Acme Healthcare Group"
          required
        />
      </FormField>

      <FormField label="Office Locations" required>
        <OfficeLocationsEditor
          offices={normalizeOffices(formData.officeLocations)}
          onChange={(offices) => setFieldValue('officeLocations', normalizeOffices(offices))}
          addLabel="Add Office Location"
        />
      </FormField>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Industry / Sector" required>
          <select
            name="industrySector"
            value={formData.industrySector}
            onChange={onInputChange}
            required
            className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm outline-none"
          >
            <option value="">Select industry...</option>
            {INDUSTRY_OPTIONS.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Organisation Type" required>
          <RadioGroup
            value={formData.organisationType}
            onValueChange={(value) => setFieldValue('organisationType', value as typeof formData.organisationType)}
            className="grid gap-3 md:grid-cols-3"
          >
            {[
              { value: 'public', label: 'Public' },
              { value: 'private', label: 'Private' },
              { value: 'nfp', label: 'NFP' },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700">
                <RadioGroupItem value={option.value} id={`organisation-type-${option.value}`} />
                <span>{option.label}</span>
              </label>
            ))}
          </RadioGroup>
        </FormField>
      </div>

      <FormField label="Total Internal Staff" required>
        <Input
          name="totalInternalStaff"
          type="number"
          value={formData.totalInternalStaff}
          onChange={onInputChange}
          placeholder="e.g. 5,000"
          required
        />
      </FormField>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="HR Personnel Dedicated To Recruitment" required>
          <Input
            name="hrRecruitmentStaffCount"
            type="number"
            value={formData.hrRecruitmentStaffCount}
            onChange={onInputChange}
            placeholder="e.g. 12"
            required
          />
        </FormField>
        <FormField label="Avg. Annual Salary Of Recruiters" note="Optional">
          <CurrencyInput
            value={formData.avgRecruiterSalary}
            currency={formData.currencyCode}
            onValueChange={(value) => setFieldValue('avgRecruiterSalary', value)}
            onCurrencyChange={(value) => setFieldValue('currencyCode', value)}
            placeholder="e.g. 45,000"
          />
        </FormField>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Total Hiring Managers With Authority" required>
          <Input
            name="totalHiringManagers"
            type="number"
            value={formData.totalHiringManagers}
            onChange={onInputChange}
            placeholder="e.g. 120"
            required
          />
        </FormField>
        <FormField label="Avg. Annual Salary Of Managers" note="Optional">
          <CurrencyInput
            value={formData.avgManagerSalary}
            currency={formData.currencyCode}
            onValueChange={(value) => setFieldValue('avgManagerSalary', value)}
            onCurrencyChange={(value) => setFieldValue('currencyCode', value)}
            placeholder="e.g. 85,000"
          />
        </FormField>
      </div>
    </SectionWrapper>
  )
}
