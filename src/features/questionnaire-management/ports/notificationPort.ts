/**
 * Port interface for user notifications.
 * Abstracts toast/notification system for testability.
 */
export interface INotificationPort {
  success(message: string): void
  error(message: string): void
  loading(message: string): string | number
  dismiss(toastId: string | number): void
}
