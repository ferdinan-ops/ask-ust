import { Navigate, useLocation, useParams } from 'react-router-dom'

import { MediaRoom } from '@/components/organism'
import { useUserInfo } from '@/store/client'
import { useGetLivekitToken, useGetVoiceCall } from '@/store/server/useMedia'
import { Loading } from '@/components/atoms'

export default function VoiceForum() {
  const location = useLocation()
  const { voiceId } = useParams<{ slug: string; voiceId: string }>()

  const { user } = useUserInfo()
  const { data: voice, isLoading: isLoadingVoice } = useGetVoiceCall(voiceId as string)
  const { isSuccess, data: token } = useGetLivekitToken(voiceId as string, user?.fullname as string)

  if (!isSuccess) {
    return <Loading className="min-h-screen flex-1 lg:min-h-screen" />
  }

  if (!isLoadingVoice && !voice) {
    return <Navigate to="/404" replace state={{ from: location }} />
  }

  return <MediaRoom audio={true} video={false} token={token as string} onDisconnected={() => console.log('')} />
}
