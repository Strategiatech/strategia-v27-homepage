import type { CollectionConfig } from 'payload'

export const HeroSection: CollectionConfig = {
  slug: 'hero-section',
  admin: {
    useAsTitle: 'headline',
  },
  fields: [
    { name: 'kickerTag', type: 'text', defaultValue: 'NEW' },
    { name: 'kickerText', type: 'text', defaultValue: 'Predictive retention models — v4.2 released' },
    { name: 'headline', type: 'text', required: true },
    { name: 'headlineAccent', type: 'text', admin: { description: 'Word(s) to highlight with teal gradient' } },
    { name: 'subheadline', type: 'textarea', required: true },
    { name: 'primaryCta', type: 'text', defaultValue: 'Book a demo' },
    { name: 'secondaryCta', type: 'text', defaultValue: 'See the platform' },
    {
      name: 'trustBadges',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
    },
    {
      name: 'clientLogos',
      type: 'array',
      fields: [
        { name: 'symbol', type: 'text' },
        { name: 'name', type: 'text' },
      ],
    },
  ],
}
