import { ForumType } from '@/lib/types/forum.type'
import api from './axiosInstance'
import { MemberType } from '@/lib/types/member.type'

export const getForumByKeywordFn = async (keyword: string): Promise<ForumType[]> => {
  const response = await api.get('/search/forums', { params: { q: keyword } })
  return response.data?.data
}

export const getMemberByKeywordFn = async (keyword: string, forumId: string): Promise<MemberType[]> => {
  const response = await api.get(`/search/members/${forumId}`, { params: { q: keyword } })
  return response.data?.data
}
