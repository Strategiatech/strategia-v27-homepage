const steps = [
  {
    num: 'i.',
    title: 'Structured Data',
    text: 'Parsing hard skills, credentials, and experience with taxonomy normalisation across regions, languages, and qualification frameworks — so like is genuinely compared with like.',
  },
  {
    num: 'ii.',
    title: 'Cognitive & Behavioural Fit',
    text: 'Scientifically validated psychometric and scenario-based assessment measuring behavioural attributes, judgement, and problem-solving against the actual demands of the role.',
  },
  {
    num: 'iii.',
    title: 'Bias Mitigation',
    text: 'Adversarial debiasing algorithms ensure fairness across demographics — protecting decisions from the inconsistency and liability that compound at enterprise scale.',
  },
]

export default function V3Triangulate() {
  return (
    <div className="v3-method-band" id="method">
      <div className="v3-method-inner">
        <div className="v3-section-label">The Triangulate Method&trade;</div>
        <h2 className="v3-section-title">
          Three data axes. <em>One decision.</em>
        </h2>
        <p className="v3-section-sub">
          Clients recognise the workflow immediately. The pain point is daily and
          tangible — not theoretical.
        </p>

        <div className="v3-method-visual">
          <div className="v3-method-tri">
            <svg viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="methodGlow" cx="50%" cy="60%" r="50%">
                  <stop offset="0%" stopColor="#ECEDEB" stopOpacity=".15" />
                  <stop offset="100%" stopColor="#ECEDEB" stopOpacity="0" />
                </radialGradient>
                <filter
                  id="mGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="3" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <circle cx="200" cy="210" r="170" fill="url(#methodGlow)" />
              <path
                d="M200 50L360 320H40L200 50Z"
                stroke="#ECEDEB"
                strokeWidth="1.3"
                fill="none"
                filter="url(#mGlow)"
              />
              <g
                fontFamily="Inter Tight"
                fontSize="10"
                fill="#BFBFBE"
                letterSpacing="2"
              >
                <text x="200" y="35" textAnchor="middle">
                  STRUCTURED
                </text>
                <text x="380" y="345" textAnchor="middle">
                  COGNITIVE
                </text>
                <text x="20" y="345" textAnchor="middle">
                  BIAS MIT.
                </text>
              </g>
              <circle
                cx="200"
                cy="50"
                r="5"
                fill="#ECEDEB"
                filter="url(#mGlow)"
              />
              <circle
                cx="360"
                cy="320"
                r="5"
                fill="#ECEDEB"
                filter="url(#mGlow)"
              />
              <circle
                cx="40"
                cy="320"
                r="5"
                fill="#ECEDEB"
                filter="url(#mGlow)"
              />
              <line
                x1="200"
                y1="50"
                x2="200"
                y2="235"
                stroke="#ECEDEB"
                strokeWidth=".4"
                opacity=".35"
              />
              <line
                x1="40"
                y1="320"
                x2="275"
                y2="185"
                stroke="#ECEDEB"
                strokeWidth=".4"
                opacity=".35"
              />
              <line
                x1="360"
                y1="320"
                x2="125"
                y2="185"
                stroke="#ECEDEB"
                strokeWidth=".4"
                opacity=".35"
              />
              <circle cx="200" cy="218" r="8" fill="#FCF099" opacity=".9" />
              <circle
                cx="200"
                cy="218"
                r="16"
                fill="none"
                stroke="#FCF099"
                strokeWidth=".5"
                opacity=".4"
              />
            </svg>
          </div>

          <ul className="v3-method-list">
            {steps.map((s) => (
              <li key={s.num} className="v3-method-item">
                <span className="v3-method-num">{s.num}</span>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
