import axios from 'axios'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import db from '../utils/db'
import ENV from '../utils/environment'
import sendMail from '../middlewares/mailer'

import { type ITokenPayload, type IUser } from '../types/user.type'

export const hashing = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword)
}

export const accessTokenSign = (payload: ITokenPayload) => {
  return jwt.sign(payload, ENV.accessTokenSecret as string, { expiresIn: '1d' })
}

export const refreshTokenSign = (payload: ITokenPayload) => {
  return jwt.sign(payload, ENV.refreshTokenSecret as string, { expiresIn: '7d' })
}

export const verifyGoogleToken = async (token: string) => {
  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    return error
  }
}

export const sendVerifyEmail = (email: string, token: string) => {
  sendMail({
    from: ENV.emailUsername,
    to: email,
    subject: 'Verifikasi Email',
    html: `<p>Berikut ini token untuk verifikasi email anda:</p><h1>${token}</h1>`
  })
}

export const addUser = async (payload: IUser & { token: string }) => {
  return await db.user.create({ data: payload })
}

export const findUserByEmail = async (email: string) => {
  return await db.user.findUnique({ where: { email } })
}

export const findUserByToken = async (token: string) => {
  return await db.user.findUnique({ where: { token } })
}

export const verifyUserEmail = async (userId: string) => {
  return await db.user.update({
    where: { id: userId },
    data: { token: '', is_email_verified: true }
  })
}
