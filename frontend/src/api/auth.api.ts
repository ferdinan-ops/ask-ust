import axios from 'axios'

import ENV from '@/lib/environment'
import { AuthResponseType } from '@/lib/types/auth.type'
import { LoginType, RegisterType } from '@/lib/validations/auth.validation'

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: {
    Accept: 'application/json'
  }
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

export const refreshTokenFn = async (token: string): Promise<AuthResponseType> => {
  const response = await apiPublic.post('/auth/refresh', { refresh_token: token })
  return response.data
}

export const registerFn = async (payload: RegisterType) => {
  const { confirmPassword, ...rest } = payload
  if (confirmPassword) {
    return await apiPublic.post('/auth/register', rest)
  }
}

export const verifyEmailFn = async (token: string) => {
  return await apiPublic.post('/auth/verify-email', { token })
}

export const loginFn = async (payload: LoginType): Promise<AuthResponseType> => {
  const response = await apiPublic.post('/auth/login', payload)
  return response.data
}