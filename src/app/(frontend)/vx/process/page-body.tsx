'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import VxNav from '@/components/vx/VxNav'
import VxFooter from '@/components/vx/VxFooter'

/* eslint-disable @next/next/no-img-element */

// V25 already tells the full 5-step story on the homepage. On /vx/process we
// summarise that loop in one strip (anchor: #steps) and then go deeper:
// the actual engagement model, week by week, with deliverables, role split,
// and timeline numbers. The Variant A phase grid lives on /v25; this page
// answers a different question: "what happens when you sign with Strategia."

// Brief one-line "what changes in your workflow" hints. The full module
// descriptions live on /v25 and /vx/platform; we don't restate them here.
const STEPS_BRIEF = [
  {
    num: '01',
    title: 'Spec',
    module: 'V-Job.',
    hint: 'Your hiring manager stops drafting JDs in a doc. They review a structured competency model in a meeting.',
  },
  {
    num: '02',
    title: 'Screen',
    module: 'V-Parse.',
    hint: 'Recruiters stop reading CVs. They open a scored shortlist sorted against the signed spec.',
  },
  {
    num: '03',
    title: 'Assess',
    module: 'V-Psych, V-Interview, V-Scenario.',
    hint: 'Three signals are gathered in parallel before a human ever schedules a call.',
  },
  {
    num: '04',
    title: 'Decide',
    module: 'V-Fit.',
    hint: 'Panel debates move from gut feel to evidence weighting on a single composite score.',
  },
  {
    num: '05',
    title: 'Operate',
    module: 'V-Onboarding, V-Insights.',
    hint: '90-day plans land in the hiring manager inbox on day one. Performance data flows back to recalibrate the spec.',
  },
]

// The engagement model. Week zero is kickoff. By week six the first
// validated cohort is in production. By week twelve the loop is closed.
const TIMELINE = [
  {
    phase: 'Week 0',
    title: 'Kickoff',
    delivers:
      'Solutions architect assigned. Working sessions with talent leadership, hiring managers, and IT. Role-family inventory drafted.',
    provides:
      'Org chart, current requisition list, ATS contact, two priority roles to anchor the pilot.',
  },
  {
    phase: 'Week 1 to 2',
    title: 'Ingest and spec',
    delivers:
      'ATS integration live. V-Job spec authored for the two anchor roles. OCEAN benchmark drafted from incumbent performance data.',
    provides:
      'Read-only ATS credentials, last 24 months of hire and performance data, sign-off on the V-Job competency model.',
  },
  {
    phase: 'Week 3 to 4',
    title: 'First cohort screening',
    delivers:
      'V-Parse runs on the live inbound flow. First ranked shortlist delivered with evidence packets. V-Interview and V-Psych instances configured.',
    provides:
      'Recruiter to walk a sample of 10 shortlisted candidates with the architect. Acceptance criteria for the spec confirmed.',
  },
  {
    phase: 'Week 5 to 8',
    title: 'Validation and calibration',
    delivers:
      'V-Scenario library tailored to role family. Triangulation weights tuned against your historical placements. Audit packet template signed off by Legal.',
    provides:
      '3 historical hires (2 strong, 1 weak) for retro-scoring. Legal review of evidence packet. Hiring manager training session.',
  },
  {
    phase: 'Week 9 to 12',
    title: 'Full production',
    delivers:
      'All in-scope role families live. V-Onboarding plans issued for every hire. V-Insights dashboard live for executive and CHRO views.',
    provides:
      'Performance check-in cadence (30, 60, 90 day). Monthly review with the architect. Sign-off to roll to the next role-family wave.',
  },
]

// Concrete artefacts handed over at each phase. Five items, in delivery
// order. Each is exportable, signed, and stored in the audit trail.
const DELIVERABLES = [
  {
    num: 'D01',
    tag: 'Week 1 to 2',
    title: 'V-Job competency spec',
    desc: 'A structured, weighted, role-family-mapped spec document. Signed by the hiring manager and head of talent before screening starts.',
  },
  {
    num: 'D02',
    tag: 'Week 1 to 2',
    title: 'OCEAN benchmark report',
    desc: 'Role-specific T-score targets derived from your top-quartile incumbents. The reference against which every assessment is graded.',
  },
  {
    num: 'D03',
    tag: 'Week 3 onward',
    title: 'Shortlists with evidence packets',
    desc: 'Per requisition: ranked candidates, composite scores, signal weighting, decision rationale. Exportable to CSV or pushed to your ATS.',
  },
  {
    num: 'D04',
    tag: 'Week 9 onward',
    title: '90-day onboarding plan',
    desc: 'Per hire: a psychometric-tailored onboarding roadmap with coaching nudges for the manager and skill-gap modules for the new joiner.',
  },
  {
    num: 'D05',
    tag: 'Monthly',
    title: 'Insights brief',
    desc: 'Group-level visibility. Attrition risk, internal mobility matches, requisition health, and spec drift across the role families in scope.',
  },
]

// Who owns what during the engagement. Strategia owns the engine and the
// methodology; the client owns judgment calls and relationships. Both signed.
const ROLES_STRATEGIA = [
  'Authors the V-Job competency spec from your inputs.',
  'Operates the engine: V-Parse, V-Psych, V-Interview, V-Scenario, V-Fit.',
  'Maintains the audit packet for every requisition and retains it for seven years.',
  'Recalibrates the model monthly using V-Insights performance data.',
  'Assigns a solutions architect for the life of the engagement.',
]

const ROLES_CLIENT = [
  'Signs off on the V-Job spec before screening begins.',
  'Reviews and accepts (or rejects) the shortlist. Strategia does not present to hiring managers directly.',
  'Runs the final interview and reference checks. Owns the offer.',
  'Provides performance data at 30, 60, and 90 days. This is what closes the loop.',
  'Owns the candidate relationship from offer to start date and beyond.',
]

export default function VxProcessBody() {
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
          <div className="v25-eyebrow">Our Process &middot; Engagement model, week by week</div>
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
            Five steps. <span className="accent accent--teal">One disciplined loop.</span>
          </h1>
          <p className="v25-desc" style={{ maxWidth: '60ch', fontSize: '1.15rem' }}>
            The five-step loop is the architecture. Below: what actually happens, week by week, when a health system signs with Strategia. Every artefact is auditable, exportable, and yours.
          </p>
          <div className="v25-hero-actions" style={{ marginTop: 32 }}>
            <a href="#pipeline" className="v25-btn-outline">The 12-week pipeline</a>
            <a href="#roles" className="v25-link-arrow">
              Roles and responsibilities<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* THE FIVE STEPS — brief recap strip, with workflow-impact hints */}
      <section className="v25-section v25-section--light v25-process--a" id="steps">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-process-wrap">
            <div className="v25-process-bg" aria-hidden="true" />
            <div style={{ position: 'relative' }}>
              <div className="v25-eyebrow">The loop in one strip</div>
              <h2 className="v25-h2">
                What changes <span className="accent accent--teal">in your workflow</span>.
              </h2>
              <p className="v25-desc" style={{ maxWidth: '64ch' }}>
                The five named steps live on the homepage. Here, each is one line: what stops happening, and what starts. For the full module detail, see the platform page.
              </p>

              <div className="v25-process-steps">
                <div className="v25-process-line" aria-hidden="true" />
                {STEPS_BRIEF.map((step) => (
                  <div key={step.num} className="v25-process-step">
                    <div className="v25-process-step-num">{step.num}</div>
                    <div className="v25-process-step-title">{step.title}</div>
                    <div className="v25-process-step-module">{step.module}</div>
                    <p className="v25-process-step-desc">{step.hint}</p>
                  </div>
                ))}
              </div>

              <div className="v25-hero-actions" style={{ marginTop: 48 }}>
                <Link href="/vx/platform" className="v25-btn-solid">See the modules</Link>
                <a href="#pipeline" className="v25-link-arrow">
                  How the engagement runs<span aria-hidden="true"> ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PIPELINE — week by week */}
      <section className="v25-section" id="pipeline">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">The pipeline &middot; Week 0 to Week 12</div>
              <h2 className="v25-h2">
                Twelve weeks to <span className="accent accent--sky">closed-loop production</span>.
              </h2>
            </div>
            <a href="#deliverables" className="v25-link-arrow">
              What you receive<span aria-hidden="true"> ↗</span>
            </a>
          </div>

          <p className="v25-desc" style={{ maxWidth: '64ch', marginBottom: 48 }}>
            Each phase has two ledgers: what Strategia delivers, and what your team provides. No phase begins before its inputs are signed off. The cadence below is the median across deployed health systems; specific timings flex with role-family complexity.
          </p>

          <div className="v25-modules-phased">
            {TIMELINE.map((t) => (
              <div key={t.phase} className="v25-module-phase">
                <div className="v25-module-phase-header">
                  <span className="v25-module-phase-step">{t.phase}</span>
                  <span className="v25-module-phase-name">{t.title}</span>
                </div>
                <div className="v25-module-phase-cards v25-module-phase-cards--2">
                  <div className="v25-module">
                    <div className="v25-module-header">
                      <span className="v25-module-num">SYS</span>
                      <span className="v25-module-tag">Strategia delivers</span>
                    </div>
                    <p className="v25-module-desc" style={{ marginTop: 8 }}>{t.delivers}</p>
                  </div>
                  <div className="v25-module">
                    <div className="v25-module-header">
                      <span className="v25-module-num">YOU</span>
                      <span className="v25-module-tag">Client provides</span>
                    </div>
                    <p className="v25-module-desc" style={{ marginTop: 8 }}>{t.provides}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="v25-section v25-section--light" id="deliverables">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">What you receive</div>
          <h2 className="v25-h2">
            Five artefacts. <span className="accent accent--teal">All exportable. All yours.</span>
          </h2>
          <p className="v25-desc" style={{ maxWidth: '62ch' }}>
            Strategia produces structured deliverables at every phase. Take them with you, push them to your ATS, or store them in your data warehouse. The audit trail is retained for seven years.
          </p>

          <div className="v25-science-grid" style={{ marginTop: 48 }}>
            {DELIVERABLES.map((d) => (
              <div key={d.num} className="v25-science-stat">
                <div className="v25-science-stat-header">
                  <span className="value">{d.num}</span>
                  <span className="evidence">{d.tag}</span>
                </div>
                <div className="label">{d.title}</div>
                <div className="sub">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES & RESPONSIBILITIES */}
      <section className="v25-section" id="roles">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Roles and responsibilities</div>
              <h2 className="v25-h2">
                Who owns what. <span className="accent accent--lime">No grey zones.</span>
              </h2>
            </div>
            <Link href="/vx/institutional" className="v25-link-arrow">
              Governance and audit<span aria-hidden="true"> ↗</span>
            </Link>
          </div>

          <p className="v25-desc" style={{ maxWidth: '64ch', marginBottom: 48 }}>
            Strategia operates the engine and authors the methodology. Your team owns judgment calls, candidate relationships, and the final hire. The split is signed at kickoff.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1px',
              background: 'rgba(255, 255, 255, 0.10)',
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.10)',
            }}
          >
            <div
              style={{
                background: 'rgba(0, 25, 46, 0.45)',
                padding: 'clamp(24px, 3vw, 36px)',
              }}
            >
              <div
                className="v25-eyebrow"
                style={{ color: 'var(--v25-accent-text, #A5DCD0)', marginBottom: 16 }}
              >
                Strategia owns
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                {ROLES_STRATEGIA.map((r) => (
                  <li
                    key={r}
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                      color: 'rgba(255, 255, 255, 0.82)',
                      fontSize: 15,
                      lineHeight: 1.55,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        color: 'var(--v25-accent-text, #A5DCD0)',
                        flex: '0 0 auto',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: 12,
                        letterSpacing: '0.14em',
                        marginTop: 2,
                      }}
                    >
                      SYS
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                background: 'rgba(0, 25, 46, 0.45)',
                padding: 'clamp(24px, 3vw, 36px)',
              }}
            >
              <div
                className="v25-eyebrow"
                style={{ color: '#A1E2B7', marginBottom: 16 }}
              >
                Client owns
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                {ROLES_CLIENT.map((r) => (
                  <li
                    key={r}
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                      color: 'rgba(255, 255, 255, 0.82)',
                      fontSize: 15,
                      lineHeight: 1.55,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        color: '#A1E2B7',
                        flex: '0 0 auto',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: 12,
                        letterSpacing: '0.14em',
                        marginTop: 2,
                      }}
                    >
                      YOU
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TIMING / IMPACT */}
      <section className="v25-section v25-section--light" id="timing">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Timing</div>
              <h2 className="v25-h2">
                Two weeks to a shortlist. <span className="accent accent--teal">Ninety days to a closed loop.</span>
              </h2>
            </div>
            <Link href="/vx/institutional" className="v25-link-arrow">
              Implementation detail<span aria-hidden="true"> ↗</span>
            </Link>
          </div>

          <div className="v25-science-grid">
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">2 wks</span>
                <span className="evidence">First shortlist</span>
              </div>
              <div className="label">First scored candidates in your inbox</div>
              <div className="sub">From kickoff. V-Parse running on the first inbound cohort against a signed competency spec.</div>
            </div>
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">6 wks</span>
                <span className="evidence">Validated production</span>
              </div>
              <div className="label">First validated hires through the loop</div>
              <div className="sub">Triangulation weights tuned, audit packet signed off, hiring managers trained, full assessment battery live.</div>
            </div>
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">90 days</span>
                <span className="evidence">Closed loop</span>
              </div>
              <div className="label">V-Insights recalibrates V-Job</div>
              <div className="sub">First performance data lands. The spec for the next cohort is informed by the last one. The loop is now closed.</div>
            </div>
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
            Run the loop on one of your <span className="accent accent--teal">live requisitions.</span>
          </h2>
          <p className="v25-desc">
            A walk-through against a current opening. Spec to shortlist in under thirty minutes.
          </p>
          <div className="v25-cta-actions">
            <a href="/vx#demo" className="v25-btn-primary">Book a demo</a>
            <Link href="/vx/platform" className="v25-link-arrow">
              See the modules<span aria-hidden="true"> ↗</span>
            </Link>
          </div>
        </div>
      </section>

      <VxFooter />
    </div>
  )
}
