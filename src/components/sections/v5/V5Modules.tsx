const modules = [
  {
    code: '01 — V-Parse',
    title: 'High-Precision Matching',
    desc: 'AI-powered CV analysis engine that processes 1000+ resumes per hour into structured, comparable data.',
    tags: ['1000+ CVs/hr', 'Structured output', 'Skills extraction'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12h6M9 16h6M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z" />
        <path d="M13 2v7h7" />
      </svg>
    ),
  },
  {
    code: '02 — V-Psych',
    title: 'Psychometric Profiling',
    desc: 'Big Five personality assessment calibrated against role-specific benchmarks and validated by peer-reviewed research.',
    tags: ['OCEAN model', 'Peer-reviewed', 'Bias-audited'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    code: '03 — V-Interview',
    title: 'Structured Interviews',
    desc: 'AI-powered structured interview engine available 24/7 with consistent scoring and real-time analysis.',
    tags: ['24/7 availability', 'Consistent scoring', 'Structured format'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
      </svg>
    ),
  },
  {
    code: '04 — V-Scenario',
    title: 'Scenario Testing',
    desc: 'Role-specific situational judgement tests that measure applied reasoning and decision-making under pressure.',
    tags: ['Role-specific', 'Applied testing', 'Decision-making'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    code: '05 — V-Onboarding',
    title: '90-Day Playbooks',
    desc: 'Personalised onboarding plans mapped to role taxonomy and manager guides for every successful hire.',
    tags: ['90-day plans', 'Personalised', 'Manager guides'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    code: '06 — V-Insights',
    title: 'Analytics & Dashboards',
    desc: 'Workforce intelligence dashboards covering retention risk, succession planning, and DEI metrics.',
    tags: ['Retention risk', 'Succession', 'DEI dashboards'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
]

export default function V5Modules() {
  return (
    <section className="v5-modules" id="platform">
      <div className="v3-section-label">The Platform</div>
      <h2 className="v3-section-title">
        Six integrated modules. <em>One intelligence source.</em>
      </h2>
      <p className="v3-section-sub">
        Each module works standalone — together they form the intelligence layer
        your workforce strategy has been missing.
      </p>

      <div className="v5-module-grid">
        {modules.map((m) => (
          <div key={m.code} className="v5-module-card">
            <div className="v5-module-head">
              <div className="v5-module-icon">{m.icon}</div>
              <span className="v5-module-code">{m.code}</span>
            </div>
            <h4>{m.title}</h4>
            <p>{m.desc}</p>
            <div className="v5-module-tags">
              {m.tags.map((t) => (
                <span key={t} className="v5-module-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
