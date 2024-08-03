import { QuestionType } from './question.type'

export type AnswerType = {
  id: string
  answer: string | Array<{ value: string; checked: boolean }>
  is_correct: boolean
  user_id: string
  question_id: string
  question: QuestionType
}
