import { addForumFn, getForumByIdFn, getForumsFn, updateForumByIdFn } from '@/api/forum.api'
import { toast } from '@/components/ui/use-toast'
import { handleOnError } from '@/lib/services/handleToast'
import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useCreateForum = () => {
  const queryClient = useQueryClient()
  return useMutation(addForumFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('forums')
      toast({
        title: 'Forum berhasil dibuat',
        description: 'Forum anda berhasil dibuat dan dapat dilihat oleh semua orang'
      })
    }
  })
}

export const useGetForum = () => {
  return useQuery('forums', getForumsFn)
}

export const useGetDetailForum = (forumId: string) => {
  return useQuery(['forums', forumId], async () => await getForumByIdFn(forumId))
}

export const useUpdateForum = () => {
  const queryClient = useQueryClient()
  return useMutation(updateForumByIdFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['forums', data.id])
      toast({
        title: 'Forum berhasil diupdate',
        description: 'Forum anda berhasil diupdate dan dapat dilihat oleh semua orang'
      })
    }
  })
}
