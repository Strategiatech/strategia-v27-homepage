/* Full-page section-by-section screenshots of /vx after the website
   re-write, so each PDF slide can be visually verified. */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

mkdirSync('./screenshots/vx-rewrite', { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce', // makes .v25-reveal show without scroll trigger
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

const url = 'http://localhost:4000/vx'
console.log(`Loading ${url}`)
await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
await page.waitForTimeout(2500)

// Hero locks the user behind a 120vh scroll spacer until the tetrahedron
// auto-lock animation completes (AUTO_LOCK_MS = 10s + a short settle).
// completeInteraction() calls scrollTo(0, 0) once, so we must wait for
// it to fire before our section-scroll loop, otherwise it resets the
// page mid-loop. Wait for the v25:complete event to land in real time.
await page.evaluate(
  () =>
    new Promise((resolve) => {
      if (document.querySelector('.v25--complete')) return resolve(undefined)
      window.addEventListener('v25:complete', () => resolve(undefined), { once: true })
    }),
)
await page.waitForTimeout(600)

// (Skipping the fullPage capture since it leaves scroll state unreliable
// for subsequent per-section screenshots. Captured at the very end.)

// Per-section captures
const sections = [
  { id: null, label: 'hero', name: '01-hero' },
  { id: 'industries', name: '02-industries' },
  { id: 'pillars', name: '03-pillars' },
  { id: 'v-agent', name: '04-v-agent' },
  { id: 'solutions', name: '05-solutions' },
  { id: 'modules', name: '06-modules' },
  { id: 'triangulate', name: '07-triangulate' },
  { id: 'science', name: '08-science' },
  { id: 'why-it-matters', name: '09-why-it-matters' },
  { id: 'process', name: '10-process' },
  { id: 'roi', name: '11-roi' },
  { id: 'security', name: '12-security' },
  { id: 'faqs', name: '13-faqs' },
  { id: 'demo', name: '14-cta' },
]

for (const s of sections) {
  let y = 0
  if (s.id === null) {
    y = 0
  } else {
    y = await page.evaluate((id) => {
      const el = document.getElementById(id)
      if (!el) return 0
      const r = el.getBoundingClientRect()
      return r.top + window.scrollY - 12 // tiny offset so nav doesn't cover heading
    }, s.id)
  }
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'auto' }), y)
  await page.waitForTimeout(800)
  const verifyY = await page.evaluate(() => Math.round(window.scrollY))
  await page.screenshot({ path: `./screenshots/vx-rewrite/${s.name}.png` })
  console.log(`  Saved ${s.name}.png  (target=${Math.round(y)} actual=${verifyY})`)
}

// Full page at the very end so per-section captures aren't affected.
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'auto' }))
await page.waitForTimeout(400)
await page.screenshot({
  path: './screenshots/vx-rewrite/00-full.png',
  fullPage: true,
})
console.log('Saved 00-full.png')

if (errors.length) {
  console.log(`\n${errors.length} errors:`)
  for (const e of errors) console.log(`  - ${e}`)
} else {
  console.log('\nNo console / network errors')
}

await browser.close()
