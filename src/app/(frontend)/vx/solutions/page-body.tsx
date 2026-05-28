'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import VxNav from '@/components/vx/VxNav'
import VxFooter from '@/components/vx/VxFooter'

/* eslint-disable @next/next/no-img-element */

type Audience = {
  id: 'chro' | 'talent-acquisition' | 'executive-team' | 'clinical-operations'
  eyebrow: string
  role: string
  title: string
  quote: string
  narrative: string[]
  outcomes: { label: string; detail: string }[]
}

const AUDIENCES: Audience[] = [
  {
    id: 'chro',
    eyebrow: 'Audience 01 · CHRO',
    role: 'Chief Human Resources Officer',
    title: 'For the CHRO who has to defend every hire on demand.',
    quote:
      '"How do I make every hiring decision defensible to the board, to the General Counsel, and to a regulator, on the same day?"',
    narrative: [
      'Most CHROs inherit a vendor stack of binders, point-tools, and gut-feel reviews. Strategia replaces it with a single instrument that produces an audit packet for every requisition, automatically.',
      'V-Job authors the spec. V-Parse, V-Psych, and V-Interview each generate independent signals. V-Fit triangulates them into one score with the evidence trail attached. The Triangulate Method gives you a defensible answer in writing.',
      'The result is a function that runs at executive cadence. You walk into the board meeting with the same hiring signal the General Counsel saw at 9am and the regulator sees on request.',
    ],
    outcomes: [
      {
        label: 'Audit packet per requisition',
        detail:
          'Every hire ships with a 7-year retention dossier. Scores, weighting, evidence, OCEAN profile, interview transcript.',
      },
      {
        label: 'One vendor, one instrument',
        detail:
          'Retire the binders and the disconnected SaaS. One contract, one validity standard, one source of truth across the org.',
      },
      {
        label: 'Board-ready workforce signal',
        detail:
          'Composite JobFit Score, attrition risk forecasts, and service-line exposure in a weekly executive brief.',
      },
    ],
  },
  {
    id: 'talent-acquisition',
    eyebrow: 'Audience 02 · Talent Acquisition',
    role: 'VP Talent · Recruiting Lead',
    title: 'For the recruiter managing 70 reqs without losing the candidate.',
    quote:
      '"How do I move a recruiter managing 70 reqs from drowning to operating, without sacrificing quality?"',
    narrative: [
      'Top-of-funnel coverage is the lie most TA orgs live with. Recruiters interview four candidates out of two hundred and call the other 196 a wash. Strategia inverts that math.',
      'V-Parse processes 1,000 CVs an hour. V-Psych and V-Interview run 24/7 on the candidate side. Every applicant gets a structured signal. Recruiters spend their hours on relationships, not on synthesis.',
      'The team that was drowning is now operating. Time-to-shortlist drops under 24 hours. Weekly recruiter time per req drops from 45 hours to 9. Quality holds, because the signal is the same one the CHRO can defend.',
    ],
    outcomes: [
      {
        label: '150 of 200 interviewed, not 4',
        detail:
          'Structured V-Interview coverage replaces phone-screen triage. Recruiters meet the wildcards their old funnel never surfaced.',
      },
      {
        label: 'Under 24 hours to shortlist',
        detail:
          'Ranked, evidence-backed shortlists land before the hiring manager finishes their first coffee on Monday.',
      },
      {
        label: '70 reqs without burnout',
        detail:
          'Recruiters move from clearing inboxes to closing offers. Headcount holds; throughput multiplies.',
      },
    ],
  },
  {
    id: 'executive-team',
    eyebrow: 'Audience 03 · Executive Team',
    role: 'CEO · COO · Board',
    title: 'For the executive team accountable for the workforce that delivers the margin.',
    quote:
      '"Can I see, in real time, whether the workforce that delivers my margins is the workforce I will have in twelve months?"',
    narrative: [
      'Most executives operate with great strategy and an opaque workforce. The HRIS reports headcount; the strategy needs forecasts. Strategia closes the gap.',
      'Service-line retention risk, capital implications, and exposure to single points of failure roll up into one operating view. V-Insights aggregates every assessment, every hire, every exit, and feeds the loop back into V-Job and V-Fit.',
      'You stop asking HR what the team looks like next quarter. The intelligence engine tells you, with the same signal weighting that defended the hire in the first place. Workforce becomes a lever, not a lagging indicator.',
    ],
    outcomes: [
      {
        label: 'Weekly executive brief',
        detail:
          'Service-line risk, retention forecasts, and succession depth in one page. Read it before the Monday standup.',
      },
      {
        label: 'Workforce as a capital lever',
        detail:
          'Tie attrition cost, replacement spend, and platform spend to one ROI number your CFO can sign.',
      },
      {
        label: 'Compounding intelligence',
        detail:
          'Every hire sharpens the next one. The validity benchmarks recalibrate to your roles, your population, your outcomes.',
      },
    ],
  },
  {
    id: 'clinical-operations',
    eyebrow: 'Audience 04 · Clinical Operations',
    role: 'CMO · CNO · Service-line Chief',
    title: 'For the clinical leader keeping the floor safely staffed.',
    quote:
      '"How do I keep the floor safely staffed without burning out the team I have left?"',
    narrative: [
      'Clinical operations is the workforce problem the spreadsheet cannot solve. The wrong hire is a safety event waiting for a shift to start. The right hire is a retention story you only learn 12 months later.',
      'Strategia matches clinicians to roles where their cognitive, behavioural, and clinical-competence profile predicts performance, and tenure. V-Scenario tests competence on real clinical scenarios. V-Psych measures resilience and empathy against the cohort the role actually demands.',
      'The output is a roster you can defend to the credentialling committee and a retention curve you can show the board. Floors stay covered, teams stop burning out, and the next hire arrives matched to the role before day one.',
    ],
    outcomes: [
      {
        label: '92% retention at 12 months',
        detail:
          'Clinical hires that match on resilience, empathy, and scenario competence stay. Across deployed systems, 92% are still on the floor a year later.',
      },
      {
        label: 'Safe coverage without overtime spirals',
        detail:
          'Predictive matching reduces avoidable churn so units stop running on agency and overtime to plug the same gap.',
      },
      {
        label: 'Onboarding tied to the assessment',
        detail:
          'V-Onboarding turns the hire’s profile into a 90-day clinical integration plan. The first shift is not the first signal.',
      },
    ],
  },
]

const INDUSTRIES = [
  {
    num: '01',
    name: 'Healthcare and pharma',
    desc: 'Assess for empathy, resilience, and attention to detail. Critical for clinical staff and pharma researchers working under sustained pressure.',
    stat: '92% retention at 12 months',
  },
  {
    num: '02',
    name: 'Financial services',
    desc: 'Identify high-integrity candidates for risk-sensitive roles. Models screen for conscientiousness and compliance adherence at scale.',
    stat: '40% faster time-to-fill for analysts',
  },
  {
    num: '03',
    name: 'Technology and engineering',
    desc: 'Go beyond LeetCode. V-Scenario tests system design thinking and collaborative debugging in real time.',
    stat: '3x increase in diverse technical hires',
  },
  {
    num: '04',
    name: 'Government and public sector',
    desc: 'Fair, transparent, audit-ready hiring that meets strict regulatory standards for equal opportunity.',
    stat: '100% audit compliance',
  },
]

const CONFIGURATIONS = [
  {
    num: 'C01',
    tag: 'Volume',
    title: 'High-volume hiring',
    desc: 'Automated top-of-funnel screening to process 10,000+ applicants in hours, not weeks. Ranked shortlists in under 24 hours.',
  },
  {
    num: 'C02',
    tag: 'Senior',
    title: 'Executive search',
    desc: 'Deep-dive psychometric dossiers and leadership simulation for C-Suite candidates. Defensible from the search committee to the board.',
  },
  {
    num: 'C03',
    tag: 'Internal',
    title: 'Internal mobility',
    desc: 'Audit your existing workforce to find hidden talent and close skills gaps internally before going to market.',
  },
  {
    num: 'C04',
    tag: 'Early career',
    title: 'Graduate programmes',
    desc: 'Identify high-potential talent based on aptitude and traits, not credentials. Predict who grows fastest.',
  },
]

const COMPOUND = [
  {
    num: '01',
    title: 'Assess your internal workforce',
    desc: 'Run existing teams through V-Fit (without the interview) to objectively map skills gaps and surface hidden high-potential employees.',
  },
  {
    num: '02',
    title: 'Predict attrition risk',
    desc: 'V-Psych correlates trait profiles with employee tenure. The system learns to flag flight risks during hiring, before you make an offer.',
  },
  {
    num: '03',
    title: 'Plan succession',
    desc: 'Automatically generate succession pools for critical roles by matching internal assessment data against leadership V-Job profiles.',
  },
]

export default function VxSolutionsBody() {
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

      {/* HERO */}
      <section className="v25-section" style={{ paddingTop: 'clamp(140px, 18vw, 220px)' }}>
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Solutions &middot; By role and by industry</div>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Literata", Georgia, serif)',
              fontSize: 'clamp(2.5rem, 6.4vw, 5.6rem)',
              fontWeight: 400,
              lineHeight: 0.98,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 2rem',
              maxWidth: '22ch',
              textWrap: 'balance',
            }}
          >
            Tailored workforce strategies, <span className="accent accent--sky">by role and industry.</span>
          </h1>
          <p className="v25-desc" style={{ maxWidth: '58ch', fontSize: '1.15rem' }}>
            One platform, configured for the people who own the workforce and the verticals they operate in. Each audience below has its own deep treatment. Each industry has its own validity benchmarks and compliance posture.
          </p>
          <div className="v25-hero-actions" style={{ marginTop: 32 }}>
            <a href="#by-role" className="v25-btn-outline">By role</a>
            <a href="#industries" className="v25-link-arrow">
              By industry<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* BY ROLE - INTRO */}
      <section className="v25-section v25-section--light" id="by-role">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">By role</div>
              <h2 className="v25-h2">
                Four audiences. <span className="accent accent--teal">One operating signal.</span>
              </h2>
              <p className="v25-desc" style={{ marginTop: 20, maxWidth: '60ch' }}>
                CHRO, recruiter, executive, clinical operator. Same Triangulate Method, same V-Job spec, same audit trail. Different decisions, different cadence, different outcomes.
              </p>
            </div>
            <Link href="/vx#solutions" className="v25-link-arrow">
              Audience overview<span aria-hidden="true"> ↗</span>
            </Link>
          </div>

          <div className="v25-process-steps" style={{ marginTop: 32 }}>
            <div className="v25-process-line" aria-hidden="true" />
            {AUDIENCES.map((aud, i) => (
              <a
                key={aud.id}
                href={`#${aud.id}`}
                className="v25-process-step"
                style={{ textDecoration: 'none' }}
              >
                <div className="v25-process-step-num">{`0${i + 1}`}</div>
                <div className="v25-process-step-title">{aud.role.split('·')[0].trim()}</div>
                <div className="v25-process-step-module">Jump to section.</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PER-AUDIENCE DEEP SECTIONS */}
      {AUDIENCES.map((aud, i) => {
        const isAlt = i % 2 === 1
        const accentClass = ['accent--teal', 'accent--lime', 'accent--sky', 'accent--teal'][i] ?? 'accent--teal'
        return (
          <section
            key={aud.id}
            id={aud.id}
            className={`v25-section${isAlt ? ' v25-section--light' : ''}`}
            style={{ scrollMarginTop: 96 }}
          >
            <div className="v25-section-inner v25-reveal">
              <div className="v25-eyebrow">{aud.eyebrow}</div>
              <h2 className="v25-h2" style={{ maxWidth: '24ch' }}>
                {aud.title.split('. ').map((part, idx, arr) => {
                  const isLast = idx === arr.length - 1
                  const text = isLast ? part : `${part}.`
                  return isLast ? (
                    <span key={idx} className={`accent ${accentClass}`}>{text}</span>
                  ) : (
                    <span key={idx}>{text} </span>
                  )
                })}
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
                  gap: 'clamp(32px, 5vw, 64px)',
                  marginTop: 32,
                  alignItems: 'start',
                }}
                className="vx-audience-grid"
              >
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display, "Literata", Georgia, serif)',
                      fontSize: 'clamp(1.15rem, 1.6vw, 1.35rem)',
                      lineHeight: 1.5,
                      fontStyle: 'italic',
                      color: isAlt ? 'rgba(1, 34, 54, 0.82)' : 'rgba(255, 255, 255, 0.88)',
                      borderLeft: `2px solid ${isAlt ? '#006D6A' : '#00C6C1'}`,
                      paddingLeft: 20,
                      margin: '0 0 28px',
                      maxWidth: '46ch',
                    }}
                  >
                    {aud.quote}
                  </p>
                  {aud.narrative.map((para, idx) => (
                    <p
                      key={idx}
                      className="v25-desc"
                      style={{ maxWidth: '54ch', marginBottom: idx === aud.narrative.length - 1 ? 0 : 16 }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <div>
                  <div
                    className="v25-eyebrow"
                    style={{ marginBottom: 16 }}
                  >
                    Outcomes Strategia drives
                  </div>
                  <div style={{ display: 'grid', gap: 1, background: isAlt ? 'rgba(1, 34, 54, 0.12)' : 'rgba(255, 255, 255, 0.10)', borderRadius: 16, overflow: 'hidden' }}>
                    {aud.outcomes.map((out, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: isAlt ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
                          padding: '20px 24px',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-tight, "Inter Tight", sans-serif)',
                            fontWeight: 600,
                            fontSize: '1rem',
                            letterSpacing: '-0.01em',
                            color: isAlt ? 'var(--v25-abyss)' : '#FFFFFF',
                            marginBottom: 6,
                          }}
                        >
                          {out.label}
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            lineHeight: 1.55,
                            color: isAlt ? 'rgba(1, 34, 54, 0.72)' : 'rgba(255, 255, 255, 0.72)',
                          }}
                        >
                          {out.detail}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <a href="/vx#demo" className="v25-link-arrow">
                      Book a configured walk-through<span aria-hidden="true"> ↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* BY INDUSTRY */}
      <section className="v25-section" id="industries" style={{ scrollMarginTop: 96 }}>
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">By industry</div>
              <h2 className="v25-h2">
                One platform, <span className="accent accent--lime">four verticals.</span>
              </h2>
            </div>
            <Link href="/vx/process" className="v25-link-arrow">
              How deployment runs<span aria-hidden="true"> ↗</span>
            </Link>
          </div>

          <div className="v25-modules-phased">
            <div className="v25-module-phase">
              <div className="v25-module-phase-header">
                <span className="v25-module-phase-step">Verticals</span>
                <span className="v25-module-phase-name">Configured</span>
                <p className="v25-module-phase-desc">Same engine, different competency models, validity benchmarks, and compliance posture per industry.</p>
              </div>
              <div className="v25-module-phase-cards">
                {INDUSTRIES.map((ind) => (
                  <div key={ind.name} className="v25-module">
                    <div className="v25-module-header">
                      <span className="v25-module-num">{ind.num}</span>
                      <span className="v25-module-tag">Vertical</span>
                    </div>
                    <div className="v25-module-title">{ind.name}</div>
                    <p className="v25-module-desc">{ind.desc}</p>
                    <p className="v25-module-desc" style={{ marginTop: 12, color: 'var(--v25-accent-text)' }}>
                      {ind.stat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIGURATIONS */}
      <section className="v25-section v25-section--light">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Specialised configurations</div>
          <h2 className="v25-h2">
            Volume, seniority, mobility. <span className="accent accent--teal">Configured per cohort.</span>
          </h2>
          <p className="v25-desc" style={{ maxWidth: '60ch' }}>
            Strategia adapts to the shape of the hire. The engine stays the same; the weights, scenarios, and validity benchmarks shift to fit.
          </p>

          <div className="v25-science-grid" style={{ marginTop: 48 }}>
            {CONFIGURATIONS.map((c) => (
              <div key={c.title} className="v25-science-stat">
                <div className="v25-science-stat-header">
                  <span className="value">{c.num}</span>
                  <span className="evidence">{c.tag}</span>
                </div>
                <div className="label">{c.title}</div>
                <div className="sub">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPOUND INTEREST */}
      <section className="v25-section" id="compound">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Compound intelligence</div>
              <h2 className="v25-h2">
                Every hire makes the next one <span className="accent accent--lime">sharper.</span>
              </h2>
            </div>
            <Link href="/vx/process" className="v25-link-arrow">
              The intelligence loop<span aria-hidden="true"> ↗</span>
            </Link>
          </div>
          <p className="v25-desc" style={{ maxWidth: '64ch', marginBottom: 48 }}>
            Strategia does not evaluate a single candidate in isolation. It aggregates millions of structured data points, turning your hiring process into a growing reservoir of strategic intelligence. Modules activate automatically as data density increases.
          </p>

          <div className="v25-process-steps">
            <div className="v25-process-line" aria-hidden="true" />
            {COMPOUND.map((step) => (
              <div key={step.num} className="v25-process-step">
                <div className="v25-process-step-num">{step.num}</div>
                <div className="v25-process-step-title">{step.title}</div>
                <p className="v25-process-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="v25-cta-section" id="demo">
        <div className="v25-cta-wrap v25-reveal">
          <div className="v25-cta-bg" aria-hidden="true" />
          <img
            src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png"
            alt="Strategia"
            className="v25-cta-logo"
          />
          <h2 className="v25-h2">
            See it on your roles. <span className="accent accent--teal">Your data.</span>
          </h2>
          <p className="v25-desc">
            A configured walk-through against one of your current requisitions. Thirty minutes.
          </p>
          <div className="v25-cta-actions">
            <a href="/vx#demo" className="v25-btn-primary">Book a demo</a>
            <Link href="/vx/process" className="v25-link-arrow">
              Talk to us<span aria-hidden="true"> ↗</span>
            </Link>
          </div>
        </div>
      </section>

      <VxFooter />
    </div>
  )
}
