export default function Pillars() {
  const modules = [
    {
      num: '01',
      code: 'V-Parse',
      title: 'High-Precision Matching',
      desc: 'CV analysis engine that normalizes and ranks over 1,000 resumes per hour. Extracts skills, credentials, and career trajectory into structured data your team can act on instantly.',
      tags: ['1000+ CVs/hr', 'Structured output', 'Skills extraction'],
      link: 'Explore V-Parse',
    },
    {
      num: '02',
      code: 'V-Psych',
      title: 'Validated Assessment',
      desc: 'OCEAN-based psychometric profiling grounded in peer-reviewed I/O psychology. Measures the Big Five personality traits to predict job fit, team dynamics, and long-term retention.',
      tags: ['OCEAN model', 'Peer-reviewed', 'Bias-audited'],
      link: 'Explore V-Psych',
    },
    {
      num: '03',
      code: 'V-Interview',
      title: 'Avatar-Led Screening',
      desc: 'AI-powered structured interviews available 24/7. Consistent, fair, and designed to surface genuine capability\u2014not interview polish.',
      tags: ['24/7 availability', 'Structured format', 'Consistent scoring'],
      link: 'Explore V-Interview',
    },
    {
      num: '04',
      code: 'V-Scenario',
      title: 'Real-World Simulation',
      desc: 'Role-specific scenario testing that evaluates how candidates think, prioritize, and respond under realistic conditions. Goes beyond rote knowledge to measure applied capability.',
      tags: ['Role-specific', 'Applied testing', 'Decision-making'],
      link: 'Explore V-Scenario',
    },
    {
      num: '05',
      code: 'V-Onboarding',
      title: 'Behavioral Foundation',
      desc: 'Generates custom 90-day onboarding playbooks tailored to each hire\u2019s psychometric profile, role requirements, and team composition.',
      tags: ['90-day plans', 'Personalized', 'Manager guides'],
      link: 'Explore V-Onboarding',
    },
    {
      num: '06',
      code: 'V-Insights',
      title: 'Actionable Analytics',
      desc: 'Retention risk scoring, succession planning, and DEI dashboards that give leadership a single source of truth for every workforce decision.',
      tags: ['Retention risk', 'Succession', 'DEI dashboards'],
      link: 'Explore V-Insights',
    },
  ]

  return (
    <section className="section pillars" id="platform">
      <div className="container">
        {/* Header */}
        <div className="pillars-head">
          <div>
            <div className="eyebrow">
              <span className="eb-dot" />
              The platform
            </div>
            <h2 className="section-title">
              The Strategia System&nbsp;&mdash; Six Integrated Modules. One Intelligence&nbsp;Source.
            </h2>
          </div>
          <p className="section-sub">
            Each module works standalone&nbsp;&mdash; together they form the
            intelligence layer your workforce strategy has been missing.
          </p>
        </div>

        {/* Cards */}
        <div className="pillars-grid">
          {modules.map((mod) => (
            <div key={mod.code} className="pillar-card">
              <div className="pillar-num">{mod.num} &mdash; {mod.code}</div>
              <div className="pillar-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                  <line x1="12" y1="22" x2="12" y2="15.5" />
                  <line x1="22" y1="8.5" x2="12" y2="15.5" />
                  <line x1="2" y1="8.5" x2="12" y2="15.5" />
                </svg>
              </div>
              <h3 className="pillar-title">{mod.title}</h3>
              <p className="pillar-desc">{mod.desc}</p>
              <div className="pillar-tags">
                {mod.tags.map((tag) => (
                  <span key={tag} className="pillar-tag">{tag}</span>
                ))}
              </div>
              <a href="#" className="pillar-link">
                {mod.link}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
