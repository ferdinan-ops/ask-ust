import { MemberType } from './member.type'

export type ForumType = {
  id: string
  title: string
  description: string
  invite_code: string
  user_id: string
  created_at: string
  updated_at: string
}

export type MetaType = {
  current_page: number
  limit: number
  total: number
}

type ForumListType = ForumType & { members: MemberType[] }
export type ForumDetailType = ForumType & {
  _count: {
    messages: number
    members: number
  }
}

export type ForumResponseType = {
  message: string
  data: ForumListType[]
  meta: MetaType
}
