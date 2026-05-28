import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()

for (const path of ['/v25', '/vx']) {
  await page.goto(`http://localhost:4000${path}`, { waitUntil: 'networkidle' })
  const counts = await page.evaluate(() => ({
    triangulate: document.querySelectorAll('section.v25-triangulate').length,
    triB: document.querySelectorAll('section.v25-triB').length,
    triC: document.querySelectorAll('section.v25-triC').length,
    triD: document.querySelectorAll('section.v25-triD').length,
  }))
  console.log(path, counts)
}

await browser.close()
