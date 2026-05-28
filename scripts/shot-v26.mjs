import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

mkdirSync('./screenshots/v26', { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
})
const page = await ctx.newPage()

const errors = []
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`)
})
page.on('response', (resp) => {
  if (resp.status() >= 500) errors.push(`HTTP ${resp.status()}: ${resp.url()}`)
})

await page.goto('http://localhost:4000/v26', { waitUntil: 'networkidle', timeout: 90000 })
await page.waitForTimeout(2500)
await page.evaluate(
  () =>
    new Promise((resolve) => {
      if (document.querySelector('.v25--complete')) return resolve(undefined)
      window.addEventListener('v25:complete', () => resolve(undefined), { once: true })
    }),
)
await page.waitForTimeout(600)

await page.screenshot({ path: './screenshots/v26/top.png' })
console.log('Saved top.png')

const sections = ['modules', 'science', 'solutions', 'enterprise', 'process', 'roi', 'demo']
for (const id of sections) {
  const y = await page.evaluate((sid) => {
    const el = document.getElementById(sid)
    if (!el) return -1
    const r = el.getBoundingClientRect()
    return r.top + window.scrollY - 12
  }, id)
  if (y < 0) {
    console.log(`  ${id}: NOT FOUND`)
    continue
  }
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'auto' }), y)
  await page.waitForTimeout(400)
  await page.screenshot({ path: `./screenshots/v26/${id}.png` })
  console.log(`  Saved ${id}.png (scrollY=${Math.round(y)})`)
}

// Full page at end
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'auto' }))
await page.waitForTimeout(300)
await page.screenshot({ path: './screenshots/v26/full.png', fullPage: true })
console.log('Saved full.png')

if (errors.length) {
  console.log(`\n${errors.length} errors:`)
  for (const e of errors) console.log(`  - ${e}`)
} else {
  console.log('\nNo console / network errors')
}
await browser.close()
