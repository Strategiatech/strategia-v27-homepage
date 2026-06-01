'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import VxNav from '@/components/vx/VxNav'
import VxFooter from '@/components/vx/VxFooter'

/* eslint-disable @next/next/no-img-element */

type FormState = {
  name: string
  email: string
  company: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', company: '', message: '' }

// Inline style tokens for the form. v25.css has no .v25-input, so these are
// hand-rolled against the same token palette used elsewhere.
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'rgba(255, 255, 255, 0.65)',
  marginBottom: 10,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  borderRadius: 10,
  padding: '14px 16px',
  fontFamily: 'var(--font-inter, "Inter", system-ui, sans-serif)',
  fontSize: 15,
  color: '#ffffff',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
  WebkitAppearance: 'none',
  appearance: 'none',
}

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 160,
  resize: 'vertical',
  lineHeight: 1.55,
  fontFamily: 'var(--font-inter, "Inter", system-ui, sans-serif)',
}

export default function VxContactBody() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.v25-reveal')
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

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="v25 v25--complete">
      <VxNav />

      {/* HERO */}
      <section className="v25-section" style={{ paddingTop: 'clamp(140px, 18vw, 220px)' }}>
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">Get in touch</div>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Literata", Georgia, serif)',
              fontSize: 'clamp(2.5rem, 6.4vw, 5.6rem)',
              fontWeight: 400,
              lineHeight: 0.98,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0 0 2rem',
              maxWidth: '18ch',
              textWrap: 'balance',
            }}
          >
            Let&rsquo;s <span className="accent accent--teal">talk.</span>
          </h1>
          <p className="v25-desc" style={{ maxWidth: '56ch', fontSize: '1.15rem' }}>
            Ready to transform your hiring process? Tell us about your needs and we will show
            you how Strategia can help. Most demos run thirty minutes against your own roles,
            no slides.
          </p>
        </div>
      </section>

      {/* FORM CARD */}
      <section className="v25-section" style={{ paddingTop: 0 }} id="form">
        <div className="v25-section-inner v25-reveal">
          <div
            style={{
              maxWidth: 720,
              margin: '0 auto',
              border: '1px solid rgba(255, 255, 255, 0.10)',
              borderRadius: 24,
              background: 'rgba(255, 255, 255, 0.04)',
              padding: 'clamp(28px, 4vw, 48px)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {submitted ? (
              <div role="status" aria-live="polite">
                <div
                  className="v25-eyebrow"
                  style={{ marginBottom: 16, color: 'var(--v25-accent-text, #A5DCD0)' }}
                >
                  Message received
                </div>
                <h2 className="v25-h2" style={{ marginBottom: 16 }}>
                  Thank you for{' '}
                  <span className="accent accent--teal">reaching out.</span>
                </h2>
                <p className="v25-desc" style={{ maxWidth: '52ch' }}>
                  Our team will get back to you within 24 hours. In the meantime, you can browse
                  the platform overview or read the methodology.
                </p>
                <div className="v25-hero-actions" style={{ marginTop: 32 }}>
                  <Link href="/vx/platform" className="v25-btn-primary">
                    See the platform
                  </Link>
                  <Link href="/vx/science" className="v25-link-arrow">
                    Read the science<span aria-hidden="true"> ↗</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div
                  className="v25-eyebrow"
                  style={{ marginBottom: 20 }}
                >
                  Contact form &middot; Direct to the team
                </div>

                <div style={{ display: 'grid', gap: 20 }}>
                  <div>
                    <label htmlFor="contact-name" style={labelStyle}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange('name')}
                      style={inputStyle}
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" style={labelStyle}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange('email')}
                      style={inputStyle}
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-company" style={labelStyle}>
                      Company (Optional)
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      placeholder="Your company name"
                      value={form.company}
                      onChange={handleChange('company')}
                      style={inputStyle}
                      autoComplete="organization"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" style={labelStyle}>
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      placeholder="Tell us about your hiring challenges and what you're looking for..."
                      value={form.message}
                      onChange={handleChange('message')}
                      style={textareaStyle}
                      rows={6}
                    />
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <button
                      type="submit"
                      className="v25-btn-primary"
                      style={{
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-inter, "Inter", system-ui, sans-serif)',
                      }}
                    >
                      Submit enquiry
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="v25-section v25-section--light" id="what-next">
        <div className="v25-section-inner v25-reveal">
          <div className="v25-eyebrow">What happens next</div>
          <h2 className="v25-h2">
            A real conversation, on{' '}
            <span className="accent accent--teal">your timeline</span>.
          </h2>
          <p className="v25-desc" style={{ maxWidth: '60ch', marginTop: 16 }}>
            We reply to every enquiry within one business day. If a demo is the right next step
            we run a focused thirty minute session against a role of your choice, with the
            validity report attached.
          </p>

          <div className="v25-science-grid" style={{ marginTop: 48 }}>
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">24h</span>
                <span className="evidence">SLA</span>
              </div>
              <div className="label">First response</div>
              <div className="sub">
                A human reply within one business day, weekends excepted.
              </div>
            </div>
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">30 min</span>
                <span className="evidence">Demo</span>
              </div>
              <div className="label">Working session</div>
              <div className="sub">
                A focused demo on a role of your choice. No slides, no decks.
              </div>
            </div>
            <div className="v25-science-stat">
              <div className="v25-science-stat-header">
                <span className="value">NDA</span>
                <span className="evidence">Trust</span>
              </div>
              <div className="label">Discovery, protected</div>
              <div className="sub">
                Mutual NDA available before any role data or specs are shared.
              </div>
            </div>
          </div>
        </div>
      </section>

      <VxFooter />
    </div>
  )
}
