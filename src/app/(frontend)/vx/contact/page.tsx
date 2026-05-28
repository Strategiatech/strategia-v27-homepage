import type { Metadata } from 'next'
import Body from './page-body'

export const metadata: Metadata = {
  title: 'Contact | Strategia Tech',
  description:
    'Talk to the Strategia team about workforce intelligence for your organisation.',
}

export default function VxContactPage() {
  return <Body />
}
