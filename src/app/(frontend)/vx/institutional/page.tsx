import type { Metadata } from 'next'
import Body from './page-body'

export const metadata: Metadata = {
  title: 'Enterprise | Strategia Tech',
  description:
    'Data sovereignty, white-glove implementation, and compliance posture for the most regulated workforces in the country. SOC 2 Type II, HIPAA, HITRUST, single-tenant deployments.',
}

export default function VxInstitutionalPage() {
  return <Body />
}
