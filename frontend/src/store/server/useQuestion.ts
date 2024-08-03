import { createQuestionFn, getQuestionForUserFn, getQuestionsFn, updateQuestionFn } from '@/api/question.api'
import { toast } from '@/components/ui/use-toast'
import { handleOnError } from '@/lib/services/handleToast'
import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useGetQuestions = () => {
  return useQuery('questions', getQuestionsFn)
}

export const useGetQuestionForUser = () => {
  return useQuery(['questions', 'user'], getQuestionForUserFn, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    staleTime: 30 * 60 * 1000 // 30 minutes
  })
}

export const useCreateQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation(createQuestionFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('questions')
      toast({
        title: 'Pertanyaan berhasil dibuat',
        description: 'Pertanyaan berhasil ditambahkan ke dalam sistem'
      })
    }
  })
}

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient()

  return useMutation(updateQuestionFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('questions')
      toast({
        title: 'Pertanyaan berhasil diubah',
        description: 'Pertanyaan berhasil diubah dari sistem'
      })
    }
  })
}
