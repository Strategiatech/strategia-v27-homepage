const isGithubPages = process.env.GITHUB_PAGES === 'true'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

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

export default nextConfig
