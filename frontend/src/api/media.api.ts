import api from './axiosInstance'
import { MediaRoomType } from '@/lib/types/media.type'

export const createVideoCallFn = async (forumId: string): Promise<MediaRoomType> => {
  const response = await api.post('/video', { forumId })
  return response.data?.data?.video
}

export const getVideoCallFn = async (videoId: string): Promise<MediaRoomType> => {
  const response = await api.get(`/video/${videoId}`)
  return response.data?.data
}

export const getLivekitToken = async (id: string, username: string): Promise<string> => {
  const response = await api.get(`/livekit?id=${id}&username=${username}`)
  return response.data?.token
}

export const createVoiceCallFn = async (forumId: string): Promise<MediaRoomType> => {
  const response = await api.post('/voice', { forumId })
  return response.data?.data
}

export const getVoiceCallFn = async (voiceId: string): Promise<MediaRoomType> => {
  const response = await api.get(`/voice/${voiceId}`)
  return response.data?.data
}
