import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text' },
        { name: 'hasDropdown', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'signInText', type: 'text', defaultValue: 'Sign in' },
    { name: 'ctaText', type: 'text', defaultValue: 'Book a demo' },
  ],
}
