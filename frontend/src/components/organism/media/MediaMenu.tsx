import { Button } from '@/components/ui/button'
import { HiOutlinePhone, HiOutlineVideoCamera } from 'react-icons/hi2'
import { ShareForum } from '..'
import { useCreateVideoCall, useCreateVoiceCall } from '@/store/server/useMedia'
import { useNavigate } from 'react-router-dom'

interface MediaMenuProps {
  forumId: string
  invitedCode: string
}

export default function MediaMenu({ forumId, invitedCode }: MediaMenuProps) {
  const navigate = useNavigate()
  const { mutate: createVideoCall, isLoading: isLoadingVideo } = useCreateVideoCall()
  const { mutate: createVoiceCall, isLoading: isLoadingVoice } = useCreateVoiceCall()

  const handleCreateVideoCall = () => {
    createVideoCall(forumId as string, {
      onSuccess: (data) => {
        navigate(`/forums/${forumId}/video/${data.id}`)
      }
    })
  }

  const handleCreateVoiceCall = () => {
    createVoiceCall(forumId as string, {
      onSuccess: (data) => {
        navigate(`/forums/${forumId}/voice/${data.id}`)
      }
    })
  }

  return (
    <article className="flex items-center gap-0 md:gap-2">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border-none dark:bg-primary"
        onClick={handleCreateVideoCall}
        loading={isLoadingVideo}
      >
        <HiOutlineVideoCamera className="text-lg md:text-xl" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border-none dark:bg-primary"
        onClick={handleCreateVoiceCall}
        loading={isLoadingVoice}
      >
        <HiOutlinePhone className="text-lg md:text-xl" />
      </Button>
      <ShareForum inviteCode={invitedCode} />
    </article>
  )
}
