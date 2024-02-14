import '@livekit/components-styles'
import ENV from '@/lib/environment'
import { ControlBar, LiveKitRoom, RoomAudioRenderer, VideoConference } from '@livekit/components-react'

interface MediaRoomProps {
  video: boolean
  audio: boolean
  token: string
}

export default function MediaRoom({ video, audio, token }: MediaRoomProps) {
  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={ENV.livekitUrl}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  )
}
