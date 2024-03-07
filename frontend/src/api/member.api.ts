import { KickMemberParams, MemberType, ReportMemberParams, UpdateMemberParams } from '@/lib/types/member.type'
import api from './axiosInstance'

export const getMembersFn = async (forumId: string): Promise<MemberType[]> => {
  const response = await api.get(`/members/forum/${forumId}`)
  return response.data?.data
}

export const getMemberFn = async (forumId: string): Promise<MemberType> => {
  const response = await api.get(`/members/${forumId}`)
  return response.data?.data
}

export const updateRoleMemberFn = async ({ forumId, role, memberId }: UpdateMemberParams) => {
  return await api.put(`/members/${memberId}`, { forumId, role })
}

export const kickMemberFn = async ({ memberId, forumId }: KickMemberParams) => {
  return await api.delete(`/members/${memberId}/forum/${forumId}`)
}

export const reportMemberFn = async ({ forum_id, member_id, report_category }: ReportMemberParams) => {
  return await api.post(`/members/report`, { forum_id, member_id, report_category })
}

export const getMemberLoginFn = async (forumId: string): Promise<MemberType> => {
  const response = await api.get(`/members/forum/${forumId}/detail`)
  return response.data?.data?.members[0]
}
