import { MetaType } from './forum.type'

export type UserType = {
  id: string
  fullname: string
  username: string
  email: string
  photo?: string
  provider?: string
  is_admin?: boolean
  validate?: ValidateUserType
}

export type UserForumCountType = {
  my_forum: number
  joined_forum: number
}

export type ValidateUserType = {
  id: string
  file: string
  photo: string
  is_valid: boolean
  note?: string
  user_id: string
  created_at: string
}

export type UserResponseType = {
  data: UserType[]
  meta: MetaType
}
