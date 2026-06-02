/**
 * Questionnaire Formatting Utilities
 */

// Helper to safely render unknown values
export const renderValue = (value: unknown): string => {
  if (value === null || value === undefined) return 'N/A'
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return String(value)
}

// Format date
export const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Get status badge color
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'New':
      return 'bg-blue-500'
    case 'Reviewed':
      return 'bg-yellow-500'
    case 'Contacted':
      return 'bg-purple-500'
    case 'In Progress':
      return 'bg-orange-500'
    case 'Completed':
      return 'bg-green-500'
    case 'Cancelled':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}
