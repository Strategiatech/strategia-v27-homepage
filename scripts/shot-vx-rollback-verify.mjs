/* Verify the /vx hero rollback: rotating tetrahedron restored,
   no video, no diagonal teal line. Desktop + mobile. */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

mkdirSync('./screenshots/vx-rollback-verify', { recursive: true })

const browser = await chromium.launch()
const errors = []

async function shoot(width, height, label) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()
  page.on('pageerror', (err) => errors.push(`[${label}] pageerror: ${err.message}`))
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[${label}] console.error: ${msg.text()}`)
  })
  page.on('response', (resp) => {
    if (resp.status() >= 500) errors.push(`[${label}] HTTP ${resp.status()}: ${resp.url()}`)
  })

  await page.goto('http://localhost:4000/vx', { waitUntil: 'networkidle', timeout: 90000 })
  // Let the tetrahedron build/rotate settle
  await page.waitForTimeout(3500)
  const hasVideo = await page.locator('.vx-hero-video').count()
  const hasTetra = await page.locator('#v25Tetra').count()
  console.log(`[${label}] vx-hero-video els: ${hasVideo}  |  #v25Tetra els: ${hasTetra}`)
  await page.screenshot({ path: `./screenshots/vx-rollback-verify/${label}.png` })
  console.log(`Saved ${label}.png`)
  await ctx.close()
}

await shoot(1440, 900, 'desktop-1440')
await shoot(390, 844, 'mobile-390')

if (errors.length) {
  console.log(`\n${errors.length} errors:`)
  for (const e of errors) console.log(`  - ${e}`)
} else {
  console.log('\nNo console / network errors')
}

await browser.close()
