/**
 * Questionnaire Table Component
 */

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Building, Calendar, ChevronDown, Eye, FileDown, FileText, Mail, User } from 'lucide-react'
import type { QuestionnaireSubmission } from '../types/questionnaire'
import { formatDate, getStatusColor } from '../utils/formatters'

interface QuestionnaireTableProps {
  submissions: QuestionnaireSubmission[]
  onViewDetails: (submission: QuestionnaireSubmission) => void
  onExportPDF: (submission: QuestionnaireSubmission) => void
  onExportWord: (submission: QuestionnaireSubmission) => void
  onExportTXT: (submission: QuestionnaireSubmission) => void
  onExportJSON: (submission: QuestionnaireSubmission) => void
}

export function QuestionnaireTable({
  submissions,
  onViewDetails,
  onExportPDF,
  onExportWord,
  onExportTXT,
  onExportJSON,
}: QuestionnaireTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Organisation</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.Id} className="hover:bg-gray-50">
              <TableCell className="font-medium">#{submission.Id}</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(submission.Status)} text-white`}>
                  {submission.Status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{submission.OrganisationName || 'N/A'}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  {submission.ContactPerson || 'N/A'}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {submission.ContactEmail || 'N/A'}
                </div>
              </TableCell>
              <TableCell>{submission.IndustrySector || 'N/A'}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{formatDate(submission.SubmissionDate)}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => onViewDetails(submission)}>
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FileDown className="mr-1 h-4 w-4" />
                        Export
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onExportPDF(submission)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Export as PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onExportWord(submission)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Export as Word
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
