import {
  HiArrowRightOnRectangle,
  HiChatBubbleBottomCenterText,
  HiComputerDesktop,
  HiMicrophone,
  HiVideoCamera
} from 'react-icons/hi2'

import { Profile1, Profile2, Profile3, Profile4, Profile5, Profile6, Profile7, Profile8 } from '@/assets'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import { useGetLivekitToken, useGetVideoCall } from '@/store/server/useMedia'
import { MediaRoom } from '@/components/organism'
// import { MediaRoom } from '@/components/organism'

const dummyData = [Profile1, Profile2, Profile3, Profile4, Profile5, Profile6, Profile7, Profile8]

export default function VideoForum() {
  const { videoId } = useParams<{ slug: string; videoId: string }>()
  const { data: video, isLoading } = useGetVideoCall(videoId as string)
  const { isSuccess, data: token } = useGetLivekitToken(video?.id as string, video?.member.user.username as string)

  if (isLoading || !isSuccess) return <div>Loading...</div>

  return (
    <section className="flex flex-col gap-7">
      {isSuccess && <MediaRoom audio={true} video={true} token={token as string} />}
      <div className="grid min-h-[calc(100vh-68px-56px-40px-28px)] grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 xl:grid-rows-2">
        {dummyData.map((item, index) => (
          <div
            className="relative flex-1 overflow-hidden rounded-lg border-2 border-zinc-400 ring-2 ring-zinc-300 dark:border-zinc-900 dark:ring-zinc-700"
            key={index}
          >
            <img src={item} alt="video" className="h-full w-full object-cover" />
            <p className="absolute bottom-0 left-0 bg-primary/70 px-2 py-1 text-sm font-semibold text-white">
              John doe
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-5">
        <Button variant="call" className="gap-2.5 bg-zinc-700">
          <HiMicrophone className="h-5 w-5" />
          <p>Microphone</p>
        </Button>
        <Button variant="call" className="gap-2.5 bg-zinc-700">
          <HiVideoCamera className="h-5 w-5" />
          <p>Camera</p>
        </Button>
        <Button variant="call" className="gap-2.5 bg-zinc-700">
          <HiComputerDesktop className="h-5 w-5" />
          <p>Share Screen</p>
        </Button>
        <Button variant="call" className="gap-2.5 bg-zinc-700">
          <HiChatBubbleBottomCenterText className="h-5 w-5" />
          <p>Chat</p>
        </Button>
        <Button className="gap-2.5" variant="destructive">
          <HiArrowRightOnRectangle className="h-5 w-5" />
          <p>Leave</p>
        </Button>
      </div>
    </section>
  )
}
