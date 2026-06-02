/**
 * Questionnaire Management Types
 */

export interface QuestionnaireSubmission {
  Id: number
  SubmissionDate: string
  Status: string
  OrganisationName: string | null
  ContactEmail: string | null
  ContactPerson: string | null
  IndustrySector: string | null
  OrganisationType: string | null
  ProposedStartDate: string | null
  FormData: Record<string, unknown> | null
  Notes: string | null
  ReviewedBy: string | null
  ReviewedDate: string | null
}
