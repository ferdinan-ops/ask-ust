import { deleteMessageFn, getMessagesFn, sendMessageFn, updateMessageFn } from '@/api/message.api'
import { handleOnError } from '@/lib/services/handleToast'
import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useSendMessage = () => {
  const queryClient = useQueryClient()
  return useMutation(sendMessageFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('messages')
    }
  })
}

export const useEditMessage = () => {
  const queryClient = useQueryClient()
  return useMutation(updateMessageFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('messages')
    }
  })
}

export const useDeleteMessage = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteMessageFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('messages')
    }
  })
}

export const useGetMessages = (forumId: string) => {
  return useQuery(['messages', forumId], () => getMessagesFn(forumId))
}
