'use client'

import { useEffect } from 'react'
import { BarChart3, BrainCircuit, Clock3, DollarSign, Sparkles, TrendingUp } from 'lucide-react'
import { SectionWrapper } from './SectionWrapper'
import type { FormSectionProps } from '../../types/questionnaireForm'
import { calculateProjectedValue, formatUsd } from '../../utils/projectedValue'

function MetricCard({
  title,
  value,
  subtitle,
  accent,
}: {
  title: string
  value: string
  subtitle: string
  accent: string
}) {
  return (
    <div className={`rounded-lg border bg-white p-4 shadow-sm ${accent}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
    </div>
  )
}

const buildSummary = (result: ReturnType<typeof calculateProjectedValue>) => {
  const parts: string[] = []

  if (result.regionName || result.industryName) {
    parts.push([
      result.regionName ? `Region: ${result.regionName}` : '',
      result.industryName ? `Industry: ${result.industryName}` : '',
    ].filter(Boolean).join(' | '))
  }

  if (result.projectedAgencySavings) {
    parts.push(
      `Agency spend reduction: ${formatUsd(result.projectedAgencySavings.low)}-${formatUsd(result.projectedAgencySavings.high)}`
    )
  }
  if (result.projectedTimeToFill) {
    parts.push(`Time-to-fill improvement: ${result.projectedTimeToFill} days`)
  }
  if (result.projectedAnnualHiringSavings) {
    parts.push(`Annual hiring savings: ${formatUsd(result.projectedAnnualHiringSavings)}`)
  }
  if (result.potentialAnnualValue) {
    parts.push(`Potential annual value: ~${formatUsd(result.potentialAnnualValue)}+`)
  }

  return parts.join('\n')
}

export function ProjectedValueSection({ formData, setFieldValue }: FormSectionProps) {
  const result = calculateProjectedValue(formData)

  useEffect(() => {
    const summary = buildSummary(result)
    if (summary !== formData.projectedValueSummary) {
      setFieldValue('projectedValueSummary', summary)
    }
  }, [formData.projectedValueSummary, result, setFieldValue])

  if (!result.hasContext) {
    return (
      <SectionWrapper title="10. Projected Value" description="Data-backed insights on what Strategia could deliver">
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Select Your Region And Industry</p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-blue-900">
            Head back to Organisation Information and select your region and industry. We&apos;ll
            generate projected savings and benchmarks tailored to your market once those are in place.
          </p>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper title="10. Projected Value" description="Data-backed insights on what Strategia could deliver">
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-blue-900">
        The insights below are based on {result.regionName ? `${result.regionName} regional` : 'global'}
        {result.industryName ? ` and ${result.industryName}` : ''} recruitment benchmarks from published
        research{result.agencySpend > 0 || result.timeToFill > 0 || result.costPerHire > 0
          ? ', combined with the data you have provided'
          : ''}. These are indicative projections to give you a sense of what&apos;s possible.
      </div>

      {(result.projectedAgencySavings || result.projectedTimeToFill || result.projectedCostPerHire) ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Sparkles className="h-4 w-4 text-blue-600" />
            Your Projected Savings
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {result.projectedAgencySavings ? (
              <MetricCard
                title="Agency Spend Reduction"
                value={`${formatUsd(result.projectedAgencySavings.low)}-${formatUsd(result.projectedAgencySavings.high)}`}
                subtitle={`Indicative 30-50% reduction on your current ${formatUsd(result.agencySpend)} annual agency spend.`}
                accent="border-emerald-200"
              />
            ) : null}
            {result.projectedTimeToFill ? (
              <MetricCard
                title="Time-to-Fill Improvement"
                value={`${result.projectedTimeToFill} days`}
                subtitle={`A 50% faster cycle versus your current ${result.timeToFill}-day benchmark.`}
                accent="border-blue-200"
              />
            ) : null}
            {result.projectedCostPerHire ? (
              <MetricCard
                title="Cost-per-Hire Reduction"
                value={formatUsd(result.projectedCostPerHire)}
                subtitle={result.projectedAnnualHiringSavings
                  ? `${formatUsd(result.projectedAnnualHiringSavings)} annual hiring value based on your current volume.`
                  : 'Indicative 30% efficiency gain through automation and lower agency reliance.'}
                accent="border-violet-200"
              />
            ) : null}
          </div>
        </div>
      ) : null}

      {result.regionName ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            {result.regionName} Market Benchmarks
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {result.adjustedCostPerHire ? (
              <MetricCard
                title="Average Cost-per-Hire"
                value={formatUsd(result.adjustedCostPerHire)}
                subtitle={result.industryName ? `${result.industryName} adjusted benchmark.` : 'Regional benchmark.'}
                accent="border-amber-200"
              />
            ) : null}
            {result.adjustedTimeToFill ? (
              <MetricCard
                title="Average Time-to-Fill"
                value={`${result.adjustedTimeToFill} days`}
                subtitle={result.industryName ? `${result.industryName} adjusted benchmark.` : 'Regional benchmark.'}
                accent="border-sky-200"
              />
            ) : null}
            {result.adjustedTurnover ? (
              <MetricCard
                title="Annual Employee Churn"
                value={`${result.adjustedTurnover}%`}
                subtitle={result.industryName ? `${result.industryName} adjusted benchmark.` : 'Regional benchmark.'}
                accent="border-slate-200"
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="rounded-xl bg-slate-900 p-6 text-slate-100">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
          <BrainCircuit className="h-4 w-4 text-blue-300" />
          What Strategia Could Deliver
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Clock3 className="h-4 w-4 text-amber-300" />
              Faster Hiring Cycles
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              AI-assisted screening and structured workflow design can materially reduce the time spent
              moving from requisition to shortlist.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <DollarSign className="h-4 w-4 text-emerald-300" />
              Lower External Spend
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Strategia is designed to build internal sourcing and screening capability, reducing
              dependency on agencies over time.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <TrendingUp className="h-4 w-4 text-blue-300" />
              Better Fit And Quality
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Predictive hiring models can improve candidate-role fit and create a stronger quality-of-hire
              feedback loop than traditional processes.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4 text-violet-300" />
              Workforce Intelligence
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Each hiring decision enriches a reusable intelligence layer that can inform succession,
              leadership, and workforce planning over time. Strategia sits on top of your existing tools,
              progressively building a Workforce DNA that sharpens every subsequent decision.
            </p>
          </div>
        </div>
        {result.potentialAnnualValue ? (
          <div className="mt-4 rounded-lg border border-emerald-300/30 bg-emerald-400/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">Potential Annual Value</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-100">~{formatUsd(result.potentialAnnualValue)}+</p>
            <p className="mt-2 text-sm leading-6 text-emerald-50/85">
              Indicative combined savings based on the data currently entered into the questionnaire.
            </p>
          </div>
        ) : null}
      </div>

      {(result.regionSources.length > 0 || result.industrySources.length > 0) ? (
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
            Benchmark Sources
          </p>
          <div className="space-y-2 text-sm leading-6 text-slate-600">
            {[...result.regionSources, ...result.industrySources].map((source, index) => (
              <p key={`${source.source}-${index}`}>
                <span className="font-medium text-slate-800">{source.statement}</span>
                <span className="text-slate-500"> — {source.source}</span>
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </SectionWrapper>
  )
}
