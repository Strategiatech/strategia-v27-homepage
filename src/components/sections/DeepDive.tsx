'use client'

import { useState } from 'react'

/* ── Shared check icon for bullets ── */
const Check = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M6 10l3 3 5-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/* ── Tab screen mockups ── */

function FinancialScreen() {
  return (
    <div className="tab-screen">
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--graphite-100)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-monospace)',
            fontSize: 12,
            letterSpacing: '0.04em',
            color: 'var(--graphite-500)',
            textTransform: 'uppercase',
          }}
        >
          Financial Services · Integrity Scoring
        </span>
        <span
          style={{
            background: 'rgba(16,185,129,0.12)',
            color: 'var(--signal)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            padding: '3px 10px',
            borderRadius: 'var(--r-pill)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--signal)',
              animation: 'pulseDot 2s infinite',
            }}
          />
          LIVE
        </span>
      </div>

      <div style={{ padding: '20px 20px 0', display: 'flex', gap: 12 }}>
        <div style={{ flex: 1, background: 'var(--mist)', borderRadius: 'var(--r-sm)', padding: '16px 18px' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--graphite-400)', fontFamily: 'var(--font-monospace)', marginBottom: 6 }}>
            Compliance-Ready Candidates
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.02em' }}>
            94.2<span style={{ fontSize: 16, color: 'var(--navy)' }}>%</span>
          </div>
        </div>
        <div style={{ flex: 1, background: 'var(--mist)', borderRadius: 'var(--r-sm)', padding: '16px 18px' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--graphite-400)', fontFamily: 'var(--font-monospace)', marginBottom: 6 }}>
            Risk Flag Rate
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.02em' }}>
            3.1<span style={{ fontSize: 16, color: 'var(--navy)' }}>%</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ background: 'rgba(252,240,153,0.08)', border: '1px solid var(--lemon)', borderRadius: 'var(--r-sm)', padding: '14px 16px', fontSize: 13, color: 'var(--graphite-700)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--navy)' }}>Use case:</strong> Screen for conscientiousness and integrity markers in risk-sensitive compliance and trading roles.
        </div>
      </div>
    </div>
  )
}

function HealthcareScreen() {
  const rows = [
    { name: 'J. Okafor', role: 'RN', score: 0.82, level: 'HIGH', color: 'var(--signal)', pct: 82 },
    { name: 'M. Chen', role: 'Physician', score: 0.76, level: 'HIGH', color: 'var(--signal)', pct: 76 },
    { name: 'R. Patel', role: 'CNA', score: 0.58, level: 'MED', color: 'var(--amber)', pct: 58 },
    { name: 'A. Ruiz', role: 'RT', score: 0.44, level: 'LOW', color: 'var(--graphite-300)', pct: 44 },
  ]
  return (
    <div className="tab-screen">
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--graphite-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 12, letterSpacing: '0.04em', color: 'var(--graphite-500)', textTransform: 'uppercase' }}>
          Healthcare · Empathy + Resilience
        </span>
        <span style={{ fontSize: 13, color: 'var(--graphite-400)' }}>18 candidates assessed</span>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map((r) => (
          <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--mist)', borderRadius: 'var(--r-sm)', padding: '12px 14px' }}>
            <div style={{ flex: '0 0 90px', fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{r.name}</div>
            <div style={{ flex: '0 0 60px', fontSize: 11, fontFamily: 'var(--font-monospace)', color: 'var(--graphite-400)' }}>{r.role}</div>
            <div style={{ flex: 1, height: 6, background: 'var(--graphite-100)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${r.pct}%`, background: r.color, borderRadius: 6, transition: 'width 600ms ease' }} />
            </div>
            <div style={{ flex: '0 0 36px', fontSize: 13, fontFamily: 'var(--font-monospace)', fontWeight: 600, color: 'var(--navy)', textAlign: 'right' }}>{r.score}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TechnologyScreen() {
  return (
    <div className="tab-screen">
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--graphite-100)' }}>
        <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 12, letterSpacing: '0.04em', color: 'var(--graphite-500)', textTransform: 'uppercase' }}>
          Technology · System Design Thinking
        </span>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, background: 'var(--mist)', borderRadius: 'var(--r-sm)', padding: '16px 18px' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--graphite-400)', fontFamily: 'var(--font-monospace)', marginBottom: 6 }}>V-Scenario Pass Rate</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.02em' }}>
              67<span style={{ fontSize: 16, color: 'var(--navy)' }}>%</span>
            </div>
          </div>
          <div style={{ flex: 1, background: 'var(--mist)', borderRadius: 'var(--r-sm)', padding: '16px 18px' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--graphite-400)', fontFamily: 'var(--font-monospace)', marginBottom: 6 }}>Avg Time to Complete</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.02em' }}>
              42<span style={{ fontSize: 16, color: 'var(--graphite-400)' }}> min</span>
            </div>
          </div>
        </div>
        <div style={{ background: 'rgba(252,240,153,0.08)', border: '1px solid var(--lemon)', borderRadius: 'var(--r-sm)', padding: '14px 16px', fontSize: 13, color: 'var(--graphite-700)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--navy)' }}>Use case:</strong> Go beyond LeetCode. Test system design thinking, architecture decisions, and collaborative problem-solving in realistic engineering scenarios.
        </div>
      </div>
    </div>
  )
}

function GovernmentScreen() {
  return (
    <div className="tab-screen">
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--graphite-100)' }}>
        <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 12, letterSpacing: '0.04em', color: 'var(--graphite-500)', textTransform: 'uppercase' }}>
          Government · Audit-Ready Compliance
        </span>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { label: 'Audit Trail Coverage', value: '100%', color: 'var(--signal)' },
          { label: 'Bias Score (Lower = Better)', value: '0.04', color: 'var(--signal)' },
          { label: 'Documentation Completeness', value: '99.7%', color: 'var(--signal)' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--mist)', borderRadius: 'var(--r-sm)', padding: '14px 18px' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{item.label}</span>
            <span style={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--font-monospace)', color: item.color }}>{item.value}</span>
          </div>
        ))}
        <div style={{ background: 'rgba(252,240,153,0.08)', border: '1px solid var(--lemon)', borderRadius: 'var(--r-sm)', padding: '14px 16px', fontSize: 13, color: 'var(--graphite-700)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--navy)' }}>Use case:</strong> Fair, transparent, and audit-ready hiring processes that withstand regulatory scrutiny and promote equitable outcomes.
        </div>
      </div>
    </div>
  )
}

/* ── Tab data ── */

const tabs = [
  {
    label: 'Financial Services',
    Screen: FinancialScreen,
    heading: 'Identify high-integrity candidates for risk-sensitive roles.',
    description:
      'Screen for conscientiousness, ethical reasoning, and regulatory awareness across compliance, trading, and advisory positions.',
    bullets: [
      { bold: 'Integrity scoring.', text: ' Psychometric markers that predict ethical decision-making under pressure.' },
      { bold: 'Compliance-ready.', text: ' Full audit trails and documentation for regulatory requirements.' },
      { bold: 'Risk reduction.', text: ' Identify candidates who thrive in high-stakes, high-scrutiny environments.' },
    ],
  },
  {
    label: 'Healthcare & Pharma',
    Screen: HealthcareScreen,
    heading: 'Assess for empathy, resilience, and attention to detail.',
    description:
      'Purpose-built for clinical and pharmaceutical roles where patient outcomes depend on the right people in the right positions.',
    bullets: [
      { bold: 'Empathy profiling.', text: ' Validated measures of compassion, patience, and interpersonal sensitivity.' },
      { bold: 'Resilience scoring.', text: ' Predict burnout risk and long-term retention for high-stress roles.' },
      { bold: 'Credentialing aware.', text: ' Integrates with license and certification verification workflows.' },
    ],
  },
  {
    label: 'Technology & Engineering',
    Screen: TechnologyScreen,
    heading: 'Go beyond LeetCode. Test system design thinking.',
    description:
      'Evaluate engineers and technologists on the skills that actually predict on-the-job performance: architecture thinking, collaborative problem-solving, and adaptability.',
    bullets: [
      { bold: 'Scenario-based.', text: ' Real-world engineering challenges that measure applied reasoning, not memorization.' },
      { bold: 'Team fit.', text: ' Psychometric alignment with existing team dynamics and culture.' },
      { bold: 'Full-stack insight.', text: ' From junior developers to principal engineers and CTOs.' },
    ],
  },
  {
    label: 'Government & Public Sector',
    Screen: GovernmentScreen,
    heading: 'Fair, transparent, and audit-ready hiring processes.',
    description:
      'Meet the highest standards of equity, documentation, and procedural fairness required by public-sector hiring mandates.',
    bullets: [
      { bold: 'Bias mitigation.', text: ' Triangulated scoring that minimizes adverse impact across protected classes.' },
      { bold: 'Full transparency.', text: ' Every decision is explainable, documented, and reviewable.' },
      { bold: 'Regulatory compliance.', text: ' Designed for EEOC, Merit Systems, and civil service frameworks.' },
    ],
  },
]

export default function DeepDive() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="section deepdive" id="solutions">
      <div className="container">
        {/* Header */}
        <div className="eyebrow">
          <span className="eb-dot" />
          Solutions
        </div>
        <h2 className="section-title">Solutions by Industry</h2>
        <p className="section-sub">
          Four verticals, one platform. Strategia adapts its modules and scoring models
          to the specific demands of your sector.
        </p>

        {/* Tab grid */}
        <div className="deepdive-grid">
          {/* Left rail */}
          <div className="tab-rail" role="tablist">
            {tabs.map((t, i) => (
              <button
                key={i}
                className={`tab-item${i === activeTab ? ' active' : ''}`}
                role="tab"
                aria-selected={i === activeTab}
                onClick={() => setActiveTab(i)}
              >
                {t.label}
                <span className="tab-num">0{i + 1}</span>
              </button>
            ))}
          </div>

          {/* Right panels */}
          <div className="tab-panels">
            {tabs.map((_, i) => {
              if (i !== activeTab) return null
              const PanelScreen = tabs[i].Screen
              return (
                <div key={i} className="tab-panel active" role="tabpanel">
                  <div className="tab-content">
                    <PanelScreen />
                    <div className="tab-body">
                      <h3>{tabs[i].heading}</h3>
                      <p>{tabs[i].description}</p>
                      <ul className="tab-bullets">
                        {tabs[i].bullets.map((b, j) => (
                          <li key={j}>
                            <Check />
                            <span>
                              <strong>{b.bold}</strong>
                              {b.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
