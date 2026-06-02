import type { ISessionStoragePort } from '../ports'

/**
 * Adapter implementing ISessionStoragePort using browser sessionStorage.
 * Wraps calls in try/catch to handle restricted environments
 * (e.g. Safari private mode) where sessionStorage may throw.
 */
export class BrowserSessionAdapter implements ISessionStoragePort {
  getItem(key: string): string | null {
    try {
      return sessionStorage.getItem(key)
    } catch {
      return null
    }
  }

  setItem(key: string, value: string): void {
    try {
      sessionStorage.setItem(key, value)
    } catch {
      // Silently swallow — storage unavailable in this environment
    }
  }
}
