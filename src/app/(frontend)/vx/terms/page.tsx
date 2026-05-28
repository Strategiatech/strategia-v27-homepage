import type { Metadata } from 'next'
import Body from './page-body'

export const metadata: Metadata = {
  title: 'Terms of Service | Strategia Tech',
  description:
    'The terms governing use of the Strategia Tech platform and website.',
}

export default function VxTermsPage() {
  return <Body />
}
