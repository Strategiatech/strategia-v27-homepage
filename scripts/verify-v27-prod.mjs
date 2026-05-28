import { chromium } from 'playwright'

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

const url = 'https://strategiatech.refari.work/v27'
console.log('Loading', url)
const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
console.log('HTTP status:', resp.status())
await page.waitForTimeout(2500)
await page.evaluate(
  () =>
    new Promise((resolve) => {
      if (document.querySelector('.v25--complete')) return resolve(undefined)
      window.addEventListener('v25:complete', () => resolve(undefined), { once: true })
    }),
)
await page.waitForTimeout(600)

const checks = await page.evaluate(() => ({
  title: document.title,
  hero: document.querySelector('.v25-hero h1')?.textContent?.trim(),
  industriesPresent: !!document.getElementById('industries'),
  pillarsPresent: !!document.getElementById('pillars'),
  vAgentPresent: !!document.getElementById('v-agent'),
  whyItMattersPresent: !!document.getElementById('why-it-matters'),
  faqsPresent: !!document.getElementById('faqs'),
  securityPresent: !!document.getElementById('security'),
  moduleCount: document.querySelectorAll('.v25-module').length,
  faqCount: document.querySelectorAll('.vx-faq-item').length,
  navLabels: [...document.querySelectorAll('.v25-nav-link')].map((a) => a.textContent?.trim()),
}))
console.log(JSON.stringify(checks, null, 2))

await page.screenshot({ path: './screenshots/prod-v27-top.png' })
console.log('Saved prod-v27-top.png')

if (errors.length) {
  console.log(`\n${errors.length} errors:`)
  for (const e of errors) console.log(`  - ${e}`)
} else {
  console.log('\nNo console / network errors')
}
await browser.close()
