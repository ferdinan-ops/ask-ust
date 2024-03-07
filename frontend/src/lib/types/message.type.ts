import { MemberType } from './member.type'

export type MessageBodyType = {
  forumId: string
  content: string
}

export type DeleteMessageParamsType = {
  messageId: string
  forumId: string
}

export type MessageType = {
  id: string
  content: string
  file_url?: string
  is_deleted: boolean
  forum_id: string
  member_id: string
  member: MemberType
  created_at: string
}
