import { chromium } from 'playwright'

const url = 'http://localhost:4000/v25'
const out = 'C:/Users/Aaron/AppData/Local/Temp/v25-shots/v25-converge-only.png'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()
await page.goto(url, { waitUntil: 'networkidle' })

const cards = await page.waitForSelector('.v25-tri-signals')
const result = await page.waitForSelector('.v25-tri-result')
const cardsBox = await cards.boundingBox()
await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.max(0, cardsBox.y - 100))
await page.waitForTimeout(800)

const c = await cards.boundingBox()
const r = await result.boundingBox()
const top = c.y + c.height - 6
const height = r.y - top + 4

await page.screenshot({
  path: out,
  clip: { x: c.x - 8, y: top, width: c.width + 16, height }
})
console.log('wrote', out, 'clip=', { x: c.x - 8, y: top, width: c.width + 16, height })
await browser.close()
