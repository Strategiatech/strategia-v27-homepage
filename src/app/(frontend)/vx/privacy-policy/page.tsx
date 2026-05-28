import type { Metadata } from 'next'
import Body from './page-body'

export const metadata: Metadata = {
  title: 'Privacy Policy | Strategia Tech',
  description:
    'How Strategia collects, uses, and protects information. Last updated 21 May 2026.',
}

export default function VxPrivacyPolicyPage() {
  return <Body />
}
