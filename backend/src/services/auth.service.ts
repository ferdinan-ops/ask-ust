import axios from 'axios'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import db from '../utils/db'
import ENV from '../utils/environment'
import { userSelect } from '../utils/service'
import sendMail from '../middlewares/mailer'

import { type IGoogleLogin, type ITokenPayload, type IUser } from '../types/user.type'
import { emailFormat } from '../utils/emailFormat'
import { UserRole } from '@prisma/client'

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
    from: ENV.aplicationName,
    to: email,
    subject: 'Verifikasi Email',
    html: emailFormat({
      children: `
      <p>Hai, </p>
      <p>Sistem kami USTalk mendeteksi bahwa email ini digunakan untuk mendaftar di aplikasi kami.</p>
      <p>Kami telah berhasil mengirimkan kode verifikasi pada email ini. Untuk melanjutkan proses, silahkan salin kode verifikasi yang terdapat dibawah ini, lalu tempel pada inputan dilaman Anda berada sebelumnya.</p>
      <br/>
      <h2 style="margin:0 auto; padding: 13px 16px; background-color: #ddd; border-radius: 6px; width: fit-content;">${token}</h2>
      `
    })
  })
}

export const updateUserPassword = async (userId: string, password: string) => {
  return await db.user.update({ where: { id: userId }, data: { password } })
}

export const sendForgotPasswordEmail = (email: string, token: string) => {
  sendMail({
    from: ENV.aplicationName,
    to: email,
    subject: 'Atur Ulang Kata Sandi',
    html: emailFormat({
      children: `
      <p>Hai, </p>
      <p>Kami mendeteksi bahwa Anda meminta untuk mengatur ulang kata sandi akun Anda.</p>
      <p>Kami telah berhasil mengirimkan kode verifikasi pada email ini. Untuk melanjutkan proses, silahkan salin kode verifikasi yang terdapat dibawah ini, lalu tempel pada inputan dilaman Anda berada sebelumnya.</p>
      <br/>
      <h2 style="margin:0 auto; padding: 13px 16px; background-color: #ddd; border-radius: 6px; width: fit-content;">${token}</h2>
      `
    })
  })
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
  provider?: string
  role?: UserRole
}

export const addUser = async (payload: IUser & IAddUserPayload) => {
  return await db.user.create({
    data: payload,
    select: {
      ...userSelect.select,
      validate: true
    }
  })
}

export const updateUserToken = async (userId: string, token: string) => {
  return await db.user.update({ where: { id: userId }, data: { token } })
}

export const findUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: { email },
    include: { validate: true }
  })
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
    },
    select: {
      ...userSelect.select,
      validate: true
    }
  })
}

export const findUserById = async (userId: string) => {
  return await db.user.findUnique({
    where: { id: userId },
    select: userSelect.select
  })
}
