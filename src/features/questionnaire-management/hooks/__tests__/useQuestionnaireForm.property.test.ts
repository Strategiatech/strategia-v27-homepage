import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import * as fc from 'fast-check'
import { useQuestionnaireForm } from '../useQuestionnaireForm'
import { TOTAL_SECTIONS } from '../../constants/questionnaireFormConstants'
import type { QuestionnaireFormData } from '../../types/questionnaireForm'
import type { IQuestionnaireApiPort, INotificationPort } from '../../ports'

/**
 * Creates mock port implementations for testing.
 * This is the primary benefit of hexagonal architecture — no module mocking needed.
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

  return { mockApi, mockNotification }
}

/**
 * Array-typed fields in QuestionnaireFormData — used to partition
 * fields for Property 1 (string fields) vs Property 2 (array fields).
 */
const ARRAY_FIELDS: (keyof QuestionnaireFormData)[] = [
  'jobTypes',
  'jobAdvertisingPlatformSelections',
  'recruitmentAssessment',
  'internalStaffAssessment',
  'reportAccessRoles',
  'successCriteria',
]

/**
 * Scalar fields that are directly updated by handleInputChange without
 * auxiliary derived-state side effects.
 */
const INPUT_FIELDS: (keyof QuestionnaireFormData)[] = [
  'organisationName',
  'headOfficeRegion',
  'headOfficeLocation',
  'otherOfficeLocations',
  'industrySector',
  'organisationType',
  'hrRecruitmentStaffCount',
  'avgRecruiterSalary',
  'totalHiringManagers',
  'avgManagerSalary',
  'currencyCode',
  'keyContactPerson',
  'keyContactTitle',
  'keyContactDepartment',
  'contactEmail',
  'contactNumber',
  'totalRolesRecruited',
  'totalCVsReceived',
  'totalApplicationsReceived',
  'jobTypesOther',
  'forecastedRoles',
  'jobAdvertisingSpend',
  'jobAdvertisingPlatformsOther',
  'annualAgencySpend',
  'agencyVsInternalPercentage',
  'avgTimeToFill',
  'avgCostPerHire',
  'internalMobility',
  'deiPriorities',
  'talentChallenges',
  'currentATS',
  'currentHRIS',
  'payrollProvider',
  'lms',
  'performanceManagementSystem',
  'usePsychometricTools',
  'psychometricToolsUsed',
  'internalAssessmentUseCases',
  'reportAccessOther',
  'leadershipAssessmentInterest',
  'leadershipAssessmentNotes',
  'recruitmentAssessmentOther',
  'internalStaffDepartments',
  'workflowAdditionalNotes',
  'successCriteriaOther',
  'proposedStartDate',
  'pilotDuration',
  'regionsOffices',
  'businessUnitsInvolved',
  'approximateRoles',
  'pilotRolesDetails',
  'jobDescriptions',
  'projectedValueSummary',
  'signOffName',
  'signOffTitle',
  'signOffDate',
]

/**
 * Property 1: Input change field isolation
 * **Validates: Requirements 3.4**
 *
 * For any string-typed field in QuestionnaireFormData and for any string value,
 * calling handleInputChange with that field name and value should update only
 * that field in formData, leaving all other fields unchanged.
 */
describe('Property 1: Input change field isolation', () => {
  it('should update only the targeted string field and leave all others unchanged', () => {
    const { mockApi, mockNotification } = createMockPorts()

    fc.assert(
        fc.property(
        fc.constantFrom(...INPUT_FIELDS),
        fc.string({ minLength: 0, maxLength: 50 }),
        (fieldName, value) => {
          const { result } = renderHook(() =>
            useQuestionnaireForm({ api: mockApi, notification: mockNotification })
          )

          const prevFormData = { ...result.current.formData }

          act(() => {
            const syntheticEvent = {
              target: { name: fieldName, value },
            } as React.ChangeEvent<HTMLInputElement>
            result.current.handleInputChange(syntheticEvent)
          })

          // The targeted field should equal the new value
          expect(result.current.formData[fieldName]).toBe(value)

          // All other fields should remain unchanged
          for (const key of INPUT_FIELDS) {
            if (key !== fieldName) {
              expect(result.current.formData[key]).toEqual(prevFormData[key])
            }
          }
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Property 2: Checkbox toggle round-trip
 * **Validates: Requirements 3.5, 3.6**
 *
 * For any array field in QuestionnaireFormData and for any non-empty string value,
 * calling handleCheckboxChange(field, value, true) followed by
 * handleCheckboxChange(field, value, false) should restore the array to its
 * original state (the value should be absent after removal).
 */
describe('Property 2: Checkbox toggle round-trip', () => {
  it('should add value when checked=true and remove when checked=false', () => {
    const { mockApi, mockNotification } = createMockPorts()

    fc.assert(
      fc.property(
        fc.constantFrom(...ARRAY_FIELDS),
        fc.string({ minLength: 1, maxLength: 50 }),
        (fieldName, value) => {
          const { result } = renderHook(() =>
            useQuestionnaireForm({ api: mockApi, notification: mockNotification })
          )

          // Add the value
          act(() => {
            result.current.handleCheckboxChange(fieldName, value, true)
          })

          const arrayAfterAdd = result.current.formData[fieldName] as string[]
          expect(arrayAfterAdd).toContain(value)

          // Remove the value
          act(() => {
            result.current.handleCheckboxChange(fieldName, value, false)
          })

          const arrayAfterRemove = result.current.formData[fieldName] as string[]
          expect(arrayAfterRemove).not.toContain(value)
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Property 3: Section navigation bounds
 * **Validates: Requirements 3.7, 3.8**
 *
 * For any starting section value in [1, TOTAL_SECTIONS], calling goToNextSection
 * should produce min(current + 1, TOTAL_SECTIONS), and calling goToPreviousSection
 * should produce max(current - 1, 1).
 */
describe('Property 3: Section navigation bounds', () => {
  it(`goToNextSection should produce min(current + 1, ${TOTAL_SECTIONS})`, () => {
    const { mockApi, mockNotification } = createMockPorts()

    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: TOTAL_SECTIONS }),
        (startSection) => {
          const { result } = renderHook(() =>
            useQuestionnaireForm({ api: mockApi, notification: mockNotification })
          )

          act(() => {
            result.current.setCurrentSection(startSection)
          })
          expect(result.current.currentSection).toBe(startSection)

          act(() => {
            result.current.goToNextSection()
          })
          expect(result.current.currentSection).toBe(Math.min(startSection + 1, TOTAL_SECTIONS))
        }
      ),
      { numRuns: 100 }
    )
  })

  it('goToPreviousSection should produce max(current - 1, 1)', () => {
    const { mockApi, mockNotification } = createMockPorts()

    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: TOTAL_SECTIONS }),
        (startSection) => {
          const { result } = renderHook(() =>
            useQuestionnaireForm({ api: mockApi, notification: mockNotification })
          )

          act(() => {
            result.current.setCurrentSection(startSection)
          })
          expect(result.current.currentSection).toBe(startSection)

          act(() => {
            result.current.goToPreviousSection()
          })
          expect(result.current.currentSection).toBe(Math.max(startSection - 1, 1))
        }
      ),
      { numRuns: 100 }
    )
  })

  it('setCurrentSection(n) for any n in [1, 9] should set the section to n', () => {
    const { mockApi, mockNotification } = createMockPorts()

    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: TOTAL_SECTIONS }),
        (section) => {
          const { result } = renderHook(() =>
            useQuestionnaireForm({ api: mockApi, notification: mockNotification })
          )

          act(() => {
            result.current.setCurrentSection(section)
          })
          expect(result.current.currentSection).toBe(section)
        }
      ),
      { numRuns: 100 }
    )
  })
})


/**
 * Property 4: Hooks delegate to injected ports
 * **Validates: Requirements 3.1, 3.2**
 *
 * For any mock implementation of IQuestionnaireApiPort and INotificationPort,
 * when useQuestionnaireForm is called with those mocks and handleSubmit is invoked
 * with a valid turnstile token, the hook should call submitQuestionnaire on the
 * injected API port. Notification calls should go through the injected notification port.
 */
describe('Property 4: Hooks delegate to injected ports', () => {
  it('should call api.submitQuestionnaire on the injected port when submitting with a valid token', async () => {
    const { mockApi, mockNotification } = createMockPorts()

    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 100 }),
        async (token) => {
          // Reset mocks for each iteration
          vi.mocked(mockApi.submitQuestionnaire).mockClear()
          vi.mocked(mockApi.submitQuestionnaire).mockResolvedValue({ success: true, submissionId: 42 })
          vi.mocked(mockNotification.loading).mockClear()
          vi.mocked(mockNotification.loading).mockReturnValue('toast-id')
          vi.mocked(mockNotification.dismiss).mockClear()
          vi.mocked(mockNotification.success).mockClear()

          const { result } = renderHook(() =>
            useQuestionnaireForm({ api: mockApi, notification: mockNotification })
          )

          // Set a turnstile token so submission proceeds
          act(() => {
            result.current.handleTurnstileVerify(token)
          })
          act(() => {
            result.current.setAuthorityConfirmed(true)
          })

          // Submit the form
          await act(async () => {
            await result.current.handleSubmit({
              preventDefault: vi.fn(),
            } as unknown as React.FormEvent)
          })

          // API port should have been called with form data and the token
          expect(mockApi.submitQuestionnaire).toHaveBeenCalledOnce()
          expect(mockApi.submitQuestionnaire).toHaveBeenCalledWith(
            expect.objectContaining({ organisationName: '' }),
            token
          )

          // Notification port should have been used for loading + dismiss + success
          expect(mockNotification.loading).toHaveBeenCalledOnce()
          expect(mockNotification.dismiss).toHaveBeenCalledWith('toast-id')
          expect(mockNotification.success).toHaveBeenCalledOnce()
        }
      ),
      { numRuns: 20 }
    )
  })

  it('should call notification.error on the injected port when turnstile token is empty', () => {
    const { mockApi, mockNotification } = createMockPorts()

    const { result } = renderHook(() =>
      useQuestionnaireForm({ api: mockApi, notification: mockNotification })
    )

    act(() => {
      result.current.setAuthorityConfirmed(true)
    })

    // Submit without setting a turnstile token
    act(() => {
      result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent)
    })

    // API should NOT have been called
    expect(mockApi.submitQuestionnaire).not.toHaveBeenCalled()

    // Notification error should have been called on the injected port
    expect(mockNotification.error).toHaveBeenCalledWith('Please complete the bot verification')
  })
})
