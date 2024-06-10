import type { HttpResponse } from '@/types/http'

const createUrlWithParams = (baseUrl: string, params: { [key: string]: string }): string => {
  const url = new URL(baseUrl)
  const searchParams = new URLSearchParams(params)

  url.search = searchParams.toString()

  return url.toString()
}

export const httpGet = async <T extends HttpResponse>(url: string, params: {[key: string]: string} = {}): Promise<T> => {
  const urlWithParams = (Object.keys(params).length) ? createUrlWithParams(url, params) : url

  try {
    const response: Response = await fetch(urlWithParams, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return {
      data: data || null,
      error: false
    } as T
  } catch(error) {
    return {
      data: null,
      error: true
    } as T
  }
}

export const httpPost = async <T extends HttpResponse>(url: string, params: {[key: string]: string | number} = {}): Promise<T> => {
  try {
    const response: Response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return {
      data: data || null,
      error: false
    } as T
  } catch(error) {
    return {
      data: null,
      error: true
    } as T
  }
}