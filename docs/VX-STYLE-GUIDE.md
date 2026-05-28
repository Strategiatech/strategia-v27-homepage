# VX Style Guide

This is the source-of-truth document for the 16 new pages being built under `/vx/*` as part of the Strategia Tech site rebuild. The canonical homepage and visual style lives at `src/app/(frontend)/v25/page.tsx`. **Do not modify V25.** Sub-pages compose new content using V25's existing `.v25-*` class system, scoped by wrapping every page in `<div className="v25">…</div>`.

> If a pattern is not in this doc, builders will not use it. The doc is meant to be exhaustive and copy-pasteable. Cross-references to V25 use line numbers (e.g. `v25/page.tsx:160-173`).

---

## Table of contents

1. [The wrapper convention](#1-the-wrapper-convention)
2. [Design tokens](#2-design-tokens)
3. [Typography](#3-typography)
4. [Layout primitives](#4-layout-primitives)
5. [Component catalogue](#5-component-catalogue)
6. [Motion and reveal](#6-motion-and-reveal)
7. [Sub-page navigation (`VxNav` spec)](#7-sub-page-navigation-vxnav-spec)
8. [Copy voice and content rules](#8-copy-voice-and-content-rules)
9. [TypeScript discipline](#9-typescript-discipline)
10. [Page scaffold template](#10-page-scaffold-template)
11. [Common pitfalls](#11-common-pitfalls)

---

## 1. The wrapper convention

Every VX sub-page's root element is `<div className="v25">…</div>`. Reason: `src/app/(frontend)/v25/v25.css` scopes the entire design system to `.v25` (tokens, gradient background, typography defaults, all `.v25-*` component rules). Putting that class on a page root inherits the whole system without re-implementing it.

**v25.css is loaded by importing it from a component that renders on the page.** V25's own page does this at the top of `v25/page.tsx`:

```tsx
import './v25.css'
```

Because VX sub-pages do not import V25's `page.tsx`, **each VX page (or the `/vx/layout.tsx`) must import `v25.css` itself.** The recommended pattern is to put one import at the `/vx` route group's layout so every sub-page inherits it:

```
src/app/(frontend)/vx/layout.tsx       <-- imports '../v25/v25.css' once
src/app/(frontend)/vx/page.tsx         <-- /vx index
src/app/(frontend)/vx/platform/page.tsx
src/app/(frontend)/vx/science/page.tsx
...
```

If the layout-level import is not feasible, each `page.tsx` should `import '../../v25/v25.css'` (adjust depth) once. **Do not duplicate or fork the CSS.** v25.css is the design system. We are reusing it verbatim.

Minimal sub-page scaffold (see [section 10](#10-page-scaffold-template) for the full template):

```tsx
'use client'

import { useEffect } from 'react'
import VxNav from '@/components/vx/VxNav'
import '../../v25/v25.css'        // load V25 design system

export default function Page() {
  // IntersectionObserver to power .v25-reveal scroll-in (see section 6)
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.v25-reveal')
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="v25 v25--complete">
      <VxNav />

      {/* page sections go here */}

    </div>
  )
}
```

### Why `v25--complete` is required on sub-pages

V25's homepage starts with the tetrahedron hero pinned `position: fixed` and unpins itself by appending the `v25--complete` modifier on the wrapping `<div>` after the hero animation finishes (see `v25/page.tsx:127-128` and `v25.css:231-239`). Sub-pages do not render the tetrahedron hero, so they must apply `v25--complete` **from the start** to keep page layout in normal flow. Forgetting this will cause your hero / content to disappear behind a fixed-position void.

### What sub-pages do NOT render

The following V25 elements are tetrahedron-specific and **must be omitted** from sub-pages:

- `<div className="v25-pulse-overlay" />`
- `<div className="v25-cursor-aura" />`
- `<div className="v25-plasma-layer" />`
- `<div className="v25-tetra-stage" id="v25Stage">…</div>` (the SVG + brand lockup)
- `<div className="v25-scroll-spacer" />`
- The `initTetrahedron()` import and `useEffect` invoking it
- The `v25:complete` event listener and `complete` state

Sub-pages start with `VxNav` and go straight into content. The background gradient (radial + linear, fixed attachment) painted by the `.v25` class itself carries the visual continuity.

### What about the site-wide PageNav?

`src/components/PageNav.tsx` is the dev-time version switcher rendered by `src/app/(frontend)/layout.tsx`. It is a floating slide-out for navigating between V1 through V25 and brand-guide pages. It is **unrelated** to the in-page nav. Leave it alone. **Do not add VX routes to `PageNav.tsx`.**

---

## 2. Design tokens

All tokens are CSS custom properties. They are scoped to the `.v25` class (see `v25.css:33-92`), so they only resolve inside the wrapper. Use them via `var(--v25-…)`. Tokens defined in `src/app/globals.css` (`--font-display`, `--font-inter-tight`, `--font-mono`, etc.) are global and available anywhere.

### Brand colours (palette)

| Token | Value | Use |
|---|---|---|
| `--v25-abyss` | `#012236` | Brand "Abyss" — deepest navy. Body background base, light-section body text. |
| `--v25-cobalt` | `#005072` | Brand "Cobalt" — deep accent, deep-band gradient stop, navy accents on light surfaces. |
| `--v25-sky` | `#5CC8E8` | Sky-blue accent on dark surfaces (default `.v25-h2 .accent`). |
| `--v25-accent` | `#00C6C1` | Brand "Teal" — primary highlight on dark surfaces. |
| `--v25-accent-text` | `#A5DCD0` | Lighter teal — use anywhere teal is **small text** (CTAs, verdict pills, slider values). Clears 5.4:1 on every V25 surface. Brand teal alone fails AA at small sizes on card surfaces. |
| `--v25-lime` | `#A1E2B7` | Brand "Lime" — secondary highlight on dark surfaces. |
| `--v25-navy` | `#012236` | Alias of Abyss. |
| `--glow-color` | `#00C6C1` | Tetrahedron halo (sub-pages won't use it). |

There is no `.v25` global black token — use `#1C1C1C` if you need black (per the brand guide), or just `var(--v25-abyss)`.

### Cobalt-tinted light-surface accents (NOT CSS variables — copy hex)

Brand Teal and Lime fail WCAG AA on `#ECEDEB`/`#FFFFFF` light backgrounds. When a brand accent must appear on a light surface, swap in its Cobalt-tinted complement (these are hardcoded in `v25.css:1684-1719`):

| Brand colour (dark surface) | Cobalt-tinted (light surface) |
|---|---|
| Sky `#5CC8E8` | Cobalt `#005072` |
| Teal `#00C6C1` | Cobalt-tinted Teal `#006D6A` |
| Lime `#A1E2B7` | Cobalt-tinted Lime `#1F6A47` |
| Cobalt at full strength | Cobalt-tinted Cobalt `#003D6B` |

`.v25-section--light` flips all the brand-accent rules to these darker variants automatically, **but** if you write inline styles or new selectors that target accents in a light section, use these hex values directly.

### Text alphas (white-on-dark, AA-pass)

The V22 contrast pass raised every weak alpha so it clears AA on the clamped gradient endpoint (`#006A93`). Use these for new copy:

| Token | Value | Use | Contrast notes |
|---|---|---|---|
| `--v25-primary` | `#FFFFFF` | Body text, headings on dark surfaces. | Baseline. |
| `--v25-muted` | `rgba(255,255,255,0.88)` | Strong secondary copy (labels). | High-emphasis non-white. |
| `--v25-subtle` | `rgba(255,255,255,0.65)` | All eyebrows, monos, captions, sub-text, ghost links. | 4.82:1 on `#006A93` (V22-C2). |
| (inline) | `rgba(255,255,255,0.72)` | `.v25-desc` body paragraphs. | Slightly higher than subtle. |
| (inline) | `rgba(255,255,255,0.82)` | Hero `<p>` and badge items. | High-emphasis description text. |

Never use alphas below `0.65` for white text. Below that you re-introduce the V21 AA failures.

### Text alphas (dark-on-light, AA-pass)

Used inside `.v25-section--light`. All are `rgba(1, 34, 54, X)` (Abyss with alpha):

| Alpha | Use |
|---|---|
| `1.0` (use `var(--v25-abyss)`) | Body text, titles, scores. |
| `0.72` | Body paragraphs, descriptions. |
| `0.70` | Eyebrows, outline button text. |
| `0.65` | Secondary labels, module-phase descriptions. |
| `0.60` | Module-num/tag, signal-kind. |
| `0.55` | Quietest meta (tri-result-footer, weighting meta, board sep). |

### Surfaces and lines (dark)

| Token | Value | Use |
|---|---|---|
| `--v25-bg` | `rgba(0,25,46,0.12)` | (Unused in V25 page itself; available.) |
| `--v25-surface` | `rgba(255,255,255,0.06)` | Mid-tier glass surface. |
| `--v25-elevated` | `rgba(255,255,255,0.10)` | Elevated glass surface. |
| `--v25-line` | `rgba(255,255,255,0.12)` | Default card/panel border. |
| `--v25-line-strong` | `rgba(255,255,255,0.22)` | Emphasised border. |

In practice, V25 inlines `rgba(255,255,255,0.10)` for card borders and `rgba(255,255,255,0.04)` for card fills more often than it uses the tokens. Either is fine; the tokens are equivalent.

### Misc

| Token | Value | Use |
|---|---|---|
| `--tetra-size` | `clamp(380px, 55vw, 740px)` | Tetrahedron stage size. Sub-pages won't use. |
| `--v25-accent-warm` | `rgba(0,198,193,0.9)` | Teal at 90%. |
| `--v25-accent-lime` | `rgba(0,198,193,0.75)` | (Legacy name. It's teal at 75%, not actual lime — name kept for backward compat.) |

### Page background recipe (verbatim)

The `.v25` block applies this background. Sub-pages inherit it for free. Documented here in case a builder needs to recreate a panel-level gradient (e.g. a hero, an Enterprise wrap, etc.):

```css
background:
  radial-gradient(ellipse at 75% -5%, rgba(92, 200, 232,0.18) 0%, transparent 55%),
  radial-gradient(ellipse at 95% 25%, rgba(0, 198, 193,0.22) 0%, transparent 50%),
  radial-gradient(ellipse at 12% 18%, rgba(0,61,107,0.30) 0%, transparent 48%),
  radial-gradient(ellipse at 10% 55%, rgba(0,25,46,0.30) 0%, transparent 45%),
  radial-gradient(ellipse at 65% 70%, rgba(0,90,140,0.22) 0%, transparent 50%),
  radial-gradient(ellipse at 30% 95%, rgba(0, 198, 193,0.16) 0%, transparent 50%),
  linear-gradient(135deg, #1C1C1C 0%, #00162E 22%, #003D6B 48%, #005072 76%, #006A93 100%);
background-attachment: fixed;
```

The linear endpoint is **clamped at `#006A93`** to keep white body text AA-compliant in the bottom-right of a fixed-attachment viewport. Do not raise it.

### Light-band backgrounds

`.v25-section--light` paints `background: #ECEDEB` (brand Cloud). This is the only sanctioned light-section colour. Use white (`#FFFFFF`) **inside** light sections for card surfaces (modules, stat cards, signal cards). Never invent additional light shades.

### Per-section radial tints (dark sections only)

V25 attaches a subtle radial gradient to each anchored section via `::before` (`v25.css:458-492`) so the dark stretch doesn't read as one wall of blue. Reuse these `id`s if your sub-page has corresponding sections — the rules trigger off the id:

- `#modules` — dark cool wash, top-right + bottom-left
- `#science` — teal/blue radial mix
- `#solutions` — sky-tinted top-right, dark bottom-left
- `#process` — single soft navy radial
- `#roi` — teal top-right, blue bottom-left

If your sub-page invents a new dark-section id, the page will look slightly flatter than V25. That is acceptable; if you want the depth, copy a relevant `::before` rule with your own id under your page-specific CSS (or just reuse one of the existing ids when the content lines up).

---

## 3. Typography

### Font families (already loaded)

The frontend root layout (`src/app/(frontend)/layout.tsx`) loads these via `next/font/google` and exposes them as CSS variables on `<html>`. They are available globally; you do not need to import anything per page.

| CSS var | Font | Used for |
|---|---|---|
| `--font-inter` (alias `--font-sans`) | Inter | Default body sans. |
| `--font-inter-tight` (alias `--font-tight`) | Inter Tight | Subheads, module titles, mid-weight UI labels. |
| `--font-literata` (alias `--font-display`) | Literata | Headlines (h1, h2, large display numerals). |
| `--font-mono` (alias `--font-monospace`) | JetBrains Mono | Eyebrows, module-num/tag, monospaced meta, footer h5. |
| `--font-fraunces` | Fraunces | (Loaded but unused by V25. Available if needed.) |

V25 deliberately uses Literata for h1 and h2 (V23 change — see comments at `v25.css:248-250` and `v25.css:516-518`). This matches the brand-guide rule. Inter Tight is reserved for the smaller h3-class titles (module titles, phase names, process-step titles). Inter is the body.

### Heading scale (dark surfaces — flip colours per [section 2](#text-alphas-dark-on-light-aa-pass) for light)

**h1 (hero)** — `v25.css:246-256`

```css
font-family: var(--font-display, 'Literata', Georgia, serif);
font-size: clamp(2.5rem, 6.4vw, 5.6rem);
font-weight: 400;
line-height: 0.98;
letter-spacing: -0.025em;
color: #ffffff;
```

Use line-break tags (`<br />`) to control rag in display headlines. See `v25/page.tsx:161`.

**h2 (`.v25-h2`)** — `v25.css:515-527`

```css
font-family: var(--font-display, 'Literata', Georgia, serif);
font-size: clamp(1.75rem, 3.4vw, 2.75rem);
font-weight: 400;
line-height: 1.1;
letter-spacing: -0.02em;
color: #ffffff;
margin: 0 0 20px;
max-width: 28ch;
text-wrap: balance;
```

Use the accent span pattern inside h2: a phrase reads in colour, the rest stays white:

```tsx
<h2 className="v25-h2">
  Three signals. <span className="accent accent--lime">One score.</span>
</h2>
```

Accent modifiers: `.accent` (defaults to sky), `.accent--sky` (`#5CC8E8`), `.accent--teal` (`#00C6C1`), `.accent--lime` (`#A1E2B7`). Rotate them across adjacent sections so each headline reads as its own pop (V23 deliberate variety).

A muted tail span: `<span className="muted">Not retrofitted retail norms.</span>` renders at `rgba(255,255,255,0.65)` for a deliberate de-emphasis (`v25.css:528`). Use sparingly.

**h3 (module-tier titles)** — there is no single `.v25-h3` rule. The patterns are:

- `.v25-module-title` (18px, Inter Tight, 600, `letter-spacing: -0.01em`)
- `.v25-solution-title` (`clamp(1.25rem, 2vw, 1.5rem)`, Literata implicit via globals, 400)
- `.v25-tri-signal-name` (18px, sans, 500)
- `.v25-process-step-title` (16px, sans, 500)
- Variant B/C/D process titles are Literata 22-24px (see Variants section).

If you need a new h3 inside a content section, prefer reusing `.v25-module-title` for sans 18/600 or `.v25-solution-title` for serif 1.25-1.5rem display.

**h4-h6** — V25 does not define them at the `.v25-*` scope. They inherit from `globals.css` (Inter Tight, navy on white). Inside `.v25` the colour will be wrong; if you need an h4/h5/h6, set `color: #ffffff` (or `color: var(--v25-abyss)` in light sections) explicitly.

### Eyebrow / kicker (`.v25-eyebrow`) — `v25.css:504-514`

```css
font-family: var(--font-mono, 'JetBrains Mono', monospace);
font-size: 11px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.14em;
color: rgba(255, 255, 255, 0.65);
margin-bottom: 20px;
```

```tsx
<div className="v25-eyebrow">The Platform &middot; 08 V-modules</div>
```

Use `&middot;` (`·`) as the separator inside eyebrows. **Never an em or en dash.**

### Body sizes

| Class / context | Size | Line-height | Colour |
|---|---|---|---|
| Hero `<p>` | `clamp(1.1rem, 1.5vw, 1.25rem)` | 1.6 | `rgba(255,255,255,0.82)` |
| `.v25-desc` | 16px | 1.7 | `rgba(255,255,255,0.72)` |
| Module/solution body | 14px | 1.6 | `rgba(255,255,255,0.65)` |
| Module-phase-desc | 12px | 1.55 | `rgba(255,255,255,0.65)` |
| Footer body | 14px | 1.65 | `rgba(255,255,255,0.65)` |

### Mono / code / version strings

JetBrains Mono at 10-12px, uppercase, `letter-spacing: 0.14em`. Used for: eyebrows, module-num, module-tag, footer h5, footer-bottom-left version line, badge labels, evidence tags.

```tsx
<div className="v25-footer-version">Strategia Intelligence Engine v2.1 · Live</div>
```

### Deviation from the brand-guide type rule

The brand guide states: "Headlines: Literata Regular (serif). Subheads: Inter Tight (sans-serif). Body: Inter (sans-serif)." V25 follows this. The only "deviation" is granular: V25 uses **JetBrains Mono** for eyebrows and meta where the brand guide does not explicitly speak to monospace usage. Treat JetBrains Mono as the sanctioned meta/label face. The brand-guide rule still wins for headline/subhead/body.

---

## 4. Layout primitives

### Section padding (`.v25-section`) — `v25.css:449-453`

```css
padding: clamp(96px, 14vw, 180px) clamp(1.5rem, 6vw, 6rem);
position: relative;
z-index: 1;
```

Every full-width content section is a `<section className="v25-section">` (or `v25-section v25-section--light`). The padding clamp is **the** vertical rhythm of the site — do not override.

### Content max width (`.v25-section-inner`) — `v25.css:496-499`

```css
max-width: 1140px;
margin: 0 auto;
```

Always wrap section contents in `<div className="v25-section-inner">` (and add `v25-reveal` to the inner div to get the scroll-in animation). The `v25-section > .v25-section-inner` rule re-asserts `z-index: 1; position: relative;` so content sits above any `::before` radial tints.

```tsx
<section className="v25-section" id="science">
  <div className="v25-section-inner v25-reveal">
    {/* content */}
  </div>
</section>
```

### Section-level variants

| Modifier | What it does |
|---|---|
| `.v25-section--light` | Switches background to `#ECEDEB`, flips all text/border/accent rules to dark-on-light. Use it on `<section>` itself, not the inner. |
| `.v25-section--center` | Centres `.v25-h2` and `.v25-desc` inside the section. |

### Triangulate panel (`.v25-triangulate`) — special

The Triangulate section is a single inset card rather than full-bleed content; padding/border-radius/background live on `.v25-triangulate-inner` (`v25.css:759-775`). If you reuse this pattern (an inset "showcase" card), use:

```css
max-width: 1180px;
border: 1px solid rgba(255, 255, 255, 0.10);
border-radius: 28px;
background:
  linear-gradient(115deg, rgba(0, 25, 46, 0.32) 0%, rgba(0, 61, 107, 0.18) 55%, rgba(0, 198, 193, 0.14) 100%),
  rgba(255, 255, 255, 0.04);
backdrop-filter: blur(16px);
padding: clamp(32px, 5vw, 56px);
```

### Stats row (`.v25-stats`) — narrower vertical padding

```css
padding: 48px clamp(1.5rem, 6vw, 6rem);
```

This is intentionally shallow — the stats row sits directly under the hero and breathes via its top neighbour.

### Section-header pattern — `v25.css:552-558`

```css
display: flex;
align-items: flex-end;
justify-content: space-between;
gap: 32px;
margin-bottom: 48px;
```

A header places the eyebrow + h2 on the left and a `.v25-link-arrow` (or `.v25-hero-actions` group) on the right.

```tsx
<div className="v25-section-header">
  <div>
    <div className="v25-eyebrow">The Platform &middot; 08 V-modules</div>
    <h2 className="v25-h2">Eight modules. <span className="accent accent--teal">One hire-and-retain loop.</span></h2>
  </div>
  <a href="#platform" className="v25-link-arrow">
    All modules<span aria-hidden="true"> ↗</span>
  </a>
</div>
```

At <=860px it stacks: header goes column, items align flex-start (`v25.css:2272`).

### Grids used in V25

| Pattern | Class(es) | Columns | Gap |
|---|---|---|---|
| Stats row | `.v25-stats-grid` | 3 | 1px (acts as divider via background) |
| Science stats | `.v25-science-grid` | 3 | 1px divider |
| Module phase row | `.v25-modules-phased` then `.v25-module-phase` | 180px sticky header + 1fr cards / cards grid 3 cols inside | 32px outer, 16px inner |
| Solutions | `.v25-solutions-grid` | 2 | 1px divider, 24px border-radius |
| Enterprise content | `.v25-enterprise-content` | 1 then 1fr 1fr at 768px+ | 40px |
| Badges | `.v25-badges-grid` | 2 | 1px divider |
| Process steps (A) | `.v25-process-steps` | 5 | 16px |
| ROI grid | `.v25-roi-grid` | 1fr 1fr | 72px |
| Footer top | `.v25-footer-top` | 1.6fr repeat(4, 1fr) | 48px |

At 1100px max-width: process steps collapse to 3 cols (line hides), modules-grid to 2 cols.
At 860px: most multi-col grids collapse to 1 col, nav links hide, hero stacks (image first).
At 600px: footer-top single column, badges single column.

### Common container measurements

- Section max-width: **1140px**
- Triangulate inset max-width: **1180px**
- CTA wrap max-width: **1140px**
- Footer inner max-width: **1140px**
- Nav (no max — full-width with `padding: 0 clamp(1.5rem, 6vw, 6rem)`)

---

## 5. Component catalogue

For each component, the JSX is shown as it appears in V25. Copy then adapt — do not invent new class names where an existing one fits.

### 5.1 Nav bar (`.v25-nav`)

V25's nav is an anchor-link nav for in-page sections. Sub-pages use a parallel component, `VxNav`, that mirrors the styling but uses Next.js routes. See [section 7](#7-sub-page-navigation-vxnav-spec) for the spec. The visual definition of the nav (which `VxNav` mirrors) is at `v25.css:109-201` and the markup is at `v25/page.tsx:134-151`.

Behaviours implemented in `v25/page.tsx:100-107`:

- The nav is `position: fixed; top: 0`; height 72px; padding `0 clamp(1.5rem, 6vw, 6rem)`.
- When `window.scrollY > 40` the script appends `.scrolled` to the nav element, which (a) paints the bar solid `var(--v25-abyss)` with a 1px white-alpha bottom edge + soft shadow, and (b) fades in the triangle wireframe icon next to the wordmark.

```tsx
<nav className="v25-nav" ref={navRef}>
  <a href="/v25" className="v25-nav-logo">
    <svg className="v25-nav-mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 4L36 34H4L20 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
    </svg>
    <img src="/images/brand/strategia-wordmark-white.svg" alt="Strategia" />
  </a>
  <ul className="v25-nav-links">
    <li><a href="#platform" className="v25-nav-link">Platform</a></li>
    {/* …more links… */}
  </ul>
  <a href="#demo" className="v25-nav-cta">Book demo</a>
</nav>
```

### 5.2 Hero pattern (eyebrow optional → h1 → sub → CTA pair)

V25's homepage hero is unusual: tetrahedron-driven, fixed-position, with the `v25-scroll-spacer` trick. **Sub-page heroes do not use any of that.** A sub-page hero is just a `.v25-section` whose inner has the same vertical rhythm as the section-header pattern.

```tsx
<section className="v25-section">
  <div className="v25-section-inner v25-reveal">
    <div className="v25-eyebrow">The Platform</div>
    <h1 style={{
      fontFamily: 'var(--font-display, "Literata", Georgia, serif)',
      fontSize: 'clamp(2.5rem, 6.4vw, 5.6rem)',
      fontWeight: 400,
      lineHeight: 0.98,
      letterSpacing: '-0.025em',
      color: '#ffffff',
      margin: '0 0 2rem',
      maxWidth: '20ch',
      textWrap: 'balance',
    }}>
      One platform. <span className="accent accent--teal">Eight modules.</span><br />
      The hire-and-retain loop, end to end.
    </h1>
    <p className="v25-desc" style={{ maxWidth: '52ch', fontSize: '1.15rem' }}>
      Predict performance before it lands. Defend every decision after it does.
    </p>
    <div className="v25-hero-actions" style={{ marginTop: 32 }}>
      <a href="#demo" className="v25-btn-primary">Book a demo</a>
      <a href="#modules" className="v25-link-arrow">
        See the modules<span aria-hidden="true"> ↗</span>
      </a>
    </div>
  </div>
</section>
```

There is no dedicated `.v25-page-hero` class. Use `.v25-section` + inline h1 styles copied from `.v25-hero-copy h1`. If multiple pages need the same shape, factor it into a tiny helper (`<VxHero />`) inside `src/components/vx/`.

The `.v25-hero-actions` flex container (gap, wrap, baseline alignment) is already defined and works in any context.

### 5.3 Section-header pattern

Already documented in [section 4](#section-header-pattern--v25css552-558).

### 5.4 Module card (`.v25-module`)

A glass card with a teal top-edge gradient that appears on hover.

```tsx
<div className="v25-module">
  <div className="v25-module-header">
    <span className="v25-module-num">M02</span>
    <span className="v25-module-tag">Screen</span>
  </div>
  <div className="v25-module-title">V-Parse</div>
  <p className="v25-module-desc">1,000 CVs per hour into structured talent data.</p>
</div>
```

`.v25-module-tag::before` automatically inserts a `·` separator between num and tag (`v25.css:738-741`), so don't write the dot yourself.

The phased grouping wrapper (sticky phase header + 3-up cards) is at `v25.css:618-687`. JSX template:

```tsx
<div className="v25-modules-phased">
  {PHASES.map((phase) => {
    const phaseModules = MODULES.filter((m) => m.tag === phase.name)
    const cardCountClass =
      phaseModules.length === 1 ? 'v25-module-phase-cards--1'
      : phaseModules.length === 2 ? 'v25-module-phase-cards--2'
      : ''
    return (
      <div key={phase.name} className="v25-module-phase">
        <div className="v25-module-phase-header">
          <span className="v25-module-phase-step">Phase {phase.step}</span>
          <span className="v25-module-phase-name">{phase.name}</span>
          <p className="v25-module-phase-desc">{phase.desc}</p>
        </div>
        <div className={`v25-module-phase-cards ${cardCountClass}`}>
          {phaseModules.map((mod) => (
            <div key={mod.title} className="v25-module">
              {/* …as above… */}
            </div>
          ))}
        </div>
      </div>
    )
  })}
</div>
```

`v25-module-phase-name` colours ramp through the five phases automatically via `:nth-of-type` rules (`v25.css:657-661`): `#0089B8` → sky → teal → `#50D4BC` → lime. The light-section variant uses Cobalt-tinted complements (`v25.css:1715-1719`). **Render phases in order Foundation → Screen → Assess → Decide → Operate** to keep the ramp meaningful.

### 5.5 Solution card (`.v25-solution-card`)

```tsx
<div className="v25-solutions-grid">
  {SOLUTIONS.map((sol) => (
    <div key={sol.title} className="v25-solution-card">
      <div className="v25-solution-role">Chief Executive Officer</div>
      <div className="v25-solution-title">Hospital CEO</div>
      <p className="v25-solution-quote">"Can I see, in real time, whether the workforce that delivers my margins is the workforce I will have in twelve months?"</p>
      <p className="v25-solution-body">Workforce intelligence at the level your strategy operates on, not the level your HRIS reports on. Service-line risk, retention forecasts, and capital implications in one weekly brief.</p>
      <div className="v25-solution-link">Explore <span aria-hidden="true">&rarr;</span></div>
    </div>
  ))}
</div>
```

The grid is 2-up at desktop, 1-up at <=860px. A 3px left edge fades in on hover (Teal). The `.v25-solution-link` uses the lighter teal token `--v25-accent-text` for AA at 12px.

### 5.6 Process step — Variant A (the current keeper)

Variant A is the **default Process step pattern**. Variants B/C/D are co-existing on the homepage temporarily for evaluation and will eventually be stripped. **For new pages, use Variant A.**

```tsx
<section className="v25-section v25-section--light v25-process--a" id="process">
  <div className="v25-section-inner v25-reveal">
    <div className="v25-process-wrap">
      <div className="v25-process-bg" aria-hidden="true" />
      <div style={{ position: 'relative' }}>
        <div className="v25-eyebrow">Our Process</div>
        <h2 className="v25-h2">Five steps from requisition to <span className="accent accent--teal">retained outcome</span>.</h2>
        <p className="v25-desc">Every Strategia engagement runs the same disciplined loop.</p>

        <div className="v25-process-steps">
          <div className="v25-process-line" aria-hidden="true" />
          {PROCESS_STEPS.map((step) => (
            <div key={step.num} className="v25-process-step">
              <div className="v25-process-step-num">{step.num}</div>
              <div className="v25-process-step-title">{step.title}</div>
              <div className="v25-process-step-module">{step.module}</div>
              <p className="v25-process-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="v25-hero-actions" style={{ marginTop: 48 }}>
          <a href="/process" className="v25-btn-outline">Full process</a>
          <a href="/process" className="v25-link-arrow">
            Talk to us<span aria-hidden="true"> ↗</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

The dotted horizontal line that connects steps is the `.v25-process-line` div. It hides at <=1100px.

If a builder wants a Variant B/C/D look on a sub-page (Variants live in `v25.css:1992-2226`), it's available — just swap `v25-process--a` for `v25-process--b`/`c`/`d` and use the corresponding markup from `v25/page.tsx:576-706`. Treat A as the default unless the page brief says otherwise.

### 5.7 Phase row (numeric strip 01/02/03/04/05)

The "phase row" pattern appears inside Process step A. It is **not** a standalone component in V25. If you need a numeric-strip-only callout (no titles, no descriptions, just numbers + names), reuse `.v25-process-steps` but render fewer fields, or build a simple list and style with `.v25-process-step-num` chips:

```tsx
<div className="v25-process-steps">
  <div className="v25-process-line" aria-hidden="true" />
  {PHASES.map((phase) => (
    <div key={phase.step} className="v25-process-step">
      <div className="v25-process-step-num">{phase.step}</div>
      <div className="v25-process-step-title">{phase.name}</div>
    </div>
  ))}
</div>
```

### 5.8 Evidence / badge row (`.v25-badges-grid`, `.v25-badge-item`)

```tsx
<div className="v25-badges-grid">
  {BADGES.map((b) => (
    <div key={b} className="v25-badge-item">
      <span className="v25-badge-check" aria-hidden="true">&#10003;</span>
      {b}
    </div>
  ))}
</div>
```

Renders a 2-up tile grid with a 1px-divider effect (the grid background shows through the gap), border-radius 16px on the outer grid. Use for SOC 2 / HIPAA / HITRUST style trust chips, certification lists, capability inventories.

### 5.9 Stat block (`.v25-stat-card`, big numerals)

```tsx
<section className="v25-stats v25-section--light v25-reveal">
  <div className="v25-stats-grid">
    <div className="v25-stat-card">
      <div className="v25-stat-value">80%</div>
      <div className="v25-stat-label">Of internal recruitment automated</div>
      <div className="v25-stat-sub">Median across deployed health systems</div>
    </div>
    {/* …two more cards… */}
  </div>
</section>
```

Three stats per row at desktop, collapses to 1 at 860px. The value is the big teal numeral (`clamp(2.75rem, 5.5vw, 4.5rem)`, `font-variant-numeric: tabular-nums`); the label is white-strong; the sub is white-subtle.

In a `.v25-section--light` band, the value flips to `#006D6A` and the label/sub flip to Abyss alphas automatically.

A nearly-identical pattern (`.v25-science-stat`) renders evidence stats with a top-row "Evidence" tag instead of a sub:

```tsx
<div className="v25-science-grid">
  <div className="v25-science-stat">
    <div className="v25-science-stat-header">
      <span className="value">0.74</span>
      <span className="evidence">Evidence</span>
    </div>
    <div className="label">Predictive validity coefficient</div>
    <div className="sub">vs. 0.18 for resume review and 0.21 for unstructured interview.</div>
  </div>
  {/* …two more… */}
</div>
```

Note these use **scoped class names** `.value`, `.evidence`, `.label`, `.sub` under `.v25-science-stat`, not standalone classes. Don't reuse `.value` outside this nested context.

### 5.10 ROI calculator (`.v25-roi-*`)

Functional pattern — needs client state. The full canonical implementation is in `v25/page.tsx:72-86, 712-777` and styles at `v25.css:1366-1472`.

```tsx
const [ftes, setFtes] = useState(3500)
const [turnover, setTurnover] = useState(21)
const [replacementCost, setReplacementCost] = useState(58000)

const current = ftes * (turnover / 100) * replacementCost
const newCost = current * 0.74
const platformCost = Math.max(250_000, ftes * 700)
const net = current - newCost - platformCost
const bigValue =
  net >= 1_000_000 ? (net / 1_000_000).toFixed(2) + 'M' : Math.round(net / 1_000) + 'K'
```

JSX:

```tsx
<section className="v25-section" id="roi">
  <div className="v25-section-inner v25-reveal">
    <div className="v25-eyebrow">ROI calculator</div>
    <h2 className="v25-h2">See the savings for <span className="accent accent--sky">your&nbsp;system.</span></h2>
    <p className="v25-desc">Three inputs. Conservative assumptions. A number you can take to your&nbsp;CFO.</p>

    <div className="v25-roi-grid">
      <div className="v25-roi-inputs">
        <div>
          <div className="v25-roi-input-header">
            <span className="k">Total Employees</span>
            <span className="v">{ftes.toLocaleString()}</span>
          </div>
          <input type="range" className="v25-roi-slider"
            min={500} max={20000} step={100}
            value={ftes} onChange={(e) => setFtes(Number(e.target.value))} />
        </div>
        {/* …two more inputs… */}
      </div>
      <div className="v25-roi-output">
        <div className="v25-roi-output-label">Projected annual savings</div>
        <div className="v25-roi-output-value">
          <span className="dollar">$</span>
          <span className="num">{bigValue}</span>
        </div>
        <p className="v25-roi-output-sub">Based on a 26% reduction in avoidable attrition across comparable systems.</p>
      </div>
    </div>
  </div>
</section>
```

Important: the slider min is **500 FTEs** (V21 #12 — anything lower lets the `$250K` platform-cost floor produce nonsense savings). Keep it.

If your sub-page is reusing the ROI calculator, factor it into `src/components/vx/VxRoi.tsx` rather than copy-pasting state into every page.

### 5.11 CTA buttons

Three variants live in V25:

**Primary (`.v25-btn-primary`)** — white pill, navy text. Use for top-of-funnel CTA. `v25.css:290-310`

```tsx
<a href="/demo" className="v25-btn-primary">Book a demo</a>
```

**Outline (`.v25-btn-outline`)** — transparent with light border. Use as secondary action. `v25.css:272-289`

```tsx
<a href="/science" className="v25-btn-outline">Read the research</a>
```

**Solid Abyss (`.v25-btn-solid`)** — only defined inside `.v25-section--light`. Navy fill, white text. Use as the primary CTA in light sections. `v25.css:1973-1990`

```tsx
{/* only valid inside a v25-section--light */}
<a href="/process" className="v25-btn-solid">Full process</a>
```

**Link-arrow (`.v25-link-arrow`)** — text link with `↗` glyph that translates on hover. The understated "explore" link. `v25.css:311-323`

```tsx
<a href="/process" className="v25-link-arrow">
  Talk to us<span aria-hidden="true"> ↗</span>
</a>
```

**Nav CTA (`.v25-nav-cta`)** — only for the nav bar (outline pill, all-caps). Don't reuse elsewhere.

Two CTAs side-by-side: wrap them in `<div className="v25-hero-actions">` which gives `display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem`. Reuse this group anywhere two buttons sit together.

### 5.12 Triangulate showcase (`.v25-triangulate`, `.v25-tri-*`)

This is a complex composite component used once on V25. If a sub-page needs to display "three signals into one score" with the same visual gravity, copy `v25/page.tsx:292-411` wholesale. Key sub-parts: `.v25-tri-intro`, `.v25-tri-board`, `.v25-tri-board-meta` (pill at top-right of board), `.v25-tri-signals` (3-up signal cards), `.v25-tri-converge` (SVG tree manifold) + `.v25-tri-converge-dot` (the synthesis dot), `.v25-tri-result` (the bottom result panel).

Most sub-pages will not need this — it is the centrepiece of the platform story. Reuse it on the `/vx/platform` page if anywhere.

### 5.13 Footer (`.v25-footer`)

```tsx
<footer className="v25-footer">
  <div className="v25-footer-inner">
    <div className="v25-footer-top">
      <div className="v25-footer-brand">
        <img src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png" alt="Strategia" />
        <p>The intelligence engine for the healthcare workforce. Hire defensibly. Plan rigorously. Operate at scale.</p>
        <div className="v25-footer-version">Strategia Intelligence Engine v2.1 · Live</div>
      </div>

      <div>
        <h5>Platform</h5>
        <ul>
          <li><a href="/platform">Overview</a></li>
          <li><a href="/modules">Modules</a></li>
          <li><a href="/science">Science</a></li>
          <li><a href="/enterprise">Enterprise</a></li>
        </ul>
      </div>
      {/* …Solutions, Resources, Company columns… */}
    </div>

    <div className="v25-footer-bottom">
      <div className="v25-footer-bottom-left">&copy; 2026 Strategia, Inc. All rights reserved.</div>
      <div className="v25-footer-bottom-right">
        <a href="/">Privacy</a>
        <a href="/">Terms</a>
        <a href="/enterprise">Security</a>
        <a href="/">Trust center</a>
      </div>
    </div>
  </div>
</footer>
```

Use the same five-column structure (1.6fr brand + four 1fr link columns). Footer is identical across all VX pages — factor it into `src/components/vx/VxFooter.tsx` to keep things DRY.

### 5.14 Final CTA section (`.v25-cta-section`, `.v25-cta-wrap`)

The page-closer card.

```tsx
<section className="v25-cta-section" id="demo">
  <div className="v25-cta-wrap v25-reveal">
    <div className="v25-cta-bg" aria-hidden="true" />
    <img
      src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png"
      alt="Strategia"
      className="v25-cta-logo"
    />
    <h2 className="v25-h2">Cut avoidable attrition. <span className="accent accent--teal">Defend every hire.</span></h2>
    <p className="v25-desc">Most executives have great strategy and an opaque workforce. Strategia closes the gap.</p>
    <div className="v25-cta-actions">
      <a href="/demo" className="v25-btn-primary">Book a demo</a>
      <a href="/process" className="v25-link-arrow">
        Talk to us<span aria-hidden="true"> ↗</span>
      </a>
    </div>
  </div>
</section>
```

The glow logo is a PNG. The `.v25-cta-wrap` has its own radial+linear panel gradient — drop it into any page and it visually closes.

---

## 6. Motion and reveal

### Scroll reveal (`.v25-reveal` → `.v25-reveal.in`)

`v25.css:95-104`:

```css
.v25-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.v25-reveal.in {
  opacity: 1;
  transform: none;
}
```

Apply `.v25-reveal` to a section inner (or any block-level element). At page-load, a single IntersectionObserver appends `.in` when the element crosses 15% viewport. Copy this `useEffect` into every sub-page (or factor it into the `/vx/layout.tsx`):

```tsx
useEffect(() => {
  const els = document.querySelectorAll<HTMLElement>('.v25-reveal')
  if (!els.length) return
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 },
  )
  els.forEach((el) => observer.observe(el))
  return () => observer.disconnect()
}, [])
```

Once observed and in, the element is unobserved — it only animates once.

`prefers-reduced-motion: reduce` disables the transition and renders elements at their final state (`v25.css:2285-2287`). No extra code needed.

### Hover transitions

Most cards/buttons transition `border-color`, `background`, `box-shadow`, and `transform` over 200-300ms with `ease`. The patterns are baked into the component classes — you don't write hover styles in JSX.

### What you don't bring across from V25

- The tetrahedron canvas animation (`tetrahedron.ts`) — sub-page only.
- The cursor-aura blob and plasma layer — `.v25-cursor-aura`, `.v25-plasma-layer`. They depend on `initTetrahedron()` setting CSS custom props.
- The page-wide pulse overlay — `.v25-pulse-overlay`. Same.
- The nav-scroll behaviour that fades in the wireframe icon — that's specific to V25's hero. Sub-pages should keep the icon visible always (handled in `VxNav` — see below).

---

## 7. Sub-page navigation (`VxNav` spec)

There is no existing nav component that fits sub-page routing — `src/components/PageNav.tsx` is the dev-time version switcher (verified). `.v25-nav` on V25 uses in-page anchor links and is bound to the homepage's hero state. **Builders must create `VxNav` per the spec below.**

### File path

`src/components/vx/VxNav.tsx`

Co-located CSS not needed — `VxNav` reuses `.v25-nav*` classes from `v25.css`.

### Routes covered

| Label | Path | File |
|---|---|---|
| Platform | `/vx/platform` | `src/app/(frontend)/vx/platform/page.tsx` |
| Science | `/vx/science` | `src/app/(frontend)/vx/science/page.tsx` |
| Solutions | `/vx/solutions` | `src/app/(frontend)/vx/solutions/page.tsx` |
| Institutional | `/vx/institutional` | `src/app/(frontend)/vx/institutional/page.tsx` |
| Process | `/vx/process` | `src/app/(frontend)/vx/process/page.tsx` |

The logo links to `/vx` (the VX home, which may be a marketing index for the rebuild). The CTA on the right is `Book demo` linking to `/vx/demo` (or `/demo` if that route already exists site-wide — verify before linking).

### DOM structure (mirrors `.v25-nav`)

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const LINKS = [
  { href: '/vx/platform', label: 'Platform' },
  { href: '/vx/science', label: 'Science' },
  { href: '/vx/solutions', label: 'Solutions' },
  { href: '/vx/institutional', label: 'Institutional' },
  { href: '/vx/process', label: 'Process' },
]

export default function VxNav() {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  // Mirror V25: append .scrolled when window.scrollY > 40 so the bar paints
  // solid Abyss with a subtle bottom-edge shadow. This is the only state
  // change V25 does on nav; we keep the wireframe icon visible always since
  // sub-pages don't have the tetrahedron hand-off moment.
  useEffect(() => {
    const _nav = navRef.current
    if (!_nav) return
    const nav: HTMLElement = _nav
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="v25-nav vx-nav" ref={navRef}>
      <Link href="/vx" className="v25-nav-logo">
        <svg
          className="v25-nav-mark vx-nav-mark-visible"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M20 4L36 34H4L20 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
        </svg>
        <img src="/images/brand/strategia-wordmark-white.svg" alt="Strategia" />
      </Link>

      <ul className="v25-nav-links">
        {LINKS.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`v25-nav-link${isActive ? ' v25-nav-link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>

      <Link href="/vx/demo" className="v25-nav-cta">Book demo</Link>
    </nav>
  )
}
```

### Active-link styling (one extra rule the builder adds)

V25's `.v25-nav-link` is `rgba(255, 255, 255, 0.75)` and turns `#ffffff` on `:hover`. For the active state, append this small rule somewhere a sub-page CSS can pick it up. Easiest: add a `vx/VxNav.module.css` that injects two rules, or extend through inline styles. Recommended pattern — a tiny scoped stylesheet co-located with the component:

`src/components/vx/VxNav.module.css`:

```css
/* Strategy: ride the V25 token but cement the colour and underline. */
:global(.v25-nav-link--active) {
  color: #ffffff;
}
:global(.v25-nav-link--active)::after {
  content: '';
  display: block;
  height: 1px;
  margin-top: 4px;
  background: var(--v25-accent, #00C6C1);
  opacity: 0.85;
}

/* Sub-pages have no tetrahedron hand-off, so the wireframe icon should be
   visible immediately rather than fading in at scrollY > 40. */
:global(.vx-nav-mark-visible) {
  opacity: 1 !important;
  transform: scale(1) !important;
}
```

Import it once from `VxNav.tsx`:

```tsx
import './VxNav.module.css'  // side-effect import for :global rules
```

(Or use a regular `VxNav.css` and import that — Next supports both. The `:global()` wrapping ensures Module CSS doesn't hash the class names V25 wrote.)

### Behaviour notes

- The nav is `position: fixed; top: 0; z-index: 100` (inherited from `.v25-nav`).
- Height 72px; padding matches the section padding clamp on the sides.
- Below 860px viewport, `.v25-nav-links` is `display: none` (already in `v25.css:2254`). **Mobile menu is not in scope for VX rebuild** — a future task. For now, mobile users see only the logo and the CTA. Note this in the page brief.

### CTA choice

V25 uses "Book demo". `/vx` may want a different CTA per page brief (e.g. "Start Intelligence Engine" mirroring the current production site's hero CTA). For consistency: use "Book demo" as the default, and let individual page briefs override by passing a prop:

```tsx
<VxNav cta={{ label: 'Book demo', href: '/vx/demo' }} />
```

If you choose to make it propable, default the prop to the values above and document it. If not, hard-coding "Book demo" is fine for now.

---

## 8. Copy voice and content rules

### Hard rule: no em or en dashes anywhere user-visible

`—`, `–`, `&mdash;`, `&ndash;` are banned in copy a visitor can read (page text, CTA labels, alt text, meta descriptions). **Rewrite with a comma, period, parenthesis, colon, or semicolon.**

This applies to:

- `page.tsx` JSX strings
- Marketing copy / arrays of strings used in JSX (the `MODULES`, `SOLUTIONS`, `PROCESS_STEPS`-style data on V25 follows this)
- CTA labels
- Alt text and aria labels
- `<title>` and meta descriptions

It does NOT apply to:

- Source code comments (`// …`)
- Commit messages
- This style guide

Before committing a new page, sweep for `—`, `–`, `&mdash;`, `&ndash;`.

A `·` (`&middot;`) is fine and is V25's preferred separator inside eyebrows and meta strings. So is a comma. So is "and".

### Tone

Confident peer-designer voice. Direct. Sentences over fragments when reasonable. Make claims with numbers. Avoid generic marketing language:

- "Crafted", "curated", "thoughtfully designed"
- "Unlock", "unleash", "supercharge", "leverage"

Avoid hedging adverbs ("seamlessly", "effortlessly", "perfectly"). Avoid "delight". Strategia is selling clinical-grade rigour. Sound like a consultant who shipped, not a copywriter.

### Industry framing

V25's homepage is healthcare-specific (Hospital CEO, ICU Nurse, clinical operations, healthcare hiring). Sub-pages should keep healthcare references **where the source content uses them**, but you don't need to genericize away from healthcare unless the page brief is explicitly about a non-healthcare vertical. Strategia is a healthcare workforce platform; that's the frame.

Examples of healthcare-specific phrasing already in V25 that should be preserved on related sub-pages:

- "service-line risk", "service-line chief"
- "ICU Nurse Specialist"
- "CHRO", "CMO", "CNO"
- "Reg. Nurse (RN) License"
- "OCEAN" (Big Five), "T-score conversion"
- "HIPAA", "HITRUST CSF", "BAA"

When source content is clearly cross-industry (security/enterprise pages, infra), use generic copy. Do not invent healthcare framing where the source doesn't supply it.

### Title and meta template

Every page should set `metadata` in its server component (or `generateMetadata` if dynamic):

```tsx
// IF the page is 'use client', metadata must come from a parent server
// component or be set via a wrapping route segment. For VX page files,
// the simplest path is to keep page.tsx a server component that renders
// a small client-component <Body/> for any interactive parts. If the
// whole page needs to be client (rare), set the metadata in the route
// group layout (src/app/(frontend)/vx/layout.tsx) keyed by pathname.
export const metadata = {
  title: 'Platform | Strategia Tech',
  description:
    'Eight modules that turn the hire-and-retain loop into one defensible workflow, from spec to onboarding.',
}
```

Title pattern: `<Page name> | Strategia Tech`. Keep under ~60 chars.
Description: one sentence, ~140-160 chars, no dashes, no marketing fluff, leads with what the page is about.

### Wordmarks and brand assets

- Header wordmark: `/images/brand/strategia-wordmark-white.svg` (28px tall, white)
- Footer/CTA wordmark with glow: `/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png` (CTA uses 160px, footer 56px)

Don't introduce new brand assets without checking `/images/brand/`.

---

## 9. TypeScript discipline

`typescript.ignoreBuildErrors` is **off** in `next.config.mjs`, so any type error fails the deploy. Don't paper over an error — fix it.

**The strict-null pattern for DOM lookups inside closures**: TypeScript narrows `T | null` after a guard within the current scope, but **widens it back inside closures** (event handlers, animation callbacks, IntersectionObserver callbacks, etc.). The codebase pattern is to look up with a `_`-prefixed nullable local, guard, then rebind to a non-null-typed local with the original name:

```typescript
const _ctx = canvasRef.current?.getContext('2d')
if (!_ctx) return
const ctx: CanvasRenderingContext2D = _ctx  // non-null inside any closure below

function draw() {
  ctx.fillRect(0, 0, w, h)  // ok, no TS error
}
```

For SVG elements obtained via `getElementById` (typed `HTMLElement | null`), use `as unknown as SVG<Foo>Element` after the guard. See `src/app/(frontend)/v25/tetrahedron.ts` for the canonical example.

Do not spray `!` non-null assertions at every use site — they work but they're noise and they don't tell future readers *why* the assertion is safe. One rebind beside the guard puts the assertion in one place, right next to the proof.

The VxNav `useEffect` example in [section 7](#7-sub-page-navigation-vxnav-spec) follows this pattern (`const _nav = navRef.current; … const nav: HTMLElement = _nav`).

---

## 10. Page scaffold template

A complete, copy-pasteable starting point. Replace the placeholder content blocks with the page's actual content.

`src/app/(frontend)/vx/<page>/page.tsx`:

```tsx
'use client'

import { useEffect } from 'react'
import VxNav from '@/components/vx/VxNav'
import VxFooter from '@/components/vx/VxFooter'
import '../../v25/v25.css'

const FEATURES = [
  { num: '01', title: 'First feature',  desc: 'One sentence about why it matters.' },
  { num: '02', title: 'Second feature', desc: 'Concrete, measurable, no hedge.' },
  { num: '03', title: 'Third feature',  desc: 'Plain English. No buzzwords.' },
]

export default function VxPlatformPage() {
  // Scroll-reveal observer — V25 standard pattern.
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.v25-reveal')
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="v25 v25--complete">
      <VxNav />

      {/* ============================================
          HERO
          ============================================ */}
      <section className="v25-section" style={{ paddingTop: 'clamp(140px, 18vw, 220px)' }}>
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">The Platform</div>
          <h1 style={{
            fontFamily: 'var(--font-display, "Literata", Georgia, serif)',
            fontSize: 'clamp(2.5rem, 6.4vw, 5.6rem)',
            fontWeight: 400,
            lineHeight: 0.98,
            letterSpacing: '-0.025em',
            color: '#ffffff',
            margin: '0 0 2rem',
            maxWidth: '20ch',
            textWrap: 'balance',
          }}>
            One platform. <span className="accent accent--teal">Eight modules.</span>
            <br />
            The hire-and-retain loop, end to end.
          </h1>
          <p className="v25-desc" style={{ maxWidth: '52ch', fontSize: '1.15rem' }}>
            Predict performance before it lands. Defend every decision after it does.
            A modular system built for healthcare HR and executive teams.
          </p>
          <div className="v25-hero-actions" style={{ marginTop: 32 }}>
            <a href="/vx/demo" className="v25-btn-primary">Book a demo</a>
            <a href="#features" className="v25-link-arrow">
              See the modules<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION-HEADER + 3-UP STAT/FEATURE GRID
          ============================================ */}
      <section className="v25-section" id="features">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Features</div>
              <h2 className="v25-h2">
                Three pillars. <span className="accent accent--sky">One workflow.</span>
              </h2>
            </div>
            <a href="/vx/process" className="v25-link-arrow">
              See the process<span aria-hidden="true"> ↗</span>
            </a>
          </div>

          <div className="v25-science-grid">
            {FEATURES.map((f) => (
              <div key={f.num} className="v25-science-stat">
                <div className="v25-science-stat-header">
                  <span className="value">{f.num}</span>
                  <span className="evidence">Feature</span>
                </div>
                <div className="label">{f.title}</div>
                <div className="sub">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          LIGHT BAND, used to break up long dark stretches
          ============================================ */}
      <section className="v25-section v25-section--light">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Why it works</div>
          <h2 className="v25-h2">
            Built for the people who <span className="accent accent--teal">own the workforce</span>.
          </h2>
          <p className="v25-desc">
            Plain-English description of the value, two or three sentences max.
            Lead with the buyer's question, answer with measurable specifics.
          </p>

          <div className="v25-hero-actions" style={{ marginTop: 32 }}>
            <a href="/vx/solutions" className="v25-btn-solid">See by role</a>
            <a href="/vx/science" className="v25-link-arrow">
              Read the research<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          CLOSING CTA
          ============================================ */}
      <section className="v25-cta-section">
        <div className="v25-cta-wrap v25-reveal">
          <div className="v25-cta-bg" aria-hidden="true" />
          <img
            src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png"
            alt="Strategia"
            className="v25-cta-logo"
          />
          <h2 className="v25-h2">
            One platform. <span className="accent accent--teal">Every defensible hire.</span>
          </h2>
          <p className="v25-desc">
            See it run on your data. Thirty minutes, your terms, no slides.
          </p>
          <div className="v25-cta-actions">
            <a href="/vx/demo" className="v25-btn-primary">Book a demo</a>
            <a href="/vx/process" className="v25-link-arrow">
              Talk to us<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      <VxFooter />
    </div>
  )
}
```

Suggested companion files (build once, import everywhere):

- `src/components/vx/VxNav.tsx` (see [section 7](#7-sub-page-navigation-vxnav-spec))
- `src/components/vx/VxFooter.tsx` (mirror `v25/page.tsx:807-870` — see [section 5.13](#513-footer-v25-footer))
- `src/components/vx/VxHero.tsx` (optional — factor the hero block in [section 5.2](#52-hero-pattern-eyebrow-optional--h1--sub--cta-pair) if used on multiple pages)
- `src/components/vx/VxRoi.tsx` (optional — only if multiple pages reuse the ROI calculator)
- `src/app/(frontend)/vx/layout.tsx` (one-time `v25.css` import + shared `metadata` defaults)

### Note on `'use client'` and `metadata`

`metadata` can only be exported from a server component. If your `page.tsx` is `'use client'` for `useEffect` (which is what the scaffold above does), set `metadata` either:

- in `src/app/(frontend)/vx/<page>/layout.tsx` (a server file alongside the page), or
- by splitting the page into a server `page.tsx` that exports `metadata` and renders a `'use client'` `<PageBody />` from `./PageBody.tsx`.

The cleanest path is the second: keep `page.tsx` as a server component that just renders the body and exports metadata; put all interactivity in `PageBody.tsx`.

---

## 11. Common pitfalls

1. **Forgetting `v25--complete`.** Without it, V25's CSS keeps the (non-existent) hero pinned `position: fixed; inset: 0` and your page renders into a void. Always: `<div className="v25 v25--complete">`.

2. **Forgetting to import `v25.css`.** The wrapper class only does work if the stylesheet loaded. Put one `import '../../v25/v25.css'` at the route-group layout, or one at every page. Without it the page renders unstyled.

3. **Importing `v25.css` more than once.** Next.js bundles the CSS once regardless, but multiple imports are noise and risk cascade-order surprises if other CSS gets layered in. Pick layout-level OR page-level; don't mix.

4. **Em or en dashes in copy.** This is a real ban. Run a quick sweep on `—`, `–`, `&mdash;`, `&ndash;` before committing. If you autocomplete an em-dash via an editor smart-quote / auto-format, undo and retype `,` or `:` or `;`.

5. **Modifying `v25/page.tsx` or `v25.css`.** The V25 homepage is frozen — it's the canonical visual reference. If you spot a token or component that needs a tweak, factor it into a `vx/`-scoped CSS file with new class names; do not edit V25 in place.

6. **Adding VX routes to `PageNav.tsx`.** Don't. `PageNav.tsx` is the dev-time version switcher. The new VX pages are part of the production rebuild story, not the version history. They get their own navigation via `VxNav`.

7. **Using brand Teal `#00C6C1` for small text on white.** It fails AA. Use `#006D6A` (Cobalt-tinted Teal) instead. The `.v25-section--light` rules handle this automatically for built-in components; manual selectors or inline styles must do it themselves.

8. **Mixing the `.accent--*` modifiers haphazardly.** V23 deliberately rotates sky / teal / lime across adjacent h2s so each pop reads as its own colour. If your page has three h2s, don't paint all three teal. Variety reads as design intent.

9. **Defining heading colours by hand inside `.v25`.** Use the `.v25-h2` class plus `.accent`/`.muted` spans. The class already handles the size clamp, line-height, weight, letter-spacing, and balance. Inline `<h2 style={…}>` will look subtly off.

10. **Building a custom mobile menu.** Below 860px the desktop nav links hide (`v25.css:2254`); V25 ships no mobile menu. Don't build one for VX until it's in scope. Note the gap in the page brief.

11. **Forgetting the IntersectionObserver.** `.v25-reveal` without the observer means every revealed element stays at `opacity: 0` forever. Either copy the `useEffect` into every page or factor it into `/vx/layout.tsx`.

12. **Healthcare-specific copy on generic pages and vice versa.** V25 leads with healthcare. Match the source content's framing — don't invent ICU nurses on a security page, and don't strip "clinician" out of a workforce-fit page just to sound generic.

13. **TypeScript narrow-then-widen inside closures.** Use the `_`-prefixed-rebind pattern (see Section 9). Spraying `!` works but is noise; the rebind is the codebase standard.

14. **Section ordering breaking the per-section radial tints.** The `::before` tints in `v25.css:458-492` key off `#modules`, `#science`, `#solutions`, `#process`, `#roi`. If your sub-page sections use different ids you lose the tint subtly. Either reuse the ids when content fits, or accept the flatter look — both are fine.

15. **Stacking `.v25-section--light` against itself.** V25 alternates dark and light bands to give the eye a rest. If two `.v25-section--light` sections sit back-to-back on a sub-page, the layout still works but loses the rhythm. Vary your bands.

16. **`backdrop-filter: blur(…)` over light sections.** `.v25-section--light` overrides set `backdrop-filter: none` on cards inside light bands because the blur reads weird over `#ECEDEB`. If you write a new card-style component for use in both dark and light sections, add `.v25-section--light .your-card { backdrop-filter: none; }` to match.
