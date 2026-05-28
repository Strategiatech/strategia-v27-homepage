'use client'

import { useMemo, useState } from 'react'
import './demo.css'

type FormState = {
  fullName: string
  workEmail: string
  phone: string
  company: string
  role: string
  teamSize: string
  message: string
  consent: boolean
}

type FieldKey = keyof Omit<FormState, 'consent'>
type Errors = Partial<Record<keyof FormState, string>>

const initialState: FormState = {
  fullName: '',
  workEmail: '',
  phone: '',
  company: '',
  role: '',
  teamSize: '',
  message: '',
  consent: false,
}

const TEAM_SIZE_OPTIONS = [
  { value: '', label: 'Select team size' },
  { value: '200-500', label: '200 to 500 FTEs' },
  { value: '500-1000', label: '500 to 1,000 FTEs' },
  { value: '1000-3000', label: '1,000 to 3,000 FTEs' },
  { value: '3000-10000', label: '3,000 to 10,000 FTEs' },
  { value: '10000+', label: '10,000 plus FTEs' },
]

const ROLE_OPTIONS = [
  { value: '', label: 'Select role' },
  { value: 'ceo', label: 'CEO / President' },
  { value: 'chro', label: 'CHRO / CPO' },
  { value: 'cmo-cno', label: 'CMO / CNO / Clinical Chief' },
  { value: 'cfo-coo', label: 'CFO / COO' },
  { value: 'talent', label: 'VP / Director, Talent or Recruiting' },
  { value: 'hrbp', label: 'HRBP / People Operations' },
  { value: 'other', label: 'Other' },
]

// Email: standard structural check. Not RFC-perfect; rejects obvious garbage.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Free-text personal-email domains are blocked because this is for B2B demos.
const PERSONAL_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
])

function validateField(field: FieldKey, value: string): string {
  const v = value.trim()
  switch (field) {
    case 'fullName':
      if (!v) return 'Please enter your full name.'
      if (v.length < 2) return 'Name looks too short.'
      return ''
    case 'workEmail': {
      if (!v) return 'Work email is required.'
      if (!EMAIL_RE.test(v)) return 'Enter a valid email address.'
      const domain = v.split('@')[1]?.toLowerCase() ?? ''
      if (PERSONAL_EMAIL_DOMAINS.has(domain)) {
        return 'Please use a work email, not a personal one.'
      }
      return ''
    }
    case 'phone': {
      if (!v) return 'Phone number is required.'
      // Allow digits, spaces, dashes, parens, dots, and a leading +.
      if (!/^[+\d\s().\-]+$/.test(v)) {
        return 'Phone can only contain digits, spaces, and + ( ) . -'
      }
      const digits = v.replace(/\D/g, '')
      if (digits.length < 7) return 'Phone number is too short.'
      if (digits.length > 15) return 'Phone number is too long.'
      return ''
    }
    case 'company':
      if (!v) return 'Company name is required.'
      return ''
    case 'role':
      if (!v) return 'Please select a role.'
      return ''
    case 'teamSize':
      return ''
    case 'message':
      return ''
    default:
      return ''
  }
}

function validateAll(state: FormState): Errors {
  const errors: Errors = {}
  ;(Object.keys(initialState) as Array<keyof FormState>).forEach((key) => {
    if (key === 'consent') {
      if (!state.consent) errors.consent = 'Please agree to be contacted.'
      return
    }
    const msg = validateField(key, state[key] as string)
    if (msg) errors[key] = msg
  })
  return errors
}

export default function DemoPage() {
  const [state, setState] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ticket, setTicket] = useState<string>('')

  const formIsClean = useMemo(() => {
    return Object.values(errors).every((e) => !e)
  }, [errors])

  function fieldIsValid(key: FieldKey): boolean {
    if (!touched[key]) return false
    const value = (state[key] as string).trim()
    if (!value) return false
    return !validateField(key, value)
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }))
    if (touched[key]) {
      const msg =
        key === 'consent'
          ? value ? '' : 'Please agree to be contacted.'
          : validateField(key as FieldKey, value as string)
      setErrors((e) => ({ ...e, [key]: msg }))
    }
  }

  function blur<K extends keyof FormState>(key: K) {
    setTouched((t) => ({ ...t, [key]: true }))
    const value = state[key]
    const msg =
      key === 'consent'
        ? value ? '' : 'Please agree to be contacted.'
        : validateField(key as FieldKey, value as string)
    setErrors((e) => ({ ...e, [key]: msg }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const allErrors = validateAll(state)
    setErrors(allErrors)
    setTouched({
      fullName: true,
      workEmail: true,
      phone: true,
      company: true,
      role: true,
      teamSize: true,
      message: true,
      consent: true,
    })
    if (Object.values(allErrors).some((m) => m)) {
      const firstBad = Object.entries(allErrors).find(([, v]) => v)?.[0]
      if (firstBad) {
        const el = document.getElementById(`demo-${firstBad}`)
        el?.focus()
      }
      return
    }
    setSubmitting(true)
    // Simulate a network round-trip so the loading state is perceptible.
    await new Promise((r) => setTimeout(r, 900))
    const id = `STR-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.floor(
      Date.now() / 1000,
    )
      .toString(36)
      .toUpperCase()
      .slice(-4)}`
    setTicket(id)
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <main className="demo">
      <header className="demo-header">
        <a className="demo-header-logo" href="/vx" aria-label="Strategia home">
          <img
            src="/images/brand/glow/inline/strategia-final-logo-strategia-inline-white-glow.png"
            alt="Strategia"
            width="442"
            height="96"
          />
        </a>
        <a className="demo-header-back" href="/vx">
          <span aria-hidden="true">←</span> Back to Strategia
        </a>
      </header>
      <div className="demo-wrap">
        {/* ---------- Left: pitch ---------- */}
        <section className="demo-intro">
          <span className="demo-intro-eyebrow">Book a demo</span>
          <h1>
            See your workforce <span className="accent">decoded</span> in
            45 minutes.
          </h1>
          <p>
            A working session with a Strategia engineer. We map your role
            families, walk the engine end to end, and benchmark a real
            requisition against your current process.
          </p>
          <ul className="demo-intro-list">
            <li>
              <CheckIcon />
              <span>
                Live walk-through of V-Parse, V-Psych, V-Interview, and V-Fit
                on your own job spec.
              </span>
            </li>
            <li>
              <CheckIcon />
              <span>
                Projected savings model calibrated to your FTE base and
                turnover.
              </span>
            </li>
            <li>
              <CheckIcon />
              <span>
                Security and compliance briefing: SOC 2, HIPAA, HITRUST,
                EEOC.
              </span>
            </li>
          </ul>
          <p className="demo-intro-meta">
            Most calls confirm within one business day. If you need a
            tighter window, mention it in the message field and we will work
            around your calendar.
          </p>
        </section>

        {/* ---------- Right: form card ---------- */}
        <section className="demo-card" aria-live="polite">
          {!submitted ? (
            <>
              <h2 className="demo-card-title">Request your session</h2>
              <p className="demo-card-sub">
                Fields marked with a teal dot are required. We will never
                share your details.
              </p>
              <form
                className="demo-form"
                noValidate
                onSubmit={onSubmit}
                aria-describedby="demo-form-footnote"
              >
                <Field
                  id="demo-fullName"
                  label="Full name"
                  required
                  error={touched.fullName ? errors.fullName : ''}
                  valid={fieldIsValid('fullName')}
                >
                  <input
                    id="demo-fullName"
                    className="demo-input"
                    type="text"
                    autoComplete="name"
                    placeholder="Alex Morgan"
                    value={state.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    onBlur={() => blur('fullName')}
                    aria-invalid={Boolean(touched.fullName && errors.fullName)}
                  />
                </Field>

                <Field
                  id="demo-workEmail"
                  label="Work email"
                  required
                  error={touched.workEmail ? errors.workEmail : ''}
                  valid={fieldIsValid('workEmail')}
                >
                  <input
                    id="demo-workEmail"
                    className="demo-input"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="alex@yourhealth.org"
                    value={state.workEmail}
                    onChange={(e) => update('workEmail', e.target.value)}
                    onBlur={() => blur('workEmail')}
                    aria-invalid={Boolean(touched.workEmail && errors.workEmail)}
                  />
                </Field>

                <Field
                  id="demo-phone"
                  label="Phone"
                  required
                  error={touched.phone ? errors.phone : ''}
                  valid={fieldIsValid('phone')}
                >
                  <input
                    id="demo-phone"
                    className="demo-input"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+1 (555) 123 4567"
                    value={state.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    onBlur={() => blur('phone')}
                    aria-invalid={Boolean(touched.phone && errors.phone)}
                  />
                </Field>

                <Field
                  id="demo-company"
                  label="Organization"
                  required
                  error={touched.company ? errors.company : ''}
                  valid={fieldIsValid('company')}
                >
                  <input
                    id="demo-company"
                    className="demo-input"
                    type="text"
                    autoComplete="organization"
                    placeholder="Your health system"
                    value={state.company}
                    onChange={(e) => update('company', e.target.value)}
                    onBlur={() => blur('company')}
                    aria-invalid={Boolean(touched.company && errors.company)}
                  />
                </Field>

                <Field
                  id="demo-role"
                  label="Role"
                  required
                  error={touched.role ? errors.role : ''}
                  valid={fieldIsValid('role')}
                  isSelect
                >
                  <select
                    id="demo-role"
                    className="demo-select"
                    value={state.role}
                    onChange={(e) => update('role', e.target.value)}
                    onBlur={() => blur('role')}
                    aria-invalid={Boolean(touched.role && errors.role)}
                  >
                    {ROLE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  id="demo-teamSize"
                  label="Team size"
                  valid={Boolean(state.teamSize)}
                  isSelect
                >
                  <select
                    id="demo-teamSize"
                    className="demo-select"
                    value={state.teamSize}
                    onChange={(e) => update('teamSize', e.target.value)}
                  >
                    {TEAM_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  id="demo-message"
                  label="Anything we should know?"
                  valid={state.message.trim().length >= 4}
                  isTextarea
                >
                  <textarea
                    id="demo-message"
                    className="demo-textarea"
                    placeholder="The role family you want benchmarked, regulatory constraints, timing, etc."
                    value={state.message}
                    onChange={(e) => update('message', e.target.value)}
                    maxLength={1000}
                  />
                </Field>

                <label className="demo-consent">
                  <input
                    type="checkbox"
                    checked={state.consent}
                    onChange={(e) => update('consent', e.target.checked)}
                    onBlur={() => blur('consent')}
                    aria-invalid={Boolean(touched.consent && errors.consent)}
                  />
                  <span>
                    I agree that Strategia may contact me about this demo
                    request and store the information above for that
                    purpose. See our{' '}
                    <a href="/vx/privacy-policy">privacy policy</a>.
                  </span>
                </label>
                {touched.consent && errors.consent ? (
                  <div className="demo-error" role="alert">
                    {errors.consent}
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="demo-submit"
                  disabled={submitting}
                >
                  {submitting ? 'Sending request' : 'Request demo'}
                  <span aria-hidden="true">{submitting ? '' : '→'}</span>
                </button>
                <p className="demo-form-footnote" id="demo-form-footnote">
                  Average response time: under one business day.
                </p>
                {!formIsClean && Object.keys(touched).length > 0 ? (
                  <p className="demo-form-footnote" role="status">
                    Please correct the highlighted fields above.
                  </p>
                ) : null}
              </form>
            </>
          ) : (
            <div className="demo-success">
              <img
                src="/images/brand/glow/stacked/strategia-stacked-white-glow.png"
                alt="Strategia"
                className="demo-success-logo"
                width="120"
                height="84"
              />
              <div className="demo-success-icon" aria-hidden="true">
                <CheckBigIcon />
              </div>
              <h2>Request received.</h2>
              <p>
                Thanks, {state.fullName.split(' ')[0]}. A Strategia engineer
                will reach out to {state.workEmail} within one business day
                to confirm a 45 minute working session.
              </p>
              <div className="demo-success-meta">
                <div className="demo-success-meta-row">
                  <span>Reference</span>
                  <span>{ticket}</span>
                </div>
                <div className="demo-success-meta-row">
                  <span>Organization</span>
                  <span>{state.company}</span>
                </div>
                <div className="demo-success-meta-row">
                  <span>Next step</span>
                  <span>Calendar invite by email</span>
                </div>
              </div>
              <a href="/vx" className="demo-success-back">
                Back to Strategia
              </a>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

/* ---------- Helpers ---------- */

function Field({
  id,
  label,
  required,
  error,
  valid,
  isSelect,
  isTextarea,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  valid?: boolean
  isSelect?: boolean
  isTextarea?: boolean
  children: React.ReactNode
}) {
  const showTick = Boolean(valid) && !error
  const cls =
    'demo-field' +
    (error ? ' invalid' : '') +
    (showTick ? ' valid' : '') +
    (isSelect ? ' is-select' : '') +
    (isTextarea ? ' is-textarea' : '')
  return (
    <div className={cls}>
      <label className="demo-label" htmlFor={id}>
        {label}
        {required ? <span className="req" aria-hidden="true">●</span> : null}
      </label>
      <div className="demo-input-wrap">
        {children}
        {showTick ? <ValidTickIcon /> : null}
      </div>
      <div className="demo-error" role={error ? 'alert' : undefined}>
        {error || ' '}
      </div>
    </div>
  )
}

function ValidTickIcon() {
  return (
    <svg
      className="demo-valid-tick"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" fill="rgba(161, 226, 183, 0.18)" stroke="#A1E2B7" strokeWidth="1.2" />
      <path
        d="M5.5 10.5L8.5 13.5L14.5 7"
        stroke="#A1E2B7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 9.5L7 13L14.5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckBigIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 14.5L11.5 20L22.5 9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
