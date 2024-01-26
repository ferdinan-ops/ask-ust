import { create } from 'zustand'
interface TokenStore {
  accessToken: string
  storeAccessToken: (token: string) => void
  removeAccessToken: () => void
  refreshToken: string
  storeRefreshToken: (token: string) => void
  removeRefreshToken: () => void
}

export const useToken = create<TokenStore>((set) => ({
  accessToken: JSON.parse(localStorage.getItem('ask-ust-access-token') ?? '""'),
  storeAccessToken: (accessToken) => {
    localStorage.setItem('ask-ust-access-token', JSON.stringify(accessToken))
    set({ accessToken })
  },
  removeAccessToken: () => {
    localStorage.removeItem('ask-ust-access-token')
    set({ accessToken: '' })
  },
  refreshToken: JSON.parse(localStorage.getItem('ask-ust-refresh-token') ?? '""'),
  storeRefreshToken: (refreshToken) => {
    localStorage.setItem('ask-ust-refresh-token', JSON.stringify(refreshToken))
    set({ refreshToken })
  },
  removeRefreshToken: () => {
    localStorage.removeItem('ask-ust-refresh-token')
    set({ refreshToken: '' })
  }
}))
