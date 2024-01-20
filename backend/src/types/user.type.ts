export interface IUser {
  fullname: string
  username: string
  email: string
  password?: string
  photo?: string
}

export interface ITokenPayload {
  id: string
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
