import { chromium } from 'playwright'
import { mkdirSync } from 'fs'

const outDir = 'C:/Users/Aaron/AppData/Local/Temp/page-nav-shots'
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1.5 })
const page = await ctx.newPage()

await page.goto('http://localhost:4000/v25', { waitUntil: 'networkidle' })

// Open the page-nav drawer
await page.click('.pnav-toggle')
await page.waitForTimeout(400)

// Closed accordion
await page.screenshot({ path: `${outDir}/nav-closed-accordion.png`, fullPage: false })

// Open the early-versions accordion
await page.click('.pnav-accordion')
await page.waitForTimeout(400)
await page.screenshot({ path: `${outDir}/nav-open-accordion.png`, fullPage: false })

console.log('wrote', outDir)
await browser.close()
