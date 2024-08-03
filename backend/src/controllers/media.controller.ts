import { type Request, type Response } from 'express'

import { logError, logInfo } from '../utils/logger'
import * as MediaService from '../services/media.service'

export const createMediaCall = async (req: Request, res: Response) => {
  const forumId = req.body?.forumId as string
  const type = req.body?.type as string
  const memberId = req.userId as string

  if (!forumId) {
    logError(req, 'Forum id is required')
    return res.status(400).json({ message: 'Forum id is required' })
  }

  try {
    const data = await MediaService.enabledMediaCall(forumId, memberId, type)
    await MediaService.sendMediaCallInvite(forumId, type)

    const forumKey = `media:${forumId}:enabled`
    req.io?.emit(forumKey, data)

    logInfo(req, `Creating ${type} call`)
    res.status(200).json({ message: `Berhasil membuat ${type} call`, data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteMediaCall = async (req: Request, res: Response) => {
  const mediaId = req.params?.mediaId
  const userId = req.userId as string

  try {
    const isMediaCallExist = await MediaService.getMediaCallById(mediaId)
    if (!isMediaCallExist) {
      logError(req, 'Media call not found')
      return res.status(404).json({ error: 'Media call tidak ditemukan' })
    }

    const data = await MediaService.removeMediaCallById(mediaId, userId)

    const forumKey = `media:${isMediaCallExist.forum_id}:disabled`
    req.io?.emit(forumKey, data)

    logInfo(req, 'Deleting media call')
    res.status(200).json({ message: 'Berhasil menghapus media call', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getMediaCall = async (req: Request, res: Response) => {
  const mediaId = req.params?.mediaId

  try {
    const data = await MediaService.getMediaCallById(mediaId)
    logInfo(req, 'Getting video call')
    res.status(200).json({ message: 'Berhasil mendapatkan video call', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getEnabledMediaCall = async (req: Request, res: Response) => {
  const forumId = req.params?.forumId

  try {
    const data = await MediaService.getEnabledMediaCallByForumId(forumId)
    if (!data) {
      logError(req, 'Video call not found')
      return res.status(404).json({ error: 'Video call tidak ditemukan' })
    }

    logInfo(req, 'Getting enabled video call')
    res.status(200).json({ message: 'Berhasil mendapatkan video call yang aktif', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
