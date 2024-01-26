import axios from 'axios'

import ENV from '@/lib/environment'
import { AuthResponseType } from '@/lib/types/auth.type'
import { RegisterType } from '@/lib/validations/auth.validation'

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: {
    Accept: 'application/json'
  }
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

export const refreshTokenFn = async (): Promise<AuthResponseType> => {
  const response = await apiPublic.get('/auth/refresh')
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
