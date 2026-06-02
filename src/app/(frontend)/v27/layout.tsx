import type { Metadata } from 'next'

const siteUrl = 'https://strategiatech.ai'
const title = 'Strategia | AI-native workforce intelligence'
const description =
  'Strategia turns workforce signals into evidence-led decisions across hiring, capability, performance, culture, and retention.'
const previewImage = {
  url: `${siteUrl}/og-image.png`,
  width: 1200,
  height: 630,
  alt: 'Strategia logo on deep blue background',
}

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: `${siteUrl}/v27`,
    siteName: 'Strategia',
    title,
    description,
    images: [previewImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [previewImage.url],
  },
}

export default function V27Layout({ children }: { children: React.ReactNode }) {
  return children
}
