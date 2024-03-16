import { Navigate, useLocation, useParams } from 'react-router-dom'

import { MediaRoom } from '@/components/organism'
import { useUserInfo } from '@/store/client'
import { useGetLivekitToken, useGetVideoCall } from '@/store/server/useMedia'
import { Loading } from '@/components/atoms'

export default function VideoForum() {
  const location = useLocation()
  const { videoId } = useParams<{ slug: string; videoId: string }>()
  const { user } = useUserInfo()

  const { data: video, isLoading: isLoadingVideo } = useGetVideoCall(videoId as string)
  const { isSuccess, data: token } = useGetLivekitToken(videoId as string, user?.fullname as string)

  if (!isSuccess) {
    return <Loading className="min-h-screen flex-1 lg:min-h-screen" />
  }

  if (!isLoadingVideo && !video) {
    return <Navigate to="/404" replace state={{ from: location }} />
  }

  return (
    <MediaRoom audio={true} video={true} token={token as unknown as string} onDisconnected={() => console.log('')} />
  )
}
