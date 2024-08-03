export type QuestionFormFieldsType = {
  text: string
  type: string
  options: { value: string }[]
  correctAnswer: { value: string; checked?: boolean }[]
}

export type QuestionType = {
  id: string
  correct_answers: { value: string; checked?: boolean }[]
} & Omit<QuestionFormFieldsType, 'correctAnswer'>

export type QuestionResponseType = {
  default: QuestionType[]
  dosen: QuestionType[]
}

export type OptionType = 'text' | 'radio' | 'checkbox'
