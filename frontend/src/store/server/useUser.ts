import { getJoinedForumsFn, getMeFn, getMyForumFn } from '@/api/user.api'
import { useQuery } from 'react-query'

export const useGetMe = () => {
  return useQuery('me', getMeFn)
}

export const useGetJoinedForums = (page: number) => {
  return useQuery(['joined-forums', page], async () => await getJoinedForumsFn(page))
}

export const useGetMyForums = (page: number) => {
  return useQuery(['my-forums', page], async () => await getMyForumFn(page))
}
