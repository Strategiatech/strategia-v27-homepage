import type { CollectionConfig } from 'payload'

export const Stats: CollectionConfig = {
  slug: 'stats',
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    { name: 'section', type: 'select', options: ['problem', 'outcomes'], required: true },
    { name: 'value', type: 'number', required: true },
    { name: 'decimals', type: 'number', defaultValue: 0 },
    { name: 'prefix', type: 'text' },
    { name: 'suffix', type: 'text' },
    { name: 'label', type: 'text', required: true },
    { name: 'source', type: 'text' },
    { name: 'barFill', type: 'number', admin: { description: 'Percentage for outcome bar (0-100)' } },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
