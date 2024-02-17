import { createVideoCallFn, createVoiceCallFn, getLivekitToken, getVideoCallFn, getVoiceCallFn } from '@/api/media.api'
import { toast } from '@/components/ui/use-toast'
import { handleOnError } from '@/lib/services/handleToast'
import { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'

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
  return useQuery(['videos', videoId], async () => await getVideoCallFn(videoId), {
    enabled: !!videoId
  })
}

export const useGetLivekitToken = (id: string, username: string) => {
  return useQuery('livekit', async () => getLivekitToken(id, username), {
    enabled: !!id && !!username
  })
}

export const useGetVoiceCall = (voiceId: string) => {
  return useQuery(['voice', voiceId], async () => await getVoiceCallFn(voiceId), {
    enabled: !!voiceId
  })
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
