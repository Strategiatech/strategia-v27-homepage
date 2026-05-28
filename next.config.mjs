/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // TypeScript errors fail the build. Don't add `ignoreBuildErrors: true`
  // without a strong reason — the deploy is the gate and we want type
  // issues to surface there.

  // Hide the in-dev Next.js indicator badge (the "N" circle that lands in
  // the bottom-left in development). It never ships to production, but it
  // gets in the way of design QA on screenshot reviews.
  devIndicators: false,
}

export default nextConfig
