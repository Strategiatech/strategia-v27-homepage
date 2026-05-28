/* Screenshot each variant on /vx-hero-concepts. Crops one hero's worth
   of viewport per shot so each concept reads at a glance. */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

mkdirSync('./screenshots/vx-hero-concepts', { recursive: true })

const browser = await chromium.launch()

const errors = []

const url = 'http://localhost:4000/vx-hero-concepts'

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

  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
  await page.waitForTimeout(2000) // let videos start

  // Full-page screenshot of the whole stack.
  await page.screenshot({
    path: `./screenshots/vx-hero-concepts/${label}-full.png`,
    fullPage: true,
  })

  // Per-variant screenshots by scrolling to each section.
  const variants = ['rising-diag', 'up-eq', 'right-eq', 'falling-diag']
  for (const key of variants) {
    const y = await page.evaluate((k) => {
      const el = document.querySelector(`.vx-concept--${k}`)
      if (!el) return 0
      const r = el.getBoundingClientRect()
      return r.top + window.scrollY
    }, key)
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'auto' }), y)
    await page.waitForTimeout(700)
    await page.screenshot({ path: `./screenshots/vx-hero-concepts/${label}-${key}.png` })
    console.log(`Saved ${label}-${key}.png`)
  }

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
