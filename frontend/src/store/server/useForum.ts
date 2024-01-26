import { addForumFn } from '@/api/forum.api'
import { toast } from '@/components/ui/use-toast'
import { handleOnError } from '@/lib/services/handleToast'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

export const useCreateForum = () => {
  return useMutation(addForumFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Forum berhasil dibuat',
        description: 'Forum anda berhasil dibuat dan dapat dilihat oleh semua orang'
      })
    }
  })
}
