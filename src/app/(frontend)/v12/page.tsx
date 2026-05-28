'use client'

import { useEffect, useRef, useState } from 'react'
import { initTetrahedron } from './tetrahedron'
import './v12.css'

/* eslint-disable @next/next/no-img-element */

function fmt(n: number): string {
  if (Math.abs(n) >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M'
  if (Math.abs(n) >= 1_000) return '$' + Math.round(n / 1_000) + 'K'
  return '$' + Math.round(n).toLocaleString()
}

export default function V10Page() {
  const navRef = useRef<HTMLElement>(null)
  const [ftes, setFtes] = useState(3500)
  const [turnover, setTurnover] = useState(21)
  const [replacementCost, setReplacementCost] = useState(58000)

  const current = ftes * (turnover / 100) * replacementCost
  const newCost = current * 0.74
  const platformCost = Math.max(250_000, ftes * 700)
  const net = current - newCost - platformCost
  const bigValue =
    net >= 1_000_000 ? (net / 1_000_000).toFixed(2) + 'M' : Math.round(net / 1_000) + 'K'

  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const cleanup = initTetrahedron()
    return cleanup
  }, [])

  useEffect(() => {
    const handler = () => setComplete(true)
    window.addEventListener('v10:complete', handler)
    return () => window.removeEventListener('v10:complete', handler)
  }, [])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.v10-reveal')
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`v10${complete ? ' v10--complete' : ''}`}>
      {/* ================================================================
          NAVIGATION
          ================================================================ */}
      <nav className="v10-nav" ref={navRef}>
        <a href="/v10" className="v10-nav-logo">
          <img src="/images/logos/STRATEGIA_INLINE_WHITE.svg" alt="Strategia" />
        </a>
        <ul className="v10-nav-links">
          <li><a href="#platform" className="v10-nav-link">Platform</a></li>
          <li><a href="#science" className="v10-nav-link">Science</a></li>
          <li><a href="#solutions" className="v10-nav-link">Solutions</a></li>
          <li><a href="#enterprise" className="v10-nav-link">Enterprise</a></li>
        </ul>
        <a href="#demo" className="v10-nav-cta">Request Demo</a>
      </nav>

      {/* ================================================================
          HERO — Tetrahedron
          ================================================================ */}
      <section className="v10-hero">
        <div className="v10-cursor-aura" id="v10CursorAura" aria-hidden="true" />
        <div className="v10-plasma-layer" id="v10PlasmaLayer" aria-hidden="true" />

        <div className="v10-hero-copy">
          <h1>Intelligence,<br />perfectly aligned.</h1>
          <p>
            Workforce intelligence built on validated science. For enterprise
            teams who refuse to accept guesswork as strategy.
          </p>
          <a href="#demo" className="v10-hero-cta">Request a demo &rarr;</a>
        </div>

        <div className="v10-tetra-stage" id="v10Stage">
          <svg id="v10Tetra" viewBox="-110 -110 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <radialGradient id="v10CoreGlow" cx="50%" cy="50%" r="50%">
                <stop id="v10GlowStop0" offset="0%" stopColor="var(--glow-color)" stopOpacity="0.55" />
                <stop id="v10GlowStop1" offset="40%" stopColor="var(--glow-color)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--glow-color)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="v10PulseGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--glow-color)" stopOpacity="0" />
                <stop offset="55%" stopColor="var(--glow-color)" stopOpacity="0.55" />
                <stop offset="78%" stopColor="var(--glow-color)" stopOpacity="0.30" />
                <stop offset="100%" stopColor="var(--glow-color)" stopOpacity="0" />
              </radialGradient>
              <filter id="v10GlowBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="v10PulseBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
            </defs>
            <g id="v10Pulses" />
            <circle id="v10Glow" cx="0" cy="0" r="60" fill="url(#v10CoreGlow)" filter="url(#v10GlowBlur)" />
            <g id="v10Edges" />
          </svg>

          <div className="v10-brand-lockup" id="v10BrandLockup" aria-hidden="true">
            <svg viewBox="520 105 1145 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Strategia">
              <path d="M566.67,227.69c-5.63,0-10.97-1.07-16.03-3.21-5.06-2.14-9.2-4.93-12.43-8.37l-2.19,10.32h-5.32l-3.28-34.72,6.26-.63c1.67,5.11,3.62,9.46,5.86,13.06,2.24,3.6,4.74,6.52,7.51,8.76,2.76,2.24,5.76,3.91,8.99,5,3.23,1.09,6.62,1.64,10.16,1.64,4.17,0,7.92-.73,11.26-2.19,3.33-1.46,5.99-3.73,7.98-6.8,1.98-3.07,2.97-7.12,2.97-12.12,0-3.65-.7-6.88-2.11-9.7-1.41-2.81-3.91-5.42-7.51-7.82-3.6-2.4-8.78-4.69-15.56-6.88-6.05-1.98-11.1-4.01-15.17-6.1-4.07-2.08-7.33-4.38-9.77-6.88-2.45-2.5-4.2-5.29-5.24-8.37-1.04-3.07-1.56-6.59-1.56-10.56,0-3.54.52-6.8,1.56-9.77,1.04-2.97,2.53-5.6,4.46-7.9,1.93-2.29,4.22-4.25,6.88-5.86,2.66-1.62,5.58-2.81,8.76-3.6,3.18-.78,6.49-1.17,9.93-1.17,4.27,0,8.42.78,12.43,2.35,4.01,1.56,7.64,3.7,10.87,6.41l2.03-8.76h5.47l3.44,30.96-6.57.78c-1.88-5.73-4.12-10.37-6.73-13.92-2.61-3.54-5.63-6.12-9.07-7.74-3.44-1.62-7.4-2.42-11.89-2.42-5.94,0-10.77,1.59-14.47,4.77-3.7,3.18-5.55,7.58-5.55,13.21,0,3.55.7,6.7,2.11,9.46,1.41,2.76,3.93,5.27,7.58,7.51,3.65,2.24,8.76,4.51,15.33,6.8,6.25,1.98,11.44,4.14,15.56,6.49,4.12,2.35,7.35,4.85,9.7,7.51,2.35,2.66,4.01,5.53,5,8.6.99,3.08,1.49,6.44,1.49,10.09,0,4.69-.78,8.97-2.35,12.82-1.56,3.86-3.81,7.22-6.72,10.09-2.92,2.87-6.41,5.06-10.48,6.57-4.07,1.51-8.6,2.27-13.61,2.27Z" />
              <path d="M668.95,225.51v-5.63l12.51-2.03c1.77-.21,3.07-.81,3.91-1.8.83-.99,1.25-2.94,1.25-5.86v-86.79h-10.95c-3.75,0-6.88.29-9.38.86-2.5.57-4.64,1.72-6.41,3.44-1.77,1.72-3.39,4.22-4.85,7.51-1.46,3.28-3.08,7.64-4.85,13.06l-6.41-1.56,6.26-30.65h85.23l5.94,30.65-6.41,1.56c-1.67-5.42-3.26-9.77-4.77-13.06-1.51-3.28-3.13-5.79-4.85-7.51-1.72-1.72-3.83-2.87-6.33-3.44-2.5-.57-5.63-.86-9.38-.86h-11.26v87.42c0,2.61.34,4.35,1.02,5.24.68.89,2.11,1.49,4.3,1.8l12.51,2.03v5.63h-47.07Z" />
              <path d="M871.15,227.69c-3.23,0-6.07-.55-8.52-1.64-2.45-1.09-4.61-2.89-6.49-5.39-1.88-2.5-3.65-5.84-5.32-10.01l-8.29-20.96c-1.56-4.07-3.21-7.14-4.93-9.23-1.72-2.08-3.7-3.52-5.94-4.3-2.24-.78-5.08-1.17-8.52-1.17-1.88,0-3.55.05-5,.16-1.46.11-2.82.26-4.07.47v35.19c0,2.5.39,4.35,1.17,5.55.78,1.2,2.27,1.9,4.46,2.11l11.73,1.25v5.79h-42.85v-5.79l9.23-1.41c1.88-.21,3.15-.83,3.83-1.88.68-1.04,1.02-3.07,1.02-6.1v-79.6c0-2.71-.37-4.54-1.09-5.47-.73-.94-2.14-1.56-4.22-1.88l-8.76-1.41v-5.94h35.66c6.98,0,13.08.57,18.3,1.72,5.21,1.15,9.51,2.92,12.9,5.32,3.39,2.4,5.92,5.37,7.59,8.91,1.67,3.55,2.5,7.72,2.5,12.51,0,2.29-.34,4.61-1.02,6.96-.68,2.35-1.7,4.64-3.05,6.88-1.36,2.24-3.08,4.3-5.16,6.18-2.09,1.88-4.48,3.49-7.19,4.85-2.71,1.36-5.79,2.29-9.23,2.82v.47c3.75,1.15,6.75,2.87,8.99,5.16,2.24,2.29,4.14,5.42,5.71,9.38l5.32,13.14c1.67,3.96,3.15,7.35,4.46,10.16,1.3,2.82,2.82,4.95,4.54,6.41,1.72,1.46,3.93,2.19,6.65,2.19,1.46,0,2.84-.16,4.14-.47,1.3-.31,2.63-.68,3.99-1.09l1.25,4.69c-1.77,1.67-3.83,3-6.18,3.99-2.35.99-4.88,1.49-7.59,1.49ZM824.71,168.27c5.53,0,10.42-.86,14.7-2.58,4.27-1.72,7.66-4.33,10.16-7.82,2.5-3.49,3.75-7.84,3.75-13.06s-1.15-9.38-3.44-12.51c-2.29-3.13-5.63-5.39-10.01-6.8-4.38-1.41-9.75-2.11-16.11-2.11h-9.7v44.57c2.71.11,4.9.18,6.57.23,1.67.05,3.02.08,4.07.08Z" />
              <path d="M952.32,189.07l-7.19,21.11c-.84,2.29-1.07,4.17-.7,5.63.36,1.46,1.8,2.35,4.3,2.66l8.91,1.25v5.79h-35.97v-5.79l7.04-1.25c1.88-.42,3.28-1.09,4.22-2.03.94-.94,1.98-3.07,3.13-6.41l33.31-93.99h11.42l32.84,94.3c.94,2.61,1.77,4.46,2.5,5.55.73,1.09,2.19,1.85,4.38,2.27l6.1,1.25v6.1h-37.22v-5.79l9.07-1.25c2.08-.31,3.36-1.02,3.83-2.11.47-1.09.23-2.94-.7-5.55l-7.51-21.74-2.5-7.51-17.83-53.64h-.47l-18.3,53.64-2.66,7.51Z" />
              <path d="M1076.8,225.51v-5.63l12.51-2.03c1.77-.21,3.07-.81,3.91-1.8.83-.99,1.25-2.94,1.25-5.86v-86.79h-10.95c-3.75,0-6.88.29-9.38.86-2.5.57-4.64,1.72-6.41,3.44-1.77,1.72-3.39,4.22-4.85,7.51-1.46,3.28-3.08,7.64-4.85,13.06l-6.41-1.56,6.26-30.65h85.23l5.94,30.65-6.41,1.56c-1.67-5.42-3.26-9.77-4.77-13.06-1.51-3.28-3.13-5.79-4.85-7.51-1.72-1.72-3.83-2.87-6.33-3.44-2.5-.57-5.63-.86-9.38-.86h-11.26v87.42c0,2.61.34,4.35,1.02,5.24.68.89,2.11,1.49,4.3,1.8l12.51,2.03v5.63h-47.07Z" />
              <path d="M1196.43,225.51v-5.79l9.07-1.41c1.98-.31,3.28-.99,3.91-2.03.62-1.04.94-3.02.94-5.94v-79.6c0-2.6-.31-4.4-.94-5.4-.63-.99-2.09-1.64-4.38-1.95l-8.6-1.41v-5.94h69.59l5.63,24.71-6.41,2.03c-1.46-4.38-2.89-7.87-4.3-10.48-1.41-2.6-2.97-4.56-4.69-5.86-1.72-1.3-3.83-2.16-6.33-2.58-2.5-.42-5.63-.63-9.38-.63h-18.77v42.69h17.98c3.54,0,6.18-.23,7.9-.7,1.72-.47,2.97-1.62,3.75-3.44.78-1.82,1.59-4.72,2.42-8.68l5.63-.63v33.47l-5.63.94c-.63-4.07-1.36-7.01-2.19-8.84-.84-1.82-2.24-3-4.22-3.52-1.98-.52-4.95-.78-8.91-.78h-16.73v44.57h24.55c3.75,0,6.83-.31,9.23-.94,2.4-.63,4.4-1.67,6.02-3.13,1.62-1.46,2.95-3.52,3.99-6.18,1.04-2.66,1.98-6.07,2.81-10.24h6.73l-3.75,27.68h-74.91Z" />
              <path d="M1372.36,227.69c-9.7,0-18.17-2.21-25.41-6.65-7.25-4.43-12.9-10.82-16.97-19.16-4.07-8.34-6.1-18.35-6.1-30.03,0-9.17,1.15-17.36,3.44-24.55,2.29-7.19,5.58-13.27,9.85-18.22,4.27-4.95,9.38-8.73,15.33-11.34,5.94-2.6,12.51-3.91,19.7-3.91,5.53,0,10.61.86,15.25,2.58,4.64,1.72,8.63,4.14,11.96,7.27l1.56-10.01h5.63l6.41,35.19-6.26,1.56c-2.4-6.78-5.19-12.22-8.37-16.34-3.18-4.12-6.88-7.12-11.1-8.99-4.22-1.88-9.25-2.82-15.09-2.82-5.21,0-10.01.94-14.39,2.82-4.38,1.88-8.19,4.8-11.42,8.76-3.23,3.96-5.76,8.97-7.58,15.01-1.83,6.05-2.74,13.24-2.74,21.58,0,7.51.83,14.26,2.5,20.25,1.67,6,4.12,11.1,7.35,15.33,3.23,4.22,7.14,7.46,11.73,9.7,4.59,2.24,9.8,3.36,15.64,3.36,3.86,0,7.53-.49,11.02-1.49,3.49-.99,6.67-2.32,9.54-3.99,2.87-1.67,5.18-3.49,6.96-5.47v-20.02c0-2.6-.37-4.35-1.09-5.24-.73-.88-2.14-1.49-4.22-1.8l-9.54-1.41v-5.94h39.41v5.94l-8.76,1.41c-1.88.21-3.13.86-3.75,1.95s-.94,3-.94,5.71v37.22h-5.47l-3.13-8.45c-3.02,2.19-6.18,4.04-9.46,5.55-3.28,1.51-6.7,2.66-10.24,3.44-3.55.78-7.3,1.17-11.26,1.17Z" />
              <path d="M1471.2,225.51v-5.79l9.38-1.41c1.98-.31,3.28-.99,3.91-2.03.63-1.04.94-3.02.94-5.94v-79.6c0-2.71-.34-4.54-1.02-5.47-.68-.94-2.06-1.56-4.14-1.88l-9.07-1.41v-5.94h39.88v5.94l-9.54,1.41c-1.88.21-3.13.89-3.75,2.03-.63,1.15-.94,3.13-.94,5.94v79.6c0,2.61.34,4.41,1.02,5.4.68.99,2.01,1.64,3.99,1.95l9.23,1.41v5.79h-39.88Z" />
              <path d="M1584.88,189.07l-7.19,21.11c-.84,2.29-1.07,4.17-.7,5.63.36,1.46,1.8,2.35,4.3,2.66l8.91,1.25v5.79h-35.97v-5.79l7.04-1.25c1.88-.42,3.28-1.09,4.22-2.03.94-.94,1.98-3.07,3.13-6.41l33.31-93.99h11.42l32.84,94.3c.94,2.61,1.77,4.46,2.5,5.55.73,1.09,2.19,1.85,4.38,2.27l6.1,1.25v6.1h-37.22v-5.79l9.07-1.25c2.08-.31,3.36-1.02,3.83-2.11.47-1.09.23-2.94-.7-5.55l-7.51-21.74-2.5-7.51-17.83-53.64h-.47l-18.3,53.64-2.66,7.51Z" />
            </svg>
          </div>
        </div>
      </section>
      <div className="v10-scroll-spacer" aria-hidden="true" />

      {/* ================================================================
          PLATFORM
          ================================================================ */}
      <section className="v10-section" id="platform">
        <div className="v10-section-inner v10-reveal">
          <div className="v10-eyebrow">The platform</div>
          <h2 className="v10-h2">Six modules. One intelligence source.</h2>
          <p className="v10-desc">
            Each module works standalone. Together they form the intelligence
            layer your workforce strategy has been missing.
          </p>

          <div className="v10-platform-grid">
            {[
              { code: 'V-Parse', title: 'High-Precision Matching', desc: 'CV analysis engine that normalizes and ranks over 1,000 resumes per hour into structured, actionable data.' },
              { code: 'V-Psych', title: 'Validated Assessment', desc: 'OCEAN-based psychometric profiling grounded in peer-reviewed I/O psychology. Predicts job fit, team dynamics, and retention.' },
              { code: 'V-Interview', title: 'Avatar-Led Screening', desc: 'AI-powered structured interviews available 24/7. Consistent, fair, and designed to surface genuine capability.' },
              { code: 'V-Scenario', title: 'Real-World Simulation', desc: 'Role-specific scenario testing that evaluates how candidates think, prioritize, and respond under realistic conditions.' },
              { code: 'V-Onboarding', title: 'Behavioral Foundation', desc: 'Custom 90-day onboarding playbooks tailored to each hire’s psychometric profile, role, and team composition.' },
              { code: 'V-Insights', title: 'Actionable Analytics', desc: 'Retention risk scoring, succession planning, and DEI dashboards. A single source of truth for every workforce decision.' },
            ].map((mod) => (
              <div key={mod.code} className="v10-module">
                <div className="v10-module-code">{mod.code}</div>
                <div className="v10-module-title">{mod.title}</div>
                <p className="v10-module-desc">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SCIENCE
          ================================================================ */}
      <section className="v10-section v10-section--subtle v10-section--center" id="science">
        <div className="v10-section-inner v10-reveal">
          <div className="v10-eyebrow">The science</div>
          <h2 className="v10-h2" style={{ maxWidth: '28ch' }}>Validated psychology meets machine&nbsp;learning.</h2>
          <p className="v10-desc">
            Industrial-Organizational psychology and advanced ML, working together
            to produce hiring signals that are predictive, fair, and legally&nbsp;defensible.
          </p>

          <div className="v10-ocean-row">
            {[
              { letter: 'O', trait: 'Openness' },
              { letter: 'C', trait: 'Conscientiousness' },
              { letter: 'E', trait: 'Extraversion' },
              { letter: 'A', trait: 'Agreeableness' },
              { letter: 'N', trait: 'Neuroticism' },
            ].map((item) => (
              <div key={item.letter} className="v10-ocean-item">
                <div className="v10-ocean-letter">{item.letter}</div>
                <div className="v10-ocean-trait">{item.trait}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PROCESS
          ================================================================ */}
      <section className="v10-section" id="process">
        <div className="v10-section-inner v10-reveal">
          <div className="v10-eyebrow">How it works</div>
          <h2 className="v10-h2">Five steps from data to&nbsp;decision.</h2>
          <p className="v10-desc">
            The Strategia Intelligence Cycle transforms unstructured hiring data
            into defensible, predictive decisions&nbsp;&mdash;&nbsp;end to end.
          </p>

          <div className="v10-steps">
            {[
              { num: 1, title: 'Ingest', desc: 'V-Parse normalizes resumes into structured, machine-readable data at scale.' },
              { num: 2, title: 'Screen', desc: 'V-Psych and V-Interview filter candidates using validated psychometrics and structured interviews.' },
              { num: 3, title: 'Verify', desc: 'V-Scenario tests real-world capability through role-specific simulations.' },
              { num: 4, title: 'Decide', desc: 'V-Insights compares candidates against high-performer benchmarks with full explainability.' },
              { num: 5, title: 'Integrate', desc: 'V-Onboarding generates tailored 90-day plans for every successful hire.' },
            ].map((step) => (
              <div key={step.num} className="v10-step">
                <div className="v10-step-num">{step.num}</div>
                <div className="v10-step-body">
                  <div className="v10-step-title">{step.title}</div>
                  <p className="v10-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SOLUTIONS
          ================================================================ */}
      <section className="v10-section v10-section--subtle" id="solutions">
        <div className="v10-section-inner v10-reveal">
          <div className="v10-eyebrow">Solutions</div>
          <h2 className="v10-h2">Adapted for your industry.</h2>
          <p className="v10-desc">
            Four verticals, one platform. Strategia adapts its modules and scoring
            models to the specific demands of your sector.
          </p>

          <div className="v10-solutions-grid">
            {[
              { name: 'Financial Services', desc: 'Screen for conscientiousness, ethical reasoning, and regulatory awareness across compliance, trading, and advisory positions.' },
              { name: 'Healthcare & Pharma', desc: 'Purpose-built for clinical and pharmaceutical roles where patient outcomes depend on the right people in the right positions.' },
              { name: 'Technology & Engineering', desc: 'Evaluate engineers on the skills that predict on-the-job performance: architecture thinking, collaborative problem-solving, and adaptability.' },
              { name: 'Government & Public Sector', desc: 'Fair, transparent, and audit-ready hiring processes that meet the highest standards of equity and procedural fairness.' },
            ].map((sol) => (
              <div key={sol.name} className="v10-solution-card">
                <div className="v10-solution-name">{sol.name}</div>
                <p className="v10-solution-desc">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          IMPACT
          ================================================================ */}
      <section className="v10-section v10-section--center">
        <div className="v10-section-inner v10-reveal">
          <div className="v10-quote-block">
            <div className="v10-quote-mark">&ldquo;</div>
            <p className="v10-quote-text">
              We reduced time-to-shortlist from three weeks to under a day. The
              psychometric layer flagged team-fit issues we would have missed entirely.
            </p>
            <div className="v10-quote-attr">
              <strong>VP of Talent Acquisition</strong>
              Fortune 500 Enterprise Client
            </div>
          </div>

          <div className="v10-stats-row">
            <div className="v10-stat">
              <div className="v10-stat-value">&lt; 24h</div>
              <div className="v10-stat-label">Time to shortlist</div>
            </div>
            <div className="v10-stat">
              <div className="v10-stat-value">80%</div>
              <div className="v10-stat-label">Recruiter time saved</div>
            </div>
            <div className="v10-stat">
              <div className="v10-stat-value">100%</div>
              <div className="v10-stat-label">Psychometric coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          ENTERPRISE + TRUST
          ================================================================ */}
      <section className="v10-section v10-section--subtle" id="enterprise">
        <div className="v10-section-inner v10-reveal">
          <div className="v10-eyebrow">Enterprise</div>
          <h2 className="v10-h2">Your data is sacred. We treat it that&nbsp;way.</h2>
          <p className="v10-desc">
            End-to-end encryption, ethical-AI framework, and full audit trails.
            Your data never trains our models.
          </p>

          <div className="v10-trust-cols">
            <div>
              {[
                { title: 'Data Sovereignty', desc: 'Azure-hosted with regional deployment options, encryption at rest and in transit, and zero sub-processor sharing.' },
                { title: 'White-Glove Implementation', desc: 'Dedicated implementation team, custom integration engineering, and a named account lead from day one.' },
                { title: 'Trust & Compliance', desc: 'Annual third-party audits, continuous vulnerability scanning, role-based access with SSO and MFA enforced by default.' },
              ].map((point) => (
                <div key={point.title} className="v10-trust-point">
                  <div className="v10-trust-point-title">{point.title}</div>
                  <p className="v10-trust-point-desc">{point.desc}</p>
                </div>
              ))}
            </div>
            <div className="v10-badges">
              {['ISO 27001', 'ISO 27701', 'SOC 2 Type II', 'GDPR', 'Azure Hosted', 'API-First'].map((label) => (
                <div key={label} className="v10-badge">
                  <svg className="v10-badge-icon" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2l5.5 2.5v4c0 3.5-2.3 6.4-5.5 7.4C5.8 14.9 3.5 12 3.5 8.5v-4L9 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M6.5 9.2l1.8 1.8 3.2-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          ROI CALCULATOR
          ================================================================ */}
      <section className="v10-section" id="roi">
        <div className="v10-section-inner v10-reveal">
          <div className="v10-eyebrow">ROI calculator</div>
          <h2 className="v10-h2">See the savings for your&nbsp;system.</h2>
          <p className="v10-desc">
            Three inputs. Conservative assumptions. A number you can take to
            your&nbsp;CFO.
          </p>

          <div className="v10-roi-grid">
            <div className="v10-roi-inputs">
              <div>
                <div className="v10-roi-input-header">
                  <span className="k">Total Employees</span>
                  <span className="v">{ftes.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  className="v10-roi-slider"
                  min={200} max={20000} step={100}
                  value={ftes}
                  onChange={(e) => setFtes(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="v10-roi-input-header">
                  <span className="k">Annual Turnover</span>
                  <span className="v">{turnover}%</span>
                </div>
                <input
                  type="range"
                  className="v10-roi-slider"
                  min={8} max={40} step={0.5}
                  value={turnover}
                  onChange={(e) => setTurnover(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="v10-roi-input-header">
                  <span className="k">Replacement Cost</span>
                  <span className="v">${(replacementCost / 1000).toFixed(0)}K</span>
                </div>
                <input
                  type="range"
                  className="v10-roi-slider"
                  min={30000} max={150000} step={1000}
                  value={replacementCost}
                  onChange={(e) => setReplacementCost(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="v10-roi-output">
              <div className="v10-roi-output-label">Projected annual savings</div>
              <div className="v10-roi-output-value">
                <span className="dollar">$</span>{bigValue}
              </div>
              <p className="v10-roi-output-sub">
                Based on a 26% reduction in avoidable attrition across
                comparable systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
          ================================================================ */}
      <section className="v10-cta-section" id="demo">
        <div className="v10-section-inner">
          <h2 className="v10-h2">Ready to see it?</h2>
          <p className="v10-desc">
            Strategia is secure, tested, and integration-ready. It enhances
            your internal capabilities, not replaces them.
          </p>
          <a href="#" className="v10-cta-btn">Request a demo &rarr;</a>
        </div>
      </section>

      {/* ================================================================
          FOOTER
          ================================================================ */}
      <footer className="v10-footer">
        <div className="v10-footer-inner">
          <div className="v10-footer-top">
            <div className="v10-footer-brand">
              <img src="/images/logos/STRATEGIA_INLINE_WHITE.svg" alt="Strategia" />
              <p>
                Workforce intelligence for organisations that refuse to accept
                guesswork as strategy.
              </p>
            </div>

            <div>
              <h5>Platform</h5>
              <ul>
                <li><a href="#">V-Parse</a></li>
                <li><a href="#">V-Psych</a></li>
                <li><a href="#">V-Interview</a></li>
                <li><a href="#">V-Scenario</a></li>
                <li><a href="#">V-Onboarding</a></li>
                <li><a href="#">V-Insights</a></li>
              </ul>
            </div>

            <div>
              <h5>Solutions</h5>
              <ul>
                <li><a href="#">Financial Services</a></li>
                <li><a href="#">Healthcare &amp; Pharma</a></li>
                <li><a href="#">Technology</a></li>
                <li><a href="#">Government</a></li>
              </ul>
            </div>

            <div>
              <h5>Company</h5>
              <ul>
                <li><a href="#">Science</a></li>
                <li><a href="#">Enterprise</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="v10-footer-bottom">
            <span>&copy; 2025 Strategia Intelligence Systems</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
