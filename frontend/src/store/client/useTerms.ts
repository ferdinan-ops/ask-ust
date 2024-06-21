import { RegisterType } from '@/lib/validations/auth.validation'
import { create } from 'zustand'

interface TermsStore {
  terms: boolean
  setTerms: (terms: boolean) => void

  registerFields: RegisterType
  setRegisterFields: (registerFields: RegisterType) => void
}

export const useTerms = create<TermsStore>((set) => ({
  terms: JSON.parse(localStorage.getItem('terms') ?? '""'),
  setTerms: (terms) => {
    localStorage.setItem('terms', JSON.stringify(terms))
    set({ terms })
  },

  registerFields: JSON.parse(localStorage.getItem('register') ?? '""'),
  setRegisterFields: (registerFields) => {
    localStorage.setItem('register', JSON.stringify(registerFields))
    set({ registerFields })
  }
}))
