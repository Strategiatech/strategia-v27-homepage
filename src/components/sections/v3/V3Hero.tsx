export default function V3Hero() {
  return (
    <section className="v3-hero" id="top">
      {/* Atmospheric triangle illustration */}
      <svg className="v3-hero-atmos" viewBox="0 0 540 480" fill="none">
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#ECEDEB" stopOpacity=".18" />
            <stop offset="100%" stopColor="#ECEDEB" stopOpacity="0" />
          </radialGradient>
          <filter id="tGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="270" cy="260" r="230" fill="url(#heroGlow)" />
        <path
          d="M270 50L500 440H40L270 50Z"
          stroke="#ECEDEB"
          strokeWidth="1.5"
          fill="none"
          filter="url(#tGlow)"
          opacity=".9"
        />
        <path
          d="M270 120L430 400H110L270 120Z"
          stroke="#ECEDEB"
          strokeWidth=".7"
          fill="none"
          opacity=".22"
        />
        <path
          d="M270 190L360 360H180L270 190Z"
          stroke="#ECEDEB"
          strokeWidth=".5"
          fill="none"
          opacity=".14"
        />
      </svg>

      <div className="v3-eyebrow">
        <span className="dot" />
        AI-Native Workforce Intelligence
      </div>

      <h1>
        Intelligence that mirrors how{' '}
        <span className="accent">decisions are actually made.</span>
      </h1>

      <p className="v3-hero-sub">
        <strong>
          Strategia is the workforce intelligence platform built for enterprise
          healthcare operators.
        </strong>{' '}
        Triangulating behavioural, contextual, and structural data to eliminate
        execution risk where it matters most — the hiring decision.
      </p>

      <div className="v3-cta-group">
        <a href="#contact" className="v3-btn-primary">
          <span>Request Executive Briefing</span>
          <span className="arrow">→</span>
        </a>
        <a href="#method" className="v3-btn-ghost">
          Explore Platform →
        </a>
      </div>

      <div className="v3-metrics">
        <div className="v3-metric">
          <div className="v3-metric-val">260K+</div>
          <div className="v3-metric-lbl">Addressable Staff in Pipeline</div>
        </div>
        <div className="v3-metric">
          <div className="v3-metric-val">$8.3B</div>
          <div className="v3-metric-lbl">Total Addressable Market</div>
        </div>
        <div className="v3-metric">
          <div className="v3-metric-val">8–12w</div>
          <div className="v3-metric-lbl">Time to Value</div>
        </div>
        <div className="v3-metric">
          <div className="v3-metric-val">11</div>
          <div className="v3-metric-lbl">Platform Modules</div>
        </div>
      </div>
    </section>
  )
}
