import { Button } from '@/components/ui/button'
import {
  HiEllipsisHorizontal,
  HiOutlinePhone,
  HiOutlineShare,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
  HiOutlineVideoCamera
} from 'react-icons/hi2'
import { ShareForum } from '..'
import { useCreateMediaCall } from '@/store/server/useMedia'
import { useNavigate } from 'react-router-dom'
import { useGetDevices } from '@/hooks'
import * as React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { IconType } from 'react-icons'
import { SearchUser } from '@/components/atoms'
import { useGetMemberLogin } from '@/store/server/useMember'

interface MediaMenuProps {
  forumId: string
  invitedCode: string
  privacy: string
}

export default function MediaMenu({ forumId, invitedCode, privacy }: MediaMenuProps) {
  const navigate = useNavigate()
  const { isMobile, isTablet, isDesktop } = useGetDevices()
  const [isOpen, setIsOpen] = React.useState(false)

  const { mutate: createMedia, isLoading: isLoadingMedia } = useCreateMediaCall()
  const { data: member } = useGetMemberLogin(forumId)

  const handleCreateMedia = (type: 'video' | 'voice') => {
    const payload = { forumId: forumId as string, type }
    createMedia(payload, {
      onSuccess: (data) => {
        navigate(`/forums/${forumId}/${type}/${data.id}`)
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
            <DropdownMenuItem className="gap-2.5 font-semibold text-primary" onClick={() => handleCreateMedia('video')}>
              <HiOutlineVideoCamera className="text-lg" />
              <p className="text-[13px]">Panggilan video</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2.5 font-semibold text-primary" onClick={() => handleCreateMedia('voice')}>
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
            {privacy === 'PRIVATE' && member?.role === 'ADMIN' && (
              <SearchUser forumId={forumId} isOpen={isOpen} setIsOpen={setIsOpen}>
                <Button
                  variant="contextItem"
                  className="h-fit justify-start gap-2.5 px-2 py-1.5 font-semibold text-primary dark:hover:bg-white/10"
                  onClick={() => setIsOpen(true)}
                >
                  <HiOutlineUserPlus className="text-lg" />
                  <p className="text-[13px]">Tambah anggota</p>
                </Button>
              </SearchUser>
            )}
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
          <IconButton
            onClick={() => handleCreateMedia('video')}
            icon={HiOutlineVideoCamera}
            loading={isLoadingMedia}
            id="video-call"
          />
          <IconButton
            onClick={() => handleCreateMedia('voice')}
            icon={HiOutlinePhone}
            loading={isLoadingMedia}
            id="voice-call"
          />
          {isTablet && <IconButton onClick={() => navigate(`/forums/${forumId}/member`)} icon={HiOutlineUserGroup} />}

          <ShareForum inviteCode={invitedCode}>
            <Button variant="outline" size="icon" className="rounded-full border-none dark:bg-primary" id="share">
              <HiOutlineShare className="text-lg md:text-xl" />
            </Button>
          </ShareForum>

          {privacy === 'PRIVATE' && member?.role === 'ADMIN' && (
            <SearchUser forumId={forumId} isOpen={isOpen} setIsOpen={setIsOpen}>
              <IconButton icon={HiOutlineUserPlus} onClick={() => setIsOpen(true)} id="search-user" />
            </SearchUser>
          )}
        </article>
      )}
    </React.Fragment>
  )
}

interface IconButtonProps {
  onClick?: () => void
  icon: IconType
  loading?: boolean
  id?: string
}

function IconButton({ onClick, icon: Icon, loading, id }: IconButtonProps) {
  const className = 'rounded-full border-none dark:bg-primary'

  return (
    <Button variant="outline" size="icon" loading={loading} className={className} onClick={onClick} id={id}>
      <Icon className="text-lg md:text-xl" />
    </Button>
  )
}
