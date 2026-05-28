import type { Metadata } from 'next'
import Body from './page-body'

export const metadata: Metadata = {
  title: 'Platform | Strategia Tech',
  description:
    'Eight modules grouped into a five-phase loop. One defensible workflow from spec to onboarding, built for healthcare HR and executive teams.',
}

export default function VxPlatformPage() {
  return <Body />
}
