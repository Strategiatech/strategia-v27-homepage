'use client'

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'

type Signal = {
  label: string
  metric: string
  title: string
  body: string
}

type Hero = {
  id: 'prism' | 'atlas' | 'scenario' | 'ledger'
  nav: string
  eyebrow: string
  title: string
  body: string
  primary: string
  secondary: string
  stat: string
  statLabel: string
  signals: Signal[]
}

const HEROES: Hero[] = [
  {
    id: 'prism',
    nav: 'Prism',
    eyebrow: 'AI-native workforce intelligence',
    title: 'See every workforce decision as a living system.',
    body: 'Strategia converts job fit, role pressure, behavioural evidence, and operational context into one executive decision layer for healthcare organisations.',
    primary: 'Request Executive Briefing',
    secondary: 'View Operating Atlas',
    stat: '342',
    statLabel: 'live decision signals',
    signals: [
      {
        label: 'Behaviour',
        metric: '94%',
        title: 'Human evidence, interpreted in context',
        body: 'Personality, motivation, resilience, and working style are translated into the reality of the role, not a generic score.',
      },
      {
        label: 'Context',
        metric: '38d',
        title: 'Pressure around the role made visible',
        body: 'Shift patterns, vacancy load, service pressure, manager capacity, and team conditions are read as part of the decision.',
      },
      {
        label: 'Structure',
        metric: '-31%',
        title: 'Execution drag surfaced before it compounds',
        body: 'Workflow friction, approval delays, and rework loops become visible while leaders can still intervene.',
      },
    ],
  },
  {
    id: 'atlas',
    nav: 'Atlas',
    eyebrow: 'Enterprise operating map',
    title: 'A command view of talent pressure across the system.',
    body: 'Map roles, sites, shortlists, retention exposure, and bottlenecks as connected signals so leaders can see where the workforce system is bending.',
    primary: 'Inspect Signal Map',
    secondary: 'Run Scenario',
    stat: '19',
    statLabel: 'mobility paths found',
    signals: [
      {
        label: 'Sites',
        metric: '12',
        title: 'Pressure clustered by site and service line',
        body: 'Leaders can see demand density across facilities instead of interpreting each requisition in isolation.',
      },
      {
        label: 'Roles',
        metric: '+18',
        title: 'Open roles ranked by operational consequence',
        body: 'Strategia highlights the roles that create the most downstream pressure, not just the oldest vacancies.',
      },
      {
        label: 'Teams',
        metric: '87',
        title: 'Team fit read alongside candidate evidence',
        body: 'Manager dynamics and team composition shape confidence before a hiring decision reaches final review.',
      },
    ],
  },
  {
    id: 'scenario',
    nav: 'Simulate',
    eyebrow: 'Workforce scenario intelligence',
    title: 'Model the move before the organisation feels it.',
    body: 'Test hiring sequence, internal mobility, assessment weighting, and role redesign against vacancy pressure and retention risk before committing resources.',
    primary: 'Run Scenario',
    secondary: 'Trace Evidence',
    stat: '12 mo',
    statLabel: 'forecast horizon',
    signals: [
      {
        label: 'Baseline',
        metric: '1.0x',
        title: 'Current exposure becomes the starting line',
        body: 'Open demand, ageing requisitions, and team pressure establish the current risk floor.',
      },
      {
        label: 'Intervention',
        metric: '8w',
        title: 'Leadership options are tested before rollout',
        body: 'Leaders can compare sequencing, mobility, assessment depth, and manager calibration before action.',
      },
      {
        label: 'Forecast',
        metric: '$3B',
        title: 'Impact is returned as confidence, cost, and time',
        body: 'Each path returns expected velocity, retention exposure, shortlist confidence, and operating consequence.',
      },
    ],
  },
  {
    id: 'ledger',
    nav: 'Ledger',
    eyebrow: 'Defensible intelligence',
    title: 'Every recommendation carries its evidence trail.',
    body: 'Strategia makes sensitive workforce decisions explainable, reviewable, and ready for executive, clinical, and compliance scrutiny.',
    primary: 'Review Controls',
    secondary: 'Return to Prism',
    stat: '100%',
    statLabel: 'audit coverage',
    signals: [
      {
        label: 'Explain',
        metric: '1:1',
        title: 'Decision logic remains reviewable',
        body: 'Each recommendation carries source signals, confidence indicators, and reasoning leaders can defend.',
      },
      {
        label: 'Protect',
        metric: 'SOC',
        title: 'Sensitive evidence is handled deliberately',
        body: 'The interface exposes the evidence leaders need while preserving privacy and access boundaries.',
      },
      {
        label: 'Improve',
        metric: '+7%',
        title: 'Feedback loops improve the next decision',
        body: 'Hiring outcomes, retention signals, and manager feedback sharpen future recommendations without losing accountability.',
      },
    ],
  },
]

function TriangleMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 140" fill="none" aria-hidden="true">
      <path d="M80 7L153 133H7L80 7Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M80 34L126 116H34L80 34Z" stroke="currentColor" strokeWidth="1" opacity=".52" />
      <path d="M80 62L103 104H57L80 62Z" fill="currentColor" opacity=".12" />
    </svg>
  )
}

function SignalField({ variant }: { variant: Hero['id'] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const activeCanvas = canvas
    const context = ctx
    let raf = 0
    let width = 0
    let height = 0
    let pointer = { x: -9999, y: -9999 }
    const total = variant === 'scenario' ? 82 : 68
    const nodes = Array.from({ length: total }, (_, index) => ({
      seed: index / total,
      phase: Math.random() * Math.PI * 2,
      radius: .18 + Math.random() * .44,
      speed: .1 + Math.random() * .2,
      size: .7 + Math.random() * 1.8,
    }))

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const rect = activeCanvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      activeCanvas.width = width * dpr
      activeCanvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw(now: number) {
      const t = now * .001
      context.clearRect(0, 0, width, height)
      const cx = width * (variant === 'atlas' ? .5 : .62)
      const cy = height * .5
      const scale = Math.min(width, height)
      const points: { x: number; y: number; a: number; size: number }[] = []

      context.strokeStyle = 'rgba(236, 237, 235, .06)'
      context.lineWidth = 1
      for (let i = 0; i < 8; i++) {
        const y = height * (.18 + i * .085)
        context.beginPath()
        context.moveTo(width * .18, y)
        context.lineTo(width * .88, y + Math.sin(t + i) * 12)
        context.stroke()
      }

      for (let ring = 0; ring < 3; ring++) {
        const inset = scale * (.06 * ring)
        context.strokeStyle = ring === 0 ? 'rgba(252, 240, 153, .42)' : `rgba(236,237,235,${.16 - ring * .04})`
        context.beginPath()
        context.moveTo(cx, cy - scale * .34 + inset)
        context.lineTo(cx - scale * .36 + inset, cy + scale * .28 - inset * .35)
        context.lineTo(cx + scale * .36 - inset, cy + scale * .28 - inset * .35)
        context.closePath()
        context.stroke()
      }

      nodes.forEach((node, index) => {
        let x = 0
        let y = 0
        if (variant === 'scenario') {
          const column = index % 14
          const row = Math.floor(index / 14)
          x = width * (.2 + column * .046)
          y = height * (.26 + row * .086 + Math.sin(t * node.speed + node.phase) * .02)
        } else if (variant === 'ledger') {
          x = width * (.34 + (index % 8) * .06)
          y = height * (.22 + Math.floor(index / 8) * .07)
          x += Math.sin(t * node.speed + node.phase) * 14
        } else {
          const angle = node.seed * Math.PI * 2 + t * node.speed
          const radius = scale * (node.radius + Math.sin(t * node.speed + node.phase) * .016)
          x = cx + Math.cos(angle) * radius
          y = cy + Math.sin(angle * 1.25) * radius * .68
        }

        const distance = Math.hypot(x - pointer.x, y - pointer.y)
        const lift = distance < 170 ? (1 - distance / 170) * 28 : 0
        points.push({ x: x + lift, y: y - lift, a: .22 + Math.sin(t * 1.2 + node.phase) * .16, size: node.size })
      })

      points.forEach((point, i) => {
        for (let j = i + 1; j < points.length; j++) {
          const next = points[j]
          const distance = Math.hypot(point.x - next.x, point.y - next.y)
          if (distance < 112) {
            context.strokeStyle = `rgba(236, 237, 235, ${(1 - distance / 112) * .09})`
            context.beginPath()
            context.moveTo(point.x, point.y)
            context.lineTo(next.x, next.y)
            context.stroke()
          }
        }
      })

      points.forEach((point, index) => {
        const color = index % 9 === 0 ? '252,240,153' : index % 5 === 0 ? '16,185,129' : '236,237,235'
        context.fillStyle = `rgba(${color},${point.a})`
        context.beginPath()
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2)
        context.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    const onMove = (event: MouseEvent) => {
      const rect = activeCanvas.getBoundingClientRect()
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }
    const onLeave = () => { pointer = { x: -9999, y: -9999 } }

    resize()
    window.addEventListener('resize', resize)
    activeCanvas.addEventListener('mousemove', onMove)
    activeCanvas.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      activeCanvas.removeEventListener('mousemove', onMove)
      activeCanvas.removeEventListener('mouseleave', onLeave)
    }
  }, [variant])

  return <canvas ref={canvasRef} className="v8-signal-field" aria-hidden="true" />
}

function useAutoSignal(signals: Signal[]) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % signals.length), 3600)
    return () => window.clearInterval(timer)
  }, [signals.length])

  return { active, setActive, signal: signals[active] }
}

function LayerControls({ signals, active, setActive }: { signals: Signal[]; active: number; setActive: (index: number) => void }) {
  return (
    <div className="v8-layer-controls">
      {signals.map((signal, index) => (
        <button
          key={signal.label}
          className={active === index ? 'active' : ''}
          type="button"
          onClick={() => setActive(index)}
          onMouseEnter={() => setActive(index)}
        >
          <span>{signal.label}</span>
          <strong>{signal.metric}</strong>
        </button>
      ))}
    </div>
  )
}

function PrismVisual({ hero }: { hero: Hero }) {
  const { active, setActive, signal } = useAutoSignal(hero.signals)

  return (
    <div className="v8-visual v8-visual-prism">
      <div className="v8-lockup"><img src="/images/logos/STRATEGIA_INLINE_SILVER.svg" alt="" /><span>Decision Prism</span></div>
      <div className="v8-prism-stage">
        <TriangleMark className="v8-prism-mark" />
        <div className="v8-prism-core"><span>{signal.label}</span><strong>{signal.metric}</strong></div>
        <i className="v8-axis v8-axis-a" />
        <i className="v8-axis v8-axis-b" />
        <i className="v8-axis v8-axis-c" />
      </div>
      <LayerControls signals={hero.signals} active={active} setActive={setActive} />
      <div className="v8-evidence">
        <span>Active signal</span>
        <h3>{signal.title}</h3>
        <p>{signal.body}</p>
      </div>
    </div>
  )
}

function AtlasVisual({ hero }: { hero: Hero }) {
  const { active, setActive, signal } = useAutoSignal(hero.signals)
  const nodes = [
    ['North', '72%', '18%'],
    ['West', '20%', '34%'],
    ['Central', '48%', '48%'],
    ['South', '72%', '68%'],
    ['East', '28%', '76%'],
  ]

  return (
    <div className="v8-visual v8-visual-atlas">
      <div className="v8-lockup"><img src="/images/logos/STRATEGIA_INLINE_SILVER.svg" alt="" /><span>Operating Atlas</span></div>
      <div className="v8-atlas-map">
        <div className="v8-atlas-route v8-route-a" />
        <div className="v8-atlas-route v8-route-b" />
        {nodes.map(([label, left, top], index) => (
          <button
            key={label}
            className={`v8-atlas-node ${index === active + 1 ? 'active' : ''}`}
            style={{ left, top }}
            type="button"
            onClick={() => setActive(index % hero.signals.length)}
            onMouseEnter={() => setActive(index % hero.signals.length)}
          >
            <span>{label}</span>
          </button>
        ))}
        <TriangleMark className="v8-atlas-mark" />
      </div>
      <div className="v8-atlas-readout">
        <span>{signal.label}</span>
        <strong>{signal.metric}</strong>
        <p>{signal.title}</p>
      </div>
      <LayerControls signals={hero.signals} active={active} setActive={setActive} />
    </div>
  )
}

function ScenarioVisual({ hero }: { hero: Hero }) {
  const { active, setActive, signal } = useAutoSignal(hero.signals)
  const bars = [54, 72, 46, 86, 62, 78, 52, 92, 66, 74, 58, 84]

  return (
    <div className="v8-visual v8-visual-scenario">
      <div className="v8-lockup"><img src="/images/logos/STRATEGIA_INLINE_SILVER.svg" alt="" /><span>Scenario Engine</span></div>
      <div className="v8-scenario-chart">
        {bars.map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
        <svg viewBox="0 0 520 180" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 138 C70 98 118 112 176 78 C238 42 302 92 356 56 C414 20 466 44 520 26" />
          <path d="M0 154 C74 132 126 140 188 118 C264 90 314 138 382 102 C438 72 484 86 520 64" />
        </svg>
      </div>
      <div className="v8-scenario-output">
        <span>{signal.label}</span>
        <strong>{signal.metric}</strong>
        <p>{signal.title}</p>
      </div>
      <LayerControls signals={hero.signals} active={active} setActive={setActive} />
    </div>
  )
}

function LedgerVisual({ hero }: { hero: Hero }) {
  const { active, setActive, signal } = useAutoSignal(hero.signals)

  return (
    <div className="v8-visual v8-visual-ledger">
      <div className="v8-lockup"><img src="/images/logos/STRATEGIA_INLINE_SILVER.svg" alt="" /><span>Evidence Ledger</span></div>
      <div className="v8-ledger-stack">
        {hero.signals.map((item, index) => (
          <button
            key={item.label}
            className={index === active ? 'active' : ''}
            type="button"
            onClick={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
          >
            <span>0{index + 1} / {item.label}</span>
            <strong>{item.title}</strong>
            <em>{item.metric}</em>
          </button>
        ))}
      </div>
      <div className="v8-ledger-proof">
        <TriangleMark />
        <span>{signal.label}</span>
        <p>{signal.body}</p>
      </div>
    </div>
  )
}

function HeroVisual({ hero }: { hero: Hero }) {
  if (hero.id === 'atlas') return <AtlasVisual hero={hero} />
  if (hero.id === 'scenario') return <ScenarioVisual hero={hero} />
  if (hero.id === 'ledger') return <LedgerVisual hero={hero} />
  return <PrismVisual hero={hero} />
}

function HeroSection({ hero, index }: { hero: Hero; index: number }) {
  const next = HEROES[(index + 1) % HEROES.length]

  return (
    <section
      className={`v8-hero v8-hero-${hero.id}`}
      id={hero.id}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
        event.currentTarget.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`)
      }}
    >
      <SignalField variant={hero.id} />
      <div className="v8-grid" />
      <div className="v8-beam" />
      <div className="v8-hero-inner">
        <div className="v8-copy">
          <div className="v8-kicker"><span>{String(index + 1).padStart(2, '0')}</span>{hero.eyebrow}</div>
          <h1>{hero.title}</h1>
          <p>{hero.body}</p>
          <div className="v8-actions">
            <a className="v8-primary" href="#briefing">{hero.primary}</a>
            <a className="v8-secondary" href={`#${next.id}`}>{hero.secondary}</a>
          </div>
        </div>

        <div className="v8-stage">
          <div className="v8-stage-word">{hero.nav}</div>
          <HeroVisual hero={hero} />
          <div className="v8-signature-stat">
            <strong>{hero.stat}</strong>
            <span>{hero.statLabel}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function V8StrategiaLanding() {
  return (
    <main className="v8-page">
      <nav className="v8-nav">
        <a className="v8-logo" href="#prism" aria-label="Strategia home">
          <img src="/images/logos/STRATEGIA_INLINE_SILVER.svg" alt="Strategia" />
        </a>
        <div className="v8-nav-links">
          {HEROES.map((hero) => <a key={hero.id} href={`#${hero.id}`}>{hero.nav}</a>)}
        </div>
        <a className="v8-nav-cta" href="#briefing">Briefing</a>
      </nav>

      {HEROES.map((hero, index) => <HeroSection key={hero.id} hero={hero} index={index} />)}

      <section className="v8-briefing" id="briefing">
        <img src="/images/logos/STRATEGIA_STACKED_SILVER.svg" alt="Strategia" />
        <div>
          <span>Strategia Intelligence Systems</span>
          <h2>Make workforce decisions visible, defensible, and fast.</h2>
          <p>AI-native workforce intelligence for enterprise healthcare.</p>
        </div>
        <a className="v8-primary" href="mailto:hello@strategia.tech">Request Executive Briefing</a>
      </section>
    </main>
  )
}
