import { QuestionFormFieldsType, QuestionResponseType } from '@/lib/types/question.type'
import api from './axiosInstance'

export const getQuestionsFn = async (): Promise<QuestionResponseType> => {
  const response = await api.get('/question')
  return response.data?.data
}

export const getQuestionForUserFn = async (): Promise<QuestionResponseType> => {
  const response = await api.get('/question/user')
  return response.data?.data
}

export const createQuestionFn = async (payload: QuestionFormFieldsType) => {
  const { correctAnswer, ...rest } = payload
  const fields = { ...rest, correct_answers: correctAnswer }

  return await api.post('/question', fields)
}

type UpdateParamsType = {
  questionId: string
} & QuestionFormFieldsType

export const updateQuestionFn = async (payload: UpdateParamsType) => {
  const { questionId, correctAnswer, ...rest } = payload
  const fields = { ...rest, correct_answers: correctAnswer }

  return await api.put(`/question/${questionId}`, fields)
}
