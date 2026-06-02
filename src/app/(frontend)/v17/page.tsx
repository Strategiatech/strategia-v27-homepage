'use client'

import { useEffect, useRef, useState } from 'react'
import { initTetrahedron } from './tetrahedron'
import './v17.css'

/* eslint-disable @next/next/no-img-element */

function fmt(n: number): string {
  if (Math.abs(n) >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M'
  if (Math.abs(n) >= 1_000) return '$' + Math.round(n / 1_000) + 'K'
  return '$' + Math.round(n).toLocaleString()
}

const CLIENTS = [
  'Kings College Hospital · Dubai',
  'PureHealth',
  'Kuok Group',
  'Fullerton Health',
  'Emirates Hospitals Group',
  'VAMED Care',
  'HealthX Australia',
  'UniLab · PH',
  'Microsoft Marketplace',
]

const MODULES = [
  { num: 'M01', tag: 'Foundation', title: 'V-Job', desc: 'Generative AI turns any input into a structured competency model mapped to role family and weighted against published validity research.' },
  { num: 'M02', tag: 'Screen', title: 'V-Parse', desc: '1,000 CVs per hour into structured talent data. Domain-specific algorithms for high-precision matching beyond keyword filters.' },
  { num: 'M03', tag: 'Assess', title: 'V-Psych', desc: '5–7 min proprietary OCEAN-based assessment with T-score conversion. Validated against role-specific performance indicators.' },
  { num: 'M04', tag: 'Assess', title: 'V-Interview', desc: '24/7 on-demand AI avatar interviews. Structured NLP scoring reduces interviewer variability and mitigates bias.' },
  { num: 'M05', tag: 'Decide', title: 'V-Fit', desc: 'Triangulates V-Parse, V-Psych, and V-Interview into a single composite match score with full evidence trail.' },
  { num: 'M06', tag: 'Assess', title: 'V-Scenario', desc: 'Interactive role-specific scenarios from patient care to executive decisions. Multi-dimensional scoring with strengths and risks.' },
  { num: 'M07', tag: 'Operate', title: 'V-Onboarding', desc: "Custom 0–90-day plans tailored to the hire’s psychometric profile, role, and team composition." },
  { num: 'M08', tag: 'Operate', title: 'V-Insights', desc: 'Group-level visibility with phase-based maturity. Internal mobility scoring against every internal opening.' },
]

const SOLUTIONS = [
  {
    role: 'Chief Executive Officer',
    title: 'Hospital CEO',
    quote: '"Can I see — in real time — whether the workforce that delivers my margins is the workforce I will have in twelve months?"',
    body: 'Workforce intelligence at the level your strategy operates on, not the level your HRIS reports on. Service-line risk, retention forecasts, and capital implications in one weekly brief.',
  },
  {
    role: 'Chief Human Resources Officer',
    title: 'CHRO',
    quote: '"How do I make every hiring decision defensible to the board, to the General Counsel, and to a regulator — on the same day?"',
    body: 'Replace binders, disparate vendors, and gut-feel reviews with a single instrument that produces an audit packet for every requisition.',
  },
  {
    role: 'VP Talent · Recruiting Lead',
    title: 'Talent Acquisition',
    quote: '"How do I move a recruiter managing 70 reqs from drowning to operating — without sacrificing quality?"',
    body: 'Interview 150 of 200 applicants, not 4. Recruiters do the relationships; the engine does the synthesis.',
  },
  {
    role: 'CMO · CNO · Service-line Chief',
    title: 'Clinical Operations',
    quote: '"How do I keep the floor safely staffed without burning out the team I have left?"',
    body: 'Match clinicians to roles where their cognitive, behavioral, and clinical-competence profile predicts they will perform — and stay.',
  },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Spec', module: 'V-Job.', desc: 'V-Job turns whatever you have — a paragraph, a JD template, a skills list — into a structured competency model mapped to the right role family.' },
  { num: '02', title: 'Screen', module: 'V-Parse.', desc: 'V-Parse processes 1,000 CVs per hour, scoring every applicant against the spec. Wildcards surface as a separate band.' },
  { num: '03', title: 'Assess', module: 'V-Psych + V-Interview + V-Scenario.', desc: 'V-Psych runs the OCEAN battery. V-Interview conducts 24/7 structured interviews. V-Scenario tests competence on real-world clinical scenarios.' },
  { num: '04', title: 'Decide', module: 'V-Fit.', desc: 'V-Fit triangulates all signals into a single composite match score per candidate — typically 40/20/40, customizable per role family.' },
  { num: '05', title: 'Operate', module: 'V-Onboarding + V-Insights.', desc: 'V-Onboarding turns the assessment into a 0–90-day plan. V-Insights closes the loop — performance data flows back to recalibrate the model.' },
]

const BADGES = [
  'SOC 2 Type II', 'HIPAA', 'HITRUST CSF', 'EEOC / OFCCP',
  'Single tenant', 'U.S. data residency', 'SAML / OIDC SSO', 'BAA included',
]

export default function V16Page() {
  const navRef = useRef<HTMLElement>(null)
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
    window.addEventListener('v17:complete', handler)
    return () => window.removeEventListener('v17:complete', handler)
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
    const els = document.querySelectorAll<HTMLElement>('.v17-reveal')
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
    <div className={`v17${complete ? ' v17--complete' : ''}`}>
      <div className="v17-pulse-overlay" id="v17PulseOverlay" aria-hidden="true" />

      {/* ================================================================
          NAVIGATION
          ================================================================ */}
      <nav className="v17-nav" ref={navRef}>
        <a href="/v17" className="v17-nav-logo">
          <img src="/images/brand/strategia-wordmark-abyss.svg" alt="Strategia" />
        </a>
        <ul className="v17-nav-links">
          <li><a href="#platform" className="v17-nav-link">Platform</a></li>
          <li><a href="#modules" className="v17-nav-link">Modules</a></li>
          <li><a href="#science" className="v17-nav-link">Science</a></li>
          <li><a href="#solutions" className="v17-nav-link">Solutions</a></li>
          <li><a href="#enterprise" className="v17-nav-link">Enterprise</a></li>
          <li><a href="#process" className="v17-nav-link">Process</a></li>
        </ul>
        <a href="#demo" className="v17-nav-cta">Book demo</a>
      </nav>

      {/* ================================================================
          HERO — Tetrahedron
          ================================================================ */}
      <section className="v17-hero">
        <div className="v17-cursor-aura" id="v17CursorAura" aria-hidden="true" />
        <div className="v17-plasma-layer" id="v17PlasmaLayer" aria-hidden="true" />

        <div className="v17-hero-copy">
          <h1>AI-Native<br />Workforce<br />Intelligence.</h1>
          <p>
            Predict performance before it lands. Defend every decision after it does.
            A multi-module platform that automates 80% of healthcare hiring &mdash; built
            for HR and executive teams.
          </p>
          <div className="v17-hero-actions">
            <a href="#demo" className="v17-btn-primary">Book a demo</a>
            <a href="#platform" className="v17-link-arrow">
              Explore the platform<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>

        <div className="v17-tetra-stage" id="v17Stage">
          <svg id="v17Tetra" viewBox="-110 -110 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <radialGradient id="v17CoreGlow" cx="50%" cy="50%" r="50%">
                <stop id="v17GlowStop0" offset="0%" stopColor="var(--glow-color)" stopOpacity="0.55" />
                <stop id="v17GlowStop1" offset="40%" stopColor="var(--glow-color)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--glow-color)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="v17PulseGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--glow-color)" stopOpacity="0" />
                <stop offset="55%" stopColor="var(--glow-color)" stopOpacity="0.55" />
                <stop offset="78%" stopColor="var(--glow-color)" stopOpacity="0.30" />
                <stop offset="100%" stopColor="var(--glow-color)" stopOpacity="0" />
              </radialGradient>
              <filter id="v17GlowBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="v17PulseBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
            </defs>
            <g id="v17Pulses" />
            <circle id="v17Glow" cx="0" cy="0" r="60" fill="url(#v17CoreGlow)" filter="url(#v17GlowBlur)" />
            <g id="v17Edges" />
          </svg>

          <div className="v17-brand-lockup" id="v17BrandLockup" aria-hidden="true">
            <img src="/images/brand/strategia-wordmark-abyss.svg" alt="Strategia" />
          </div>
        </div>
      </section>
      <div className="v17-scroll-spacer" aria-hidden="true" />

      {/* ================================================================
          TRUSTED BY — Marquee
          ================================================================ */}
      <div className="v17-marquee-strip">
        <div className="v17-marquee-label">Trusted by leading<br />health systems</div>
        <div className="v17-marquee-track">
          <div className="v17-marquee-inner">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div key={i} className="v17-marquee-item">
                <span className="v17-marquee-dot" aria-hidden="true" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================
          STATS
          ================================================================ */}
      <section className="v17-stats v17-reveal">
        <div className="v17-stats-grid">
          <div className="v17-stat-card">
            <div className="v17-stat-card-header">
              <span>01</span><span>Outcome</span>
            </div>
            <div className="v17-stat-value">80%</div>
            <div className="v17-stat-label">Of internal recruitment automated</div>
            <div className="v17-stat-sub">Median across deployed health systems</div>
          </div>
          <div className="v17-stat-card">
            <div className="v17-stat-card-header">
              <span>02</span><span>Outcome</span>
            </div>
            <div className="v17-stat-value">&lt;25 min</div>
            <div className="v17-stat-label">1,000 CVs end-to-end</div>
            <div className="v17-stat-sub">From requisition to ranked shortlist</div>
          </div>
          <div className="v17-stat-card">
            <div className="v17-stat-card-header">
              <span>03</span><span>Outcome</span>
            </div>
            <div className="v17-stat-value">0.74</div>
            <div className="v17-stat-label">Match-score validity (mature)</div>
            <div className="v17-stat-sub">vs. 0.18 for resume review (Sackett 2022)</div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PLATFORM — 8 Modules
          ================================================================ */}
      <section className="v17-section" id="modules">
        <div className="v17-section-inner v17-reveal">
          <div className="v17-section-header">
            <div>
              <div className="v17-eyebrow">The Platform &middot; 08 V-modules</div>
              <h2 className="v17-h2">
                One intelligence engine. <span className="muted">Eight V-modules that compose into
                a defensible hire-and-retain loop.</span>
              </h2>
            </div>
            <a href="#platform" className="v17-link-arrow">
              All modules<span aria-hidden="true"> ↗</span>
            </a>
          </div>

          <div className="v17-modules-grid">
            {MODULES.map((mod) => (
              <div key={mod.title} className="v17-module">
                <div className="v17-module-header">
                  <span className="v17-module-num">{mod.num}</span>
                  <span className="v17-module-tag">{mod.tag}</span>
                </div>
                <div className="v17-module-title">{mod.title}</div>
                <p className="v17-module-desc">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          TRIANGULATE METHOD (V-FIT)
          ================================================================ */}
      <section className="v17-triangulate">
        <div className="v17-triangulate-inner v17-reveal">
          <div className="v17-eyebrow">The Triangulate Method&trade;</div>
          <h2 className="v17-h2">
            Three signals. <span className="muted">One defensible composite score.</span>
          </h2>
          <p className="v17-desc">
            V-Parse, V-Psych, and V-Interview each produce a structured signal against the
            V-Job spec. V-Fit triangulates them &mdash; weighting, evidence, and a single
            defensible score per candidate.
          </p>

          <div className="v17-eyebrow" style={{ marginTop: 40, marginBottom: 0, fontSize: 10 }}>
            Role &middot; ICU Nurse Specialist &middot; <span style={{ color: 'rgba(6,41,62,0.5)' }}>authored by V-Job</span>
          </div>

          <div className="v17-tri-signals">
            <div className="v17-tri-signal">
              <div className="v17-tri-signal-bar v17-tri-signal-bar--parse" />
              <div className="v17-tri-signal-label">CV signal</div>
              <div className="v17-tri-signal-name">V-Parse&trade;</div>
            </div>
            <div className="v17-tri-signal">
              <div className="v17-tri-signal-bar v17-tri-signal-bar--psych" />
              <div className="v17-tri-signal-label">Psych signal</div>
              <div className="v17-tri-signal-name">V-Psych&trade;</div>
            </div>
            <div className="v17-tri-signal">
              <div className="v17-tri-signal-bar v17-tri-signal-bar--interview" />
              <div className="v17-tri-signal-label">Interview signal</div>
              <div className="v17-tri-signal-name">V-Interview&trade;</div>
            </div>
          </div>

          <div className="v17-tri-converge">
            <div className="v17-tri-converge-dot" />
          </div>

          <div className="v17-tri-result">
            <div className="v17-tri-result-header">
              <span className="status">V-Fit &middot; Synthesis complete</span>
              <span>L. Ortega &middot; ICU Nurse Specialist</span>
            </div>
            <div className="v17-tri-result-body">
              <div className="v17-tri-score-block">
                <div className="v17-tri-score-label">JobFit&trade; Score</div>
                <div className="v17-tri-score-value">94</div>
                <div className="v17-tri-verdict">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M3 7l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Highly recommended
                </div>
              </div>
              <div className="v17-tri-evidence">
                <div className="v17-tri-evidence-title">Key evidence</div>
                <ul className="v17-tri-evidence-list">
                  <li className="v17-tri-evidence-item">
                    <span className="v17-tri-evidence-tag">V-Parse</span>
                    <div>
                      <div className="v17-tri-evidence-text">Reg. Nurse (RN) License</div>
                      <div className="v17-tri-evidence-sub">Verified &middot; Lic. ID #PR01</div>
                    </div>
                  </li>
                  <li className="v17-tri-evidence-item">
                    <span className="v17-tri-evidence-tag">V-Psych</span>
                    <div>
                      <div className="v17-tri-evidence-text">Resilience + Empathy</div>
                      <div className="v17-tri-evidence-sub">T = 64 / 61 &middot; ICU role-fit cohort</div>
                    </div>
                  </li>
                  <li className="v17-tri-evidence-item">
                    <span className="v17-tri-evidence-tag">V-Interview</span>
                    <div>
                      <div className="v17-tri-evidence-text">Decision quality</div>
                      <div className="v17-tri-evidence-sub">0.91 weighted &middot; 4 scenario probes</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="v17-tri-footer">
            <span>40 / 20 / 40 default weighting &middot; customizable per role family</span>
            <span>Audit packet &middot; 7-year retention</span>
          </div>
        </div>
      </section>

      {/* ================================================================
          SCIENCE
          ================================================================ */}
      <section className="v17-section" id="science">
        <div className="v17-section-inner v17-reveal">
          <div className="v17-section-header">
            <div>
              <div className="v17-eyebrow">The Science</div>
              <h2 className="v17-h2">
                Built on peer-reviewed psychometrics &mdash; <span className="muted">not retrofitted retail norms.</span>
              </h2>
              <p className="v17-desc" style={{ marginTop: 24 }}>
                Every score the platform produces is grounded in published validity research,
                calibrated on healthcare populations.
              </p>
            </div>
            <div className="v17-hero-actions">
              <a href="/science" className="v17-btn-outline">Read the research</a>
              <a href="/science" className="v17-link-arrow">
                Methodology<span aria-hidden="true"> ↗</span>
              </a>
            </div>
          </div>

          <div className="v17-science-grid">
            <div className="v17-science-stat">
              <div className="v17-science-stat-header">
                <span className="value">0.74</span>
                <span className="evidence">Evidence</span>
              </div>
              <div className="label">Predictive validity coefficient</div>
              <div className="sub">vs. 0.18 for resume review and 0.21 for unstructured interview.</div>
            </div>
            <div className="v17-science-stat">
              <div className="v17-science-stat-header">
                <span className="value">&gt;100k</span>
                <span className="evidence">Evidence</span>
              </div>
              <div className="label">Clinicians normed</div>
              <div className="sub">Across 38 health systems and 14 specialty disciplines.</div>
            </div>
            <div className="v17-science-stat">
              <div className="v17-science-stat-header">
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
      <section className="v17-section" id="solutions">
        <div className="v17-section-inner v17-reveal">
          <div className="v17-eyebrow">Solutions</div>
          <h2 className="v17-h2">
            Built for the people who own the workforce &mdash;{' '}
            <span className="muted">CHRO, recruiter, executive, clinical operator.</span>
          </h2>

          <div className="v17-solutions-grid">
            {SOLUTIONS.map((sol) => (
              <div key={sol.title} className="v17-solution-card">
                <div className="v17-solution-role">{sol.role}</div>
                <div className="v17-solution-title">{sol.title}</div>
                <p className="v17-solution-quote">{sol.quote}</p>
                <p className="v17-solution-body">{sol.body}</p>
                <div className="v17-solution-link">Explore <span aria-hidden="true">&rarr;</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          ENTERPRISE
          ================================================================ */}
      <section className="v17-section" id="enterprise">
        <div className="v17-section-inner v17-reveal">
          <div className="v17-enterprise-wrap">
            <div className="v17-enterprise-bg" aria-hidden="true" />
            <div className="v17-enterprise-content">
              <div>
                <div className="v17-eyebrow">Enterprise</div>
                <h2 className="v17-h2">Deploy to the most regulated workforces in the country.</h2>
                <p className="v17-desc" style={{ marginTop: 24 }}>
                  SOC 2 Type II. HIPAA. HITRUST. Hosted in U.S. enclaves with single-tenant options.
                  Engineered for the General Counsel as much as the CHRO.
                </p>
                <div className="v17-hero-actions" style={{ marginTop: 32 }}>
                  <a href="/enterprise" className="v17-btn-outline">Enterprise &amp; security</a>
                  <a href="/process" className="v17-link-arrow">
                    Deployment process<span aria-hidden="true"> ↗</span>
                  </a>
                </div>
              </div>
              <div className="v17-badges-grid">
                {BADGES.map((b) => (
                  <div key={b} className="v17-badge-item">
                    <span className="v17-badge-check" aria-hidden="true">&#10003;</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROCESS
          ================================================================ */}
      <section className="v17-section" id="process">
        <div className="v17-section-inner v17-reveal">
          <div className="v17-process-wrap">
            <div className="v17-process-bg" aria-hidden="true" />
            <div style={{ position: 'relative' }}>
              <div className="v17-eyebrow">Our Process</div>
              <h2 className="v17-h2">Five steps from requisition to retained outcome.</h2>
              <p className="v17-desc">
                Every Strategia engagement runs the same disciplined loop. The output of
                every step is auditable, exportable, and yours.
              </p>

              <div className="v17-process-steps">
                <div className="v17-process-line" aria-hidden="true" />
                {PROCESS_STEPS.map((step) => (
                  <div key={step.num} className="v17-process-step">
                    <div className="v17-process-step-num">{step.num}</div>
                    <div className="v17-process-step-title">{step.title}</div>
                    <div className="v17-process-step-module">{step.module}</div>
                    <p className="v17-process-step-desc">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="v17-hero-actions" style={{ marginTop: 48 }}>
                <a href="/process" className="v17-btn-outline">Full process</a>
                <a href="/process" className="v17-link-arrow">
                  Talk to us<span aria-hidden="true"> ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          ROI CALCULATOR
          ================================================================ */}
      <section className="v17-section" id="roi">
        <div className="v17-section-inner v17-reveal">
          <div className="v17-eyebrow">ROI calculator</div>
          <h2 className="v17-h2">See the savings for your&nbsp;system.</h2>
          <p className="v17-desc">
            Three inputs. Conservative assumptions. A number you can take to
            your&nbsp;CFO.
          </p>

          <div className="v17-roi-grid">
            <div className="v17-roi-inputs">
              <div>
                <div className="v17-roi-input-header">
                  <span className="k">Total Employees</span>
                  <span className="v">{ftes.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  className="v17-roi-slider"
                  min={200} max={20000} step={100}
                  value={ftes}
                  onChange={(e) => setFtes(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="v17-roi-input-header">
                  <span className="k">Annual Turnover</span>
                  <span className="v">{turnover}%</span>
                </div>
                <input
                  type="range"
                  className="v17-roi-slider"
                  min={8} max={40} step={0.5}
                  value={turnover}
                  onChange={(e) => setTurnover(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="v17-roi-input-header">
                  <span className="k">Replacement Cost</span>
                  <span className="v">${(replacementCost / 1000).toFixed(0)}K</span>
                </div>
                <input
                  type="range"
                  className="v17-roi-slider"
                  min={30000} max={150000} step={1000}
                  value={replacementCost}
                  onChange={(e) => setReplacementCost(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="v17-roi-output">
              <div className="v17-roi-output-label">Projected annual savings</div>
              <div className="v17-roi-output-value">
                <span className="dollar">$</span>{bigValue}
              </div>
              <p className="v17-roi-output-sub">
                Based on a 26% reduction in avoidable attrition across
                comparable systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
          ================================================================ */}
      <section className="v17-cta-section" id="demo">
        <div className="v17-cta-wrap v17-reveal">
          <div className="v17-cta-bg" aria-hidden="true" />
          <h2 className="v17-h2">Turn hiring into a strategic lever.</h2>
          <p className="v17-desc">
            Most executives have great strategy and an opaque workforce. Strategia closes the gap.
          </p>
          <div className="v17-cta-actions">
            <a href="/demo" className="v17-btn-primary">Book a demo</a>
            <a href="/process" className="v17-link-arrow">
              Talk to us<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          FOOTER
          ================================================================ */}
      <footer className="v17-footer">
        <div className="v17-footer-inner">
          <div className="v17-footer-top">
            <div className="v17-footer-brand">
              <img src="/images/brand/strategia-wordmark-white.svg" alt="Strategia" />
              <p>
                The intelligence engine for the healthcare workforce. Hire defensibly.
                Plan rigorously. Operate at scale.
              </p>
              <div className="v17-footer-version">Strategia Intelligence Engine v2.0 &mdash; Live</div>
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

          <div className="v17-footer-bottom">
            <div className="v17-footer-bottom-left">&copy; 2026 Strategia, Inc. All rights reserved.</div>
            <div className="v17-footer-bottom-right">
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
