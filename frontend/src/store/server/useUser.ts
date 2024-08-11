import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'

import {
  bannedUserFromAppFn,
  changePasswordFn,
  createAdminFn,
  deleteAdminFn,
  getAdminFn,
  getAllAdminFn,
  getJoinedForumsFn,
  getMeFn,
  getMyForumFn,
  getProfileForumsCountFn,
  updateAdminFn,
  updateEmailFn,
  updateMeFn,
  uploadProfilePicFn
} from '@/api/user.api'
import { MetaParamsType } from '@/lib/types/pagination.type'
import { handleOnError } from '@/lib/services/handleToast'
import { toast } from '@/components/ui/use-toast'
import { useUserInfo } from '../client'

export const useGetMe = () => {
  return useQuery('me', getMeFn)
}

export const useGetJoinedForums = (page: number) => {
  return useQuery(['joined-forums', page], async () => await getJoinedForumsFn(page))
}

export const useGetMyForums = (page: number) => {
  return useQuery(['my-forums', page], async () => await getMyForumFn(page), {
    select: (data) => {
      // limit data to 6
      return {
        ...data,
        data: data.data.slice(0, 6)
      }
    }
  })
}

export const useUpdateMe = () => {
  const queryClient = useQueryClient()
  return useMutation(updateMeFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
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

export const useBannedUser = () => {
  const queryClient = useQueryClient()
  return useMutation(bannedUserFromAppFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('me')
    }
  })
}

export const useGetAdmins = ({ search, page }: MetaParamsType) => {
  return useQuery(['admins', page, search], async () => await getAllAdminFn({ search, page }))
}

export const useCreateAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation(createAdminFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('admins')
      toast({
        title: 'Berhasil menambahkan admin',
        description: 'Admin baru berhasil ditambahkan'
      })
    }
  })
}

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteAdminFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('admins')
      toast({
        title: 'Berhasil menghapus admin',
        description: 'Admin berhasil dihapus dari sistem'
      })
    }
  })
}

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation(updateAdminFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('admins')
      toast({
        title: 'Berhasil mengubah data admin',
        description: 'Data admin berhasil diubah dalam sistem'
      })
    }
  })
}

export const useGetAdminById = (userId: string) => {
  return useQuery(['admins', userId], async () => await getAdminFn(userId), {
    enabled: !!userId
  })
}
