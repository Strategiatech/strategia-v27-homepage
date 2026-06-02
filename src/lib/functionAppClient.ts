/**
 * Browser-safe Function App client.
 *
 * Static pages must not receive the Function App host key. Questionnaire
 * requests use short-lived bearer tokens issued after password validation.
 */

interface FunctionAppClientConfig {
  baseUrl: string
}

interface RequestOptions {
  accessToken?: string | null
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

class FunctionAppClient {
  private config: FunctionAppClientConfig

  constructor() {
    this.config = {
      baseUrl:
        process.env.NEXT_PUBLIC_FUNCTION_APP_URL ||
        'https://strategia-home-api.azurewebsites.net',
    }
  }

  private getHeaders(options?: RequestOptions): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (options?.accessToken) {
      headers.Authorization = `Bearer ${options.accessToken}`
    }

    return headers
  }

  async post<T>(
    endpoint: string,
    body: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.config.baseUrl}${endpoint}`
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(options),
        body: JSON.stringify(body),
      })

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Request failed',
          error: result.error || `HTTP ${response.status}`,
        }
      }

      return result as ApiResponse<T>
    } catch (error) {
      console.error('FunctionAppClient POST error:', error)
      return {
        success: false,
        message: 'Network error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, string>,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      let url = `${this.config.baseUrl}${endpoint}`
      if (params) {
        const searchParams = new URLSearchParams(params)
        url += `?${searchParams.toString()}`
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(options),
      })

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Request failed',
          error: result.error || `HTTP ${response.status}`,
        }
      }

      return result as ApiResponse<T>
    } catch (error) {
      console.error('FunctionAppClient GET error:', error)
      return {
        success: false,
        message: 'Network error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}

export const functionAppClient = new FunctionAppClient()
