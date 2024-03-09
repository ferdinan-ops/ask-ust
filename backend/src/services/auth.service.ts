import axios from 'axios'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import db from '../utils/db'
import ENV from '../utils/environment'
import { userSelect } from '../utils/service'
import sendMail from '../middlewares/mailer'

import { type IGoogleLogin, type ITokenPayload, type IUser } from '../types/user.type'

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
  const url = 'https://www.googleapis.com/oauth2/v3/userinfo'
  const options = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.get<IGoogleLogin>(url, options)
  return response.data
}

export const sendVerifyEmail = (email: string, token: string) => {
  sendMail({
    from: ENV.emailUsername,
    to: email,
    subject: 'Verifikasi Email',
    html: `<p>Berikut ini token untuk verifikasi email anda:</p><h1>${token}</h1>`
  })
}

export const sendForgotPasswordEmail = (email: string, token: string) => {
  sendMail({
    from: ENV.emailUsername,
    to: email,
    subject: 'Reset Password',
    html: `<p>Berikut ini token untuk reset password anda:</p><h1>${token}</h1>`
  })
}

export const updateUserPassword = async (userId: string, password: string) => {
  return await db.user.update({ where: { id: userId }, data: { password } })
}

export const formatUsername = (username: string) => {
  return username.replace(/\s/g, '').toLowerCase()
}

export const generateToken = () => {
  return crypto.randomBytes(3).toString('hex')
}

interface IAddUserPayload {
  token: string
  is_email_verified?: boolean
}

export const addUser = async (payload: IUser & IAddUserPayload) => {
  return await db.user.create({ data: payload })
}

export const updateUserToken = async (userId: string, token: string) => {
  return await db.user.update({ where: { id: userId }, data: { token } })
}

export const findUserByEmail = async (email: string) => {
  return await db.user.findUnique({ where: { email } })
}

export const findUserByToken = async (token: string) => {
  return await db.user.findUnique({
    where: { token },
    select: userSelect.select
  })
}

export const verifyUserEmail = async (userId: string) => {
  return await db.user.update({
    where: { id: userId },
    data: {
      is_email_verified: true
    }
  })
}

export const findUserById = async (userId: string) => {
  return await db.user.findUnique({
    where: { id: userId },
    select: userSelect.select
  })
}
