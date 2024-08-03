import { create } from 'zustand'

interface QuizStore {
  isQuizFinished: boolean
  setIsQuizFinished: (isQuizFinished: boolean) => void
}

export const useQuiz = create<QuizStore>((set) => ({
  isQuizFinished: JSON.parse(localStorage.getItem('quiz') ?? 'false'),
  setIsQuizFinished: (isQuizFinished) => {
    localStorage.setItem('quiz', JSON.stringify(isQuizFinished))
    set({ isQuizFinished })
  }
}))
