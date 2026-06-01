'use client'

import { useEffect, useRef } from 'react'

type TurnstileCallbacks = {
  onVerify: (token: string) => void
  onExpire: () => void
  onError: () => void
}

type TurnstileWidgetOptions = {
  sitekey: string
  theme: 'dark' | 'light' | 'auto'
  callback: (token: string) => void
  'expired-callback': () => void
  'error-callback': () => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileWidgetOptions) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

const TURNSTILE_SCRIPT_ID = 'strategia-turnstile-script'
const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

export default function VxTurnstile({
  siteKey,
  onVerify,
  onExpire,
  onError,
  resetKey,
}: {
  siteKey: string
  onVerify: (token: string) => void
  onExpire: () => void
  onError: () => void
  resetKey: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const callbacksRef = useRef<TurnstileCallbacks>({ onVerify, onExpire, onError })

  useEffect(() => {
    callbacksRef.current = { onVerify, onExpire, onError }
  }, [onVerify, onExpire, onError])

  useEffect(() => {
    if (!siteKey || typeof window === 'undefined') return

    let cancelled = false
    let scriptEl = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null

    const renderWidget = () => {
      if (cancelled || widgetIdRef.current || !containerRef.current || !window.turnstile) return

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'dark',
        callback: (token) => callbacksRef.current.onVerify(token),
        'expired-callback': () => callbacksRef.current.onExpire(),
        'error-callback': () => callbacksRef.current.onError(),
      })
    }

    if (!scriptEl) {
      scriptEl = document.createElement('script')
      scriptEl.id = TURNSTILE_SCRIPT_ID
      scriptEl.src = TURNSTILE_SCRIPT_SRC
      scriptEl.async = true
      scriptEl.defer = true
      scriptEl.onload = renderWidget
      scriptEl.onerror = () => callbacksRef.current.onError()
      document.head.appendChild(scriptEl)
    } else if (window.turnstile) {
      renderWidget()
    } else {
      scriptEl.addEventListener('load', renderWidget)
      scriptEl.addEventListener('error', callbacksRef.current.onError)
    }

    return () => {
      cancelled = true
      if (scriptEl) {
        scriptEl.removeEventListener('load', renderWidget)
        scriptEl.removeEventListener('error', callbacksRef.current.onError)
      }
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [siteKey])

  useEffect(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }, [resetKey])

  return <div className="vx-turnstile" ref={containerRef} />
}
