import { chromium } from 'playwright'

const url = 'http://localhost:4000/v25'
const out = 'C:/Users/Aaron/AppData/Local/Temp/v25-shots/v25-converge-area.png'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()
await page.goto(url, { waitUntil: 'networkidle' })

const cards = await page.waitForSelector('.v25-tri-signals')
const result = await page.waitForSelector('.v25-tri-result')
const cardsBox = await cards.boundingBox()
const resultBox = await result.boundingBox()

const x = cardsBox.x
const y = cardsBox.y + cardsBox.height - 20
const w = cardsBox.width
const h = (resultBox.y + 80) - y

await page.evaluate(({ scrollY }) => window.scrollTo({ top: scrollY, behavior: 'instant' }), { scrollY: Math.max(0, y - 80) })
await page.waitForTimeout(800)

const newCards = await cards.boundingBox()
const newResult = await result.boundingBox()
const cy = newCards.y + newCards.height - 20
const ch = (newResult.y + 80) - cy

await page.screenshot({
  path: out,
  clip: { x: newCards.x, y: cy, width: newCards.width, height: ch }
})
console.log('wrote', out)
await browser.close()
