import { type Response, type Request } from 'express'

import { logError, logInfo } from '../utils/logger'
import { validForum, validUpdateForum } from '../validations/forum.validation'
import * as ForumService from '../services/forum.service'

import { type IForum } from '../types/forum.type'
import { uploadFileToBucket } from '../middlewares/supabase'

export const createForum = async (req: Request, res: Response) => {
  const { value, error } = validForum(req.body as IForum)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    if (req.file) {
      const image = await uploadFileToBucket(req.file)
      value.image = image
    }

    const data = await ForumService.addNewForum({
      ...value,
      userId: req.userId as string
    })

    logInfo(req, 'Creating new forum')
    res.status(201).json({ message: 'Forum baru berhasil dibuat', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteForum = async (req: Request, res: Response) => {
  if (!req.params?.forumId) {
    logError(req, 'Forum id is not provided')
    return res.status(400).json({ error: 'Id forum tidak diberikan' })
  }

  const forumId = req.params.forumId
  const userId = req.userId as string

  try {
    const data = await ForumService.deleteForumById(forumId, userId)

    logInfo(req, 'Deleting forum')
    res.status(200).json({ message: 'Forum berhasil dihapus', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getForums = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10

  try {
    const forums = await ForumService.getForumsFromDB({
      page: currentPage,
      limit: perPage,
      search: (q as string) || '',
      userId: req.userId as string
    })

    logInfo(req, 'Getting forums')
    res.status(200).json({
      message: 'Berhasil menampilkan seluruh forum',
      data: forums.data,
      meta: {
        current_page: currentPage,
        limit: perPage,
        total: forums.count
      }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getForum = async (req: Request, res: Response) => {
  if (!req.params?.forumId) {
    logError(req, 'Forum id is not provided')
    return res.status(400).json({ error: 'Forum id is not provided' })
  }

  try {
    const data = await ForumService.getForumById(req.params.forumId)
    if (!data) {
      logError(req, 'Forum not found')
      return res.status(404).json({ error: 'Forum not found' })
    }

    logInfo(req, 'Getting forum')
    res.status(200).json({ message: 'Berhasil menampilkan detail forum', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateForum = async (req: Request, res: Response) => {
  const { value, error } = validUpdateForum(req.body as IForum)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  if (!req.params?.forumId) {
    logError(req, 'Forum id is not provided')
    return res.status(400).json({ error: 'Forum id is not provided' })
  }

  try {
    if (req.file) {
      const image = await uploadFileToBucket(req.file)
      value.image = image
    }

    const data = await ForumService.updateForumById(req.params.forumId, req.userId as string, value)

    logInfo(req, 'Updating forum')
    res.status(200).json({ message: 'Berhasil mengubah detail forum', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const joinForum = async (req: Request, res: Response) => {
  if (!req.body?.forum_id) {
    logError(req, 'Forum id is not provided')
    return res.status(400).json({ error: 'Forum id is not provided' })
  }

  const forumId = req.body?.forum_id as string
  const userId = req.userId as string

  try {
    const forum = await ForumService.getForumById(forumId)
    if (!forum) {
      logError(req, 'Forum not found')
      return res.status(404).json({ error: 'Forum not found' })
    }

    const isMember = await ForumService.isMemberAlreadyJoin(forumId, userId)
    console.log(isMember)
    if (isMember) {
      logError(req, 'User already join the forum')
      return res.status(400).json({ error: 'Kamu sudah bergabung dengan forum ini' })
    }

    await ForumService.addMemberToForum({
      forumId,
      userId,
      status: forum.privacy !== 'PRIVATE'
    })

    logInfo(req, 'Joining forum')
    res.status(200).json({ message: 'Berhasil join forum' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const leaveForum = async (req: Request, res: Response) => {
  if (!req.body?.forum_id) {
    logError(req, 'Forum id is not provided')
    return res.status(400).json({ error: 'Forum id is not provided' })
  }

  try {
    const { forum_id: forumId } = req.body
    const data = await ForumService.removeMemberFromForum(forumId as string, req.userId as string)

    logInfo(req, 'Leaving forum')
    res.status(200).json({ message: 'Berhasil keluar forum', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const joinForumWithInviteCode = async (req: Request, res: Response) => {
  if (!req.body?.invite_code) {
    logError(req, 'Invite code is not provided')
    return res.status(400).json({ error: 'Invite code is not provided' })
  }

  const inviteCode = req.body.invite_code as string
  const userId = req.userId as string

  try {
    const forum = await ForumService.getForumByInviteCode(inviteCode)
    if (!forum) {
      logError(req, 'Forum not found')
      return res.status(404).json({ error: 'Forum not found' })
    }

    // check is user already join the forum
    const isMember = await ForumService.isMemberAlreadyJoin(forum.id, userId)
    console.log(isMember)
    if (isMember) {
      logError(req, 'User already join the forum')
      return res.status(400).json({ error: 'Kamu sudah bergabung dengan forum ini' })
    }

    const data = await ForumService.addMemberToForum({
      forumId: forum.id,
      userId,
      status: forum.privacy !== 'PRIVATE'
    })

    logInfo(req, 'Joining forum with invite code')
    res.status(200).json({ message: 'Berhasil join forum', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getForumConclusion = async (req: Request, res: Response) => {
  try {
    const data = await ForumService.fetchSummaryFromGeminiAi(req.params.forumId)
    logInfo(req, 'Getting forum conclusion')
    res.status(200).json({ message: 'Berhasil mendapatkan kesimpulan forum', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
