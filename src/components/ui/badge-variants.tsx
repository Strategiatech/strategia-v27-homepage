import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

// Status Badge with semantic variants
interface StatusBadgeProps {
  status: string
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default'
  className?: string
}

export function StatusBadge({
  status,
  variant = 'default',
  className,
}: StatusBadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-700 hover:bg-green-100'
      case 'warning':
        return 'bg-amber-100 text-amber-700 hover:bg-amber-100'
      case 'error':
        return 'bg-red-100 text-red-700 hover:bg-red-100'
      case 'info':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100'
      case 'default':
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100'
    }
  }

  return (
    <Badge
      className={cn('rounded-full font-medium', getVariantStyles(), className)}
    >
      {status}
    </Badge>
  )
}

// Employment Type Badge
interface TypeBadgeProps {
  type: string
  className?: string
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'rounded-full border bg-slate-100 text-slate-700 hover:bg-slate-100',
        className
      )}
    >
      {type}
    </Badge>
  )
}

// Role Label - Used for displaying roles
interface RoleLabelProps {
  role: string
  className?: string
}

export function RoleLabel({ role, className }: RoleLabelProps) {
  return (
    <span
      className={cn('text-muted-foreground text-sm font-normal', className)}
    >
      {role}
    </span>
  )
}

// Counter Badge - Used for displaying counts with icons
interface CounterBadgeProps {
  count: number
  icon?: LucideIcon
  className?: string
}

export function CounterBadge({
  count,
  icon: Icon,
  className,
}: CounterBadgeProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Icon && <Icon className="text-muted-foreground h-3.5 w-3.5" />}
      <span className="text-muted-foreground text-sm">{count}</span>
    </div>
  )
}
