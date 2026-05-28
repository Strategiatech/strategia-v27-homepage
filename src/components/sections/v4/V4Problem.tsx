export default function V4Problem() {
  return (
    <section className="v4-section">
      <div className="v4-section-label v4-reveal" data-delay="1">The Paradox</div>
      <h2 className="v4-section-title v4-reveal" data-delay="2">
        90% of enterprise cost sits in workforce.{' '}
        <em>Yet it has the least science applied.</em>
      </h2>
      <p className="v4-section-sub v4-reveal" data-delay="3">
        The largest line item in every P&amp;L runs on intuition, spreadsheets, and tools that were never built to make decisions. We built what should have been there all along.
      </p>

      <div className="v4-problem-grid v4-reveal" data-delay="4">
        <div className="v4-problem-card">
          <span className="v4-problem-num">01 — The HR Paradox</span>
          <h3>Largest cost base. Lowest-resourced function.</h3>
          <p>HR owns the single biggest line on every enterprise P&amp;L, yet runs on intuition, spreadsheets, and twenty-year-old tools that were never built to make decisions.</p>
        </div>
        <div className="v4-problem-card">
          <span className="v4-problem-num">02 — Misaligned Incentives</span>
          <h3>Measured on process, not outcomes.</h3>
          <p>Performance is measured on time-to-hire and cost-per-hire — not on the commercial and operational outcomes the business actually cares about.</p>
        </div>
        <div className="v4-problem-card">
          <span className="v4-problem-num">03 — Structural Underinvestment</span>
          <h3>Treated as cost, not capability.</h3>
          <p>HR isn&apos;t seen as revenue-generating, so capability perpetually lags. The function never gets the technology, data science, or talent it needs to be credible at executive level.</p>
        </div>
        <div className="v4-problem-card">
          <span className="v4-problem-num">04 — Decision Inconsistency</span>
          <h3>Bias compounds at scale.</h3>
          <p>Every interviewer has a model in their head. At 10,000 hires a year, the variance between them is the single largest source of execution risk in any people-dependent enterprise.</p>
        </div>
      </div>
    </section>
  )
}
