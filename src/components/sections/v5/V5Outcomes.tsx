const comparisonData = [
  { metric: 'Time to Shortlist', traditional: '3-4 Weeks', strategia: '< 24 Hours' },
  { metric: 'Weekly Recruiter Time', traditional: '45-60 Hours', strategia: '6-9 Hours' },
  { metric: 'Psychometric Coverage', traditional: '0-10%', strategia: '100%' },
  { metric: 'Bias Exposure', traditional: 'High', strategia: 'Low (Triangulated)' },
  { metric: 'Candidate Insight', traditional: 'Minimal', strategia: 'Predictive, Actionable' },
]

export default function V5Outcomes() {
  return (
    <section className="v5-outcomes" id="outcomes">
      <div className="v3-section-label">Impact</div>
      <h2 className="v3-section-title">
        Strategia vs. Traditional Recruitment.{' '}
        <em>The difference is stark.</em>
      </h2>
      <p className="v3-section-sub">
        Side by side, Strategia replaces guesswork with validated, predictive
        intelligence at every stage of the hiring cycle.
      </p>

      <table className="v5-comparison-table">
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

      {/* Case study */}
      <div className="v5-case-study">
        <div className="v5-case-quote-side">
          <div className="v5-case-quote-mark">&ldquo;</div>
          <p className="v5-case-quote">
            We reduced time-to-shortlist from three weeks to under a day. The
            psychometric layer flagged team-fit issues we would have missed
            entirely. The ROI paid for the platform in the first quarter.
          </p>
          <div className="v5-case-attr">
            <div className="v5-case-avatar">VP</div>
            <div className="v5-case-person">
              <strong>VP of Talent Acquisition</strong>
              <span>Fortune 500 Enterprise Client</span>
            </div>
          </div>
        </div>

        <div className="v5-case-stats-side">
          <div className="v5-case-label">Case Study</div>
          <div className="v5-case-logo">
            <span style={{ color: 'var(--lemon)' }}>&#9670;</span> Enterprise
            Client
          </div>
          <div className="v5-case-stats">
            <div className="v5-case-stat">
              <span className="k">Time-to-shortlist</span>
              <span className="v">&lt; 24 hrs</span>
            </div>
            <div className="v5-case-stat">
              <span className="k">Recruiter time saved</span>
              <span className="v">80%</span>
            </div>
            <div className="v5-case-stat">
              <span className="k">Psychometric coverage</span>
              <span className="v">100%</span>
            </div>
          </div>
          <a href="#" className="v5-case-link">
            Read the case study
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8m0 0L8 4m3 3L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
