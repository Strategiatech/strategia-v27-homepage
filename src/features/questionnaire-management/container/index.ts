import { FunctionAppAdapter } from '../adapters/functionAppAdapter'
import { BrowserSessionAdapter } from '../adapters/browserSessionAdapter'
import { SonnerNotificationAdapter } from '../adapters/sonnerNotificationAdapter'

/** Default production adapter instances (composition root) */
export const defaultApiAdapter = new FunctionAppAdapter()
export const defaultSessionAdapter = new BrowserSessionAdapter()
export const defaultNotificationAdapter = new SonnerNotificationAdapter()
