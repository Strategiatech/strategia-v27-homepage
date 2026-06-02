'use client'

import { Input } from '@/components/ui/input'
import { CURRENCY_OPTIONS } from '../../constants/questionnaireFormConstants'

interface CurrencyInputProps {
  value: string
  currency: string
  placeholder?: string
  onValueChange: (value: string) => void
  onCurrencyChange: (currency: string) => void
}

export function CurrencyInput({
  value,
  currency,
  placeholder,
  onValueChange,
  onCurrencyChange,
}: CurrencyInputProps) {
  return (
    <div className="flex overflow-hidden rounded-md border border-input bg-white shadow-xs">
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="w-24 border-r border-input bg-slate-50 px-3 text-sm text-slate-700 outline-none"
      >
        {CURRENCY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Input
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        className="border-0 shadow-none focus-visible:ring-0"
      />
    </div>
  )
}
