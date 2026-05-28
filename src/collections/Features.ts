import type { CollectionConfig } from 'payload'

export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'tabTitle',
  },
  fields: [
    { name: 'tabTitle', type: 'text', required: true },
    { name: 'tabNumber', type: 'number', required: true },
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'bullets',
      type: 'array',
      fields: [
        { name: 'bold', type: 'text' },
        { name: 'text', type: 'text' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
