'use client'

import { useEffect, useRef, useCallback } from 'react'

/* ── Brand color constants ── */
const NAVY = '#06293E'
const TEAL = '#13B5B1'
const TEAL_300 = '#6ed9d6'
const LEMON = '#FCF099'
const LEMON_600 = '#f5e54d'
const GRAPHITE_400 = '#6b6b6b'
const GRAPHITE_500 = '#4a4a4a'
const GRAPHITE_100 = '#e4e4e4'

/* ── Dashboard color tokens ── */
const lt = {
  surface: '#f1f1f1',
  surfaceLight: '#f8f8f8',
  line: 'rgba(6,41,62,0.06)',
  line2: 'rgba(6,41,62,0.12)',
  text: '#06293E',
  muted: '#6b6b6b',
  dim: 'rgba(107,107,107,0.6)',
}

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
  { color: '#10B981', text: 'New hire accepted — Senior Analyst, Global Ops' },
  { color: '#F59E0B', text: 'Retention alert — 3 contractors ending Q3' },
  { color: LEMON_600, text: 'Pipeline update — 12 candidates screened' },
  { color: '#E11D48', text: 'Gap risk — Night-shift Ops Lead, West Region' },
]

const SPARKLINE_SETS = [
  [4, 7, 5, 9, 6, 8, 3, 7, 5, 8],
  [6, 4, 8, 5, 7, 3, 9, 6, 4, 7],
  [3, 8, 6, 4, 9, 7, 5, 8, 6, 3],
]


/* ═══════════════════════════════════════════════════════
   SHARED: InlineNav
   ═══════════════════════════════════════════════════════ */
function InlineNav() {
  return (
    <nav style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(24px, 4vw, 64px)',
      height: 64,
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(6,41,62,0.06)',
      pointerEvents: 'auto',
    }}>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 0, textDecoration: 'none' }}>
        <img src="/images/logos/STRATEGIA_INLINE_NAVY.svg" alt="Strategia" style={{ height: 38, width: 'auto' }} />
      </a>

      <ul style={{
        display: 'flex', gap: 28, listStyle: 'none', margin: 0, padding: 0,
      }}>
        {['Platform', 'Science', 'Solutions', 'Enterprise', 'About'].map(link => (
          <li key={link}>
            <a href="#" style={{
              fontFamily: 'var(--font-tight)', fontSize: 12, fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase' as const,
              color: NAVY, textDecoration: 'none', opacity: 0.7,
              transition: 'opacity 200ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >{link}</a>
          </li>
        ))}
      </ul>

      <a href="#" style={{
        fontFamily: 'var(--font-tight)', fontSize: 12, fontWeight: 600,
        letterSpacing: '0.06em', textTransform: 'uppercase' as const,
        color: NAVY, textDecoration: 'none',
        padding: '8px 20px',
        border: `1.5px solid ${NAVY}`,
        borderRadius: 0,
        transition: 'background 200ms, color 200ms',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = '#fff' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = NAVY }}
      >Request Briefing</a>
    </nav>
  )
}


/* ═══════════════════════════════════════════════════════
   SHARED: StatsBar
   ═══════════════════════════════════════════════════════ */
function StatsBar() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', gap: 0,
      padding: '20px clamp(24px, 4vw, 64px)',
      pointerEvents: 'auto',
    }}>
      {[
        { val: '342', lbl: 'Open Roles' },
        { val: '38.2', lbl: 'Avg. Time-to-Fill' },
        { val: '94%', lbl: 'OCEAN Match Rate' },
      ].map((s, i) => (
        <div key={i} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '0 clamp(24px, 3vw, 56px)',
          borderLeft: i > 0 ? `1px solid ${GRAPHITE_100}` : 'none',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 300,
            color: NAVY, letterSpacing: '-0.02em', lineHeight: 1.1,
          }}>{s.val}</div>
          <div style={{
            fontFamily: 'var(--font-tight)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.06em', textTransform: 'uppercase' as const,
            color: GRAPHITE_400, marginTop: 4,
          }}>{s.lbl}</div>
        </div>
      ))}
    </div>
  )
}


/* ═══════════════════════════════════════════════════════
   SHARED: HeroContent (editorial copy + dashboard mockup)
   ═══════════════════════════════════════════════════════ */
function HeroContent({ prefix }: { prefix: string }) {
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
    }, 4500))

    timers.push(setInterval(() => {
      if (pause()) return
      chartIdx = (chartIdx + 1) % CHART_PATHS.length
      if (chartPathRef.current) chartPathRef.current.setAttribute('d', CHART_PATHS[chartIdx])
      if (chartFillRef.current) chartFillRef.current.setAttribute('d', CHART_PATHS[chartIdx] + ' L600,110 L0,110 Z')
    }, 7000))

    timers.push(setInterval(() => {
      if (pause()) return
      heatIdx = (heatIdx + 1) % HEATMAP_VALS.length
      HEATMAP_VALS[heatIdx].forEach((v, i) => {
        const cell = heatRefs.current[i]
        if (cell) {
          cell.style.opacity = String(0.3 + v * 0.7)
          cell.style.background = v > 0.7 ? TEAL : v > 0.4 ? 'rgba(19,181,177,0.5)' : 'rgba(19,181,177,0.2)'
        }
      })
    }, 2000))

    timers.push(setInterval(() => {
      if (pause()) return
      feedIdx = (feedIdx + 1) % FEED_MSGS.length
      if (feedRef.current) {
        const msg = FEED_MSGS[feedIdx]
        feedRef.current.innerHTML = `<span style="width:5px;height:5px;border-radius:50%;background:${msg.color};flex-shrink:0"></span>${msg.text}`
        feedRef.current.style.opacity = '0'
        requestAnimationFrame(() => { if (feedRef.current) feedRef.current.style.opacity = '1' })
      }
    }, 6500))

    timers.push(setInterval(() => {
      if (pause()) return
      sparkIdx = (sparkIdx + 1) % SPARKLINE_SETS.length
      if (sparkRef.current) sparkRef.current.setAttribute('points', SPARKLINE_SETS[sparkIdx].map((v, i) => `${i * 5},${12 - v}`).join(' '))
    }, 1100))

    timers.push(setInterval(() => {
      if (clockRef.current) clockRef.current.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
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
  const gradId = `v10cg-${prefix}`

  return (
    <div style={{
      position: 'relative', zIndex: 10,
      display: 'flex', flexDirection: 'column',
      minHeight: '100vh', justifyContent: 'center',
      padding: '80px clamp(24px, 4vw, 64px) 0',
      pointerEvents: 'none',
    }}>
      {/* Two-column grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1.1fr',
        gap: 'clamp(32px, 4vw, 64px)',
        alignItems: 'center',
        flex: 1,
      }}>
        {/* ── LEFT: Editorial copy ── */}
        <div style={{ maxWidth: 580 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-tight)', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase' as const,
            color: GRAPHITE_400, marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: TEAL, flexShrink: 0 }} />
            AI-Native Workforce Intelligence
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(48px, 5.6vw, 76px)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            color: NAVY, margin: '0 0 24px 0',
          }}>
            Intelligence that mirrors how{' '}
            <span style={{
              fontStyle: 'italic',
              background: `linear-gradient(135deg, ${NAVY}, ${TEAL})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>decisions are actually made.</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 18, lineHeight: 1.65,
            color: GRAPHITE_500, margin: '0 0 32px 0', maxWidth: 500,
          }}>
            <strong>Strategia is the workforce intelligence platform built for enterprise healthcare operators.</strong>{' '}
            Triangulating behavioural, contextual, and structural data to eliminate execution risk where it matters most — the hiring decision.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, pointerEvents: 'auto' }}>
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-tight)', fontSize: 13, fontWeight: 600,
              letterSpacing: '0.04em', textTransform: 'uppercase' as const,
              background: `linear-gradient(135deg, ${LEMON_600}, ${LEMON})`,
              color: NAVY, textDecoration: 'none',
              padding: '14px 28px',
              transition: 'transform 150ms, box-shadow 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,229,77,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <span>Request Executive Briefing</span>
              <span style={{ fontSize: 16 }}>→</span>
            </a>
            <a href="#" style={{
              fontFamily: 'var(--font-tight)', fontSize: 13, fontWeight: 600,
              letterSpacing: '0.04em',
              color: NAVY, textDecoration: 'none',
              borderBottom: `1.5px solid ${NAVY}`,
              paddingBottom: 2,
              transition: 'opacity 200ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >Explore Platform →</a>
          </div>
        </div>

        {/* ── RIGHT: Dashboard mockup ── */}
        <div style={{ position: 'relative', pointerEvents: 'auto' }}>
          {/* Floating: Retention Signal */}
          <div style={{
            position: 'absolute', top: -12, left: -24, zIndex: 5,
            background: '#fff', padding: '14px 18px',
            boxShadow: '0 8px 32px rgba(6,41,62,0.08), 0 1px 4px rgba(6,41,62,0.04)',
            border: `1px solid ${lt.line}`,
            animation: 'v10-float 6s ease-in-out infinite',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', animation: 'v10-pulse 2s infinite' }} />
              <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: lt.muted }}>Retention Signal</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span ref={retentionRef} style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 300, color: lt.text, letterSpacing: '-0.02em' }}>86%</span>
              <span style={{ fontSize: 11, color: '#10B981', fontWeight: 600 }}>▲ 4.2%</span>
            </div>
            <div style={{ fontSize: 11, color: lt.muted, marginTop: 2 }}>12-month predicted retention</div>
          </div>

          {/* Floating: Job Fit */}
          <div style={{
            position: 'absolute', bottom: 24, right: -28, zIndex: 5,
            background: '#fff', padding: '14px 18px',
            boxShadow: '0 8px 32px rgba(6,41,62,0.08), 0 1px 4px rgba(6,41,62,0.04)',
            border: `1px solid ${lt.line}`,
            animation: 'v10-float 6s ease-in-out infinite',
            animationDelay: '-3s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="44" height="44" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke={lt.line2} strokeWidth="5" />
                <circle cx="22" cy="22" r="18" fill="none" stroke={TEAL} strokeWidth="5" strokeDasharray="91.1 113.1" strokeLinecap="round" transform="rotate(-90 22 22)" />
              </svg>
              <div>
                <div style={{ fontFamily: 'var(--font-monospace)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: lt.muted, marginBottom: 2 }}>Job Fit</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span ref={fitRef} style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, color: lt.text }}>81</span>
                  <span style={{ fontSize: 13, color: lt.muted, fontWeight: 500 }}>/ 100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main mockup */}
          <div style={{
            background: '#fff',
            boxShadow: '0 24px 80px rgba(6,41,62,0.08), 0 4px 16px rgba(6,41,62,0.04)',
            border: `1px solid ${lt.line}`,
            overflow: 'hidden',
          }}>
            {/* Title bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: `1px solid ${lt.line}`, background: lt.surfaceLight }}>
              <span style={{ display: 'flex', gap: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,95,87,0.7)' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(254,188,46,0.7)' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(40,200,64,0.7)' }} />
              </span>
              <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-monospace)', fontSize: 10.5, color: lt.dim }}>app.strategia.tech/workforce</span>
            </div>

            <div style={{ display: 'flex', minHeight: 300 }}>
              {/* Navy sidebar */}
              <div style={{ width: 48, background: NAVY, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 6, flexShrink: 0 }}>
                <div style={{ width: 28, height: 28, background: `linear-gradient(135deg, ${LEMON_600}, ${LEMON})`, display: 'grid', placeItems: 'center', marginBottom: 8 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polygon points="6,0 12,10.4 0,10.4" stroke={NAVY} strokeWidth="1.5" fill="none" /></svg>
                </div>
                {[0.3, 0.3, 1, 0.3, 0.3].map((op, i) => (
                  <div key={i} style={{ width: 30, height: 30, background: op === 1 ? 'rgba(255,255,255,0.12)' : 'transparent', display: 'grid', placeItems: 'center', position: 'relative' }}>
                    <div style={{ width: 16, height: 2, background: `rgba(255,255,255,${op * 0.5})` }} />
                    {op === 1 && <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 2, background: LEMON }} />}
                  </div>
                ))}
              </div>

              {/* Main content area */}
              <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: lt.dim }}>Workforce · Q2 2026</span>
                    <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 9, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#fff', background: TEAL, padding: '2px 7px', borderRadius: 10 }}>Live</span>
                  </div>
                  <span ref={clockRef} style={{ fontFamily: 'var(--font-monospace)', fontSize: 10, color: lt.dim }} />
                </div>

                {/* KPI cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {[
                    { label: 'OPEN ROLES', ref: kpiOpenRef, value: '342' },
                    { label: 'TTF (DAYS)', ref: kpiTtfRef, value: '38.2' },
                    { label: 'SKILL GAP', ref: kpiGapRef, value: '127' },
                  ].map((k) => (
                    <div key={k.label} style={{ background: lt.surface, padding: '10px 12px' }}>
                      <div style={{ fontFamily: 'var(--font-monospace)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: lt.dim, marginBottom: 4 }}>{k.label}</div>
                      <span ref={k.ref} style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, color: lt.text, letterSpacing: '-0.02em' }}>{k.value}</span>
                    </div>
                  ))}
                </div>

                {/* Chart + heatmap */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 8, flex: 1 }}>
                  <div style={{ background: lt.surface, padding: '10px 12px', overflow: 'hidden' }}>
                    <div style={{ fontFamily: 'var(--font-monospace)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: lt.dim, marginBottom: 6 }}>Hiring Velocity</div>
                    <svg viewBox="0 0 600 120" preserveAspectRatio="none" style={{ width: '100%', height: 68, display: 'block' }}>
                      <line x1="0" y1="30" x2="600" y2="30" stroke={lt.line} strokeWidth="0.5" />
                      <line x1="0" y1="60" x2="600" y2="60" stroke={lt.line} strokeWidth="0.5" />
                      <line x1="0" y1="90" x2="600" y2="90" stroke={lt.line} strokeWidth="0.5" />
                      <path ref={chartFillRef} d={CHART_PATHS[0] + ' L600,110 L0,110 Z'} fill={`url(#${gradId})`} style={{ transition: 'd 600ms cubic-bezier(.2,.7,.2,1)' }} />
                      <path ref={chartPathRef} d={CHART_PATHS[0]} fill="none" stroke={TEAL} strokeWidth="1.5" style={{ transition: 'd 600ms cubic-bezier(.2,.7,.2,1)' }} />
                      <defs>
                        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={TEAL} stopOpacity={0.18} />
                          <stop offset="100%" stopColor={TEAL} stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div style={{ background: lt.surface, padding: '10px 12px' }}>
                    <div style={{ fontFamily: 'var(--font-monospace)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: lt.dim, marginBottom: 8 }}>Heat by Role</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} ref={setHeatRef(i)} style={{ aspectRatio: '1', background: TEAL, opacity: 0.5, transition: 'opacity 180ms, background 180ms' }} />
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4, marginTop: 4 }}>
                      {['SA', 'SWE', 'PM', 'OL', 'DS', 'FN'].map(r => (
                        <div key={r} style={{ fontFamily: 'var(--font-monospace)', fontSize: 7.5, textAlign: 'center', color: lt.dim }}>{r}</div>
                      ))}
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg width="50" height="14" viewBox="0 0 50 14" style={{ overflow: 'visible' }}>
                        <polyline ref={sparkRef} points="0,8 5,4 10,6 15,3 20,7 25,5 30,2 35,6 40,4 45,7" fill="none" stroke={TEAL} strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 8, color: lt.dim }}>7d trend</span>
                    </div>
                  </div>
                </div>

                {/* Activity ticker */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderTop: `1px solid ${lt.line}`, paddingTop: 8, minHeight: 22 }}>
                  <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 8.5, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: lt.dim, flexShrink: 0 }}>Activity</span>
                  <div ref={feedRef} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: lt.muted, transition: 'opacity 200ms', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
                    New hire accepted — Senior Analyst, Global Ops
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <StatsBar />
    </div>
  )
}


/* ═══════════════════════════════════════════════════════
   SHARED: Variant wrapper
   ═══════════════════════════════════════════════════════ */
function VariantShell({ children, prefix }: { children: React.ReactNode; prefix: string }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      background: '#fff',
    }}>
      <InlineNav />
      {children}
      <div style={{
        position: 'relative', zIndex: 10,
        pointerEvents: 'none',
      }}>
        <HeroContent prefix={prefix} />
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════
   SHARED: Canvas setup hook
   ═══════════════════════════════════════════════════════ */
function useCanvasSetup(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number, mouse: { x: number; y: number }, time: number) => void,
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const sizeRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let time = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      sizeRef.current = { w: rect.width, h: rect.height }
      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const loop = () => {
      if (!document.hidden) {
        time++
        drawFn(ctx, sizeRef.current.w, sizeRef.current.h, mouseRef.current, time)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [canvasRef, containerRef, drawFn])
}


/* ═══════════════════════════════════════════════════════
   SHARED: Keyframe styles (injected once)
   ═══════════════════════════════════════════════════════ */
function V10Styles() {
  return (
    <style>{`
      @keyframes v10-float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      @keyframes v10-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      @keyframes v10-blob-morph-1 {
        0%   { border-radius: 30% 70% 50% 40% / 60% 30% 70% 50%; transform: translate(0, 0) scale(1); }
        25%  { border-radius: 50% 30% 70% 40% / 40% 60% 30% 70%; transform: translate(30px, -20px) scale(1.05); }
        50%  { border-radius: 70% 50% 30% 60% / 50% 70% 40% 30%; transform: translate(-20px, 20px) scale(0.95); }
        75%  { border-radius: 40% 60% 50% 70% / 70% 40% 60% 50%; transform: translate(10px, 10px) scale(1.02); }
        100% { border-radius: 30% 70% 50% 40% / 60% 30% 70% 50%; transform: translate(0, 0) scale(1); }
      }
      @keyframes v10-blob-morph-2 {
        0%   { border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%; transform: translate(0, 0) scale(1); }
        25%  { border-radius: 40% 70% 30% 60% / 70% 40% 60% 30%; transform: translate(-25px, 15px) scale(1.08); }
        50%  { border-radius: 70% 30% 50% 40% / 30% 70% 50% 60%; transform: translate(15px, -25px) scale(0.92); }
        75%  { border-radius: 30% 50% 60% 70% / 60% 30% 70% 40%; transform: translate(-10px, -10px) scale(1.04); }
        100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%; transform: translate(0, 0) scale(1); }
      }
      @keyframes v10-blob-morph-3 {
        0%   { border-radius: 50% 50% 40% 60% / 40% 50% 60% 50%; transform: translate(0, 0) scale(1); }
        33%  { border-radius: 70% 30% 60% 40% / 60% 40% 30% 70%; transform: translate(20px, 25px) scale(1.06); }
        66%  { border-radius: 30% 60% 50% 70% / 50% 70% 40% 30%; transform: translate(-15px, -20px) scale(0.94); }
        100% { border-radius: 50% 50% 40% 60% / 40% 50% 60% 50%; transform: translate(0, 0) scale(1); }
      }
      @keyframes v10-blob-morph-4 {
        0%   { border-radius: 40% 60% 60% 40% / 50% 40% 60% 50%; transform: translate(0, 0) rotate(0deg) scale(1); }
        25%  { border-radius: 60% 40% 40% 60% / 40% 60% 40% 60%; transform: translate(-20px, 10px) rotate(5deg) scale(1.03); }
        50%  { border-radius: 50% 50% 30% 70% / 70% 30% 50% 50%; transform: translate(10px, -15px) rotate(-3deg) scale(1.07); }
        75%  { border-radius: 70% 30% 50% 50% / 30% 70% 50% 40%; transform: translate(5px, 20px) rotate(2deg) scale(0.96); }
        100% { border-radius: 40% 60% 60% 40% / 50% 40% 60% 50%; transform: translate(0, 0) rotate(0deg) scale(1); }
      }
      @keyframes v10-blob-morph-5 {
        0%   { border-radius: 45% 55% 55% 45% / 55% 45% 55% 45%; transform: translate(0, 0) scale(1); }
        20%  { border-radius: 65% 35% 45% 55% / 35% 65% 45% 55%; transform: translate(15px, -18px) scale(1.04); }
        40%  { border-radius: 35% 65% 55% 45% / 65% 35% 55% 45%; transform: translate(-12px, 22px) scale(0.97); }
        60%  { border-radius: 55% 45% 35% 65% / 45% 55% 65% 35%; transform: translate(22px, 8px) scale(1.06); }
        80%  { border-radius: 45% 55% 65% 35% / 55% 45% 35% 65%; transform: translate(-8px, -12px) scale(0.98); }
        100% { border-radius: 45% 55% 55% 45% / 55% 45% 55% 45%; transform: translate(0, 0) scale(1); }
      }
    `}</style>
  )
}


/* ═══════════════════════════════════════════════════════
   VARIANT A — Liquid Morphing (CSS-only)
   ═══════════════════════════════════════════════════════ */
export function VariantLiquid() {
  const blobs = [
    { color: TEAL, opacity: 0.1, size: '45vw', top: '10%', left: '15%', anim: 'v10-blob-morph-1', dur: '18s' },
    { color: NAVY, opacity: 0.08, size: '40vw', top: '30%', left: '50%', anim: 'v10-blob-morph-2', dur: '22s' },
    { color: LEMON_600, opacity: 0.12, size: '35vw', top: '55%', left: '25%', anim: 'v10-blob-morph-3', dur: '20s' },
    { color: TEAL, opacity: 0.07, size: '50vw', top: '5%', left: '60%', anim: 'v10-blob-morph-4', dur: '25s' },
    { color: NAVY, opacity: 0.06, size: '38vw', top: '45%', left: '65%', anim: 'v10-blob-morph-5', dur: '16s' },
  ]

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', background: '#fff' }}>
      <V10Styles />
      <InlineNav />

      {/* SVG filter for extra organic feel */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="v10-liquid-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="turbulence" seed="3">
              <animate attributeName="baseFrequency" values="0.015;0.02;0.015" dur="30s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="30" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Blob layer */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        filter: 'url(#v10-liquid-filter)',
        overflow: 'hidden',
      }}>
        {blobs.map((b, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: b.size, height: b.size,
            top: b.top, left: b.left,
            background: b.color,
            opacity: b.opacity,
            filter: 'blur(100px)',
            animation: `${b.anim} ${b.dur} ease-in-out infinite`,
            willChange: 'border-radius, transform',
          }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <HeroContent prefix="liq" />
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════
   VARIANT B — Topographic Terrain (Canvas)
   ═══════════════════════════════════════════════════════ */
export function VariantTerrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const drawTerrain = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, mouse: { x: number; y: number }, time: number) => {
    ctx.fillStyle = 'rgba(255,255,255,0.15)'
    ctx.fillRect(0, 0, W, H)

    const LINE_COUNT = 35
    const MOUSE_RADIUS = 200

    for (let i = 0; i < LINE_COUNT; i++) {
      const baseY = (H / (LINE_COUNT + 1)) * (i + 1)
      const freq1 = 0.003 + i * 0.0002
      const freq2 = 0.0015 + i * 0.00015
      const amp1 = 15 + Math.sin(i * 0.4) * 12
      const amp2 = 8 + Math.cos(i * 0.7) * 6
      const phase1 = time * 0.008 + i * 0.3
      const phase2 = time * 0.005 + i * 0.5

      // Determine opacity: most lines are faint, a few teal "highlight" bands
      const isHighlight = i % 8 === 3 || i % 8 === 7
      const alpha = isHighlight ? 0.12 : (0.06 + Math.sin(i * 0.8) * 0.03)
      const color = isHighlight
        ? `rgba(19,181,177,${alpha})`
        : `rgba(6,41,62,${alpha})`

      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = isHighlight ? 1 : 0.6

      for (let x = 0; x <= W; x += 2) {
        let y = baseY
          + Math.sin(x * freq1 + phase1) * amp1
          + Math.sin(x * freq2 + phase2) * amp2

        // Mouse ripple displacement
        if (mouse.x > -500) {
          const dx = x - mouse.x
          const dy = y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            const force = (1 - dist / MOUSE_RADIUS) * 30
            y += (dy / (dist || 1)) * force
          }
        }

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Elevation markers on highlight lines
      if (isHighlight && time % 3 === 0) {
        const markerX = W * (0.2 + (i * 0.15) % 0.6)
        const markerY = baseY
          + Math.sin(markerX * freq1 + phase1) * amp1
          + Math.sin(markerX * freq2 + phase2) * amp2

        ctx.beginPath()
        ctx.arc(markerX, markerY, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(19,181,177,0.2)`
        ctx.fill()
        ctx.strokeStyle = `rgba(19,181,177,0.3)`
        ctx.lineWidth = 0.5
        ctx.stroke()

        ctx.fillStyle = `rgba(6,41,62,0.3)`
        ctx.font = '8px JetBrains Mono, monospace'
        ctx.fillText(`${(1200 + i * 40).toFixed(0)}m`, markerX + 6, markerY + 3)
      }
    }
  }, [])

  useCanvasSetup(canvasRef, drawTerrain, containerRef)

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', background: '#fff' }}>
      <V10Styles />
      <InlineNav />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <HeroContent prefix="ter" />
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════
   VARIANT C — Neural Pulse Network (Canvas)
   ═══════════════════════════════════════════════════════ */
export function VariantNeural() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<NeuralNode[]>([])
  const signalsRef = useRef<PulseSignal[]>([])
  const edgesRef = useRef<NeuralEdge[]>([])
  const initRef = useRef(false)

  interface NeuralNode { x: number; y: number; r: number; glow: number; lastBurst: number }
  interface NeuralEdge { from: number; to: number; dist: number; brightness: number }
  interface PulseSignal { fromIdx: number; toIdx: number; progress: number; speed: number }

  const initNetwork = useCallback((W: number, H: number) => {
    if (initRef.current && nodesRef.current.length > 0) return
    initRef.current = true

    // Poisson-disk-like sampling via rejection
    const nodes: NeuralNode[] = []
    const minDist = Math.min(W, H) * 0.08
    const maxAttempts = 500
    let attempts = 0

    while (nodes.length < 28 && attempts < maxAttempts) {
      attempts++
      const x = 40 + Math.random() * (W - 80)
      const y = 40 + Math.random() * (H - 80)
      let ok = true
      for (const n of nodes) {
        const d = Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2)
        if (d < minDist) { ok = false; break }
      }
      if (ok) {
        nodes.push({ x, y, r: 3 + Math.random() * 3, glow: 0, lastBurst: -1000 })
      }
    }
    nodesRef.current = nodes

    // Build edges
    const edges: NeuralEdge[] = []
    const CONNECTION_DIST = 200
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < CONNECTION_DIST) {
          edges.push({ from: i, to: j, dist, brightness: 0 })
        }
      }
    }
    edgesRef.current = edges

    // Seed initial signals
    for (let s = 0; s < 5; s++) {
      if (edges.length > 0) {
        const edge = edges[Math.floor(Math.random() * edges.length)]
        signalsRef.current.push({
          fromIdx: Math.random() > 0.5 ? edge.from : edge.to,
          toIdx: Math.random() > 0.5 ? edge.to : edge.from,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.005,
        })
      }
    }
  }, [])

  const drawNeural = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, mouse: { x: number; y: number }, time: number) => {
    ctx.fillStyle = 'rgba(255,255,255,0.15)'
    ctx.fillRect(0, 0, W, H)

    initNetwork(W, H)

    const nodes = nodesRef.current
    const edges = edgesRef.current
    const signals = signalsRef.current

    // Decay node glow and edge brightness
    for (const n of nodes) n.glow *= 0.96
    for (const e of edges) e.brightness *= 0.94

    // Update signals
    for (let i = signals.length - 1; i >= 0; i--) {
      const sig = signals[i]
      sig.progress += sig.speed

      if (sig.progress >= 1) {
        // Signal arrived — glow target node, spawn new signal
        const targetNode = nodes[sig.toIdx]
        if (targetNode) targetNode.glow = 1

        // Brighten the edge
        const edge = edges.find(e =>
          (e.from === sig.fromIdx && e.to === sig.toIdx) ||
          (e.from === sig.toIdx && e.to === sig.fromIdx)
        )
        if (edge) edge.brightness = 1

        // Spawn new signal from target to a random neighbor
        const neighborEdges = edges.filter(e => e.from === sig.toIdx || e.to === sig.toIdx)
        if (neighborEdges.length > 0 && Math.random() > 0.3) {
          const ne = neighborEdges[Math.floor(Math.random() * neighborEdges.length)]
          const nextTarget = ne.from === sig.toIdx ? ne.to : ne.from
          signals.push({
            fromIdx: sig.toIdx,
            toIdx: nextTarget,
            progress: 0,
            speed: 0.003 + Math.random() * 0.005,
          })
        }

        signals.splice(i, 1)
        continue
      }
    }

    // Cap signals
    while (signals.length > 25) signals.shift()

    // Spawn occasional random signal
    if (time % 60 === 0 && edges.length > 0 && signals.length < 15) {
      const e = edges[Math.floor(Math.random() * edges.length)]
      signals.push({ fromIdx: e.from, toIdx: e.to, progress: 0, speed: 0.003 + Math.random() * 0.005 })
    }

    // Mouse burst: hover near a node triggers outgoing signals
    if (mouse.x > -500) {
      for (let ni = 0; ni < nodes.length; ni++) {
        const n = nodes[ni]
        const dx = n.x - mouse.x
        const dy = n.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 40 && time - n.lastBurst > 60) {
          n.lastBurst = time
          n.glow = 1
          const neighborEdges = edges.filter(e => e.from === ni || e.to === ni)
          for (const ne of neighborEdges.slice(0, 3)) {
            const target = ne.from === ni ? ne.to : ne.from
            signals.push({ fromIdx: ni, toIdx: target, progress: 0, speed: 0.006 + Math.random() * 0.006 })
          }
        }
      }
    }

    // Draw edges
    for (const e of edges) {
      const n1 = nodes[e.from]
      const n2 = nodes[e.to]
      const baseAlpha = 0.04
      const alpha = baseAlpha + e.brightness * 0.18
      ctx.beginPath()
      ctx.moveTo(n1.x, n1.y)
      ctx.lineTo(n2.x, n2.y)
      ctx.strokeStyle = `rgba(6,41,62,${alpha})`
      ctx.lineWidth = 0.5 + e.brightness * 0.5
      ctx.stroke()
    }

    // Draw signals (traveling dots)
    for (const sig of signals) {
      const n1 = nodes[sig.fromIdx]
      const n2 = nodes[sig.toIdx]
      if (!n1 || !n2) continue
      const x = n1.x + (n2.x - n1.x) * sig.progress
      const y = n1.y + (n2.y - n1.y) * sig.progress

      // Glow trail
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(19,181,177,0.08)'
      ctx.fill()

      // Dot
      ctx.beginPath()
      ctx.arc(x, y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = TEAL
      ctx.fill()
    }

    // Draw nodes
    for (const n of nodes) {
      // Glow halo
      if (n.glow > 0.05) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + 12, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(19,181,177,${n.glow * 0.12})`
        ctx.fill()
      }

      // Fill
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      ctx.fillStyle = NAVY
      ctx.fill()

      // Border
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(19,181,177,${0.4 + n.glow * 0.6})`
      ctx.lineWidth = 1.2
      ctx.stroke()
    }
  }, [initNetwork])

  useCanvasSetup(canvasRef, drawNeural, containerRef)

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', background: '#fff' }}>
      <V10Styles />
      <InlineNav />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <HeroContent prefix="neu" />
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════
   VARIANT D — Waveform Interference (Canvas)
   ═══════════════════════════════════════════════════════ */
export function VariantWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const drawWaveform = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, mouse: { x: number; y: number }, time: number) => {
    ctx.fillStyle = 'rgba(255,255,255,0.15)'
    ctx.fillRect(0, 0, W, H)

    const waves = [
      { freq: 0.003, amp: 40, phase: 0.02, yOff: 0.3, color: 'rgba(6,41,62,', alpha: 0.08, fillAlpha: 0.02 },
      { freq: 0.005, amp: 30, phase: 0.015, yOff: 0.4, color: 'rgba(19,181,177,', alpha: 0.12, fillAlpha: 0.03 },
      { freq: 0.004, amp: 50, phase: 0.025, yOff: 0.5, color: 'rgba(154,154,154,', alpha: 0.06, fillAlpha: 0.02 },
      { freq: 0.006, amp: 25, phase: 0.018, yOff: 0.55, color: 'rgba(19,181,177,', alpha: 0.1, fillAlpha: 0.025 },
      { freq: 0.002, amp: 60, phase: 0.012, yOff: 0.6, color: 'rgba(6,41,62,', alpha: 0.07, fillAlpha: 0.02 },
      { freq: 0.007, amp: 20, phase: 0.03, yOff: 0.45, color: 'rgba(154,154,154,', alpha: 0.05, fillAlpha: 0.015 },
      { freq: 0.008, amp: 22, phase: 0.022, yOff: 0.35, color: 'rgba(6,41,62,', alpha: 0.06, fillAlpha: 0.018 },
    ]

    const MOUSE_RADIUS = 250
    const waveYValues: number[][] = []

    // Calculate wave Y values for interference detection
    for (let wi = 0; wi < waves.length; wi++) {
      const wave = waves[wi]
      const yVals: number[] = []
      const baseY = H * wave.yOff

      for (let x = 0; x <= W; x += 2) {
        let localAmp = wave.amp
        let localFreq = wave.freq

        // Mouse distortion on nearest waves
        if (mouse.x > -500) {
          const dx = x - mouse.x
          const dy = baseY - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            const force = (1 - dist / MOUSE_RADIUS)
            localAmp += force * 35
            localFreq += force * 0.002
          }
        }

        const y = baseY + Math.sin(x * localFreq + time * wave.phase) * localAmp
        yVals.push(y)
      }
      waveYValues.push(yVals)
    }

    // Draw waves with gradient fills
    for (let wi = 0; wi < waves.length; wi++) {
      const wave = waves[wi]
      const yVals = waveYValues[wi]

      // Gradient fill below wave
      ctx.beginPath()
      for (let xi = 0; xi < yVals.length; xi++) {
        const x = xi * 2
        if (xi === 0) ctx.moveTo(x, yVals[xi])
        else ctx.lineTo(x, yVals[xi])
      }
      ctx.lineTo(W, H)
      ctx.lineTo(0, H)
      ctx.closePath()
      ctx.fillStyle = wave.color + wave.fillAlpha + ')'
      ctx.fill()

      // Stroke line
      ctx.beginPath()
      for (let xi = 0; xi < yVals.length; xi++) {
        const x = xi * 2
        if (xi === 0) ctx.moveTo(x, yVals[xi])
        else ctx.lineTo(x, yVals[xi])
      }
      ctx.strokeStyle = wave.color + wave.alpha + ')'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Interference dots: where waves are close to each other
    for (let xi = 0; xi < waveYValues[0].length; xi += 4) {
      const x = xi * 2
      for (let a = 0; a < waves.length; a++) {
        for (let b = a + 1; b < waves.length; b++) {
          const diff = Math.abs(waveYValues[a][xi] - waveYValues[b][xi])
          if (diff < 8) {
            const midY = (waveYValues[a][xi] + waveYValues[b][xi]) / 2
            const intensity = (1 - diff / 8) * 0.25
            ctx.beginPath()
            ctx.arc(x, midY, 1.5 + intensity * 2, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(19,181,177,${intensity})`
            ctx.fill()
          }
        }
      }
    }
  }, [])

  useCanvasSetup(canvasRef, drawWaveform, containerRef)

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', background: '#fff' }}>
      <V10Styles />
      <InlineNav />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <HeroContent prefix="wav" />
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════
   VARIANT E — Prismatic Light (Canvas + CSS)
   ═══════════════════════════════════════════════════════ */
export function VariantPrismatic() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const flaresRef = useRef<LightFlare[]>([])

  interface LightFlare { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; beamIdx: number }

  const drawPrismatic = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, mouse: { x: number; y: number }, time: number) => {
    ctx.fillStyle = 'rgba(255,255,255,0.15)'
    ctx.fillRect(0, 0, W, H)

    const beamCount = 4
    const baseAngle = -25 * Math.PI / 180
    const angleSpread = 18 * Math.PI / 180
    const rotationSpeed = 0.001 * Math.PI / 180

    // Beam convergence point (center-right, behind dashboard)
    const convergX = W * 0.65
    const convergY = H * 0.45

    // Mouse tilt influence
    let mouseTiltX = 0
    let mouseTiltY = 0
    if (mouse.x > -500) {
      mouseTiltX = (mouse.x - W * 0.5) / W * 0.03
      mouseTiltY = (mouse.y - H * 0.5) / H * 0.03
    }

    const prismaticColors = [
      { r: 6, g: 41, b: 62 },    // navy
      { r: 19, g: 181, b: 177 },  // teal
      { r: 245, g: 229, b: 77 },  // lemon
      { r: 110, g: 217, b: 214 }, // teal-300
    ]

    // Prismatic dispersion effect at convergence
    const disperseIntensity = 0.5 + Math.sin(time * 0.02) * 0.3
    const disperseFanAngle = 40 * Math.PI / 180
    const disperseLineCount = 12

    for (let di = 0; di < disperseLineCount; di++) {
      const t = di / (disperseLineCount - 1)
      const angle = -disperseFanAngle / 2 + disperseFanAngle * t + Math.PI * 0.2
      const colorIdx = di % prismaticColors.length
      const c = prismaticColors[colorIdx]
      const length = 120 + Math.sin(time * 0.03 + di * 0.5) * 30
      const alpha = disperseIntensity * (0.06 + Math.sin(time * 0.025 + di * 0.8) * 0.03)

      const endX = convergX + Math.cos(angle) * length
      const endY = convergY + Math.sin(angle) * length

      ctx.beginPath()
      ctx.moveTo(convergX, convergY)
      ctx.lineTo(endX, endY)
      ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Small terminus glow
      ctx.beginPath()
      ctx.arc(endX, endY, 3, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha * 0.6})`
      ctx.fill()
    }

    // Draw beams as wide faint gradient stripes
    for (let bi = 0; bi < beamCount; bi++) {
      const beamAngle = baseAngle + (bi - (beamCount - 1) / 2) * (angleSpread / (beamCount - 1))
        + time * rotationSpeed
        + mouseTiltX + mouseTiltY

      // Beam origin: top-left area
      const originX = -W * 0.1 + bi * W * 0.15
      const originY = -H * 0.15

      const beamLength = Math.sqrt(W * W + H * H) * 1.2
      const beamWidth = 80 + bi * 20

      const cosA = Math.cos(beamAngle)
      const sinA = Math.sin(beamAngle)

      // Draw the beam as a gradient rectangle
      const perpX = -sinA * beamWidth / 2
      const perpY = cosA * beamWidth / 2

      const endX = originX + cosA * beamLength
      const endY = originY + sinA * beamLength

      ctx.beginPath()
      ctx.moveTo(originX + perpX, originY + perpY)
      ctx.lineTo(endX + perpX, endY + perpY)
      ctx.lineTo(endX - perpX, endY - perpY)
      ctx.lineTo(originX - perpX, originY - perpY)
      ctx.closePath()

      const beamAlpha = 0.03 + Math.sin(time * 0.015 + bi * 1.2) * 0.015
      ctx.fillStyle = `rgba(255,255,255,${beamAlpha})`
      ctx.fill()

      // Beam edge lines
      ctx.beginPath()
      ctx.moveTo(originX + perpX, originY + perpY)
      ctx.lineTo(endX + perpX, endY + perpY)
      ctx.strokeStyle = `rgba(6,41,62,0.015)`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    // Light flare particles
    const flares = flaresRef.current
    if (time % 12 === 0 && flares.length < 20) {
      const bi = Math.floor(Math.random() * beamCount)
      const beamAngle = baseAngle + (bi - (beamCount - 1) / 2) * (angleSpread / (beamCount - 1)) + time * rotationSpeed
      const t = Math.random() * 0.8
      const originX = -W * 0.1 + bi * W * 0.15
      const originY = -H * 0.15

      flares.push({
        x: originX + Math.cos(beamAngle) * t * W * 1.5,
        y: originY + Math.sin(beamAngle) * t * H * 1.5,
        vx: Math.cos(beamAngle) * 0.4 + (Math.random() - 0.5) * 0.2,
        vy: Math.sin(beamAngle) * 0.4 + (Math.random() - 0.5) * 0.2,
        life: 0,
        maxLife: 80 + Math.random() * 80,
        beamIdx: bi,
      })
    }

    for (let fi = flares.length - 1; fi >= 0; fi--) {
      const f = flares[fi]
      f.x += f.vx
      f.y += f.vy
      f.life++

      if (f.life >= f.maxLife || f.x > W + 50 || f.y > H + 50) {
        flares.splice(fi, 1)
        continue
      }

      const fadeIn = Math.min(f.life / 20, 1)
      const fadeOut = Math.max(1 - (f.life - f.maxLife * 0.7) / (f.maxLife * 0.3), 0)
      const alpha = fadeIn * fadeOut * 0.4

      // Bright dot
      ctx.beginPath()
      ctx.arc(f.x, f.y, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(19,181,177,${alpha})`
      ctx.fill()

      // Soft glow
      ctx.beginPath()
      ctx.arc(f.x, f.y, 6, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(19,181,177,${alpha * 0.15})`
      ctx.fill()
    }
  }, [])

  useCanvasSetup(canvasRef, drawPrismatic, containerRef)

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', background: '#fff' }}>
      <V10Styles />
      <InlineNav />

      {/* CSS base beams (wide, very subtle linear gradients) */}
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{
          position: 'absolute',
          top: '-20%', left: `${-5 + i * 20}%`,
          width: '120%', height: '160%',
          background: `linear-gradient(${125 + i * 8}deg, transparent 30%, rgba(255,255,255,${0.04 + i * 0.01}) 50%, transparent 70%)`,
          transform: `rotate(${-2 + i * 0.5}deg)`,
          zIndex: 0,
          pointerEvents: 'none',
          animation: `v10-float ${30 + i * 5}s linear infinite`,
        }} />
      ))}

      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <HeroContent prefix="pri" />
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════
   DEFAULT EXPORT — All 5 variants stacked
   ═══════════════════════════════════════════════════════ */
export default function V10HeroShowcase() {
  return (
    <div>
      <VariantLiquid />
      <div style={{ height: 1, background: GRAPHITE_100 }} />
      <VariantTerrain />
      <div style={{ height: 1, background: GRAPHITE_100 }} />
      <VariantNeural />
      <div style={{ height: 1, background: GRAPHITE_100 }} />
      <VariantWaveform />
      <div style={{ height: 1, background: GRAPHITE_100 }} />
      <VariantPrismatic />
    </div>
  )
}
