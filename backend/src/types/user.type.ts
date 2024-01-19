export interface IUser {
  fullname: string
  username: string
  email: string
  password: string
  photo: string
}

export interface ITokenPayload {
  userId: string
}

export type ILoginPayload = Pick<IUser, 'email' | 'password'>

export interface IVerifyEmailPayload {
  token: string
}
