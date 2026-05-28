import type { CollectionConfig } from 'payload'

export const Integrations: CollectionConfig = {
  slug: 'integrations',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'category', type: 'text', required: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
