import { type Request, type Response } from 'express'

import * as UserService from '../services/user.service'
import * as AuthService from '../services/auth.service'
import { logError, logInfo, logWarn } from '../utils/logger'
import { validChangePassword, validUpdateUser } from '../validations/user.validation'

import { IUser, type IChangePasswordPayload, type IUserUpdatePayload } from '../types/user.type'
import { validRegister } from '../validations/auth.validation'

export const getMe = async (req: Request, res: Response) => {
  try {
    const data = await UserService.getUserLogin(req.userId as string)
    if (!data) {
      logWarn(req, 'User not found')
      return res.status(404).json({ message: 'User not found' })
    }

    const joinedForumCount = await UserService.getUserJoinForumsCount(req.userId as string)
    const results = { ...data, _count: { forums: data._count.forums, joined_forum: joinedForumCount } }

    logInfo(req, 'Getting user data')
    res.status(200).json({ message: 'Berhasil menampilkan data user', data: results })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getProfileForumsCount = async (req: Request, res: Response) => {
  try {
    const loginForumCount = await UserService.getUserLoginForumsCount(req.userId as string)
    const joinedForumCount = await UserService.getUserJoinForumsCount(req.userId as string)
    const results = { joined_forum: joinedForumCount, my_forum: loginForumCount }

    logInfo(req, 'Getting user forums count')
    res.status(200).json({ message: 'Berhasil menampilkan data forum user', data: results })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getMyForums = async (req: Request, res: Response) => {
  const { page, limit } = req.query

  const userId = req.userId as string
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10

  try {
    const { data, count } = await UserService.getUserLoginForums(userId, currentPage, perPage)

    logInfo(req, 'Getting user forums')
    res.status(200).json({
      message: 'Berhasil menampilkan data forum user',
      data,
      meta: {
        current_page: currentPage,
        limit: perPage,
        total: count
      }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getJoinedForums = async (req: Request, res: Response) => {
  const { page, limit } = req.query

  const userId = req.userId as string
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10

  try {
    const { data, count } = await UserService.getForumByMemberId(userId, currentPage, perPage)

    logInfo(req, 'Getting user forums')
    res.status(200).json({
      message: 'Berhasil menampilkan data forum user',
      data,
      meta: {
        current_page: currentPage,
        limit: perPage,
        total: count
      }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateMe = async (req: Request, res: Response) => {
  const { value, error } = validUpdateUser(req.body as IUserUpdatePayload)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const user = await UserService.getUserByUsername(value.username)
    if (user && user.id !== req.userId) {
      logWarn(req, 'Username already exists')
      return res.status(400).json({ error: 'Username sudah dipakai' })
    }

    const data = await UserService.updateUserById(req.userId as string, value)

    logInfo(req, 'Updating user data')
    res.status(200).json({ message: 'Berhasil mengubah data user', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const changePassword = async (req: Request, res: Response) => {
  const { value, error } = validChangePassword(req.body as IChangePasswordPayload)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    await AuthService.updateUserPassword(req.userId as string, value.password as string)

    logInfo(req, 'Changing user password')
    res.clearCookie('ask-ust-refresh-token')
    res.status(200).json({ message: 'Berhasil mengubah password user' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const changeProfilePicture = async (req: Request, res: Response) => {
  if (!req.file) {
    logWarn(req, 'No file uploaded')
    return res.status(400).json({ error: 'Tidak ada file yang diupload' })
  }

  try {
    const data = await UserService.updatePhoto(req.userId as string, req.file.filename)

    logInfo(req, 'Changing user profile picture')
    res.status(200).json({ message: 'Berhasil mengubah foto profil user', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const changeEmail = async (req: Request, res: Response) => {
  const { email } = req.body

  try {
    const user = await UserService.getUserByEmail(email as string)
    if (user) {
      logWarn(req, 'Email already exists')
      return res.status(400).json({ error: 'Email sudah dipakai' })
    }

    const token = AuthService.generateToken()
    await UserService.updateEmail(req.userId as string, email as string, token)
    AuthService.sendVerifyEmail(email as string, token)
    logInfo(req, 'Changing user email')
    res.status(200).json({ message: 'Berhasil mengubah email user' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const bannedUserFromApp = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    await UserService.bannedUserEmail(userId)
    logInfo(req, 'Banning user')
    res.status(200).json({ message: 'Berhasil banned user' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const createAdmin = async (req: Request, res: Response) => {
  const { value, error } = validRegister(req.body as IUser)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const isUserExist = await AuthService.findUserByEmail(value.email)
    if (isUserExist) {
      if (isUserExist.banned_type === 'QUIZ') {
        logWarn(req, 'User is banned')
        return res.status(400).json({ error: 'Email ini telah diblokir dari aplikasi kami' })
      }

      logWarn(req, 'Email is already registered')
      return res.status(400).json({ error: 'Email sudah terdaftar' })
    }

    const token = AuthService.generateToken()
    value.password = AuthService.hashing(value.password as string).toString()
    await AuthService.addUser({
      ...value,
      token,
      is_email_verified: true,
      role: 'ADMIN'
    })

    logInfo(req, 'User account has been registered')
    res.status(200).json({ message: 'Akun berhasil terdaftar' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    await UserService.removeUserById(userId)
    logInfo(req, 'Deleting admin account')
    res.status(200).json({ message: 'Akun admin berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getAllAdmin = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10
  const search = q as string

  try {
    const { data, count } = await UserService.fetchAdmins(currentPage, perPage, search)

    logInfo(req, 'Getting all admin accounts')
    res.status(200).json({
      message: 'Berhasil menampilkan data admin',
      data,
      meta: {
        current_page: currentPage,
        limit: perPage,
        total: count
      }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getAdmin = async (req: Request, res: Response) => {
  const userId = req.params?.userId

  try {
    const data = await UserService.fetchAdminById(userId)
    if (!data) {
      logWarn(req, 'Admin not found')
      return res.status(404).json({ message: 'Admin not found' })
    }

    logInfo(req, 'Getting admin data')
    res.status(200).json({ message: 'Berhasil menampilkan data admin', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateAdmin = async (req: Request, res: Response) => {
  const { value, error } = validRegister(req.body as IUser)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const isUserExist = await AuthService.findUserByEmail(value.email)
    if (isUserExist && isUserExist.id !== req.params.userId) {
      logWarn(req, 'Email is already registered')
      return res.status(400).json({ error: 'Email sudah terdaftar' })
    }

    const isUsernameExist = await UserService.getUserByUsername(value.username)
    if (isUsernameExist && isUsernameExist?.id !== req.params.userId) {
      logWarn(req, 'Username is already registered')
      return res.status(400).json({ error: 'Username sudah terdaftar' })
    }

    if (value.password) {
      value.password = AuthService.hashing(value.password).toString()
    }

    const { photo, ...rest } = value
    await UserService.changeAdminById(req.params.userId, rest)

    logInfo(req, 'Updating admin account')
    res.status(200).json({ message: 'Berhasil mengubah data admin' })
  } catch (error) {
    res.status(500).json({ error })
  }
}
