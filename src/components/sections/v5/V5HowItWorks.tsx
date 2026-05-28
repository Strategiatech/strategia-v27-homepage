'use client'

import { useEffect, useRef } from 'react'

const stepsData = [
  { num: 1, title: 'Ingest', desc: 'V-Parse normalizes resumes into structured, machine-readable data at scale.' },
  { num: 2, title: 'Screen', desc: 'V-Psych + V-Interview filter candidates using validated psychometrics and structured interviews.' },
  { num: 3, title: 'Verify', desc: 'V-Scenario tests real-world capability through role-specific simulations.' },
  { num: 4, title: 'Decide', desc: 'V-Insights compares candidates against high-performer benchmarks with full explainability.' },
  { num: 5, title: 'Integrate', desc: 'V-Onboarding generates tailored 90-day plans for every successful hire.' },
]

export default function V5HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const stepLine = section.querySelector<HTMLElement>('.v5-step-line')
    const steps = section.querySelectorAll<HTMLElement>('.v5-step')

    if (!stepLine) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stepLine.classList.add('in')
            steps.forEach((step, i) => {
              setTimeout(() => step.classList.add('in'), (i + 1) * 300)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(stepLine)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="v5-how" id="process">
      <div className="v3-section-label">The Intelligence Cycle</div>
      <h2 className="v3-section-title">
        Five steps from raw data to <em>strategic action.</em>
      </h2>
      <p className="v3-section-sub">
        The Strategia Intelligence Cycle transforms unstructured hiring data into
        defensible, predictive decisions — end to end.
      </p>

      <div className="v5-steps" ref={sectionRef}>
        <div className="v5-step-line">
          <div className="v5-step-line-fill" />
        </div>

        {stepsData.map((step) => (
          <div key={step.num} className="v5-step">
            <div className="v5-step-num">{step.num}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
