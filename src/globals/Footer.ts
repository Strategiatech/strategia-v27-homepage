import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    { name: 'newsletterHeading', type: 'text', defaultValue: 'Workforce briefings' },
    { name: 'newsletterDescription', type: 'text' },
    { name: 'copyright', type: 'text', defaultValue: '© 2026 Strategia Technologies, Inc. · strategiatech.io' },
  ],
}
