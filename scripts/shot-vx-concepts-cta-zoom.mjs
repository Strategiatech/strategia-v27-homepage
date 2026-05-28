/* Zoom into the CTA row of one concept variant to confirm badge placement. */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

mkdirSync('./screenshots/vx-hero-concepts', { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()

await page.goto('http://localhost:4000/vx-hero-concepts', { waitUntil: 'networkidle', timeout: 90000 })
await page.waitForTimeout(1500)

// Scroll the second variant (B) into view, then crop its actions area.
const y = await page.evaluate(() => {
  const el = document.querySelector('.vx-concept--up-eq')
  return el.getBoundingClientRect().top + window.scrollY
})
await page.evaluate((top) => window.scrollTo({ top, behavior: 'auto' }), y)
await page.waitForTimeout(500)

const box = await page.evaluate(() => {
  const el = document.querySelector('.vx-concept--up-eq .v25-hero-actions')
  const r = el.getBoundingClientRect()
  return { x: r.x - 40, y: r.y - 40, width: r.width + 80, height: r.height + 80 }
})

await page.screenshot({
  path: './screenshots/vx-hero-concepts/zoom-cta-badge.png',
  clip: box,
})
console.log('Saved zoom-cta-badge.png', box)

await browser.close()
