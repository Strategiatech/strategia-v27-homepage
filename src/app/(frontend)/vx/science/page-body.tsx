'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import VxNav from '@/components/vx/VxNav'
import VxFooter from '@/components/vx/VxFooter'

/* eslint-disable @next/next/no-img-element */

// =====================================================================
// OCEAN trait reference (compact). The full trait deep-dive lives here
// rather than on the V25 homepage so /vx/science can anchor `#ocean`
// without re-running the basic explainer the homepage already gives.
// =====================================================================
type Trait = {
  letter: 'O' | 'C' | 'E' | 'A' | 'N'
  name: string
  // Compact one-liner: this page is not the place to re-teach the Big Five.
  short: string
  // Sample t-scores for the two-candidate radar. Illustrative.
  candidateA: number
  candidateB: number
}

const TRAITS: Trait[] = [
  { letter: 'O', name: 'Openness', short: 'Curiosity and adaptability under changing protocols.', candidateA: 65, candidateB: 85 },
  { letter: 'C', name: 'Conscientiousness', short: 'Discipline and reliability. The single strongest non-cognitive predictor of job performance.', candidateA: 58, candidateB: 90 },
  { letter: 'E', name: 'Extraversion', short: 'Energy and assertiveness, calibrated to role context.', candidateA: 80, candidateB: 65 },
  { letter: 'A', name: 'Agreeableness', short: 'Empathy and team orientation. Critical for multidisciplinary acute care.', candidateA: 72, candidateB: 75 },
  { letter: 'N', name: 'Neuroticism', short: 'Emotional stability under load. Inverse scored, so lower is more resilient.', candidateA: 45, candidateB: 30 },
]

// =====================================================================
// Radar geometry: five axes at 72-degree intervals, starting at the top
// (Openness) and proceeding clockwise (C, E, A, N).
// =====================================================================
const RADAR = {
  cx: 200,
  cy: 200,
  rMax: 150,
}

function polar(value: number, axisIndex: number) {
  const angle = -Math.PI / 2 + (axisIndex * 2 * Math.PI) / 5
  const r = (value / 100) * RADAR.rMax
  return {
    x: RADAR.cx + r * Math.cos(angle),
    y: RADAR.cy + r * Math.sin(angle),
  }
}

function polygonPoints(values: number[]) {
  return values
    .map((v, i) => {
      const p = polar(v, i)
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
    })
    .join(' ')
}

// =====================================================================
// MBTI / DISC / Big Five comparison. Sources annotated in the cell
// text where space allows; the section copy carries the meta-analytic
// citations in prose.
// =====================================================================
type ComparisonRow = {
  axis: string
  bigFive: string
  mbti: string
  disc: string
}

const COMPARISON: ComparisonRow[] = [
  {
    axis: 'Structure',
    bigFive: 'Five dimensional continua. No typology.',
    mbti: 'Four binary axes producing 16 types.',
    disc: 'Four behavioural quadrants.',
  },
  {
    axis: 'Test-retest reliability',
    bigFive: 'r above 0.80 across most modern Big Five inventories.',
    mbti: 'Roughly half of test-takers receive a different type on retest within five weeks (Pittenger, 1993).',
    disc: 'No peer-reviewed reliability data of comparable quality.',
  },
  {
    axis: 'Predicts job performance',
    bigFive: 'Conscientiousness corrects-for-range-restriction r approx 0.22, the strongest non-cognitive predictor (Sackett et al., 2022).',
    mbti: 'No significant relationship to performance (Hunsley et al., 2003; APA reviews).',
    disc: 'Not validated for selection use by the publisher.',
  },
  {
    axis: 'Cross-cultural replication',
    bigFive: 'Five-factor structure replicates across more than 50 languages and cultures (McCrae and Costa).',
    mbti: 'Type distributions do not replicate consistently across populations.',
    disc: 'Designed as a behavioural model, not a cross-cultural personality framework.',
  },
  {
    axis: 'Defensibility under EEOC scrutiny',
    bigFive: 'Used in EEOC-compliant selection with documented validity evidence.',
    mbti: 'Publisher (CPP) explicitly states MBTI is not appropriate for selection.',
    disc: 'No EEOC-aligned validity portfolio.',
  },
]

// =====================================================================
// Predictive validity studies. The cohort sizes, coefficients, and
// methodology notes here are illustrative placeholders styled in the
// V25 stat-card pattern. Replace with real study results before any
// client-facing release; nothing here is a published finding.
// =====================================================================
type ValidityStudy = {
  cohort: string
  n: string
  metric: string
  value: string
  unit: string
  outcome: string
  method: string
}

const VALIDITY_STUDIES: ValidityStudy[] = [
  {
    cohort: 'ICU and step-down nurses',
    n: 'n = 4,812',
    metric: 'r',
    value: '0.74',
    unit: '',
    outcome: 'Strategia composite vs. 12-month voluntary retention.',
    method: 'Concurrent-criterion design, three health systems, 2024 to 2025. Corrected for range restriction.',
  },
  {
    cohort: 'Emergency department physicians',
    n: 'n = 1,206',
    metric: 'r',
    value: '0.61',
    unit: '',
    outcome: 'Composite vs. supervisor-rated clinical judgement, year one.',
    method: 'Predictive design, blinded ratings, single integrated delivery network.',
  },
  {
    cohort: 'Allied health (RT, PT, OT)',
    n: 'n = 2,930',
    metric: 'r',
    value: '0.58',
    unit: '',
    outcome: 'Composite vs. 24-month performance composite.',
    method: 'Concurrent design, four academic medical centres, 2023 cohort.',
  },
  {
    cohort: 'Healthcare administrative leaders',
    n: 'n = 884',
    metric: 'r',
    value: '0.53',
    unit: '',
    outcome: 'Composite vs. promotion within 18 months.',
    method: 'Predictive design, multi-system, follow-up via HRIS audit trail.',
  },
]

// =====================================================================
// IRT (Item Response Theory) talking points. Each becomes a phase card.
// =====================================================================
type IrtPoint = {
  num: '01' | '02' | '03' | '04'
  title: string
  body: string
}

const IRT_POINTS: IrtPoint[] = [
  {
    num: '01',
    title: 'Calibrated item bank',
    body: 'Every question carries a difficulty and discrimination parameter, estimated from more than 100,000 healthcare-cohort responses. Items the bank cannot place are retired.',
  },
  {
    num: '02',
    title: 'Adaptive routing',
    body: 'After each response, the engine selects the next item that will most reduce uncertainty about the candidate’s trait estimate. Easy items are skipped for high responders; nuance items are surfaced where they discriminate.',
  },
  {
    num: '03',
    title: 'Standard-error stopping',
    body: 'The assessment ends when the standard error on every trait drops below 0.30. Most candidates finish in 5 to 7 minutes. Fixed-form Likert tests take 20 to 30 minutes to reach the same precision.',
  },
  {
    num: '04',
    title: 'Equated across versions',
    body: 'Item-level equating means a score from today’s test can be compared with a score from last quarter’s test on the same metric scale. No drift, no version anxiety.',
  },
]

// =====================================================================
// Bias mitigation technical claims.
// =====================================================================
type BiasControl = {
  title: string
  body: string
  technique: string
}

const BIAS_CONTROLS: BiasControl[] = [
  {
    title: 'Adversarial debiasing in training',
    body: 'A second model attempts to predict protected attributes from the scoring model’s intermediate representations. The scoring model is penalised whenever the adversary succeeds, forcing it to find signal that is predictive of performance but not of demography.',
    technique: 'Zhang, Lemoine and Mitchell (2018), adapted for ordinal psychometric outputs.',
  },
  {
    title: 'PII redaction before inference',
    body: 'Names, photos, school names, addresses, and any text that resolves to a demographic proxy are stripped before any model sees the input. Redaction is logged per requisition.',
    technique: 'Microsoft Presidio pipelines plus an in-house healthcare-specific named-entity model.',
  },
  {
    title: 'Demographic parity testing',
    body: 'Every model release ships with a fairness report covering selection ratios by sex, race, age band, and disability status. The 4/5ths rule is enforced at requisition level; alerts fire in V-Insights when a slice drops below the threshold.',
    technique: 'Aequitas auditing toolkit, integrated into the release gate.',
  },
  {
    title: 'Counterfactual stability checks',
    body: 'For each candidate, we generate a small set of identity-flipped counterfactuals and confirm that the score moves less than 0.05 standard deviations. Larger movements block the score from rendering until reviewed.',
    technique: 'In-house counterfactual generator, audited by Holistic AI.',
  },
]

export default function VxScienceBody() {
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

  const candidateA = TRAITS.map((t) => t.candidateA)
  const candidateB = TRAITS.map((t) => t.candidateB)
  const axisLabels = TRAITS.map((t) => t.name)

  return (
    <div className="v25 v25--complete">
      <VxNav />

      {/* HERO */}
      <section className="v25-section" style={{ paddingTop: 'clamp(140px, 18vw, 220px)' }}>
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">The Science &middot; Validated psychometrics</div>
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
            Validated psychometric rigour.{' '}
            <span className="accent accent--sky">Not pattern matching.</span>
          </h1>
          <p className="v25-desc" style={{ maxWidth: '60ch', fontSize: '1.15rem' }}>
            Strategia is built on Item Response Theory, peer-reviewed Big Five inventories,
            and adversarial debiasing. Every score has a published methodology, a healthcare
            norm sample, and an audit packet. This page is the long version, written for
            psychologists, data scientists, and the General Counsel who signs off on selection.
          </p>
          <div className="v25-hero-actions" style={{ marginTop: 32 }}>
            <a href="#why-ocean" className="v25-btn-primary">
              Read the methodology
            </a>
            <a href="#validity" className="v25-link-arrow">
              Jump to validity studies<span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* WHY OCEAN BEATS MBTI / DISC */}
      <section className="v25-section v25-section--light" id="why-ocean">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Why Big Five &middot; Not MBTI or DISC</div>
              <h2 className="v25-h2">
                Dimensional, replicable,{' '}
                <span className="accent accent--teal">defensible</span>.
              </h2>
              <p className="v25-desc" style={{ marginTop: 16, maxWidth: '64ch' }}>
                Type-based instruments sort people into boxes that do not predict on-the-job
                performance. The Big Five is dimensional, cross-culturally stable, and backed
                by sixty years of replication. Sackett, Zhang, Kuncel and Shewach (2022) place
                conscientiousness at a corrected r of approximately 0.22 with job performance,
                the strongest non-cognitive predictor across role families.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: 24,
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid rgba(1, 34, 54, 0.10)',
              background: '#FFFFFF',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1.4fr 1.2fr 1.1fr',
                gap: 1,
                background: 'rgba(1, 34, 54, 0.10)',
              }}
            >
              {/* Header row */}
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '18px 20px',
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(1, 34, 54, 0.70)',
                }}
              >
                Dimension
              </div>
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '18px 20px',
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#006D6A',
                }}
              >
                Big Five &middot; Strategia
              </div>
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '18px 20px',
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(1, 34, 54, 0.70)',
                }}
              >
                MBTI
              </div>
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '18px 20px',
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(1, 34, 54, 0.70)',
                }}
              >
                DISC
              </div>

              {/* Body rows */}
              {COMPARISON.map((row) => (
                <div key={row.axis} style={{ display: 'contents' }}>
                  <div
                    style={{
                      background: '#FFFFFF',
                      padding: '20px',
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--v25-abyss)',
                    }}
                  >
                    {row.axis}
                  </div>
                  <div
                    style={{
                      background: '#FFFFFF',
                      padding: '20px',
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: 'rgba(1, 34, 54, 0.78)',
                      borderLeft: '2px solid #006D6A',
                    }}
                  >
                    {row.bigFive}
                  </div>
                  <div
                    style={{
                      background: '#FFFFFF',
                      padding: '20px',
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: 'rgba(1, 34, 54, 0.65)',
                    }}
                  >
                    {row.mbti}
                  </div>
                  <div
                    style={{
                      background: '#FFFFFF',
                      padding: '20px',
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: 'rgba(1, 34, 54, 0.65)',
                    }}
                  >
                    {row.disc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p
            style={{
              marginTop: 20,
              fontSize: 12,
              color: 'rgba(1, 34, 54, 0.55)',
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Citations: Sackett, Zhang, Kuncel and Shewach (2022). Pittenger (1993).
            Hunsley, Lee and Wood (2003). McCrae and Costa, multi-decade replication series.
          </p>
        </div>
      </section>

      {/* ADAPTIVE TESTING (IRT) */}
      <section className="v25-section" id="irt">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Adaptive testing &middot; Item Response Theory</div>
          <h2 className="v25-h2">
            5 to 7 minutes.{' '}
            <span className="accent accent--sky">Same precision as a 30-minute Likert.</span>
          </h2>
          <p className="v25-desc" style={{ maxWidth: '62ch', marginTop: 16 }}>
            V-Psych is computer adaptive. Item Response Theory models each question by its
            difficulty and how well it discriminates between trait levels. The engine picks
            the next question to maximise information about the candidate, then stops as soon
            as every trait estimate is precise enough. Less candidate fatigue, less guessing,
            tighter standard errors.
          </p>

          <div className="v25-modules-grid" style={{ marginTop: 40 }}>
            {IRT_POINTS.map((p) => (
              <div key={p.num} className="v25-module">
                <div className="v25-module-header">
                  <span className="v25-module-num">{p.num}</span>
                  <span className="v25-module-tag">IRT</span>
                </div>
                <div className="v25-module-title">{p.title}</div>
                <p className="v25-module-desc">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREDICTIVE VALIDITY STUDIES */}
      <section className="v25-section v25-section--light" id="validity">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Predictive validity &middot; Healthcare cohorts</div>
              <h2 className="v25-h2">
                The numbers we publish,{' '}
                <span className="accent accent--teal">on the populations we serve</span>.
              </h2>
              <p className="v25-desc" style={{ marginTop: 16, maxWidth: '62ch' }}>
                Generic norms understate the signal. Every Strategia model is criterion-validated
                on the cohort it will score, then re-validated quarterly. Coefficients below are
                corrected for range restriction per Schmidt and Hunter (2015).
              </p>
            </div>
            <div className="v25-hero-actions">
              <Link href="/vx/contact" className="v25-btn-solid">
                Request the methodology brief
              </Link>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 1,
              background: 'rgba(1, 34, 54, 0.10)',
              border: '1px solid rgba(1, 34, 54, 0.10)',
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            {VALIDITY_STUDIES.map((s) => (
              <div
                key={s.cohort}
                style={{
                  background: '#FFFFFF',
                  padding: 'clamp(24px, 3vw, 32px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display, "Literata", Georgia, serif)',
                      fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                      lineHeight: 1,
                      color: '#006D6A',
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {s.metric}={s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'rgba(1, 34, 54, 0.60)',
                    }}
                  >
                    Study
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'var(--v25-abyss)',
                    lineHeight: 1.35,
                  }}
                >
                  {s.cohort}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(1, 34, 54, 0.65)',
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'rgba(1, 34, 54, 0.78)',
                    lineHeight: 1.55,
                  }}
                >
                  {s.outcome}
                </div>
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 12,
                    borderTop: '1px solid rgba(1, 34, 54, 0.10)',
                    fontSize: 12,
                    color: 'rgba(1, 34, 54, 0.60)',
                    lineHeight: 1.5,
                  }}
                >
                  {s.method}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: 20,
              fontSize: 12,
              color: 'rgba(1, 34, 54, 0.55)',
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Method: Concurrent and predictive criterion designs. Disattenuated and
            range-restriction corrected. Full reports under MNDA.
          </p>
        </div>
      </section>

      {/* OCEAN REFERENCE (compact: small radar + one-line trait reference) */}
      <section className="v25-section" id="ocean">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">OCEAN reference &middot; The five factors</div>
          <h2 className="v25-h2">
            The trait scaffold,{' '}
            <span className="accent accent--lime">one screen at a glance</span>.
          </h2>
          <p className="v25-desc" style={{ maxWidth: '62ch', marginTop: 16 }}>
            The platform reports against the five-factor model. Each trait carries a T-score
            against a role-specific norm sample, not a generic adult norm. Two ICU Nurse
            Specialist candidates, same five axes, very different recommendation.
          </p>

          <div
            style={{
              marginTop: 40,
              display: 'grid',
              gridTemplateColumns: 'minmax(240px, 320px) minmax(260px, 1fr)',
              gap: 'clamp(24px, 4vw, 48px)',
              alignItems: 'center',
              border: '1px solid rgba(255, 255, 255, 0.10)',
              borderRadius: 24,
              background: 'rgba(255, 255, 255, 0.04)',
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            <div style={{ width: '100%', maxWidth: 320, margin: '0 auto' }}>
              <svg
                viewBox="0 0 400 400"
                role="img"
                aria-label="OCEAN radar chart comparing Candidate A and Candidate B across five personality factors"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              >
                {/* Concentric guide rings at 25 / 50 / 75 / 100 */}
                {[0.25, 0.5, 0.75, 1].map((ratio) => {
                  const pts = TRAITS.map((_, i) => {
                    const p = polar(ratio * 100, i)
                    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
                  }).join(' ')
                  return (
                    <polygon
                      key={ratio}
                      points={pts}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.10)"
                      strokeWidth={1}
                    />
                  )
                })}

                {/* Spokes */}
                {TRAITS.map((_, i) => {
                  const p = polar(100, i)
                  return (
                    <line
                      key={i}
                      x1={RADAR.cx}
                      y1={RADAR.cy}
                      x2={p.x}
                      y2={p.y}
                      stroke="rgba(255, 255, 255, 0.12)"
                      strokeWidth={1}
                    />
                  )
                })}

                {/* Candidate A (sky) */}
                <polygon
                  points={polygonPoints(candidateA)}
                  fill="rgba(92, 200, 232, 0.18)"
                  stroke="#5CC8E8"
                  strokeWidth={1.8}
                  strokeLinejoin="round"
                />
                {/* Candidate B (teal) */}
                <polygon
                  points={polygonPoints(candidateB)}
                  fill="rgba(0, 198, 193, 0.20)"
                  stroke="#00C6C1"
                  strokeWidth={1.8}
                  strokeLinejoin="round"
                />

                {candidateA.map((v, i) => {
                  const p = polar(v, i)
                  return (
                    <circle key={`a-${i}`} cx={p.x} cy={p.y} r={3.5} fill="#5CC8E8" />
                  )
                })}
                {candidateB.map((v, i) => {
                  const p = polar(v, i)
                  return (
                    <circle key={`b-${i}`} cx={p.x} cy={p.y} r={3.5} fill="#00C6C1" />
                  )
                })}

                {/* Axis labels */}
                {axisLabels.map((label, i) => {
                  const p = polar(115, i)
                  let anchor: 'start' | 'middle' | 'end' = 'middle'
                  if (p.x > RADAR.cx + 4) anchor = 'start'
                  else if (p.x < RADAR.cx - 4) anchor = 'end'
                  return (
                    <text
                      key={label}
                      x={p.x}
                      y={p.y}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      fontFamily="var(--font-mono, 'JetBrains Mono', monospace)"
                      fontSize={11}
                      fontWeight={600}
                      letterSpacing="0.12em"
                      fill="rgba(255, 255, 255, 0.75)"
                      style={{ textTransform: 'uppercase' }}
                    >
                      {label}
                    </text>
                  )
                })}
              </svg>

              {/* Legend below the radar */}
              <div
                style={{
                  marginTop: 16,
                  display: 'flex',
                  gap: 18,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  fontSize: 12,
                  color: 'rgba(255, 255, 255, 0.75)',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                      border: '1.8px solid #5CC8E8',
                      background: 'rgba(92, 200, 232, 0.18)',
                    }}
                  />
                  Candidate A
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                      border: '1.8px solid #00C6C1',
                      background: 'rgba(0, 198, 193, 0.20)',
                    }}
                  />
                  Candidate B
                </span>
              </div>
            </div>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              {TRAITS.map((t) => (
                <li
                  key={t.letter}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '36px 1fr',
                    gap: 14,
                    alignItems: 'baseline',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: 'var(--font-display, "Literata", Georgia, serif)',
                      fontSize: 26,
                      lineHeight: 1,
                      color: 'var(--v25-accent-text, #A5DCD0)',
                    }}
                  >
                    {t.letter}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-tight, "Inter Tight", sans-serif)',
                        fontSize: 15,
                        fontWeight: 600,
                        color: '#FFFFFF',
                        marginBottom: 2,
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: 'rgba(255, 255, 255, 0.72)',
                      }}
                    >
                      {t.short}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BIAS MITIGATION */}
      <section className="v25-section" id="bias">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-section-header">
            <div>
              <div className="v25-eyebrow">Bias mitigation &middot; Adversarial debiasing</div>
              <h2 className="v25-h2">
                Fair by construction.{' '}
                <span className="accent accent--lime">Audited every release</span>.
              </h2>
              <p className="v25-desc" style={{ marginTop: 16, maxWidth: '62ch' }}>
                Four controls operate at different stages of the pipeline. Together they keep
                the predictive signal high while suppressing demographic proxies. Every control
                ships with a release-gate test that must pass before a model goes to production.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {BIAS_CONTROLS.map((b) => (
              <div
                key={b.title}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  borderRadius: 20,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-tight, "Inter Tight", sans-serif)',
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#FFFFFF',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {b.title}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.72)',
                    margin: 0,
                  }}
                >
                  {b.body}
                </p>
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 14,
                    borderTop: '1px solid rgba(255, 255, 255, 0.10)',
                    fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--v25-accent-text, #A5DCD0)',
                  }}
                >
                  {b.technique}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEFENSIBILITY (concise, not a security/compliance dump) */}
      <section className="v25-section" id="defensibility">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Defensibility &middot; EEOC and audit</div>
          <h2 className="v25-h2">
            Reads like research.{' '}
            <span className="accent accent--teal">Stands up in court</span>.
          </h2>
          <p className="v25-desc" style={{ maxWidth: '62ch', marginTop: 16 }}>
            The Uniform Guidelines on Employee Selection Procedures require validity evidence,
            adverse-impact monitoring, and documentation. Strategia delivers all three by
            default, on every requisition. Full security and compliance posture lives on the{' '}
            <Link href="/vx/institutional" className="v25-link-arrow" style={{ display: 'inline' }}>
              institutional page
            </Link>
            ; this is the science-specific cut.
          </p>

          <div className="v25-science-grid" style={{ marginTop: 40 }}>
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">29 CFR 1607</span>
                <span className="evidence">Compliance</span>
              </div>
              <div className="label">Uniform Guidelines alignment</div>
              <div className="sub">
                Criterion-validity evidence and 4/5ths-rule monitoring per requisition.
              </div>
            </div>
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">7 yr</span>
                <span className="evidence">Retention</span>
              </div>
              <div className="label">Audit packet per candidate</div>
              <div className="sub">
                Feature-level evidence, model version, fairness slice, and reviewer notes.
              </div>
            </div>
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">ISO 10667</span>
                <span className="evidence">Standards</span>
              </div>
              <div className="label">Assessment service delivery</div>
              <div className="sub">
                Annual conformance review against ISO 10667 and ISO 30405.
              </div>
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
            Read the science on your{' '}
            <span className="accent accent--teal">own roles</span>.
          </h2>
          <p className="v25-desc">
            Thirty minutes. Your data. We bring the methodology brief and the model card,
            and walk through the validity numbers on a cohort you recognise.
          </p>
          <div className="v25-cta-actions">
            <Link href="/vx/contact" className="v25-btn-primary">
              Book a demo
            </Link>
            <Link href="/vx/process" className="v25-link-arrow">
              See the process<span aria-hidden="true"> ↗</span>
            </Link>
          </div>
        </div>
      </section>

      <VxFooter />
    </div>
  )
}
