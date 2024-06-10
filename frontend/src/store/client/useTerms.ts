import { create } from 'zustand'

interface TermsStore {
  terms: boolean
  setTerms: (terms: boolean) => void
}

export const useTerms = create<TermsStore>((set) => ({
  terms: JSON.parse(localStorage.getItem('terms') ?? '""'),
  setTerms: (terms) => {
    localStorage.setItem('terms', JSON.stringify(terms))
    set({ terms })
  }
}))
