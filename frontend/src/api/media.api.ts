import api from './axiosInstance'
import { MediaRoomType } from '@/lib/types/media.type'

type MediaCallForm = {
  forumId: string
  type: 'video' | 'voice'
}

export const createMediaCallFn = async ({ forumId, type }: MediaCallForm): Promise<MediaRoomType> => {
  const response = await api.post('/media', { forumId, type })
  return response.data?.data?.media
}

export const getMediaCallFn = async (mediaId: string): Promise<MediaRoomType> => {
  const response = await api.get(`/media/${mediaId}`)
  return response.data?.data
}

export const getLivekitToken = async (id: string, username: string): Promise<string> => {
  const response = await api.get(`/livekit?id=${id}&username=${username}`)
  return response.data?.token
}

export const getEnabledMediaCallFn = async (forumId: string): Promise<MediaRoomType> => {
  const response = await api.get(`/media/forum/${forumId}/enabled`)
  return response.data?.data
}

export const deleteMediaCallFn = async (mediaId: string): Promise<MediaRoomType> => {
  const response = await api.delete(`/media/${mediaId}`)
  return response.data?.data
}
