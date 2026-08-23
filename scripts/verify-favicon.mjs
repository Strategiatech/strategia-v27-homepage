import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const canonicalPath = '/strategia-favicon.svg'
const canonicalFile = join(root, 'public', 'strategia-favicon.svg')
const compatibilitySvgFile = join(root, 'public', 'icon.svg')
const fallbackFile = join(root, 'public', 'favicon.ico')
const legacySvgFile = join(root, 'src', 'app', 'icon.svg')
const legacyIcoFile = join(root, 'src', 'app', 'favicon.ico')
const outputHtmlFile = join(root, 'out', 'index.html')

assert.ok(existsSync(canonicalFile), 'canonical SVG favicon is missing')
assert.ok(existsSync(compatibilitySvgFile), 'legacy SVG compatibility URL is missing')
assert.ok(existsSync(fallbackFile), 'ICO compatibility fallback is missing')
assert.ok(!existsSync(legacySvgFile), 'legacy file-based SVG favicon still exists')
assert.ok(!existsSync(legacyIcoFile), 'legacy file-based ICO favicon still exists')

const svg = readFileSync(canonicalFile, 'utf8')
const compatibilitySvg = readFileSync(compatibilitySvgFile, 'utf8')
assert.equal(compatibilitySvg, svg, 'legacy SVG compatibility URL must serve the canonical artwork')
assert.match(svg, /<circle\b[^>]*r="32"/, 'SVG must retain the circular background')
assert.match(svg, /#06293E/, 'SVG must retain the Abyss navy background')
assert.match(svg, /<feDropShadow\b/, 'SVG must retain the teal/cyan glow')

assert.ok(existsSync(outputHtmlFile), 'static output is missing; run the Pages build first')

const html = readFileSync(outputHtmlFile, 'utf8')
const iconLinks = html.match(/<link\b[^>]*\brel="icon"[^>]*>/g) ?? []

assert.equal(iconLinks.length, 1, `expected one primary favicon link, found ${iconLinks.length}`)
assert.match(iconLinks[0], new RegExp(`href="${canonicalPath}"`))
assert.match(iconLinks[0], /type="image\/svg\+xml"/)
assert.match(iconLinks[0], /sizes="any"/)
assert.ok(!iconLinks[0].includes('?'), 'canonical favicon URL must not contain a query string')

console.log(`Verified stable canonical favicon: ${canonicalPath}`)
