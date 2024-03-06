import { MessageBodyType } from '@/lib/types/message.type'
import api from './axiosInstance'

export const sendMessageFn = async (payload: MessageBodyType) => {
  return await api.post('/message', payload)
}

export const updateMessageFn = async (messageId: string, payload: MessageBodyType) => {
  const response = await api.put(`/message/${messageId}`, payload)
  return response.data?.data
}

export const deleteMessageFn = async (messageId: string, forumId: string) => {
  const response = await api.delete(`/message/${messageId}/forum/${forumId}`)
  return response.data?.data
}

export const getMessagesFn = async (forumId: string) => {
  const response = await api.get(`/message/forum/${forumId}?limit=10`)
  return response.data?.data
}
