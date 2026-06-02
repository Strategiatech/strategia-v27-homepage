import type {
  OfficeLocation,
  PilotJobDescriptionEntry,
  PilotRoleEntry,
} from '../types/questionnaireForm'

const compact = (value: string) => value.trim()

export const formatOfficeLocation = (office: OfficeLocation): string => {
  const parts = [compact(office.location), compact(office.region)].filter(Boolean)
  return parts.join(' — ')
}

export const serializeOtherOfficeLocations = (offices: OfficeLocation[]): string =>
  offices
    .filter((office) => !office.isHeadOffice)
    .map(formatOfficeLocation)
    .filter(Boolean)
    .join(', ')

export const serializePilotOfficeLocations = (offices: OfficeLocation[]): string =>
  offices.map(formatOfficeLocation).filter(Boolean).join(', ')

export const serializeAdvertisingPlatforms = (
  selections: string[],
  other: string
): string => {
  const items = selections.filter((item) => item !== 'Other')
  const extra = compact(other)
  if (selections.includes('Other') && extra) {
    items.push(`Other: ${extra}`)
  }
  return items.join(', ')
}

export const serializePilotRoles = (roles: PilotRoleEntry[]): string =>
  roles
    .filter((role) => role.title.trim())
    .map((role) => {
      const lines = [
        `Job Title: ${role.title.trim()}`,
        role.department.trim() ? `Department: ${role.department.trim()}` : '',
        role.positions.trim() ? `No. of Positions: ${role.positions.trim()}` : '',
        role.notes.trim() ? `Core Competencies / Notes: ${role.notes.trim()}` : '',
      ].filter(Boolean)
      return lines.join('\n')
    })
    .join('\n\n')

export const serializePilotJobDescriptions = (
  entries: PilotJobDescriptionEntry[],
  roles: PilotRoleEntry[]
): string =>
  entries
    .filter((entry) => entry.text.trim() || entry.title.trim())
    .map((entry) => {
      const linkedRole = entry.roleIndex !== '' ? roles[Number(entry.roleIndex)] : null
      const lines = [
        linkedRole?.title ? `Pilot Role: ${linkedRole.title}` : '',
        entry.title.trim() ? `JD Title / Reference: ${entry.title.trim()}` : '',
        entry.text.trim() ? `Job Description:\n${entry.text.trim()}` : '',
      ].filter(Boolean)
      return lines.join('\n')
    })
    .join('\n\n')

export const serializeWorkflow = (
  steps: string[],
  personnelMap: Record<string, string[]>,
  additionalNotes: string
): string => {
  const stepText = steps
    .filter((step) => step.trim())
    .map((step, index) => {
      const people = personnelMap[step] ?? []
      const lines = [
        `${index + 1}. ${step.trim()}`,
        people.length > 0 ? `   Personnel: ${people.join(', ')}` : '',
      ].filter(Boolean)
      return lines.join('\n')
    })
    .join('\n\n')

  const notes = compact(additionalNotes)
  if (!notes) {
    return stepText
  }

  return [stepText, `Additional Notes:\n${notes}`].filter(Boolean).join('\n\n')
}

export const calculateTurnoverRate = (annualExits: string, totalStaff: string): string => {
  const exits = Number(annualExits.replace(/[,\s]/g, ''))
  const staff = Number(totalStaff.replace(/[,\s]/g, ''))

  if (!Number.isFinite(exits) || !Number.isFinite(staff) || exits <= 0 || staff <= 0) {
    return ''
  }

  return ((exits / staff) * 100).toFixed(1)
}
