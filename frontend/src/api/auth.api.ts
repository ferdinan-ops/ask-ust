import axios from 'axios'

import api from './axiosInstance'

import ENV from '@/lib/environment'
import { UserType } from '@/lib/types/user.type'
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
  return response.data?.data
}

export const registerFn = async (payload: RegisterType) => {
  const { confirmPassword, agreement, ...rest } = payload
  if (confirmPassword && agreement) {
    return await apiPublic.post('/auth/register', rest)
  }
}

export const verifyEmailFn = async (token: string): Promise<UserType> => {
  const response = await apiPublic.post('/auth/verify-email', { token })
  return response.data?.data
}

export const loginFn = async (payload: LoginType): Promise<AuthResponseType> => {
  const response = await apiPublic.post('/auth/login', payload)
  return response.data?.data
}

export const forgotPasswordFn = async (email: string) => {
  return await apiPublic.post('/auth/forgot-password', { email })
}

export const resetPasswordFn = async (payload: { token: string; password: string }) => {
  return await apiPublic.post('/auth/reset-password', { token: payload.token, password: payload.password })
}

export const loginGoogleFn = async (payload: { token: string }) => {
  return await apiPublic.post('/auth/google', payload)
}

export const logoutFn = async () => {
  return await api.delete('/auth/logout')
}

export const loginWithGoogleFn = async (payload: { token: string }): Promise<AuthResponseType> => {
  const repsonse = await apiPublic.post('/auth/google', payload)
  return repsonse.data?.data
}
