const steps = [
  {
    step: 'Step i.',
    title: 'Dedicated Solutions Architect',
    text: 'A single accountable lead from kickoff through live operation — not a ticketing queue. Paired with your internal executive sponsor.',
  },
  {
    step: 'Step ii.',
    title: 'Custom ATS Integration',
    text: 'Middleware built to your environment. Strategia plugs into your existing ATS and HRIS via pre-built and bespoke APIs. No rip-and-replace.',
  },
  {
    step: 'Step iii.',
    title: 'Configured Onboarding Plans',
    text: '30/60/90 plans mapped to your role taxonomy and success metrics. The platform goes live calibrated — not generic.',
  },
]

export default function V3Implementation() {
  return (
    <section className="v3-section">
      <div className="v3-section-label">Implementation</div>
      <h2 className="v3-section-title">
        White-glove implementation.{' '}
        <em>We don&apos;t hand you a login. We engineer the outcome.</em>
      </h2>

      <div className="v3-impl-grid">
        {steps.map((s) => (
          <div key={s.step} className="v3-impl-card">
            <span className="v3-impl-step">{s.step}</span>
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
