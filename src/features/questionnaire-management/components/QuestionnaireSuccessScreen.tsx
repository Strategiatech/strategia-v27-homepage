'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Send } from 'lucide-react'

export interface QuestionnaireSuccessScreenProps {
  submissionId: number | null
}

export function QuestionnaireSuccessScreen({
  submissionId,
}: QuestionnaireSuccessScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6">
      <Card className="w-full max-w-2xl border-white/10 bg-white/95 shadow-2xl backdrop-blur">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
            <Send className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            Submission Successful!
          </CardTitle>
          <CardDescription className="text-gray-500">
            Thank you for completing the Discovery Questionnaire
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-sm text-green-800">
              Your discovery form has been submitted successfully.
              {submissionId && (
                <span className="mt-1 block font-medium">
                  Reference ID: #{submissionId}
                </span>
              )}
            </p>
          </div>
          <div className="space-y-2 text-gray-600">
            <p className="text-sm">
              Our team will review your submission and prepare a tailored response based on the information you provided.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-left">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              What Happens Next
            </p>
            <div className="space-y-4">
              {[
                {
                  number: '01',
                  title: 'We review your submission',
                  description: 'Our team will analyse the information you provided and prepare a tailored response.',
                },
                {
                  number: '02',
                  title: 'Your organisation-specific report',
                  description: 'Strategia will prepare an in-depth report with precise dollar-value projections, workforce efficiency modelling, and a detailed business case built from your data.',
                },
                {
                  number: '03',
                  title: 'Discovery call',
                  description: 'We will reach out to your project champion to walk through the report and discuss next steps.',
                },
              ].map((step) => (
                <div key={step.number} className="flex gap-4">
                  <span className="font-mono text-xs font-semibold tracking-[0.18em] text-blue-600">
                    {step.number}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                    <p className="text-sm leading-6 text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-4">
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
