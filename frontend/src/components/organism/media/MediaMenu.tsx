import { Button } from '@/components/ui/button'
import {
  HiEllipsisHorizontal,
  HiOutlinePhone,
  HiOutlineShare,
  HiOutlineUserGroup,
  HiOutlineVideoCamera
} from 'react-icons/hi2'
import { ShareForum } from '..'
import { useCreateVideoCall, useCreateVoiceCall } from '@/store/server/useMedia'
import { useNavigate } from 'react-router-dom'
import { useGetDevices } from '@/hooks'
import * as React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface MediaMenuProps {
  forumId: string
  invitedCode: string
}

export default function MediaMenu({ forumId, invitedCode }: MediaMenuProps) {
  const navigate = useNavigate()
  const { isMobile, isTablet, isDesktop } = useGetDevices()

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
    <React.Fragment>
      {(isMobile || isTablet) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full p-0 dark:bg-primary">
              <HiEllipsisHorizontal className="text-xl" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuItem className="gap-2.5 font-semibold text-primary" onClick={handleCreateVideoCall}>
              <HiOutlineVideoCamera className="text-lg" />
              <p className="text-[13px]">Panggilan video</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2.5 font-semibold text-primary" onClick={handleCreateVoiceCall}>
              <HiOutlinePhone className="text-lg" />
              <p className="text-[13px]">Panggilan suara</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2.5 font-semibold text-primary">
              <HiOutlineShare className="text-lg" />
              <p className="text-[13px]">Bagikan forum</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2.5 font-semibold text-primary"
              onClick={() => navigate(`/forums/${forumId}/member`)}
            >
              <HiOutlineUserGroup className="text-lg" />
              <p className="text-[13px]">Lihat anggota</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {isDesktop && (
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
      )}
    </React.Fragment>
  )
}
