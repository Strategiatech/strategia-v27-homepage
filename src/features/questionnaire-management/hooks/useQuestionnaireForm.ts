'use client'

import { useState, useCallback } from 'react'
import type { IQuestionnaireApiPort, INotificationPort } from '../ports'
import { defaultApiAdapter, defaultNotificationAdapter } from '../container'
import { INITIAL_FORM_DATA, TOTAL_SECTIONS } from '../constants/questionnaireFormConstants'
import type { QuestionnaireFormData } from '../types/questionnaireForm'
import { calculateTurnoverRate } from '../utils/questionnaireSerializers'

export interface UseQuestionnaireFormPorts {
  api?: IQuestionnaireApiPort
  notification?: INotificationPort
}

export interface UseQuestionnaireFormReturn {
  formData: QuestionnaireFormData
  currentSection: number
  termsAccepted: boolean
  authorityConfirmed: boolean
  isSubmitted: boolean
  submissionId: number | null
  turnstileToken: string | null
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleCheckboxChange: (field: keyof QuestionnaireFormData, value: string, checked: boolean) => void
  setFieldValue: <K extends keyof QuestionnaireFormData>(field: K, value: QuestionnaireFormData[K]) => void
  setTermsAccepted: (accepted: boolean) => void
  setAuthorityConfirmed: (accepted: boolean) => void
  setCurrentSection: (section: number) => void
  goToNextSection: () => void
  goToPreviousSection: () => void
  handleTurnstileVerify: (token: string) => void
  handleTurnstileError: () => void
  handleTurnstileExpire: () => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
}

const withDerivedValues = (prev: QuestionnaireFormData, name: string, value: string): QuestionnaireFormData => {
  const next = {
    ...prev,
    [name]: value,
  } as QuestionnaireFormData

  if (name === 'annualEmployeeExits' || name === 'totalInternalStaff') {
    next.annualTurnoverRate = calculateTurnoverRate(
      name === 'annualEmployeeExits' ? value : prev.annualEmployeeExits,
      name === 'totalInternalStaff' ? value : prev.totalInternalStaff
    )
  }

  return next
}

export function useQuestionnaireForm(
  ports?: UseQuestionnaireFormPorts
): UseQuestionnaireFormReturn {
  const api = ports?.api ?? defaultApiAdapter
  const notification = ports?.notification ?? defaultNotificationAdapter

  const [formData, setFormData] = useState<QuestionnaireFormData>({ ...INITIAL_FORM_DATA })
  const [currentSection, setCurrentSection] = useState(1)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [authorityConfirmed, setAuthorityConfirmed] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionId, setSubmissionId] = useState<number | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData((prev) => withDerivedValues(prev, name, value))
    },
    []
  )

  const setFieldValue = useCallback(
    <K extends keyof QuestionnaireFormData>(field: K, value: QuestionnaireFormData[K]) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    },
    []
  )

  const handleCheckboxChange = useCallback(
    (field: keyof QuestionnaireFormData, value: string, checked: boolean) => {
      setFormData((prev) => {
        const currentArray = Array.isArray(prev[field]) ? (prev[field] as string[]) : []
        return {
          ...prev,
          [field]: checked
            ? [...currentArray, value]
            : currentArray.filter((item) => item !== value),
        }
      })
    },
    []
  )

  const goToNextSection = useCallback(() => {
    setCurrentSection((prev) => Math.min(prev + 1, TOTAL_SECTIONS))
  }, [])

  const goToPreviousSection = useCallback(() => {
    setCurrentSection((prev) => Math.max(prev - 1, 1))
  }, [])

  const setSectionSafe = useCallback((section: number) => {
    setCurrentSection(Math.max(1, Math.min(section, TOTAL_SECTIONS)))
  }, [])

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token)
  }, [])

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null)
    notification.error('Bot verification failed. Please refresh and try again.')
  }, [notification])

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!authorityConfirmed) {
        notification.error('Please confirm you have authority to proceed on behalf of your organisation.')
        return
      }

      if (!turnstileToken) {
        notification.error('Please complete the bot verification')
        return
      }

      let loadingToast: string | number | undefined
      try {
        loadingToast = notification.loading('Submitting questionnaire...')

        const result = await api.submitQuestionnaire(formData, turnstileToken)

        notification.dismiss(loadingToast)

        if (result.success) {
          notification.success('Questionnaire submitted successfully! We will contact you soon.')
          setSubmissionId(result.submissionId ?? null)
          setIsSubmitted(true)
        } else {
          const errorMessage = result.error
            ? `${result.message} (${result.error})`
            : result.message
          notification.error(errorMessage || 'Failed to submit questionnaire. Please try again.')
        }
      } catch (error) {
        if (loadingToast !== undefined) {
          notification.dismiss(loadingToast)
        }
        console.error('Error submitting questionnaire:', error)
        notification.error(
          `An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
      }
    },
    [authorityConfirmed, formData, turnstileToken, api, notification]
  )

  return {
    formData,
    currentSection,
    termsAccepted,
    authorityConfirmed,
    isSubmitted,
    submissionId,
    turnstileToken,
    handleInputChange,
    handleCheckboxChange,
    setFieldValue,
    setTermsAccepted,
    setAuthorityConfirmed,
    setCurrentSection: setSectionSafe,
    goToNextSection,
    goToPreviousSection,
    handleTurnstileVerify,
    handleTurnstileError,
    handleTurnstileExpire,
    handleSubmit,
  }
}
