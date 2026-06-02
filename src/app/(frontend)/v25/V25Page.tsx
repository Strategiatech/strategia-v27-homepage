'use client'

import { type MouseEvent, useEffect, useRef, useState } from 'react'
import { initTetrahedron } from './tetrahedron'
import './v25.css'

/* eslint-disable @next/next/no-img-element */

type Module = { num: string; tag: PhaseName; title: string; desc: string }
type PhaseName = 'Foundation' | 'Screen' | 'Assess' | 'Decide' | 'Operate'

const MODULES: Module[] = [
  { num: 'M01', tag: 'Foundation', title: 'V-Job', desc: 'Generative AI turns any input into a structured competency model mapped to role family and weighted against published validity research.' },
  { num: 'M02', tag: 'Screen', title: 'V-Parse', desc: '1,000 CVs per hour into structured talent data. Domain-specific algorithms for high-precision matching beyond keyword filters.' },
  { num: 'M03', tag: 'Assess', title: 'V-Psych', desc: '5 to 7 minute proprietary OCEAN-based assessment with T-score conversion. Validated against role-specific performance indicators.' },
  { num: 'M04', tag: 'Assess', title: 'V-Interview', desc: '24/7 on-demand AI avatar interviews. Structured NLP scoring reduces interviewer variability and mitigates bias.' },
  { num: 'M06', tag: 'Assess', title: 'V-Scenario', desc: 'Interactive role-specific scenarios from patient care to executive decisions. Multi-dimensional scoring with strengths and risks.' },
  { num: 'M05', tag: 'Decide', title: 'V-Fit', desc: 'Triangulates V-Parse, V-Psych, and V-Interview into a single composite match score with full evidence trail.' },
  { num: 'M07', tag: 'Operate', title: 'V-Onboarding', desc: "Custom plans for the first 90 days, tailored to the hire's psychometric profile, role, and team composition." },
  { num: 'M08', tag: 'Operate', title: 'V-Insights', desc: 'Group-level visibility with phase-based maturity. Internal mobility scoring against every internal opening.' },
]

// V21 #11 — surface the 5-phase architecture that was hidden in V20.
const PHASES: { step: string; name: PhaseName; desc: string }[] = [
  { step: '01', name: 'Foundation', desc: 'Author the competency spec.' },
  { step: '02', name: 'Screen', desc: 'Process every applicant.' },
  { step: '03', name: 'Assess', desc: 'Three independent signals.' },
  { step: '04', name: 'Decide', desc: 'One composite score.' },
  { step: '05', name: 'Operate', desc: 'Onboard, observe, recalibrate.' },
]

const SOLUTIONS = [
  {
    role: 'Chief Executive Officer',
    title: 'Hospital CEO',
    quote: '"Can I see, in real time, whether the workforce that delivers my margins is the workforce I will have in twelve months?"',
    body: 'Workforce intelligence at the level your strategy operates on, not the level your HRIS reports on. Service-line risk, retention forecasts, and capital implications in one weekly brief.',
  },
  {
    role: 'Chief Human Resources Officer',
    title: 'CHRO',
    quote: '"How do I make every hiring decision defensible to the board, to the General Counsel, and to a regulator, on the same day?"',
    body: 'Replace binders, disparate vendors, and gut-feel reviews with a single instrument that produces an audit packet for every requisition.',
  },
  {
    role: 'VP Talent · Recruiting Lead',
    title: 'Talent Acquisition',
    quote: '"How do I move a recruiter managing 70 reqs from drowning to operating, without sacrificing quality?"',
    body: 'Interview 150 of 200 applicants, not 4. Recruiters do the relationships; the engine does the synthesis.',
  },
  {
    role: 'CMO · CNO · Service-line Chief',
    title: 'Clinical Operations',
    quote: '"How do I keep the floor safely staffed without burning out the team I have left?"',
    body: 'Match clinicians to roles where their cognitive, behavioral, and clinical-competence profile predicts they will perform, and stay.',
  },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Spec', module: 'V-Job.', desc: 'V-Job turns whatever you have (a paragraph, a JD template, a skills list) into a structured competency model mapped to the right role family.' },
  { num: '02', title: 'Screen', module: 'V-Parse.', desc: 'V-Parse processes 1,000 CVs per hour, scoring every applicant against the spec. Wildcards surface as a separate band.' },
  { num: '03', title: 'Assess', module: 'V-Psych + V-Interview + V-Scenario.', desc: 'V-Psych runs the OCEAN battery. V-Interview conducts 24/7 structured interviews. V-Scenario tests competence on real-world clinical scenarios.' },
  { num: '04', title: 'Decide', module: 'V-Fit.', desc: 'V-Fit triangulates all signals into a single composite match score per candidate. Typically 40/20/40, customizable per role family.' },
  { num: '05', title: 'Operate', module: 'V-Onboarding + V-Insights.', desc: 'V-Onboarding turns the assessment into a 90-day plan. V-Insights closes the loop. Performance data flows back to recalibrate the model.' },
]

const BADGES = [
  'SOC 2 Type II', 'HIPAA', 'HITRUST CSF', 'EEOC / OFCCP',
  'Single tenant', 'U.S. data residency', 'SAML / OIDC SSO', 'BAA included',
]

type V25PageProps = {
  /** Replace V25's in-page anchor nav with a custom node (e.g. VxNav for /vx). */
  navSlot?: React.ReactNode
  /** Replace V25's inline footer with a custom node (e.g. VxFooter for /vx). */
  footerSlot?: React.ReactNode
  /** Render the three alternate Triangulate layouts (hub, pipeline, ledger)
   *  beneath the canonical section. Only used by /vx as a design playground. */
  showTriangulateVariants?: boolean
  /** When true, the inline body links that point at /vx/* subpages stay
   *  visible (Read the research, Methodology, Full process, Talk to us,
   *  Enterprise & security, Deployment process) but become non-navigating
   *  — used by /v26 so the snapshot is self-contained. */
  inertOutboundLinks?: boolean
}

export default function V25Page({ navSlot, footerSlot, showTriangulateVariants = false, inertOutboundLinks = false }: V25PageProps = {}) {
  const outboundProps = (href: string) =>
    inertOutboundLinks
      ? { href: '#', onClick: (e: MouseEvent<HTMLAnchorElement>) => e.preventDefault() }
      : { href }
  const navRef = useRef<HTMLElement>(null)
  // V21 #12 — slider min raised from 200 → 500 FTEs so the platform-cost
  // floor at $250K doesn't suppress the savings number unrealistically.
  const [ftes, setFtes] = useState(3500)
  const [turnover, setTurnover] = useState(21)
  const [replacementCost, setReplacementCost] = useState(58000)

  const current = ftes * (turnover / 100) * replacementCost
  const newCost = current * 0.74
  const platformCost = Math.max(250_000, ftes * 700)
  const net = current - newCost - platformCost
  const bigValue =
    net >= 1_000_000 ? (net / 1_000_000).toFixed(2) + 'M' : Math.round(net / 1_000) + 'K'

  const [complete, setComplete] = useState(false)

  /* Variant B (hub & spoke) spoke geometry. Paths are computed from the live
     card and hub positions so each spoke actually terminates on the hub-inner
     edge regardless of viewport — the fixed-pixel paths the SVG shipped with
     never aligned to the real grid (cards on a clamp()-driven 3x2) and got
     squashed further by preserveAspectRatio="none". */
  const triBOrbitRef = useRef<HTMLDivElement>(null)
  const [triBLines, setTriBLines] = useState<{
    w: number
    h: number
    parse: string
    psych: string
    interview: string
  } | null>(null)

  useEffect(() => {
    if (!showTriangulateVariants) return
    const orbit = triBOrbitRef.current
    if (!orbit) return

    const compute = () => {
      const parseEl = orbit.querySelector<HTMLElement>('.v25-triB-node--parse')
      const psychEl = orbit.querySelector<HTMLElement>('.v25-triB-node--psych')
      const ivEl = orbit.querySelector<HTMLElement>('.v25-triB-node--interview')
      const hubEl = orbit.querySelector<HTMLElement>('.v25-triB-hub-inner')
      if (!parseEl || !psychEl || !ivEl || !hubEl) return

      const oRect = orbit.getBoundingClientRect()
      if (oRect.width === 0) return

      const local = (el: HTMLElement) => {
        const r = el.getBoundingClientRect()
        return {
          left: r.left - oRect.left,
          top: r.top - oRect.top,
          right: r.right - oRect.left,
          bottom: r.bottom - oRect.top,
          cx: r.left + r.width / 2 - oRect.left,
          cy: r.top + r.height / 2 - oRect.top,
        }
      }
      const p = local(parseEl)
      const ps = local(psychEl)
      const iv = local(ivEl)
      const h = local(hubEl)
      const hubR = hubEl.offsetWidth / 2

      const onHubEdge = (sx: number, sy: number) => {
        const dx = h.cx - sx
        const dy = h.cy - sy
        const len = Math.hypot(dx, dy) || 1
        return { x: h.cx - (dx / len) * hubR, y: h.cy - (dy / len) * hubR }
      }

      // Gravity-curve: control point at the midpoint, pulled 45% toward
      // the hub centre so each spoke bends inward as it approaches the
      // target rather than running straight.
      const curve = (ax: number, ay: number, bx: number, by: number) => {
        const mx = (ax + bx) / 2
        const my = (ay + by) / 2
        const cx = mx * 0.55 + h.cx * 0.45
        const cy = my * 0.55 + h.cy * 0.45
        return `M${ax.toFixed(1)} ${ay.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`
      }

      const parseStart = { x: p.cx, y: p.bottom }
      const psychStart = { x: ps.right, y: ps.cy }
      const ivStart = { x: iv.left, y: iv.cy }
      const parseEnd = onHubEdge(parseStart.x, parseStart.y)
      const psychEnd = onHubEdge(psychStart.x, psychStart.y)
      const ivEnd = onHubEdge(ivStart.x, ivStart.y)

      setTriBLines({
        w: oRect.width,
        h: oRect.height,
        parse: curve(parseStart.x, parseStart.y, parseEnd.x, parseEnd.y),
        psych: curve(psychStart.x, psychStart.y, psychEnd.x, psychEnd.y),
        interview: curve(ivStart.x, ivStart.y, ivEnd.x, ivEnd.y),
      })
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(orbit)
    if ('fonts' in document) {
      document.fonts.ready.then(compute).catch(() => {})
    }
    return () => ro.disconnect()
  }, [showTriangulateVariants])

  useEffect(() => {
    const cleanup = initTetrahedron()
    return cleanup
  }, [])

  useEffect(() => {
    const handler = () => setComplete(true)
    window.addEventListener('v25:complete', handler)
    return () => window.removeEventListener('v25:complete', handler)
  }, [])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <div className={`v25${complete ? ' v25--complete' : ''}`}>
      <div className="v25-pulse-overlay" id="v25PulseOverlay" aria-hidden="true" />

      {/* ================================================================
          NAVIGATION  (V21 #2 — visible from page load)
          ================================================================ */}
      {navSlot ?? (
        <nav className="v25-nav" ref={navRef}>
          <a href="/v25" className="v25-nav-logo">
            <svg className="v25-nav-mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M20 4L36 34H4L20 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            </svg>
            <img src="/images/brand/strategia-wordmark-white.svg" alt="Strategia" />
          </a>
          <ul className="v25-nav-links">
            <li><a href="#platform" className="v25-nav-link">Platform</a></li>
            <li><a href="#modules" className="v25-nav-link">Modules</a></li>
            <li><a href="#science" className="v25-nav-link">Science</a></li>
            <li><a href="#solutions" className="v25-nav-link">Solutions</a></li>
            <li><a href="#enterprise" className="v25-nav-link">Enterprise</a></li>
            <li><a href="#process" className="v25-nav-link">Process</a></li>
            <li><a href="#careers" className="v25-nav-link">Careers</a></li>
          </ul>
          <a href="#demo" className="v25-nav-cta">Book demo</a>
        </nav>
      )}

      {/* ================================================================
          HERO — Tetrahedron
          ================================================================ */}
      <section className="v25-hero">
        <div className="v25-cursor-aura" id="v25CursorAura" aria-hidden="true" />
        <div className="v25-plasma-layer" id="v25PlasmaLayer" aria-hidden="true" />

        <div className="v25-hero-copy">
          <h1>AI-Native<br />Workforce<br /><span className="accent accent--sky">Intelligence.</span></h1>
          <p>
            Predict performance before it lands. Defend every decision after it does.
            A multi-module platform that automates 80% of healthcare hiring, built
            for HR and executive teams.
          </p>
          <div className="v25-hero-actions">
            <a href="#demo" className="v25-btn-primary">Book a demo</a>
            <a href="#platform" className="v25-link-arrow">
              Explore the platform<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>

        <div className="v25-tetra-stage" id="v25Stage">
          <svg id="v25Tetra" viewBox="-110 -110 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <radialGradient id="v25CoreGlow" cx="50%" cy="50%" r="50%">
                <stop id="v25GlowStop0" offset="0%" stopColor="var(--glow-color)" stopOpacity="0.55" />
                <stop id="v25GlowStop1" offset="40%" stopColor="var(--glow-color)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--glow-color)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="v25PulseGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--glow-color)" stopOpacity="0" />
                <stop offset="55%" stopColor="var(--glow-color)" stopOpacity="0.55" />
                <stop offset="78%" stopColor="var(--glow-color)" stopOpacity="0.30" />
                <stop offset="100%" stopColor="var(--glow-color)" stopOpacity="0" />
              </radialGradient>
              <filter id="v25GlowBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="v25PulseBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
            </defs>
            <g id="v25Pulses" />
            <circle id="v25Glow" cx="0" cy="0" r="60" fill="url(#v25CoreGlow)" filter="url(#v25GlowBlur)" />
            <g id="v25Edges" />
          </svg>

          <div className="v25-brand-lockup" id="v25BrandLockup" aria-hidden="true">
            <img src="/images/brand/strategia-wordmark-white.svg" alt="Strategia" />
          </div>
        </div>
      </section>
      <div className="v25-scroll-spacer" aria-hidden="true" />

      {/* ================================================================
          STATS  (V21 #6 — decorative "01 / Outcome" header removed;
          stat values scaled up to read first.)
          ================================================================ */}
      <section className="v25-stats v25-section--light v25-reveal">
        <div className="v25-stats-grid">
          <div className="v25-stat-card">
            <div className="v25-stat-value">80%</div>
            <div className="v25-stat-label">Of internal recruitment automated</div>
            <div className="v25-stat-sub">Median across deployed health systems</div>
          </div>
          <div className="v25-stat-card">
            <div className="v25-stat-value">&lt;25 min</div>
            <div className="v25-stat-label">1,000 CVs end-to-end</div>
            <div className="v25-stat-sub">From requisition to ranked shortlist</div>
          </div>
          <div className="v25-stat-card">
            <div className="v25-stat-value">0.74</div>
            <div className="v25-stat-label">Match-score validity (mature)</div>
            <div className="v25-stat-sub">vs. 0.18 for resume review (Sackett 2022)</div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PLATFORM — 8 Modules grouped by phase
          (V21 #11 — the 5-phase loop is now visible. V21 #4 — terse h2,
          no muted-clause tail.)
          ================================================================ */}
      <section className="v25-section" id="modules">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">The Platform &middot; 08 V-modules</div>
              <h2 className="v25-h2">Eight modules. <span className="accent accent--teal">One hire-and-retain loop.</span></h2>
            </div>
            <a href="#platform" className="v25-link-arrow">
              All modules<span aria-hidden="true"> ↗</span>
            </a>
          </div>

          <div className="v25-modules-phased">
            {PHASES.map((phase) => {
              const phaseModules = MODULES.filter((m) => m.tag === phase.name)
              const cardCountClass =
                phaseModules.length === 1
                  ? 'v25-module-phase-cards--1'
                  : phaseModules.length === 2
                  ? 'v25-module-phase-cards--2'
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
                        <div className="v25-module-header">
                          <span className="v25-module-num">{mod.num}</span>
                          <span className="v25-module-tag">{mod.tag}</span>
                        </div>
                        <div className="v25-module-title">{mod.title}</div>
                        <p className="v25-module-desc">{mod.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          TRIANGULATE METHOD (V-FIT)
          V25 — each signal card carries its own evidence, three
          converging lines visualize synthesis, and the result panel is
          a compact banner: score stacked above the verdict pill on the
          left, a 48px weighting bar on the right, operational meta in
          the footer.
          ================================================================ */}
      <section className="v25-triangulate v25-section--light">
        <div className="v25-triangulate-inner v25-reveal">
          <div className="v25-tri-intro">
            <div className="v25-tri-intro-lead">
              <div className="v25-eyebrow">The Triangulate Method&trade;</div>
              <h2 className="v25-h2">Three signals. <span className="accent accent--lime">One score.</span></h2>
            </div>
            <p className="v25-tri-intro-desc">
              V-Parse, V-Psych, and V-Interview each produce a structured signal against the
              V-Job spec. V-Fit triangulates them into a single defensible score per
              candidate, with weighting and evidence attached.
            </p>
            <div className="v25-tri-board-meta">
              <span className="v25-tri-board-meta-key">Role</span>
              <span className="v25-tri-board-meta-value">ICU Nurse Specialist</span>
              <span className="v25-tri-board-meta-sep">&middot;</span>
              <span className="v25-tri-board-meta-sub">authored by V-Job</span>
            </div>
          </div>

          <div className="v25-tri-board">
            <div className="v25-tri-signals">
              <article className="v25-tri-signal v25-tri-signal--parse">
                <header className="v25-tri-signal-head">
                  <span className="v25-tri-signal-kind">CV signal</span>
                  <span className="v25-tri-signal-weight">40%</span>
                </header>
                <div className="v25-tri-signal-name">V-Parse&trade;</div>
                <div className="v25-tri-signal-evidence">
                  <div className="v25-tri-signal-evidence-text">Reg. Nurse (RN) License</div>
                  <div className="v25-tri-signal-evidence-sub">Verified &middot; Lic. ID #PR01</div>
                </div>
              </article>
              <article className="v25-tri-signal v25-tri-signal--psych">
                <header className="v25-tri-signal-head">
                  <span className="v25-tri-signal-kind">Psych signal</span>
                  <span className="v25-tri-signal-weight">20%</span>
                </header>
                <div className="v25-tri-signal-name">V-Psych&trade;</div>
                <div className="v25-tri-signal-evidence">
                  <div className="v25-tri-signal-evidence-text">Resilience + Empathy</div>
                  <div className="v25-tri-signal-evidence-sub">T = 64 / 61 &middot; ICU role-fit cohort</div>
                </div>
              </article>
              <article className="v25-tri-signal v25-tri-signal--interview">
                <header className="v25-tri-signal-head">
                  <span className="v25-tri-signal-kind">Interview signal</span>
                  <span className="v25-tri-signal-weight">40%</span>
                </header>
                <div className="v25-tri-signal-name">V-Interview&trade;</div>
                <div className="v25-tri-signal-evidence">
                  <div className="v25-tri-signal-evidence-text">Decision quality</div>
                  <div className="v25-tri-signal-evidence-sub">0.91 weighted &middot; 4 scenario probes</div>
                </div>
              </article>
            </div>

            {/* Tree manifold rendered as one smooth glowing teal line.
                Each arm is a single path: vertical stub from the card
                centre, a quadratic curve at the corner, then horizontal
                into the centre. The centre spine is one straight line
                from card 2 through the manifold down to the synthesis
                dot, so the centre stub and trunk are visually a single
                stroke. The CSS drop-shadow on the SVG keeps the glow
                halo uniform regardless of the SVG's stretch. */}
            <div className="v25-tri-converge">
              <svg className="v25-tri-converge-svg" viewBox="0 0 600 110" preserveAspectRatio="none" aria-hidden="true">
                <g stroke="#00C6C1" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
                  <path d="M100 0 V22 Q100 30 108 30 H300" strokeOpacity="0.85" />
                  <path d="M500 0 V22 Q500 30 492 30 H300" strokeOpacity="0.85" />
                  <path d="M300 0 V104" strokeOpacity="1" />
                </g>
              </svg>
            </div>
            <div className="v25-tri-converge-dot" />

            <div className="v25-tri-result">
              <div className="v25-tri-result-header">
                <span className="status">V-Fit &middot; Synthesis complete</span>
                <span>L. Ortega &middot; ICU Nurse Specialist</span>
              </div>
              <div className="v25-tri-result-body">
                <div className="v25-tri-score">
                  <div className="v25-tri-score-label">JobFit&trade; Score</div>
                  <div className="v25-tri-score-value">94</div>
                  <div className="v25-tri-verdict">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M3 7l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Highly recommended
                  </div>
                </div>
                <div className="v25-tri-weighting">
                  <div className="v25-tri-weighting-label">Signal weighting</div>
                  <div className="v25-tri-weighting-bar">
                    <span className="v25-tri-weighting-seg v25-tri-weighting-seg--parse" style={{ flex: 40 }}>
                      <span className="v25-tri-weighting-pct">40</span>
                      <span className="v25-tri-weighting-name">Parse</span>
                    </span>
                    <span className="v25-tri-weighting-seg v25-tri-weighting-seg--psych" style={{ flex: 20 }}>
                      <span className="v25-tri-weighting-pct">20</span>
                      <span className="v25-tri-weighting-name">Psych</span>
                    </span>
                    <span className="v25-tri-weighting-seg v25-tri-weighting-seg--interview" style={{ flex: 40 }}>
                      <span className="v25-tri-weighting-pct">40</span>
                      <span className="v25-tri-weighting-name">Interview</span>
                    </span>
                  </div>
                  <div className="v25-tri-weighting-meta">Default split, customizable per role family</div>
                </div>
              </div>
              <div className="v25-tri-result-footer">
                <span>Generated 14 Nov &middot; 2.3s synthesis</span>
                <span>Audit packet &middot; 7-year retention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TRIANGULATE — VARIANTS B/C/D  (alternate compositions)
          Only rendered on /vx where showTriangulateVariants is true, so /v25
          stays a single canonical layout while /vx serves as the design
          playground for picking the final triangulate composition.
          ================================================================ */}
      {showTriangulateVariants && (
      <>
      {/* ================================================================
          TRIANGULATE — VARIANT B  (HUB & SPOKE / RADIAL)
          Same data, hub-and-spoke composition. The V-Fit JobFit dial
          sits at the center; three signal cards orbit it. Animated
          SVG arcs draw in on scroll and a soft pulse rides the hub.
          ================================================================ */}
      <section className="v25-triangulate v25-triB v25-section--light">
        <div className="v25-triangulate-inner v25-reveal">
          <div className="v25-tri-variant-label">
            <span className="key">Variant B</span>
            <span className="sep">&middot;</span>
            <span className="value">Hub &amp; spoke</span>
            <span className="hint">Animated arcs</span>
          </div>

          <div className="v25-tri-intro">
            <div className="v25-tri-intro-lead">
              <div className="v25-eyebrow">The Triangulate Method&trade;</div>
              <h2 className="v25-h2">Three signals. <span className="accent accent--lime">One score.</span></h2>
            </div>
            <p className="v25-tri-intro-desc">
              V-Parse, V-Psych, and V-Interview each produce a structured signal against the
              V-Job spec. V-Fit triangulates them into a single defensible score per
              candidate, with weighting and evidence attached.
            </p>
            <div className="v25-tri-board-meta">
              <span className="v25-tri-board-meta-key">Role</span>
              <span className="v25-tri-board-meta-value">ICU Nurse Specialist</span>
              <span className="v25-tri-board-meta-sep">&middot;</span>
              <span className="v25-tri-board-meta-sub">authored by V-Job</span>
            </div>
          </div>

          <div className="v25-tri-board v25-triB-board">
            <div className="v25-triB-orbit" ref={triBOrbitRef}>
              {triBLines && (
                <svg
                  className="v25-triB-orbit-lines"
                  viewBox={`0 0 ${triBLines.w} ${triBLines.h}`}
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <g
                    fill="none"
                    stroke="#00C6C1"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path
                      d={triBLines.parse}
                      pathLength={100}
                      vectorEffect="non-scaling-stroke"
                      className="v25-triB-line v25-triB-line--parse"
                    />
                    <path
                      d={triBLines.psych}
                      pathLength={100}
                      vectorEffect="non-scaling-stroke"
                      className="v25-triB-line v25-triB-line--psych"
                    />
                    <path
                      d={triBLines.interview}
                      pathLength={100}
                      vectorEffect="non-scaling-stroke"
                      className="v25-triB-line v25-triB-line--interview"
                    />
                  </g>
                </svg>
              )}

              <article className="v25-triB-node v25-triB-node--parse">
                <header>
                  <span className="kind">CV signal</span>
                  <span className="weight">40%</span>
                </header>
                <div className="name">V-Parse&trade;</div>
                <div className="evidence">Reg. Nurse (RN) License</div>
                <div className="sub">Verified &middot; Lic. ID #PR01</div>
              </article>

              <article className="v25-triB-node v25-triB-node--psych">
                <header>
                  <span className="kind">Psych signal</span>
                  <span className="weight">20%</span>
                </header>
                <div className="name">V-Psych&trade;</div>
                <div className="evidence">Resilience + Empathy</div>
                <div className="sub">T = 64 / 61 &middot; ICU cohort</div>
              </article>

              <article className="v25-triB-node v25-triB-node--interview">
                <header>
                  <span className="kind">Interview signal</span>
                  <span className="weight">40%</span>
                </header>
                <div className="name">V-Interview&trade;</div>
                <div className="evidence">Decision quality</div>
                <div className="sub">0.91 weighted &middot; 4 probes</div>
              </article>

              <div className="v25-triB-hub" aria-label="V-Fit JobFit score 94, highly recommended">
                {/* Bullseye rings — three concentric circles centered on the
                    score pill. Outermost is a faint orbit ring, middle is the
                    breathing dashed band, innermost is the solid teal target. */}
                <div className="v25-triB-hub-ring v25-triB-hub-ring--orbit" aria-hidden="true" />
                <div className="v25-triB-hub-ring v25-triB-hub-ring--outer" aria-hidden="true" />
                <div className="v25-triB-hub-ring" aria-hidden="true" />
                <div className="v25-triB-hub-inner">
                  <span className="v25-triB-hub-label">JobFit&trade; Score</span>
                  <span className="v25-triB-hub-score">94</span>
                  <span className="v25-triB-hub-verdict">
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3 7l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Highly recommended
                  </span>
                </div>
              </div>
            </div>

            <div className="v25-triB-footer">
              <div className="v25-tri-weighting">
                <div className="v25-tri-weighting-label">Signal weighting</div>
                <div className="v25-tri-weighting-bar">
                  <span className="v25-tri-weighting-seg v25-tri-weighting-seg--parse" style={{ flex: 40 }}>
                    <span className="v25-tri-weighting-pct">40</span>
                    <span className="v25-tri-weighting-name">Parse</span>
                  </span>
                  <span className="v25-tri-weighting-seg v25-tri-weighting-seg--psych" style={{ flex: 20 }}>
                    <span className="v25-tri-weighting-pct">20</span>
                    <span className="v25-tri-weighting-name">Psych</span>
                  </span>
                  <span className="v25-tri-weighting-seg v25-tri-weighting-seg--interview" style={{ flex: 40 }}>
                    <span className="v25-tri-weighting-pct">40</span>
                    <span className="v25-tri-weighting-name">Interview</span>
                  </span>
                </div>
              </div>
              <div className="v25-triB-meta-row">
                <span>L. Ortega &middot; ICU Nurse Specialist</span>
                <span>Generated 14 Nov &middot; 2.3s synthesis</span>
                <span>Audit packet &middot; 7-year retention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TRIANGULATE — VARIANT C  (PIPELINE / HORIZONTAL FLOW)
          Three compact signal rows on the left, a streaming particle
          flow in the middle, and a prominent V-Fit result card on the
          right. Particles flow continuously while the panel is in view.
          ================================================================ */}
      <section className="v25-triangulate v25-triC v25-section--light">
        <div className="v25-triangulate-inner v25-reveal">
          <div className="v25-tri-variant-label">
            <span className="key">Variant C</span>
            <span className="sep">&middot;</span>
            <span className="value">Pipeline</span>
            <span className="hint">Animated stream</span>
          </div>

          <div className="v25-tri-intro">
            <div className="v25-tri-intro-lead">
              <div className="v25-eyebrow">The Triangulate Method&trade;</div>
              <h2 className="v25-h2">Three signals. <span className="accent accent--lime">One score.</span></h2>
            </div>
            <p className="v25-tri-intro-desc">
              V-Parse, V-Psych, and V-Interview each produce a structured signal against the
              V-Job spec. V-Fit triangulates them into a single defensible score per
              candidate, with weighting and evidence attached.
            </p>
            <div className="v25-tri-board-meta">
              <span className="v25-tri-board-meta-key">Role</span>
              <span className="v25-tri-board-meta-value">ICU Nurse Specialist</span>
              <span className="v25-tri-board-meta-sep">&middot;</span>
              <span className="v25-tri-board-meta-sub">authored by V-Job</span>
            </div>
          </div>

          <div className="v25-tri-board v25-triC-board">
            <div className="v25-triC-flow">
              <div className="v25-triC-signals">
                <article className="v25-triC-row v25-triC-row--parse">
                  <span className="kind">CV signal</span>
                  <span className="name">V-Parse&trade;</span>
                  <span className="weight">40%</span>
                  <span className="evidence">Reg. Nurse (RN) License &middot; Verified</span>
                </article>
                <article className="v25-triC-row v25-triC-row--psych">
                  <span className="kind">Psych signal</span>
                  <span className="name">V-Psych&trade;</span>
                  <span className="weight">20%</span>
                  <span className="evidence">Resilience + Empathy &middot; T = 64 / 61</span>
                </article>
                <article className="v25-triC-row v25-triC-row--interview">
                  <span className="kind">Interview signal</span>
                  <span className="name">V-Interview&trade;</span>
                  <span className="weight">40%</span>
                  <span className="evidence">Decision quality &middot; 0.91 weighted</span>
                </article>
              </div>

              <div className="v25-triC-stream" aria-hidden="true">
                <svg className="v25-triC-stream-svg" viewBox="0 0 200 240" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="v25-triC-stream-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#005072" stopOpacity="0.35" />
                      <stop offset="1" stopColor="#00C6C1" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <path className="v25-triC-stream-path" d="M0 40 C 90 40, 70 120, 200 120" />
                  <path className="v25-triC-stream-path" d="M0 120 L 200 120" />
                  <path className="v25-triC-stream-path" d="M0 200 C 90 200, 70 120, 200 120" />
                </svg>
                <span className="v25-triC-funnel-cap" />
              </div>

              <div className="v25-triC-result">
                <div className="v25-triC-result-status">
                  <span className="dot" aria-hidden="true" />
                  V-Fit &middot; Synthesis complete
                </div>
                <div className="v25-triC-result-label">JobFit&trade; Score</div>
                <div className="v25-triC-result-score">94</div>
                <div className="v25-triC-result-verdict">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M3 7l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Highly recommended
                </div>
                <div className="v25-triC-result-sub">L. Ortega &middot; ICU Nurse Specialist</div>
              </div>
            </div>

            <div className="v25-triC-footer">
              <div className="v25-tri-weighting">
                <div className="v25-tri-weighting-label">Signal weighting</div>
                <div className="v25-tri-weighting-bar">
                  <span className="v25-tri-weighting-seg v25-tri-weighting-seg--parse" style={{ flex: 40 }}>
                    <span className="v25-tri-weighting-pct">40</span>
                    <span className="v25-tri-weighting-name">Parse</span>
                  </span>
                  <span className="v25-tri-weighting-seg v25-tri-weighting-seg--psych" style={{ flex: 20 }}>
                    <span className="v25-tri-weighting-pct">20</span>
                    <span className="v25-tri-weighting-name">Psych</span>
                  </span>
                  <span className="v25-tri-weighting-seg v25-tri-weighting-seg--interview" style={{ flex: 40 }}>
                    <span className="v25-tri-weighting-pct">40</span>
                    <span className="v25-tri-weighting-name">Interview</span>
                  </span>
                </div>
              </div>
              <div className="v25-triC-meta-row">
                <span>Generated 14 Nov &middot; 2.3s synthesis</span>
                <span>Audit packet &middot; 7-year retention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TRIANGULATE — VARIANT D  (LEDGER / DATA-TABLE)
          A single tabular ledger that reads as a defensible audit row.
          Each signal occupies a row with kind, module, inline weighting
          bar, and evidence. A footer row synthesizes the result. The
          weighting bars animate from 0 to their target width on scroll.
          ================================================================ */}
      <section className="v25-triangulate v25-triD v25-section--light">
        <div className="v25-triangulate-inner v25-reveal">
          <div className="v25-tri-variant-label">
            <span className="key">Variant D</span>
            <span className="sep">&middot;</span>
            <span className="value">Ledger</span>
            <span className="hint">Animated fill</span>
          </div>

          <div className="v25-tri-intro">
            <div className="v25-tri-intro-lead">
              <div className="v25-eyebrow">The Triangulate Method&trade;</div>
              <h2 className="v25-h2">Three signals. <span className="accent accent--lime">One score.</span></h2>
            </div>
            <p className="v25-tri-intro-desc">
              V-Parse, V-Psych, and V-Interview each produce a structured signal against the
              V-Job spec. V-Fit triangulates them into a single defensible score per
              candidate, with weighting and evidence attached.
            </p>
            <div className="v25-tri-board-meta">
              <span className="v25-tri-board-meta-key">Role</span>
              <span className="v25-tri-board-meta-value">ICU Nurse Specialist</span>
              <span className="v25-tri-board-meta-sep">&middot;</span>
              <span className="v25-tri-board-meta-sub">authored by V-Job</span>
            </div>
          </div>

          <div className="v25-tri-board v25-triD-board">
            <div className="v25-triD-ledger" role="table" aria-label="V-Fit signal ledger for ICU Nurse Specialist">
              <div className="v25-triD-row v25-triD-row--head" role="row">
                <span role="columnheader">Signal</span>
                <span role="columnheader">Module</span>
                <span role="columnheader">Weight</span>
                <span role="columnheader">Evidence</span>
              </div>

              <div className="v25-triD-row v25-triD-row--parse" role="row">
                <span className="kind" role="cell">CV signal</span>
                <span className="name" role="cell">V-Parse&trade;</span>
                <span className="bar" role="cell">
                  <span className="bar-fill" data-pct="40" />
                  <span className="bar-pct">40%</span>
                </span>
                <span className="evidence" role="cell">
                  Reg. Nurse (RN) License
                  <span className="evidence-sub">Verified &middot; Lic. ID #PR01</span>
                </span>
              </div>

              <div className="v25-triD-row v25-triD-row--psych" role="row">
                <span className="kind" role="cell">Psych signal</span>
                <span className="name" role="cell">V-Psych&trade;</span>
                <span className="bar" role="cell">
                  <span className="bar-fill" data-pct="20" />
                  <span className="bar-pct">20%</span>
                </span>
                <span className="evidence" role="cell">
                  Resilience + Empathy
                  <span className="evidence-sub">T = 64 / 61 &middot; ICU cohort</span>
                </span>
              </div>

              <div className="v25-triD-row v25-triD-row--interview" role="row">
                <span className="kind" role="cell">Interview signal</span>
                <span className="name" role="cell">V-Interview&trade;</span>
                <span className="bar" role="cell">
                  <span className="bar-fill" data-pct="40" />
                  <span className="bar-pct">40%</span>
                </span>
                <span className="evidence" role="cell">
                  Decision quality
                  <span className="evidence-sub">0.91 weighted &middot; 4 probes</span>
                </span>
              </div>

              <div className="v25-triD-row v25-triD-row--synth" role="row">
                <span className="synth-label">
                  <span className="dot" aria-hidden="true" />
                  V-Fit synthesis
                </span>
                <span className="synth-score-block">
                  <span className="synth-score-label">JobFit&trade;</span>
                  <span className="synth-score">94</span>
                </span>
                <span className="synth-verdict">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M3 7l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Highly recommended
                </span>
                <span className="synth-meta">
                  L. Ortega &middot; Generated 14 Nov &middot; 2.3s &middot; Audit packet, 7-year retention
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TRIANGULATE — VARIANT E  (CENTROID / TERNARY PLOT)
          Equilateral triangle with three signal cards anchored at each
          vertex. Three medians are drawn from each vertex to the midpoint
          of the opposite side; all three medians meet at the centroid
          where the V-Fit JobFit score sits. Medians draw in on scroll-in
          and the centroid pulses with the score.
          ================================================================ */}
      <section className="v25-triangulate v25-triE v25-section--light">
        <div className="v25-triangulate-inner v25-reveal">
          <div className="v25-tri-variant-label">
            <span className="key">Variant E</span>
            <span className="sep">&middot;</span>
            <span className="value">Centroid</span>
            <span className="hint">Animated medians</span>
          </div>

          <div className="v25-tri-intro">
            <div className="v25-tri-intro-lead">
              <div className="v25-eyebrow">The Triangulate Method&trade;</div>
              <h2 className="v25-h2">Three signals. <span className="accent accent--lime">One score.</span></h2>
            </div>
            <p className="v25-tri-intro-desc">
              V-Parse, V-Psych, and V-Interview each produce a structured signal against the
              V-Job spec. V-Fit triangulates them into a single defensible score per
              candidate, with weighting and evidence attached.
            </p>
            <div className="v25-tri-board-meta">
              <span className="v25-tri-board-meta-key">Role</span>
              <span className="v25-tri-board-meta-value">ICU Nurse Specialist</span>
              <span className="v25-tri-board-meta-sep">&middot;</span>
              <span className="v25-tri-board-meta-sub">authored by V-Job</span>
            </div>
          </div>

          <div className="v25-tri-board v25-triE-board">
            <div className="v25-triE-stage">
              {/* True equilateral triangle (base 240, height 207.85) in viewBox
                  600 x 390. Vertices: Top (300,125), BL (180,333), BR (420,333).
                  Centroid at (300, 264). The BL and BR x-positions (30% / 70%)
                  are tuned so the bottom cards can be anchored with their
                  inner sides exactly on those vertex x-coordinates. */}
              <svg
                className="v25-triE-svg"
                viewBox="0 0 600 390"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <polygon
                  className="v25-triE-outline"
                  points="300,125 180,333 420,333"
                  pathLength={100}
                />
                <line className="v25-triE-median v25-triE-median--parse"     x1="300" y1="125" x2="300" y2="333" pathLength={100} />
                <line className="v25-triE-median v25-triE-median--psych"     x1="180" y1="333" x2="360" y2="229" pathLength={100} />
                <line className="v25-triE-median v25-triE-median--interview" x1="420" y1="333" x2="240" y2="229" pathLength={100} />
                {/* Twinkle dots near each vertex — soft sparkle in the corners */}
                <circle className="v25-triE-spark v25-triE-spark--p1" cx="300" cy="125" r="3" />
                <circle className="v25-triE-spark v25-triE-spark--p2" cx="180" cy="333" r="3" />
                <circle className="v25-triE-spark v25-triE-spark--p3" cx="420" cy="333" r="3" />
                <circle className="v25-triE-centroid-halo" cx="300" cy="264" r="56" />
                <circle className="v25-triE-centroid-dot"  cx="300" cy="264" r="6" />
              </svg>

              <article className="v25-triE-vertex v25-triE-vertex--parse">
                <span className="kind">CV signal</span>
                <span className="name">V-Parse&trade;</span>
                <span className="weight">40%</span>
                <span className="evidence">Reg. Nurse (RN) License</span>
                <span className="sub">Verified &middot; Lic. ID #PR01</span>
              </article>
              <article className="v25-triE-vertex v25-triE-vertex--psych">
                <span className="kind">Psych signal</span>
                <span className="name">V-Psych&trade;</span>
                <span className="weight">20%</span>
                <span className="evidence">Resilience + Empathy</span>
                <span className="sub">T = 64 / 61 &middot; ICU cohort</span>
              </article>
              <article className="v25-triE-vertex v25-triE-vertex--interview">
                <span className="kind">Interview signal</span>
                <span className="name">V-Interview&trade;</span>
                <span className="weight">40%</span>
                <span className="evidence">Decision quality</span>
                <span className="sub">0.91 weighted &middot; 4 probes</span>
              </article>

              <div className="v25-triE-centroid">
                <span className="label">JobFit&trade;</span>
                <span className="score">94</span>
                <span className="verdict">
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3 7l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Highly recommended
                </span>
              </div>
            </div>

            <div className="v25-triE-footer">
              <div className="v25-tri-weighting">
                <div className="v25-tri-weighting-label">Signal weighting</div>
                <div className="v25-tri-weighting-bar">
                  <span className="v25-tri-weighting-seg v25-tri-weighting-seg--parse" style={{ flex: 40 }}>
                    <span className="v25-tri-weighting-pct">40</span>
                    <span className="v25-tri-weighting-name">Parse</span>
                  </span>
                  <span className="v25-tri-weighting-seg v25-tri-weighting-seg--psych" style={{ flex: 20 }}>
                    <span className="v25-tri-weighting-pct">20</span>
                    <span className="v25-tri-weighting-name">Psych</span>
                  </span>
                  <span className="v25-tri-weighting-seg v25-tri-weighting-seg--interview" style={{ flex: 40 }}>
                    <span className="v25-tri-weighting-pct">40</span>
                    <span className="v25-tri-weighting-name">Interview</span>
                  </span>
                </div>
              </div>
              <div className="v25-triE-meta-row">
                <span>L. Ortega &middot; ICU Nurse Specialist</span>
                <span>Generated 14 Nov &middot; 2.3s synthesis</span>
                <span>Audit packet &middot; 7-year retention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      </>
      )}

      {/* ================================================================
          SCIENCE  (h2 keeps the muted-tail pattern intentionally — the
          contrast IS the point.)
          ================================================================ */}
      <section className="v25-section" id="science">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">The Science</div>
              <h2 className="v25-h2">
                Built on <span className="accent accent--sky">peer-reviewed psychometrics</span>. <span className="muted">Not retrofitted retail norms.</span>
              </h2>
              <p className="v25-desc" style={{ marginTop: 24 }}>
                Every score the platform produces is grounded in published validity research,
                calibrated on healthcare populations.
              </p>
            </div>
            <div className="v25-hero-actions">
              <a {...outboundProps('/vx/science')} className="v25-btn-outline">Read the research</a>
              <a {...outboundProps('/vx/science')} className="v25-link-arrow">
                Methodology<span aria-hidden="true"> ↗</span>
              </a>
            </div>
          </div>

          <div className="v25-science-grid">
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">0.74</span>
                <span className="evidence">Evidence</span>
              </div>
              <div className="label">Predictive validity coefficient</div>
              <div className="sub">vs. 0.18 for resume review and 0.21 for unstructured interview.</div>
            </div>
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">&gt;100k</span>
                <span className="evidence">Evidence</span>
              </div>
              <div className="label">Clinicians normed</div>
              <div className="sub">Across 38 health systems and 14 specialty disciplines.</div>
            </div>
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">Quarterly</span>
                <span className="evidence">Evidence</span>
              </div>
              <div className="label">Validity studies published</div>
              <div className="sub">Open methodology. External replication welcome.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SOLUTIONS
          ================================================================ */}
      <section className="v25-section v25-section--light" id="solutions">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Solutions</div>
          <h2 className="v25-h2">
            Built for the people who <span className="accent accent--teal">own the workforce</span>.{' '}
            CHRO, recruiter, executive, clinical operator.
          </h2>

          <div className="v25-solutions-grid">
            {SOLUTIONS.map((sol) => (
              <div key={sol.title} className="v25-solution-card">
                <div className="v25-solution-role">{sol.role}</div>
                <div className="v25-solution-title">{sol.title}</div>
                <p className="v25-solution-quote">{sol.quote}</p>
                <p className="v25-solution-body">{sol.body}</p>
                <div className="v25-solution-link">Explore <span aria-hidden="true">&rarr;</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ENTERPRISE  (already terse — single short h2)
          ================================================================ */}
      <section className="v25-section" id="enterprise">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-enterprise-wrap">
            <div className="v25-enterprise-bg" aria-hidden="true" />
            <div className="v25-enterprise-content">
              <div>
                <div className="v25-eyebrow">Enterprise</div>
                <h2 className="v25-h2">Deploy to the <span className="accent accent--lime">most regulated workforces</span> in the country.</h2>
                <p className="v25-desc" style={{ marginTop: 24 }}>
                  SOC 2 Type II. HIPAA. HITRUST. Hosted in U.S. enclaves with single-tenant options.
                  Engineered for the General Counsel as much as the CHRO.
                </p>
                <div className="v25-hero-actions" style={{ marginTop: 32 }}>
                  <a {...outboundProps('/vx/institutional')} className="v25-btn-outline">Enterprise &amp; security</a>
                  <a {...outboundProps('/vx/process')} className="v25-link-arrow">
                    Deployment process<span aria-hidden="true"> ↗</span>
                  </a>
                </div>
              </div>
              <div className="v25-badges-grid">
                {BADGES.map((b) => (
                  <div key={b} className="v25-badge-item">
                    <span className="v25-badge-check" aria-hidden="true">&#10003;</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROCESS — VARIANT A (current). Variants B / C / D follow so
          we can compare four directions before settling on the keeper.
          ================================================================ */}
      <section className="v25-section v25-section--light v25-process--a" id="process">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-process-variant-label">Variant A &middot; current</div>
          <div className="v25-process-wrap">
            <div className="v25-process-bg" aria-hidden="true" />
            <div style={{ position: 'relative' }}>
              <div className="v25-eyebrow">Our Process</div>
              <h2 className="v25-h2">Five steps from requisition to <span className="accent accent--teal">retained outcome</span>.</h2>
              <p className="v25-desc">
                Every Strategia engagement runs the same disciplined loop. The output of
                every step is auditable, exportable, and yours.
              </p>

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
                <a {...outboundProps('/vx/process')} className="v25-btn-outline">Full process</a>
                <a {...outboundProps('/vx/process')} className="v25-link-arrow">
                  Talk to us<span aria-hidden="true"> ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROCESS — VARIANT B (Editorial Serif)
          Drop the chip-circles entirely. Large Literata serif numerals
          act as the typographic anchor for each step. No connecting
          line; instead each step gets a Cobalt → Teal → Lime accent
          stripe above the title so colour progression tells the
          journey. Module names lose the monospace + trailing period.
          Premium-editorial feel (Pentagram report / Apple product).
          ================================================================ */}
      <section className="v25-section v25-section--light v25-process--b">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-process-variant-label">Variant B &middot; editorial serif</div>
          <div className="v25-process-wrap">
            <div className="v25-process-bg" aria-hidden="true" />
            <div style={{ position: 'relative' }}>
              <div className="v25-eyebrow">Our Process</div>
              <h2 className="v25-h2">Five steps from requisition to <span className="accent accent--teal">retained outcome</span>.</h2>
              <p className="v25-desc">
                Every Strategia engagement runs the same disciplined loop. The output of
                every step is auditable, exportable, and yours.
              </p>

              <div className="v25-process-b-grid">
                {PROCESS_STEPS.map((step, i) => (
                  <article key={step.num} className={`v25-process-b-step v25-process-b-step--${i}`}>
                    <div className="v25-process-b-rule" aria-hidden="true" />
                    <div className="v25-process-b-num">{step.num}</div>
                    <h3 className="v25-process-b-title">{step.title}</h3>
                    <div className="v25-process-b-module">{step.module.replace(/\.$/, '')}</div>
                    <p className="v25-process-b-desc">{step.desc}</p>
                  </article>
                ))}
              </div>

              <div className="v25-hero-actions" style={{ marginTop: 56 }}>
                <a {...outboundProps('/vx/process')} className="v25-btn-solid">Full process</a>
                <a {...outboundProps('/vx/process')} className="v25-link-arrow">
                  Talk to us<span aria-hidden="true"> ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROCESS — VARIANT C (Vertical Narrative)
          Switch from a 5-column horizontal flow to a vertical reading
          experience: each step is a row, number-left / content-right,
          tied together by a vertical Cobalt → Teal → Lime accent rule
          running down the left margin. Each row gets a soft hairline
          divider and generous vertical rhythm. Apple-style.
          ================================================================ */}
      <section className="v25-section v25-section--light v25-process--c">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-process-variant-label">Variant C &middot; vertical narrative</div>
          <div className="v25-process-wrap">
            <div className="v25-process-bg" aria-hidden="true" />
            <div style={{ position: 'relative' }}>
              <div className="v25-eyebrow">Our Process</div>
              <h2 className="v25-h2">Five steps from requisition to <span className="accent accent--teal">retained outcome</span>.</h2>
              <p className="v25-desc">
                Every Strategia engagement runs the same disciplined loop. The output of
                every step is auditable, exportable, and yours.
              </p>

              <ol className="v25-process-c-list">
                <div className="v25-process-c-spine" aria-hidden="true" />
                {PROCESS_STEPS.map((step, i) => (
                  <li key={step.num} className={`v25-process-c-step v25-process-c-step--${i}`}>
                    <div className="v25-process-c-marker" aria-hidden="true" />
                    <div className="v25-process-c-num">{step.num}</div>
                    <div className="v25-process-c-body">
                      <div className="v25-process-c-heading">
                        <h3 className="v25-process-c-title">{step.title}</h3>
                        <span className="v25-process-c-module">{step.module.replace(/\.$/, '')}</span>
                      </div>
                      <p className="v25-process-c-desc">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="v25-hero-actions" style={{ marginTop: 56 }}>
                <a {...outboundProps('/vx/process')} className="v25-btn-solid">Full process</a>
                <a {...outboundProps('/vx/process')} className="v25-link-arrow">
                  Talk to us<span aria-hidden="true"> ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROCESS — VARIANT D (Phase Journey)
          Keep the horizontal row, but redesign as a phase journey:
          large display-weight step numbers integrated above the title,
          a single Cobalt → Teal → Lime gradient stripe sitting behind
          the row at title-baseline, and each step carries a vertical
          accent bar in its journey colour. Stripe-style enterprise.
          ================================================================ */}
      <section className="v25-section v25-section--light v25-process--d">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-process-variant-label">Variant D &middot; phase journey</div>
          <div className="v25-process-wrap">
            <div className="v25-process-bg" aria-hidden="true" />
            <div style={{ position: 'relative' }}>
              <div className="v25-eyebrow">Our Process</div>
              <h2 className="v25-h2">Five steps from requisition to <span className="accent accent--teal">retained outcome</span>.</h2>
              <p className="v25-desc">
                Every Strategia engagement runs the same disciplined loop. The output of
                every step is auditable, exportable, and yours.
              </p>

              <div className="v25-process-d-board">
                <div className="v25-process-d-track" aria-hidden="true" />
                <div className="v25-process-d-grid">
                  {PROCESS_STEPS.map((step, i) => (
                    <article key={step.num} className={`v25-process-d-step v25-process-d-step--${i}`}>
                      <div className="v25-process-d-bar" aria-hidden="true" />
                      <div className="v25-process-d-num">{step.num}</div>
                      <h3 className="v25-process-d-title">{step.title}</h3>
                      <div className="v25-process-d-module">{step.module.replace(/\.$/, '')}</div>
                      <p className="v25-process-d-desc">{step.desc}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="v25-hero-actions" style={{ marginTop: 56 }}>
                <a {...outboundProps('/vx/process')} className="v25-btn-solid">Full process</a>
                <a {...outboundProps('/vx/process')} className="v25-link-arrow">
                  Talk to us<span aria-hidden="true"> ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          ROI CALCULATOR  (V21 #12 — slider min raised to 500;
          numeric output is fixed-width to prevent reflow on drag.)
          ================================================================ */}
      <section className="v25-section" id="roi">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">ROI calculator</div>
          <h2 className="v25-h2">See the savings for <span className="accent accent--sky">your&nbsp;system.</span></h2>
          <p className="v25-desc">
            Three inputs. Conservative assumptions. A number you can take to
            your&nbsp;CFO.
          </p>

          <div className="v25-roi-grid">
            <div className="v25-roi-inputs">
              <div>
                <div className="v25-roi-input-header">
                  <span className="k">Total Employees</span>
                  <span className="v">{ftes.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  className="v25-roi-slider"
                  min={500} max={20000} step={100}
                  value={ftes}
                  onChange={(e) => setFtes(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="v25-roi-input-header">
                  <span className="k">Annual Employee Churn</span>
                  <span className="v">{turnover}%</span>
                </div>
                <input
                  type="range"
                  className="v25-roi-slider"
                  min={8} max={40} step={0.5}
                  value={turnover}
                  onChange={(e) => setTurnover(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="v25-roi-input-header">
                  <span className="k">Average Employee Replacement Cost</span>
                  <span className="v">${(replacementCost / 1000).toFixed(0)}K</span>
                </div>
                <input
                  type="range"
                  className="v25-roi-slider"
                  min={30000} max={150000} step={1000}
                  value={replacementCost}
                  onChange={(e) => setReplacementCost(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="v25-roi-output">
              <div className="v25-roi-output-label">Projected annual savings</div>
              <div className="v25-roi-output-value">
                <span className="dollar">$</span>
                <span className="num">{bigValue}</span>
              </div>
              <p className="v25-roi-output-sub">
                Based on a 26% reduction in avoidable attrition across
                comparable systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA  (V21 #4 — two short sentences with measurable claims,
          not one generic line. V21 #9 — wordmark is now 64px in CSS.)
          ================================================================ */}
      <section className="v25-cta-section" id="demo">
        <div className="v25-cta-wrap v25-reveal">
          <div className="v25-cta-bg" aria-hidden="true" />
          <img
            src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png"
            alt="Strategia"
            className="v25-cta-logo"
          />
          <h2 className="v25-h2">Cut avoidable attrition. <span className="accent accent--teal">Defend every hire.</span></h2>
          <p className="v25-desc">
            Most executives have great strategy and an opaque workforce. Strategia closes the gap.
          </p>
          <div className="v25-cta-actions">
            <a href="/demo" className="v25-btn-primary">Book a demo</a>
            <a {...outboundProps('/vx/process')} className="v25-link-arrow">
              Talk to us<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          FOOTER
          ================================================================ */}
      {footerSlot ?? (
        <footer className="v25-footer">
          <div className="v25-footer-inner">
            <div className="v25-footer-top">
              <div className="v25-footer-brand">
                <img src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png" alt="Strategia" />
                <p>
                  The intelligence engine for the healthcare workforce. Hire defensibly.
                  Plan rigorously. Operate at scale.
                </p>
                <div className="v25-footer-version">Strategia Intelligence Engine v2.1 · Live</div>
              </div>

              <div>
                <h5>Platform</h5>
                <ul>
                  <li><a href="/vx/platform">Overview</a></li>
                  <li><a href="/vx/platform">Modules</a></li>
                  <li><a href="/vx/science">Science</a></li>
                  <li><a href="/vx/institutional">Enterprise</a></li>
                </ul>
              </div>

              <div>
                <h5>Solutions</h5>
                <ul>
                  <li><a href="/vx/solutions">CHRO</a></li>
                  <li><a href="/vx/solutions">Talent Acquisition</a></li>
                  <li><a href="/vx/solutions">Executive Team</a></li>
                  <li><a href="/vx/solutions">Clinical Operations</a></li>
                </ul>
              </div>

              <div>
                <h5>Resources</h5>
                <ul>
                  <li><a href="/vx/science">Validity studies</a></li>
                  <li><a href="/vx/process">Our Process</a></li>
                  <li><a href="/vx/institutional">Security &amp; trust</a></li>
                  <li><a href="/vx/platform">Documentation</a></li>
                </ul>
              </div>

              <div>
                <h5>Company</h5>
                <ul>
                  <li><a href="/">About</a></li>
                  <li><a href="/">Careers</a></li>
                  <li><a href="/">Press</a></li>
                  <li><a href="/">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="v25-footer-bottom">
              <div className="v25-footer-bottom-left">&copy; 2026 Strategia, Inc. All rights reserved.</div>
              <div className="v25-footer-bottom-right">
                <a href="/">Privacy</a>
                <a href="/">Terms</a>
                <a href="/vx/institutional">Security</a>
                <a href="/">Trust center</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
