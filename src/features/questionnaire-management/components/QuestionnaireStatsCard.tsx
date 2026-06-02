/**
 * Questionnaire Stats Card Component
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'

interface QuestionnaireStatsCardProps {
  total: number
}

export function QuestionnaireStatsCard({ total }: QuestionnaireStatsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <FileText className="h-5 w-5" />
          Total Submissions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-blue-600">{total}</div>
        <p className="mt-1 text-sm text-gray-600">
          Discovery questionnaire submissions received
        </p>
      </CardContent>
    </Card>
  )
}
