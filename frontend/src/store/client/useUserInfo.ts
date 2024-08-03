import { UserType } from '@/lib/types/user.type'
import { create } from 'zustand'

interface UserInfoStore {
  user: UserType
  setUser: (user: UserType) => void
  removeUser: () => void
  setFinishQuiz: (isFinished: boolean) => void
  setBanned: () => void
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
  },
  setFinishQuiz: (isFinished) => {
    const user: UserType = JSON.parse(localStorage.getItem('ask-ust-user-info') ?? '""')
    localStorage.setItem('ask-ust-user-info', JSON.stringify({ ...user, quiz: { ...user.quiz, isFinished } }))
    set({ user: { ...user, quiz: { isFinished } } })
  },
  setBanned: () => {
    const user: UserType = JSON.parse(localStorage.getItem('ask-ust-user-info') ?? '""')
    localStorage.setItem('ask-ust-user-info', JSON.stringify({ ...user, is_banned: true, banned_type: 'QUIZ' }))
    set({ user: { ...user, is_banned: true, banned_type: 'QUIZ' } })
  }
}))
