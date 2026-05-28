'use client'

export default function Problem() {
  const ocean = [
    { letter: 'O', trait: 'Openness', desc: 'Creativity, curiosity, willingness to try new things.' },
    { letter: 'C', trait: 'Conscientiousness', desc: 'Discipline, organization, reliability. Strongest predictor of performance.' },
    { letter: 'E', trait: 'Extraversion', desc: 'Social interaction, assertiveness, energy levels.' },
    { letter: 'A', trait: 'Agreeableness', desc: 'Cooperation, empathy, team orientation.' },
    { letter: 'N', trait: 'Neuroticism', desc: 'Emotional stability and stress tolerance.' },
  ]

  return (
    <section className="section problem" id="science">
      <div className="container">
        <div className="problem-head">
          <div className="eyebrow">
            <span className="eb-dot" />
            The science
          </div>
          <h2>
            Validated Science. Not Just Algorithms.
          </h2>
          <p className="problem-sub">
            We combine Industrial-Organizational (I/O) Psychology with advanced machine
            learning to create a hiring signal that is predictive, fair, and legally&nbsp;defensible.
          </p>
        </div>

        {/* OCEAN Model */}
        <div className="ocean-grid">
          {ocean.map((item) => (
            <div key={item.letter} className="ocean-card">
              <div className="ocean-letter">{item.letter}</div>
              <div className="ocean-trait">{item.trait}</div>
              <div className="ocean-desc">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Triangulate Method */}
        <div className="triangulate">
          <div className="triangulate-label">The Triangulate Method</div>
          <div className="triangulate-steps">
            <span>Structured Data</span>
            <span className="triangulate-arrow">&rarr;</span>
            <span>Cognitive Fit</span>
            <span className="triangulate-arrow">&rarr;</span>
            <span>Bias Mitigation</span>
          </div>
        </div>

        <p
          className="problem-tagline"
          dangerouslySetInnerHTML={{
            __html:
              'Workforce intelligence built on <span class="highlight">real science</span>. Defensible at every level.',
          }}
        />
      </div>
    </section>
  )
}
