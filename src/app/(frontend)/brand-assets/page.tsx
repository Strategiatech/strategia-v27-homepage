'use client'

import { useCallback, useRef, useState } from 'react'
import './brand-assets.css'

/* ─────────────────────────────────────────────────────────────
   WORDMARK (Strategia letters only, no triangle)
   Source: STRATEGIA_INLINE_WHITE.svg, paths 1..9
   Native viewBox of the wordmark slice is "520 105 1145 130".
   ───────────────────────────────────────────────────────────── */

const WORDMARK_PATHS = [
  // S
  'M566.67,227.69c-5.63,0-10.97-1.07-16.03-3.21-5.06-2.14-9.2-4.93-12.43-8.37l-2.19,10.32h-5.32l-3.28-34.72,6.26-.63c1.67,5.11,3.62,9.46,5.86,13.06,2.24,3.6,4.74,6.52,7.51,8.76,2.76,2.24,5.76,3.91,8.99,5,3.23,1.09,6.62,1.64,10.16,1.64,4.17,0,7.92-.73,11.26-2.19,3.33-1.46,5.99-3.73,7.98-6.8,1.98-3.07,2.97-7.12,2.97-12.12,0-3.65-.7-6.88-2.11-9.7-1.41-2.81-3.91-5.42-7.51-7.82-3.6-2.4-8.78-4.69-15.56-6.88-6.05-1.98-11.1-4.01-15.17-6.1-4.07-2.08-7.33-4.38-9.77-6.88-2.45-2.5-4.2-5.29-5.24-8.37-1.04-3.07-1.56-6.59-1.56-10.56,0-3.54.52-6.8,1.56-9.77,1.04-2.97,2.53-5.6,4.46-7.9,1.93-2.29,4.22-4.25,6.88-5.86,2.66-1.62,5.58-2.81,8.76-3.6,3.18-.78,6.49-1.17,9.93-1.17,4.27,0,8.42.78,12.43,2.35,4.01,1.56,7.64,3.7,10.87,6.41l2.03-8.76h5.47l3.44,30.96-6.57.78c-1.88-5.73-4.12-10.37-6.73-13.92-2.61-3.54-5.63-6.12-9.07-7.74-3.44-1.62-7.4-2.42-11.89-2.42-5.94,0-10.77,1.59-14.47,4.77-3.7,3.18-5.55,7.58-5.55,13.21,0,3.55.7,6.7,2.11,9.46,1.41,2.76,3.93,5.27,7.58,7.51,3.65,2.24,8.76,4.51,15.33,6.8,6.25,1.98,11.44,4.14,15.56,6.49,4.12,2.35,7.35,4.85,9.7,7.51,2.35,2.66,4.01,5.53,5,8.6.99,3.08,1.49,6.44,1.49,10.09,0,4.69-.78,8.97-2.35,12.82-1.56,3.86-3.81,7.22-6.72,10.09-2.92,2.87-6.41,5.06-10.48,6.57-4.07,1.51-8.6,2.27-13.61,2.27Z',
  // T
  'M668.95,225.51v-5.63l12.51-2.03c1.77-.21,3.07-.81,3.91-1.8.83-.99,1.25-2.94,1.25-5.86v-86.79h-10.95c-3.75,0-6.88.29-9.38.86-2.5.57-4.64,1.72-6.41,3.44-1.77,1.72-3.39,4.22-4.85,7.51-1.46,3.28-3.08,7.64-4.85,13.06l-6.41-1.56,6.26-30.65h85.23l5.94,30.65-6.41,1.56c-1.67-5.42-3.26-9.77-4.77-13.06-1.51-3.28-3.13-5.79-4.85-7.51-1.72-1.72-3.83-2.87-6.33-3.44-2.5-.57-5.63-.86-9.38-.86h-11.26v87.42c0,2.61.34,4.35,1.02,5.24.68.89,2.11,1.49,4.3,1.8l12.51,2.03v5.63h-47.07Z',
  // R
  'M871.15,227.69c-3.23,0-6.07-.55-8.52-1.64-2.45-1.09-4.61-2.89-6.49-5.39-1.88-2.5-3.65-5.84-5.32-10.01l-8.29-20.96c-1.56-4.07-3.21-7.14-4.93-9.23-1.72-2.08-3.7-3.52-5.94-4.3-2.24-.78-5.08-1.17-8.52-1.17-1.88,0-3.55.05-5,.16-1.46.11-2.82.26-4.07.47v35.19c0,2.5.39,4.35,1.17,5.55.78,1.2,2.27,1.9,4.46,2.11l11.73,1.25v5.79h-42.85v-5.79l9.23-1.41c1.88-.21,3.15-.83,3.83-1.88.68-1.04,1.02-3.07,1.02-6.1v-79.6c0-2.71-.37-4.54-1.09-5.47-.73-.94-2.14-1.56-4.22-1.88l-8.76-1.41v-5.94h35.66c6.98,0,13.08.57,18.3,1.72,5.21,1.15,9.51,2.92,12.9,5.32,3.39,2.4,5.92,5.37,7.59,8.91,1.67,3.55,2.5,7.72,2.5,12.51,0,2.29-.34,4.61-1.02,6.96-.68,2.35-1.7,4.64-3.05,6.88-1.36,2.24-3.08,4.3-5.16,6.18-2.09,1.88-4.48,3.49-7.19,4.85-2.71,1.36-5.79,2.29-9.23,2.82v.47c3.75,1.15,6.75,2.87,8.99,5.16,2.24,2.29,4.14,5.42,5.71,9.38l5.32,13.14c1.67,3.96,3.15,7.35,4.46,10.16,1.3,2.82,2.82,4.95,4.54,6.41,1.72,1.46,3.93,2.19,6.65,2.19,1.46,0,2.84-.16,4.14-.47,1.3-.31,2.63-.68,3.99-1.09l1.25,4.69c-1.77,1.67-3.83,3-6.18,3.99-2.35.99-4.88,1.49-7.59,1.49ZM824.71,168.27c5.53,0,10.42-.86,14.7-2.58,4.27-1.72,7.66-4.33,10.16-7.82,2.5-3.49,3.75-7.84,3.75-13.06s-1.15-9.38-3.44-12.51c-2.29-3.13-5.63-5.39-10.01-6.8-4.38-1.41-9.75-2.11-16.11-2.11h-9.7v44.57c2.71.11,4.9.18,6.57.23,1.67.05,3.02.08,4.07.08Z',
  // A
  'M952.32,189.07l-7.19,21.11c-.84,2.29-1.07,4.17-.7,5.63.36,1.46,1.8,2.35,4.3,2.66l8.91,1.25v5.79h-35.97v-5.79l7.04-1.25c1.88-.42,3.28-1.09,4.22-2.03.94-.94,1.98-3.07,3.13-6.41l33.31-93.99h11.42l32.84,94.3c.94,2.61,1.77,4.46,2.5,5.55.73,1.09,2.19,1.85,4.38,2.27l6.1,1.25v6.1h-37.22v-5.79l9.07-1.25c2.08-.31,3.36-1.02,3.83-2.11.47-1.09.23-2.94-.7-5.55l-7.51-21.74-2.5-7.51-17.83-53.64h-.47l-18.3,53.64-2.66,7.51Z',
  // T
  'M1076.8,225.51v-5.63l12.51-2.03c1.77-.21,3.07-.81,3.91-1.8.83-.99,1.25-2.94,1.25-5.86v-86.79h-10.95c-3.75,0-6.88.29-9.38.86-2.5.57-4.64,1.72-6.41,3.44-1.77,1.72-3.39,4.22-4.85,7.51-1.46,3.28-3.08,7.64-4.85,13.06l-6.41-1.56,6.26-30.65h85.23l5.94,30.65-6.41,1.56c-1.67-5.42-3.26-9.77-4.77-13.06-1.51-3.28-3.13-5.79-4.85-7.51-1.72-1.72-3.83-2.87-6.33-3.44-2.5-.57-5.63-.86-9.38-.86h-11.26v87.42c0,2.61.34,4.35,1.02,5.24.68.89,2.11,1.49,4.3,1.8l12.51,2.03v5.63h-47.07Z',
  // E
  'M1196.43,225.51v-5.79l9.07-1.41c1.98-.31,3.28-.99,3.91-2.03.62-1.04.94-3.02.94-5.94v-79.6c0-2.6-.31-4.4-.94-5.4-.63-.99-2.09-1.64-4.38-1.95l-8.6-1.41v-5.94h69.59l5.63,24.71-6.41,2.03c-1.46-4.38-2.89-7.87-4.3-10.48-1.41-2.6-2.97-4.56-4.69-5.86-1.72-1.3-3.83-2.16-6.33-2.58-2.5-.42-5.63-.63-9.38-.63h-18.77v42.69h17.98c3.54,0,6.18-.23,7.9-.7,1.72-.47,2.97-1.62,3.75-3.44.78-1.82,1.59-4.72,2.42-8.68l5.63-.63v33.47l-5.63.94c-.63-4.07-1.36-7.01-2.19-8.84-.84-1.82-2.24-3-4.22-3.52-1.98-.52-4.95-.78-8.91-.78h-16.73v44.57h24.55c3.75,0,6.83-.31,9.23-.94,2.4-.63,4.4-1.67,6.02-3.13,1.62-1.46,2.95-3.52,3.99-6.18,1.04-2.66,1.98-6.07,2.81-10.24h6.73l-3.75,27.68h-74.91Z',
  // G
  'M1372.36,227.69c-9.7,0-18.17-2.21-25.41-6.65-7.25-4.43-12.9-10.82-16.97-19.16-4.07-8.34-6.1-18.35-6.1-30.03,0-9.17,1.15-17.36,3.44-24.55,2.29-7.19,5.58-13.27,9.85-18.22,4.27-4.95,9.38-8.73,15.33-11.34,5.94-2.6,12.51-3.91,19.7-3.91,5.53,0,10.61.86,15.25,2.58,4.64,1.72,8.63,4.14,11.96,7.27l1.56-10.01h5.63l6.41,35.19-6.26,1.56c-2.4-6.78-5.19-12.22-8.37-16.34-3.18-4.12-6.88-7.12-11.1-8.99-4.22-1.88-9.25-2.82-15.09-2.82-5.21,0-10.01.94-14.39,2.82-4.38,1.88-8.19,4.8-11.42,8.76-3.23,3.96-5.76,8.97-7.58,15.01-1.83,6.05-2.74,13.24-2.74,21.58,0,7.51.83,14.26,2.5,20.25,1.67,6,4.12,11.1,7.35,15.33,3.23,4.22,7.14,7.46,11.73,9.7,4.59,2.24,9.8,3.36,15.64,3.36,3.86,0,7.53-.49,11.02-1.49,3.49-.99,6.67-2.32,9.54-3.99,2.87-1.67,5.18-3.49,6.96-5.47v-20.02c0-2.6-.37-4.35-1.09-5.24-.73-.88-2.14-1.49-4.22-1.8l-9.54-1.41v-5.94h39.41v5.94l-8.76,1.41c-1.88.21-3.13.86-3.75,1.95s-.94,3-.94,5.71v37.22h-5.47l-3.13-8.45c-3.02,2.19-6.18,4.04-9.46,5.55-3.28,1.51-6.7,2.66-10.24,3.44-3.55.78-7.3,1.17-11.26,1.17Z',
  // I
  'M1471.2,225.51v-5.79l9.38-1.41c1.98-.31,3.28-.99,3.91-2.03.63-1.04.94-3.02.94-5.94v-79.6c0-2.71-.34-4.54-1.02-5.47-.68-.94-2.06-1.56-4.14-1.88l-9.07-1.41v-5.94h39.88v5.94l-9.54,1.41c-1.88.21-3.13.89-3.75,2.03-.63,1.15-.94,3.13-.94,5.94v79.6c0,2.61.34,4.41,1.02,5.4.68.99,2.01,1.64,3.99,1.95l9.23,1.41v5.79h-39.88Z',
  // A
  'M1584.88,189.07l-7.19,21.11c-.84,2.29-1.07,4.17-.7,5.63.36,1.46,1.8,2.35,4.3,2.66l8.91,1.25v5.79h-35.97v-5.79l7.04-1.25c1.88-.42,3.28-1.09,4.22-2.03.94-.94,1.98-3.07,3.13-6.41l33.31-93.99h11.42l32.84,94.3c.94,2.61,1.77,4.46,2.5,5.55.73,1.09,2.19,1.85,4.38,2.27l6.1,1.25v6.1h-37.22v-5.79l9.07-1.25c2.08-.31,3.36-1.02,3.83-2.11.47-1.09.23-2.94-.7-5.55l-7.51-21.74-2.5-7.51-17.83-53.64h-.47l-18.3,53.64-2.66,7.51Z',
]

// Wordmark intrinsic units (within the source SVG): x=520..1665, y=105..235.
const WM_VX = 520
const WM_VY = 105
const WM_VW = 1145
const WM_VH = 130

/* ─────────────────────────────────────────────────────────────
   BRAND TOKENS
   ───────────────────────────────────────────────────────────── */

const C = {
  black: '#1C1C1C',
  navyBlack: '#00192E',
  darkBlue: '#003D6B',
  mediumBlue: '#006988',
  teal: '#5CC8B8',
  white: '#FFFFFF',
  abyss: '#012236',
}

/* ─────────────────────────────────────────────────────────────
   REUSABLE SVG PIECES
   ───────────────────────────────────────────────────────────── */

// 5-stop V4 Dark Depth gradient. Stop offsets match the brand library
// (brand-v4 page) exactly: 0 / 25 / 50 / 75 / 100.
function DarkDepthGradient({ id, angle = 135 }: { id: string; angle?: number }) {
  // Convert CSS-style angle (0 = up) to SVG coords (1=right, 0=down by default).
  const theta = ((angle - 90) * Math.PI) / 180
  const dx = Math.cos(theta)
  const dy = Math.sin(theta)
  return (
    <linearGradient id={id} x1={0.5 - dx / 2} y1={0.5 - dy / 2} x2={0.5 + dx / 2} y2={0.5 + dy / 2}>
      <stop offset="0%" stopColor={C.black} />
      <stop offset="25%" stopColor={C.navyBlack} />
      <stop offset="50%" stopColor={C.darkBlue} />
      <stop offset="75%" stopColor={C.mediumBlue} />
      <stop offset="100%" stopColor={C.teal} />
    </linearGradient>
  )
}

// Soft-light gradient for the light conference variant.
function LightGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="55%" stopColor="#EAF6F4" />
      <stop offset="100%" stopColor="#CDEDE8" />
    </linearGradient>
  )
}

// Cinematic glow filter for the brand mark. Multiple gaussian blurs stack
// to give the halo soft falloff at multiple radii.
function GlowFilter({ id, scale = 1 }: { id: string; scale?: number }) {
  return (
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation={1.4 * scale} result="b1" />
      <feGaussianBlur in="SourceGraphic" stdDeviation={3 * scale} result="b2" />
      <feGaussianBlur in="SourceGraphic" stdDeviation={6 * scale} result="b3" />
      <feMerge>
        <feMergeNode in="b3" />
        <feMergeNode in="b3" />
        <feMergeNode in="b2" />
        <feMergeNode in="b1" />
      </feMerge>
    </filter>
  )
}

// Brand mark (triangle) with glow halo. `size` = bounding box of the triangle.
// Triangle native points are in a 0..40 unit space; we scale to `size`.
function GlowTriangle({
  x,
  y,
  size,
  filterId,
  halo = C.teal,
  stroke = C.white,
  strokeWidth = 1.6,
  haloWidth = 2.2,
}: {
  x: number
  y: number
  size: number
  filterId: string
  halo?: string
  stroke?: string
  strokeWidth?: number
  haloWidth?: number
}) {
  const s = size / 40
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path
        d="M20 4L36 34H4L20 4Z"
        fill="none"
        stroke={halo}
        strokeWidth={haloWidth}
        strokeLinejoin="round"
        filter={`url(#${filterId})`}
      />
      <path
        d="M20 4L36 34H4L20 4Z"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </g>
  )
}

// Solid (non-glow) triangle, for the light conference variant.
function SolidTriangle({
  x,
  y,
  size,
  color,
  strokeWidth = 1.8,
}: {
  x: number
  y: number
  size: number
  color: string
  strokeWidth?: number
}) {
  const s = size / 40
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path
        d="M20 4L36 34H4L20 4Z"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </g>
  )
}

// Wordmark renderer.
// `width` is the rendered width in viewBox units. Height is derived from aspect.
function Wordmark({
  x,
  y,
  width,
  fill,
}: {
  x: number
  y: number
  width: number
  fill: string
}) {
  const scale = width / WM_VW
  return (
    <g transform={`translate(${x - WM_VX * scale},${y - WM_VY * scale}) scale(${scale})`} fill={fill}>
      {WORDMARK_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  )
}

// Subtle decorative triangle scattering, painted at low opacity for atmosphere.
interface TriDeco {
  x: number
  y: number
  size: number
  rot: number
  op: number
}
function ScatterTriangles({
  data,
  stroke,
  sw = 1.5,
}: {
  data: TriDeco[]
  stroke: string
  sw?: number
}) {
  return (
    <>
      {data.map((d, i) => {
        const h = d.size * 0.866
        return (
          <polygon
            key={i}
            points={`${d.size / 2},0 0,${h} ${d.size},${h}`}
            transform={`translate(${d.x},${d.y}) rotate(${d.rot},${d.size / 2},${h / 2})`}
            fill="none"
            stroke={stroke}
            strokeWidth={sw}
            opacity={d.op}
          />
        )
      })}
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   EMAIL SIGNATURE HTML (rebranded for V4 dark depth)
   Email clients tend to mangle dark backgrounds, so the signature
   itself stays light — but the typography, accent rule, and link
   colors all pull from the V4 palette so it reads "Strategia" at
   a glance.
   ───────────────────────────────────────────────────────────── */

// Light variant. Built for the default white inbox background most clients use.
// Uses the abyss inline logo and #00192E body text against white.
const SIGNATURE_HTML_LIGHT = `<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #1C1C1C; font-size: 13px; line-height: 1.4;">
  <tr>
    <td style="padding-bottom: 16px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="vertical-align: middle; padding-right: 18px;">
            <img src="https://strategiatech.com/images/brand/solid/inline/strategia-inline-abyss.png" alt="Strategia" width="200" style="display: block; height: auto;" />
          </td>
          <td style="width: 2px; vertical-align: middle;">
            <div style="width: 2px; height: 52px; background: linear-gradient(180deg, #5CC8B8 0%, #006988 100%);"></div>
          </td>
          <td style="vertical-align: middle; padding-left: 18px;">
            <div style="font-size: 15px; font-weight: 700; color: #00192E; margin: 0 0 2px;">{{Your Name}}</div>
            <div style="font-size: 12px; color: #6b6b6b; margin: 0 0 8px;">{{Your Title}}</div>
            <div style="font-size: 12px; color: #4a4a4a; line-height: 1.7;">
              <span style="color: #5CC8B8; font-weight: 600;">M</span>&ensp;{{+61 XXX XXX XXX}}<br />
              <span style="color: #5CC8B8; font-weight: 600;">E</span>&ensp;<a href="mailto:{{email@strategiatech.com}}" style="color: #00192E; text-decoration: none;">{{email@strategiatech.com}}</a><br />
              <span style="color: #5CC8B8; font-weight: 600;">W</span>&ensp;<a href="https://strategiatech.com" style="color: #006988; text-decoration: none;">strategiatech.com</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top: 12px; border-top: 1px solid #e4e4e4;">
      <div style="font-size: 11px; font-style: italic; color: #6b6b6b; line-height: 1.5;">
        Workforce Intelligence for organisations that refuse to accept guesswork as strategy.
      </div>
    </td>
  </tr>
</table>`

// Dark variant. The full signature sits inside a dark gradient panel so the
// glow inline logo can do its job. Uses opaque approximations of white/teal
// at fractional alphas because Outlook Desktop on Windows ignores rgba().
// `DARK_PANEL_INNER` is shared by the capped and full-width variants — only
// the outermost <table>'s width attribute and max-width style differ.
const DARK_PANEL_INNER = `<td bgcolor="#00192E" style="background-color: #00192E; background-image: linear-gradient(135deg, #1C1C1C 0%, #00192E 25%, #003D6B 50%, #006988 75%, #5CC8B8 100%); border-radius: 10px; padding: 28px 32px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #FFFFFF; font-size: 13px; line-height: 1.4;">
        <tr>
          <td style="padding-bottom: 18px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align: middle; padding-right: 20px;">
                  <img src="https://strategiatech.com/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png" alt="Strategia" width="220" style="display: block; height: auto;" />
                </td>
                <td style="width: 2px; vertical-align: middle;">
                  <div style="width: 2px; height: 58px; background-color: #5CC8B8;"></div>
                </td>
                <td style="vertical-align: middle; padding-left: 20px;">
                  <div style="font-size: 15px; font-weight: 700; color: #FFFFFF; margin: 0 0 3px;">{{Your Name}}</div>
                  <div style="font-size: 12px; color: #A5AEB6; margin: 0 0 10px;">{{Your Title}}</div>
                  <div style="font-size: 12px; color: #D8DBE0; line-height: 1.75;">
                    <span style="color: #5CC8B8; font-weight: 600;">M</span>&ensp;{{+61 XXX XXX XXX}}<br />
                    <span style="color: #5CC8B8; font-weight: 600;">E</span>&ensp;<a href="mailto:{{email@strategiatech.com}}" style="color: #FFFFFF; text-decoration: none;">{{email@strategiatech.com}}</a><br />
                    <span style="color: #5CC8B8; font-weight: 600;">W</span>&ensp;<a href="https://strategiatech.com" style="color: #5CC8B8; text-decoration: none;">strategiatech.com</a>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 14px; border-top: 1px solid #1E2B3A;">
            <div style="font-size: 11px; font-style: italic; color: #8C949C; line-height: 1.5;">
              Workforce Intelligence for organisations that refuse to accept guesswork as strategy.
            </div>
          </td>
        </tr>
      </table>
    </td>`

const SIGNATURE_HTML_DARK = `<table cellpadding="0" cellspacing="0" border="0" width="580" style="max-width: 580px; border-collapse: separate;">
  <tr>
    ${DARK_PANEL_INNER}
  </tr>
</table>`

// Full-width dark variant. Same panel, no width cap — the gradient spans
// whatever container the email client gives it (typically the full body width).
const SIGNATURE_HTML_DARK_WIDE = `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: separate;">
  <tr>
    ${DARK_PANEL_INNER}
  </tr>
</table>`

/* ─────────────────────────────────────────────────────────────
   DOWNLOAD / COPY HELPERS
   ───────────────────────────────────────────────────────────── */

function serializeSVG(el: SVGSVGElement): string {
  const s = new XMLSerializer()
  return '<?xml version="1.0" encoding="UTF-8"?>\n' + s.serializeToString(el)
}
function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}
function downloadSVG(el: SVGSVGElement, name: string) {
  downloadBlob(new Blob([serializeSVG(el)], { type: 'image/svg+xml' }), name)
}
function downloadPNG(el: SVGSVGElement, name: string, w: number, h: number) {
  const str = serializeSVG(el)
  const blob = new Blob([str], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const img = new Image()
  img.onload = () => {
    const dpr = 2
    const cvs = document.createElement('canvas')
    cvs.width = w * dpr
    cvs.height = h * dpr
    const _ctx = cvs.getContext('2d')
    if (!_ctx) return
    const ctx: CanvasRenderingContext2D = _ctx
    ctx.scale(dpr, dpr)
    ctx.drawImage(img, 0, 0, w, h)
    URL.revokeObjectURL(url)
    cvs.toBlob((b) => {
      if (b) downloadBlob(b, name)
    }, 'image/png')
  }
  img.src = url
}

/* ─────────────────────────────────────────────────────────────
   ICONS
   ───────────────────────────────────────────────────────────── */

function DownloadIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M8 2v8m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   SCATTER PRESETS
   ───────────────────────────────────────────────────────────── */

const TRIS_COMPANY: TriDeco[] = [
  { x: 60, y: -10, size: 110, rot: 12, op: 0.08 },
  { x: 940, y: 60, size: 95, rot: -18, op: 0.1 },
  { x: 200, y: 120, size: 55, rot: 35, op: 0.07 },
  { x: 1020, y: -6, size: 65, rot: -30, op: 0.08 },
]
const TRIS_PERSONAL: TriDeco[] = [
  { x: 30, y: 30, size: 170, rot: 8, op: 0.08 },
  { x: 1340, y: 180, size: 140, rot: -12, op: 0.1 },
  { x: 240, y: 260, size: 90, rot: 30, op: 0.07 },
  { x: 780, y: -20, size: 110, rot: -22, op: 0.08 },
  { x: 1080, y: 60, size: 75, rot: 40, op: 0.09 },
  { x: 1430, y: -10, size: 130, rot: 18, op: 0.07 },
]
const TRIS_CONF_DARK: TriDeco[] = [
  { x: 80, y: 80, size: 360, rot: 6, op: 0.06 },
  { x: 1340, y: 460, size: 320, rot: -10, op: 0.07 },
  { x: 560, y: 720, size: 220, rot: 18, op: 0.05 },
  { x: 1560, y: 40, size: 180, rot: -25, op: 0.06 },
  { x: 280, y: 800, size: 160, rot: 12, op: 0.05 },
]
const TRIS_CONF_LIGHT: TriDeco[] = [
  { x: 80, y: 80, size: 360, rot: 6, op: 0.07 },
  { x: 1340, y: 460, size: 320, rot: -10, op: 0.08 },
  { x: 560, y: 720, size: 220, rot: 18, op: 0.06 },
  { x: 1560, y: 40, size: 180, rot: -25, op: 0.07 },
  { x: 280, y: 800, size: 160, rot: 12, op: 0.06 },
]
const TRIS_OG: TriDeco[] = [
  { x: 80, y: -20, size: 200, rot: 12, op: 0.08 },
  { x: 980, y: 360, size: 180, rot: -22, op: 0.09 },
  { x: 220, y: 460, size: 110, rot: 32, op: 0.07 },
  { x: 1100, y: -10, size: 120, rot: -15, op: 0.08 },
]
const TRIS_X: TriDeco[] = [
  { x: 60, y: 20, size: 200, rot: 10, op: 0.08 },
  { x: 1220, y: 220, size: 180, rot: -14, op: 0.09 },
  { x: 360, y: 320, size: 100, rot: 30, op: 0.07 },
  { x: 1400, y: -10, size: 130, rot: -22, op: 0.08 },
]
const TRIS_SQUARE: TriDeco[] = [
  { x: 80, y: 40, size: 220, rot: 12, op: 0.07 },
  { x: 760, y: 760, size: 240, rot: -16, op: 0.08 },
  { x: 880, y: 60, size: 130, rot: 28, op: 0.07 },
  { x: 80, y: 760, size: 160, rot: -8, op: 0.07 },
]

/* ─────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────── */

export default function BrandAssetsPage() {
  // Refs for downloadable SVGs.
  const linkedinCompanyRef = useRef<SVGSVGElement>(null)
  const linkedinPersonalRef = useRef<SVGSVGElement>(null)
  const confDarkRef = useRef<SVGSVGElement>(null)
  const confLightRef = useRef<SVGSVGElement>(null)
  const openGraphRef = useRef<SVGSVGElement>(null)
  const xHeaderRef = useRef<SVGSVGElement>(null)
  const squareRef = useRef<SVGSVGElement>(null)

  type SigVariant = 'light' | 'dark' | 'dark-wide'
  const [copied, setCopied] = useState<'' | SigVariant>('')
  const copyHTML = useCallback((variant: SigVariant) => {
    const html =
      variant === 'light'
        ? SIGNATURE_HTML_LIGHT
        : variant === 'dark'
          ? SIGNATURE_HTML_DARK
          : SIGNATURE_HTML_DARK_WIDE
    navigator.clipboard.writeText(html)
    setCopied(variant)
    setTimeout(() => setCopied(''), 2000)
  }, [])

  return (
    <div className="ba-page">
      {/* ════════ HERO ════════ */}
      <section className="ba-hero">
        <div className="ba-hero-glow" />
        <div className="container ba-hero-inner">
          <p className="ba-eyebrow">Brand Toolkit · V4 Dark Depth</p>
          <h1>Brand Assets</h1>
          <p className="ba-hero-sub">
            Download-ready signatures, banners, social cards, and call backgrounds.
            Every asset uses the V4 Dark Depth palette and the glow brand mark, so
            wherever Strategia shows up, it looks like Strategia.
          </p>
          <div className="ba-hero-jump">
            <a href="#email">Email</a>
            <a href="#linkedin">LinkedIn</a>
            <a href="#conf">Conference</a>
            <a href="#social">Social</a>
          </div>
        </div>
      </section>

      {/* ════════ ABOUT / BRAND LIBRARY ════════ */}
      <section className="ba-section" id="about">
        <div className="container">
          <div className="ba-section-label"><span>About this page</span></div>
          <h2>Ready-to-use, not reference</h2>
          <p className="ba-section-desc">
            This page is the everyday toolkit: signatures, banners, social cards, and
            call backgrounds that anyone on the team can copy or download and use the
            same day. Every asset is built on the V4 Dark Depth palette and uses the
            glow brand mark, so the brand stays consistent wherever Strategia shows
            up. If you need the underlying system instead — the full colour palette,
            gradient stops, logo library, typography, surface rules — go to the brand
            library.
          </p>
          <div className="ba-about-cta">
            <a href="/brand-v4" className="ba-link-arrow">
              Open the Strategia brand library
              <span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ════════ EMAIL SIGNATURE ════════ */}
      <section className="ba-section--alt" id="email">
        <div className="container">
          <div className="ba-section-label"><span>Email</span></div>
          <h2>Email Signature</h2>
          <p className="ba-section-desc">
            Three variants. Light is the safe default — sits cleanly on any inbox
            background and renders identically in every client. Dark capped wraps the
            signature in a contained Dark Depth panel so the glow logo can do its
            job. Dark full-width pushes that panel across the entire email body for
            a "brand sign-off bar" effect. Pick whichever fits the moment.
          </p>

          <SignatureCard
            variant="light"
            label="Light Variant"
            subLabel="Default — renders on any inbox background"
            html={SIGNATURE_HTML_LIGHT}
            copied={copied === 'light'}
            onCopy={() => copyHTML('light')}
          />
          <SignatureCard
            variant="dark"
            label="Dark Variant, Capped"
            subLabel="Brand-forward — 580px panel with glow logo"
            html={SIGNATURE_HTML_DARK}
            copied={copied === 'dark'}
            onCopy={() => copyHTML('dark')}
          />
          <SignatureCard
            variant="dark-wide"
            label="Dark Variant, Full-Width"
            subLabel="Brand sign-off bar — gradient spans the email body"
            html={SIGNATURE_HTML_DARK_WIDE}
            copied={copied === 'dark-wide'}
            onCopy={() => copyHTML('dark-wide')}
            caveat={
              <>
                <strong>Tradeoff.</strong> Looks great on first send. Two known
                downsides: <em>reply chains</em> quote your signature with a
                vertical bar or indent, so the full-width gradient collapses into
                a stretched narrow column inside the quote. <em>Outlook Desktop
                on Windows</em> ignores the gradient on full-width table
                backgrounds and falls back to a solid <code>#00192E</code> band,
                which still reads strong but loses the gradient depth. Other
                clients (Gmail, Apple Mail, Outlook Web / Mac, mobile) render
                the gradient as designed.
              </>
            }
          />

          <div className="ba-tips">
            <div className="ba-tip">
              <div className="ba-tip-label">Personalise</div>
              <p>
                Open the copied HTML in a plain-text editor. Replace
                {' {{Your Name}}'}, {' {{Your Title}}'},{' '}
                {' {{+61 XXX XXX XXX}}'}, and{' '}
                {' {{email@strategiatech.com}}'} with your details. Remove the
                curly braces entirely.
              </p>
            </div>
            <div className="ba-tip">
              <div className="ba-tip-label">Logos &amp; hosting</div>
              <p>
                Both variants reference their logos on strategiatech.com — the abyss
                inline PNG for light, the white-glow inline PNG for dark — so the
                images load in recipients&rsquo; inboxes with no extra setup.
              </p>
            </div>
            <div className="ba-tip">
              <div className="ba-tip-label">Dark variant in Outlook</div>
              <p>
                Outlook Desktop on Windows ignores the gradient and renders the
                panel as solid #00192E. Gmail, Apple Mail, and Outlook on Mac /
                Web render the full Dark Depth gradient. All clients render the
                dark background correctly.
              </p>
            </div>
            <div className="ba-tip">
              <div className="ba-tip-label">Gmail</div>
              <p>
                Settings (gear) &rarr; See all settings &rarr; Signature.
                Create a new signature, paste the HTML into the rich-text editor.
                Gmail renders the table layout automatically. Chrome gives the
                cleanest paste behaviour.
              </p>
            </div>
            <div className="ba-tip">
              <div className="ba-tip-label">Outlook (Desktop)</div>
              <p>
                File &rarr; Options &rarr; Mail &rarr; Signatures &rarr; New.
                If pasting flattens the layout, save the HTML as a .htm file,
                open it in a browser, select all, copy, then paste into the Outlook
                editor.
              </p>
            </div>
            <div className="ba-tip">
              <div className="ba-tip-label">Apple Mail</div>
              <p>
                Mail &rarr; Settings &rarr; Signatures. Create a placeholder
                signature, quit Mail, then edit the most recent .mailsignature file
                in ~/Library/Mail/V10/MailData/Signatures/ and lock it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ LINKEDIN COMPANY ════════ */}
      <section className="ba-section" id="linkedin">
        <div className="container">
          <div className="ba-section-label"><span>LinkedIn</span></div>
          <h2>Company Page Background</h2>
          <p className="ba-section-desc">
            Cover image for the Strategia LinkedIn company page at the platform&rsquo;s
            recommended 1128 &times; 191&nbsp;px. Click Download PNG, then on LinkedIn
            edit the cover photo and upload. Use PNG for compatibility; SVG is provided
            for designers who want to tweak before exporting.
          </p>

          <AssetCard
            title="LinkedIn Company Cover"
            dim="1128 × 191 px"
            onSVG={() => linkedinCompanyRef.current && downloadSVG(linkedinCompanyRef.current, 'strategia-linkedin-company.svg')}
            onPNG={() => linkedinCompanyRef.current && downloadPNG(linkedinCompanyRef.current, 'strategia-linkedin-company.png', 1128, 191)}
          >
            <svg
              ref={linkedinCompanyRef}
              xmlns="http://www.w3.org/2000/svg"
              width="1128"
              height="191"
              viewBox="0 0 1128 191"
            >
              <defs>
                <DarkDepthGradient id="bg-li-co" angle={135} />
                <GlowFilter id="glow-li-co" />
              </defs>
              <rect width="1128" height="191" fill="url(#bg-li-co)" />
              <ScatterTriangles data={TRIS_COMPANY} stroke="#FFFFFF" sw={1.5} />
              {/* Mark + wordmark centred horizontally */}
              <GlowTriangle
                x={400}
                y={62}
                size={68}
                filterId="glow-li-co"
                halo={C.teal}
                stroke={C.white}
                strokeWidth={1.6}
                haloWidth={2.2}
              />
              <Wordmark x={500} y={75} width={280} fill={C.white} />
              {/* Teal hairline */}
              <rect x="0" y="188" width="1128" height="3" fill={C.teal} opacity="0.85" />
            </svg>
          </AssetCard>
        </div>
      </section>

      {/* ════════ LINKEDIN PERSONAL ════════ */}
      <section className="ba-section--alt">
        <div className="container">
          <div className="ba-section-label"><span>LinkedIn</span></div>
          <h2>Personal Profile Background</h2>
          <p className="ba-section-desc">
            For team members&rsquo; personal LinkedIn profiles at 1584 &times; 396&nbsp;px.
            The mark sits centred so the bottom-left avatar overlap stays clear,
            with the gradient&rsquo;s mid-tones keeping the wordmark high-contrast.
            Upload the PNG via the camera icon on your LinkedIn banner.
          </p>

          <AssetCard
            title="LinkedIn Personal Cover"
            dim="1584 × 396 px"
            onSVG={() => linkedinPersonalRef.current && downloadSVG(linkedinPersonalRef.current, 'strategia-linkedin-personal.svg')}
            onPNG={() => linkedinPersonalRef.current && downloadPNG(linkedinPersonalRef.current, 'strategia-linkedin-personal.png', 1584, 396)}
          >
            <svg
              ref={linkedinPersonalRef}
              xmlns="http://www.w3.org/2000/svg"
              width="1584"
              height="396"
              viewBox="0 0 1584 396"
            >
              <defs>
                <DarkDepthGradient id="bg-li-pe" angle={135} />
                <GlowFilter id="glow-li-pe" scale={1.3} />
                {/* Accent shifted to the bottom-right so the brand mark in the top-left
                    keeps the darkest gradient stops behind it for maximum contrast. */}
                <radialGradient id="li-pe-accent" cx="0.85" cy="0.85" r="0.45">
                  <stop offset="0%" stopColor={C.teal} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={C.teal} stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1584" height="396" fill="url(#bg-li-pe)" />
              <rect width="1584" height="396" fill="url(#li-pe-accent)" />
              <ScatterTriangles data={TRIS_PERSONAL} stroke="#FFFFFF" sw={1.5} />
              {/* Mark centred horizontally (group spans x 502-1082 on a 1584-wide canvas).
                  The LinkedIn avatar circle sits bottom-left around x 70-230, y 240-396,
                  so a centred lockup clears it entirely while the 135deg gradient keeps
                  the centre in the dark-navy stops for clean contrast on the wordmark. */}
              <GlowTriangle
                x={502}
                y={70}
                size={120}
                filterId="glow-li-pe"
                halo={C.teal}
                stroke={C.white}
                strokeWidth={1.8}
                haloWidth={2.4}
              />
              <Wordmark x={662} y={100} width={420} fill={C.white} />
              <line x1={662} y1={186} x2={1082} y2={186} stroke={C.teal} strokeOpacity="0.7" strokeWidth="2" />
              <text
                x={662}
                y={222}
                fill="#FFFFFF"
                fillOpacity="0.82"
                fontFamily="var(--font-inter, Inter, sans-serif)"
                fontSize="22"
                fontWeight={400}
                letterSpacing="0.04em"
              >
                Workforce Intelligence
              </text>
            </svg>
          </AssetCard>
        </div>
      </section>

      {/* ════════ CONFERENCE — DARK ════════ */}
      <section className="ba-section" id="conf">
        <div className="container">
          <div className="ba-section-label"><span>Video Calls</span></div>
          <h2>Conference Call Background, Dark</h2>
          <p className="ba-section-desc">
            Full HD (1920 &times; 1080&nbsp;px) virtual background for Google Meet,
            Microsoft Teams, and Zoom. The mark sits bottom-right so the centre of the
            frame stays on your face. The light variant below is offered for callers
            on lighter setups; pick whichever reads better against your room.
          </p>

          <AssetCard
            title="Virtual Background, Dark"
            dim="1920 × 1080 px (Full HD)"
            onSVG={() => confDarkRef.current && downloadSVG(confDarkRef.current, 'strategia-virtual-background-dark.svg')}
            onPNG={() => confDarkRef.current && downloadPNG(confDarkRef.current, 'strategia-virtual-background-dark.png', 1920, 1080)}
          >
            <svg
              ref={confDarkRef}
              xmlns="http://www.w3.org/2000/svg"
              width="1920"
              height="1080"
              viewBox="0 0 1920 1080"
            >
              <defs>
                <DarkDepthGradient id="bg-conf-d" angle={135} />
                <GlowFilter id="glow-conf-d" scale={1.4} />
                {/* Accent pushed to bottom-right so the top-left brand stamp sits over
                    the darkest gradient stops — best contrast for the glow mark. */}
                <radialGradient id="conf-d-accent" cx="0.85" cy="0.9" r="0.45">
                  <stop offset="0%" stopColor={C.teal} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={C.teal} stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1920" height="1080" fill="url(#bg-conf-d)" />
              <rect width="1920" height="1080" fill="url(#conf-d-accent)" />
              <ScatterTriangles data={TRIS_CONF_DARK} stroke="#FFFFFF" sw={2} />
              {/* Top-left placement keeps the brand off the speaker's face (centre of the
                  frame) and over the darkest gradient stops for clear contrast. */}
              <GlowTriangle
                x={60}
                y={60}
                size={80}
                filterId="glow-conf-d"
                halo={C.teal}
                stroke={C.white}
                strokeWidth={1.6}
                haloWidth={2.4}
              />
              <Wordmark x={172} y={86} width={170} fill={C.white} />
            </svg>
          </AssetCard>
        </div>
      </section>

      {/* ════════ CONFERENCE — LIGHT ════════ */}
      <section className="ba-section--alt">
        <div className="container">
          <div className="ba-section-label"><span>Video Calls</span></div>
          <h2>Conference Call Background, Light</h2>
          <p className="ba-section-desc">
            Same Full HD frame, lighter palette. Pair this with a darker outfit or a
            window-lit room. The triangle keeps the navy stroke from the brand palette
            rather than glowing teal so it reads cleanly against the soft background.
          </p>

          <AssetCard
            title="Virtual Background, Light"
            dim="1920 × 1080 px (Full HD)"
            onSVG={() => confLightRef.current && downloadSVG(confLightRef.current, 'strategia-virtual-background-light.svg')}
            onPNG={() => confLightRef.current && downloadPNG(confLightRef.current, 'strategia-virtual-background-light.png', 1920, 1080)}
          >
            <svg
              ref={confLightRef}
              xmlns="http://www.w3.org/2000/svg"
              width="1920"
              height="1080"
              viewBox="0 0 1920 1080"
            >
              <defs>
                <LightGradient id="bg-conf-l" />
                <radialGradient id="conf-l-accent" cx="0.78" cy="0.85" r="0.45">
                  <stop offset="0%" stopColor={C.teal} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={C.teal} stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1920" height="1080" fill="url(#bg-conf-l)" />
              <rect width="1920" height="1080" fill="url(#conf-l-accent)" />
              <ScatterTriangles data={TRIS_CONF_LIGHT} stroke={C.navyBlack} sw={2} />
              {/* Mirrors the dark variant's top-left placement so the two backgrounds
                  feel like a matched pair. */}
              <SolidTriangle
                x={60}
                y={60}
                size={80}
                color={C.navyBlack}
                strokeWidth={1.8}
              />
              <Wordmark x={172} y={86} width={170} fill={C.navyBlack} />
            </svg>
          </AssetCard>
        </div>
      </section>

      {/* ════════ OPEN GRAPH ════════ */}
      <section className="ba-section" id="social">
        <div className="container">
          <div className="ba-section-label"><span>Social</span></div>
          <h2>Open Graph Share Card</h2>
          <p className="ba-section-desc">
            The image shown when strategiatech.com is shared on Slack, LinkedIn, X,
            iMessage, or any platform that reads Open Graph tags. 1200 &times; 630&nbsp;px,
            the universal social-share spec. Drop this into{' '}
            <code>&lt;meta property=&quot;og:image&quot;&gt;</code> and the same tag for
            Twitter cards.
          </p>

          <AssetCard
            title="Open Graph / og:image"
            dim="1200 × 630 px"
            onSVG={() => openGraphRef.current && downloadSVG(openGraphRef.current, 'strategia-og-image.svg')}
            onPNG={() => openGraphRef.current && downloadPNG(openGraphRef.current, 'strategia-og-image.png', 1200, 630)}
          >
            <svg
              ref={openGraphRef}
              xmlns="http://www.w3.org/2000/svg"
              width="1200"
              height="630"
              viewBox="0 0 1200 630"
            >
              <defs>
                <DarkDepthGradient id="bg-og" angle={135} />
                <GlowFilter id="glow-og" scale={1.6} />
                <radialGradient id="og-accent" cx="0.78" cy="0.3" r="0.4">
                  <stop offset="0%" stopColor={C.teal} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={C.teal} stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1200" height="630" fill="url(#bg-og)" />
              <rect width="1200" height="630" fill="url(#og-accent)" />
              <ScatterTriangles data={TRIS_OG} stroke="#FFFFFF" sw={1.8} />
              <GlowTriangle
                x={540}
                y={130}
                size={120}
                filterId="glow-og"
                halo={C.teal}
                stroke={C.white}
                strokeWidth={2}
                haloWidth={2.6}
              />
              <Wordmark x={420} y={300} width={360} fill={C.white} />
              <text
                x={600}
                y={420}
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="var(--font-inter, Inter, sans-serif)"
                fontSize="32"
                fontWeight={400}
                letterSpacing="-0.01em"
              >
                AI-driven workforce intelligence
              </text>
              <text
                x={600}
                y={470}
                textAnchor="middle"
                fill={C.teal}
                fontFamily="var(--font-mono, JetBrains Mono, monospace)"
                fontSize="14"
                fontWeight={600}
                letterSpacing="0.18em"
              >
                STRATEGIATECH.COM
              </text>
            </svg>
          </AssetCard>
        </div>
      </section>

      {/* ════════ X / TWITTER HEADER ════════ */}
      <section className="ba-section--alt">
        <div className="container">
          <div className="ba-section-label"><span>Social</span></div>
          <h2>X / Twitter Profile Header</h2>
          <p className="ba-section-desc">
            1500 &times; 500&nbsp;px header for the company X profile. The avatar
            overlaps the bottom-left, so the mark sits centre-right and the wordmark
            sits with it. Mobile X crops the top and bottom of the image — keep
            anything important inside the safe area in the middle 60% vertically.
          </p>

          <AssetCard
            title="X Profile Header"
            dim="1500 × 500 px"
            onSVG={() => xHeaderRef.current && downloadSVG(xHeaderRef.current, 'strategia-x-header.svg')}
            onPNG={() => xHeaderRef.current && downloadPNG(xHeaderRef.current, 'strategia-x-header.png', 1500, 500)}
          >
            <svg
              ref={xHeaderRef}
              xmlns="http://www.w3.org/2000/svg"
              width="1500"
              height="500"
              viewBox="0 0 1500 500"
            >
              <defs>
                <DarkDepthGradient id="bg-x" angle={135} />
                <GlowFilter id="glow-x" scale={1.4} />
                <radialGradient id="x-accent" cx="0.75" cy="0.4" r="0.45">
                  <stop offset="0%" stopColor={C.teal} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={C.teal} stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1500" height="500" fill="url(#bg-x)" />
              <rect width="1500" height="500" fill="url(#x-accent)" />
              <ScatterTriangles data={TRIS_X} stroke="#FFFFFF" sw={1.6} />
              <GlowTriangle
                x={840}
                y={180}
                size={100}
                filterId="glow-x"
                halo={C.teal}
                stroke={C.white}
                strokeWidth={1.8}
                haloWidth={2.5}
              />
              <Wordmark x={970} y={210} width={360} fill={C.white} />
              <text
                x={970}
                y={330}
                fill="#FFFFFF"
                fillOpacity="0.78"
                fontFamily="var(--font-inter, Inter, sans-serif)"
                fontSize="22"
                fontWeight={400}
              >
                Workforce Intelligence
              </text>
              <line x1={970} y1={290} x2={1330} y2={290} stroke={C.teal} strokeOpacity="0.7" strokeWidth="2" />
            </svg>
          </AssetCard>
        </div>
      </section>

      {/* ════════ SQUARE SOCIAL POST ════════ */}
      <section className="ba-section">
        <div className="container">
          <div className="ba-section-label"><span>Social</span></div>
          <h2>Square Social Post Template</h2>
          <p className="ba-section-desc">
            1080 &times; 1080&nbsp;px template for square LinkedIn or Instagram posts.
            Use it for announcements, hires, milestones, and event call-outs. Download
            the SVG and replace the headline copy with your message; keep the eyebrow
            and footer wordmark as-is so the post stays anchored to the brand.
          </p>

          <AssetCard
            title="Square Social Post"
            dim="1080 × 1080 px"
            onSVG={() => squareRef.current && downloadSVG(squareRef.current, 'strategia-square-social.svg')}
            onPNG={() => squareRef.current && downloadPNG(squareRef.current, 'strategia-square-social.png', 1080, 1080)}
          >
            <svg
              ref={squareRef}
              xmlns="http://www.w3.org/2000/svg"
              width="1080"
              height="1080"
              viewBox="0 0 1080 1080"
            >
              <defs>
                <DarkDepthGradient id="bg-sq" angle={135} />
                <GlowFilter id="glow-sq" scale={1.8} />
                <radialGradient id="sq-accent" cx="0.8" cy="0.2" r="0.5">
                  <stop offset="0%" stopColor={C.teal} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={C.teal} stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1080" height="1080" fill="url(#bg-sq)" />
              <rect width="1080" height="1080" fill="url(#sq-accent)" />
              <ScatterTriangles data={TRIS_SQUARE} stroke="#FFFFFF" sw={1.8} />
              {/* Top brand stamp */}
              <GlowTriangle
                x={80}
                y={80}
                size={68}
                filterId="glow-sq"
                halo={C.teal}
                stroke={C.white}
                strokeWidth={1.8}
                haloWidth={2.4}
              />
              <Wordmark x={180} y={102} width={240} fill={C.white} />
              {/* Eyebrow */}
              <text
                x={80}
                y={520}
                fill={C.teal}
                fontFamily="var(--font-mono, JetBrains Mono, monospace)"
                fontSize="22"
                fontWeight={600}
                letterSpacing="0.16em"
              >
                ANNOUNCEMENT
              </text>
              {/* Headline placeholder */}
              <text
                x={80}
                y={620}
                fill="#FFFFFF"
                fontFamily="var(--font-inter, Inter, sans-serif)"
                fontSize="76"
                fontWeight={400}
                letterSpacing="-0.025em"
              >
                Your headline
              </text>
              <text
                x={80}
                y={710}
                fill="#FFFFFF"
                fontFamily="var(--font-inter, Inter, sans-serif)"
                fontSize="76"
                fontWeight={400}
                letterSpacing="-0.025em"
              >
                goes here.
              </text>
              <line x1={80} y1={770} x2={400} y2={770} stroke={C.teal} strokeOpacity="0.85" strokeWidth="3" />
              {/* Footer */}
              <text
                x={80}
                y={1010}
                fill="#FFFFFF"
                fillOpacity="0.55"
                fontFamily="var(--font-mono, JetBrains Mono, monospace)"
                fontSize="18"
                fontWeight={500}
                letterSpacing="0.16em"
              >
                STRATEGIATECH.COM
              </text>
            </svg>
          </AssetCard>

          <div className="ba-tips">
            <div className="ba-tip">
              <div className="ba-tip-label">Editing copy</div>
              <p>
                Download the SVG, open it in Figma, Illustrator, or VS Code, and
                edit the &lt;text&gt; nodes for &ldquo;ANNOUNCEMENT&rdquo; and the
                headline. Re-export as PNG at 1080 &times; 1080 for upload.
              </p>
            </div>
            <div className="ba-tip">
              <div className="ba-tip-label">LinkedIn posts</div>
              <p>
                LinkedIn renders square images at full width on mobile feeds; keep
                the headline left-aligned and inside the inner 80&nbsp;px margin so
                nothing clips under the platform&rsquo;s reaction strip.
              </p>
            </div>
            <div className="ba-tip">
              <div className="ba-tip-label">Instagram</div>
              <p>
                Same 1080 &times; 1080 spec works for the Instagram feed. Carousel
                slides share the same dimensions, so you can copy this template per
                slide and vary the headline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="ba-footer">
        <p>STRATEGIA BRAND ASSETS · V4 DARK DEPTH</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   ASSET CARD WRAPPER
   ───────────────────────────────────────────────────────────── */

function SignatureCard({
  variant,
  label,
  subLabel,
  html,
  copied,
  onCopy,
  caveat,
}: {
  variant: 'light' | 'dark' | 'dark-wide'
  label: string
  subLabel: string
  html: string
  copied: boolean
  onCopy: () => void
  caveat?: React.ReactNode
}) {
  // Preview swaps the absolute logo URLs for same-origin paths so the images
  // resolve during dev/preview. The copied HTML keeps the absolute URLs.
  const previewHtml = html.replaceAll('https://strategiatech.com/images/', '/images/')
  // Both dark variants share the dark preview background.
  const previewVariant = variant === 'light' ? 'light' : 'dark'
  return (
    <div className={`ba-sig-card ba-sig-card--${variant}`}>
      <div className="ba-sig-card-header">
        <div>
          <div className="ba-sig-card-label">{label}</div>
          <div className="ba-sig-card-sub">{subLabel}</div>
        </div>
        <button className="ba-btn ba-btn--primary" onClick={onCopy}>
          {copied ? 'Copied' : 'Copy HTML'}
        </button>
      </div>
      {caveat && <div className="ba-sig-caveat">{caveat}</div>}
      <div className={`ba-sig-preview ba-sig-preview--${previewVariant}`}>
        <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
      </div>
      <details className="ba-sig-code-wrap">
        <summary>Show HTML</summary>
        <div className="ba-sig-code">
          <pre>{html}</pre>
        </div>
      </details>
    </div>
  )
}

function AssetCard({
  title,
  dim,
  onSVG,
  onPNG,
  children,
}: {
  title: string
  dim: string
  onSVG: () => void
  onPNG: () => void
  children: React.ReactNode
}) {
  return (
    <div className="ba-card">
      <div className="ba-preview">{children}</div>
      <div className="ba-card-footer">
        <div>
          <div className="ba-meta-title">{title}</div>
          <div className="ba-meta-dim">{dim}</div>
        </div>
        <div className="ba-actions">
          <button className="ba-btn ba-btn--secondary" onClick={onSVG} title="Download SVG">
            <DownloadIcon size={12} />
            <span>SVG</span>
          </button>
          <button className="ba-btn ba-btn--primary" onClick={onPNG} title="Download PNG">
            <DownloadIcon size={12} />
            <span>PNG</span>
          </button>
        </div>
      </div>
    </div>
  )
}

