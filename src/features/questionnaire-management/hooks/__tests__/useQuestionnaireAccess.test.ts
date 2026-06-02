import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useQuestionnaireAccess } from '../useQuestionnaireAccess'
import type { IQuestionnaireApiPort, ISessionStoragePort, INotificationPort } from '../../ports'

/**
 * Creates mock port implementations for testing useQuestionnaireAccess.
 */
function createMockPorts() {
  const mockApi: IQuestionnaireApiPort = {
    submitQuestionnaire: vi.fn().mockResolvedValue({ success: true, submissionId: 1 }),
    validateAccess: vi.fn().mockResolvedValue({ success: true }),
    validateAdminAccess: vi.fn().mockResolvedValue({ success: true }),
    fetchSubmissions: vi.fn().mockResolvedValue([]),
  }

  const mockNotification: INotificationPort = {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn().mockReturnValue('toast-id'),
    dismiss: vi.fn(),
  }

  const mockSession: ISessionStoragePort = {
    getItem: vi.fn().mockReturnValue(null),
    setItem: vi.fn(),
  }

  return { mockApi, mockNotification, mockSession }
}

/**
 * Unit tests for useQuestionnaireAccess hook with mock ports.
 * Validates: Requirements 3.12, 3.13, 3.14
 */
describe('useQuestionnaireAccess', () => {
  /**
   * Test empty password validation (edge case from 3.12)
   * **Validates: Requirements 3.12**
   */
  describe('empty password validation', () => {
    it('should show error notification and not call API when password is empty', async () => {
      const { mockApi, mockNotification, mockSession } = createMockPorts()

      const { result } = renderHook(() =>
        useQuestionnaireAccess(undefined, {
          api: mockApi,
          session: mockSession,
          notification: mockNotification,
        })
      )

      // Password is empty by default
      await act(async () => {
        await result.current.handlePasswordSubmit()
      })

      expect(mockNotification.error).toHaveBeenCalledWith('Please enter password')
      expect(mockApi.validateAccess).not.toHaveBeenCalled()
    })
  })

  /**
   * Test successful access flow with mock API and session ports (3.13)
   * **Validates: Requirements 3.13**
   */
  describe('successful access flow', () => {
    it('should persist auth state via session port and set isAuthenticated to true', async () => {
      const { mockApi, mockNotification, mockSession } = createMockPorts()
      vi.mocked(mockApi.validateAccess).mockResolvedValue({ success: true })

      const { result } = renderHook(() =>
        useQuestionnaireAccess(undefined, {
          api: mockApi,
          session: mockSession,
          notification: mockNotification,
        })
      )

      act(() => {
        result.current.setPassword('correct-password')
      })

      await act(async () => {
        await result.current.handlePasswordSubmit()
      })

      expect(mockApi.validateAccess).toHaveBeenCalledWith('correct-password')
      expect(mockSession.setItem).toHaveBeenCalledWith('questionnaire_access', 'authorized')
      expect(result.current.isAuthenticated).toBe(true)
      expect(mockNotification.success).toHaveBeenCalledWith('Access granted')
    })

    it('should show error and reset password when API returns failure', async () => {
      const { mockApi, mockNotification, mockSession } = createMockPorts()
      vi.mocked(mockApi.validateAccess).mockResolvedValue({
        success: false,
        message: 'Wrong password',
      })

      const { result } = renderHook(() =>
        useQuestionnaireAccess(undefined, {
          api: mockApi,
          session: mockSession,
          notification: mockNotification,
        })
      )

      act(() => {
        result.current.setPassword('wrong-password')
      })

      await act(async () => {
        await result.current.handlePasswordSubmit()
      })

      expect(mockNotification.error).toHaveBeenCalledWith('Wrong password')
      expect(mockSession.setItem).not.toHaveBeenCalled()
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.password).toBe('')
    })

    it('should show generic error when API throws', async () => {
      const { mockApi, mockNotification, mockSession } = createMockPorts()
      vi.mocked(mockApi.validateAccess).mockRejectedValue(new Error('Network error'))

      const { result } = renderHook(() =>
        useQuestionnaireAccess(undefined, {
          api: mockApi,
          session: mockSession,
          notification: mockNotification,
        })
      )

      act(() => {
        result.current.setPassword('some-password')
      })

      await act(async () => {
        await result.current.handlePasswordSubmit()
      })

      expect(mockNotification.error).toHaveBeenCalledWith('Authentication failed')
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.isValidating).toBe(false)
    })
  })

  /**
   * Test initialization reads from session port (3.14)
   * **Validates: Requirements 3.14**
   */
  describe('initialization from session', () => {
    it('should set isAuthenticated to true when session has authorized status', () => {
      const { mockApi, mockNotification, mockSession } = createMockPorts()
      vi.mocked(mockSession.getItem).mockReturnValue('authorized')

      const { result } = renderHook(() =>
        useQuestionnaireAccess(undefined, {
          api: mockApi,
          session: mockSession,
          notification: mockNotification,
        })
      )

      expect(mockSession.getItem).toHaveBeenCalledWith('questionnaire_access')
      expect(result.current.isAuthenticated).toBe(true)
    })

    it('should remain unauthenticated when session has no auth status', () => {
      const { mockApi, mockNotification, mockSession } = createMockPorts()
      vi.mocked(mockSession.getItem).mockReturnValue(null)

      const { result } = renderHook(() =>
        useQuestionnaireAccess(undefined, {
          api: mockApi,
          session: mockSession,
          notification: mockNotification,
        })
      )

      expect(mockSession.getItem).toHaveBeenCalledWith('questionnaire_access')
      expect(result.current.isAuthenticated).toBe(false)
    })
  })
})
