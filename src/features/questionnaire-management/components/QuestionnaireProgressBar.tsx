'use client'

import { Check } from 'lucide-react'
import type { QuestionnaireSection } from '../types/questionnaireForm'
import type { QuestionnaireCompletionMap } from '../utils/questionnaireCompletion'

export interface QuestionnaireProgressBarProps {
  sections: QuestionnaireSection[]
  currentSection: number
  onSectionClick: (sectionId: number) => void
  completionMap: QuestionnaireCompletionMap
  completedCount: number
}

export function QuestionnaireProgressBar({
  sections,
  currentSection,
  onSectionClick,
  completionMap,
  completedCount,
}: QuestionnaireProgressBarProps) {
  return (
    <aside className="lg:sticky lg:top-28 lg:w-64 lg:flex-none">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-end justify-between border-b border-gray-100 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              Progress
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {completedCount}/{sections.length} complete
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-sm font-semibold text-blue-700">
            {completedCount}
          </div>
        </div>

        <div className="space-y-1">
          {sections.map((section) => {
            const active = currentSection === section.id
            const complete = completionMap[section.id]

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSectionClick(section.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  active
                    ? 'bg-blue-50 text-slate-900'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-slate-800'
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                    complete
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : active
                        ? 'border-blue-600 bg-white text-blue-700'
                        : 'border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {complete ? <Check className="h-3.5 w-3.5" /> : section.id}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
                    {section.title}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">{section.description}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
