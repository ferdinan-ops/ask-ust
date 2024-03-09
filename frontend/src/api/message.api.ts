import { DeleteMessageParamsType, MessageBodyType, MessageType, SendImageMessageType } from '@/lib/types/message.type'
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

export const deleteMessageBySpecificRoleFn = async (payload: DeleteMessageParamsType) => {
  const response = await api.delete(`/messages/${payload.messageId}/forum/${payload.forumId}/role`)
  return response.data?.data
}

export const getMessagesFn = async (forumId: string): Promise<MessageType[]> => {
  const response = await api.get(`/messages/forum/${forumId}?limit=10`)
  return response.data?.data
}

export const sendImageFn = async (payload: SendImageMessageType) => {
  const formData = new FormData()
  formData.append('forumId', payload.forumId)
  formData.append('image', payload.image)

  const response = await api.post('/messages/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
}
