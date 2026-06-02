'use client'

import { useState, useSyncExternalStore } from 'react'
import type { IQuestionnaireApiPort, ISessionStoragePort, INotificationPort } from '../ports'
import { defaultApiAdapter, defaultSessionAdapter, defaultNotificationAdapter } from '../container'

export interface UseQuestionnaireAccessReturn {
  isAuthenticated: boolean
  password: string
  setPassword: (password: string) => void
  isValidating: boolean
  handlePasswordSubmit: () => Promise<void>
}

/**
 * Port dependencies for useQuestionnaireAccess hook.
 * When omitted, production adapters from the composition root are used.
 */
export interface UseQuestionnaireAccessPorts {
  api?: IQuestionnaireApiPort
  session?: ISessionStoragePort
  notification?: INotificationPort
}

/**
 * Configuration for different access modes (public form vs admin dashboard).
 */
export interface UseQuestionnaireAccessConfig {
  /** Session storage key for persisting auth state */
  sessionKey: string
  /** Session storage key for the short-lived bearer token */
  tokenKey: string
  /** Which API method to call: 'validateAccess' for public, 'validateAdminAccess' for admin */
  apiMethod: 'validateAccess' | 'validateAdminAccess'
  /** Label shown in error messages (e.g. 'password' or 'access key') */
  credentialLabel?: string
}

function subscribeToSessionStorage(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  window.addEventListener('storage', onStoreChange)
  return () => window.removeEventListener('storage', onStoreChange)
}

/** Default config for public questionnaire access */
const PUBLIC_ACCESS_CONFIG: UseQuestionnaireAccessConfig = {
  sessionKey: 'questionnaire_access',
  tokenKey: 'questionnaire_access_token',
  apiMethod: 'validateAccess',
  credentialLabel: 'password',
}

/** Config for admin dashboard access */
export const ADMIN_ACCESS_CONFIG: UseQuestionnaireAccessConfig = {
  sessionKey: 'questionnaire_admin_auth',
  tokenKey: 'questionnaire_admin_auth_token',
  apiMethod: 'validateAdminAccess',
  credentialLabel: 'access key',
}

/**
 * Unified hook for questionnaire password-based access control.
 * Handles both public form access and admin dashboard access
 * via a config parameter.
 *
 * @param config - Access mode configuration. Defaults to public access.
 * @param ports - Optional port dependencies. Defaults to production adapters.
 */
export function useQuestionnaireAccess(
  config: UseQuestionnaireAccessConfig = PUBLIC_ACCESS_CONFIG,
  ports?: UseQuestionnaireAccessPorts
): UseQuestionnaireAccessReturn {
  const api = ports?.api ?? defaultApiAdapter
  const session = ports?.session ?? defaultSessionAdapter
  const notification = ports?.notification ?? defaultNotificationAdapter

  const storedAuthentication = useSyncExternalStore(
    subscribeToSessionStorage,
    () => {
      const authStatus = session.getItem(config.sessionKey)
      const accessToken = session.getItem(config.tokenKey)
      return authStatus === 'authorized' && Boolean(accessToken)
    },
    () => false
  )
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [isValidating, setIsValidating] = useState(false)

  const label = config.credentialLabel ?? 'password'

  const handlePasswordSubmit = async () => {
    if (!password) {
      notification.error(`Please enter ${label}`)
      return
    }

    setIsValidating(true)

    try {
      const result = await api[config.apiMethod](password)

      if (result.success && result.accessToken) {
        session.setItem(config.sessionKey, 'authorized')
        session.setItem(config.tokenKey, result.accessToken)
        setIsAuthenticated(true)
        notification.success('Access granted')
      } else {
        const errorMsg = result.message || `Invalid ${label}`
        notification.error(errorMsg)
        setPassword('')
      }
    } catch (error) {
      notification.error('Authentication failed')
      console.error('Auth error:', error)
    } finally {
      setIsValidating(false)
    }
  }

  return {
    isAuthenticated: isAuthenticated || storedAuthentication,
    password,
    setPassword,
    isValidating,
    handlePasswordSubmit,
  }
}
