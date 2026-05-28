'use client'

import { useEffect, useRef } from 'react'

/* ── Animation data ── */
const KPI_SETS = [
  { open: 342, ttf: 38.2, gap: 127 },
  { open: 356, ttf: 37.8, gap: 134 },
  { open: 339, ttf: 39.1, gap: 121 },
  { open: 361, ttf: 36.9, gap: 141 },
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
]

const SPARKLINE_SETS = [
  [4, 7, 5, 9, 6, 8, 3, 7, 5, 8],
  [6, 4, 8, 5, 7, 3, 9, 6, 4, 7],
  [3, 8, 6, 4, 9, 7, 5, 8, 6, 3],
]

const dk = {
  surface: 'rgba(6,41,62,0.4)',
  surfaceLight: 'rgba(6,41,62,0.25)',
  line: 'rgba(236,237,235,0.08)',
  line2: 'rgba(236,237,235,0.18)',
  text: '#ECEDEB',
  muted: '#BFBFBE',
  dim: 'rgba(191,191,190,0.5)',
}

/**
 * Reusable hero content block: editorial copy + animated dashboard mockup.
 * Each variant wraps this with a different atmospheric background.
 * Uses a unique `prefix` to namespace refs across multiple instances.
 */
export function HeroContent({ prefix }: { prefix: string }) {
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
        el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - t, 3)))
        if (t < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    timers.push(setInterval(() => {
      if (pause()) return
      const prev = KPI_SETS[kpiIdx]; kpiIdx = (kpiIdx + 1) % KPI_SETS.length; const next = KPI_SETS[kpiIdx]
      animateValue(kpiOpenRef.current, prev.open, next.open, 380, v => Math.round(v).toLocaleString())
      animateValue(kpiGapRef.current, prev.gap, next.gap, 380, v => Math.round(v).toLocaleString())
      animateValue(kpiTtfRef.current, prev.ttf, next.ttf, 380, v => v.toFixed(1))
    }, 450))

    timers.push(setInterval(() => {
      if (pause()) return
      chartIdx = (chartIdx + 1) % CHART_PATHS.length
      if (chartPathRef.current) chartPathRef.current.setAttribute('d', CHART_PATHS[chartIdx])
      if (chartFillRef.current) chartFillRef.current.setAttribute('d', CHART_PATHS[chartIdx] + ' L600,110 L0,110 Z')
    }, 700))

    timers.push(setInterval(() => {
      if (pause()) return
      heatIdx = (heatIdx + 1) % HEATMAP_VALS.length
      HEATMAP_VALS[heatIdx].forEach((v, i) => {
        const cell = heatRefs.current[i]
        if (cell) { cell.style.opacity = String(0.3 + v * 0.7); cell.style.background = v > 0.7 ? 'var(--lemon-600)' : v > 0.4 ? 'var(--lemon)' : 'rgba(252,240,153,0.3)' }
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
      if (sparkRef.current) sparkRef.current.setAttribute('points', SPARKLINE_SETS[sparkIdx].map((v, i) => `${i * 5},${12 - v}`).join(' '))
    }, 110))

    timers.push(setInterval(() => { if (clockRef.current) clockRef.current.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) }, 1000))
    timers.push(setInterval(() => { if (pause()) return; if (retentionRef.current) retentionRef.current.textContent = `${82 + Math.floor(Math.random() * 8)}%` }, 1200))
    timers.push(setInterval(() => { if (pause()) return; if (fitRef.current) fitRef.current.textContent = String(78 + Math.floor(Math.random() * 10)) }, 1100))

    return () => timers.forEach(clearInterval)
  }, [])

  const setHeatRef = (i: number) => (el: HTMLDivElement | null) => { heatRefs.current[i] = el }

  const gradId = `v6cg-${prefix}`

  return (
    <div className="v6-hero-content">
      <div className="v5-hero-inner">
        {/* ── LEFT: Editorial copy ── */}
        <div className="v5-hero-copy">
          <div className="v3-eyebrow"><span className="dot" />AI-Native Workforce Intelligence</div>
          <h1>Intelligence that mirrors how <span className="accent">decisions are actually made.</span></h1>
          <p className="v5-hero-sub"><strong>Strategia is the workforce intelligence platform built for enterprise healthcare operators.</strong> Triangulating behavioural, contextual, and structural data to eliminate execution risk where it matters most — the hiring decision.</p>
          <div className="v3-cta-group">
            <a href="#" className="v3-btn-primary"><span>Request Executive Briefing</span><span>→</span></a>
            <a href="#" className="v3-btn-ghost">Explore Platform →</a>
          </div>
        </div>

        {/* ── RIGHT: Dashboard mockup ── */}
        <div className="v5-mockup-wrap">
          <div className="v5-mockup-glow" />

          {/* Floating: Retention */}
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

          {/* Floating: Job Fit */}
          <div className="v5-float-card" style={{ bottom: 24, right: -28, animationDelay: '-3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="44" height="44" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke={dk.line2} strokeWidth="5" />
                <circle cx="22" cy="22" r="18" fill="none" stroke="var(--lemon)" strokeWidth="5" strokeDasharray="91.1 113.1" strokeLinecap="round" transform="rotate(-90 22 22)" />
              </svg>
              <div>
                <div style={{ fontFamily: 'var(--font-monospace)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: dk.muted, marginBottom: 2 }}>JOB FIT</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span ref={fitRef} style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, color: dk.text }}>81</span>
                  <span style={{ fontSize: 13, color: dk.muted, fontWeight: 500 }}>/ 100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main mockup */}
          <div className="v5-mockup">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: `1px solid ${dk.line}`, background: dk.surfaceLight }}>
              <span style={{ display: 'flex', gap: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,95,87,0.6)' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(254,188,46,0.6)' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(40,200,64,0.6)' }} />
              </span>
              <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-monospace)', fontSize: 10.5, color: dk.dim }}>app.strategia.tech/workforce</span>
            </div>

            <div style={{ display: 'flex', minHeight: 300 }}>
              {/* Side rail */}
              <div style={{ width: 48, background: 'var(--navy)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 6, flexShrink: 0 }}>
                <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, var(--lemon-600), var(--lemon))', display: 'grid', placeItems: 'center', marginBottom: 8 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polygon points="6,0 12,10.4 0,10.4" stroke="var(--navy)" strokeWidth="1.5" fill="none" /></svg>
                </div>
                {[0.3, 0.3, 1, 0.3, 0.3].map((op, i) => (
                  <div key={i} style={{ width: 30, height: 30, background: op === 1 ? 'rgba(255,255,255,0.12)' : 'transparent', display: 'grid', placeItems: 'center', position: 'relative' }}>
                    <div style={{ width: 14, height: 2, borderRadius: 1, background: '#fff', opacity: op }} />
                    {op === 1 && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 14, borderRadius: '0 2px 2px 0', background: 'var(--lemon)' }} />}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: '14px 16px 12px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: dk.dim }}>WORKFORCE · Q2 2026</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 9.5, fontFamily: 'var(--font-monospace)', color: 'var(--signal)', background: 'rgba(16,185,129,0.08)', padding: '2px 7px', fontWeight: 600 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--signal)', animation: 'v3-pulse 2s infinite' }} />LIVE
                    </span>
                    <span ref={clockRef} style={{ fontFamily: 'var(--font-monospace)', fontSize: 9.5, color: dk.dim }}>--:--:--</span>
                  </div>
                </div>

                <div style={{ fontSize: 14, fontWeight: 500, color: dk.text }}>Talent pipeline — outlook</div>

                {/* KPIs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {[
                    { label: 'Open Reqs', ref: kpiOpenRef, val: '342', delta: '▲ 18', dc: 'var(--rose)' },
                    { label: 'Time-to-Fill', ref: kpiTtfRef, val: '38.2', suffix: ' days', dc: '' },
                    { label: 'Projected Gap', ref: kpiGapRef, val: '127', delta: 'FTEs', dc: 'var(--amber)' },
                  ].map((k) => (
                    <div key={k.label} style={{ background: dk.surface, padding: '10px 12px' }}>
                      <div style={{ fontFamily: 'var(--font-monospace)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: dk.dim, marginBottom: 4 }}>{k.label}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span ref={k.ref} style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 300, color: dk.text, fontVariantNumeric: 'tabular-nums' }}>{k.val}</span>
                        {k.suffix && <span style={{ fontSize: 10, color: dk.dim }}>{k.suffix}</span>}
                        {k.delta && <span style={{ fontSize: 10, color: k.dc, fontWeight: 600 }}>{k.delta}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart + Heatmap */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 8, flex: 1 }}>
                  <div style={{ background: dk.surface, padding: '10px 12px', overflow: 'hidden' }}>
                    <div style={{ fontFamily: 'var(--font-monospace)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: dk.dim, marginBottom: 6 }}>Hiring Velocity</div>
                    <svg viewBox="0 0 600 120" preserveAspectRatio="none" style={{ width: '100%', height: 68, display: 'block' }}>
                      <line x1="0" y1="30" x2="600" y2="30" stroke={dk.line} strokeWidth="0.5" />
                      <line x1="0" y1="60" x2="600" y2="60" stroke={dk.line} strokeWidth="0.5" />
                      <line x1="0" y1="90" x2="600" y2="90" stroke={dk.line} strokeWidth="0.5" />
                      <path ref={chartFillRef} d={CHART_PATHS[0] + ' L600,110 L0,110 Z'} fill={`url(#${gradId})`} style={{ transition: 'd 600ms cubic-bezier(.2,.7,.2,1)' }} />
                      <path ref={chartPathRef} d={CHART_PATHS[0]} fill="none" stroke="var(--lemon)" strokeWidth="1.5" style={{ transition: 'd 600ms cubic-bezier(.2,.7,.2,1)' }} />
                      <defs><linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--lemon)" stopOpacity="0.18" /><stop offset="100%" stopColor="var(--lemon)" stopOpacity="0.02" /></linearGradient></defs>
                    </svg>
                  </div>

                  <div style={{ background: dk.surface, padding: '10px 12px' }}>
                    <div style={{ fontFamily: 'var(--font-monospace)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: dk.dim, marginBottom: 8 }}>Heat by Role</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
                      {Array.from({ length: 6 }).map((_, i) => <div key={i} ref={setHeatRef(i)} style={{ aspectRatio: '1', background: 'var(--lemon)', opacity: 0.5, transition: 'opacity 180ms, background 180ms' }} />)}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4, marginTop: 4 }}>
                      {['SA', 'SWE', 'PM', 'OL', 'DS', 'FN'].map((r) => <div key={r} style={{ fontFamily: 'var(--font-monospace)', fontSize: 7.5, textAlign: 'center', color: dk.dim }}>{r}</div>)}
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg width="50" height="14" viewBox="0 0 50 14" style={{ overflow: 'visible' }}><polyline ref={sparkRef} points="0,8 5,4 10,6 15,3 20,7 25,5 30,2 35,6 40,4 45,7" fill="none" stroke="var(--lemon)" strokeWidth="1.2" strokeLinecap="round" /></svg>
                      <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 8, color: dk.dim }}>7d trend</span>
                    </div>
                  </div>
                </div>

                {/* Activity */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderTop: `1px solid ${dk.line}`, paddingTop: 8, minHeight: 22 }}>
                  <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 8.5, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: dk.dim, flexShrink: 0 }}>ACTIVITY</span>
                  <div ref={feedRef} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: dk.muted, transition: 'opacity 200ms', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--signal)', flexShrink: 0 }} />New hire accepted — Senior Analyst, Global Ops
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="v5-hero-stats">
        {[
          { val: <>80<span className="accent">%</span></>, lbl: 'Decrease in HR Workflow' },
          { val: <>&lt; 24<span className="accent"> Hrs</span></>, lbl: 'Time to Shortlist' },
          { val: <>100<span className="accent">%</span></>, lbl: 'Psychometric Coverage' },
          { val: '11', lbl: 'Platform Modules' },
        ].map((s, i) => (
          <div key={i} className="v5-hero-stat">
            <div className="v5-hero-stat-val">{s.val}</div>
            <div className="v5-hero-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


/* ── Inline nav shown inside each variant ── */
function InlineNav() {
  return (
    <nav className="v6-inline-nav">
      <a href="#" className="logo-lockup">
        <svg className="logo-triangle" viewBox="0 0 28 24" fill="none">
          <path d="M14 2L26 22H2L14 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
        <span className="logo-wordmark">Strategia</span>
      </a>
      <ul className="v6-nav-links">
        <li><a href="#">Platform</a></li>
        <li><a href="#">Science</a></li>
        <li><a href="#">Solutions</a></li>
        <li><a href="#">Enterprise</a></li>
        <li><a href="#">About</a></li>
      </ul>
      <a href="#" className="v6-nav-cta">Request Briefing</a>
    </nav>
  )
}

/* ═══════════ VARIANT A — Aurora Drift ═══════════ */
export function VariantAurora() {
  return (
    <div className="v6-hero-variant">
      <InlineNav />
      <div className="v6-aurora">
        <div className="v6-aurora-blob" />
        <div className="v6-aurora-blob" />
        <div className="v6-aurora-blob" />
        <div className="v6-aurora-blob" />
      </div>
      <HeroContent prefix="a" />
    </div>
  )
}

/* ═══════════ VARIANT B — Mesh Gradient Pulse ═══════════ */
export function VariantMesh() {
  return (
    <div className="v6-hero-variant">
      <InlineNav />
      <div className="v6-mesh">
        <div className="v6-mesh-layer" />
        <div className="v6-mesh-layer" />
        <div className="v6-mesh-layer" />
      </div>
      <HeroContent prefix="b" />
    </div>
  )
}

/* ═══════════ VARIANT C — Nebula Smoke ═══════════ */
export function VariantNebula() {
  return (
    <div className="v6-hero-variant">
      <InlineNav />
      <div className="v6-nebula">
        <div className="v6-nebula-cloud" />
        <div className="v6-nebula-cloud" />
        <div className="v6-nebula-cloud" />
        <div className="v6-nebula-cloud" />
        <div className="v6-nebula-cloud" />
      </div>
      <HeroContent prefix="c" />
    </div>
  )
}

/* ═══════════ VARIANT D — Orb Float ═══════════ */
export function VariantOrbs() {
  return (
    <div className="v6-hero-variant">
      <InlineNav />
      <div className="v6-orbs">
        <div className="v6-orb" />
        <div className="v6-orb" />
        <div className="v6-orb" />
        <div className="v6-orb" />
      </div>
      <HeroContent prefix="d" />
    </div>
  )
}

/* ═══════════ VARIANT E — Particle Field ═══════════ */
export function VariantParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let w = 0, h = 0

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const PARTICLE_COUNT = 80
    const CONNECTION_DIST = 140
    const MOUSE_RADIUS = 180

    interface Particle { x: number; y: number; vx: number; vy: number; r: number; color: string; baseAlpha: number }

    const colors = [
      'rgba(252,240,153,', // lemon
      'rgba(19,181,177,',  // teal
      'rgba(236,237,235,', // silver
      'rgba(6,41,62,',     // navy (dim)
    ]

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1.5 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      baseAlpha: 0.2 + Math.random() * 0.4,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Update + draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        // Mouse repulsion + glow
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        let alpha = p.baseAlpha
        if (dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.8
          p.vx += (dx / dist) * force * 0.3
          p.vy += (dy / dist) * force * 0.3
          alpha = Math.min(1, p.baseAlpha + force * 0.6)
        }

        // Dampen velocity
        p.vx *= 0.995
        p.vy *= 0.995

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + alpha + ')'
        ctx.fill()

        // Glow halo on bright particles near mouse
        if (dist < MOUSE_RADIUS && alpha > 0.5) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
          ctx.fillStyle = p.color + (alpha * 0.15) + ')'
          ctx.fill()
        }
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.12
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(252,240,153,${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }
    canvas.parentElement!.addEventListener('mousemove', onMove)
    canvas.parentElement!.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.parentElement?.removeEventListener('mousemove', onMove)
      canvas.parentElement?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="v6-hero-variant">
      <InlineNav />
      <div className="v6-particles">
        <canvas ref={canvasRef} />
        <div className="v6-particles-glow" />
      </div>
      <HeroContent prefix="e" />
    </div>
  )
}

/* ═══════════ VARIANT F — Particle Triangle ═══════════ */
export function VariantTriParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const mouseActiveRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let w = 0, h = 0

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const MOUSE_RADIUS = 300
    const CONNECTION_DIST = 100

    interface Particle {
      homeX: number; homeY: number
      x: number; y: number
      vx: number; vy: number
      r: number; phase: number
      edge: boolean
      colorIdx: number
      baseAlpha: number
    }

    interface Spark {
      x: number; y: number; vx: number; vy: number
      life: number; maxLife: number; r: number; color: number[]
    }

    const colorBases = [
      [252, 240, 153],  // lemon
      [19, 181, 177],   // teal
      [236, 237, 235],  // silver
    ]

    // Triangle geometry
    let cx = 0, cy = 0, topX = 0, topY = 0, blX = 0, blY = 0, brX = 0, brY = 0

    function computeTriangle() {
      cx = w * 0.68; cy = h * 0.44
      const size = Math.min(w, h) * 0.44
      topX = cx; topY = cy - size * 0.55
      blX = cx - size * 0.54; blY = cy + size * 0.48
      brX = cx + size * 0.54; brY = cy + size * 0.48
    }

    // Check if point is inside the triangle
    function pointInTriangle(px: number, py: number): boolean {
      const d1 = (px - blX) * (topY - blY) - (topX - blX) * (py - blY)
      const d2 = (px - brX) * (blY - brY) - (blX - brX) * (py - brY)
      const d3 = (px - topX) * (brY - topY) - (brX - topX) * (py - topY)
      const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0)
      const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0)
      return !(hasNeg && hasPos)
    }

    function generateParticles(): Particle[] {
      computeTriangle()
      const ps: Particle[] = []

      // Dense edge particles (60 per edge)
      const edgeCount = 60
      for (let i = 0; i <= edgeCount; i++) {
        const t = i / edgeCount
        ps.push(makePart(topX + (blX - topX) * t, topY + (blY - topY) * t, true))
        ps.push(makePart(topX + (brX - topX) * t, topY + (brY - topY) * t, true))
        ps.push(makePart(blX + (brX - blX) * t, blY + (brY - blY) * t, true))
      }

      // Interior (60)
      for (let i = 0; i < 60; i++) {
        let r1 = Math.random(), r2 = Math.random()
        if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2 }
        ps.push(makePart(
          topX + r1 * (blX - topX) + r2 * (brX - topX),
          topY + r1 * (blY - topY) + r2 * (brY - topY),
          false,
        ))
      }

      // Ambient (35)
      for (let i = 0; i < 35; i++) {
        const p = makePart(Math.random() * w, Math.random() * h, false)
        p.baseAlpha = 0.06 + Math.random() * 0.1
        p.r = 0.8 + Math.random() * 1.2
        ps.push(p)
      }

      return ps
    }

    function makePart(hx: number, hy: number, edge: boolean): Particle {
      return {
        homeX: hx, homeY: hy,
        x: hx + (Math.random() - 0.5) * 6,
        y: hy + (Math.random() - 0.5) * 6,
        vx: 0, vy: 0,
        r: edge ? (1.8 + Math.random() * 2.5) : (1 + Math.random() * 2),
        phase: Math.random() * Math.PI * 2,
        edge,
        colorIdx: Math.floor(Math.random() * colorBases.length),
        baseAlpha: edge ? (0.45 + Math.random() * 0.4) : (0.2 + Math.random() * 0.3),
      }
    }

    let particles = generateParticles()
    const sparks: Spark[] = []
    let time = 0
    let mouseInsideTri = false
    let chargeLevel = 0 // 0→1, how "charged" the triangle is from mouse proximity

    // Energy beam positions (travel along edges)
    const beams = [
      { progress: 0, speed: 0.4, color: [252, 240, 153] },
      { progress: 0.33, speed: 0.35, color: [19, 181, 177] },
      { progress: 0.66, speed: 0.45, color: [236, 237, 235] },
    ]

    function getEdgePoint(progress: number): [number, number] {
      const p = ((progress % 1) + 1) % 1
      const seg = p * 3
      const edgeIdx = Math.floor(seg) % 3
      const t = seg - edgeIdx
      const edges: [number, number][][] = [
        [[topX, topY], [brX, brY]],
        [[brX, brY], [blX, blY]],
        [[blX, blY], [topX, topY]],
      ]
      const [s, e] = edges[edgeIdx]
      return [s[0] + (e[0] - s[0]) * t, s[1] + (e[1] - s[1]) * t]
    }

    const draw = () => {
      // Trail effect: semi-transparent clear
      ctx.fillStyle = 'rgba(10,10,10,0.15)'
      ctx.fillRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mActive = mouseActiveRef.current
      time += 0.016

      // Check if mouse is inside triangle
      mouseInsideTri = mActive && pointInTriangle(mx, my)
      const targetCharge = mouseInsideTri ? 1 : (mActive ? 0.3 : 0)
      chargeLevel += (targetCharge - chargeLevel) * 0.03

      // ── Mouse proximity spotlight ──
      if (mActive) {
        const spotR = 200 + chargeLevel * 100
        const spotGrad = ctx.createRadialGradient(mx, my, 0, mx, my, spotR)
        const spotAlpha = 0.06 + chargeLevel * 0.08
        spotGrad.addColorStop(0, `rgba(252,240,153,${spotAlpha})`)
        spotGrad.addColorStop(0.4, `rgba(19,181,177,${spotAlpha * 0.5})`)
        spotGrad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = spotGrad
        ctx.beginPath()
        ctx.arc(mx, my, spotR, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── Triangle interior glow (charges up with mouse) ──
      const triBaseAlpha = 0.03 + 0.02 * Math.sin(time * 0.8)
      const triFillAlpha = triBaseAlpha + chargeLevel * 0.12
      ctx.beginPath()
      ctx.moveTo(topX, topY); ctx.lineTo(blX, blY); ctx.lineTo(brX, brY); ctx.closePath()
      const triGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.32)
      triGrad.addColorStop(0, `rgba(252,240,153,${triFillAlpha * 2})`)
      triGrad.addColorStop(0.5, `rgba(19,181,177,${triFillAlpha})`)
      triGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = triGrad
      ctx.fill()

      // Edge glow — brighter when charged
      const edgeAlpha = triBaseAlpha * 3 + chargeLevel * 0.15
      ctx.strokeStyle = `rgba(252,240,153,${edgeAlpha})`
      ctx.lineWidth = 1.5 + chargeLevel * 2
      ctx.stroke()

      // ── Energy beams traveling along edges ──
      for (const beam of beams) {
        beam.progress += beam.speed * 0.016 * (1 + chargeLevel * 0.5)
        const [bx, by] = getEdgePoint(beam.progress)
        const beamR = 30 + chargeLevel * 20
        const bGrad = ctx.createRadialGradient(bx, by, 0, bx, by, beamR)
        bGrad.addColorStop(0, `rgba(${beam.color[0]},${beam.color[1]},${beam.color[2]},${0.6 + chargeLevel * 0.3})`)
        bGrad.addColorStop(0.3, `rgba(${beam.color[0]},${beam.color[1]},${beam.color[2]},0.2)`)
        bGrad.addColorStop(1, `rgba(${beam.color[0]},${beam.color[1]},${beam.color[2]},0)`)
        ctx.fillStyle = bGrad
        ctx.fillRect(bx - beamR, by - beamR, beamR * 2, beamR * 2)
      }

      // ── Vertex flares ──
      const verts = [[topX, topY], [blX, blY], [brX, brY]]
      for (let vi = 0; vi < 3; vi++) {
        const [vx, vy] = verts[vi]
        const flareR = 20 + 12 * Math.sin(time * 1.5 + vi * 2.1) + chargeLevel * 15
        const flareA = 0.12 + 0.08 * Math.sin(time * 1.2 + vi * 1.7) + chargeLevel * 0.1
        const fGrad = ctx.createRadialGradient(vx, vy, 0, vx, vy, flareR)
        fGrad.addColorStop(0, `rgba(252,240,153,${flareA})`)
        fGrad.addColorStop(0.5, `rgba(19,181,177,${flareA * 0.4})`)
        fGrad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = fGrad
        ctx.fillRect(vx - flareR, vy - flareR, flareR * 2, flareR * 2)
      }

      // Color cycling
      const colorShift = time * 0.4

      // ── Particles ──
      for (const p of particles) {
        const distFC = Math.sqrt((p.homeX - cx) ** 2 + (p.homeY - cy) ** 2)
        // Bigger ripple wave
        const wave = Math.sin(time * 1.8 - distFC * 0.018 + p.phase) * (10 + chargeLevel * 6)
        const waveY = Math.cos(time * 1.4 - distFC * 0.014 + p.phase * 0.6) * (8 + chargeLevel * 5)

        // Spring toward home + wave
        p.vx += ((p.homeX + wave) - p.x) * 0.04
        p.vy += ((p.homeY + waveY) - p.y) * 0.04

        // Mouse interaction
        const dx_m = p.x - mx
        const dy_m = p.y - my
        const dist_m = Math.sqrt(dx_m * dx_m + dy_m * dy_m)
        let alpha = p.baseAlpha

        if (mActive && dist_m < MOUSE_RADIUS) {
          const force = (1 - dist_m / MOUSE_RADIUS)
          const forceSq = force * force

          if (mouseInsideTri) {
            // Inside triangle: attract particles toward mouse (swarm effect)
            p.vx -= (dx_m / dist_m) * forceSq * 3
            p.vy -= (dy_m / dist_m) * forceSq * 3
          } else {
            // Outside: repel particles (explosive scatter)
            p.vx += (dx_m / dist_m) * forceSq * 5
            p.vy += (dy_m / dist_m) * forceSq * 5
          }

          // Brighten significantly
          alpha = Math.min(1, p.baseAlpha + force * 0.8)

          // Emit sparks near mouse
          if (dist_m < 80 && Math.random() < 0.15) {
            sparks.push({
              x: p.x, y: p.y,
              vx: (Math.random() - 0.5) * 4 + p.vx * 0.5,
              vy: (Math.random() - 0.5) * 4 + p.vy * 0.5,
              life: 0.6 + Math.random() * 0.8,
              maxLife: 0.6 + Math.random() * 0.8,
              r: 0.8 + Math.random() * 1.2,
              color: colorBases[p.colorIdx],
            })
          }
        }

        // Charge boost — all particles glow brighter when charged
        alpha += chargeLevel * 0.15

        // Breathing
        alpha *= 0.7 + 0.3 * Math.sin(time * 2.5 + p.phase)
        alpha = Math.min(1, alpha)

        p.vx *= 0.87
        p.vy *= 0.87
        p.x += p.vx
        p.y += p.vy

        // Color cycling
        const ci = p.colorIdx
        const nextCi = (ci + 1) % colorBases.length
        const blend = (Math.sin(colorShift + p.phase) + 1) * 0.5
        const pr = Math.round(colorBases[ci][0] + (colorBases[nextCi][0] - colorBases[ci][0]) * blend)
        const pg = Math.round(colorBases[ci][1] + (colorBases[nextCi][1] - colorBases[ci][1]) * blend)
        const pb = Math.round(colorBases[ci][2] + (colorBases[nextCi][2] - colorBases[ci][2]) * blend)

        // Outer glow (large, always visible on edge particles)
        if (p.edge) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${pr},${pg},${pb},${alpha * 0.05})`
          ctx.fill()
        }

        // Mid glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${pr},${pg},${pb},${alpha * 0.18})`
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${pr},${pg},${pb},${alpha})`
        ctx.fill()
      }

      // ── Sparks ──
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i]
        sp.x += sp.vx; sp.y += sp.vy
        sp.vx *= 0.96; sp.vy *= 0.96
        sp.life -= 0.016
        if (sp.life <= 0) { sparks.splice(i, 1); continue }
        const sa = (sp.life / sp.maxLife) * 0.8
        // Spark glow
        ctx.beginPath()
        ctx.arc(sp.x, sp.y, sp.r * 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${sp.color[0]},${sp.color[1]},${sp.color[2]},${sa * 0.2})`
        ctx.fill()
        // Spark core
        ctx.beginPath()
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${sp.color[0]},${sp.color[1]},${sp.color[2]},${sa})`
        ctx.fill()
      }

      // ── Connections (edge particles nearby) ──
      for (let i = 0; i < particles.length; i++) {
        if (!particles[i].edge) continue
        for (let j = i + 1; j < particles.length; j++) {
          if (!particles[j].edge) continue
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < CONNECTION_DIST * CONNECTION_DIST) {
            const d = Math.sqrt(distSq)
            const op = (1 - d / CONNECTION_DIST) * (0.1 + chargeLevel * 0.08)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(252,240,153,${op})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      mouseActiveRef.current = true
    }
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
      mouseActiveRef.current = false
    }
    canvas.parentElement!.addEventListener('mousemove', onMove)
    canvas.parentElement!.addEventListener('mouseleave', onLeave)

    const onResize = () => { resize(); particles = generateParticles() }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', onResize)
      canvas.parentElement?.removeEventListener('mousemove', onMove)
      canvas.parentElement?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="v6-hero-variant">
      <InlineNav />
      <div className="v6-tri-particles">
        <canvas ref={canvasRef} />
        <div className="v6-tri-particles-ambient" />
      </div>
      <HeroContent prefix="f" />
    </div>
  )
}

/* ═══════════ VARIANT G — Glow Triangle ═══════════ */
export function VariantGlowTriangle() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let w = 0, h = 0

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Vertex sparks
    interface Spark { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; r: number; color: number[] }
    const sparks: Spark[] = []

    let time = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      time += 0.016

      // Triangle geometry — behind dashboard
      const cx = w * 0.68
      const cy = h * 0.44
      const size = Math.min(w, h) * 0.42
      const breath = 1 + Math.sin(time * 0.6) * 0.03
      const s = size * breath

      const topX = cx, topY = cy - s * 0.55
      const blX = cx - s * 0.52, blY = cy + s * 0.48
      const brX = cx + s * 0.52, brY = cy + s * 0.48
      const verts = [[topX, topY], [blX, blY], [brX, brY]]

      // ── Large background halo ──
      const haloR = s * 0.9
      const haloAlpha = 0.12 + 0.05 * Math.sin(time * 0.5)
      const haloGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR)
      // Color-cycling halo
      const hShift = (Math.sin(time * 0.25) + 1) * 0.5
      const hR = Math.round(252 + (19 - 252) * hShift)
      const hG = Math.round(240 + (181 - 240) * hShift)
      const hB = Math.round(153 + (177 - 153) * hShift)
      haloGrad.addColorStop(0, `rgba(${hR},${hG},${hB},${haloAlpha})`)
      haloGrad.addColorStop(0.4, `rgba(${hR},${hG},${hB},${haloAlpha * 0.4})`)
      haloGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = haloGrad
      ctx.fillRect(cx - haloR, cy - haloR, haloR * 2, haloR * 2)

      // ── Interior fill glow ──
      ctx.beginPath()
      ctx.moveTo(topX, topY); ctx.lineTo(blX, blY); ctx.lineTo(brX, brY); ctx.closePath()
      const fillAlpha = 0.04 + 0.03 * Math.sin(time * 0.7)
      const fillGrad = ctx.createLinearGradient(topX, topY, cx, blY)
      fillGrad.addColorStop(0, `rgba(252,240,153,${fillAlpha * 1.5})`)
      fillGrad.addColorStop(0.5, `rgba(19,181,177,${fillAlpha})`)
      fillGrad.addColorStop(1, `rgba(6,41,62,${fillAlpha * 0.5})`)
      ctx.fillStyle = fillGrad
      ctx.fill()

      // ── Multiple glow layers (thick blurred → thin crisp) ──
      const layers = [
        { blur: 40, width: 4, alpha: 0.2 },
        { blur: 20, width: 3, alpha: 0.35 },
        { blur: 8, width: 2, alpha: 0.5 },
        { blur: 2, width: 1, alpha: 0.7 },
      ]

      for (const layer of layers) {
        ctx.save()
        ctx.filter = `blur(${layer.blur}px)`

        // Color shift per layer for visual richness
        const lShift = (Math.sin(time * 0.4 + layer.blur * 0.1) + 1) * 0.5
        const lR = Math.round(252 + (19 - 252) * lShift)
        const lG = Math.round(240 + (181 - 240) * lShift)
        const lB = Math.round(153 + (177 - 153) * lShift)

        ctx.beginPath()
        ctx.moveTo(topX, topY); ctx.lineTo(blX, blY); ctx.lineTo(brX, brY); ctx.closePath()
        ctx.strokeStyle = `rgba(${lR},${lG},${lB},${layer.alpha})`
        ctx.lineWidth = layer.width
        ctx.stroke()

        ctx.restore()
      }

      // ── Energy pulse traveling along edges ──
      const edgeProgress = (time * 0.3) % 1 // 0→1 loops around the perimeter
      const edges = [
        [verts[0], verts[1]],
        [verts[1], verts[2]],
        [verts[2], verts[0]],
      ]
      // Total perimeter in 3 segments
      const totalProgress = edgeProgress * 3
      const edgeIdx = Math.floor(totalProgress) % 3
      const edgeT = totalProgress - edgeIdx
      const [eStart, eEnd] = edges[edgeIdx]
      const pulseX = eStart[0] + (eEnd[0] - eStart[0]) * edgeT
      const pulseY = eStart[1] + (eEnd[1] - eStart[1]) * edgeT

      // Draw energy pulse dot
      const pulseGrad = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 40)
      pulseGrad.addColorStop(0, 'rgba(252,240,153,0.8)')
      pulseGrad.addColorStop(0.3, 'rgba(252,240,153,0.3)')
      pulseGrad.addColorStop(1, 'rgba(252,240,153,0)')
      ctx.fillStyle = pulseGrad
      ctx.fillRect(pulseX - 40, pulseY - 40, 80, 80)

      // Second pulse offset
      const totalProgress2 = ((time * 0.3) + 0.5) % 1 * 3
      const edgeIdx2 = Math.floor(totalProgress2) % 3
      const edgeT2 = totalProgress2 - edgeIdx2
      const [eStart2, eEnd2] = edges[edgeIdx2]
      const pulse2X = eStart2[0] + (eEnd2[0] - eStart2[0]) * edgeT2
      const pulse2Y = eStart2[1] + (eEnd2[1] - eStart2[1]) * edgeT2

      const pulseGrad2 = ctx.createRadialGradient(pulse2X, pulse2Y, 0, pulse2X, pulse2Y, 30)
      pulseGrad2.addColorStop(0, 'rgba(19,181,177,0.7)')
      pulseGrad2.addColorStop(0.3, 'rgba(19,181,177,0.25)')
      pulseGrad2.addColorStop(1, 'rgba(19,181,177,0)')
      ctx.fillStyle = pulseGrad2
      ctx.fillRect(pulse2X - 30, pulse2Y - 30, 60, 60)

      // ── Rotating inner triangle ──
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(time * 0.15)
      const innerS = s * 0.35
      const iTop = [0, -innerS * 0.55]
      const iBl = [-innerS * 0.52, innerS * 0.48]
      const iBr = [innerS * 0.52, innerS * 0.48]
      ctx.beginPath()
      ctx.moveTo(iTop[0], iTop[1]); ctx.lineTo(iBl[0], iBl[1]); ctx.lineTo(iBr[0], iBr[1]); ctx.closePath()
      const innerAlpha = 0.1 + 0.06 * Math.sin(time * 0.9)
      ctx.strokeStyle = `rgba(252,240,153,${innerAlpha})`
      ctx.lineWidth = 1
      ctx.filter = 'blur(4px)'
      ctx.stroke()
      ctx.restore()

      // ── Vertex glow flares ──
      for (let vi = 0; vi < 3; vi++) {
        const [vx, vy] = verts[vi]
        const flareAlpha = 0.15 + 0.1 * Math.sin(time * 1.5 + vi * 2.1)
        const flareR = 25 + 10 * Math.sin(time * 1.2 + vi * 1.7)
        const vGrad = ctx.createRadialGradient(vx, vy, 0, vx, vy, flareR)
        vGrad.addColorStop(0, `rgba(252,240,153,${flareAlpha})`)
        vGrad.addColorStop(1, 'rgba(252,240,153,0)')
        ctx.fillStyle = vGrad
        ctx.fillRect(vx - flareR, vy - flareR, flareR * 2, flareR * 2)
      }

      // ── Emit sparks from vertices ──
      if (Math.random() < 0.3) {
        const vi = Math.floor(Math.random() * 3)
        const [vx, vy] = verts[vi]
        sparks.push({
          x: vx, y: vy,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 0.5,
          life: 1, maxLife: 1 + Math.random() * 1.5,
          r: 1 + Math.random() * 1.5,
          color: Math.random() > 0.5 ? [252, 240, 153] : [19, 181, 177],
        })
      }

      // Draw + update sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i]
        sp.x += sp.vx
        sp.y += sp.vy
        sp.vy += 0.02 // slight gravity
        sp.life -= 0.016
        if (sp.life <= 0) { sparks.splice(i, 1); continue }
        const a = (sp.life / sp.maxLife) * 0.6
        ctx.beginPath()
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${sp.color[0]},${sp.color[1]},${sp.color[2]},${a})`
        ctx.fill()
        // Spark glow
        ctx.beginPath()
        ctx.arc(sp.x, sp.y, sp.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${sp.color[0]},${sp.color[1]},${sp.color[2]},${a * 0.2})`
        ctx.fill()
      }

      // ── Floating secondary triangles ──
      const smallTris = [
        { offX: -s * 0.6, offY: -s * 0.3, sz: s * 0.18, speed: 0.12, rotSpeed: 0.3, phase: 0 },
        { offX: s * 0.55, offY: s * 0.35, sz: s * 0.12, speed: 0.09, rotSpeed: -0.25, phase: 2 },
        { offX: -s * 0.3, offY: s * 0.5, sz: s * 0.1, speed: 0.15, rotSpeed: 0.4, phase: 4 },
        { offX: s * 0.7, offY: -s * 0.15, sz: s * 0.08, speed: 0.11, rotSpeed: -0.35, phase: 1.5 },
      ]

      for (const st of smallTris) {
        const sx = cx + st.offX + Math.sin(time * st.speed + st.phase) * 20
        const sy = cy + st.offY + Math.cos(time * st.speed * 0.7 + st.phase) * 15
        const sAlpha = 0.08 + 0.06 * Math.sin(time * 0.5 + st.phase)
        ctx.save()
        ctx.translate(sx, sy)
        ctx.rotate(time * st.rotSpeed)
        const ss = st.sz
        ctx.beginPath()
        ctx.moveTo(0, -ss * 0.55)
        ctx.lineTo(-ss * 0.5, ss * 0.45)
        ctx.lineTo(ss * 0.5, ss * 0.45)
        ctx.closePath()
        ctx.strokeStyle = `rgba(252,240,153,${sAlpha})`
        ctx.lineWidth = 0.8
        ctx.filter = 'blur(2px)'
        ctx.stroke()
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="v6-hero-variant">
      <InlineNav />
      <div className="v6-glow-tri">
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      </div>
      <HeroContent prefix="g" />
    </div>
  )
}

/* ── Hero with editorial copy on left, empty right column (triangle shows through) ── */
function HeroNoDashboard() {
  return (
    <div className="v6-hero-content">
      <div className="v5-hero-inner">
        <div className="v5-hero-copy">
          <div className="v3-eyebrow"><span className="dot" />AI-Native Workforce Intelligence</div>
          <h1>Intelligence that mirrors how <span className="accent">decisions are actually made.</span></h1>
          <p className="v5-hero-sub"><strong>Strategia is the workforce intelligence platform built for enterprise healthcare operators.</strong> Triangulating behavioural, contextual, and structural data to eliminate execution risk where it matters most — the hiring decision.</p>
          <div className="v3-cta-group">
            <a href="#" className="v3-btn-primary"><span>Request Executive Briefing</span><span>→</span></a>
            <a href="#" className="v3-btn-ghost">Explore Platform →</a>
          </div>
        </div>
        {/* Right column intentionally empty — triangle animation shows through */}
        <div />
      </div>
      <div className="v5-hero-stats">
        {[
          { val: <>80<span className="accent">%</span></>, lbl: 'Decrease in HR Workflow' },
          { val: <>&lt; 24<span className="accent"> Hrs</span></>, lbl: 'Time to Shortlist' },
          { val: <>100<span className="accent">%</span></>, lbl: 'Psychometric Coverage' },
          { val: '11', lbl: 'Platform Modules' },
        ].map((s, i) => (
          <div key={i} className="v5-hero-stat">
            <div className="v5-hero-stat-val">{s.val}</div>
            <div className="v5-hero-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════ VARIANT H — Particle Triangle (no dashboard) ═══════════ */
export function VariantTriParticlesOnly() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const mouseActiveRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let w = 0, h = 0

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const MOUSE_RADIUS = 300
    const CONNECTION_DIST = 100

    interface Particle {
      homeX: number; homeY: number
      x: number; y: number
      vx: number; vy: number
      r: number; phase: number
      edge: boolean; colorIdx: number; baseAlpha: number
    }
    interface Spark {
      x: number; y: number; vx: number; vy: number
      life: number; maxLife: number; r: number; color: number[]
    }

    const colorBases = [[252,240,153],[19,181,177],[236,237,235]]

    // Triangle centred in the viewport (no dashboard to dodge)
    let cx = 0, cy = 0, topX = 0, topY = 0, blX = 0, blY = 0, brX = 0, brY = 0

    function computeTriangle() {
      cx = w * 0.68; cy = h * 0.44
      const size = Math.min(w, h) * 0.44
      topX = cx; topY = cy - size * 0.55
      blX = cx - size * 0.54; blY = cy + size * 0.48
      brX = cx + size * 0.54; brY = cy + size * 0.48
    }

    function pointInTriangle(px: number, py: number): boolean {
      const d1 = (px - blX) * (topY - blY) - (topX - blX) * (py - blY)
      const d2 = (px - brX) * (blY - brY) - (blX - brX) * (py - brY)
      const d3 = (px - topX) * (brY - topY) - (brX - topX) * (py - topY)
      return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0))
    }

    function generateParticles(): Particle[] {
      computeTriangle()
      const ps: Particle[] = []
      const edgeCount = 70
      for (let i = 0; i <= edgeCount; i++) {
        const t = i / edgeCount
        ps.push(makePart(topX + (blX - topX) * t, topY + (blY - topY) * t, true))
        ps.push(makePart(topX + (brX - topX) * t, topY + (brY - topY) * t, true))
        ps.push(makePart(blX + (brX - blX) * t, blY + (brY - blY) * t, true))
      }
      for (let i = 0; i < 70; i++) {
        let r1 = Math.random(), r2 = Math.random()
        if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2 }
        ps.push(makePart(topX + r1 * (blX - topX) + r2 * (brX - topX), topY + r1 * (blY - topY) + r2 * (brY - topY), false))
      }
      for (let i = 0; i < 40; i++) {
        const p = makePart(Math.random() * w, Math.random() * h, false)
        p.baseAlpha = 0.06 + Math.random() * 0.1; p.r = 0.8 + Math.random() * 1.2
        ps.push(p)
      }
      return ps
    }

    function makePart(hx: number, hy: number, edge: boolean): Particle {
      return { homeX: hx, homeY: hy, x: hx + (Math.random() - 0.5) * 6, y: hy + (Math.random() - 0.5) * 6, vx: 0, vy: 0, r: edge ? 1.8 + Math.random() * 2.5 : 1 + Math.random() * 2, phase: Math.random() * Math.PI * 2, edge, colorIdx: Math.floor(Math.random() * 3), baseAlpha: edge ? 0.45 + Math.random() * 0.4 : 0.2 + Math.random() * 0.3 }
    }

    let particles = generateParticles()
    const sparks: Spark[] = []
    let time = 0, chargeLevel = 0
    const beams = [{ progress: 0, speed: 0.4, color: [252,240,153] }, { progress: 0.33, speed: 0.35, color: [19,181,177] }, { progress: 0.66, speed: 0.45, color: [236,237,235] }]

    function getEdgePoint(progress: number): [number, number] {
      const p = ((progress % 1) + 1) % 1, seg = p * 3, ei = Math.floor(seg) % 3, t = seg - ei
      const edges: [number, number][][] = [[[topX, topY], [brX, brY]], [[brX, brY], [blX, blY]], [[blX, blY], [topX, topY]]]
      const [s, e] = edges[ei]
      return [s[0] + (e[0] - s[0]) * t, s[1] + (e[1] - s[1]) * t]
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10,10,10,0.15)'; ctx.fillRect(0, 0, w, h)
      const mx = mouseRef.current.x, my = mouseRef.current.y, mActive = mouseActiveRef.current
      time += 0.016
      const mouseInsideTri = mActive && pointInTriangle(mx, my)
      chargeLevel += ((mouseInsideTri ? 1 : mActive ? 0.3 : 0) - chargeLevel) * 0.03

      if (mActive) {
        const spotR = 200 + chargeLevel * 100, spotGrad = ctx.createRadialGradient(mx, my, 0, mx, my, spotR)
        spotGrad.addColorStop(0, `rgba(252,240,153,${0.06 + chargeLevel * 0.08})`); spotGrad.addColorStop(0.4, `rgba(19,181,177,${(0.06 + chargeLevel * 0.08) * 0.5})`); spotGrad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = spotGrad; ctx.beginPath(); ctx.arc(mx, my, spotR, 0, Math.PI * 2); ctx.fill()
      }

      const triBA = 0.03 + 0.02 * Math.sin(time * 0.8), triFill = triBA + chargeLevel * 0.12
      ctx.beginPath(); ctx.moveTo(topX, topY); ctx.lineTo(blX, blY); ctx.lineTo(brX, brY); ctx.closePath()
      const tg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.35)
      tg.addColorStop(0, `rgba(252,240,153,${triFill * 2})`); tg.addColorStop(0.5, `rgba(19,181,177,${triFill})`); tg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = tg; ctx.fill()
      ctx.strokeStyle = `rgba(252,240,153,${triBA * 3 + chargeLevel * 0.15})`; ctx.lineWidth = 1.5 + chargeLevel * 2; ctx.stroke()

      for (const beam of beams) {
        beam.progress += beam.speed * 0.016 * (1 + chargeLevel * 0.5)
        const [bx, by] = getEdgePoint(beam.progress), beamR = 30 + chargeLevel * 20
        const bg = ctx.createRadialGradient(bx, by, 0, bx, by, beamR)
        bg.addColorStop(0, `rgba(${beam.color},${0.6 + chargeLevel * 0.3})`); bg.addColorStop(0.3, `rgba(${beam.color},0.2)`); bg.addColorStop(1, `rgba(${beam.color},0)`)
        ctx.fillStyle = bg; ctx.fillRect(bx - beamR, by - beamR, beamR * 2, beamR * 2)
      }

      const verts = [[topX, topY], [blX, blY], [brX, brY]]
      for (let vi = 0; vi < 3; vi++) {
        const [vx, vy] = verts[vi], flareR = 20 + 12 * Math.sin(time * 1.5 + vi * 2.1) + chargeLevel * 15
        const fg = ctx.createRadialGradient(vx, vy, 0, vx, vy, flareR)
        fg.addColorStop(0, `rgba(252,240,153,${0.12 + 0.08 * Math.sin(time * 1.2 + vi * 1.7) + chargeLevel * 0.1})`); fg.addColorStop(0.5, `rgba(19,181,177,${(0.12 + 0.08 * Math.sin(time * 1.2 + vi * 1.7)) * 0.4})`); fg.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = fg; ctx.fillRect(vx - flareR, vy - flareR, flareR * 2, flareR * 2)
      }

      const cs = time * 0.4
      for (const p of particles) {
        const dfc = Math.sqrt((p.homeX - cx) ** 2 + (p.homeY - cy) ** 2)
        const wv = Math.sin(time * 1.8 - dfc * 0.018 + p.phase) * (10 + chargeLevel * 6)
        const wvY = Math.cos(time * 1.4 - dfc * 0.014 + p.phase * 0.6) * (8 + chargeLevel * 5)
        p.vx += ((p.homeX + wv) - p.x) * 0.04; p.vy += ((p.homeY + wvY) - p.y) * 0.04
        const dxm = p.x - mx, dym = p.y - my, dm = Math.sqrt(dxm * dxm + dym * dym)
        let alpha = p.baseAlpha
        if (mActive && dm < MOUSE_RADIUS) {
          const f = (1 - dm / MOUSE_RADIUS), fSq = f * f
          if (mouseInsideTri) { p.vx -= (dxm / dm) * fSq * 3; p.vy -= (dym / dm) * fSq * 3 }
          else { p.vx += (dxm / dm) * fSq * 5; p.vy += (dym / dm) * fSq * 5 }
          alpha = Math.min(1, p.baseAlpha + f * 0.8)
          if (dm < 80 && Math.random() < 0.15) sparks.push({ x: p.x, y: p.y, vx: (Math.random() - 0.5) * 4 + p.vx * 0.5, vy: (Math.random() - 0.5) * 4 + p.vy * 0.5, life: 0.6 + Math.random() * 0.8, maxLife: 0.6 + Math.random() * 0.8, r: 0.8 + Math.random() * 1.2, color: colorBases[p.colorIdx] })
        }
        alpha = Math.min(1, (alpha + chargeLevel * 0.15) * (0.7 + 0.3 * Math.sin(time * 2.5 + p.phase)))
        p.vx *= 0.87; p.vy *= 0.87; p.x += p.vx; p.y += p.vy
        const ci = p.colorIdx, nc = (ci + 1) % 3, bl = (Math.sin(cs + p.phase) + 1) * 0.5
        const cr = Math.round(colorBases[ci][0] + (colorBases[nc][0] - colorBases[ci][0]) * bl)
        const cg = Math.round(colorBases[ci][1] + (colorBases[nc][1] - colorBases[ci][1]) * bl)
        const cb = Math.round(colorBases[ci][2] + (colorBases[nc][2] - colorBases[ci][2]) * bl)
        if (p.edge) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2); ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha * 0.05})`; ctx.fill() }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha * 0.18})`; ctx.fill()
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`; ctx.fill()
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i]; sp.x += sp.vx; sp.y += sp.vy; sp.vx *= 0.96; sp.vy *= 0.96; sp.life -= 0.016
        if (sp.life <= 0) { sparks.splice(i, 1); continue }
        const sa = (sp.life / sp.maxLife) * 0.8
        ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r * 4, 0, Math.PI * 2); ctx.fillStyle = `rgba(${sp.color},${sa * 0.2})`; ctx.fill()
        ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${sp.color},${sa})`; ctx.fill()
      }
      for (let i = 0; i < particles.length; i++) {
        if (!particles[i].edge) continue
        for (let j = i + 1; j < particles.length; j++) {
          if (!particles[j].edge) continue
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dSq = dx * dx + dy * dy
          if (dSq < CONNECTION_DIST * CONNECTION_DIST) { const d = Math.sqrt(dSq); ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(252,240,153,${(1 - d / CONNECTION_DIST) * (0.1 + chargeLevel * 0.08)})`; ctx.lineWidth = 0.6; ctx.stroke() }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onMove = (e: MouseEvent) => { const r = canvas.parentElement!.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; mouseActiveRef.current = true }
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; mouseActiveRef.current = false }
    canvas.parentElement!.addEventListener('mousemove', onMove)
    canvas.parentElement!.addEventListener('mouseleave', onLeave)
    const onResize = () => { resize(); particles = generateParticles() }
    window.addEventListener('resize', onResize)

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('resize', onResize); canvas.parentElement?.removeEventListener('mousemove', onMove); canvas.parentElement?.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <div className="v6-hero-variant">
      <InlineNav />
      <div className="v6-tri-particles">
        <canvas ref={canvasRef} />
        <div className="v6-tri-particles-ambient" />
      </div>
      <HeroNoDashboard />
    </div>
  )
}

/* ═══════════ VARIANT I — Glow Triangle (no dashboard) ═══════════ */
export function VariantGlowTriangleOnly() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let w = 0, h = 0

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = rect.width; h = rect.height
      canvas.width = w * devicePixelRatio; canvas.height = h * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    interface Spark { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; r: number; color: number[] }
    const sparks: Spark[] = []
    let time = 0

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      time += 0.016

      // Triangle centred in viewport
      const cx = w * 0.68, cy = h * 0.44
      const size = Math.min(w, h) * 0.44
      const breath = 1 + Math.sin(time * 0.6) * 0.03
      const s = size * breath
      const topX = cx, topY = cy - s * 0.55
      const blX = cx - s * 0.52, blY = cy + s * 0.48
      const brX = cx + s * 0.52, brY = cy + s * 0.48
      const verts = [[topX, topY], [blX, blY], [brX, brY]]

      // Large halo
      const haloR = s * 0.95
      const hShift = (Math.sin(time * 0.25) + 1) * 0.5
      const hR = Math.round(252 + (19 - 252) * hShift), hG = Math.round(240 + (181 - 240) * hShift), hB = Math.round(153 + (177 - 153) * hShift)
      const haloA = 0.14 + 0.06 * Math.sin(time * 0.5)
      const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR)
      hg.addColorStop(0, `rgba(${hR},${hG},${hB},${haloA})`); hg.addColorStop(0.4, `rgba(${hR},${hG},${hB},${haloA * 0.4})`); hg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = hg; ctx.fillRect(cx - haloR, cy - haloR, haloR * 2, haloR * 2)

      // Interior fill
      ctx.beginPath(); ctx.moveTo(topX, topY); ctx.lineTo(blX, blY); ctx.lineTo(brX, brY); ctx.closePath()
      const fA = 0.04 + 0.03 * Math.sin(time * 0.7)
      const fg = ctx.createLinearGradient(topX, topY, cx, blY)
      fg.addColorStop(0, `rgba(252,240,153,${fA * 1.5})`); fg.addColorStop(0.5, `rgba(19,181,177,${fA})`); fg.addColorStop(1, `rgba(6,41,62,${fA * 0.5})`)
      ctx.fillStyle = fg; ctx.fill()

      // Glow edge layers
      const layers = [{ blur: 40, width: 4, alpha: 0.25 }, { blur: 20, width: 3, alpha: 0.4 }, { blur: 8, width: 2, alpha: 0.55 }, { blur: 2, width: 1.2, alpha: 0.75 }]
      for (const layer of layers) {
        ctx.save(); ctx.filter = `blur(${layer.blur}px)`
        const ls = (Math.sin(time * 0.4 + layer.blur * 0.1) + 1) * 0.5
        const lr = Math.round(252 + (19 - 252) * ls), lg = Math.round(240 + (181 - 240) * ls), lb = Math.round(153 + (177 - 153) * ls)
        ctx.beginPath(); ctx.moveTo(topX, topY); ctx.lineTo(blX, blY); ctx.lineTo(brX, brY); ctx.closePath()
        ctx.strokeStyle = `rgba(${lr},${lg},${lb},${layer.alpha})`; ctx.lineWidth = layer.width; ctx.stroke()
        ctx.restore()
      }

      // Energy pulses along edges
      const edges: [number, number][][] = [[[topX, topY], [brX, brY]], [[brX, brY], [blX, blY]], [[blX, blY], [topX, topY]]]
      const pulses = [{ p: (time * 0.3) % 1, color: [252, 240, 153], r: 35 }, { p: ((time * 0.3) + 0.5) % 1, color: [19, 181, 177], r: 28 }]
      for (const pulse of pulses) {
        const seg = pulse.p * 3, ei = Math.floor(seg) % 3, t = seg - ei
        const [ps, pe] = edges[ei]
        const px = ps[0] + (pe[0] - ps[0]) * t, py = ps[1] + (pe[1] - ps[1]) * t
        const pg = ctx.createRadialGradient(px, py, 0, px, py, pulse.r)
        pg.addColorStop(0, `rgba(${pulse.color},0.7)`); pg.addColorStop(0.3, `rgba(${pulse.color},0.25)`); pg.addColorStop(1, `rgba(${pulse.color},0)`)
        ctx.fillStyle = pg; ctx.fillRect(px - pulse.r, py - pulse.r, pulse.r * 2, pulse.r * 2)
      }

      // Rotating inner triangle
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(time * 0.15)
      const is = s * 0.38
      ctx.beginPath(); ctx.moveTo(0, -is * 0.55); ctx.lineTo(-is * 0.52, is * 0.48); ctx.lineTo(is * 0.52, is * 0.48); ctx.closePath()
      ctx.strokeStyle = `rgba(252,240,153,${0.1 + 0.06 * Math.sin(time * 0.9)})`; ctx.lineWidth = 1; ctx.filter = 'blur(4px)'; ctx.stroke()
      ctx.restore()

      // Vertex flares
      for (let vi = 0; vi < 3; vi++) {
        const [vx, vy] = verts[vi]
        const fr = 28 + 14 * Math.sin(time * 1.5 + vi * 2.1), fa = 0.15 + 0.1 * Math.sin(time * 1.2 + vi * 1.7)
        const vg = ctx.createRadialGradient(vx, vy, 0, vx, vy, fr)
        vg.addColorStop(0, `rgba(252,240,153,${fa})`); vg.addColorStop(1, 'rgba(252,240,153,0)')
        ctx.fillStyle = vg; ctx.fillRect(vx - fr, vy - fr, fr * 2, fr * 2)
      }

      // Vertex sparks
      if (Math.random() < 0.3) {
        const vi = Math.floor(Math.random() * 3), [vx, vy] = verts[vi]
        sparks.push({ x: vx, y: vy, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2 - 0.5, life: 1, maxLife: 1 + Math.random() * 1.5, r: 1 + Math.random() * 1.5, color: Math.random() > 0.5 ? [252, 240, 153] : [19, 181, 177] })
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i]; sp.x += sp.vx; sp.y += sp.vy; sp.vy += 0.02; sp.life -= 0.016
        if (sp.life <= 0) { sparks.splice(i, 1); continue }
        const a = (sp.life / sp.maxLife) * 0.6
        ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r * 3, 0, Math.PI * 2); ctx.fillStyle = `rgba(${sp.color},${a * 0.2})`; ctx.fill()
        ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${sp.color},${a})`; ctx.fill()
      }

      // Floating small triangles
      const smTris = [{ ox: -s * 0.65, oy: -s * 0.3, sz: s * 0.2, sp: 0.12, rs: 0.3, ph: 0 }, { ox: s * 0.6, oy: s * 0.35, sz: s * 0.14, sp: 0.09, rs: -0.25, ph: 2 }, { ox: -s * 0.35, oy: s * 0.55, sz: s * 0.11, sp: 0.15, rs: 0.4, ph: 4 }, { ox: s * 0.75, oy: -s * 0.2, sz: s * 0.09, sp: 0.11, rs: -0.35, ph: 1.5 }]
      for (const st of smTris) {
        const sx = cx + st.ox + Math.sin(time * st.sp + st.ph) * 20, sy = cy + st.oy + Math.cos(time * st.sp * 0.7 + st.ph) * 15
        ctx.save(); ctx.translate(sx, sy); ctx.rotate(time * st.rs)
        ctx.beginPath(); ctx.moveTo(0, -st.sz * 0.55); ctx.lineTo(-st.sz * 0.5, st.sz * 0.45); ctx.lineTo(st.sz * 0.5, st.sz * 0.45); ctx.closePath()
        ctx.strokeStyle = `rgba(252,240,153,${0.08 + 0.06 * Math.sin(time * 0.5 + st.ph)})`; ctx.lineWidth = 0.8; ctx.filter = 'blur(2px)'; ctx.stroke()
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div className="v6-hero-variant">
      <InlineNav />
      <div className="v6-glow-tri">
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      </div>
      <HeroNoDashboard />
    </div>
  )
}

/* ═══════════ VARIANT J — Concentric Particle Triangles ═══════════ */
export function VariantConcentricParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = canvasRef.current!
    const ctx = cvs.getContext('2d')!
    let raf = 0
    let W = 0, H = 0
    let mouse = { x: -9999, y: -9999 }

    const RING_COLORS: [number, number, number][] = [[252, 240, 153], [19, 181, 177], [236, 237, 235]]
    const RING_SCALES = [1.0, 0.62, 0.3]
    const RING_SPEEDS = [0.15, -0.25, 0.4]
    const RING_COUNTS = [90, 60, 35]

    type Particle = { angle: number; dist: number; edge: number; offset: number; r: number; baseR: number }
    type Spark = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; r: number; color: [number, number, number] }

    const rings: Particle[][] = RING_COUNTS.map(count =>
      Array.from({ length: count }, () => {
        const edge = Math.floor(Math.random() * 3)
        const t = Math.random()
        return { angle: 0, dist: 0, edge, offset: t, r: 1 + Math.random() * 2, baseR: 1 + Math.random() * 2 }
      })
    )
    const sparks: Spark[] = []
    const ambientParticles = Array.from({ length: 30 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: 0.5 + Math.random() * 1.5, a: 0.1 + Math.random() * 0.15
    }))

    function getTriVerts(cx: number, cy: number, s: number, rot: number): [number, number][] {
      return [0, 1, 2].map(i => {
        const a = rot + (i * Math.PI * 2) / 3 - Math.PI / 2
        return [cx + Math.cos(a) * s, cy + Math.sin(a) * s]
      }) as [number, number][]
    }

    function pointOnEdge(verts: [number, number][], edge: number, t: number): [number, number] {
      const a = verts[edge], b = verts[(edge + 1) % 3]
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const rect = cvs.getBoundingClientRect()
      W = rect.width; H = rect.height
      cvs.width = W * dpr; cvs.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      const r = cvs.getBoundingClientRect()
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    cvs.addEventListener('mousemove', onMove)
    cvs.addEventListener('mouseleave', () => { mouse = { x: -9999, y: -9999 } })

    let time = 0
    function draw() {
      time += 0.016
      ctx.fillStyle = 'rgba(10,10,10,0.12)'
      ctx.fillRect(0, 0, W, H)

      const cx = W * 0.68, cy = H * 0.44
      const baseSize = Math.min(W, H) * 0.32

      // Draw each ring
      for (let ri = 0; ri < 3; ri++) {
        const s = baseSize * RING_SCALES[ri]
        const rot = time * RING_SPEEDS[ri]
        const verts = getTriVerts(cx, cy, s, rot)
        const color = RING_COLORS[ri]
        const particles = rings[ri]

        // Faint triangle outline
        ctx.beginPath()
        ctx.moveTo(verts[0][0], verts[0][1])
        ctx.lineTo(verts[1][0], verts[1][1])
        ctx.lineTo(verts[2][0], verts[2][1])
        ctx.closePath()
        ctx.strokeStyle = `rgba(${color},${0.06 + 0.03 * Math.sin(time + ri)})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Particles
        for (const p of particles) {
          const wobble = Math.sin(time * 2 + p.offset * 10) * 4
          const [px, py] = pointOnEdge(verts, p.edge, p.offset)
          const nx = px + Math.sin(time + p.offset * 6) * wobble
          const ny = py + Math.cos(time + p.offset * 6) * wobble

          // Mouse scatter
          const dx = nx - mouse.x, dy = ny - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          let fx = nx, fy = ny
          if (dist < 120) {
            const force = (1 - dist / 120) * 25
            fx += (dx / dist) * force
            fy += (dy / dist) * force
            p.r = p.baseR * (1 + (1 - dist / 120) * 2)
            // Sparks on close approach
            if (dist < 60 && Math.random() < 0.15) {
              sparks.push({ x: fx, y: fy, vx: (dx / dist) * 2 + (Math.random() - 0.5), vy: (dy / dist) * 2 + (Math.random() - 0.5), life: 1, maxLife: 1 + Math.random(), r: 1 + Math.random(), color })
            }
          } else {
            p.r += (p.baseR - p.r) * 0.05
          }

          // Glow
          ctx.beginPath(); ctx.arc(fx, fy, p.r * 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${color},0.06)`; ctx.fill()
          // Core
          ctx.beginPath(); ctx.arc(fx, fy, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${color},${0.6 + 0.2 * Math.sin(time * 3 + p.offset * 5)})`; ctx.fill()
        }

        // Energy beams along edges
        for (let ei = 0; ei < 3; ei++) {
          const beamT = ((time * (0.3 + ri * 0.15) + ei * 0.33) % 1)
          const [bx, by] = pointOnEdge(verts, ei, beamT)
          const g = ctx.createRadialGradient(bx, by, 0, bx, by, 15)
          g.addColorStop(0, `rgba(${color},0.5)`)
          g.addColorStop(1, `rgba(${color},0)`)
          ctx.beginPath(); ctx.arc(bx, by, 15, 0, Math.PI * 2)
          ctx.fillStyle = g; ctx.fill()
        }
      }

      // Cross-ring connection lines (conduits)
      if (time % 0.1 < 0.02) {
        // Draw a few connections between rings
      }
      for (let ri = 0; ri < 2; ri++) {
        const s1 = baseSize * RING_SCALES[ri], s2 = baseSize * RING_SCALES[ri + 1]
        const rot1 = time * RING_SPEEDS[ri], rot2 = time * RING_SPEEDS[ri + 1]
        const v1 = getTriVerts(cx, cy, s1, rot1), v2 = getTriVerts(cx, cy, s2, rot2)
        for (let vi = 0; vi < 3; vi++) {
          const a = (0.4 + 0.2 * Math.sin(time * 1.5 + vi + ri * 2)) * 0.15
          ctx.beginPath(); ctx.moveTo(v1[vi][0], v1[vi][1]); ctx.lineTo(v2[vi][0], v2[vi][1])
          ctx.strokeStyle = `rgba(252,240,153,${a})`; ctx.lineWidth = 0.5; ctx.stroke()
        }
      }

      // Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i]; sp.x += sp.vx; sp.y += sp.vy; sp.vy += 0.02; sp.life -= 0.02
        if (sp.life <= 0) { sparks.splice(i, 1); continue }
        const a = (sp.life / sp.maxLife)
        ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${sp.color},${a * 0.15})`; ctx.fill()
        ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${sp.color},${a * 0.7})`; ctx.fill()
      }

      // Ambient particles
      for (const ap of ambientParticles) {
        ap.x += ap.vx / W; ap.y += ap.vy / H
        if (ap.x < 0 || ap.x > 1) ap.vx *= -1
        if (ap.y < 0 || ap.y > 1) ap.vy *= -1
        ctx.beginPath(); ctx.arc(ap.x * W, ap.y * H, ap.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(236,237,235,${ap.a})`; ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); cvs.removeEventListener('mousemove', onMove) }
  }, [])

  return (
    <div className="v6-hero-variant">
      <InlineNav />
      <div className="v6-glow-tri">
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      </div>
      <HeroNoDashboard />
    </div>
  )
}

/* ═══════════ VARIANT K — Beacon Triangle ═══════════ */
export function VariantBeaconTriangle() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = canvasRef.current!
    const ctx = cvs.getContext('2d')!
    let raf = 0
    let W = 0, H = 0
    let mouse = { x: -9999, y: -9999 }

    type Spark = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; r: number; color: [number, number, number] }
    const sparks: Spark[] = []

    function getTriVerts(cx: number, cy: number, s: number, rot: number): [number, number][] {
      return [0, 1, 2].map(i => {
        const a = rot + (i * Math.PI * 2) / 3 - Math.PI / 2
        return [cx + Math.cos(a) * s, cy + Math.sin(a) * s]
      }) as [number, number][]
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const rect = cvs.getBoundingClientRect()
      W = rect.width; H = rect.height
      cvs.width = W * dpr; cvs.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      const r = cvs.getBoundingClientRect()
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    cvs.addEventListener('mousemove', onMove)
    cvs.addEventListener('mouseleave', () => { mouse = { x: -9999, y: -9999 } })

    let time = 0
    function draw() {
      time += 0.016
      ctx.fillStyle = 'rgba(10,10,10,0.15)'
      ctx.fillRect(0, 0, W, H)

      const cx = W * 0.68, cy = H * 0.44
      const s = Math.min(W, H) * 0.32
      const verts = getTriVerts(cx, cy, s, 0)

      // Large pulsing core glow
      const coreR = s * (0.6 + 0.15 * Math.sin(time * 0.8))
      const coreG = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR)
      coreG.addColorStop(0, `rgba(252,240,153,${0.08 + 0.04 * Math.sin(time * 0.8)})`)
      coreG.addColorStop(0.4, `rgba(19,181,177,${0.04 + 0.02 * Math.sin(time * 1.2)})`)
      coreG.addColorStop(1, 'rgba(10,10,10,0)')
      ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2)
      ctx.fillStyle = coreG; ctx.fill()

      // Dashed circle rings
      const ringRadii = [s * 0.75, s * 1.1]
      const ringRotations = [time * 0.2, -time * 0.15]
      for (let ri = 0; ri < 2; ri++) {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(ringRotations[ri])
        ctx.setLineDash([8, 16])
        ctx.beginPath()
        ctx.arc(0, 0, ringRadii[ri], 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(236,237,235,${0.06 + 0.03 * Math.sin(time + ri)})`
        ctx.lineWidth = 0.8
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()
      }

      // Light RAYS from vertices
      for (let vi = 0; vi < 3; vi++) {
        const [vx, vy] = verts[vi]
        const angleFromCenter = Math.atan2(vy - cy, vx - cx)
        const rayLen = s * (0.8 + 0.3 * Math.sin(time * 1.5 + vi * 2))
        const spread = 0.18 + 0.05 * Math.sin(time * 2 + vi)
        const rayColor = vi === 0 ? [252, 240, 153] : vi === 1 ? [19, 181, 177] : [236, 237, 235]

        // Tapered fan shape
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(vx, vy)
        const endX1 = vx + Math.cos(angleFromCenter - spread) * rayLen
        const endY1 = vy + Math.sin(angleFromCenter - spread) * rayLen
        const endX2 = vx + Math.cos(angleFromCenter + spread) * rayLen
        const endY2 = vy + Math.sin(angleFromCenter + spread) * rayLen
        ctx.lineTo(endX1, endY1)
        ctx.lineTo(endX2, endY2)
        ctx.closePath()

        const rg = ctx.createRadialGradient(vx, vy, 0, vx, vy, rayLen)
        rg.addColorStop(0, `rgba(${rayColor},0.25)`)
        rg.addColorStop(0.3, `rgba(${rayColor},0.1)`)
        rg.addColorStop(1, `rgba(${rayColor},0)`)
        ctx.fillStyle = rg
        ctx.fill()
        ctx.restore()

        // Vertex flares
        const flareR = 6 + 4 * Math.sin(time * 3 + vi * 2.5)
        const fg = ctx.createRadialGradient(vx, vy, 0, vx, vy, flareR * 3)
        fg.addColorStop(0, `rgba(${rayColor},0.6)`)
        fg.addColorStop(0.3, `rgba(${rayColor},0.2)`)
        fg.addColorStop(1, `rgba(${rayColor},0)`)
        ctx.beginPath(); ctx.arc(vx, vy, flareR * 3, 0, Math.PI * 2)
        ctx.fillStyle = fg; ctx.fill()
        ctx.beginPath(); ctx.arc(vx, vy, flareR * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,0.8)`; ctx.fill()

        // Vertex sparks emitting outward
        if (Math.random() < 0.25) {
          const sa = angleFromCenter + (Math.random() - 0.5) * 0.8
          const speed = 1.5 + Math.random() * 2
          sparks.push({ x: vx, y: vy, vx: Math.cos(sa) * speed, vy: Math.sin(sa) * speed, life: 1, maxLife: 1.5 + Math.random(), r: 1 + Math.random() * 1.5, color: rayColor as [number, number, number] })
        }
      }

      // 4-layer edge glow
      for (let layer = 0; layer < 4; layer++) {
        const lw = [6, 3, 1.5, 0.5][layer]
        const la = [0.05, 0.12, 0.25, 0.6][layer]
        const blur = [12, 6, 2, 0][layer]
        ctx.save()
        if (blur > 0) ctx.filter = `blur(${blur}px)`
        ctx.beginPath()
        ctx.moveTo(verts[0][0], verts[0][1])
        ctx.lineTo(verts[1][0], verts[1][1])
        ctx.lineTo(verts[2][0], verts[2][1])
        ctx.closePath()
        ctx.strokeStyle = `rgba(252,240,153,${la})`
        ctx.lineWidth = lw
        ctx.stroke()
        ctx.filter = 'none'
        ctx.restore()
      }

      // Energy pulses along edges
      for (let ei = 0; ei < 3; ei++) {
        const pulseT = ((time * 0.4 + ei * 0.33) % 1)
        const a = verts[ei], b = verts[(ei + 1) % 3]
        const px = a[0] + (b[0] - a[0]) * pulseT
        const py = a[1] + (b[1] - a[1]) * pulseT
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 18)
        pg.addColorStop(0, `rgba(19,181,177,0.6)`)
        pg.addColorStop(0.5, `rgba(252,240,153,0.2)`)
        pg.addColorStop(1, `rgba(19,181,177,0)`)
        ctx.beginPath(); ctx.arc(px, py, 18, 0, Math.PI * 2)
        ctx.fillStyle = pg; ctx.fill()
      }

      // Rotating inner triangle
      const innerS = s * (0.35 + 0.05 * Math.sin(time * 0.6))
      const innerVerts = getTriVerts(cx, cy, innerS, time * 0.3)
      ctx.beginPath()
      ctx.moveTo(innerVerts[0][0], innerVerts[0][1])
      ctx.lineTo(innerVerts[1][0], innerVerts[1][1])
      ctx.lineTo(innerVerts[2][0], innerVerts[2][1])
      ctx.closePath()
      ctx.strokeStyle = `rgba(19,181,177,${0.15 + 0.08 * Math.sin(time * 1.2)})`
      ctx.lineWidth = 1; ctx.stroke()

      // Mouse interaction — attract glow
      const mdx = mouse.x - cx, mdy = mouse.y - cy
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
      if (mDist < s * 1.5 && mouse.x > 0) {
        const intensity = 1 - mDist / (s * 1.5)
        const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80)
        mg.addColorStop(0, `rgba(252,240,153,${intensity * 0.15})`)
        mg.addColorStop(1, 'rgba(252,240,153,0)')
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2)
        ctx.fillStyle = mg; ctx.fill()

        // Lens flare lines from vertices toward mouse
        for (let vi = 0; vi < 3; vi++) {
          const [vx, vy] = verts[vi]
          const d = Math.sqrt((mouse.x - vx) ** 2 + (mouse.y - vy) ** 2)
          if (d < s) {
            ctx.beginPath(); ctx.moveTo(vx, vy); ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(252,240,153,${(1 - d / s) * 0.08})`; ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }

      // Sparks update
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i]; sp.x += sp.vx; sp.y += sp.vy; sp.life -= 0.016
        if (sp.life <= 0) { sparks.splice(i, 1); continue }
        const a = (sp.life / sp.maxLife) * 0.7
        ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${sp.color},${a * 0.2})`; ctx.fill()
        ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${sp.color},${a})`; ctx.fill()
      }

      // Floating secondary triangles
      const floaters = [
        { ox: -s * 0.7, oy: -s * 0.35, sz: s * 0.18, sp: 0.1, rs: 0.2, ph: 0 },
        { ox: s * 0.65, oy: s * 0.4, sz: s * 0.13, sp: 0.08, rs: -0.3, ph: 2 },
        { ox: -s * 0.4, oy: s * 0.6, sz: s * 0.1, sp: 0.13, rs: 0.35, ph: 4 },
      ]
      for (const ft of floaters) {
        const fx = cx + ft.ox + Math.sin(time * ft.sp + ft.ph) * 15
        const fy = cy + ft.oy + Math.cos(time * ft.sp * 0.7 + ft.ph) * 12
        ctx.save(); ctx.translate(fx, fy); ctx.rotate(time * ft.rs)
        ctx.beginPath(); ctx.moveTo(0, -ft.sz * 0.55); ctx.lineTo(-ft.sz * 0.5, ft.sz * 0.45); ctx.lineTo(ft.sz * 0.5, ft.sz * 0.45); ctx.closePath()
        ctx.strokeStyle = `rgba(252,240,153,${0.06 + 0.04 * Math.sin(time * 0.5 + ft.ph)})`; ctx.lineWidth = 0.7
        ctx.filter = 'blur(1.5px)'; ctx.stroke()
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); cvs.removeEventListener('mousemove', onMove) }
  }, [])

  return (
    <div className="v6-hero-variant">
      <InlineNav />
      <div className="v6-glow-tri">
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      </div>
      <HeroNoDashboard />
    </div>
  )
}
