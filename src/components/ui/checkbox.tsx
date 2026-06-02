"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, className, checked, onCheckedChange, disabled, onClick, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          id={id}
          type="checkbox"
          ref={ref}
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          onClick={onClick}
          {...props}
        />
        <div
          className={cn(
            "h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer transition-colors",
            checked ? "bg-primary text-primary-foreground" : "bg-background",
            className
          )}
          onClick={(e) => {
            if (!disabled) {
              onCheckedChange?.(!checked)
            }
            onClick?.(e)
          }}
        >
          {checked && (
            <CheckIcon className="h-4 w-4 text-current flex items-center justify-center" />
          )}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox } 