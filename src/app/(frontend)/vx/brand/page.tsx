import type { Metadata } from 'next'
import Body from './page-body'

export const metadata: Metadata = {
  title: 'Design System | Strategia Tech',
  description:
    "Strategia's brand system: colour tokens, typography, components, and motion.",
}

export default function VxBrandPage() {
  return <Body />
}
