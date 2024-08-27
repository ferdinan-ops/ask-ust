import { getForumByKeywordFn, getMemberByKeywordFn, getUserByKeywordFn } from '@/api/search.api'
import { useQuery } from 'react-query'

export const useSearchForums = (keyword: string, enabled: boolean) => {
  return useQuery(['forum', keyword], async () => await getForumByKeywordFn(keyword), {
    enabled
  })
}

export const useSearchMembers = (keyword: string, forumId: string, enabled: boolean) => {
  return useQuery(['members', keyword], async () => await getMemberByKeywordFn(keyword, forumId), {
    enabled
  })
}

export const useSearchUsers = (keyword: string, enabled: boolean) => {
  return useQuery(['user', keyword], async () => await getUserByKeywordFn(keyword), {
    enabled
  })
}
