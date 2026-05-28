import { chromium } from 'playwright'

const url = process.argv[2] || 'http://localhost:4000/v25'
const sel = process.argv[3] || '.v25-tri-converge'
const out = process.argv[4] || 'C:/Users/Aaron/AppData/Local/Temp/v25-shots/v25-tree-svg-1x.png'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()
await page.goto(url, { waitUntil: 'networkidle' })
const el = await page.waitForSelector(sel, { timeout: 10000 })
const box = await el.boundingBox()
await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.max(0, box.y - 40))
await page.waitForTimeout(1000)
await el.screenshot({ path: out })
console.log('wrote', out, 'box=', box)
await browser.close()
