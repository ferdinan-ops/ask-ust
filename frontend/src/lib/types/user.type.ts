import { MetaType } from './pagination.type'

export type UserType = {
  id: string
  fullname: string
  username: string
  email: string
  photo?: string
  provider?: string
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
  is_banned: boolean
  banned_type: 'VIOLATION' | 'QUIZ'
  validate?: ValidateUserType
  quiz?: {
    total?: number
    isFinished?: boolean
  }
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
  role: string
  user_id: string
  created_at: string
  url_quiz_record: string
}

export type ValidateResponseType = {
  data: Array<ValidateUserType & { user: UserType }>
  meta: MetaType
}

export type UserResponseType = {
  data: UserType[]
  meta: MetaType
}

export type AdminResponseType = {
  data: UserType[]
  meta: MetaType
}

export type AdminFormType = {
  fullname: string
  username: string
  email: string
  password?: string
  confirmPassword?: string
}
