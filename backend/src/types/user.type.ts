import { UserRole } from '@prisma/client'

export interface IUser {
  fullname: string
  username: string
  email: string
  password?: string
  photo?: string
  is_banned?: boolean
  banned_until?: string
}

export interface ITokenPayload {
  id: string
  isAdmin: boolean
  role: UserRole
}

export type IUserUpdatePayload = Omit<IUser, 'email' | 'password' | 'photo'>

export type ILoginPayload = Pick<IUser, 'email' | 'password'>

export type IChangePasswordPayload = Pick<IUser, 'password'>
export interface IVerifyEmailPayload {
  token: string
}

export interface IGoogleLogin {
  email: string
  name: string
  picture: string
}

export interface IResetPasswordPayload {
  token: string
  password: string
}
