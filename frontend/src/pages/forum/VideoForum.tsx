import { Navigate, useLocation, useParams } from 'react-router-dom'

import { MediaRoom } from '@/components/organism'
import { useUserInfo } from '@/store/client'
import { useGetLivekitToken, useGetVideoCall } from '@/store/server/useMedia'

export default function VideoForum() {
  const location = useLocation()
  const { videoId } = useParams<{ slug: string; videoId: string }>()
  const { user } = useUserInfo()

  const { data: video, isLoading: isLoadingVideo } = useGetVideoCall(videoId as string)
  const { isSuccess, data: token } = useGetLivekitToken(videoId as string, user?.fullname as string)

  if (!isSuccess) return <div>Loading...</div>

  if (!isLoadingVideo && !video) {
    return <Navigate to="/404" replace state={{ from: location }} />
  }

  return <MediaRoom audio={true} video={true} token={token as string} onDisconnected={() => console.log('')} />
}
