import type { CollectionConfig } from 'payload'

export const Pillars: CollectionConfig = {
  slug: 'pillars',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'number', type: 'text', required: true },
    { name: 'label', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'text', type: 'text' }],
    },
    { name: 'linkText', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
