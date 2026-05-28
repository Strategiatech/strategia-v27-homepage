import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Pages } from './collections/Pages'
import { HeroSection } from './collections/HeroSection'
import { Stats } from './collections/Stats'
import { Pillars } from './collections/Pillars'
import { Steps } from './collections/Steps'
import { Features } from './collections/Features'
import { Outcomes } from './collections/Outcomes'
import { Integrations } from './collections/Integrations'
import { Insights } from './collections/Insights'
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
    Pages,
    HeroSection,
    Stats,
    Pillars,
    Steps,
    Features,
    Outcomes,
    Integrations,
    Insights,
  ],
  globals: [
    SiteSettings,
    Navigation,
    Footer,
  ],
  secret: process.env.PAYLOAD_SECRET || 'default-secret',
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/strategiatech',
  }),
  sharp,
  typescript: {
    outputFile: 'src/payload-types.ts',
  },
})
