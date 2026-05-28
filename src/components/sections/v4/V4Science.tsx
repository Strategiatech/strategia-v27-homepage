export default function V4Science() {
  return (
    <section className="v4-section" id="science">
      <div className="v4-section-label v4-reveal" data-delay="1">The Science</div>
      <h2 className="v4-section-title v4-reveal" data-delay="2">
        The Five-Factor Model. <em>Gold standard. Measured.</em>
      </h2>
      <p className="v4-section-sub v4-reveal" data-delay="3">
        Strategia uses the Big Five personality framework — the only model of personality with decades of peer-reviewed validation for predicting job performance. Not MBTI. Not DISC. Science.
      </p>

      <div className="v4-science-grid v4-reveal" data-delay="4">
        <ul className="v4-ocean-list">
          <li className="v4-ocean-item">
            <div className="v4-ocean-letter">O</div>
            <div>
              <h5>Openness</h5>
              <p>Creativity, curiosity, and willingness to try new things.</p>
            </div>
          </li>
          <li className="v4-ocean-item">
            <div className="v4-ocean-letter">C</div>
            <div>
              <h5>Conscientiousness</h5>
              <p>Discipline, organisation, reliability. The strongest single predictor of performance across role types.</p>
            </div>
          </li>
          <li className="v4-ocean-item">
            <div className="v4-ocean-letter">E</div>
            <div>
              <h5>Extraversion</h5>
              <p>Social interaction, assertiveness, energy levels.</p>
            </div>
          </li>
          <li className="v4-ocean-item">
            <div className="v4-ocean-letter">A</div>
            <div>
              <h5>Agreeableness</h5>
              <p>Cooperation, empathy, team orientation.</p>
            </div>
          </li>
          <li className="v4-ocean-item">
            <div className="v4-ocean-letter">N</div>
            <div>
              <h5>Neuroticism</h5>
              <p>Emotional stability and stress tolerance under load.</p>
            </div>
          </li>
        </ul>

        <div className="v4-radar-card">
          <div className="v4-live-tag"><span className="v4-dot" />Live Calibration</div>
          <div className="v4-radar-legend">
            <span><span className="v4-legend-dot" style={{ background: '#FCF099' }} />Candidate</span>
            <span><span className="v4-legend-dot" style={{ background: '#ECEDEB', opacity: 0.5 }} />Role Benchmark</span>
          </div>
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
            <defs>
              <filter id="rGlowV4" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" />
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <g stroke="#ECEDEB" strokeWidth=".4" fill="none" opacity=".18">
              <polygon points="200,60 333,140 282,300 118,300 67,140" />
              <polygon points="200,95 306,158 266,285 134,285 94,158" />
              <polygon points="200,130 279,175 250,270 150,270 121,175" />
              <polygon points="200,165 252,193 234,256 166,256 148,193" />
            </g>
            <g stroke="#ECEDEB" strokeWidth=".3" opacity=".18">
              <line x1="200" y1="200" x2="200" y2="60" />
              <line x1="200" y1="200" x2="333" y2="140" />
              <line x1="200" y1="200" x2="282" y2="300" />
              <line x1="200" y1="200" x2="118" y2="300" />
              <line x1="200" y1="200" x2="67" y2="140" />
            </g>
            <polygon points="200,95 296,165 268,280 135,272 96,158" fill="#ECEDEB" fillOpacity=".06" stroke="#ECEDEB" strokeWidth=".8" strokeOpacity=".4" />
            <polygon points="200,110 286,168 260,268 150,260 110,170" fill="#FCF099" fillOpacity=".12" stroke="#FCF099" strokeWidth="1.2" filter="url(#rGlowV4)" />
            <text x="200" y="48" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="10" fill="#BFBFBE" letterSpacing="1.5">OPENNESS</text>
            <text x="345" y="135" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="10" fill="#BFBFBE" letterSpacing="1.5">CONSCIENT.</text>
            <text x="295" y="322" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="10" fill="#BFBFBE" letterSpacing="1.5">EXTRAVERSION</text>
            <text x="105" y="322" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="10" fill="#BFBFBE" letterSpacing="1.5">AGREEABLE.</text>
            <text x="52" y="135" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="10" fill="#BFBFBE" letterSpacing="1.5">NEUROTICISM</text>
          </svg>
        </div>
      </div>
    </section>
  )
}
