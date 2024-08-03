import { Navigate, useLocation, useParams } from 'react-router-dom'

import { MediaRoom } from '@/components/organism'
import { useUserInfo } from '@/store/client'
import { useGetLivekitToken, useGetMediaCall } from '@/store/server/useMedia'
import { Loading } from '@/components/atoms'

interface MediaForumProps {
  type: 'video' | 'voice'
}

export default function MediaForum({ type }: MediaForumProps) {
  const location = useLocation()
  const { mediaId } = useParams<{ slug: string; mediaId: string }>()
  const { user } = useUserInfo()

  const { data: media, isLoading: isLoadingMedia } = useGetMediaCall(mediaId as string)
  const { isSuccess, data: token } = useGetLivekitToken(mediaId as string, user?.fullname as string)

  if (!isSuccess) {
    return <Loading className="min-h-screen flex-1 lg:min-h-screen" />
  }

  if (!isLoadingMedia && !media) {
    return <Navigate to="/404" replace state={{ from: location }} />
  }

  return (
    <MediaRoom
      audio={true}
      video={type === 'video' ? true : false}
      token={token as unknown as string}
      onDisconnected={() => console.log('')}
    />
  )
}
