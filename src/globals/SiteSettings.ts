import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Strategia' },
    { name: 'tagline', type: 'text', defaultValue: 'Insight meets impact for an optimised healthcare workforce.' },
    { name: 'announceBanner', type: 'group', fields: [
      { name: 'enabled', type: 'checkbox', defaultValue: true },
      { name: 'text', type: 'text' },
      { name: 'linkText', type: 'text' },
      { name: 'linkHref', type: 'text' },
      { name: 'badge1', type: 'text' },
      { name: 'badge2', type: 'text' },
    ]},
    { name: 'problemSection', type: 'group', fields: [
      { name: 'eyebrow', type: 'text', defaultValue: 'The tension' },
      { name: 'heading', type: 'text' },
      { name: 'subheading', type: 'textarea' },
      { name: 'tagline', type: 'text' },
      { name: 'taglineHighlight', type: 'text' },
    ]},
    { name: 'securitySection', type: 'group', fields: [
      { name: 'heading', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'bullets', type: 'array', fields: [{ name: 'text', type: 'text' }] },
      { name: 'badges', type: 'array', fields: [
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'text' },
      ]},
    ]},
    { name: 'roiSection', type: 'group', fields: [
      { name: 'heading', type: 'text' },
      { name: 'subheading', type: 'text' },
      { name: 'cardHeading', type: 'text' },
      { name: 'cardDescription', type: 'text' },
    ]},
    { name: 'ctaSection', type: 'group', fields: [
      { name: 'heading', type: 'text' },
      { name: 'subheading', type: 'text' },
      { name: 'primaryCta', type: 'text', defaultValue: 'Book a demo' },
      { name: 'secondaryCta', type: 'text', defaultValue: 'Talk to sales' },
    ]},
  ],
}
