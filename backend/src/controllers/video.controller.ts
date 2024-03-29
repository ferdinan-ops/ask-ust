import { type Request, type Response } from 'express'

import { logError, logInfo } from '../utils/logger'
import * as VideoService from '../services/video.service'

export const createVideoCall = async (req: Request, res: Response) => {
  const forumId = req.body?.forumId as string
  const memberId = req.userId as string

  if (!forumId) {
    logError(req, 'Forum id is required')
    return res.status(400).json({ message: 'Forum id is required' })
  }

  try {
    const data = await VideoService.enabledVideoCall(forumId, memberId)
    await VideoService.sendVideoCallInvite(forumId)

    const forumKey = `video:${forumId}:enabled`
    req.io?.emit(forumKey, data)

    logInfo(req, 'Creating video call')
    res.status(200).json({ message: 'Berhasil membuat video call', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteVideoCall = async (req: Request, res: Response) => {
  const videoId = req.params?.videoId
  const userId = req.userId as string

  try {
    const isVideoCallExist = await VideoService.getVideoCallById(videoId)
    if (!isVideoCallExist) {
      logError(req, 'Video call not found')
      return res.status(404).json({ error: 'Video call tidak ditemukan' })
    }

    const data = await VideoService.removeVideoCallById(videoId, userId)

    const forumKey = `video:${isVideoCallExist.forum_id}:disabled`
    req.io?.emit(forumKey, data)

    logInfo(req, 'Deleting video call')
    res.status(200).json({ message: 'Berhasil menghapus video call', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getVideoCall = async (req: Request, res: Response) => {
  const videoId = req.params?.videoId

  try {
    const data = await VideoService.getVideoCallById(videoId)

    console.log(data)

    logInfo(req, 'Getting video call')
    res.status(200).json({ message: 'Berhasil mendapatkan video call', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getEnabledVideoCall = async (req: Request, res: Response) => {
  const forumId = req.params?.forumId

  try {
    const data = await VideoService.getEnabledVideoCallByForumId(forumId)
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
