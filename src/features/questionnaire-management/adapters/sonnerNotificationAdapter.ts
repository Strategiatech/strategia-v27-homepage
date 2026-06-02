import { toast } from 'sonner'
import type { INotificationPort } from '../ports'

/**
 * Adapter implementing INotificationPort using sonner toast library.
 * Encapsulates notification UI details for testability.
 */
export class SonnerNotificationAdapter implements INotificationPort {
  success(message: string): void {
    toast.success(message)
  }

  error(message: string): void {
    toast.error(message)
  }

  loading(message: string): string | number {
    return toast.loading(message)
  }

  dismiss(toastId: string | number): void {
    toast.dismiss(toastId)
  }
}
