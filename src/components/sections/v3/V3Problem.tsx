const problems = [
  {
    num: '01 — The HR Paradox',
    title: 'Largest cost base. Lowest-resourced function.',
    text: 'HR owns the single biggest line on every enterprise P&L, yet runs on intuition, spreadsheets, and twenty-year-old tools that were never built to make decisions.',
  },
  {
    num: '02 — Misaligned Incentives',
    title: 'Measured on process, not outcomes.',
    text: 'Performance is measured on time-to-hire and cost-per-hire — not on the commercial and operational outcomes the business actually cares about.',
  },
  {
    num: '03 — Structural Underinvestment',
    title: 'Treated as cost, not capability.',
    text: "HR isn't seen as revenue-generating, so capability perpetually lags. The function never gets the technology, data science, or talent it needs to be credible at executive level.",
  },
  {
    num: '04 — Decision Inconsistency',
    title: 'Bias compounds at scale.',
    text: 'Every interviewer has a model in their head. At 10,000 hires a year, the variance between them is the single largest source of execution risk in any people-dependent enterprise.',
  },
]

export default function V3Problem() {
  return (
    <section className="v3-section">
      <div className="v3-section-label">The Paradox</div>
      <h2 className="v3-section-title">
        90% of enterprise cost sits in workforce.{' '}
        <em>Yet it has the least science applied.</em>
      </h2>
      <p className="v3-section-sub">
        The largest line item in every P&amp;L runs on intuition, spreadsheets,
        and tools that were never built to make decisions. We built what should
        have been there all along.
      </p>

      <div className="v3-problem-grid">
        {problems.map((p) => (
          <div key={p.num} className="v3-problem-card">
            <span className="v3-problem-num">{p.num}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
