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

    logInfo(req, 'Creating video call')
    res.status(200).json({ message: 'Berhasil membuat video call', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getVideoCall = async (req: Request, res: Response) => {
  const videoId = req.params?.videoId

  console.log({ videoId })

  try {
    const data = await VideoService.getVideoCallById(videoId)

    console.log({ data })

    logInfo(req, 'Getting video call')
    res.status(200).json({ message: 'Berhasil mendapatkan video call', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
