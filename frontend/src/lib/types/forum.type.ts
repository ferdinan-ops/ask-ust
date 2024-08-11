import { MemberType } from './member.type'
import { MetaType } from './pagination.type'
import { UserType } from './user.type'

export type ForumType = {
  id: string
  title: string
  description: string
  invite_code: string
  image?: string
  category: string
  type: 'PUBLIC' | 'PENDING' | 'RESTRICTED'
  note?: string
  user_id: string
  created_at: string
  updated_at: string
  user?: UserType
}

type ForumCountType = {
  _count: {
    messages: number
    members: number
    reports: number
  }
}

export type ForumListType = ForumType & { members: MemberType[] } & ForumCountType

export type ForumDetailType = ForumListType & ForumCountType

export type ForumResponseType = {
  message: string
  data: ForumListType[]
  meta: MetaType
}
