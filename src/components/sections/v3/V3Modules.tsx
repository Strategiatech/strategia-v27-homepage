const core = [
  { name: 'V-Job', sub: 'JD Intelligence' },
  { name: 'V-Parse', sub: 'CV Parsing' },
  { name: 'V-Psych', sub: 'Psychometrics' },
  { name: 'V-Interview', sub: 'Structured' },
  { name: 'V-Scenario', sub: 'Situational' },
  { name: 'JobFit', sub: 'Triangulated' },
]

const expansion = [
  { name: 'V-Ref Check', sub: 'Referencing' },
  { name: 'V-Culture', sub: 'Org Fit' },
  { name: 'V-Insights', sub: 'Analytics' },
  { name: 'V-Onboarding', sub: '30/60/90' },
  { name: 'V-Workforce', sub: 'Intelligence' },
]

export default function V3Modules() {
  return (
    <section className="v3-section">
      <div className="v3-section-label">The Platform</div>
      <h2 className="v3-section-title">
        Modular architecture. <em>Land and expand.</em>
      </h2>
      <p className="v3-section-sub">
        Eleven purpose-built modules. Deploy the core, add modules as your
        workforce intelligence matures. Enterprise-ready for regulated
        environments from day one.
      </p>

      <div className="v3-mod-sublabel" style={{ marginTop: 80 }}>
        Core Platform
      </div>
      <div className="v3-module-core">
        {core.map((m) => (
          <div key={m.name} className="v3-module">
            <span className="v3-module-name">{m.name}</span>
            <span className="v3-module-sub">{m.sub}</span>
          </div>
        ))}
      </div>

      <div className="v3-mod-sublabel">Expansion Modules</div>
      <div className="v3-module-expansion">
        {expansion.map((m) => (
          <div key={m.name} className="v3-module ghost">
            <span className="v3-module-name">{m.name}</span>
            <span className="v3-module-sub">{m.sub}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
