import type { Metadata } from 'next'
import Body from './page-body'

export const metadata: Metadata = {
  title: 'Our Process | Strategia Tech',
  description:
    'Five steps from requisition to retained outcome. Every Strategia engagement runs the same disciplined loop, and every step output is auditable, exportable, and yours.',
}

export default function VxProcessPage() {
  return <Body />
}
