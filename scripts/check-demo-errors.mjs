import { chromium } from 'playwright'

const url = 'http://localhost:4000/demo'
const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
})
const page = await ctx.newPage()

const consoleMsgs = []
const pageErrors = []
const failedRequests = []

page.on('console', (msg) => {
  consoleMsgs.push({ type: msg.type(), text: msg.text() })
})
page.on('pageerror', (err) => {
  pageErrors.push({ message: err.message, stack: err.stack })
})
page.on('requestfailed', (req) => {
  failedRequests.push({ url: req.url(), failure: req.failure()?.errorText })
})
page.on('response', (res) => {
  if (res.status() >= 400) {
    failedRequests.push({ url: res.url(), status: res.status() })
  }
})

await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

// Look for the Next.js dev indicator / error overlay
const overlay = await page.evaluate(() => {
  const portal = document.querySelector('nextjs-portal')
  const indicators = Array.from(document.querySelectorAll('[data-nextjs-toast], [data-nextjs-dialog], [data-nextjs-build-indicator]'))
  const bodyText = document.body.innerText.slice(0, 500)
  return {
    portalExists: Boolean(portal),
    portalHTML: portal ? portal.outerHTML.slice(0, 2000) : null,
    indicatorElems: indicators.map((el) => ({
      tag: el.tagName,
      data: el.outerHTML.slice(0, 400),
    })),
    bodyTextPreview: bodyText,
  }
})

console.log('--- console messages ---')
console.log(JSON.stringify(consoleMsgs, null, 2))
console.log('--- page errors ---')
console.log(JSON.stringify(pageErrors, null, 2))
console.log('--- failed requests ---')
console.log(JSON.stringify(failedRequests, null, 2))
console.log('--- next overlay ---')
console.log(JSON.stringify(overlay, null, 2))

await page.screenshot({
  path: 'C:/Users/Aaron/AppData/Local/Temp/demo-shots/error-overlay.png',
  fullPage: false,
})

await browser.close()
