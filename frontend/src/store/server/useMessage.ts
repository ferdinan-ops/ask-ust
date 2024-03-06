import { sendMessageFn } from '@/api/message.api'
import { toast } from '@/components/ui/use-toast'
import { handleOnError } from '@/lib/services/handleToast'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

export const useSendMessage = () => {
  return useMutation(sendMessageFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Pesan berhasil dikirim',
        description: 'Pesan anda berhasil dikirim ke forum ini'
      })
    }
  })
}
