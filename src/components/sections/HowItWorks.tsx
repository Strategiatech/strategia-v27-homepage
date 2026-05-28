'use client'

import { useEffect, useRef } from 'react'

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const stepLine = section.querySelector<HTMLElement>('.step-line')
    const steps = section.querySelectorAll<HTMLElement>('.step')

    if (!stepLine) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stepLine.classList.add('in')

            steps.forEach((step, i) => {
              setTimeout(() => {
                step.classList.add('in')
              }, (i + 1) * 350)
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

  const stepsData = [
    {
      num: 1,
      title: 'Ingest',
      desc: 'V-Parse normalizes resumes into structured, machine-readable data at scale.',
    },
    {
      num: 2,
      title: 'Screen',
      desc: 'V-Psych + V-Interview filter candidates using validated psychometrics and structured interviews.',
    },
    {
      num: 3,
      title: 'Verify',
      desc: 'V-Scenario tests real-world capability through role-specific simulations.',
    },
    {
      num: 4,
      title: 'Decide',
      desc: 'V-Insights compares candidates against high-performer benchmarks with full explainability.',
    },
    {
      num: 5,
      title: 'Integrate',
      desc: 'V-Onboarding generates tailored 90-day plans for every successful hire.',
    },
  ]

  return (
    <section className="section how" id="process">
      <div className="container">
        {/* Header */}
        <div className="how-head">
          <div className="eyebrow">
            <span className="eb-dot" />
            The Intelligence Cycle
          </div>
          <h2 className="section-title">
            Five steps from raw data to strategic&nbsp;action.
          </h2>
          <p className="section-sub">
            The Strategia Intelligence Cycle transforms unstructured hiring data into
            defensible, predictive decisions&nbsp;&mdash;&nbsp;end to end.
          </p>
        </div>

        {/* Steps */}
        <div className="steps" ref={sectionRef}>
          {/* Line */}
          <div className="step-line">
            <div className="step-line-fill" />
          </div>

          {stepsData.map((step) => (
            <div key={step.num} className="step">
              <div className="step-num">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
