import { KickMemberParams, MemberType, ReportMemberParams, UpdateMemberParams } from '@/lib/types/member.type'
import api from './axiosInstance'

export const getMembersFn = async (forumId: string): Promise<MemberType[]> => {
  const response = await api.get(`/member/forum/${forumId}`)
  return response.data?.data
}

export const getMemberFn = async (forumId: string): Promise<MemberType> => {
  const response = await api.get(`/member/${forumId}`)
  return response.data?.data
}

export const updateRoleMemberFn = async ({ forumId, role, memberId }: UpdateMemberParams) => {
  return await api.put(`/member/${memberId}`, { forumId, role })
}

export const kickMemberFn = async ({ memberId, forumId }: KickMemberParams) => {
  return await api.delete(`/member/${memberId}/forum/${forumId}`)
}

export const reportMemberFn = async ({ forum_id, member_id, report_category }: ReportMemberParams) => {
  return await api.post(`/member/report`, { forum_id, member_id, report_category })
}

export const getMemberLoginFn = async (forumId: string): Promise<MemberType> => {
  const response = await api.get(`/member/forum/${forumId}/detail`)
  return response.data?.data?.members[0]
}
