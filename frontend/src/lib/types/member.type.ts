import { UserType } from './user.type'

export type MemberType = {
  id: string
  role: string
  user_id: string
  forum_id: string
  created_at: string
  updated_at: string
  user: UserType
}

export type UpdateMemberParams = {
  memberId: string
  forumId: string
  role: string
}

export type KickMemberParams = {
  memberId: string
  forumId: string
}

export type ReportMemberParams = {
  member_id: string
  forum_id: string
  report_category: string
}
