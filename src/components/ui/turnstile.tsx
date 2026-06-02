'use client'

import { useEffect, useRef } from 'react'

interface TurnstileProps {
  siteKey: string
  onVerify: (token: string) => void
  onError?: (errorCode?: string) => void
  onExpire?: () => void
}

type QuestionnaireTurnstile = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      callback: (token: string) => void
      'error-callback'?: (errorCode: string) => void
      'expired-callback'?: () => void
      theme?: 'light' | 'dark' | 'auto'
      size?: 'normal' | 'compact'
    }
  ) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

function getTurnstile(): QuestionnaireTurnstile | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }
  return window.turnstile as unknown as QuestionnaireTurnstile | undefined
}

export function Turnstile({ siteKey, onVerify, onError, onExpire }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const verifyRef = useRef(onVerify)
  const errorRef = useRef(onError)
  const expireRef = useRef(onExpire)

  useEffect(() => {
    verifyRef.current = onVerify
    errorRef.current = onError
    expireRef.current = onExpire
  }, [onVerify, onError, onExpire])

  useEffect(() => {
    const renderWidget = () => {
      const turnstile = getTurnstile()
      if (!containerRef.current || !turnstile || !siteKey || widgetIdRef.current) return

      widgetIdRef.current = turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token) => {
          verifyRef.current(token)
        },
        'error-callback': (errorCode) => {
          console.error('Turnstile error:', errorCode)
          errorRef.current?.(errorCode)
        },
        'expired-callback': () => {
          expireRef.current?.()
        },
        theme: 'light',
        size: 'normal',
      })
    }

    // Load Turnstile script if not already loaded
    if (!document.getElementById('turnstile-script')) {
      const script = document.createElement('script')
      script.id = 'turnstile-script'
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.onload = () => {
        // Wait a bit for turnstile to initialize
        setTimeout(renderWidget, 100)
      }
      document.head.appendChild(script)
    } else if (getTurnstile()) {
      renderWidget()
    }

    return () => {
      const turnstile = getTurnstile()
      if (widgetIdRef.current && turnstile) {
        turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [siteKey])

  return <div ref={containerRef} className="flex justify-center" />
}
