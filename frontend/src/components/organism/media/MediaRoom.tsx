import '@livekit/components-styles'

import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import { useNavigate } from 'react-router-dom'

import ENV from '@/lib/environment'

interface MediaRoomProps {
  video: boolean
  audio: boolean
  token: string
  onDisconnected?: () => void
}

export default function MediaRoom({ video, audio, token, onDisconnected }: MediaRoomProps) {
  const navigate = useNavigate()
  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={ENV.livekitUrl}
      token={token}
      connect={true}
      video={video}
      audio={audio}
      onDisconnected={() => {
        navigate(-1)
        onDisconnected && onDisconnected()
      }}
      style={{ height: '100vh' }}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}
