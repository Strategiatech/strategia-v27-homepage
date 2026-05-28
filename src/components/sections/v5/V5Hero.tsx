'use client'

import { useEffect, useRef } from 'react'

/* ── Animation data (from V1 Hero) ── */
const KPI_SETS = [
  { open: 342, ttf: 38.2, gap: 127 },
  { open: 356, ttf: 37.8, gap: 134 },
  { open: 339, ttf: 39.1, gap: 121 },
  { open: 361, ttf: 36.9, gap: 141 },
  { open: 348, ttf: 38.6, gap: 130 },
]

const CHART_PATHS = [
  'M0,90 C40,85 80,72 120,78 160,84 200,60 240,68 280,76 320,48 360,55 400,62 440,40 480,45 520,50 560,30 600,35',
  'M0,88 C40,80 80,68 120,74 160,80 200,55 240,62 280,70 320,42 360,50 400,58 440,34 480,40 520,46 560,25 600,30',
  'M0,92 C40,88 80,76 120,82 160,88 200,65 240,72 280,78 320,52 360,58 400,66 440,44 480,50 520,54 560,35 600,40',
]

const HEATMAP_VALS = [
  [0.7, 0.4, 0.9, 0.6, 0.3, 0.8],
  [0.5, 0.8, 0.6, 0.9, 0.7, 0.4],
  [0.9, 0.3, 0.7, 0.4, 0.8, 0.6],
]

const FEED_MSGS = [
  { color: 'var(--signal)', text: 'New hire accepted — Senior Analyst, Global Ops' },
  { color: 'var(--amber)', text: 'Retention alert — 3 contractors ending Q3' },
  { color: 'var(--lemon)', text: 'Pipeline update — 12 candidates screened' },
  { color: 'var(--rose)', text: 'Gap risk — Night-shift Ops Lead, West Region' },
  { color: 'var(--signal)', text: 'Offer extended — Data Scientist, R&D' },
]

const SPARKLINE_SETS = [
  [4, 7, 5, 9, 6, 8, 3, 7, 5, 8],
  [6, 4, 8, 5, 7, 3, 9, 6, 4, 7],
  [3, 8, 6, 4, 9, 7, 5, 8, 6, 3],
]

export default function V5Hero() {
  const kpiOpenRef = useRef<HTMLSpanElement>(null)
  const kpiTtfRef = useRef<HTMLSpanElement>(null)
  const kpiGapRef = useRef<HTMLSpanElement>(null)
  const chartPathRef = useRef<SVGPathElement>(null)
  const chartFillRef = useRef<SVGPathElement>(null)
  const heatRefs = useRef<(HTMLDivElement | null)[]>([])
  const feedRef = useRef<HTMLDivElement>(null)
  const sparkRef = useRef<SVGPolylineElement>(null)
  const clockRef = useRef<HTMLSpanElement>(null)
  const retentionRef = useRef<HTMLSpanElement>(null)
  const fitRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let kpiIdx = 0, chartIdx = 0, heatIdx = 0, feedIdx = 0, sparkIdx = 0
    const timers: ReturnType<typeof setInterval>[] = []
    const pause = () => document.hidden

    function animateValue(el: HTMLElement | null, from: number, to: number, dur: number, fmt: (v: number) => string) {
      if (!el) return
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min((now - start) / dur, 1)
        const ease = 1 - Math.pow(1 - t, 3)
        el.textContent = fmt(from + (to - from) * ease)
        if (t < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    timers.push(setInterval(() => {
      if (pause()) return
      const prev = KPI_SETS[kpiIdx]
      kpiIdx = (kpiIdx + 1) % KPI_SETS.length
      const next = KPI_SETS[kpiIdx]
      animateValue(kpiOpenRef.current, prev.open, next.open, 380, v => Math.round(v).toLocaleString())
      animateValue(kpiGapRef.current, prev.gap, next.gap, 380, v => Math.round(v).toLocaleString())
      animateValue(kpiTtfRef.current, prev.ttf, next.ttf, 380, v => v.toFixed(1))
    }, 450))

    timers.push(setInterval(() => {
      if (pause()) return
      chartIdx = (chartIdx + 1) % CHART_PATHS.length
      const p = CHART_PATHS[chartIdx]
      if (chartPathRef.current) chartPathRef.current.setAttribute('d', p)
      if (chartFillRef.current) chartFillRef.current.setAttribute('d', p + ' L600,110 L0,110 Z')
    }, 700))

    timers.push(setInterval(() => {
      if (pause()) return
      heatIdx = (heatIdx + 1) % HEATMAP_VALS.length
      HEATMAP_VALS[heatIdx].forEach((v, i) => {
        const cell = heatRefs.current[i]
        if (cell) {
          cell.style.opacity = String(0.3 + v * 0.7)
          cell.style.background = v > 0.7 ? 'var(--lemon-600)' : v > 0.4 ? 'var(--lemon)' : 'rgba(252,240,153,0.3)'
        }
      })
    }, 200))

    timers.push(setInterval(() => {
      if (pause()) return
      feedIdx = (feedIdx + 1) % FEED_MSGS.length
      if (feedRef.current) {
        const msg = FEED_MSGS[feedIdx]
        feedRef.current.innerHTML = `<span style="width:5px;height:5px;border-radius:50%;background:${msg.color};flex-shrink:0"></span>${msg.text}`
        feedRef.current.style.opacity = '0'
        requestAnimationFrame(() => { if (feedRef.current) feedRef.current.style.opacity = '1' })
      }
    }, 650))

    timers.push(setInterval(() => {
      if (pause()) return
      sparkIdx = (sparkIdx + 1) % SPARKLINE_SETS.length
      if (sparkRef.current) {
        const pts = SPARKLINE_SETS[sparkIdx].map((v, i) => `${i * 5},${12 - v}`).join(' ')
        sparkRef.current.setAttribute('points', pts)
      }
    }, 110))

    timers.push(setInterval(() => {
      if (clockRef.current) {
        clockRef.current.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
      }
    }, 1000))

    timers.push(setInterval(() => {
      if (pause()) return
      if (retentionRef.current) retentionRef.current.textContent = `${82 + Math.floor(Math.random() * 8)}%`
    }, 1200))

    timers.push(setInterval(() => {
      if (pause()) return
      if (fitRef.current) fitRef.current.textContent = String(78 + Math.floor(Math.random() * 10))
    }, 1100))

    return () => timers.forEach(clearInterval)
  }, [])

  const setHeatRef = (i: number) => (el: HTMLDivElement | null) => { heatRefs.current[i] = el }

  /* ── Dark color tokens for inline styles ── */
  const dk = {
    surface: 'rgba(6,41,62,0.4)',
    surfaceLight: 'rgba(6,41,62,0.25)',
    line: 'rgba(236,237,235,0.08)',
    line2: 'rgba(236,237,235,0.18)',
    text: '#ECEDEB',
    muted: '#BFBFBE',
    dim: 'rgba(191,191,190,0.5)',
  }

  return (
    <section className="v5-hero" id="top">
      <div className="v5-hero-inner">
        {/* ── LEFT: Editorial copy ── */}
        <div className="v5-hero-copy">
          <div className="v3-eyebrow">
            <span className="dot" />
            AI-Native Workforce Intelligence
          </div>

          <h1>
            Intelligence that mirrors how{' '}
            <span className="accent">decisions are actually made.</span>
          </h1>

          <p className="v5-hero-sub">
            <strong>Strategia is the workforce intelligence platform built for enterprise healthcare operators.</strong>{' '}
            Triangulating behavioural, contextual, and structural data to eliminate execution risk where it matters most — the hiring decision.
          </p>

          <div className="v3-cta-group">
            <a href="#contact" className="v3-btn-primary">
              <span>Request Executive Briefing</span>
              <span>→</span>
            </a>
            <a href="#method" className="v3-btn-ghost">Explore Platform →</a>
          </div>
        </div>

        {/* ── RIGHT: Dark dashboard mockup ── */}
        <div className="v5-mockup-wrap">
          <div className="v5-mockup-glow" />

          {/* Floating card: Retention Signal */}
          <div className="v5-float-card" style={{ top: -12, left: -24, animationDelay: '0s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--signal)', animation: 'v3-pulse 2s infinite' }} />
              <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: dk.muted }}>RETENTION SIGNAL</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span ref={retentionRef} style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 300, color: dk.text, letterSpacing: '-0.02em' }}>86%</span>
              <span style={{ fontSize: 11, color: 'var(--signal)', fontWeight: 600 }}>▲ 4.2%</span>
            </div>
            <div style={{ fontSize: 11, color: dk.muted, marginTop: 2 }}>12-month predicted retention</div>
          </div>

          {/* Floating card: Job Fit */}
          <div className="v5-float-card" style={{ bottom: 24, right: -28, animationDelay: '-3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="44" height="44" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke={dk.line2} strokeWidth="5" />
                <circle cx="22" cy="22" r="18" fill="none" stroke="var(--lemon)" strokeWidth="5" strokeDasharray="91.1 113.1" strokeLinecap="round" transform="rotate(-90 22 22)" style={{ transition: 'stroke-dasharray 400ms ease' }} />
              </svg>
              <div>
                <div style={{ fontFamily: 'var(--font-monospace)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: dk.muted, marginBottom: 2 }}>JOB FIT</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span ref={fitRef} style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, color: dk.text, letterSpacing: '-0.02em' }}>81</span>
                  <span style={{ fontSize: 13, color: dk.muted, fontWeight: 500 }}>/ 100</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Main mockup ── */}
          <div className="v5-mockup">
            {/* Window chrome */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: `1px solid ${dk.line}`, background: dk.surfaceLight, fontSize: 11 }}>
              <span style={{ display: 'flex', gap: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,95,87,0.6)' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(254,188,46,0.6)' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(40,200,64,0.6)' }} />
              </span>
              <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-monospace)', fontSize: 10.5, color: dk.dim, letterSpacing: '0.02em' }}>
                app.strategia.tech/workforce
              </span>
            </div>

            <div style={{ display: 'flex', minHeight: 320 }}>
              {/* Side rail */}
              <div style={{ width: 48, background: 'var(--navy)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 6, flexShrink: 0 }}>
                <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, var(--lemon-600), var(--lemon))', display: 'grid', placeItems: 'center', marginBottom: 8 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <polygon points="6,0 12,10.4 0,10.4" stroke="var(--navy)" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                {[0.3, 0.3, 1, 0.3, 0.3].map((op, i) => (
                  <div key={i} style={{ width: 30, height: 30, background: op === 1 ? 'rgba(255,255,255,0.12)' : 'transparent', display: 'grid', placeItems: 'center', position: 'relative' }}>
                    <div style={{ width: 14, height: 2, borderRadius: 1, background: '#fff', opacity: op }} />
                    {op === 1 && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 14, borderRadius: '0 2px 2px 0', background: 'var(--lemon)' }} />}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div style={{ flex: 1, padding: '14px 16px 12px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: dk.dim }}>WORKFORCE · Q2 2026</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 9.5, fontFamily: 'var(--font-monospace)', color: 'var(--signal)', background: 'rgba(16,185,129,0.08)', padding: '2px 7px', fontWeight: 600, letterSpacing: '0.04em' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--signal)', animation: 'v3-pulse 2s infinite' }} />
                      LIVE
                    </span>
                    <span ref={clockRef} style={{ fontFamily: 'var(--font-monospace)', fontSize: 9.5, color: dk.dim }}>--:--:--</span>
                  </div>
                </div>

                <div style={{ fontSize: 14, fontWeight: 500, color: dk.text, letterSpacing: '-0.01em' }}>Talent pipeline — outlook</div>

                {/* KPI strip */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {[
                    { label: 'Open Reqs', ref: kpiOpenRef, val: '342', delta: '▲ 18', deltaColor: 'var(--rose)' },
                    { label: 'Time-to-Fill', ref: kpiTtfRef, val: '38.2', suffix: ' days', deltaColor: '' },
                    { label: 'Projected Gap', ref: kpiGapRef, val: '127', delta: 'FTEs', deltaColor: 'var(--amber)' },
                  ].map((kpi) => (
                    <div key={kpi.label} style={{ background: dk.surface, padding: '10px 12px' }}>
                      <div style={{ fontFamily: 'var(--font-monospace)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: dk.dim, marginBottom: 4 }}>{kpi.label}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span ref={kpi.ref} style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 300, color: dk.text, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{kpi.val}</span>
                        {kpi.suffix && <span style={{ fontSize: 10, color: dk.dim }}>{kpi.suffix}</span>}
                        {kpi.delta && <span style={{ fontSize: 10, color: kpi.deltaColor, fontWeight: 600 }}>{kpi.delta}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart + Heatmap */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 8, flex: 1 }}>
                  {/* Line chart */}
                  <div style={{ background: dk.surface, padding: '10px 12px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ fontFamily: 'var(--font-monospace)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: dk.dim, marginBottom: 6 }}>Hiring Velocity Forecast</div>
                    <svg viewBox="0 0 600 120" preserveAspectRatio="none" style={{ width: '100%', height: 72, display: 'block' }}>
                      <line x1="0" y1="30" x2="600" y2="30" stroke={dk.line} strokeWidth="0.5" />
                      <line x1="0" y1="60" x2="600" y2="60" stroke={dk.line} strokeWidth="0.5" />
                      <line x1="0" y1="90" x2="600" y2="90" stroke={dk.line} strokeWidth="0.5" />
                      <path ref={chartFillRef} d={CHART_PATHS[0] + ' L600,110 L0,110 Z'} fill="url(#v5chartGrad)" style={{ transition: 'd 600ms cubic-bezier(.2,.7,.2,1)' }} />
                      <path ref={chartPathRef} d={CHART_PATHS[0]} fill="none" stroke="var(--lemon)" strokeWidth="1.5" style={{ transition: 'd 600ms cubic-bezier(.2,.7,.2,1)' }} />
                      <defs>
                        <linearGradient id="v5chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--lemon)" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="var(--lemon)" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Heatmap */}
                  <div style={{ background: dk.surface, padding: '10px 12px' }}>
                    <div style={{ fontFamily: 'var(--font-monospace)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: dk.dim, marginBottom: 8 }}>Pipeline Heat by Role</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} ref={setHeatRef(i)} style={{ aspectRatio: '1', background: 'var(--lemon)', opacity: 0.5, transition: 'opacity 180ms, background 180ms' }} />
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4, marginTop: 4 }}>
                      {['SA', 'SWE', 'PM', 'OL', 'DS', 'FN'].map((r) => (
                        <div key={r} style={{ fontFamily: 'var(--font-monospace)', fontSize: 7.5, textAlign: 'center', color: dk.dim, letterSpacing: '0.04em' }}>{r}</div>
                      ))}
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg width="50" height="14" viewBox="0 0 50 14" style={{ overflow: 'visible' }}>
                        <polyline ref={sparkRef} points="0,8 5,4 10,6 15,3 20,7 25,5 30,2 35,6 40,4 45,7" fill="none" stroke="var(--lemon)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'points 100ms' }} />
                      </svg>
                      <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 8, color: dk.dim }}>7d trend</span>
                    </div>
                  </div>
                </div>

                {/* Activity ticker */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderTop: `1px solid ${dk.line}`, paddingTop: 8, minHeight: 22 }}>
                  <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 8.5, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: dk.dim, flexShrink: 0 }}>ACTIVITY</span>
                  <div ref={feedRef} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: dk.muted, transition: 'opacity 200ms', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--signal)', flexShrink: 0 }} />
                    New hire accepted — Senior Analyst, Global Ops
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="v5-hero-stats">
        <div className="v5-hero-stat">
          <div className="v5-hero-stat-val">80<span className="accent">%</span></div>
          <div className="v5-hero-stat-lbl">Decrease in HR Workflow</div>
        </div>
        <div className="v5-hero-stat">
          <div className="v5-hero-stat-val">&lt; 24<span className="accent"> Hrs</span></div>
          <div className="v5-hero-stat-lbl">Time to Shortlist</div>
        </div>
        <div className="v5-hero-stat">
          <div className="v5-hero-stat-val">100<span className="accent">%</span></div>
          <div className="v5-hero-stat-lbl">Psychometric Coverage</div>
        </div>
        <div className="v5-hero-stat">
          <div className="v5-hero-stat-val">11</div>
          <div className="v5-hero-stat-lbl">Platform Modules</div>
        </div>
      </div>
    </section>
  )
}
