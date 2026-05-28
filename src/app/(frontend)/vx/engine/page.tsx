import type { Metadata } from 'next'
import Body from './page-body'

export const metadata: Metadata = {
  title: 'Intelligence Engine | Strategia Tech',
  description:
    'Build the role spec, screen at 1,000 CVs per hour, run validated assessments, and produce one defensible composite score per candidate.',
}

export default function VxEnginePage() {
  return <Body />
}
