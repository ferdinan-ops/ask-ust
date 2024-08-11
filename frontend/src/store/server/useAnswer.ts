import { createAnswersFn, getAnswersFn } from '@/api/answer.api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useUserInfo } from '../client'
import { ValidateUserType } from '@/lib/types/user.type'

export const useCreateAnswers = () => {
  const queryClient = useQueryClient()

  return useMutation(createAnswersFn, {
    onSuccess: (data: ValidateUserType) => {
      queryClient.invalidateQueries('answers')
      useUserInfo.getState().setUser({ ...useUserInfo.getState().user, validate: data })
    }
  })
}

export const useGetAnswers = (userId: string) => {
  return useQuery(['answers', userId], () => getAnswersFn(userId))
}
