import { create } from 'zustand'

interface QuizStore {
  isQuizFinished: boolean
  timerLeft: number
  setTimeLeft: (timeLeft: number) => void
  isFinished: boolean
  setIsFinished: (isFinished: boolean) => void
  setIsQuizFinished: (isQuizFinished: boolean) => void
}

export const useQuiz = create<QuizStore>((set) => ({
  isQuizFinished: JSON.parse(localStorage.getItem('quiz') ?? 'false'),
  setIsQuizFinished: (isQuizFinished) => {
    localStorage.setItem('quiz', JSON.stringify(isQuizFinished))
    set({ isQuizFinished })
  },
  timerLeft: 15 * 60,
  setTimeLeft: (timeLeft) => set({ timerLeft: timeLeft }),
  isFinished: false,
  setIsFinished: (isFinished) => set({ isFinished })
}))
