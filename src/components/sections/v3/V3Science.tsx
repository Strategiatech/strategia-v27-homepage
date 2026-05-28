const traits = [
  { letter: 'O', name: 'Openness', desc: 'Creativity, curiosity, and willingness to try new things.' },
  { letter: 'C', name: 'Conscientiousness', desc: 'Discipline, organisation, reliability. The strongest single predictor of performance across role types.' },
  { letter: 'E', name: 'Extraversion', desc: 'Social interaction, assertiveness, energy levels.' },
  { letter: 'A', name: 'Agreeableness', desc: 'Cooperation, empathy, team orientation.' },
  { letter: 'N', name: 'Neuroticism', desc: 'Emotional stability and stress tolerance under load.' },
]

export default function V3Science() {
  return (
    <section className="v3-section" id="science">
      <div className="v3-section-label">The Science</div>
      <h2 className="v3-section-title">
        The Five-Factor Model. <em>Gold standard. Measured.</em>
      </h2>
      <p className="v3-section-sub">
        Strategia uses the Big Five personality framework — the only model of
        personality with decades of peer-reviewed validation for predicting job
        performance. Not MBTI. Not DISC. Science.
      </p>

      <div className="v3-science-grid">
        <ul className="v3-ocean-list">
          {traits.map((t) => (
            <li key={t.letter} className="v3-ocean-item">
              <div className="v3-ocean-letter">{t.letter}</div>
              <div>
                <h5>{t.name}</h5>
                <p>{t.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="v3-radar-card">
          <div className="v3-live-tag">
            <span className="dot" />
            Live Calibration
          </div>
          <div className="v3-radar-legend">
            <span>
              <span className="v3-legend-dot" style={{ background: '#FCF099' }} />
              Candidate
            </span>
            <span>
              <span className="v3-legend-dot" style={{ background: '#ECEDEB', opacity: 0.5 }} />
              Role Benchmark
            </span>
          </div>
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
            <defs>
              <filter id="rGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Pentagon grid rings */}
            <g stroke="#ECEDEB" strokeWidth=".4" fill="none" opacity=".18">
              <polygon points="200,60 333,140 282,300 118,300 67,140" />
              <polygon points="200,95 306,158 266,285 134,285 94,158" />
              <polygon points="200,130 279,175 250,270 150,270 121,175" />
              <polygon points="200,165 252,193 234,256 166,256 148,193" />
            </g>
            {/* Axis lines */}
            <g stroke="#ECEDEB" strokeWidth=".3" opacity=".18">
              <line x1="200" y1="200" x2="200" y2="60" />
              <line x1="200" y1="200" x2="333" y2="140" />
              <line x1="200" y1="200" x2="282" y2="300" />
              <line x1="200" y1="200" x2="118" y2="300" />
              <line x1="200" y1="200" x2="67" y2="140" />
            </g>
            {/* Benchmark area */}
            <polygon
              points="200,95 296,165 268,280 135,272 96,158"
              fill="#ECEDEB"
              fillOpacity=".06"
              stroke="#ECEDEB"
              strokeWidth=".8"
              strokeOpacity=".4"
            />
            {/* Candidate area */}
            <polygon
              points="200,110 286,168 260,268 150,260 110,170"
              fill="#FCF099"
              fillOpacity=".12"
              stroke="#FCF099"
              strokeWidth="1.2"
              filter="url(#rGlow)"
            />
            {/* Labels */}
            <g fontFamily="Inter Tight" fontSize="10" fill="#BFBFBE" letterSpacing="1.5">
              <text x="200" y="48" textAnchor="middle">OPENNESS</text>
              <text x="345" y="135" textAnchor="middle">CONSCIENT.</text>
              <text x="295" y="322" textAnchor="middle">EXTRAVERSION</text>
              <text x="105" y="322" textAnchor="middle">AGREEABLE.</text>
              <text x="52" y="135" textAnchor="middle">NEUROTICISM</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
