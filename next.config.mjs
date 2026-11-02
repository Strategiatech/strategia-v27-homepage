import { PHASE_PRODUCTION_BUILD } from 'next/constants.js'

const isGithubPages = process.env.GITHUB_PAGES === 'true'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Public API targets that every production build must inline. There is no
// fallback host on purpose: a build without them must fail here, not ship a
// site that posts to a dead or unknown host. `next dev` is not gated so the
// pages still render locally without these values (the forms stay disabled).
const REQUIRED_PUBLIC_ENV = ['NEXT_PUBLIC_CONTACT_API_URL', 'NEXT_PUBLIC_FUNCTION_APP_URL']

function assertRequiredPublicEnv() {
  const missing = REQUIRED_PUBLIC_ENV.filter((name) => !(process.env[name] ?? '').trim())
  if (missing.length > 0) {
    throw new Error(
      `Missing required public env var(s): ${missing.join(', ')}. ` +
        'Set them in the build environment (see .github/workflows/deploy-pages.yml or the Dockerfile build args).'
    )
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isGithubPages ? 'export' : 'standalone',
  ...(isGithubPages && basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  ...(isGithubPages
    ? {
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
  // TypeScript errors fail the build. Don't add `ignoreBuildErrors: true`
  // without a strong reason — the deploy is the gate and we want type
  // issues to surface there.

  // Hide the in-dev Next.js indicator badge (the "N" circle that lands in
  // the bottom-left in development). It never ships to production, but it
  // gets in the way of design QA on screenshot reviews.
  devIndicators: false,
}

export default function config(phase) {
  if (phase === PHASE_PRODUCTION_BUILD) {
    assertRequiredPublicEnv()
  }
  return nextConfig
}
