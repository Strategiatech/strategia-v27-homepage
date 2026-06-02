'use client'

import { CircleHelp } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface FormFieldProps {
  label: string
  required?: boolean
  note?: string
  tooltip?: string
  children: React.ReactNode
}

export function FormField({ label, required = false, note, tooltip, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <Label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
          {label}
          {required ? <span className="ml-1 text-blue-600">*</span> : null}
        </Label>
        {tooltip ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-colors hover:border-blue-400 hover:text-blue-600"
              >
                <CircleHelp className="h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs leading-5">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      {children}
      {note ? <p className="text-xs leading-5 text-slate-500">{note}</p> : null}
    </div>
  )
}
