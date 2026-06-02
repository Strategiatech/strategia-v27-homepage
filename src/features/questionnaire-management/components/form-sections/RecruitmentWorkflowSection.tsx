'use client'

import { useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from './FormField'
import { SectionWrapper } from './SectionWrapper'
import { WorkflowBuilder } from './WorkflowBuilder'
import { serializeWorkflow } from '../../utils/questionnaireSerializers'
import type { FormSectionProps } from '../../types/questionnaireForm'

const reorderArray = <T,>(items: T[], fromIndex: number, toIndex: number): T[] => {
  const next = [...items]
  const [moved] = next.splice(fromIndex, 1)
  next.splice(toIndex, 0, moved)
  return next
}

export function RecruitmentWorkflowSection({ formData, onInputChange, setFieldValue }: FormSectionProps) {
  useEffect(() => {
    const serialized = serializeWorkflow(
      formData.workflowSteps,
      formData.workflowPersonnelMap,
      formData.workflowAdditionalNotes
    )

    if (serialized !== formData.recruitmentWorkflow) {
      setFieldValue('recruitmentWorkflow', serialized)
    }
  }, [
    formData.recruitmentWorkflow,
    formData.workflowAdditionalNotes,
    formData.workflowPersonnelMap,
    formData.workflowSteps,
    setFieldValue,
  ])

  const handleRemoveStep = (index: number) => {
    const stepToRemove = formData.workflowSteps[index]
    const nextSteps = formData.workflowSteps.filter((_, stepIndex) => stepIndex !== index)
    const nextPersonnelMap = { ...formData.workflowPersonnelMap }
    delete nextPersonnelMap[stepToRemove]

    setFieldValue('workflowSteps', nextSteps)
    setFieldValue('workflowPersonnelMap', nextPersonnelMap)
  }

  const handleAddStep = (label: string) => {
    const trimmed = label.trim()
    if (!trimmed || formData.workflowSteps.includes(trimmed)) {
      return
    }

    setFieldValue('workflowSteps', [...formData.workflowSteps, trimmed])
  }

  const handlePersonnelToggle = (step: string, person: string) => {
    const currentPersonnel = formData.workflowPersonnelMap[step] ?? []
    const nextPersonnel = currentPersonnel.includes(person)
      ? currentPersonnel.filter((entry) => entry !== person)
      : [...currentPersonnel, person]

    setFieldValue('workflowPersonnelMap', {
      ...formData.workflowPersonnelMap,
      [step]: nextPersonnel,
    })
  }

  return (
    <SectionWrapper
      title="7. Recruitment Workflow & Process"
      description="Map your current recruitment process — Strategia's Workforce Intelligence layer will integrate with and enhance each step"
    >
      <WorkflowBuilder
        steps={formData.workflowSteps}
        personnelMap={formData.workflowPersonnelMap}
        onReorder={(fromIndex, toIndex) => setFieldValue('workflowSteps', reorderArray(formData.workflowSteps, fromIndex, toIndex))}
        onRemoveStep={handleRemoveStep}
        onAddStep={handleAddStep}
        onPersonnelToggle={handlePersonnelToggle}
      />

      <FormField label="Flowchart Or Additional Notes" note="Note here if a process flowchart will be provided separately.">
        <Textarea
          name="workflowAdditionalNotes"
          value={formData.workflowAdditionalNotes}
          onChange={onInputChange}
          rows={4}
          placeholder="Additional workflow context, exceptions, or notes..."
          className="bg-white"
        />
      </FormField>
    </SectionWrapper>
  )
}
