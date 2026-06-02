'use client'

import { useEffect, useRef, useState } from 'react'
import { initTetrahedron } from './tetrahedron'
import './v24.css'

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

export default function V24Page() {
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

  useEffect(() => {
    const cleanup = initTetrahedron()
    return cleanup
  }, [])

  useEffect(() => {
    const handler = () => setComplete(true)
    window.addEventListener('v24:complete', handler)
    return () => window.removeEventListener('v24:complete', handler)
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
    const els = document.querySelectorAll<HTMLElement>('.v24-reveal')
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
    <div className={`v24${complete ? ' v24--complete' : ''}`}>
      <div className="v24-pulse-overlay" id="v24PulseOverlay" aria-hidden="true" />

      {/* ================================================================
          NAVIGATION  (V21 #2 — visible from page load)
          ================================================================ */}
      <nav className="v24-nav" ref={navRef}>
        <a href="/v24" className="v24-nav-logo">
          <svg className="v24-nav-mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M20 4L36 34H4L20 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
          </svg>
          <img src="/images/brand/strategia-wordmark-white.svg" alt="Strategia" />
        </a>
        <ul className="v24-nav-links">
          <li><a href="#platform" className="v24-nav-link">Platform</a></li>
          <li><a href="#modules" className="v24-nav-link">Modules</a></li>
          <li><a href="#science" className="v24-nav-link">Science</a></li>
          <li><a href="#solutions" className="v24-nav-link">Solutions</a></li>
          <li><a href="#enterprise" className="v24-nav-link">Enterprise</a></li>
          <li><a href="#process" className="v24-nav-link">Process</a></li>
          <li><a href="#careers" className="v24-nav-link">Careers</a></li>
        </ul>
        <a href="#demo" className="v24-nav-cta">Book demo</a>
      </nav>

      {/* ================================================================
          HERO — Tetrahedron
          ================================================================ */}
      <section className="v24-hero">
        <div className="v24-cursor-aura" id="v24CursorAura" aria-hidden="true" />
        <div className="v24-plasma-layer" id="v24PlasmaLayer" aria-hidden="true" />

        <div className="v24-hero-copy">
          <h1>AI-Native<br />Workforce<br /><span className="accent accent--sky">Intelligence.</span></h1>
          <p>
            Predict performance before it lands. Defend every decision after it does.
            A multi-module platform that automates 80% of healthcare hiring, built
            for HR and executive teams.
          </p>
          <div className="v24-hero-actions">
            <a href="#demo" className="v24-btn-primary">Book a demo</a>
            <a href="#platform" className="v24-link-arrow">
              Explore the platform<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>

        <div className="v24-tetra-stage" id="v24Stage">
          <svg id="v24Tetra" viewBox="-110 -110 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <radialGradient id="v24CoreGlow" cx="50%" cy="50%" r="50%">
                <stop id="v24GlowStop0" offset="0%" stopColor="var(--glow-color)" stopOpacity="0.55" />
                <stop id="v24GlowStop1" offset="40%" stopColor="var(--glow-color)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--glow-color)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="v24PulseGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--glow-color)" stopOpacity="0" />
                <stop offset="55%" stopColor="var(--glow-color)" stopOpacity="0.55" />
                <stop offset="78%" stopColor="var(--glow-color)" stopOpacity="0.30" />
                <stop offset="100%" stopColor="var(--glow-color)" stopOpacity="0" />
              </radialGradient>
              <filter id="v24GlowBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="v24PulseBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
            </defs>
            <g id="v24Pulses" />
            <circle id="v24Glow" cx="0" cy="0" r="60" fill="url(#v24CoreGlow)" filter="url(#v24GlowBlur)" />
            <g id="v24Edges" />
          </svg>

          <div className="v24-brand-lockup" id="v24BrandLockup" aria-hidden="true">
            <img src="/images/brand/strategia-wordmark-white.svg" alt="Strategia" />
          </div>
        </div>
      </section>
      <div className="v24-scroll-spacer" aria-hidden="true" />

      {/* ================================================================
          STATS  (V21 #6 — decorative "01 / Outcome" header removed;
          stat values scaled up to read first.)
          ================================================================ */}
      <section className="v24-stats v24-section--light v24-reveal">
        <div className="v24-stats-grid">
          <div className="v24-stat-card">
            <div className="v24-stat-value">80%</div>
            <div className="v24-stat-label">Of internal recruitment automated</div>
            <div className="v24-stat-sub">Median across deployed health systems</div>
          </div>
          <div className="v24-stat-card">
            <div className="v24-stat-value">&lt;25 min</div>
            <div className="v24-stat-label">1,000 CVs end-to-end</div>
            <div className="v24-stat-sub">From requisition to ranked shortlist</div>
          </div>
          <div className="v24-stat-card">
            <div className="v24-stat-value">0.74</div>
            <div className="v24-stat-label">Match-score validity (mature)</div>
            <div className="v24-stat-sub">vs. 0.18 for resume review (Sackett 2022)</div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PLATFORM — 8 Modules grouped by phase
          (V21 #11 — the 5-phase loop is now visible. V21 #4 — terse h2,
          no muted-clause tail.)
          ================================================================ */}
      <section className="v24-section" id="modules">
        <div className="v24-section-inner v24-reveal">
          <div className="v24-section-header">
            <div>
              <div className="v24-eyebrow">The Platform &middot; 08 V-modules</div>
              <h2 className="v24-h2">Eight modules. <span className="accent accent--teal">One hire-and-retain loop.</span></h2>
            </div>
            <a href="#platform" className="v24-link-arrow">
              All modules<span aria-hidden="true"> ↗</span>
            </a>
          </div>

          <div className="v24-modules-phased">
            {PHASES.map((phase) => {
              const phaseModules = MODULES.filter((m) => m.tag === phase.name)
              const cardCountClass =
                phaseModules.length === 1
                  ? 'v24-module-phase-cards--1'
                  : phaseModules.length === 2
                  ? 'v24-module-phase-cards--2'
                  : ''
              return (
                <div key={phase.name} className="v24-module-phase">
                  <div className="v24-module-phase-header">
                    <span className="v24-module-phase-step">Phase {phase.step}</span>
                    <span className="v24-module-phase-name">{phase.name}</span>
                    <p className="v24-module-phase-desc">{phase.desc}</p>
                  </div>
                  <div className={`v24-module-phase-cards ${cardCountClass}`}>
                    {phaseModules.map((mod) => (
                      <div key={mod.title} className="v24-module">
                        <div className="v24-module-header">
                          <span className="v24-module-num">{mod.num}</span>
                          <span className="v24-module-tag">{mod.tag}</span>
                        </div>
                        <div className="v24-module-title">{mod.title}</div>
                        <p className="v24-module-desc">{mod.desc}</p>
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
          TRIANGULATE METHOD (V-FIT)  (V21 #4 — terse h2)
          ================================================================ */}
      <section className="v24-triangulate v24-section--light">
        <div className="v24-triangulate-inner v24-reveal">
          <div className="v24-eyebrow">The Triangulate Method&trade;</div>
          <h2 className="v24-h2">Three signals. <span className="accent accent--lime">One score.</span></h2>
          <p className="v24-desc">
            V-Parse, V-Psych, and V-Interview each produce a structured signal against the
            V-Job spec. V-Fit triangulates them into a single defensible score per
            candidate, with weighting and evidence attached.
          </p>

          <div className="v24-eyebrow" style={{ marginTop: 40, marginBottom: 0, fontSize: 10 }}>
            Role &middot; ICU Nurse Specialist &middot; <span style={{ color: 'rgba(255,255,255,0.65)' }}>authored by V-Job</span>
          </div>

          <div className="v24-tri-signals">
            <div className="v24-tri-signal">
              <div className="v24-tri-signal-bar v24-tri-signal-bar--parse" />
              <div className="v24-tri-signal-label">CV signal</div>
              <div className="v24-tri-signal-name">V-Parse&trade;</div>
            </div>
            <div className="v24-tri-signal">
              <div className="v24-tri-signal-bar v24-tri-signal-bar--psych" />
              <div className="v24-tri-signal-label">Psych signal</div>
              <div className="v24-tri-signal-name">V-Psych&trade;</div>
            </div>
            <div className="v24-tri-signal">
              <div className="v24-tri-signal-bar v24-tri-signal-bar--interview" />
              <div className="v24-tri-signal-label">Interview signal</div>
              <div className="v24-tri-signal-name">V-Interview&trade;</div>
            </div>
          </div>

          <div className="v24-tri-converge">
            <div className="v24-tri-converge-dot" />
          </div>

          <div className="v24-tri-result">
            <div className="v24-tri-result-header">
              <span className="status">V-Fit &middot; Synthesis complete</span>
              <span>L. Ortega &middot; ICU Nurse Specialist</span>
            </div>
            <div className="v24-tri-result-body">
              <div className="v24-tri-score-block">
                <div className="v24-tri-score-label">JobFit&trade; Score</div>
                <div className="v24-tri-score-value">94</div>
                <div className="v24-tri-verdict">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M3 7l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Highly recommended
                </div>
              </div>
              <div className="v24-tri-evidence">
                <div className="v24-tri-evidence-title">Key evidence</div>
                <ul className="v24-tri-evidence-list">
                  <li className="v24-tri-evidence-item">
                    <span className="v24-tri-evidence-tag">V-Parse</span>
                    <div>
                      <div className="v24-tri-evidence-text">Reg. Nurse (RN) License</div>
                      <div className="v24-tri-evidence-sub">Verified &middot; Lic. ID #PR01</div>
                    </div>
                  </li>
                  <li className="v24-tri-evidence-item">
                    <span className="v24-tri-evidence-tag">V-Psych</span>
                    <div>
                      <div className="v24-tri-evidence-text">Resilience + Empathy</div>
                      <div className="v24-tri-evidence-sub">T = 64 / 61 &middot; ICU role-fit cohort</div>
                    </div>
                  </li>
                  <li className="v24-tri-evidence-item">
                    <span className="v24-tri-evidence-tag">V-Interview</span>
                    <div>
                      <div className="v24-tri-evidence-text">Decision quality</div>
                      <div className="v24-tri-evidence-sub">0.91 weighted &middot; 4 scenario probes</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="v24-tri-footer">
            <span>40 / 20 / 40 default weighting &middot; customizable per role family</span>
            <span>Audit packet &middot; 7-year retention</span>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCIENCE  (h2 keeps the muted-tail pattern intentionally — the
          contrast IS the point.)
          ================================================================ */}
      <section className="v24-section" id="science">
        <div className="v24-section-inner v24-reveal">
          <div className="v24-section-header">
            <div>
              <div className="v24-eyebrow">The Science</div>
              <h2 className="v24-h2">
                Built on <span className="accent accent--sky">peer-reviewed psychometrics</span>. <span className="muted">Not retrofitted retail norms.</span>
              </h2>
              <p className="v24-desc" style={{ marginTop: 24 }}>
                Every score the platform produces is grounded in published validity research,
                calibrated on healthcare populations.
              </p>
            </div>
            <div className="v24-hero-actions">
              <a href="/science" className="v24-btn-outline">Read the research</a>
              <a href="/science" className="v24-link-arrow">
                Methodology<span aria-hidden="true"> ↗</span>
              </a>
            </div>
          </div>

          <div className="v24-science-grid">
            <div className="v24-science-stat">
              <div className="v24-science-stat-header">
                <span className="value">0.74</span>
                <span className="evidence">Evidence</span>
              </div>
              <div className="label">Predictive validity coefficient</div>
              <div className="sub">vs. 0.18 for resume review and 0.21 for unstructured interview.</div>
            </div>
            <div className="v24-science-stat">
              <div className="v24-science-stat-header">
                <span className="value">&gt;100k</span>
                <span className="evidence">Evidence</span>
              </div>
              <div className="label">Clinicians normed</div>
              <div className="sub">Across 38 health systems and 14 specialty disciplines.</div>
            </div>
            <div className="v24-science-stat">
              <div className="v24-science-stat-header">
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
      <section className="v24-section v24-section--light" id="solutions">
        <div className="v24-section-inner v24-reveal">
          <div className="v24-eyebrow">Solutions</div>
          <h2 className="v24-h2">
            Built for the people who <span className="accent accent--teal">own the workforce</span>.{' '}
            CHRO, recruiter, executive, clinical operator.
          </h2>

          <div className="v24-solutions-grid">
            {SOLUTIONS.map((sol) => (
              <div key={sol.title} className="v24-solution-card">
                <div className="v24-solution-role">{sol.role}</div>
                <div className="v24-solution-title">{sol.title}</div>
                <p className="v24-solution-quote">{sol.quote}</p>
                <p className="v24-solution-body">{sol.body}</p>
                <div className="v24-solution-link">Explore <span aria-hidden="true">&rarr;</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ENTERPRISE  (already terse — single short h2)
          ================================================================ */}
      <section className="v24-section" id="enterprise">
        <div className="v24-section-inner v24-reveal">
          <div className="v24-enterprise-wrap">
            <div className="v24-enterprise-bg" aria-hidden="true" />
            <div className="v24-enterprise-content">
              <div>
                <div className="v24-eyebrow">Enterprise</div>
                <h2 className="v24-h2">Deploy to the <span className="accent accent--lime">most regulated workforces</span> in the country.</h2>
                <p className="v24-desc" style={{ marginTop: 24 }}>
                  SOC 2 Type II. HIPAA. HITRUST. Hosted in U.S. enclaves with single-tenant options.
                  Engineered for the General Counsel as much as the CHRO.
                </p>
                <div className="v24-hero-actions" style={{ marginTop: 32 }}>
                  <a href="/enterprise" className="v24-btn-outline">Enterprise &amp; security</a>
                  <a href="/process" className="v24-link-arrow">
                    Deployment process<span aria-hidden="true"> ↗</span>
                  </a>
                </div>
              </div>
              <div className="v24-badges-grid">
                {BADGES.map((b) => (
                  <div key={b} className="v24-badge-item">
                    <span className="v24-badge-check" aria-hidden="true">&#10003;</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROCESS  (already terse — single short h2)
          ================================================================ */}
      <section className="v24-section v24-section--light" id="process">
        <div className="v24-section-inner v24-reveal">
          <div className="v24-process-wrap">
            <div className="v24-process-bg" aria-hidden="true" />
            <div style={{ position: 'relative' }}>
              <div className="v24-eyebrow">Our Process</div>
              <h2 className="v24-h2">Five steps from requisition to <span className="accent accent--teal">retained outcome</span>.</h2>
              <p className="v24-desc">
                Every Strategia engagement runs the same disciplined loop. The output of
                every step is auditable, exportable, and yours.
              </p>

              <div className="v24-process-steps">
                <div className="v24-process-line" aria-hidden="true" />
                {PROCESS_STEPS.map((step) => (
                  <div key={step.num} className="v24-process-step">
                    <div className="v24-process-step-num">{step.num}</div>
                    <div className="v24-process-step-title">{step.title}</div>
                    <div className="v24-process-step-module">{step.module}</div>
                    <p className="v24-process-step-desc">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="v24-hero-actions" style={{ marginTop: 48 }}>
                <a href="/process" className="v24-btn-outline">Full process</a>
                <a href="/process" className="v24-link-arrow">
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
      <section className="v24-section" id="roi">
        <div className="v24-section-inner v24-reveal">
          <div className="v24-eyebrow">ROI calculator</div>
          <h2 className="v24-h2">See the savings for <span className="accent accent--sky">your&nbsp;system.</span></h2>
          <p className="v24-desc">
            Three inputs. Conservative assumptions. A number you can take to
            your&nbsp;CFO.
          </p>

          <div className="v24-roi-grid">
            <div className="v24-roi-inputs">
              <div>
                <div className="v24-roi-input-header">
                  <span className="k">Total Employees</span>
                  <span className="v">{ftes.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  className="v24-roi-slider"
                  min={500} max={20000} step={100}
                  value={ftes}
                  onChange={(e) => setFtes(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="v24-roi-input-header">
                  <span className="k">Annual Employee Churn</span>
                  <span className="v">{turnover}%</span>
                </div>
                <input
                  type="range"
                  className="v24-roi-slider"
                  min={8} max={40} step={0.5}
                  value={turnover}
                  onChange={(e) => setTurnover(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="v24-roi-input-header">
                  <span className="k">Average Employee Replacement Cost</span>
                  <span className="v">${(replacementCost / 1000).toFixed(0)}K</span>
                </div>
                <input
                  type="range"
                  className="v24-roi-slider"
                  min={30000} max={150000} step={1000}
                  value={replacementCost}
                  onChange={(e) => setReplacementCost(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="v24-roi-output">
              <div className="v24-roi-output-label">Projected annual savings</div>
              <div className="v24-roi-output-value">
                <span className="dollar">$</span>
                <span className="num">{bigValue}</span>
              </div>
              <p className="v24-roi-output-sub">
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
      <section className="v24-cta-section" id="demo">
        <div className="v24-cta-wrap v24-reveal">
          <div className="v24-cta-bg" aria-hidden="true" />
          <img
            src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png"
            alt="Strategia"
            className="v24-cta-logo"
          />
          <h2 className="v24-h2">Cut avoidable attrition. <span className="accent accent--teal">Defend every hire.</span></h2>
          <p className="v24-desc">
            Most executives have great strategy and an opaque workforce. Strategia closes the gap.
          </p>
          <div className="v24-cta-actions">
            <a href="/demo" className="v24-btn-primary">Book a demo</a>
            <a href="/process" className="v24-link-arrow">
              Talk to us<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          FOOTER
          ================================================================ */}
      <footer className="v24-footer">
        <div className="v24-footer-inner">
          <div className="v24-footer-top">
            <div className="v24-footer-brand">
              <img src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png" alt="Strategia" />
              <p>
                The intelligence engine for the healthcare workforce. Hire defensibly.
                Plan rigorously. Operate at scale.
              </p>
              <div className="v24-footer-version">Strategia Intelligence Engine v2.1 · Live</div>
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

            <div>
              <h5>Solutions</h5>
              <ul>
                <li><a href="/solutions">CHRO</a></li>
                <li><a href="/solutions">Talent Acquisition</a></li>
                <li><a href="/solutions">Executive Team</a></li>
                <li><a href="/solutions">Clinical Operations</a></li>
              </ul>
            </div>

            <div>
              <h5>Resources</h5>
              <ul>
                <li><a href="/science">Validity studies</a></li>
                <li><a href="/process">Our Process</a></li>
                <li><a href="/enterprise">Security &amp; trust</a></li>
                <li><a href="/platform">Documentation</a></li>
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

          <div className="v24-footer-bottom">
            <div className="v24-footer-bottom-left">&copy; 2026 Strategia, Inc. All rights reserved.</div>
            <div className="v24-footer-bottom-right">
              <a href="/">Privacy</a>
              <a href="/">Terms</a>
              <a href="/enterprise">Security</a>
              <a href="/">Trust center</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
