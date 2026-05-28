export default function Insights() {
  return (
    <section className="section insights-section" id="insights">
      <div className="container">
        <div className="insights-head">
          <div>
            <span className="eyebrow">
              <span className="eb-dot" />
              Insights
            </span>
            <h2 className="section-title">Research &amp; points of view.</h2>
          </div>
          <a href="#" className="btn btn-secondary btn-sm">View all</a>
        </div>

        <div className="insights-grid">
          {/* Card 1 — Report */}
          <article className="insight-card">
            <div className="insight-cover cover-chart-1">
              <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
                <defs>
                  <linearGradient id="lc-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(252,240,153,0.35)" />
                    <stop offset="100%" stopColor="rgba(252,240,153,0)" />
                  </linearGradient>
                </defs>
                <path d="M10 80 L40 60 L70 65 L100 40 L130 45 L160 20 L190 25 L190 90 L10 90Z" fill="url(#lc-fill)" />
                <polyline points="10,80 40,60 70,65 100,40 130,45 160,20 190,25" stroke="var(--lemon-600)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="190" cy="25" r="4" fill="var(--lemon-600)">
                  <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
            <div className="insight-body">
              <div className="insight-meta">
                <span className="insight-tag">Report</span>
                8 min read
              </div>
              <h3 className="insight-title">
                The 2026 Healthcare Workforce Index: three shifts reshaping clinical hiring.
              </h3>
              <span className="insight-read">
                Read report
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8m0 0L8 4m3 3L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </article>

          {/* Card 2 — Article */}
          <article className="insight-card">
            <div className="insight-cover cover-chart-2">
              <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
                <rect x="20" y="50" width="20" height="40" rx="3" fill="var(--navy)" opacity=".7" />
                <rect x="50" y="30" width="20" height="60" rx="3" fill="var(--lemon-600)" opacity=".85" />
                <rect x="80" y="45" width="20" height="45" rx="3" fill="var(--navy)" opacity=".7" />
                <rect x="110" y="20" width="20" height="70" rx="3" fill="var(--lemon-600)" opacity=".85" />
                <rect x="140" y="35" width="20" height="55" rx="3" fill="var(--navy)" opacity=".7" />
                <rect x="170" y="15" width="20" height="75" rx="3" fill="var(--lemon-600)" opacity=".85" />
              </svg>
            </div>
            <div className="insight-body">
              <div className="insight-meta">
                <span className="insight-tag">Article</span>
                6 min read
              </div>
              <h3 className="insight-title">
                Why &ldquo;burnout&rdquo; is the wrong diagnosis &mdash; and what the data actually says.
              </h3>
              <span className="insight-read">
                Read article
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8m0 0L8 4m3 3L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </article>

          {/* Card 3 — Webinar */}
          <article className="insight-card">
            <div className="insight-cover cover-chart-3">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="44" stroke="var(--lemon-600)" strokeWidth="8" strokeDasharray="207 69" strokeLinecap="round" />
                <circle cx="60" cy="60" r="32" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
                <circle cx="60" cy="60" r="32" stroke="var(--lemon)" strokeWidth="6" strokeDasharray="150 51" strokeLinecap="round" />
                <text x="60" y="65" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="600" fontFamily="var(--font-display)">67%</text>
              </svg>
            </div>
            <div className="insight-body">
              <div className="insight-meta">
                <span className="insight-tag">Webinar</span>
                45 min
              </div>
              <h3 className="insight-title">
                Live: Building a predictive retention program from scratch in 90 days.
              </h3>
              <span className="insight-read">
                Register
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8m0 0L8 4m3 3L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
