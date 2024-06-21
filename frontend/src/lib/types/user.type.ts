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
  is_read: boolean
  note?: string
  user_id: string
  created_at: string
}

export type ValidateResponseType = {
  data: Array<ValidateUserType & { user: UserType }>
  meta: MetaType
}

export type UserResponseType = {
  data: UserType[]
  meta: MetaType
}
