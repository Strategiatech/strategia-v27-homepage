'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { WORKFLOW_PERSONNEL_OPTIONS } from '../../constants/questionnaireFormConstants'

interface WorkflowBuilderProps {
  steps: string[]
  personnelMap: Record<string, string[]>
  onReorder: (fromIndex: number, toIndex: number) => void
  onRemoveStep: (index: number) => void
  onAddStep: (label: string) => void
  onPersonnelToggle: (step: string, person: string) => void
}

export function WorkflowBuilder({
  steps,
  personnelMap,
  onReorder,
  onRemoveStep,
  onAddStep,
  onPersonnelToggle,
}: WorkflowBuilderProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [customStep, setCustomStep] = useState('')

  const stepCards = useMemo(
    () => steps.filter((step) => step.trim()),
    [steps]
  )

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-900">
        <p><strong>Step 1:</strong> Drag cards to match your current hiring sequence.</p>
        <p><strong>Step 2:</strong> Select the personnel involved in each step.</p>
      </div>

      <div className="space-y-3">
        {stepCards.map((step, index) => {
          const selectedPersonnel = personnelMap[step] ?? []

          return (
            <div
              key={`${step}-${index}`}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (dragIndex === null || dragIndex === index) return
                onReorder(dragIndex, index)
                setDragIndex(null)
              }}
              onDragEnd={() => setDragIndex(null)}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Step {index + 1}
                  </p>
                  <p className="text-base font-semibold text-slate-900">{step}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveStep(index)}
                  className="text-sm text-blue-600 transition-colors hover:text-blue-800"
                >
                  Remove
                </button>
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                {WORKFLOW_PERSONNEL_OPTIONS.map((person) => (
                  <label key={person} className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700">
                    <Checkbox
                      checked={selectedPersonnel.includes(person)}
                      onCheckedChange={() => onPersonnelToggle(step, person)}
                    />
                    <span>{person}</span>
                  </label>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:flex-row">
        <Input
          value={customStep}
          onChange={(event) => setCustomStep(event.target.value)}
          placeholder="Add a custom workflow step..."
          className="bg-white"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const trimmed = customStep.trim()
            if (!trimmed) return
            onAddStep(trimmed)
            setCustomStep('')
          }}
        >
          Add Custom Step
        </Button>
      </div>
    </div>
  )
}
