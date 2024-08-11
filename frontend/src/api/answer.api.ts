import { AnswerType } from '@/lib/types/answer.type'
import api from './axiosInstance'

export const createAnswersFn = async (payload: { userId: string; validateId: string; answers: unknown }) => {
  const fields = { user_id: payload.userId, answers: payload.answers, validate_id: payload.validateId }
  const response = await api.post('/answer', fields)
  return response.data?.data?.validate
}

export const getAnswersFn = async (userId: string): Promise<AnswerType[]> => {
  const response = await api.get(`/answer/${userId}`)
  return response.data?.data
}
