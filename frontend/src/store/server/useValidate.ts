import {
  deleteValidateUserFn,
  getUnreadValidatesFn,
  getUserValidateByIdFn,
  getUserValidatesFn,
  storeValidateUserFn,
  updateReadStatusFn,
  updateValidateUserFn
} from '@/api/validate.api'
import { toast } from '@/components/ui/use-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useUserInfo } from '../client'

export const useStoreValidateUser = () => {
  return useMutation(storeValidateUserFn, {
    onSuccess: (data) => {
      useUserInfo.getState().setUser(data)
      toast({
        title: 'Verifikasi berhasil',
        description: 'Silahkan tunggu proses verifikasi dari kami'
      })
    }
  })
}

export interface GetAllParams {
  search?: string
  page?: number
  filter?: string
}

export const useGetUserValidates = ({ search, page, filter }: GetAllParams) => {
  return useQuery(['users', search, page, filter], async () => await getUserValidatesFn(search, page, filter))
}

export const useGetUserValidate = (userId: string) => {
  return useQuery(['users', userId], async () => await getUserValidateByIdFn(userId))
}

export const useUpdateValidateUser = () => {
  return useMutation(updateValidateUserFn, {
    onSuccess: () => {
      toast({
        title: 'Berhasil',
        description: 'Berhasil mengubah status verifikasi user'
      })
    }
  })
}

export const useGetUnreadValidates = (enabled: boolean) => {
  return useQuery('unread', async () => await getUnreadValidatesFn(), {
    enabled
  })
}

export const useUpdateReadStatus = () => {
  const queryClient = useQueryClient()

  return useMutation(updateReadStatusFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('unread')
    }
  })
}

export const useDeleteValidate = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteValidateUserFn, {
    onSuccess: (data) => {
      console.log({ data })
      useUserInfo.getState().setUser(data)
      queryClient.invalidateQueries(['users', data.id])
      toast({
        title: 'Ayo daftarkan diri kamu kembali!',
        description: 'Berkas kamu sebelumnya sudah kami hapus dari sistem'
      })
    }
  })
}
