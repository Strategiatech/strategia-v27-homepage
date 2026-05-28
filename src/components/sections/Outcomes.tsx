'use client'

/* ── Arrow icon for link ── */
const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const comparisonData = [
  { metric: 'Time to Shortlist', traditional: '3-4 Weeks', strategia: '< 24 Hours' },
  { metric: 'Weekly Recruiter Time', traditional: '45-60 Hours', strategia: '6-9 Hours' },
  { metric: 'Psychometric Coverage', traditional: '0-10%', strategia: '100%' },
  { metric: 'Bias Exposure', traditional: 'High', strategia: 'Low (Triangulated)' },
  { metric: 'Candidate Insight', traditional: 'Minimal', strategia: 'Predictive, Actionable' },
]

export default function Outcomes() {
  return (
    <section className="section outcomes" id="outcomes">
      <div className="container">
        {/* Header */}
        <div className="eyebrow">
          <span className="eb-dot" />
          Impact
        </div>
        <h2 className="section-title">The Impact at Scale&nbsp;&mdash;&nbsp;Strategia vs. Traditional&nbsp;Recruitment</h2>
        <p className="section-sub">
          Side by side, the difference is stark. Strategia replaces guesswork with
          validated, predictive intelligence at every stage of the hiring cycle.
        </p>

        {/* Comparison table */}
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="metric-col">Metric</th>
              <th className="old-col">Traditional</th>
              <th className="new-col">With Strategia</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row) => (
              <tr key={row.metric}>
                <td className="metric-col">{row.metric}</td>
                <td className="old-col">{row.traditional}</td>
                <td className="new-col">{row.strategia}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Case study (placeholder) */}
        <div className="case-study">
          {/* Quote side */}
          <div>
            <div className="case-quote-mark">&ldquo;</div>
            <p className="case-quote">
              We reduced time-to-shortlist from three weeks to under a day. The psychometric
              layer flagged team-fit issues we would have missed entirely. The ROI paid for
              the platform in the first quarter.
            </p>
            <div className="case-attr">
              <div className="case-avatar">VP</div>
              <div className="case-person">
                <strong>VP of Talent Acquisition</strong>
                <span>Fortune 500 Enterprise Client</span>
              </div>
            </div>
          </div>

          {/* Right stats side */}
          <div className="case-side">
            <div className="case-side-label">Case Study</div>
            <div className="case-side-logo">
              <span style={{ color: 'var(--navy)' }}>&#9670;</span> Enterprise Client
            </div>
            <div className="case-side-stats">
              <div className="case-side-stat">
                <span className="k">Time-to-shortlist</span>
                <span className="v">&lt; 24 hrs</span>
              </div>
              <div className="case-side-stat">
                <span className="k">Recruiter time saved</span>
                <span className="v">80%</span>
              </div>
              <div className="case-side-stat">
                <span className="k">Psychometric coverage</span>
                <span className="v">100%</span>
              </div>
            </div>
            <a href="#" className="case-side-link">
              Read the case study <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
