import type { CollectionConfig } from 'payload'

export const Outcomes: CollectionConfig = {
  slug: 'outcomes',
  admin: {
    useAsTitle: 'quote',
  },
  fields: [
    { name: 'quote', type: 'textarea' },
    { name: 'authorName', type: 'text' },
    { name: 'authorTitle', type: 'text' },
    { name: 'authorInitials', type: 'text' },
    { name: 'companyName', type: 'text' },
    { name: 'companySymbol', type: 'text' },
    {
      name: 'caseStats',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'value', type: 'text' },
      ],
    },
  ],
}
