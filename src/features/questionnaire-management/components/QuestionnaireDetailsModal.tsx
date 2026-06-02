/**
 * Questionnaire Details Modal Component
 */

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, FileDown, FileText } from 'lucide-react'
import type { QuestionnaireSubmission } from '../types/questionnaire'
import { formatDate, getStatusColor } from '../utils/formatters'
import {
  OrganisationSubmissionSection,
  ProjectChampionSubmissionSection,
  RecruitmentActivitySubmissionSection,
  InsightsSubmissionSection,
  TechnologySubmissionSection,
  PsychometricsSubmissionSection,
  WorkflowSubmissionSection,
  SuccessCriteriaSubmissionSection,
  PilotProjectSubmissionSection,
  ProjectedValueSubmissionSection,
  SignOffSubmissionSection,
} from './SubmissionSections'

interface QuestionnaireDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  submission: QuestionnaireSubmission | null
  onExportPDF: (submission: QuestionnaireSubmission) => void
  onExportWord: (submission: QuestionnaireSubmission) => void
  onExportTXT: (submission: QuestionnaireSubmission) => void
  onExportJSON: (submission: QuestionnaireSubmission) => void
}

export function QuestionnaireDetailsModal({
  open,
  onOpenChange,
  submission,
  onExportPDF,
  onExportWord,
  onExportTXT,
  onExportJSON,
}: QuestionnaireDetailsModalProps) {
  if (!submission || !submission.FormData) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submission Details - #{submission.Id}</DialogTitle>
          <DialogDescription>
            {submission.OrganisationName || 'Unknown Organisation'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <Label className="text-xs text-blue-600">Submission ID</Label>
                <p className="font-semibold text-blue-900">#{submission.Id}</p>
              </div>
              <div>
                <Label className="text-xs text-blue-600">Status</Label>
                <p>
                  <Badge className={`${getStatusColor(submission.Status)} text-white`}>
                    {submission.Status}
                  </Badge>
                </p>
              </div>
              <div>
                <Label className="text-xs text-blue-600">Submission Date</Label>
                <p className="font-semibold text-blue-900">
                  {formatDate(submission.SubmissionDate)}
                </p>
              </div>
            </div>
          </div>

          <OrganisationSubmissionSection formData={submission.FormData} />
          <ProjectChampionSubmissionSection formData={submission.FormData} />
          <RecruitmentActivitySubmissionSection formData={submission.FormData} />
          <InsightsSubmissionSection formData={submission.FormData} />
          <TechnologySubmissionSection formData={submission.FormData} />
          <PsychometricsSubmissionSection formData={submission.FormData} />
          <WorkflowSubmissionSection formData={submission.FormData} />
          <SuccessCriteriaSubmissionSection formData={submission.FormData} />
          <PilotProjectSubmissionSection formData={submission.FormData} />
          <ProjectedValueSubmissionSection formData={submission.FormData} />
          <SignOffSubmissionSection formData={submission.FormData} />

          <div className="flex justify-between border-t pt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onExportPDF(submission)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExportWord(submission)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as Word (.doc)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExportTXT(submission)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as TXT
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExportJSON(submission)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
