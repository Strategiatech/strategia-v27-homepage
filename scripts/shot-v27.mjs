import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const outDir = 'C:/Users/Aaron/AppData/Local/Temp/v27-shots'
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
})
const page = await ctx.newPage()
page.on('pageerror', (e) => console.log('pageerror:', e.message))
page.on('console', (msg) => {
  if (msg.type() === 'error') console.log('console.error:', msg.text())
})

await page.goto('http://localhost:4000/v27', { waitUntil: 'networkidle' })

await page.screenshot({ path: `${outDir}/v27-hero.png` })

// Modules section
const modules = await page.waitForSelector('section#modules', { timeout: 10000 })
await modules.scrollIntoViewIfNeeded()
await page.waitForTimeout(800)
await page.screenshot({ path: `${outDir}/v27-modules.png` })

// Triangulate
const tri = await page.waitForSelector('section.v25-triE', { timeout: 10000 })
await tri.scrollIntoViewIfNeeded()
await page.waitForTimeout(1500)
await page.screenshot({ path: `${outDir}/v27-triangulate.png` })

// Final CTA + footer
const cta = await page.waitForSelector('section#demo', { timeout: 10000 })
await cta.scrollIntoViewIfNeeded()
await page.waitForTimeout(800)
await page.screenshot({ path: `${outDir}/v27-cta.png` })

// Scroll to absolute bottom to capture footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(800)
await page.screenshot({ path: `${outDir}/v27-footer.png` })

// Confirm no /vx/* anchors exist on the page
const vxLinks = await page.$$eval('a[href^="/vx/"], a[href="/vx"]', (els) => els.map((e) => ({ href: e.getAttribute('href'), text: e.textContent?.trim() })))
console.log('vx links on /v27:', JSON.stringify(vxLinks, null, 2))

await ctx.close()
await browser.close()
console.log('done ->', outDir)
