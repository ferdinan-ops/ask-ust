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
