import { AccessToken } from 'livekit-server-sdk'
import ENV from '../utils/environment'

export const generateLivekitToken = async (participantName: string, roomName: string) => {
  const at = new AccessToken(ENV.livekitApiKey, ENV.livekitApiSecret, {
    identity: participantName
  })

  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true
  })

  return await at.toJwt()
}
