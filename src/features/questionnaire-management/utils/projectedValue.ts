import type { QuestionnaireFormData } from '../types/questionnaireForm'

interface BenchmarkSource {
  statement: string
  source: string
}

interface RegionBenchmark {
  cph: number
  ttf: number
  turnover: number
  sources: BenchmarkSource[]
}

interface IndustryBenchmark {
  cphMult: number
  ttfAdd: number
  turnoverAdd: number
  notes: BenchmarkSource[]
}

export interface ProjectedValueResult {
  regionName: string | null
  industryName: string | null
  hasContext: boolean
  adjustedCostPerHire: number | null
  adjustedTimeToFill: number | null
  adjustedTurnover: number | null
  agencySpend: number
  timeToFill: number
  costPerHire: number
  vacancies: number
  totalStaff: number
  projectedAgencySavings: { low: number; high: number } | null
  projectedTimeToFill: number | null
  projectedCostPerHire: number | null
  projectedAnnualHiringSavings: number | null
  potentialAnnualValue: number | null
  regionSources: BenchmarkSource[]
  industrySources: BenchmarkSource[]
}

const REGION_DATA: Record<string, RegionBenchmark> = {
  'United Kingdom': {
    cph: 7800,
    ttf: 42,
    turnover: 35,
    sources: [
      { statement: 'Avg. cost per hire: $7,800 (£6,125)', source: 'CIPD Resourcing & Talent Planning Report' },
      { statement: 'Avg. time-to-fill: 42 days', source: 'HireVue UK Benchmark, 2025' },
      { statement: 'Annual staff turnover: 35%', source: 'CIPD Labour Market Outlook, 2025' },
    ],
  },
  Europe: {
    cph: 5700,
    ttf: 48,
    turnover: 28,
    sources: [
      { statement: 'Avg. cost per hire: ~$5,700 (€5,200)', source: 'Bersin by Deloitte, Talent Acquisition Factbook' },
      { statement: 'Avg. time-to-fill: 48 days', source: 'CIPD / Talent Insight Group' },
    ],
  },
  'Middle East': {
    cph: 14800,
    ttf: 52,
    turnover: 22,
    sources: [
      { statement: 'Agency fees in GCC: 8–15% of annual salary', source: 'Hays / Robert Half ME Salary Guides, 2025' },
      { statement: '56% of ME professionals cite remuneration as #1 job factor', source: 'Barclay Simpson, 2025' },
    ],
  },
  'South Asia': {
    cph: 1000,
    ttf: 38,
    turnover: 20,
    sources: [
      { statement: 'Avg. attrition: ~20%', source: 'Mercer Total Remuneration Survey India, 2024' },
      { statement: 'International demand is widening domestic talent gaps', source: 'BIMCO / Mercer' },
    ],
  },
  'Southeast Asia': {
    cph: 8000,
    ttf: 52,
    turnover: 18,
    sources: [
      { statement: 'Avg. all-in cost per hire: $8,000–$15,000', source: 'SHRM 2026; NOW Healthcare 2025' },
      { statement: 'Avg. time-to-fill: 50–65 days', source: 'SHRM HCM 2023; Apploi' },
    ],
  },
  Australasia: {
    cph: 4700,
    ttf: 44,
    turnover: 25,
    sources: [
      { statement: 'Avg. cost per hire: $4,700 (A$7,200)', source: 'AHRI Pulse of HR Survey, 2024' },
      { statement: 'Avg. time-to-fill: 44 days', source: 'SEEK Employment Report, 2025' },
    ],
  },
  'North America': {
    cph: 4700,
    ttf: 44,
    turnover: 24,
    sources: [
      { statement: 'Avg. cost per hire: $4,700', source: 'SHRM Talent Acquisition Benchmarking Report, 2025' },
      { statement: 'Executive CPH: $28,000+', source: 'SHRM Recruiting Executives Report, Jan 2026' },
    ],
  },
}

const INDUSTRY_DATA: Record<string, IndustryBenchmark> = {
  'Healthcare / Medical': {
    cphMult: 1.8,
    ttfAdd: 15,
    turnoverAdd: 5,
    notes: [
      { statement: 'Healthcare CPH: $9,000–$15,000 per hire', source: 'SHRM 2026; NOW Healthcare 2025' },
      { statement: 'Clinical fill times: 60–80+ days', source: 'JobTarget Summer 2025; Apploi; SHRM HCM' },
    ],
  },
  'Banking & Finance': {
    cphMult: 1.3,
    ttfAdd: 5,
    turnoverAdd: 3,
    notes: [
      { statement: 'Banking & Finance CPH: ~$4,323', source: 'Factorial HR Benchmark' },
      { statement: 'Financial services AI adoption: 76%', source: 'Gartner / Second Talent, 2025' },
    ],
  },
  'Shipping & Maritime': {
    cphMult: 1.5,
    ttfAdd: 15,
    turnoverAdd: 10,
    notes: [
      { statement: 'Maritime crew turnover: 20–40%', source: 'Quay Group' },
      { statement: 'Credential verification creates a unique hiring burden', source: 'IMO / Martide' },
    ],
  },
  'Aviation & Airlines': {
    cphMult: 1.6,
    ttfAdd: 18,
    turnoverAdd: 5,
    notes: [
      { statement: 'Operational roles: 45–60 day time-to-fill', source: 'Industry estimates' },
      { statement: 'Pilot recruitment costs can exceed $25,000 per hire', source: 'Aviation recruitment benchmarks' },
    ],
  },
  'Oil & Gas / Energy': {
    cphMult: 2,
    ttfAdd: 15,
    turnoverAdd: 4,
    notes: [
      { statement: 'Specialist roles can exceed $15,000 cost per hire', source: 'Industry benchmarks' },
      { statement: 'Remote/FIFO hiring adds significant mobilisation costs', source: 'Industry estimates' },
    ],
  },
  'Hospitality & Tourism': {
    cphMult: 0.7,
    ttfAdd: -5,
    turnoverAdd: 30,
    notes: [
      { statement: 'Avg. cost per hire: ~$2,700', source: 'SHRM / Engagedly' },
      { statement: 'Industry turnover can reach 73% annually', source: 'US Bureau of Labor Statistics' },
    ],
  },
  'Mining & Resources': {
    cphMult: 2,
    ttfAdd: 15,
    turnoverAdd: 5,
    notes: [
      { statement: 'Specialist mining roles often exceed $15,000 cost per hire', source: 'Industry benchmarks' },
      { statement: 'Remote site hiring adds logistics costs', source: 'Industry estimates' },
    ],
  },
  'Pharmaceuticals & Biotech': {
    cphMult: 2.5,
    ttfAdd: 20,
    turnoverAdd: 5,
    notes: [
      { statement: 'Among the highest CPH industries due to regulatory burden', source: 'Industry analysis' },
      { statement: 'Scarcity of specialised talent drives premium agency fees', source: 'Hays Life Sciences' },
    ],
  },
}

export const parseNumericInput = (value: string): number => {
  const normalized = Number(String(value).replace(/[^\d.-]/g, ''))
  return Number.isFinite(normalized) ? normalized : 0
}

export const formatUsd = (value: number): string => `$${Math.round(value).toLocaleString()}`

export const calculateProjectedValue = (
  formData: QuestionnaireFormData
): ProjectedValueResult => {
  const regionName = formData.headOfficeRegion || formData.officeLocations[0]?.region || null
  const industryName = formData.industrySector || null

  const region = regionName ? REGION_DATA[regionName] ?? null : null
  const industry = industryName ? INDUSTRY_DATA[industryName] ?? null : null

  const agencySpend = parseNumericInput(formData.annualAgencySpend)
  const timeToFill = parseNumericInput(formData.avgTimeToFill)
  const costPerHire = parseNumericInput(formData.avgCostPerHire)
  const vacancies = parseNumericInput(formData.totalRolesRecruited || formData.forecastedRoles)
  const totalStaff = parseNumericInput(formData.totalInternalStaff)

  const adjustedCostPerHire = region
    ? Math.round(region.cph * (industry?.cphMult ?? 1))
    : null
  const adjustedTimeToFill = region ? region.ttf + (industry?.ttfAdd ?? 0) : null
  const adjustedTurnover = region ? region.turnover + (industry?.turnoverAdd ?? 0) : null

  const projectedAgencySavings = agencySpend > 0
    ? { low: Math.round(agencySpend * 0.3), high: Math.round(agencySpend * 0.5) }
    : null
  const projectedTimeToFill = timeToFill > 0 ? Math.round(timeToFill * 0.5) : null
  const projectedCostPerHire = costPerHire > 0 ? Math.round(costPerHire * 0.3) : null
  const projectedAnnualHiringSavings = projectedCostPerHire && vacancies > 0
    ? projectedCostPerHire * vacancies
    : null
  const potentialAnnualValue = (projectedAgencySavings?.low ?? 0) + (projectedAnnualHiringSavings ?? 0)

  return {
    regionName,
    industryName,
    hasContext: Boolean(region || industry),
    adjustedCostPerHire,
    adjustedTimeToFill,
    adjustedTurnover,
    agencySpend,
    timeToFill,
    costPerHire,
    vacancies,
    totalStaff,
    projectedAgencySavings,
    projectedTimeToFill,
    projectedCostPerHire,
    projectedAnnualHiringSavings,
    potentialAnnualValue: potentialAnnualValue > 0 ? potentialAnnualValue : null,
    regionSources: region?.sources ?? [],
    industrySources: industry?.notes ?? [],
  }
}
