import type { CollectionConfig } from 'payload'

export const Insights: CollectionConfig = {
  slug: 'insights',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'category', type: 'select', options: ['Report', 'Article', 'Webinar'] },
    { name: 'readTime', type: 'text' },
    { name: 'ctaText', type: 'text', defaultValue: 'Read report →' },
    { name: 'coverStyle', type: 'select', options: ['chart-1', 'chart-2', 'chart-3'] },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
