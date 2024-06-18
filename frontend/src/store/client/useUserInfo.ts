import { UserType } from '@/lib/types/user.type'
import { create } from 'zustand'

interface UserInfoStore {
  user: UserType
  setUser: (user: UserType) => void
  removeUser: () => void
}

export const useUserInfo = create<UserInfoStore>((set) => ({
  user: JSON.parse(localStorage.getItem('ask-ust-user-info') ?? '""'),
  setUser: (user) => {
    localStorage.setItem('ask-ust-user-info', JSON.stringify(user))
    set({ user })
  },
  removeUser: () => {
    localStorage.removeItem('ask-ust-user-info')
    set({ user: undefined })
  }
}))
