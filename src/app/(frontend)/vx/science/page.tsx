import type { Metadata } from 'next'
import Body from './page-body'

export const metadata: Metadata = {
  title: 'Science | Strategia Tech',
  description:
    'Big Five (OCEAN) psychometrics, peer-reviewed validity research, and adversarial debiasing. A predictive, fair, and legally defensible hiring signal.',
}

export default function VxSciencePage() {
  return <Body />
}
