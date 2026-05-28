import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Fraunces, Literata, Inter_Tight } from 'next/font/google'
import '../globals.css'
import PageNav from '@/components/PageNav'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
})

const literata = Literata({
  variable: '--font-literata',
  subsets: ['latin'],
  display: 'swap',
})

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Strategia — AI-driven workforce intelligence for healthcare',
  description:
    'Strategia turns talent, job-fit, and workforce planning data into decisions that improve care and reduce cost — across every role in your health system.',
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} ${literata.variable} ${interTight.variable}`}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning>
        <PageNav />
        {children}
      </body>
    </html>
  )
}
