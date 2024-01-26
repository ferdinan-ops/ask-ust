import { registerFn, verifyEmailFn } from '@/api/auth.api'
import { toast } from '@/components/ui/use-toast'
import { handleOnError } from '@/lib/services/handleToast'

import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

export const useRegister = () => {
  return useMutation(registerFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Akun anda berhasil terdaftar',
        description: 'Silahkan cek email anda untuk melakukan verifikasi'
      })
    }
  })
}

export const useVerifyEmail = () => {
  return useMutation(verifyEmailFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Email anda berhasil diverifikasi',
        description: 'Silahkan login untuk melanjutkan'
      })
    }
  })
}
