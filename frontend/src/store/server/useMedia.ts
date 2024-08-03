import { useMutation, useQuery } from 'react-query'
import { AxiosError } from 'axios'

import {
  createMediaCallFn,
  deleteMediaCallFn,
  getEnabledMediaCallFn,
  getLivekitToken,
  getMediaCallFn
} from '@/api/media.api'

import { toast } from '@/components/ui/use-toast'
import { handleOnError } from '@/lib/services/handleToast'

export const useGetLivekitToken = (id: string, username: string) => {
  return useQuery('livekit', async () => getLivekitToken(id, username), {
    enabled: !!id && !!username
  })
}

export const useCreateMediaCall = () => {
  return useMutation(createMediaCallFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Panggilan grup berhasil dibuat',
        description: 'Panggilan grup berhasil dibuat dan dapat dilihat oleh semua orang'
      })
    }
  })
}

export const useGetMediaCall = (mediaId: string) => {
  return useQuery(['media', mediaId], async () => await getMediaCallFn(mediaId))
}

export const useGetEnabledMediaCall = (forumId: string) => {
  return useQuery({
    queryKey: `media:${forumId}`,
    queryFn: async () => await getEnabledMediaCallFn(forumId),
    enabled: !!forumId
  })
}

export const useDeleteMediaCall = () => {
  return useMutation(deleteMediaCallFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Panggilan grup berhasil dihapus',
        description: 'Panggilan grup berhasil dihapus dan tidak dapat dilihat oleh semua orang'
      })
    }
  })
}
