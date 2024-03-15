import {
  deleteMessageBySpecificRoleFn,
  deleteMessageFn,
  getMessagesFn,
  sendImageFn,
  sendMessageFn,
  updateMessageFn
} from '@/api/message.api'
import { handleOnError } from '@/lib/services/handleToast'
import { AxiosError } from 'axios'
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query'

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

export const useDeleteMessageBySpecificRole = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteMessageBySpecificRoleFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('messages')
    }
  })
}

export const useSendImageMessage = () => {
  const queryClient = useQueryClient()
  return useMutation(sendImageFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('messages')
    }
  })
}

export const useGetMessages = (forumId: string) => {
  return useInfiniteQuery({
    queryKey: `messages:${forumId}`,
    queryFn: ({ pageParam }) => getMessagesFn(forumId, pageParam),
    getNextPageParam: (lastPage) => lastPage?.next_cursor
  })
}
