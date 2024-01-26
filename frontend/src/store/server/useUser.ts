import { getMeFn } from '@/api/user.api'
import { useQuery } from 'react-query'

export const useGetMe = () => {
  return useQuery('me', getMeFn)
}
