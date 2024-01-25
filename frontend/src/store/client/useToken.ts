import { create } from 'zustand'
interface TokenStore {
  token: string
  storeToken: (token: string) => void
  removeToken: () => void
}

export const useToken = create<TokenStore>((set) => ({
  token: JSON.parse(localStorage.getItem('token') ?? '""'),
  storeToken: (token) => set({ token }),
  removeToken: () => set({ token: '' })
}))
