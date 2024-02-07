import { type ReportCategory, type MemberRole } from '@prisma/client'

export interface IUpdateMemberPayload {
  role: MemberRole
  forumId: string
}

export interface IReportMemberPayload {
  report_category: ReportCategory
  member_id: string
  forum_id: string
}

export interface IReportPayload {
  reportCategory: string
}

export interface IMembersParams {
  forumId: string
  page: number
  limit: number
  search: string
}

export interface IUpdateMemberParams {
  memberId: string
  forumId: string
  userId: string
  role: MemberRole
}
