'use client'

import { Button } from '@/components/ui/button'
import type { OfficeLocation } from '../../types/questionnaireForm'
import { REGIONS, REGION_CITIES } from '../../constants/questionnaireFormConstants'

interface OfficeLocationsEditorProps {
  offices: OfficeLocation[]
  onChange: (offices: OfficeLocation[]) => void
  addLabel: string
}

export function OfficeLocationsEditor({ offices, onChange, addLabel }: OfficeLocationsEditorProps) {
  const updateOffice = (index: number, patch: Partial<OfficeLocation>) => {
    const next = offices.map((office, officeIndex) => (
      officeIndex === index ? { ...office, ...patch } : office
    ))
    onChange(next)
  }

  const addOffice = () => {
    onChange([...offices, { region: '', location: '', isHeadOffice: false }])
  }

  const removeOffice = (index: number) => {
    onChange(offices.filter((_, officeIndex) => officeIndex !== index))
  }

  return (
    <div className="space-y-3">
      {offices.map((office, index) => {
        const isHead = index === 0 || office.isHeadOffice
        const availableCities = office.region ? REGION_CITIES[office.region as keyof typeof REGION_CITIES] ?? [] : []

        return (
          <div key={`${office.region}-${office.location}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {isHead ? 'Head Office' : `Office ${index + 1}`}
              </p>
              {!isHead ? (
                <button
                  type="button"
                  onClick={() => removeOffice(index)}
                  className="text-sm text-blue-600 transition-colors hover:text-blue-800"
                >
                  Remove
                </button>
              ) : null}
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <select
                value={office.region}
                onChange={(e) => updateOffice(index, { region: e.target.value, location: '' })}
                className="h-10 rounded-md border border-input bg-white px-3 text-sm outline-none"
              >
                <option value="">Select region...</option>
                {REGIONS.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                value={office.location}
                onChange={(e) => updateOffice(index, { location: e.target.value })}
                disabled={!office.region}
                className="h-10 rounded-md border border-input bg-white px-3 text-sm outline-none disabled:cursor-not-allowed disabled:bg-slate-100"
              >
                <option value="">{office.region ? 'Select city...' : 'Select a region first...'}</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )
      })}

      <Button type="button" variant="outline" onClick={addOffice} className="w-full border-dashed">
        {addLabel}
      </Button>
    </div>
  )
}
