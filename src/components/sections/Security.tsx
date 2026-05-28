const checkSvg = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M4.5 9.5l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Security() {
  return (
    <section className="section security-section" id="security">
      <div className="container">
        <div className="sec-grid">
          {/* Left copy */}
          <div className="sec-copy">
            <span className="eyebrow">
              <span className="eb-dot" />
              Security &amp; compliance
            </span>
            <h2 className="section-title">Your data is sacred. We treat it that way.</h2>
            <p>
              End-to-end encryption, ethical-AI framework, and full audit trails.
              Your data never trains our models.
            </p>
            <ul className="sec-bullets">
              <li>
                {checkSvg}
                AES-256 encryption at rest and TLS 1.3 in transit
              </li>
              <li>
                {checkSvg}
                Role-based access with SSO and MFA enforced by default
              </li>
              <li>
                {checkSvg}
                Annual third-party pen testing and continuous vulnerability scanning
              </li>
              <li>
                {checkSvg}
                Dedicated compliance team with sub-24-hour SLA for security inquiries
              </li>
            </ul>
          </div>

          {/* Right badges */}
          <div className="badge-grid">
            {[
              { label: 'ISO 27001', detail: 'Certified \u00b7 2025' },
              { label: 'ISO 27701', detail: 'Privacy certified' },
              { label: 'SOC 2 Type II', detail: 'Annual attestation' },
              { label: 'GDPR', detail: 'EU data residency' },
            ].map((b) => (
              <div key={b.label} className="sec-badge">
                <div className="sec-badge-mark">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 2l7 3v5c0 4.5-3 8.25-7 9.5C7 18.25 4 14.5 4 10V5l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M8 11l2 2 4-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <strong>{b.label}</strong>
                  <span>{b.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
