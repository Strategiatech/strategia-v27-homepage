import { describe, expect, it } from 'vitest'
import { INITIAL_FORM_DATA } from '../../constants'
import { getCompletedSectionCount, getQuestionnaireCompletionMap } from '../questionnaireCompletion'

describe('questionnaire completion map', () => {
  it('marks organisation and projected value complete when region and industry are provided', () => {
    const formData = {
      ...INITIAL_FORM_DATA,
      organisationName: 'Strategia Health',
      headOfficeRegion: 'Australasia',
      headOfficeLocation: 'Adelaide, Australia',
      industrySector: 'Healthcare / Medical',
      organisationType: 'private' as const,
    }

    const completionMap = getQuestionnaireCompletionMap(formData, false, false)

    expect(completionMap[1]).toBe(true)
    expect(completionMap[10]).toBe(true)
    expect(completionMap[2]).toBe(false)
    expect(getCompletedSectionCount(completionMap)).toBe(2)
  })

  it('does not infer completion for unrelated sections', () => {
    const completionMap = getQuestionnaireCompletionMap(INITIAL_FORM_DATA, false, false)

    expect(completionMap[1]).toBe(false)
    expect(completionMap[10]).toBe(false)
    expect(completionMap[11]).toBe(false)
    expect(getCompletedSectionCount(completionMap)).toBe(0)
  })
})
