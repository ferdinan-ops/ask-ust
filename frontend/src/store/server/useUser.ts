import {
  changePasswordFn,
  getJoinedForumsFn,
  getMeFn,
  getMyForumFn,
  getProfileForumsCountFn,
  updateEmailFn,
  updateMeFn,
  uploadProfilePicFn
} from '@/api/user.api'
import { toast } from '@/components/ui/use-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useUserInfo } from '../client'

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
    onSuccess: (data) => {
      queryClient.invalidateQueries('me')
      useUserInfo.getState().setUser(data)
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

export const useUpdateProfilePic = () => {
  const queryClient = useQueryClient()
  return useMutation(uploadProfilePicFn, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('me')
      useUserInfo.getState().setUser(data)
      toast({
        title: 'Berhasil mengupdate foto profil',
        description: 'Foto profil anda berhasil diupdate'
      })
    }
  })
}

export const useGetProfileForumsCount = () => {
  return useQuery('profile-forums-count', async () => await getProfileForumsCountFn())
}
