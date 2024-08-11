import { ForumDetailType, ForumResponseType, ForumType } from '@/lib/types/forum.type'
import { MetaParamsType } from '@/lib/types/pagination.type'

import { AddForumType, UpdateForumType } from '@/lib/validations/forum.validation'
import api from './axiosInstance'

export const addForumFn = async (data: AddForumType): Promise<ForumType> => {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('category', data.category)
  if (data.image) formData.append('image', data?.image[0])

  const response = await api.post('/forum', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data?.data
}

export const getForumsFn = async ({
  search,
  page,
  filter
}: MetaParamsType & { filter?: string }): Promise<ForumResponseType> => {
  const response = await api.get('/forum', { params: { page, q: search, filter } })
  return response.data
}

export const getForumByIdFn = async (forumId: string): Promise<ForumDetailType> => {
  const response = await api.get(`/forum/${forumId}`)
  return response.data?.data
}

export const updateForumByIdFn = async (data: UpdateForumType & { forumId: string }): Promise<ForumType> => {
  const { forumId, description, image } = data
  const formData = new FormData()
  formData.append('description', description)
  if (image) formData.append('image', image[0])

  const response = await api.put(`/forum/${forumId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data?.data
}

export const deleteForumByIdFn = async (forumId: string): Promise<ForumType> => {
  const response = await api.delete(`/forum/${forumId}`)
  return response.data?.data
}

export const joinForumFn = async (forumId: string): Promise<ForumType> => {
  const response = await api.post(`/forum/join`, { forum_id: forumId })
  return response.data?.data
}

export const leaveForumFn = async (forumId: string): Promise<ForumType> => {
  const response = await api.post(`/forum/leave`, { forum_id: forumId })
  return response.data?.data
}

export const joinForumWithInviteCodeFn = async (inviteCode: string): Promise<ForumType> => {
  const response = await api.post(`/forum/invite-code`, { invite_code: inviteCode })
  return response.data?.data
}

interface IUpdateForumType {
  forumId: string
  note?: string
  isPublish: boolean
}

export const updateForumTypeFn = async ({ forumId, note, isPublish }: IUpdateForumType) => {
  return await api.put(`/forum/${forumId}/type`, { note, is_publish: isPublish })
}

export const getForumConclusionFn = async (forumId: string): Promise<string> => {
  console.log({ forumId })
  const response = await api.get(`/forum/${forumId}/summary`)
  return response.data?.data
}
