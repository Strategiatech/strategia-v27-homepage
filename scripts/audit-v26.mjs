import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})
const page = await ctx.newPage()
page.on('pageerror', (e) => console.log('pageerror:', e.message))

await page.goto('http://localhost:4000/v26', { waitUntil: 'networkidle' })

const vxLinks = await page.$$eval('a[href^="/vx/"], a[href="/vx"]', els =>
  els.map(e => ({ href: e.getAttribute('href'), text: e.textContent?.trim() }))
)
console.log('outbound /vx/* link count on /v26:', vxLinks.length)
console.log(JSON.stringify(vxLinks, null, 2))

await ctx.close()
await browser.close()
