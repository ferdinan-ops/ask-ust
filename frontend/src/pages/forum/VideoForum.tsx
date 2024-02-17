import { useParams } from 'react-router-dom'
import { useGetLivekitToken, useGetVideoCall } from '@/store/server/useMedia'
import { MediaRoom } from '@/components/organism'

export default function VideoForum() {
  const { videoId } = useParams<{ slug: string; videoId: string }>()
  const { data: video, isLoading } = useGetVideoCall(videoId as string)
  const { isSuccess, data: token } = useGetLivekitToken(video?.id as string, video?.member.user.username as string)

  if (isLoading || !isSuccess) return <div>Loading...</div>

  return <MediaRoom audio={true} video={true} token={token as string} onDisconnected={() => console.log('')} />
}
