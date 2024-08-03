import { create } from 'zustand'

type BannedType = {
  isBanned: boolean
  message: string
}

interface BannedQuizStore {
  banned: BannedType
  setBanned: (banned: BannedType) => void
}

export const useBannedQuiz = create<BannedQuizStore>((set) => ({
  banned: JSON.parse(localStorage.getItem('isBanned') ?? '"{}"'),
  setBanned: (banned) => {
    localStorage.setItem('isBanned', JSON.stringify(banned))
    set({ banned })
  }
}))
