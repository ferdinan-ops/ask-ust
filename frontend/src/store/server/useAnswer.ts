import { createAnswersFn, getAnswersFn } from '@/api/answer.api'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useCreateAnswers = () => {
  const queryClient = useQueryClient()

  return useMutation(createAnswersFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('answers')
    }
  })
}

export const useGetAnswers = (userId: string) => {
  return useQuery(['answers', userId], () => getAnswersFn(userId))
}
