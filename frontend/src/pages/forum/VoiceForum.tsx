import { useParams } from 'react-router-dom'

import { MediaRoom } from '@/components/organism'
import { useGetMe } from '@/store/server/useUser'
import { useGetLivekitToken } from '@/store/server/useMedia'

export default function VoiceForum() {
  const { voiceId } = useParams<{ slug: string; voiceId: string }>()

  const { data: user, isLoading } = useGetMe()
  const { isSuccess, data: token } = useGetLivekitToken(voiceId as string, user?.fullname as string)

  if (isLoading && !isSuccess) return <div>Loading...</div>

  return <MediaRoom audio={true} video={false} token={token as string} onDisconnected={() => console.log('')} />
}
