import { MemberType } from './member.type'
import { ReportType } from './report.type'

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

type ForumListType = ForumType & { members: MemberType[] } & { reports: ReportType[] }
type ForumCountType = {
  _count: {
    messages: number
    members: number
  }
}
export type ForumDetailType = ForumListType & ForumCountType

export type ForumResponseType = {
  message: string
  data: ForumListType[]
  meta: MetaType
}
