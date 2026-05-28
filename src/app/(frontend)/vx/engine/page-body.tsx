'use client'

import { useEffect } from 'react'
import VxNav from '@/components/vx/VxNav'
import VxFooter from '@/components/vx/VxFooter'

/* eslint-disable @next/next/no-img-element */

// V-Job: two operating modes for authoring the role spec.
const V_JOB_MODES = [
  {
    num: 'M01a',
    tag: 'AI mode',
    title: 'AI authoring',
    desc: 'You retain full control to edit, refine, or override any output. The human in the loop is always in charge of the final criteria.',
  },
  {
    num: 'M01b',
    tag: 'Manual mode',
    title: 'Manual authoring',
    desc: 'Build the role architecture from the ground up. Define clinical competencies, shift requirements, and compliance certifications with granular control over every parameter.',
  },
]

const V_JOB_TAGS = ['Skills benchmark', 'Ideal personality fit', 'Save templates']

// V-Parse: extracted entities for one candidate.
const V_PARSE_ROWS: Array<{ field: string; value: string; status?: string }> = [
  { field: 'Candidate name', value: 'Sarah Jenkins' },
  { field: 'Total experience', value: '7.5 years' },
  { field: 'Top skills', value: 'ICU, Triage, EMR' },
  { field: 'Education', value: 'BSN, RN License' },
  { field: 'JSON export ready', value: 'Yes', status: 'ok' },
]

// V-Psych: OCEAN dimensions scored as T-scores against an ICU role cohort.
const V_PSYCH_DIMENSIONS = [
  { label: 'Openness', t: 58, pct: 58 },
  { label: 'Conscientiousness', t: 67, pct: 78 },
  { label: 'Extraversion', t: 52, pct: 50 },
  { label: 'Agreeableness', t: 64, pct: 72 },
  { label: 'Neuroticism', t: 41, pct: 32 },
]

// V-Scenario: the patient triage prompt verbatim plus the three options.
const V_SCENARIO_OPTIONS = [
  {
    key: 'A',
    text: 'Administer pain medication',
    score: 'Suboptimal',
    note: 'Treats symptom, misses underlying cardiac signal.',
    tone: 'low' as const,
  },
  {
    key: 'B',
    text: 'Order ECG and call cardiology consult',
    score: 'Optimal',
    note: 'Correct clinical pathway. Diagnostic before intervention.',
    tone: 'high' as const,
  },
  {
    key: 'C',
    text: 'Schedule follow-up appointment',
    score: 'Unsafe',
    note: 'Defers an acute presentation. Triage failure.',
    tone: 'fail' as const,
  },
]

// V-Onboarding: week-one roadmap plus the rolling checklist.
const V_ONBOARDING_ROADMAP = [
  { label: 'System access', state: 'Automated', done: true },
  { label: 'Team intro', state: 'Scheduled', done: true },
  { label: 'First project', state: 'Assigned', done: true },
]

const V_ONBOARDING_CHECKLIST = [
  { label: 'Department orientation', state: 'Done', done: true },
  { label: 'EMR system training', state: 'Done', done: true },
  { label: 'Clinical protocols review', state: 'Done', done: true },
  { label: 'Shadow senior staff', state: 'Pending', done: false },
  { label: 'Supervisor check-in', state: 'Scheduled', done: false },
]

// Triangulate: verified evidence captured by V-Parse, validated by downstream modules.
const TRI_VERIFIED = [
  {
    title: 'Reg. Nurse (RN) License',
    sub: 'Verified via V-Parse. Lic. ID #9921.',
  },
  {
    title: '5+ years critical care',
    sub: 'Verified via V-Parse and work history.',
  },
  {
    title: 'Patient empathy',
    sub: 'High match in V-Interview. T = 64 on Agreeableness.',
  },
]

export default function VxEngineBody() {
  // Scroll-reveal observer (style guide section 6).
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

      {/* ============================================
          HERO
          ============================================ */}
      <section
        className="v25-section"
        style={{ paddingTop: 'clamp(140px, 18vw, 220px)' }}
      >
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">The Intelligence Engine</div>
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
            Six modules feeding{' '}
            <span className="accent accent--teal">one defensible score</span>.
          </h1>
          <p
            className="v25-desc"
            style={{ maxWidth: '58ch', fontSize: '1.15rem' }}
          >
            Author the role. Parse 1,000 CVs an hour. Run validated psychometrics,
            structured interviews, and live scenarios. Triangulate every signal
            into one V-JobFit score per candidate, with the evidence trail
            attached.
          </p>
          <div className="v25-hero-actions" style={{ marginTop: 32 }}>
            <a href="/vx#demo" className="v25-btn-primary">
              Book a demo
            </a>
            <a href="#triangulate" className="v25-link-arrow">
              See the synthesis<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          V-JOB (Role Architecture)
          Two operating modes shown as module cards plus the
          feature tag row underneath.
          ============================================ */}
      <section className="v25-section" id="v-job">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">M01 &middot; V-Job&trade;</div>
              <h2 className="v25-h2">
                Role architecture, authored two ways.{' '}
                <span className="accent accent--sky">
                  Always human in the loop.
                </span>
              </h2>
            </div>
            <a href="#v-parse" className="v25-link-arrow">
              Next, V-Parse<span aria-hidden="true"> ↗</span>
            </a>
          </div>

          <div
            className="v25-module-phase-cards v25-module-phase-cards--2"
            style={{ marginBottom: 32 }}
          >
            {V_JOB_MODES.map((mod) => (
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

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <span
              className="v25-eyebrow"
              style={{ margin: 0, marginRight: 12 }}
            >
              Built-in
            </span>
            {V_JOB_TAGS.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.78)',
                  padding: '8px 14px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          V-PARSE (CV deconstruction) — LIGHT BAND
          ============================================ */}
      <section className="v25-section v25-section--light" id="v-parse">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">M02 &middot; V-Parse&trade;</div>
              <h2 className="v25-h2">
                Unstructured CVs into{' '}
                <span className="accent accent--teal">
                  structured evidence
                </span>
                .
              </h2>
              <p
                className="v25-desc"
                style={{ marginTop: 20, maxWidth: '54ch' }}
              >
                Built-in anti-bias mechanisms mask PII so scoring stays
                merit-based. Every field below is exportable to JSON and
                traceable to the source document.
              </p>
            </div>
            <div
              className="v25-stat-card"
              style={{ minWidth: 220, textAlign: 'right' }}
            >
              <div className="v25-stat-value">1,000+</div>
              <div className="v25-stat-label">CVs parsed per hour</div>
              <div className="v25-stat-sub">99.8% OCR accuracy</div>
            </div>
          </div>

          <div
            style={{
              border: '1px solid rgba(1, 34, 54, 0.12)',
              borderRadius: 20,
              background: '#ffffff',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                padding: '18px 24px',
                borderBottom: '1px solid rgba(1, 34, 54, 0.10)',
                background: 'rgba(0, 109, 106, 0.06)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'rgba(1, 34, 54, 0.70)',
                }}
              >
                Extracted entities &middot; candidate #A92-K10
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: '#006D6A',
                }}
              >
                PII masked
              </div>
            </div>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                color: 'var(--v25-abyss)',
                fontFamily: 'var(--font-inter, "Inter", sans-serif)',
              }}
            >
              <tbody>
                {V_PARSE_ROWS.map((row, i) => (
                  <tr
                    key={row.field}
                    style={{
                      borderTop:
                        i === 0
                          ? 'none'
                          : '1px solid rgba(1, 34, 54, 0.08)',
                    }}
                  >
                    <td
                      style={{
                        padding: '16px 24px',
                        width: '40%',
                        fontSize: 13,
                        fontWeight: 500,
                        color: 'rgba(1, 34, 54, 0.65)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {row.field}
                    </td>
                    <td
                      style={{
                        padding: '16px 24px',
                        fontSize: 15,
                        fontWeight: 500,
                        color: 'var(--v25-abyss)',
                      }}
                    >
                      {row.value}
                      {row.status === 'ok' && (
                        <span
                          style={{
                            marginLeft: 10,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '3px 10px',
                            borderRadius: 999,
                            background: 'rgba(31, 106, 71, 0.12)',
                            color: '#1F6A47',
                            fontSize: 11,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.10em',
                          }}
                        >
                          <span aria-hidden="true">&#10003;</span> Ready
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================
          V-PSYCH (OCEAN profile) — DARK BAND
          ============================================ */}
      <section className="v25-section" id="v-psych">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">M03 &middot; V-Psych&trade;</div>
              <h2 className="v25-h2">
                OCEAN, scored against{' '}
                <span className="accent accent--lime">role cohorts</span>.
              </h2>
              <p
                className="v25-desc"
                style={{ marginTop: 20, maxWidth: '54ch' }}
              >
                A five to seven minute proprietary battery returns T-scores
                converted against a healthcare-normed reference group. Item
                Response Theory adapts question difficulty in real time.
              </p>
            </div>
            <a href="#v-interview" className="v25-link-arrow">
              Next, V-Interview<span aria-hidden="true"> ↗</span>
            </a>
          </div>

          <div
            style={{
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 20,
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                Dimension analysis &middot; ICU Nurse cohort (n = 4,812)
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--v25-accent-text, #A5DCD0)',
                }}
              >
                r = 0.85 predictive validity
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
              }}
            >
              {V_PSYCH_DIMENSIONS.map((d) => (
                <div
                  key={d.label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr 64px',
                    gap: 20,
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        'var(--font-inter-tight, "Inter Tight", sans-serif)',
                      fontSize: 15,
                      fontWeight: 500,
                      color: '#ffffff',
                    }}
                  >
                    {d.label}
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      height: 8,
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.08)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: `${d.pct}%`,
                        background:
                          'linear-gradient(90deg, rgba(0, 80, 114, 0.85) 0%, var(--v25-accent, #00C6C1) 100%)',
                        borderRadius: 999,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--v25-accent-text, #A5DCD0)',
                      textAlign: 'right',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    T={d.t}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          V-INTERVIEW (sample output) — LIGHT BAND
          ============================================ */}
      <section className="v25-section v25-section--light" id="v-interview">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">M04 &middot; V-Interview&trade;</div>
              <h2 className="v25-h2">
                Structured interviews,{' '}
                <span className="accent accent--teal">24/7 on demand</span>.
              </h2>
              <p
                className="v25-desc"
                style={{ marginTop: 20, maxWidth: '54ch' }}
              >
                AI-moderated video screening. NLP scoring captures verbal
                reasoning, decision quality, and confidence in language the
                hiring panel can review.
              </p>
            </div>
            <a href="#v-scenario" className="v25-link-arrow">
              Next, V-Scenario<span aria-hidden="true"> ↗</span>
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 1,
              background: 'rgba(1, 34, 54, 0.12)',
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid rgba(1, 34, 54, 0.12)',
            }}
          >
            <div
              style={{
                background: '#ffffff',
                padding: '28px 28px 24px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'rgba(1, 34, 54, 0.60)',
                  marginBottom: 14,
                }}
              >
                NLP signal
              </div>
              <div
                style={{
                  fontFamily:
                    'var(--font-display, "Literata", Georgia, serif)',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: 'var(--v25-abyss)',
                  lineHeight: 1.25,
                  marginBottom: 12,
                }}
              >
                &ldquo;Confidence detected. Clear articulation.&rdquo;
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: 'rgba(1, 34, 54, 0.65)',
                  lineHeight: 1.55,
                }}
              >
                Verbal reasoning score: 0.91 weighted across four scenario
                probes.
              </div>
            </div>
            <div
              style={{
                background: '#ffffff',
                padding: '28px 28px 24px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'rgba(1, 34, 54, 0.60)',
                  marginBottom: 14,
                }}
              >
                Interview meta
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {[
                  ['Duration', '14 min 22 s'],
                  ['Questions', '8 structured probes'],
                  ['Language', 'English (US)'],
                  ['Interviewer variability', 'Removed'],
                ].map(([k, v]) => (
                  <li
                    key={k}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 16,
                      fontSize: 14,
                      color: 'var(--v25-abyss)',
                      borderBottom: '1px dashed rgba(1, 34, 54, 0.12)',
                      paddingBottom: 8,
                    }}
                  >
                    <span style={{ color: 'rgba(1, 34, 54, 0.65)' }}>{k}</span>
                    <span style={{ fontWeight: 500 }}>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          V-SCENARIO (patient triage simulation) — DARK BAND
          ============================================ */}
      <section className="v25-section" id="v-scenario">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">M06 &middot; V-Scenario&trade;</div>
              <h2 className="v25-h2">
                Live decisions on{' '}
                <span className="accent accent--sky">real clinical cases</span>.
              </h2>
              <p
                className="v25-desc"
                style={{ marginTop: 20, maxWidth: '54ch' }}
              >
                Interactive role-specific scenarios from patient care to
                executive judgement calls. Multi-dimensional scoring captures
                strengths and risks in the same answer.
              </p>
            </div>
            <a href="#v-onboarding" className="v25-link-arrow">
              Next, V-Onboarding<span aria-hidden="true"> ↗</span>
            </a>
          </div>

          <div
            style={{
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 20,
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--v25-accent-text, #A5DCD0)',
                marginBottom: 16,
              }}
            >
              Simulation &middot; Patient triage
            </div>
            <p
              style={{
                fontFamily:
                  'var(--font-display, "Literata", Georgia, serif)',
                fontSize: 'clamp(1.25rem, 2.2vw, 1.65rem)',
                lineHeight: 1.35,
                color: '#ffffff',
                margin: '0 0 32px',
                maxWidth: '64ch',
                textWrap: 'balance',
              }}
            >
              &ldquo;A 65-year-old patient presents with chest pain and
              shortness of breath. Vitals show elevated BP and irregular heart
              rate. What is your first action?&rdquo;
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 16,
              }}
            >
              {V_SCENARIO_OPTIONS.map((opt) => {
                const accent =
                  opt.tone === 'high'
                    ? 'var(--v25-accent, #00C6C1)'
                    : opt.tone === 'low'
                    ? 'rgba(255, 200, 120, 0.9)'
                    : 'rgba(255, 140, 140, 0.9)'
                return (
                  <article
                    key={opt.key}
                    style={{
                      position: 'relative',
                      border: '1px solid rgba(255,255,255,0.10)',
                      borderRadius: 16,
                      padding: '20px 22px 22px',
                      background:
                        opt.tone === 'high'
                          ? 'rgba(0, 198, 193, 0.08)'
                          : 'rgba(255,255,255,0.03)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 3,
                        background: accent,
                      }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            'var(--font-mono, "JetBrains Mono", monospace)',
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.14em',
                          color: 'rgba(255,255,255,0.65)',
                        }}
                      >
                        Option {opt.key}
                      </span>
                      <span
                        style={{
                          fontFamily:
                            'var(--font-mono, "JetBrains Mono", monospace)',
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.10em',
                          color: accent,
                        }}
                      >
                        {opt.score}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily:
                          'var(--font-inter-tight, "Inter Tight", sans-serif)',
                        fontSize: 16,
                        fontWeight: 500,
                        color: '#ffffff',
                        marginBottom: 10,
                        lineHeight: 1.4,
                      }}
                    >
                      {opt.text}
                    </div>
                    <p
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.55,
                        color: 'rgba(255,255,255,0.65)',
                        margin: 0,
                      }}
                    >
                      {opt.note}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          V-ONBOARDING (week-one roadmap + checklist) — LIGHT BAND
          ============================================ */}
      <section className="v25-section v25-section--light" id="v-onboarding">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">M07 &middot; V-Onboarding&trade;</div>
              <h2 className="v25-h2">
                Day one already aligned to{' '}
                <span className="accent accent--teal">the assessment</span>.
              </h2>
              <p
                className="v25-desc"
                style={{ marginTop: 20, maxWidth: '54ch' }}
              >
                Every plan inherits the new hire&apos;s psychometric profile,
                role, and team composition. The first 90 days are operational
                before they arrive.
              </p>
            </div>
            <a href="#triangulate" className="v25-link-arrow">
              Triangulated output<span aria-hidden="true"> ↗</span>
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {/* Week-1 Roadmap */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid rgba(1, 34, 54, 0.12)',
                borderRadius: 20,
                padding: 28,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily:
                      'var(--font-mono, "JetBrains Mono", monospace)',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'rgba(1, 34, 54, 0.60)',
                  }}
                >
                  Week 1 roadmap
                </div>
                <div
                  style={{
                    fontFamily:
                      'var(--font-mono, "JetBrains Mono", monospace)',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#1F6A47',
                  }}
                >
                  3 / 3 complete
                </div>
              </div>
              <ul
                style={{ listStyle: 'none', margin: 0, padding: 0 }}
              >
                {V_ONBOARDING_ROADMAP.map((item) => (
                  <li
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '12px 0',
                      borderBottom: '1px dashed rgba(1, 34, 54, 0.12)',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        color: 'var(--v25-abyss)',
                        fontSize: 15,
                        fontWeight: 500,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          background: '#1F6A47',
                          color: '#ffffff',
                          fontSize: 11,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        &#10003;
                      </span>
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.10em',
                        color: 'rgba(1, 34, 54, 0.60)',
                        fontFamily:
                          'var(--font-mono, "JetBrains Mono", monospace)',
                      }}
                    >
                      {item.state}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Onboarding Checklist */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid rgba(1, 34, 54, 0.12)',
                borderRadius: 20,
                padding: 28,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily:
                      'var(--font-mono, "JetBrains Mono", monospace)',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'rgba(1, 34, 54, 0.60)',
                  }}
                >
                  Onboarding checklist
                </div>
                <div
                  style={{
                    fontFamily:
                      'var(--font-mono, "JetBrains Mono", monospace)',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#006D6A',
                  }}
                >
                  3 / 5 done
                </div>
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {V_ONBOARDING_CHECKLIST.map((item) => (
                  <li
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '12px 0',
                      borderBottom: '1px dashed rgba(1, 34, 54, 0.12)',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        color: item.done
                          ? 'var(--v25-abyss)'
                          : 'rgba(1, 34, 54, 0.65)',
                        fontSize: 15,
                        fontWeight: 500,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 4,
                          background: item.done ? '#1F6A47' : 'transparent',
                          border: item.done
                            ? '1px solid #1F6A47'
                            : '1px solid rgba(1, 34, 54, 0.30)',
                          color: '#ffffff',
                          fontSize: 11,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.done ? '✓' : ''}
                      </span>
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.10em',
                        color: item.done
                          ? '#1F6A47'
                          : 'rgba(1, 34, 54, 0.55)',
                        fontFamily:
                          'var(--font-mono, "JetBrains Mono", monospace)',
                      }}
                    >
                      {item.state}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TRIANGULATED OUTPUT
          Centrepiece. Uses the .v25-triangulate-inner panel
          with the V-JobFit score, signal weighting bar, and
          verified-evidence list underneath.
          ============================================ */}
      <section className="v25-triangulate" id="triangulate">
        <div className="v25-triangulate-inner v25-reveal">
          <div className="v25-tri-intro">
            <div className="v25-tri-intro-lead">
              <div className="v25-eyebrow">Triangulated output</div>
              <h2 className="v25-h2">
                Three signals.{' '}
                <span className="accent accent--lime">One score.</span>
              </h2>
            </div>
            <p className="v25-tri-intro-desc">
              V-Parse, V-Psych, and V-Interview each produce an independent
              signal against the V-Job spec. V-Fit triangulates them into a
              single defensible match score, with weighting and evidence
              attached.
            </p>
          </div>

          <div className="v25-tri-board">
            <div className="v25-tri-board-meta">
              <span className="v25-tri-board-meta-key">Role</span>
              <span className="v25-tri-board-meta-value">
                ICU Nurse Specialist
              </span>
              <span className="v25-tri-board-meta-sep">&middot;</span>
              <span className="v25-tri-board-meta-sub">
                input integrity verified
              </span>
            </div>

            <div className="v25-tri-signals">
              <article className="v25-tri-signal v25-tri-signal--parse">
                <header className="v25-tri-signal-head">
                  <span className="v25-tri-signal-kind">CV signal</span>
                  <span className="v25-tri-signal-weight">40%</span>
                </header>
                <div className="v25-tri-signal-name">V-Parse&trade;</div>
                <div className="v25-tri-signal-evidence">
                  <div className="v25-tri-signal-evidence-text">
                    Reg. Nurse (RN) License
                  </div>
                  <div className="v25-tri-signal-evidence-sub">
                    Verified, Lic. ID #9921
                  </div>
                </div>
              </article>
              <article className="v25-tri-signal v25-tri-signal--psych">
                <header className="v25-tri-signal-head">
                  <span className="v25-tri-signal-kind">Psych signal</span>
                  <span className="v25-tri-signal-weight">20%</span>
                </header>
                <div className="v25-tri-signal-name">V-Psych&trade;</div>
                <div className="v25-tri-signal-evidence">
                  <div className="v25-tri-signal-evidence-text">
                    Conscientiousness + Agreeableness
                  </div>
                  <div className="v25-tri-signal-evidence-sub">
                    T = 67 / 64, ICU role-fit cohort
                  </div>
                </div>
              </article>
              <article className="v25-tri-signal v25-tri-signal--interview">
                <header className="v25-tri-signal-head">
                  <span className="v25-tri-signal-kind">Interview signal</span>
                  <span className="v25-tri-signal-weight">40%</span>
                </header>
                <div className="v25-tri-signal-name">V-Interview&trade;</div>
                <div className="v25-tri-signal-evidence">
                  <div className="v25-tri-signal-evidence-text">
                    Decision quality
                  </div>
                  <div className="v25-tri-signal-evidence-sub">
                    0.91 weighted, 4 scenario probes
                  </div>
                </div>
              </article>
            </div>

            <div className="v25-tri-converge">
              <svg
                className="v25-tri-converge-svg"
                viewBox="0 0 600 110"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <g
                  stroke="#00C6C1"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                >
                  <path
                    d="M100 0 V22 Q100 30 108 30 H300"
                    strokeOpacity="0.85"
                  />
                  <path
                    d="M500 0 V22 Q500 30 492 30 H300"
                    strokeOpacity="0.85"
                  />
                  <path d="M300 0 V104" strokeOpacity="1" />
                </g>
              </svg>
            </div>
            <div className="v25-tri-converge-dot" />

            <div className="v25-tri-result">
              <div className="v25-tri-result-header">
                <span className="status">
                  V-Fit &middot; Synthesis complete
                </span>
                <span>S. Jenkins &middot; ID #A92-K10</span>
              </div>
              <div className="v25-tri-result-body">
                <div className="v25-tri-score">
                  <div className="v25-tri-score-label">
                    V-JobFit&trade; score
                  </div>
                  <div className="v25-tri-score-value">94</div>
                  <div className="v25-tri-verdict">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 7l3 3 5-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Highly recommended
                  </div>
                </div>
                <div className="v25-tri-weighting">
                  <div className="v25-tri-weighting-label">
                    Signal weighting
                  </div>
                  <div className="v25-tri-weighting-bar">
                    <span
                      className="v25-tri-weighting-seg v25-tri-weighting-seg--parse"
                      style={{ flex: 40 }}
                    >
                      <span className="v25-tri-weighting-pct">40</span>
                      <span className="v25-tri-weighting-name">Parse</span>
                    </span>
                    <span
                      className="v25-tri-weighting-seg v25-tri-weighting-seg--psych"
                      style={{ flex: 20 }}
                    >
                      <span className="v25-tri-weighting-pct">20</span>
                      <span className="v25-tri-weighting-name">Psych</span>
                    </span>
                    <span
                      className="v25-tri-weighting-seg v25-tri-weighting-seg--interview"
                      style={{ flex: 40 }}
                    >
                      <span className="v25-tri-weighting-pct">40</span>
                      <span className="v25-tri-weighting-name">Interview</span>
                    </span>
                  </div>
                  <div className="v25-tri-weighting-meta">
                    Default split, customizable per role family
                  </div>
                </div>
              </div>
              <div className="v25-tri-result-footer">
                <span>Multi-modal analysis validated against V-Job criteria</span>
                <span>Audit packet &middot; 7-year retention</span>
              </div>
            </div>
          </div>

          {/* Verified evidence list — multi-modal verification trail */}
          <div
            style={{
              marginTop: 40,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {TRI_VERIFIED.map((item) => (
              <div
                key={item.title}
                style={{
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 14,
                  padding: '18px 20px',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 999,
                      background: 'rgba(0, 198, 193, 0.18)',
                      color: 'var(--v25-accent-text, #A5DCD0)',
                      fontSize: 11,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    &#10003;
                  </span>
                  <span
                    style={{
                      fontFamily:
                        'var(--font-mono, "JetBrains Mono", monospace)',
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--v25-accent-text, #A5DCD0)',
                    }}
                  >
                    Verified
                  </span>
                </div>
                <div
                  style={{
                    fontFamily:
                      'var(--font-inter-tight, "Inter Tight", sans-serif)',
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#ffffff',
                    marginBottom: 6,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.5,
                  }}
                >
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className="v25-cta-section" id="demo">
        <div className="v25-cta-wrap v25-reveal">
          <div className="v25-cta-bg" aria-hidden="true" />
          <img
            src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png"
            alt="Strategia"
            className="v25-cta-logo"
          />
          <h2 className="v25-h2">
            Six signals, one score.{' '}
            <span className="accent accent--teal">
              Every hire defensible.
            </span>
          </h2>
          <p className="v25-desc">
            See the Intelligence Engine run against your live requisitions.
            Thirty minutes, your data, no slides.
          </p>
          <div className="v25-cta-actions">
            <a href="/vx#demo" className="v25-btn-primary">
              Book a demo
            </a>
            <a href="/vx/process" className="v25-link-arrow">
              Talk to us<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      <VxFooter />
    </div>
  )
}
