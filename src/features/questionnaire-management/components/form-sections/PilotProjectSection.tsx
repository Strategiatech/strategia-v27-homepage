'use client'

import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { FormField } from './FormField'
import { OfficeLocationsEditor } from './OfficeLocationsEditor'
import { SectionWrapper } from './SectionWrapper'
import { serializePilotOfficeLocations } from '../../utils/questionnaireSerializers'
import type { FormSectionProps, OfficeLocation } from '../../types/questionnaireForm'

const normalizePilotOffices = (offices: OfficeLocation[]) => {
  if (offices.length > 0) {
    return offices.map((office) => ({ ...office, isHeadOffice: false }))
  }

  return [{ region: '', location: '', isHeadOffice: false }]
}

export function PilotProjectSection({ formData, onInputChange, setFieldValue }: FormSectionProps) {
  useEffect(() => {
    const normalizedOffices = normalizePilotOffices(formData.pilotOfficeLocations)
    const regionsOffices = serializePilotOfficeLocations(normalizedOffices)

    if (JSON.stringify(normalizedOffices) !== JSON.stringify(formData.pilotOfficeLocations)) {
      setFieldValue('pilotOfficeLocations', normalizedOffices)
      return
    }

    if (regionsOffices !== formData.regionsOffices) {
      setFieldValue('regionsOffices', regionsOffices)
    }
  }, [
    formData.pilotOfficeLocations,
    formData.regionsOffices,
    setFieldValue,
  ])

  return (
    <SectionWrapper
      title="9. Platform Setup"
      description="Configure your Strategia Workforce Intelligence deployment"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Proposed Start Date">
          <Input
            name="proposedStartDate"
            type="date"
            value={formData.proposedStartDate}
            onChange={onInputChange}
          />
        </FormField>
        <FormField label="Desired Initial Duration">
          <Input
            name="pilotDuration"
            value={formData.pilotDuration}
            onChange={onInputChange}
            placeholder="e.g. 12 months (minimum)"
          />
        </FormField>
      </div>

      <FormField label="Deployment Locations" required>
        <OfficeLocationsEditor
          offices={normalizePilotOffices(formData.pilotOfficeLocations)}
          onChange={(offices) => setFieldValue('pilotOfficeLocations', normalizePilotOffices(offices))}
          addLabel="Add Location"
        />
      </FormField>

      <FormField label="Business Units / Functions Involved">
        <Input
          name="businessUnitsInvolved"
          value={formData.businessUnitsInvolved}
          onChange={onInputChange}
          placeholder="e.g. HR, IT, Operations, Clinical"
        />
      </FormField>

      <FormField label="Approx. Number Of Roles To Onboard" required>
        <Input
          name="approximateRoles"
          type="number"
          value={formData.approximateRoles}
          onChange={onInputChange}
          placeholder="e.g. 50"
          required
        />
      </FormField>
    </SectionWrapper>
  )
}
