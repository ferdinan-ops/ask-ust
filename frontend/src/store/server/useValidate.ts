import {
  getUserValidateByIdFn,
  getUserValidatesFn,
  storeValidateUserFn,
  updateValidateUserFn
} from '@/api/validate.api'
import { toast } from '@/components/ui/use-toast'
import { useMutation, useQuery } from 'react-query'
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
  limit?: number
  enabled?: boolean
}

export const useGetUserValidates = ({ search, page, limit, enabled }: GetAllParams) => {
  return useQuery('users', async () => await getUserValidatesFn(search, page, limit), {
    enabled
  })
}

export const useGetUserValidate = (userId: string) => {
  return useQuery(['user', userId], async () => await getUserValidateByIdFn(userId))
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
