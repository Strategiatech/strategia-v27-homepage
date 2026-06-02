'use client'

import Link from 'next/link'
import { Lock, FileText, type LucideIcon } from 'lucide-react'

export interface QuestionnaireAccessScreenProps {
  password: string
  setPassword: (password: string) => void
  isValidating: boolean
  onSubmit: () => void
  /** Screen variant config — defaults to public questionnaire access */
  variant?: QuestionnaireAccessVariant
}

export interface QuestionnaireAccessVariant {
  icon?: LucideIcon
  title?: string
  description?: string
  inputLabel?: string
  inputPlaceholder?: string
  buttonLabel?: string
  validatingLabel?: string
}

const PUBLIC_VARIANT: Required<QuestionnaireAccessVariant> = {
  icon: Lock,
  title: 'Access Required',
  description: 'Enter the password to access the Discovery Questionnaire',
  inputLabel: 'Password',
  inputPlaceholder: 'Enter password',
  buttonLabel: 'Access Questionnaire',
  validatingLabel: 'Validating...',
}

export const ADMIN_VARIANT: QuestionnaireAccessVariant = {
  icon: FileText,
  title: 'Admin Access Required',
  description: 'Enter your access key to view questionnaire submissions',
  inputLabel: 'Access Key',
  inputPlaceholder: 'Enter access key',
  buttonLabel: 'Access Dashboard',
}

export function QuestionnaireAccessScreen({
  password,
  setPassword,
  isValidating,
  onSubmit,
  variant,
}: QuestionnaireAccessScreenProps) {
  const v = { ...PUBLIC_VARIANT, ...variant }

  return (
    <div style={{ minHeight: '100vh', background: '#fdfcfa', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{
        borderBottom: '1px solid #e8e2da',
        padding: '14px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(253,252,250,0.92)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: '#2a2520', letterSpacing: -0.5 }}>Strategia</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#b8a080', letterSpacing: 1 }}>DISCOVERY FORM</span>
        </div>
        <Link href="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#b8a080', letterSpacing: 1, textDecoration: 'none' }}>
          ← Back
        </Link>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '88px 32px' }}>
        <div style={{ background: '#fff', border: '1px solid #ebe6df', borderRadius: 12, padding: '36px 40px', boxShadow: '0 1px 4px rgba(42,37,32,0.04)' }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: '#b8a080', letterSpacing: 1 }}>00</span>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 600, color: '#2a2520', margin: 0, letterSpacing: -0.5 }}>{v.title}</h1>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#9a8e82', margin: 0, paddingLeft: 36, letterSpacing: 0.2 }}>{v.description}</p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              onSubmit()
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
          >
            <div>
              <label htmlFor="password" style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: '#6b6058', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 6 }}>
                {v.inputLabel}
              </label>
              <input
                type="text"
                name="username"
                autoComplete="username"
                value="strategia-questionnaire"
                readOnly
                hidden
              />
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder={v.inputPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isValidating}
                autoFocus
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #e0d8cf',
                  borderRadius: 6,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: '#2a2520',
                  background: '#faf8f5',
                  outline: 'none',
                  boxSizing: 'border-box',
                  height: 42,
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isValidating}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: '#fff',
                background: '#2a2520',
                border: 'none',
                borderRadius: 8,
                padding: '10px 28px',
                cursor: isValidating ? 'default' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {isValidating ? v.validatingLabel : v.buttonLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
