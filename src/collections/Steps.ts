import type { CollectionConfig } from 'payload'

export const Steps: CollectionConfig = {
  slug: 'steps',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'stepNumber', type: 'number', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
