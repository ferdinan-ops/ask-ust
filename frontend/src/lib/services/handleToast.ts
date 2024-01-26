import { AxiosError } from 'axios'
import { ErrorResponseType } from '../types/auth.type'
import { toast } from '@/components/ui/use-toast'

export const handleOnError = (error: AxiosError, message?: string) => {
  if (error.response?.status === 400) {
    const errorResponse = error.response?.data as ErrorResponseType

    toast({
      variant: 'destructive',
      title: errorResponse.error ?? message,
      description: 'Mohon periksa kembali data yang anda masukkan'
    })
  }
}
