export default function V4Enterprise() {
  return (
    <div className="v4-infra-band" id="enterprise">
      <div className="v4-infra-inner">
        <div className="v4-section-label v4-reveal" data-delay="1">Enterprise Infrastructure</div>
        <h2 className="v4-section-title v4-reveal" data-delay="2">
          Global scale. <em>Zero compromise.</em>
        </h2>
        <p className="v4-section-sub v4-reveal" data-delay="3">
          Hosted on Microsoft Azure with data residency options across US, AU, SG, UAE, and EU. Your data never leaves your control.
        </p>

        <div className="v4-infra-grid v4-reveal" data-delay="4">
          <div className="v4-infra-card">
            <svg className="v4-infra-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" />
              <line x1="7" y1="7" x2="7.01" y2="7" /><line x1="7" y1="17" x2="7.01" y2="17" />
            </svg>
            <h4>Azure Hosted</h4>
            <p>End-to-end encryption in transit and at rest via Azure security protocols. Compliant with Microsoft&apos;s enterprise commitments.</p>
          </div>
          <div className="v4-infra-card">
            <svg className="v4-infra-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 2L3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5z" />
            </svg>
            <h4>ISO Aligned</h4>
            <p>Built in alignment with ISO 27001 and ISO 27701 frameworks for information security and privacy management.</p>
          </div>
          <div className="v4-infra-card">
            <svg className="v4-infra-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
            </svg>
            <h4>API-First Design</h4>
            <p>Secure integration with your existing ATS and HRIS platforms via pre-built APIs. No ripping and replacing.</p>
          </div>
          <div className="v4-infra-card">
            <svg className="v4-infra-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="4" y="10" width="16" height="11" rx="1.5" /><path d="M8 10V7a4 4 0 118 0v3" />
            </svg>
            <h4>No Sub-Processors</h4>
            <p>Strategia operates exclusively on Microsoft infrastructure. No third-party sub-processors. Single chain of custody.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
