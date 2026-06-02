'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Turnstile } from '@/components/ui/turnstile'
import { FormField } from './FormField'
import { SectionWrapper } from './SectionWrapper'
import type { SignOffSectionProps } from '../../types/questionnaireForm'

export function SignOffSection({
  formData,
  onInputChange,
  termsAccepted,
  authorityConfirmed,
  setTermsAccepted,
  setAuthorityConfirmed,
  turnstileToken,
  onTurnstileVerify,
  onTurnstileError,
  onTurnstileExpire,
}: SignOffSectionProps) {
  return (
    <SectionWrapper title="11. Sign-Off" description="Final acknowledgment and authorisation">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
        By completing and submitting this document, you confirm that you have the authority to act on
        behalf of your organisation in engaging with Strategia.
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Name" required>
          <Input name="signOffName" value={formData.signOffName} onChange={onInputChange} required />
        </FormField>
        <FormField label="Title" required>
          <Input name="signOffTitle" value={formData.signOffTitle} onChange={onInputChange} required />
        </FormField>
      </div>

      <FormField label="Date" required>
        <Input name="signOffDate" type="date" value={formData.signOffDate} onChange={onInputChange} required />
      </FormField>

      <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <label className="flex items-start gap-3 text-sm leading-6 text-gray-700">
          <Checkbox
            checked={authorityConfirmed}
            onCheckedChange={(checked) => setAuthorityConfirmed(checked === true)}
            className="mt-1"
          />
          <span>I confirm that I have the authority to enter into this engagement on behalf of my organisation.</span>
        </label>
        <label className="flex items-start gap-3 text-sm leading-6 text-gray-700">
          <Checkbox
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            className="mt-1"
          />
          <span>
            I agree to the{' '}
            <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="mb-3 text-center text-sm text-gray-600">Please complete the verification below</p>
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
          onVerify={onTurnstileVerify}
          onError={onTurnstileError}
          onExpire={onTurnstileExpire}
        />
        {turnstileToken ? (
          <p className="mt-2 text-center text-xs text-green-600">✓ Verification complete</p>
        ) : null}
      </div>
    </SectionWrapper>
  )
}
