import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { BrowserSessionAdapter } from '../browserSessionAdapter'

/**
 * Feature: questionnaire-hexagonal-refactoring, Property 5: Session storage round-trip
 * Validates: Requirements 2.2
 *
 * For any key string and any value string, calling setItem(key, value)
 * then getItem(key) should return the original value.
 */
describe('BrowserSessionAdapter', () => {
  it('Property 5: setItem then getItem returns the original value', () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), (key, value) => {
        const adapter = new BrowserSessionAdapter()

        adapter.setItem(key, value)
        const retrieved = adapter.getItem(key)

        expect(retrieved).toBe(value)
      }),
      { numRuns: 100 }
    )
  })
})
