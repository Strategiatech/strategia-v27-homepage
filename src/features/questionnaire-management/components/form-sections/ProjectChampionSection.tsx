'use client'

import { Input } from '@/components/ui/input'
import { FormField } from './FormField'
import { SectionWrapper } from './SectionWrapper'
import type { FormSectionProps } from '../../types/questionnaireForm'

export function ProjectChampionSection({ formData, onInputChange }: FormSectionProps) {
  return (
    <SectionWrapper title="2. Strategia Project Champion" description="Primary contact for the engagement">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Full Name" required>
          <Input
            name="keyContactPerson"
            value={formData.keyContactPerson}
            onChange={onInputChange}
            placeholder="e.g. Sarah Chen"
            required
          />
        </FormField>
        <FormField label="Title" required>
          <Input
            name="keyContactTitle"
            value={formData.keyContactTitle}
            onChange={onInputChange}
            placeholder="e.g. Head of Talent Acquisition"
            required
          />
        </FormField>
      </div>

      <FormField label="Department" required>
        <Input
          name="keyContactDepartment"
          value={formData.keyContactDepartment}
          onChange={onInputChange}
          placeholder="e.g. Human Resources"
          required
        />
      </FormField>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Email" required>
          <Input
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={onInputChange}
            placeholder="sarah.chen@company.com"
            required
          />
        </FormField>
        <FormField label="Telephone" required>
          <Input
            name="contactNumber"
            value={formData.contactNumber}
            onChange={onInputChange}
            placeholder="+65 9123 4567"
            required
          />
        </FormField>
      </div>
    </SectionWrapper>
  )
}
