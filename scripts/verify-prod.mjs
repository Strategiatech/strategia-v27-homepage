import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
const url = 'https://strategiatech.refari.work/brand-assets'
console.log('Loading', url)
const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
console.log('HTTP status:', resp.status())
await page.waitForTimeout(1500)

const title = await page.title()
const h1 = await page.$eval('h1', el => el.textContent).catch(e => `H1 error: ${e.message}`)
const aboutHeading = await page.$eval('#about h2', el => el.textContent).catch(() => null)
const sigCards = await page.$$eval('.ba-sig-card', els => els.length).catch(() => 0)
console.log('Title:', title)
console.log('H1:', h1)
console.log('About heading:', aboutHeading)
console.log('Signature cards on page:', sigCards)

await page.screenshot({ path: './screenshots/prod-brand-assets.png', fullPage: true })
console.log('Saved prod-brand-assets.png')
await browser.close()
