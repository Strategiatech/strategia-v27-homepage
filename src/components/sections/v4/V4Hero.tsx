export default function V4Hero() {
  return (
    <section className="v4-hero" id="top">
      <svg className="v4-hero-atmos" viewBox="0 0 540 480" fill="none">
        <defs>
          <radialGradient id="heroGlowV4" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#FCF099" stopOpacity=".35" />
            <stop offset="30%" stopColor="#FCF099" stopOpacity=".12" />
            <stop offset="100%" stopColor="#FCF099" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heroCore" cx="50%" cy="60%" r="40%">
            <stop offset="0%" stopColor="#ECEDEB" stopOpacity=".22" />
            <stop offset="100%" stopColor="#ECEDEB" stopOpacity="0" />
          </radialGradient>
          <filter id="tGlowV4" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="tGlowOuterV4" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="14" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="270" cy="260" r="230" fill="url(#heroGlowV4)" />
        <circle cx="270" cy="260" r="100" fill="url(#heroCore)" style={{ animation: 'v4-radar-sweep 4s ease-in-out infinite' }} />
        <path d="M270 50L500 440H40L270 50Z" stroke="#FCF099" strokeWidth="1.5" fill="none" filter="url(#tGlowOuterV4)" opacity=".45" />
        <path d="M270 50L500 440H40L270 50Z" stroke="#ECEDEB" strokeWidth="1.5" fill="none" filter="url(#tGlowV4)" opacity=".9" />
        <path d="M270 120L430 400H110L270 120Z" stroke="#ECEDEB" strokeWidth=".7" fill="none" opacity=".22" />
        <path d="M270 190L360 360H180L270 190Z" stroke="#ECEDEB" strokeWidth=".5" fill="none" opacity=".14" />
      </svg>

      <div className="v4-eyebrow v4-reveal" data-delay="1"><span className="v4-dot" />AI-Native Workforce Intelligence</div>
      <h1 className="v4-reveal" data-delay="2">
        Intelligence that mirrors how{' '}
        <span className="v4-accent">decisions are actually made.</span>
      </h1>
      <p className="v4-hero-sub v4-reveal" data-delay="3">
        <strong>Strategia is the workforce intelligence platform built for enterprise healthcare operators.</strong>{' '}
        Triangulating behavioural, contextual, and structural data to eliminate execution risk where it matters most — the hiring decision.
      </p>

      <div className="v4-cta-group v4-reveal" data-delay="4">
        <a href="#contact" className="v4-btn-primary">
          <span>Request Executive Briefing</span>
          <span className="v4-arrow">→</span>
        </a>
        <a href="#method" className="v4-btn-ghost">Explore Platform →</a>
      </div>

      <div className="v4-metrics v4-reveal" data-delay="5">
        <div className="v4-metric">
          <div className="v4-metric-val">260K+</div>
          <div className="v4-metric-lbl">Addressable Staff in Pipeline</div>
        </div>
        <div className="v4-metric">
          <div className="v4-metric-val">\.3B</div>
          <div className="v4-metric-lbl">Total Addressable Market</div>
        </div>
        <div className="v4-metric">
          <div className="v4-metric-val">8–12w</div>
          <div className="v4-metric-lbl">Time to Value</div>
        </div>
        <div className="v4-metric">
          <div className="v4-metric-val">11</div>
          <div className="v4-metric-lbl">Platform Modules</div>
        </div>
      </div>
    </section>
  )
}
