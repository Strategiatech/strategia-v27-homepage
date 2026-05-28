import type { Metadata } from 'next'
import Body from './page-body'

export const metadata: Metadata = {
  title: 'Solutions | Strategia Tech',
  description:
    'One platform, configured for the people who own the workforce. By role (CHRO, TA, executive, clinical) and by industry (healthcare, financial services, government, technology).',
}

export default function VxSolutionsPage() {
  return <Body />
}
