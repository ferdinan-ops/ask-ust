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
import { useMutation, useQuery } from 'react-query'

export const useGetLivekitToken = (id: string, username: string) => {
  return useQuery('livekit', async () => getLivekitToken(id, username), {
    enabled: !!id && !!username
  })
}

export const useCreateVideoCall = () => {
  return useMutation(createVideoCallFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Panggilan video berhasil dibuat',
        description: 'Panggilan video berhasil dibuat dan dapat dilihat oleh semua orang'
      })
    }
  })
}

export const useGetVideoCall = (videoId: string) => {
  return useQuery(['videos', videoId], async () => await getVideoCallFn(videoId))
}

export const useGetEnabledVideoCall = (forumId: string) => {
  return useQuery({
    queryKey: `video:${forumId}`,
    queryFn: async () => await getEnabledVideoCallFn(forumId),
    enabled: !!forumId
  })
}

export const useDeleteVideoCall = () => {
  return useMutation(deleteVideoCallFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Panggilan video berhasil dihapus',
        description: 'Panggilan video berhasil dihapus dan tidak dapat dilihat oleh semua orang'
      })
    }
  })
}
export const useGetVoiceCall = (voiceId: string) => {
  return useQuery(['voices', voiceId], async () => await getVoiceCallFn(voiceId))
}

export const useCreateVoiceCall = () => {
  return useMutation(createVoiceCallFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Panggilan suara berhasil dibuat',
        description: 'Panggilan suara berhasil dibuat dan dapat dilihat oleh semua orang'
      })
    }
  })
}

export const useGetEnabledVoiceCall = (forumId: string) => {
  return useQuery({
    queryKey: `voice:${forumId}`,
    queryFn: async () => await getEnabledVoiceCallFn(forumId),
    enabled: !!forumId
  })
}

export const useDeleteVoiceCall = () => {
  return useMutation(deleteVoiceCallFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Panggilan suara berhasil dihapus',
        description: 'Panggilan suara berhasil dihapus dan tidak dapat dilihat oleh semua orang'
      })
    }
  })
}
