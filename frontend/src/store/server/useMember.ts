import { getMemberFn, getMembersFn } from '@/api/member.api'
import { useQuery } from 'react-query'

export const useGetMembers = (forumId: string) => {
  return useQuery('members', () => getMembersFn(forumId))
}

export const useGetMember = (memberId: string) => {
  return useQuery(['members', memberId], () => getMemberFn(memberId))
}
