/**
 * Port interface for session storage operations.
 * Abstracts browser sessionStorage for testability.
 */
export interface ISessionStoragePort {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}
