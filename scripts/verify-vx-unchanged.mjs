import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})
const page = await ctx.newPage()
page.on('pageerror', (e) => console.log('pageerror:', e.message))

await page.goto('http://localhost:4000/vx', { waitUntil: 'networkidle' })

// Confirm VX still has its full nav menu + outbound subpage links
const navLinks = await page.$$eval('nav.vx-nav a, nav.vx-nav .v25-nav-link', els =>
  els.map(e => ({ href: e.getAttribute('href'), text: e.textContent?.trim() })).filter(l => l.text)
)
console.log('VX nav links:', JSON.stringify(navLinks, null, 2))

const vxOutLinks = await page.$$eval('a[href^="/vx/"]', els =>
  els.map(e => ({ href: e.getAttribute('href'), text: e.textContent?.trim() }))
)
console.log('Total /vx/* outbound links on /vx:', vxOutLinks.length)

await ctx.close()
await browser.close()
