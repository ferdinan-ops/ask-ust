import { ForumDetailType, ForumResponseType, ForumType } from '@/lib/types/forum.type'
import api from './axiosInstance'
import { AddForumType, UpdateForumType } from '@/lib/validations/forum.validation'

export const addForumFn = async (data: AddForumType): Promise<ForumType> => {
  const response = await api.post('/forums', data)
  return response.data?.data
}

export const getForumsFn = async (page: number): Promise<ForumResponseType> => {
  const response = await api.get('/forums', { params: { page } })
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

export const deleteForumByIdFn = async (forumId: string): Promise<ForumType> => {
  const response = await api.delete(`/forums/${forumId}`)
  return response.data?.data
}

export const joinForumFn = async (forumId: string): Promise<ForumType> => {
  const response = await api.post(`/forums/join`, { forum_id: forumId })
  return response.data?.data
}

export const leaveForumFn = async (forumId: string): Promise<ForumType> => {
  const response = await api.post(`/forums/leave`, { forum_id: forumId })
  return response.data?.data
}

export const joinForumWithInviteCodeFn = async (inviteCode: string): Promise<ForumType> => {
  const response = await api.post(`/forums/invite-code`, { invite_code: inviteCode })
  return response.data?.data
}
