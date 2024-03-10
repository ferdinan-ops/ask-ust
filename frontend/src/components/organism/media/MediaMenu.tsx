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
import { IconType } from 'react-icons'

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
      {isMobile && (
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
            <DropdownMenuItem
              className="gap-2.5 font-semibold text-primary"
              onClick={() => navigate(`/forums/${forumId}/member`)}
            >
              <HiOutlineUserGroup className="text-lg" />
              <p className="text-[13px]">Lihat anggota</p>
            </DropdownMenuItem>
            <ShareForum inviteCode={invitedCode}>
              <Button
                variant="contextItem"
                className="h-fit justify-start gap-2.5 px-2 py-1.5 font-semibold text-primary dark:hover:bg-white/10"
              >
                <HiOutlineShare className="text-lg" />
                <p className="text-[13px]">Bagikan forum</p>
              </Button>
            </ShareForum>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {(isDesktop || isTablet) && (
        <article className="flex items-center gap-0 md:gap-2">
          <IconButton onClick={handleCreateVideoCall} icon={HiOutlineVideoCamera} loading={isLoadingVideo} />
          <IconButton onClick={handleCreateVoiceCall} icon={HiOutlinePhone} loading={isLoadingVoice} />
          {isTablet && <IconButton onClick={() => navigate(`/forums/${forumId}/member`)} icon={HiOutlineUserGroup} />}

          <ShareForum inviteCode={invitedCode}>
            <IconButton icon={HiOutlineShare} />
          </ShareForum>
        </article>
      )}
    </React.Fragment>
  )
}

interface IconButtonProps {
  onClick?: () => void
  icon: IconType
  loading?: boolean
}

function IconButton({ onClick, icon: Icon, loading }: IconButtonProps) {
  const className = 'rounded-full border-none dark:bg-primary'

  return (
    <Button variant="outline" size="icon" loading={loading} className={className} onClick={onClick}>
      <Icon className="text-lg md:text-xl" />
    </Button>
  )
}
