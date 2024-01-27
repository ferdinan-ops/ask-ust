import { ForumDetailType, ForumResponseType, ForumType } from '@/lib/types/forum.type'
import api from './axiosInstance'
import { AddForumType, UpdateForumType } from '@/lib/validations/forum.validation'

export const addForumFn = async (data: AddForumType) => {
  return await api.post('/forums', data)
}

export const getForumsFn = async (): Promise<ForumResponseType> => {
  const response = await api.get('/forums')
  return response.data
}

export const getForumByIdFn = async (forumId: string): Promise<ForumDetailType> => {
  const response = await api.get(`/forums/${forumId}`)
  return response.data?.data
}

export const updateForumByIdFn = async (data: UpdateForumType & { forumId: string }): Promise<ForumType> => {
  const { forumId, description } = data
  const response = await api.put(`/forums/${forumId}`, { description })
  return response.data?.data
}
