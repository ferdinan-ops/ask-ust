import { changePasswordFn, getJoinedForumsFn, getMeFn, getMyForumFn, updateEmailFn, updateMeFn } from '@/api/user.api'
import { toast } from '@/components/ui/use-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useGetMe = () => {
  return useQuery('me', getMeFn)
}

export const useGetJoinedForums = (page: number) => {
  return useQuery(['joined-forums', page], async () => await getJoinedForumsFn(page))
}

export const useGetMyForums = (page: number) => {
  return useQuery(['my-forums', page], async () => await getMyForumFn(page))
}

export const useUpdateMe = () => {
  const queryClient = useQueryClient()
  return useMutation(updateMeFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('me')
      toast({
        title: 'Berhasil mengupdate data',
        description: 'Data profil anda berhasil diupdate'
      })
    }
  })
}

export const useChangePassword = () => {
  return useMutation(changePasswordFn, {
    onSuccess: () => {
      toast({
        title: 'Berhasil mengupdate kata sandi',
        description: 'Kata sandi anda berhasil diupdate'
      })
    }
  })
}

export const useUpdateEmail = () => {
  const queryClient = useQueryClient()
  return useMutation(updateEmailFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('me')
      toast({
        title: 'Berhasil mengupdate email',
        description: 'Email anda berhasil diupdate'
      })
    }
  })
}
