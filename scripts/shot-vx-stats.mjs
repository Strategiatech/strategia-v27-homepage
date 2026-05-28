import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
})
const page = await ctx.newPage()
await page.goto('http://localhost:4000/vx', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
await page.evaluate(
  () =>
    new Promise((resolve) => {
      if (document.querySelector('.v25--complete')) return resolve(undefined)
      window.addEventListener('v25:complete', () => resolve(undefined), { once: true })
    }),
)
await page.waitForTimeout(600)

const y = await page.evaluate(() => {
  const el = document.querySelector('.vx-stats-grid-4')
  if (!el) return 0
  const r = el.getBoundingClientRect()
  return r.top + window.scrollY - 80
})

await page.evaluate((top) => window.scrollTo({ top, behavior: 'auto' }), y)
await page.waitForTimeout(500)
await page.screenshot({ path: './screenshots/vx-rewrite/stats-fixed.png' })
console.log(`Saved stats-fixed.png (scrollY=${y})`)

await browser.close()
