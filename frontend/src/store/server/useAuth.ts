import { registerFn } from '@/api/auth.api'
import { toast } from '@/components/ui/use-toast'
import { ErrorResponseType } from '@/lib/types/auth.type'

import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

export const useRegister = () => {
  return useMutation(registerFn, {
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        const errorResponse = error.response?.data as ErrorResponseType

        toast({
          variant: 'destructive',
          title: errorResponse.error,
          description: 'Mohon periksa kembali data yang anda masukkan'
        })
      }
    },
    onSuccess: () => {
      toast({
        title: 'Akun anda berhasil terdaftar',
        description: 'Silahkan cek email anda untuk melakukan verifikasi'
      })
    }
  })
}
