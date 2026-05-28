'use client'

import { useEffect, useRef } from 'react'

/* ── tiny SVG helpers ── */
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ── animation data ── */
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
  'M0,86 C40,78 80,65 120,70 160,76 200,52 240,58 280,68 320,40 360,48 400,56 440,30 480,38 520,42 560,22 600,28',
]

const HEATMAP_VALS = [
  [0.7, 0.4, 0.9, 0.6, 0.3, 0.8],
  [0.5, 0.8, 0.6, 0.9, 0.7, 0.4],
  [0.9, 0.3, 0.7, 0.4, 0.8, 0.6],
  [0.4, 0.6, 0.8, 0.3, 0.9, 0.5],
]

const FEED_MSGS = [
  { color: 'var(--signal)', text: 'New hire accepted — Senior Analyst, Global Ops' },
  { color: 'var(--amber)', text: 'Retention alert — 3 contractors ending Q3' },
  { color: 'var(--lemon-600)', text: 'Pipeline update — 12 candidates screened' },
  { color: 'var(--rose)', text: 'Gap risk — Night-shift Ops Lead, West Region' },
  { color: 'var(--signal)', text: 'Offer extended — Data Scientist, R&D' },
  { color: 'var(--amber)', text: 'Credential expiry — 4 engineers due Jul 2026' },
]

const SPARKLINE_SETS = [
  [4, 7, 5, 9, 6, 8, 3, 7, 5, 8],
  [6, 4, 8, 5, 7, 3, 9, 6, 4, 7],
  [3, 8, 6, 4, 9, 7, 5, 8, 6, 3],
  [7, 5, 3, 8, 4, 9, 6, 5, 7, 4],
  [5, 9, 7, 3, 8, 6, 4, 7, 9, 5],
]

export default function Hero() {
  /* ── refs ── */
  const kpiOpenRef = useRef<HTMLSpanElement>(null)
  const kpiTtfRef = useRef<HTMLSpanElement>(null)
  const kpiGapRef = useRef<HTMLSpanElement>(null)
  const kpiOpenCardRef = useRef<HTMLDivElement>(null)
  const kpiTtfCardRef = useRef<HTMLDivElement>(null)
  const kpiGapCardRef = useRef<HTMLDivElement>(null)
  const ttfDecRef = useRef<HTMLSpanElement>(null)
  const chartPathRef = useRef<SVGPathElement>(null)
  const chartPathFillRef = useRef<SVGPathElement>(null)
  const heatCellRefs = useRef<(HTMLDivElement | null)[]>([])
  const feedRef = useRef<HTMLDivElement>(null)
  const sparkRef = useRef<SVGPolylineElement>(null)
  const badgeCountRef = useRef<HTMLSpanElement>(null)
  const clockRef = useRef<HTMLSpanElement>(null)
  const retentionPctRef = useRef<HTMLSpanElement>(null)
  const fitScoreRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let kpiIdx = 0
    let chartIdx = 0
    let heatIdx = 0
    let feedIdx = 0
    let sparkIdx = 0
    let badgeVal = 3
    const timers: ReturnType<typeof setInterval>[] = []

    const pause = () => document.hidden

    /* ── smooth count helper ── */
    function animateValue(
      el: HTMLElement | null,
      from: number,
      to: number,
      duration: number,
      fmt: (v: number) => string,
    ) {
      if (!el) return
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - t, 3)
        el.textContent = fmt(from + (to - from) * ease)
        if (t < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    /* ── flash helper ── */
    function flash(el: HTMLElement | null) {
      if (!el) return
      el.style.boxShadow = '0 0 0 2px var(--lemon-600), 0 0 12px rgba(252,240,153,0.3)'
      setTimeout(() => {
        el.style.boxShadow = ''
      }, 300)
    }

    /* KPI tween ~450ms */
    timers.push(
      setInterval(() => {
        if (pause()) return
        const prev = KPI_SETS[kpiIdx]
        kpiIdx = (kpiIdx + 1) % KPI_SETS.length
        const next = KPI_SETS[kpiIdx]

        animateValue(kpiOpenRef.current, prev.open, next.open, 380, (v) => Math.round(v).toLocaleString())
        animateValue(kpiGapRef.current, prev.gap, next.gap, 380, (v) => Math.round(v).toLocaleString())
        animateValue(kpiTtfRef.current, prev.ttf, next.ttf, 380, (v) => v.toFixed(1))

        if (Math.abs(next.open - prev.open) > 10) flash(kpiOpenCardRef.current)
        if (Math.abs(next.gap - prev.gap) > 8) flash(kpiGapCardRef.current)
      }, 450),
    )

    /* TTF decimal jitter ~130ms */
    timers.push(
      setInterval(() => {
        if (pause()) return
        if (ttfDecRef.current) {
          ttfDecRef.current.style.opacity = String(0.4 + Math.random() * 0.6)
        }
      }, 130),
    )

    /* Chart reshape ~700ms */
    timers.push(
      setInterval(() => {
        if (pause()) return
        chartIdx = (chartIdx + 1) % CHART_PATHS.length
        const p = CHART_PATHS[chartIdx]
        if (chartPathRef.current) chartPathRef.current.setAttribute('d', p)
        if (chartPathFillRef.current) chartPathFillRef.current.setAttribute('d', p + ' L600,110 L0,110 Z')
      }, 700),
    )

    /* Heatmap shimmer ~200ms */
    timers.push(
      setInterval(() => {
        if (pause()) return
        heatIdx = (heatIdx + 1) % HEATMAP_VALS.length
        const set = HEATMAP_VALS[heatIdx]
        set.forEach((v, i) => {
          const cell = heatCellRefs.current[i]
          if (cell) {
            cell.style.opacity = String(0.3 + v * 0.7)
            cell.style.background = v > 0.7 ? 'var(--lemon-600)' : v > 0.4 ? 'var(--lemon)' : 'var(--lemon-50)'
          }
        })
      }, 200),
    )

    /* Activity feed ~650ms */
    timers.push(
      setInterval(() => {
        if (pause()) return
        feedIdx = (feedIdx + 1) % FEED_MSGS.length
        if (feedRef.current) {
          const msg = FEED_MSGS[feedIdx]
          feedRef.current.innerHTML = `<span style="width:5px;height:5px;border-radius:50%;background:${msg.color};flex-shrink:0"></span>${msg.text}`
          feedRef.current.style.opacity = '0'
          requestAnimationFrame(() => {
            if (feedRef.current) feedRef.current.style.opacity = '1'
          })
        }
      }, 650),
    )

    /* Sparkline ~110ms */
    timers.push(
      setInterval(() => {
        if (pause()) return
        sparkIdx = (sparkIdx + 1) % SPARKLINE_SETS.length
        if (sparkRef.current) {
          const pts = SPARKLINE_SETS[sparkIdx].map((v, i) => `${i * 5},${12 - v}`).join(' ')
          sparkRef.current.setAttribute('points', pts)
        }
      }, 110),
    )

    /* Rail badge pulse ~900ms */
    timers.push(
      setInterval(() => {
        if (pause()) return
        badgeVal = badgeVal === 3 ? 4 : badgeVal === 4 ? 5 : 3
        if (badgeCountRef.current) badgeCountRef.current.textContent = String(badgeVal)
      }, 900),
    )

    /* Live clock ~1s */
    timers.push(
      setInterval(() => {
        if (clockRef.current) {
          const d = new Date()
          clockRef.current.textContent = d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })
        }
      }, 1000),
    )

    /* Floating card tweens */
    timers.push(
      setInterval(() => {
        if (pause()) return
        if (retentionPctRef.current) {
          const v = 82 + Math.floor(Math.random() * 8)
          retentionPctRef.current.textContent = `${v}%`
        }
      }, 1200),
    )
    timers.push(
      setInterval(() => {
        if (pause()) return
        if (fitScoreRef.current) {
          const v = 78 + Math.floor(Math.random() * 10)
          fitScoreRef.current.textContent = String(v)
        }
      }, 1100),
    )

    return () => timers.forEach(clearInterval)
  }, [])

  /* ── heatmap cell ref setter ── */
  const setHeatRef = (i: number) => (el: HTMLDivElement | null) => {
    heatCellRefs.current[i] = el
  }

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-grid-overlay" />

      <div className="container">
        <div className="hero-inner">
          {/* ───── LEFT: Copy ───── */}
          <div>
            {/* Kicker pill */}
            <div className="hero-kicker">
              <span className="kick-tag">NEW</span>
              <span>Intelligence Engine v2.0&nbsp;&mdash;&nbsp;now live</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.5 }}>
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h1>
              Workforce<br />Intelligence
            </h1>

            <p className="hero-sub">
              Make better, faster, and more defensible decisions&nbsp;&mdash;&nbsp;at scale.
              Support your HR and Executive teams with a multi-module platform that turns
              hiring into a strategic lever for performance and resilience.
            </p>

            {/* CTAs */}
            <div className="hero-ctas">
              <a className="btn btn-primary" href="#">
                Start Intelligence Engine
                <ArrowRight />
              </a>
              <a className="btn btn-secondary" href="#">Explore Platform</a>
            </div>
          </div>

          {/* ───── RIGHT: Dashboard mockup ───── */}
          <div className="mockup-wrap">
            <div className="mockup-glow" />

            {/* ── Floating card: Retention Signal ── */}
            <div
              className="float-card"
              style={{ top: -12, left: -24, zIndex: 10, animationDelay: '0s' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: 'var(--signal)',
                    animation: 'pulseDot 2s infinite',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-monospace)',
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    color: 'var(--graphite-400)',
                  }}
                >
                  RETENTION SIGNAL
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span
                  ref={retentionPctRef}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 26,
                    fontWeight: 600,
                    color: 'var(--navy)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  86%
                </span>
                <span style={{ fontSize: 11, color: 'var(--signal)', fontWeight: 600 }}>
                  ▲ 4.2%
                </span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--graphite-400)', marginTop: 2 }}>
                12-month predicted retention
              </div>
            </div>

            {/* ── Floating card: Job Fit ── */}
            <div
              className="float-card"
              style={{ bottom: 24, right: -28, zIndex: 10, animationDelay: '-3s' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Donut SVG */}
                <svg width="44" height="44" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="var(--graphite-100)" strokeWidth="5" />
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="var(--lemon-600)"
                    strokeWidth="5"
                    strokeDasharray="91.1 113.1"
                    strokeLinecap="round"
                    transform="rotate(-90 22 22)"
                    style={{ transition: 'stroke-dasharray 400ms ease' }}
                  />
                </svg>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-monospace)',
                      fontSize: 10,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase' as const,
                      color: 'var(--graphite-400)',
                      marginBottom: 2,
                    }}
                  >
                    JOB FIT
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                    <span
                      ref={fitScoreRef}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 22,
                        fontWeight: 600,
                        color: 'var(--navy)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      81
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--graphite-400)', fontWeight: 500 }}>
                      / 100
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Main mockup ── */}
            <div className="mockup">
              {/* Window chrome */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 14px',
                  borderBottom: '1px solid var(--graphite-100)',
                  background: 'var(--mist)',
                  fontSize: 11,
                  color: 'var(--graphite-400)',
                }}
              >
                <span style={{ display: 'flex', gap: 5 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
                </span>
                <span
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: 'var(--font-monospace)',
                    fontSize: 10.5,
                    color: 'var(--graphite-300)',
                    letterSpacing: '0.02em',
                  }}
                >
                  app.strategia.tech/workforce
                </span>
              </div>

              <div style={{ display: 'flex', minHeight: 340 }}>
                {/* ── Side rail ── */}
                <div
                  style={{
                    width: 52,
                    background: 'var(--navy)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '12px 0 12px',
                    gap: 6,
                    flexShrink: 0,
                  }}
                >
                  {/* Logo mini */}
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: 'linear-gradient(135deg, var(--lemon-600), var(--lemon))',
                      display: 'grid',
                      placeItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <polygon points="6,0 12,10.4 0,10.4" stroke="var(--navy)" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>

                  {[
                    { opacity: 0.3 },
                    { opacity: 0.3 },
                    { opacity: 1, active: true },
                    { opacity: 0.3 },
                    { opacity: 0.3 },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        background: item.active
                          ? 'rgba(255,255,255,0.12)'
                          : 'transparent',
                        display: 'grid',
                        placeItems: 'center',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 2,
                          borderRadius: 1,
                          background: '#fff',
                          opacity: item.opacity,
                        }}
                      />
                      {item.active && (
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 3,
                            height: 16,
                            borderRadius: '0 2px 2px 0',
                            background: 'var(--lemon)',
                          }}
                        />
                      )}
                    </div>
                  ))}

                  <div style={{ flex: 1 }} />

                  {/* Badge */}
                  <div style={{ position: 'relative', marginBottom: 4 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1v4M7 9v4M1 7h4M9 7h4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
                      </svg>
                    </div>
                    <span
                      ref={badgeCountRef}
                      style={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: 'var(--rose)',
                        color: '#fff',
                        fontSize: 9,
                        fontWeight: 700,
                        display: 'grid',
                        placeItems: 'center',
                        lineHeight: 1,
                      }}
                    >
                      3
                    </span>
                  </div>
                </div>

                {/* ── Main content ── */}
                <div style={{ flex: 1, padding: '16px 16px 12px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-monospace)',
                          fontSize: 9.5,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase' as const,
                          color: 'var(--graphite-300)',
                        }}
                      >
                        WORKFORCE &middot; Q2 2026
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: 9.5,
                          fontFamily: 'var(--font-monospace)',
                          color: 'var(--signal)',
                          background: 'rgba(16,185,129,0.08)',
                          padding: '2px 7px',
                          borderRadius: 'var(--r-pill)',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                        }}
                      >
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--signal)', animation: 'pulseDot 2s infinite' }} />
                        LIVE
                      </span>
                      <span
                        ref={clockRef}
                        style={{
                          fontFamily: 'var(--font-monospace)',
                          fontSize: 9.5,
                          color: 'var(--graphite-300)',
                        }}
                      >
                        --:--:--
                      </span>
                      <span
                        style={{
                          fontSize: 9.5,
                          fontFamily: 'var(--font-monospace)',
                          color: 'var(--graphite-400)',
                          background: 'var(--mist)',
                          padding: '2px 7px',
                          borderRadius: 'var(--r-pill)',
                        }}
                      >
                        12m
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.01em' }}>
                    Talent pipeline&nbsp;&mdash;&nbsp;outlook
                  </div>

                  {/* KPI strip */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                    {/* Open Requisitions */}
                    <div
                      ref={kpiOpenCardRef}
                      style={{
                        background: 'var(--mist)',
                        borderRadius: 'var(--r-sm)',
                        padding: '10px 12px',
                        transition: 'box-shadow 300ms ease',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-monospace)',
                          fontSize: 9,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase' as const,
                          color: 'var(--graphite-400)',
                          marginBottom: 4,
                        }}
                      >
                        Open Reqs
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span
                          ref={kpiOpenRef}
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 20,
                            fontWeight: 600,
                            color: 'var(--navy)',
                            letterSpacing: '-0.02em',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          342
                        </span>
                        <span style={{ fontSize: 10, color: 'var(--rose)', fontWeight: 600 }}>
                          ▲ 18
                        </span>
                      </div>
                    </div>

                    {/* Time-to-Fill */}
                    <div
                      ref={kpiTtfCardRef}
                      style={{
                        background: 'var(--mist)',
                        borderRadius: 'var(--r-sm)',
                        padding: '10px 12px',
                        transition: 'box-shadow 300ms ease',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-monospace)',
                          fontSize: 9,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase' as const,
                          color: 'var(--graphite-400)',
                          marginBottom: 4,
                        }}
                      >
                        Time-to-Fill
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                        <span
                          ref={kpiTtfRef}
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 20,
                            fontWeight: 600,
                            color: 'var(--navy)',
                            letterSpacing: '-0.02em',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          38
                        </span>
                        <span
                          ref={ttfDecRef}
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 20,
                            fontWeight: 600,
                            color: 'var(--navy)',
                            letterSpacing: '-0.02em',
                            transition: 'opacity 80ms',
                          }}
                        >
                          .2
                        </span>
                        <span style={{ fontSize: 10, color: 'var(--graphite-400)', marginLeft: 2 }}>
                          days
                        </span>
                      </div>
                    </div>

                    {/* Projected Gap */}
                    <div
                      ref={kpiGapCardRef}
                      style={{
                        background: 'var(--mist)',
                        borderRadius: 'var(--r-sm)',
                        padding: '10px 12px',
                        transition: 'box-shadow 300ms ease',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-monospace)',
                          fontSize: 9,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase' as const,
                          color: 'var(--graphite-400)',
                          marginBottom: 4,
                        }}
                      >
                        Projected Gap
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span
                          ref={kpiGapRef}
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 20,
                            fontWeight: 600,
                            color: 'var(--navy)',
                            letterSpacing: '-0.02em',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          127
                        </span>
                        <span style={{ fontSize: 10, color: 'var(--amber)', fontWeight: 600 }}>
                          FTEs
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Chart area */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 10, flex: 1 }}>
                    {/* Line chart */}
                    <div
                      style={{
                        background: 'var(--mist)',
                        borderRadius: 'var(--r-sm)',
                        padding: '10px 12px',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-monospace)',
                          fontSize: 9,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase' as const,
                          color: 'var(--graphite-400)',
                          marginBottom: 6,
                        }}
                      >
                        Hiring Velocity Forecast
                      </div>
                      <svg
                        viewBox="0 0 600 120"
                        preserveAspectRatio="none"
                        style={{ width: '100%', height: 80, display: 'block' }}
                      >
                        <line x1="0" y1="30" x2="600" y2="30" stroke="var(--graphite-100)" strokeWidth="0.5" />
                        <line x1="0" y1="60" x2="600" y2="60" stroke="var(--graphite-100)" strokeWidth="0.5" />
                        <line x1="0" y1="90" x2="600" y2="90" stroke="var(--graphite-100)" strokeWidth="0.5" />
                        <path
                          ref={chartPathFillRef}
                          d="M0,90 C40,85 80,72 120,78 160,84 200,60 240,68 280,76 320,48 360,55 400,62 440,40 480,45 520,50 560,30 600,35 L600,110 L0,110 Z"
                          fill="url(#chartGradHero)"
                          style={{ transition: 'd 600ms cubic-bezier(.2,.7,.2,1)' }}
                        />
                        <path
                          ref={chartPathRef}
                          d="M0,90 C40,85 80,72 120,78 160,84 200,60 240,68 280,76 320,48 360,55 400,62 440,40 480,45 520,50 560,30 600,35"
                          fill="none"
                          stroke="var(--lemon-600)"
                          strokeWidth="2"
                          style={{ transition: 'd 600ms cubic-bezier(.2,.7,.2,1)' }}
                        />
                        <defs>
                          <linearGradient id="chartGradHero" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--lemon-600)" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="var(--lemon-600)" stopOpacity="0.02" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Heatmap */}
                    <div
                      style={{
                        background: 'var(--mist)',
                        borderRadius: 'var(--r-sm)',
                        padding: '10px 12px',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-monospace)',
                          fontSize: 9,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase' as const,
                          color: 'var(--graphite-400)',
                          marginBottom: 8,
                        }}
                      >
                        Pipeline Heat by Role
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={i}
                            ref={setHeatRef(i)}
                            style={{
                              aspectRatio: '1',
                              borderRadius: 6,
                              background: 'var(--lemon)',
                              opacity: 0.5,
                              transition: 'opacity 180ms, background 180ms',
                            }}
                          />
                        ))}
                      </div>
                      {/* role labels */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(6, 1fr)',
                          gap: 4,
                          marginTop: 4,
                        }}
                      >
                        {['SA', 'SWE', 'PM', 'OL', 'DS', 'FN'].map((r) => (
                          <div
                            key={r}
                            style={{
                              fontFamily: 'var(--font-monospace)',
                              fontSize: 7.5,
                              textAlign: 'center',
                              color: 'var(--graphite-300)',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {r}
                          </div>
                        ))}
                      </div>

                      {/* Sparkline */}
                      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <svg width="50" height="14" viewBox="0 0 50 14" style={{ overflow: 'visible' }}>
                          <polyline
                            ref={sparkRef}
                            points="0,8 5,4 10,6 15,3 20,7 25,5 30,2 35,6 40,4 45,7"
                            fill="none"
                            stroke="var(--lemon-600)"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ transition: 'points 100ms' }}
                          />
                        </svg>
                        <span
                          style={{
                            fontFamily: 'var(--font-monospace)',
                            fontSize: 8,
                            color: 'var(--graphite-300)',
                          }}
                        >
                          7d trend
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Activity ticker */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      borderTop: '1px solid var(--graphite-100)',
                      paddingTop: 8,
                      minHeight: 22,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-monospace)',
                        fontSize: 8.5,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase' as const,
                        color: 'var(--graphite-300)',
                        flexShrink: 0,
                      }}
                    >
                      ACTIVITY
                    </span>
                    <div
                      ref={feedRef}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 10.5,
                        color: 'var(--graphite-500)',
                        transition: 'opacity 200ms',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: 'var(--signal)',
                          flexShrink: 0,
                        }}
                      />
                      New hire accepted&nbsp;&mdash;&nbsp;Senior Analyst, Global Ops
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ───── Stats Bar ───── */}
        <div className="hero-stats">
          <div className="hero-stat-item">
            <div className="hero-stat-value">80<span className="stat-accent">%</span></div>
            <div className="hero-stat-label">Decrease in HR Workflow</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-value">&lt; 24<span className="stat-accent"> Hrs</span></div>
            <div className="hero-stat-label">Time to Shortlist</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-value">100<span className="stat-accent">%</span></div>
            <div className="hero-stat-label">Psychometric Coverage</div>
          </div>
        </div>
      </div>
    </section>
  )
}
