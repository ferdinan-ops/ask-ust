export interface ICheckbox {
  value: string
  checked: boolean
}

export interface IBody {
  answer: string | ICheckbox[]
  questionId: string
}

export interface IAnswerPayload {
  answer: string
  is_correct: boolean
  user_id: string
  question_id: string
}

export interface IAnswerBody {
  user_id: string
  answers: IBody[]
}
