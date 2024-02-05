import { getForumByKeywordFn, getMemberByKeywordFn } from '@/api/search.api'
import { useQuery } from 'react-query'

export const useSearchForums = (keyword: string, enabled: boolean) => {
  return useQuery(['forum', keyword], async () => await getForumByKeywordFn(keyword), {
    enabled
  })
}

export const useSearchMembers = (keyword: string, forumId: string, enabled: boolean) => {
  return useQuery(['member', keyword], async () => await getMemberByKeywordFn(keyword, forumId), {
    enabled
  })
}
