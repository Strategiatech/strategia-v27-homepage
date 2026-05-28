export default function Enterprise() {
  return (
    <section className="section enterprise-section" id="enterprise">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
          <span className="eyebrow">
            <span className="eb-dot" />
            Enterprise
          </span>
          <h2 className="section-title" style={{ margin: '0 auto 16px', maxWidth: '28ch' }}>
            Enterprise Infrastructure. Zero&nbsp;Compromise.
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Built for organisations that demand the highest standards of data sovereignty,
            implementation support, and regulatory compliance.
          </p>
        </div>

        <div className="enterprise-grid">
          {/* Data Sovereignty */}
          <div className="enterprise-card">
            <div className="pillar-icon" style={{ marginBottom: 20 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l7 3v5c0 4.5-3 8.25-7 9.5C8 18.25 5 14.5 5 10V5l7-3z" />
                <path d="M9 12l2 2 4-4.5" />
              </svg>
            </div>
            <h3>Data Sovereignty</h3>
            <p>
              Your data stays where you need it. Azure-hosted with regional deployment
              options, encryption at rest and in transit, and zero sub-processor sharing.
              You own your data&nbsp;&mdash;&nbsp;always.
            </p>
          </div>

          {/* White-Glove Implementation */}
          <div className="enterprise-card">
            <div className="pillar-icon" style={{ marginBottom: 20 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="3" />
                <path d="M9 12l2 2 4-4.5" />
              </svg>
            </div>
            <h3>White-Glove Implementation</h3>
            <p>
              Dedicated implementation team, custom integration engineering, and a named
              account lead from day one. We deploy alongside your existing stack&nbsp;&mdash;&nbsp;not
              instead of it.
            </p>
          </div>

          {/* Trust & Compliance */}
          <div className="enterprise-card">
            <div className="pillar-icon" style={{ marginBottom: 20 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v4l3 2" />
              </svg>
            </div>
            <h3>Trust &amp; Compliance</h3>
            <p>
              Annual third-party audits, continuous vulnerability scanning, role-based access
              with SSO and MFA enforced by default. Your compliance team will approve.
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="trust-badges">
          <span className="trust-badge">Azure Hosted</span>
          <span className="trust-badge">ISO 27001</span>
          <span className="trust-badge">ISO 27701</span>
          <span className="trust-badge">API-First</span>
          <span className="trust-badge">No Sub-Processors</span>
        </div>
      </div>
    </section>
  )
}
