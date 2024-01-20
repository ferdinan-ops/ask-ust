import { type Request, type Response } from 'express'

import { logError, logInfo, logWarn } from '../utils/logger'

import * as UserService from '../services/user.service'
import { validUpdateUser } from '../validations/user.validation'

import { type IUserUpdatePayload } from '../types/user.type'

export const getMe = async (req: Request, res: Response) => {
  try {
    const data = await UserService.getUserLogin(req.userId as string)
    if (!data) {
      logWarn(req, 'User not found')
      return res.status(404).json({ message: 'User not found' })
    }

    const { password, ...rest } = data
    logInfo(req, 'Getting user data')
    res.status(200).json({ message: 'Berhasil menampilkan data user', data: rest })
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
    const data = await UserService.getUserLoginForums(userId, currentPage, perPage)
    const total = await UserService.getUserLoginForumsCount(userId)

    logInfo(req, 'Getting user forums')
    res.status(200).json({
      message: 'Berhasil menampilkan data forum user',
      data,
      meta: {
        current_page: currentPage,
        limit: perPage,
        total
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
    const data = await UserService.getForumByMemberId(userId, currentPage, perPage)
    const total = await UserService.getForumByMemberIdCount(userId)

    logInfo(req, 'Getting user forums')
    res.status(200).json({
      message: 'Berhasil menampilkan data forum user',
      data,
      meta: {
        current_page: currentPage,
        limit: perPage,
        total
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
    if (user) {
      logWarn(req, 'Username already exists')
      return res.status(400).json({ message: 'Username sudah dipakai' })
    }

    const data = await UserService.updateUserById(req.userId as string, value)
    logInfo(req, 'Updating user data')
    res.status(200).json({ message: 'Berhasil mengubah data user', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
