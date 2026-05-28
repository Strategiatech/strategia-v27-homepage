import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
mkdirSync('./screenshots/vx-hero-concepts', { recursive: true })
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`) })
await page.goto('http://localhost:4000/vx-hero-concepts', { waitUntil: 'load', timeout: 60000 })
await page.waitForTimeout(4000)
for (const key of ['fade', 'split']) {
  const y = await page.evaluate((k) => {
    const el = document.querySelector(`.vx-concept--${k}`)
    return el ? el.getBoundingClientRect().top + window.scrollY : null
  }, key)
  if (y === null) { console.log(`MISSING .vx-concept--${key}`); continue }
  await page.evaluate((t) => window.scrollTo({ top: t, behavior: 'auto' }), y)
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `./screenshots/vx-hero-concepts/newvid-${key}.png` })
  console.log(`Saved newvid-${key}.png`)
}
if (errors.length) { console.log('ERRORS:'); errors.forEach(e => console.log('  ' + e)) } else console.log('No console/page errors')
await browser.close()
