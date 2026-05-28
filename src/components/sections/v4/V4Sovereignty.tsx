export default function V4Sovereignty() {
  return (
    <section className="v4-section">
      <div className="v4-section-label v4-reveal" data-delay="1">Data Sovereignty</div>
      <div className="v4-sov-grid v4-reveal" data-delay="2">
        <div className="v4-sov-globe">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
            <defs>
              <radialGradient id="globeGV4" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ECEDEB" stopOpacity=".08" />
                <stop offset="100%" stopColor="#ECEDEB" stopOpacity="0" />
              </radialGradient>
              <filter id="pinGlowV4" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" />
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <circle cx="200" cy="200" r="160" fill="url(#globeGV4)" />
            <circle cx="200" cy="200" r="160" stroke="#ECEDEB" strokeWidth=".5" fill="none" opacity=".3" />
            <g stroke="#ECEDEB" strokeWidth=".4" fill="none" opacity=".2">
              <ellipse cx="200" cy="200" rx="160" ry="80" />
              <ellipse cx="200" cy="200" rx="160" ry="40" />
              <ellipse cx="200" cy="200" rx="80" ry="160" />
              <ellipse cx="200" cy="200" rx="40" ry="160" />
            </g>
            <g filter="url(#pinGlowV4)">
              <circle cx="110" cy="150" r="5" fill="#FCF099" />
              <circle cx="200" cy="140" r="5" fill="#FCF099" />
              <circle cx="260" cy="200" r="5" fill="#FCF099" />
              <circle cx="290" cy="260" r="5" fill="#FCF099" />
              <circle cx="210" cy="285" r="5" fill="#FCF099" />
            </g>
            <g fontFamily="Inter Tight, sans-serif" fontSize="9" fill="#ECEDEB" letterSpacing="1.5">
              <text x="110" y="135" textAnchor="middle">US EAST</text>
              <text x="200" y="125" textAnchor="middle">EU WEST</text>
              <text x="260" y="185" textAnchor="middle">UAE</text>
              <text x="290" y="245" textAnchor="middle">APAC (SG)</text>
              <text x="210" y="305" textAnchor="middle">AU</text>
            </g>
          </svg>
        </div>
        <div className="v4-sov-copy">
          <h3>
            For regulated institutions, <em>data location is not a preference — it&apos;s a law.</em>
          </h3>
          <p>
            Strategia is architected to meet data residency requirements across healthcare, financial services, and government. Select your deployment region at contracting. Your data stays within that jurisdiction, under your control, for the life of the contract.
          </p>
          <div className="v4-sov-note">
            <svg className="v4-sov-note-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            <p>Deployment regions: US East, EU West, UAE, APAC (Singapore), Australia. Contracted. Audited. Never crossed.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
