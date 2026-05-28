import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
page.on('pageerror', (e) => console.log('pageerror:', e.message))

await page.goto('http://localhost:4000/v25', { waitUntil: 'networkidle' })

const vxLinks = await page.$$eval('a[href^="/vx/"]', els =>
  els.map(e => ({ href: e.getAttribute('href'), text: e.textContent?.trim() }))
)
console.log('/vx/* outbound links on /v25:', vxLinks.length)

await ctx.close()
await browser.close()
