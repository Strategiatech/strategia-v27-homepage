import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Fraunces, Literata, Inter_Tight } from 'next/font/google'
import '../globals.css'
import PageNav from '@/components/PageNav'

const publishV27AsHome = process.env.NEXT_PUBLIC_PUBLISH_V27_AS_HOME === 'true'
const hidePageNav = process.env.NEXT_PUBLIC_HIDE_PAGE_NAV === 'true'
const siteUrl = 'https://strategiatech.ai'
const homeTitle = 'Strategia | AI-native workforce intelligence'
const homeDescription =
  'Strategia turns workforce signals into evidence-led decisions across hiring, capability, performance, culture, and retention.'
const legacyTitle = 'Strategia — AI-native workforce intelligence for healthcare'
const legacyDescription =
  'Strategia turns talent, job-fit, and workforce planning data into decisions that improve care and reduce cost — across every role in your health system.'
const previewImage = {
  url: `${siteUrl}/og-image.png`,
  width: 1200,
  height: 630,
  alt: 'Strategia logo on deep blue background',
}

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
  metadataBase: new URL(siteUrl),
  title: publishV27AsHome ? homeTitle : legacyTitle,
  description: publishV27AsHome ? homeDescription : legacyDescription,
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Strategia',
    title: publishV27AsHome ? homeTitle : legacyTitle,
    description: publishV27AsHome ? homeDescription : legacyDescription,
    images: [previewImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: publishV27AsHome ? homeTitle : legacyTitle,
    description: publishV27AsHome ? homeDescription : legacyDescription,
    images: [previewImage.url],
  },
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
        {!hidePageNav && <PageNav />}
        {children}
      </body>
    </html>
  )
}
