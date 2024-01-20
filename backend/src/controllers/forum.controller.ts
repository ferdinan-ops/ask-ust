import { type Response, type Request } from 'express'

import { logError, logInfo } from '../utils/logger'
import { validForum } from '../validations/forum.validation'
import * as ForumService from '../services/forum.service'

import { type IForum } from '../types/forum.type'

export const createForum = async (req: Request, res: Response) => {
  const { value, error } = validForum(req.body as IForum)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const data = await ForumService.addNewForum({
      ...value,
      user_id: req.userId as string
    })

    logInfo(req, 'Creating new forum')
    res.status(201).json({ message: 'Forum baru berhasil dibuat', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteForum = async (req: Request, res: Response) => {
  if (req.body?.forumId) {
    logError(req, 'Forum id is not provided')
    return res.status(400).json({ message: 'Forum id is not provided' })
  }

  try {
    const data = await ForumService.deleteForumById(req.body.forumId as string)

    logInfo(req, 'Deleting forum')
    res.status(200).json({ message: 'Forum berhasil dihapus', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getForums = async (req: Request, res: Response) => {
  const { page, limit } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10

  try {
    const data = await ForumService.getForumsFromDB(currentPage, perPage)
    const total = await ForumService.getForumsCount()

    logInfo(req, 'Getting forums')
    res.status(200).json({
      message: 'Berhasil menampilkan seluruh forum',
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

export const getForum = async (req: Request, res: Response) => {
  if (req.params?.forumId) {
    logError(req, 'Forum id is not provided')
    return res.status(400).json({ message: 'Forum id is not provided' })
  }

  try {
    const data = await ForumService.getForumById(req.params.forumId)

    logInfo(req, 'Getting forum')
    res.status(200).json({ message: 'Berhasil menampilkan detail forum', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
