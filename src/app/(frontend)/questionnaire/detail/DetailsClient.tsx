'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, RefreshCw } from 'lucide-react'
import {
  useQuestionnaireAuth,
  useQuestionnaireSubmissions,
  QuestionnaireLoginScreen,
  QuestionnaireStatsCard,
  QuestionnaireFilters,
  QuestionnaireTable,
  QuestionnaireDetailsModal,
  exportAsPDF,
  exportAsWord,
  exportAsTXT,
  exportAsJSON,
  type QuestionnaireSubmission,
} from '@/features/questionnaire-management'

export default function DetailsClient() {
  const [status, setStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubmission, setSelectedSubmission] = useState<QuestionnaireSubmission | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  // Authentication
  const { isAuthenticated, password, setPassword, isValidating, handlePasswordSubmit } =
    useQuestionnaireAuth()

  // Data fetching
  const { data, isLoading, error, refetch } = useQuestionnaireSubmissions(status, isAuthenticated)

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <QuestionnaireLoginScreen
        password={password}
        setPassword={setPassword}
        isValidating={isValidating}
        onSubmit={handlePasswordSubmit}
      />
    )
  }

  // Filter submissions by search query
  const filteredSubmissions = data?.filter((submission) => {
    if (!searchQuery) return true
    const search = searchQuery.toLowerCase()
    return (
      submission.OrganisationName?.toLowerCase().includes(search) ||
      submission.ContactEmail?.toLowerCase().includes(search) ||
      submission.ContactPerson?.toLowerCase().includes(search) ||
      submission.IndustrySector?.toLowerCase().includes(search)
    )
  })

  const handleViewDetails = (submission: QuestionnaireSubmission) => {
    setSelectedSubmission(submission)
    setDetailsOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Questionnaire Submissions</h1>
              <p className="mt-2 text-gray-600">
                View and manage all discovery questionnaire submissions
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>

        {/* Stats Card */}
        <div className="mb-6">
          <QuestionnaireStatsCard total={data?.length || 0} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <QuestionnaireFilters
            status={status}
            setStatus={setStatus}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredCount={filteredSubmissions?.length || 0}
            totalCount={data?.length || 0}
            isLoading={isLoading}
            onRefresh={() => refetch()}
          />
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Submissions List
            </CardTitle>
            <CardDescription>
              All questionnaire submissions from the discovery form
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                <p className="font-semibold">Error loading submissions</p>
                <p className="text-sm">
                  {error instanceof Error ? error.message : 'Unknown error'}
                </p>
              </div>
            )}

            {!isLoading &&
              !error &&
              filteredSubmissions &&
              filteredSubmissions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <FileText className="mb-4 h-12 w-12 text-gray-300" />
                  <p className="text-lg font-medium">No submissions found</p>
                  <p className="text-sm">Try adjusting your filters or search query</p>
                </div>
              )}

            {!isLoading && !error && filteredSubmissions && filteredSubmissions.length > 0 && (
              <QuestionnaireTable
                submissions={filteredSubmissions}
                onViewDetails={handleViewDetails}
                onExportPDF={exportAsPDF}
                onExportWord={exportAsWord}
                onExportTXT={exportAsTXT}
                onExportJSON={exportAsJSON}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Details Modal */}
      <QuestionnaireDetailsModal
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        submission={selectedSubmission}
        onExportPDF={exportAsPDF}
        onExportWord={exportAsWord}
        onExportTXT={exportAsTXT}
        onExportJSON={exportAsJSON}
      />
    </div>
  )
}
