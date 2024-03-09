import {
  createVideoCallFn,
  createVoiceCallFn,
  deleteVideoCallFn,
  deleteVoiceCallFn,
  getEnabledVideoCallFn,
  getEnabledVoiceCallFn,
  getLivekitToken,
  getVideoCallFn,
  getVoiceCallFn
} from '@/api/media.api'
import { toast } from '@/components/ui/use-toast'
import { handleOnError } from '@/lib/services/handleToast'
import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useGetLivekitToken = (id: string, username: string) => {
  return useQuery('livekit', async () => getLivekitToken(id, username), {
    enabled: !!id && !!username
  })
}

export const useCreateVideoCall = () => {
  const queryClient = useQueryClient()
  return useMutation(createVideoCallFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['video', data.forum_id])
      toast({
        title: 'Panggilan video berhasil dibuat',
        description: 'Panggilan video berhasil dibuat dan dapat dilihat oleh semua orang'
      })
    }
  })
}

export const useGetVideoCall = (videoId: string) => {
  return useQuery(['videos', videoId], async () => await getVideoCallFn(videoId), {
    enabled: !!videoId
  })
}

export const useGetEnabledVideoCall = (forumId: string) => {
  return useQuery(['video', forumId], async () => await getEnabledVideoCallFn(forumId), {
    enabled: !!forumId
  })
}

export const useDeleteVideoCall = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteVideoCallFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['video', data.forum_id])
      toast({
        title: 'Panggilan video berhasil dihapus',
        description: 'Panggilan video berhasil dihapus dan tidak dapat dilihat oleh semua orang'
      })
    }
  })
}
export const useGetVoiceCall = (voiceId: string) => {
  return useQuery(['voice', voiceId], async () => await getVoiceCallFn(voiceId), {
    enabled: !!voiceId
  })
}

export const useCreateVoiceCall = () => {
  const queryClient = useQueryClient()
  return useMutation(createVoiceCallFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['voice', data.forum_id])
      toast({
        title: 'Panggilan suara berhasil dibuat',
        description: 'Panggilan suara berhasil dibuat dan dapat dilihat oleh semua orang'
      })
    }
  })
}

export const useGetEnabledVoiceCall = (forumId: string) => {
  return useQuery(['voice', forumId], async () => await getEnabledVoiceCallFn(forumId), {
    enabled: !!forumId
  })
}

export const useDeleteVoiceCall = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteVoiceCallFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['voice', data.forum_id])
      toast({
        title: 'Panggilan suara berhasil dihapus',
        description: 'Panggilan suara berhasil dihapus dan tidak dapat dilihat oleh semua orang'
      })
    }
  })
}
