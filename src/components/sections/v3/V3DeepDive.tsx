'use client'

import { useState } from 'react'

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

/* ── Tab screen mockups (dark-themed) ── */

function FinancialScreen() {
  return (
    <div className="v3-tab-screen">
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--v3-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 12, letterSpacing: '0.04em', color: 'var(--steel)', textTransform: 'uppercase' as const }}>
          Financial Services · Integrity Scoring
        </span>
        <span style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--signal)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', padding: '3px 10px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--signal)', animation: 'v3-pulse 2s infinite' }} />
          LIVE
        </span>
      </div>
      <div style={{ padding: '20px 20px 0', display: 'flex', gap: 12 }}>
        <div style={{ flex: 1, background: 'rgba(6,41,62,0.4)', padding: '16px 18px' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: 'var(--steel)', fontFamily: 'var(--font-monospace)', marginBottom: 6 }}>Compliance-Ready</div>
          <div style={{ fontSize: 28, fontWeight: 300, color: 'var(--v3-text-bright)', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>94.2<span style={{ fontSize: 16, color: 'var(--lemon)' }}>%</span></div>
        </div>
        <div style={{ flex: 1, background: 'rgba(6,41,62,0.4)', padding: '16px 18px' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: 'var(--steel)', fontFamily: 'var(--font-monospace)', marginBottom: 6 }}>Risk Flag Rate</div>
          <div style={{ fontSize: 28, fontWeight: 300, color: 'var(--v3-text-bright)', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>3.1<span style={{ fontSize: 16, color: 'var(--lemon)' }}>%</span></div>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ background: 'rgba(252,240,153,0.06)', borderLeft: '2px solid var(--lemon)', padding: '14px 16px', fontSize: 13, color: 'var(--steel)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--v3-text-bright)' }}>Use case:</strong> Screen for conscientiousness and integrity markers in risk-sensitive compliance and trading roles.
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
    { name: 'A. Ruiz', role: 'RT', score: 0.44, level: 'LOW', color: 'var(--steel)', pct: 44 },
  ]
  return (
    <div className="v3-tab-screen">
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--v3-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 12, letterSpacing: '0.04em', color: 'var(--steel)', textTransform: 'uppercase' as const }}>Healthcare · Empathy + Resilience</span>
        <span style={{ fontSize: 13, color: 'var(--steel)' }}>18 candidates assessed</span>
      </div>
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
        {rows.map((r) => (
          <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(6,41,62,0.3)', padding: '12px 14px' }}>
            <div style={{ flex: '0 0 90px', fontSize: 13, fontWeight: 500, color: 'var(--v3-text-bright)' }}>{r.name}</div>
            <div style={{ flex: '0 0 60px', fontSize: 11, fontFamily: 'var(--font-monospace)', color: 'var(--steel)' }}>{r.role}</div>
            <div style={{ flex: 1, height: 6, background: 'var(--v3-line-2)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${r.pct}%`, background: r.color, transition: 'width 600ms ease' }} />
            </div>
            <div style={{ flex: '0 0 36px', fontSize: 13, fontFamily: 'var(--font-monospace)', fontWeight: 600, color: 'var(--v3-text-bright)', textAlign: 'right' as const }}>{r.score}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TechnologyScreen() {
  return (
    <div className="v3-tab-screen">
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--v3-line)' }}>
        <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 12, letterSpacing: '0.04em', color: 'var(--steel)', textTransform: 'uppercase' as const }}>Technology · System Design Thinking</span>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, background: 'rgba(6,41,62,0.4)', padding: '16px 18px' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: 'var(--steel)', fontFamily: 'var(--font-monospace)', marginBottom: 6 }}>V-Scenario Pass Rate</div>
            <div style={{ fontSize: 28, fontWeight: 300, color: 'var(--v3-text-bright)', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>67<span style={{ fontSize: 16, color: 'var(--lemon)' }}>%</span></div>
          </div>
          <div style={{ flex: 1, background: 'rgba(6,41,62,0.4)', padding: '16px 18px' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: 'var(--steel)', fontFamily: 'var(--font-monospace)', marginBottom: 6 }}>Avg Time to Complete</div>
            <div style={{ fontSize: 28, fontWeight: 300, color: 'var(--v3-text-bright)', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>42<span style={{ fontSize: 16, color: 'var(--steel)' }}> min</span></div>
          </div>
        </div>
        <div style={{ background: 'rgba(252,240,153,0.06)', borderLeft: '2px solid var(--lemon)', padding: '14px 16px', fontSize: 13, color: 'var(--steel)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--v3-text-bright)' }}>Use case:</strong> Go beyond LeetCode. Test system design thinking, architecture decisions, and collaborative problem-solving in realistic engineering scenarios.
        </div>
      </div>
    </div>
  )
}

function GovernmentScreen() {
  return (
    <div className="v3-tab-screen">
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--v3-line)' }}>
        <span style={{ fontFamily: 'var(--font-monospace)', fontSize: 12, letterSpacing: '0.04em', color: 'var(--steel)', textTransform: 'uppercase' as const }}>Government · Audit-Ready Compliance</span>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
        {[
          { label: 'Audit Trail Coverage', value: '100%', color: 'var(--signal)' },
          { label: 'Bias Score (Lower = Better)', value: '0.04', color: 'var(--signal)' },
          { label: 'Documentation Completeness', value: '99.7%', color: 'var(--signal)' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,41,62,0.3)', padding: '14px 18px' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--v3-text-bright)' }}>{item.label}</span>
            <span style={{ fontSize: 18, fontWeight: 600, fontFamily: 'var(--font-monospace)', color: item.color }}>{item.value}</span>
          </div>
        ))}
        <div style={{ background: 'rgba(252,240,153,0.06)', borderLeft: '2px solid var(--lemon)', padding: '14px 16px', fontSize: 13, color: 'var(--steel)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--v3-text-bright)' }}>Use case:</strong> Fair, transparent, and audit-ready hiring processes that withstand regulatory scrutiny and promote equitable outcomes.
        </div>
      </div>
    </div>
  )
}

const tabs = [
  {
    label: 'Financial Services',
    Screen: FinancialScreen,
    heading: 'Identify high-integrity candidates for risk-sensitive roles.',
    description: 'Screen for conscientiousness, ethical reasoning, and regulatory awareness across compliance, trading, and advisory positions.',
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
    description: 'Purpose-built for clinical and pharmaceutical roles where patient outcomes depend on the right people in the right positions.',
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
    description: 'Evaluate engineers and technologists on the skills that actually predict on-the-job performance: architecture thinking, collaborative problem-solving, and adaptability.',
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
    description: 'Meet the highest standards of equity, documentation, and procedural fairness required by public-sector hiring mandates.',
    bullets: [
      { bold: 'Bias mitigation.', text: ' Triangulated scoring that minimizes adverse impact across protected classes.' },
      { bold: 'Full transparency.', text: ' Every decision is explainable, documented, and reviewable.' },
      { bold: 'Regulatory compliance.', text: ' Designed for EEOC, Merit Systems, and civil service frameworks.' },
    ],
  },
]

export default function V3DeepDive() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="v3-deepdive" id="solutions">
      <div className="v3-section-label">Solutions</div>
      <h2 className="v3-section-title">
        Solutions by Industry
      </h2>
      <p className="v3-section-sub">
        Four verticals, one platform. Strategia adapts its modules and scoring
        models to the specific demands of your sector.
      </p>

      <div className="v3-deepdive-grid">
        <div className="v3-tab-rail" role="tablist">
          {tabs.map((t, i) => (
            <button
              key={i}
              className={`v3-tab-item${i === activeTab ? ' active' : ''}`}
              role="tab"
              aria-selected={i === activeTab}
              onClick={() => setActiveTab(i)}
            >
              {t.label}
              <span className="v3-tab-num">0{i + 1}</span>
            </button>
          ))}
        </div>

        <div>
          {tabs.map((_, i) => {
            if (i !== activeTab) return null
            const PanelScreen = tabs[i].Screen
            return (
              <div key={i} className="v3-tab-panel" role="tabpanel">
                <div className="v3-tab-content">
                  <PanelScreen />
                  <div className="v3-tab-body">
                    <h3>{tabs[i].heading}</h3>
                    <p>{tabs[i].description}</p>
                    <ul className="v3-tab-bullets">
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
    </section>
  )
}
