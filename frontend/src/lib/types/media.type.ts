import { MemberType } from './member.type'

export type MediaRoomType = {
  id: string
  forum_id: string
  member_id: string
  is_enabled: boolean
  created_at: string
  updated_at: string
  member: MemberType
}
