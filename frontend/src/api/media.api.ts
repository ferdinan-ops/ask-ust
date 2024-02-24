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
  return response.data?.data?.voice
}

export const getVoiceCallFn = async (voiceId: string): Promise<MediaRoomType> => {
  const response = await api.get(`/voice/${voiceId}`)
  return response.data?.data
}

export const getEnabledVoiceCallFn = async (forumId: string): Promise<MediaRoomType> => {
  const response = await api.get(`/voice/forum/${forumId}/enabled`)
  console.log('enabled voice call', response.data)
  return response.data?.data
}

export const getEnabledVideoCallFn = async (forumId: string): Promise<MediaRoomType> => {
  const response = await api.get(`/video/forum/${forumId}/enabled`)
  console.log('enabled video call', response.data)
  return response.data?.data
}

export const deleteVoiceCallFn = async (voiceId: string): Promise<MediaRoomType> => {
  const response = await api.delete(`/voice/${voiceId}`)
  console.log('delete voice call', response.data)
  return response.data?.data
}

export const deleteVideoCallFn = async (videoId: string): Promise<MediaRoomType> => {
  const response = await api.delete(`/video/${videoId}`)
  console.log('delete video call', response.data)
  return response.data?.data
}
