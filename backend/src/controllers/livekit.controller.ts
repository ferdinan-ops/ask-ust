import { type Request, type Response } from 'express'
import { logError, logInfo } from '../utils/logger'
import ENV from '../utils/environment'
import { AccessToken } from 'livekit-server-sdk'

export const createToken = async (req: Request, res: Response) => {
  const roomName = req.query.id as string
  const participantName = req.query.username as string

  if (!roomName || !participantName) {
    logError(req, 'Room name and participant name are required')
    return res.status(400).json({ message: 'Room name and participant name are required' })
  }

  try {
    const at = new AccessToken(ENV.livekitApiKey, ENV.livekitApiSecret, {
      identity: participantName
    })

    at.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true
    })

    const token = at.toJwt()

    logInfo(req, 'Creating token')
    res.status(200).json({ message: 'Token created', token })
  } catch (error) {
    res.status(500).json({ error })
  }
}
