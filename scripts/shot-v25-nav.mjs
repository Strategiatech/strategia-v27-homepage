import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 })
const page = await ctx.newPage()
await page.goto('http://localhost:4000/v25', { waitUntil: 'networkidle' })

// Scroll a bit so the nav transitions to scrolled state, sitting over the dark hero/dark sections
await page.evaluate(() => window.scrollTo({ top: 600 }))
await page.waitForTimeout(1500)
await page.screenshot({ path: 'C:/Users/Aaron/AppData/Local/Temp/v25-shots/v25-nav-dark.png', clip: { x: 0, y: 0, width: 1440, height: 110 } })

// Now to the Triangulate section
const tri = await page.waitForSelector('.v25-triangulate')
const triBox = await tri.boundingBox()
await page.evaluate((y) => window.scrollTo({ top: y }), triBox.y + 100)
await page.waitForTimeout(1500)

// Read computed style for diagnostics
const bg = await page.evaluate(() => {
  const nav = document.querySelector('.v25-nav')
  const cs = nav ? window.getComputedStyle(nav) : null
  return cs ? { bg: cs.background, bgColor: cs.backgroundColor, hasScrolled: nav.classList.contains('scrolled') } : null
})
console.log('nav state over light section:', bg)

await page.screenshot({ path: 'C:/Users/Aaron/AppData/Local/Temp/v25-shots/v25-nav-light.png', clip: { x: 0, y: 0, width: 1440, height: 110 } })
console.log('wrote nav-dark + nav-light')
await browser.close()
