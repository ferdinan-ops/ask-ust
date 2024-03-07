import { DeleteMessageParamsType, MessageBodyType, MessageType } from '@/lib/types/message.type'
import api from './axiosInstance'

export const sendMessageFn = async (payload: MessageBodyType) => {
  return await api.post('/messages', payload)
}

export const updateMessageFn = async (payload: MessageBodyType & { messageId: string }) => {
  const { messageId, ...rest } = payload
  const response = await api.put(`/messages/${messageId}`, rest)
  return response.data?.data
}

export const deleteMessageFn = async (payload: DeleteMessageParamsType) => {
  const response = await api.delete(`/messages/${payload.messageId}/forum/${payload.forumId}`)
  return response.data?.data
}

export const getMessagesFn = async (forumId: string): Promise<MessageType[]> => {
  const response = await api.get(`/messages/forum/${forumId}?limit=10`)
  return response.data?.data
}
