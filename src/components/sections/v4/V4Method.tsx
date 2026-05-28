export default function V4Method() {
  return (
    <div className="v4-method-band" id="method">
      <div className="v4-method-inner">
        <div className="v4-section-label v4-reveal" data-delay="1">The Triangulate Method™</div>
        <h2 className="v4-section-title v4-reveal" data-delay="2">
          Three data axes. <em>One decision.</em>
        </h2>
        <p className="v4-section-sub v4-reveal" data-delay="3">
          Clients recognise the workflow immediately. The pain point is daily and tangible — not theoretical.
        </p>

        <div className="v4-method-visual v4-reveal" data-delay="4">
          <div className="v4-method-tri">
            <svg viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="methodGlowV4" cx="50%" cy="60%" r="50%">
                  <stop offset="0%" stopColor="#ECEDEB" stopOpacity=".15" />
                  <stop offset="100%" stopColor="#ECEDEB" stopOpacity="0" />
                </radialGradient>
                <filter id="mGlowV4" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" />
                  <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <circle cx="200" cy="210" r="170" fill="url(#methodGlowV4)" />
              <path d="M200 50L360 320H40L200 50Z" stroke="#ECEDEB" strokeWidth="1.3" fill="none" filter="url(#mGlowV4)" />
              <text x="200" y="35" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="10" fill="#BFBFBE" letterSpacing="2">STRUCTURED</text>
              <text x="380" y="345" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="10" fill="#BFBFBE" letterSpacing="2">COGNITIVE</text>
              <text x="20" y="345" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="10" fill="#BFBFBE" letterSpacing="2">BIAS MIT.</text>
              <circle cx="200" cy="50" r="5" fill="#ECEDEB" filter="url(#mGlowV4)" />
              <circle cx="360" cy="320" r="5" fill="#ECEDEB" filter="url(#mGlowV4)" />
              <circle cx="40" cy="320" r="5" fill="#ECEDEB" filter="url(#mGlowV4)" />
              <line x1="200" y1="50" x2="200" y2="235" stroke="#ECEDEB" strokeWidth=".4" opacity=".35" />
              <line x1="40" y1="320" x2="275" y2="185" stroke="#ECEDEB" strokeWidth=".4" opacity=".35" />
              <line x1="360" y1="320" x2="125" y2="185" stroke="#ECEDEB" strokeWidth=".4" opacity=".35" />
              <circle cx="200" cy="218" r="8" fill="#FCF099" opacity=".9" />
              <circle cx="200" cy="218" r="16" fill="none" stroke="#FCF099" strokeWidth=".5" opacity=".4" />
            </svg>
          </div>

          <ul className="v4-method-list">
            <li className="v4-method-item">
              <span className="v4-method-num">i.</span>
              <div>
                <h4>Structured Data</h4>
                <p>Parsing hard skills, credentials, and experience with taxonomy normalisation across regions, languages, and qualification frameworks — so like is genuinely compared with like.</p>
              </div>
            </li>
            <li className="v4-method-item">
              <span className="v4-method-num">ii.</span>
              <div>
                <h4>Cognitive &amp; Behavioural Fit</h4>
                <p>Scientifically validated psychometric and scenario-based assessment measuring behavioural attributes, judgement, and problem-solving against the actual demands of the role.</p>
              </div>
            </li>
            <li className="v4-method-item">
              <span className="v4-method-num">iii.</span>
              <div>
                <h4>Bias Mitigation</h4>
                <p>Adversarial debiasing algorithms ensure fairness across demographics — protecting decisions from the inconsistency and liability that compound at enterprise scale.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
