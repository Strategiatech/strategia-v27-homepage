/* Zoom into the TOP of the diagonal in variants A and D to verify the
   teal stroke is flush with the clip edge (no gap). */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

mkdirSync('./screenshots/vx-hero-concepts', { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()

await page.goto('http://localhost:4000/vx-hero-concepts', { waitUntil: 'networkidle', timeout: 90000 })
await page.waitForTimeout(2000)

for (const key of ['rising-diag', 'falling-diag']) {
  const info = await page.evaluate((k) => {
    const el = document.querySelector(`.vx-concept--${k}`)
    const top = el.getBoundingClientRect().top + window.scrollY
    const cs = getComputedStyle(el)
    return { top, textRight: cs.getPropertyValue('--text-right'), stageH: cs.getPropertyValue('--stage-h') }
  }, key)
  await page.evaluate((t) => window.scrollTo({ top: t, behavior: 'auto' }), info.top)
  await page.waitForTimeout(500)
  console.log(`${key}: --text-right=${info.textRight} --stage-h=${info.stageH}`)
  // For A the diagonal meets the TOP edge to the right of text-right; for D it meets at text-right.
  await page.screenshot({
    path: `./screenshots/vx-hero-concepts/zoom-top-${key}.png`,
    clip: { x: 380, y: 60, width: 700, height: 360 },
  })
  console.log(`Saved zoom-top-${key}.png`)
}

await browser.close()
