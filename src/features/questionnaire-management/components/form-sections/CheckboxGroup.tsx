'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from './FormField'
import type { QuestionnaireFormData } from '../../types/questionnaireForm'

interface CheckboxGroupProps {
  label: string
  options: readonly string[]
  field: keyof QuestionnaireFormData
  formData: QuestionnaireFormData
  onCheckboxChange: (field: keyof QuestionnaireFormData, value: string, checked: boolean) => void
  otherTrigger?: string
  otherField?: keyof QuestionnaireFormData
  otherPlaceholder?: string
  otherMultiline?: boolean
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  gridClassName?: string
  note?: string
}

export function CheckboxGroup({
  label,
  options,
  field,
  formData,
  onCheckboxChange,
  otherTrigger = 'Other',
  otherField,
  otherPlaceholder = 'Please specify',
  otherMultiline = false,
  onInputChange,
  gridClassName = 'grid gap-3 md:grid-cols-2',
  note,
}: CheckboxGroupProps) {
  const selectedValues = (formData[field] as string[]) ?? []
  const showOther = Boolean(otherField && selectedValues.includes(otherTrigger))

  return (
    <FormField label={label} note={note}>
      <div className={gridClassName}>
        {options.map((option) => (
          <label key={option} className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700">
            <Checkbox
              checked={selectedValues.includes(option)}
              onCheckedChange={(checked) => onCheckboxChange(field, option, checked as boolean)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {showOther && otherField && onInputChange ? (
        otherMultiline ? (
          <Textarea
            name={otherField as string}
            placeholder={otherPlaceholder}
            value={formData[otherField] as string}
            onChange={onInputChange}
            className="mt-3 bg-white"
            rows={3}
          />
        ) : (
          <Input
            name={otherField as string}
            placeholder={otherPlaceholder}
            value={formData[otherField] as string}
            onChange={onInputChange}
            className="mt-3 bg-white"
          />
        )
      ) : null}
    </FormField>
  )
}
