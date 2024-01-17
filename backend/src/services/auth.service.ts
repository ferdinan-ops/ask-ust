import axios from 'axios'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import db from '../utils/db'
import ENV from '../utils/environment'

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

export const addUser = async (payload: IUser) => {
  return await db.user.create({ data: payload })
}

export const findUserByEmail = async (email: string) => {
  return await db.user.findUnique({ where: { email } })
}
