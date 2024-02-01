import axios from 'axios'

import ENV from '@/lib/environment'
import { useToken } from '@/store/client'
import { refreshTokenFn } from './auth.api'

const api = axios.create({
  baseURL: ENV.apiUrl,
  headers: {
    Accept: 'application/json'
  }
})

api.defaults.headers.post['Content-Type'] = 'application/json'

api.interceptors.request.use(
  (config) => {
    const accessToken = useToken.getState().accessToken

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config

    if (originalConfig.url !== '/login' && error.response) {
      if (error.response.status === 401) {
        originalConfig._retry = true
        const refreshToken = useToken.getState().refreshToken

        try {
          const response = await refreshTokenFn(refreshToken)
          useToken.getState().storeAccessToken(response.access_token)
          return api(originalConfig)
        } catch (error) {
          useToken.getState().removeAccessToken()
          useToken.getState().removeRefreshToken()
          window.location.href = '/login'
          return Promise.reject(error)
        }
      }
    }

    return Promise.reject(error)
  }
)

export default api
