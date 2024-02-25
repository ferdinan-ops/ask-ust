import { UserType } from './user.type'

export type AuthResponseType = {
  access_token: string
  refresh_token: string
  user: UserType
}

export type ErrorResponseType = {
  error: string
}
