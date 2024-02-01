import { MemberType } from '@/lib/types/member.type'
import api from './axiosInstance'

export const getMembersFn = async (forumId: string): Promise<MemberType[]> => {
  const response = await api.get(`/members/forum/${forumId}`)
  return response.data?.data
}
