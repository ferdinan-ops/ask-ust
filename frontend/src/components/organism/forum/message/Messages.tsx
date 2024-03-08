import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineFlag, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2'

import Message from './Message'
import { Alert, MediaCard, ReportMember } from '../..'
import MessageInput from './MessageInput'

import { Button } from '@/components/ui/button'
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from '@/components/ui/context-menu'

import {
  useDeleteVideoCall,
  useDeleteVoiceCall,
  useGetEnabledVideoCall,
  useGetEnabledVoiceCall
} from '@/store/server/useMedia'
import { cn } from '@/lib/utils'
import { alertConfig } from '@/lib/config'
import { useGetMemberLogin } from '@/store/server/useMember'
import { useDeleteMessage, useDeleteMessageBySpecificRole, useGetMessages } from '@/store/server/useMessage'
import { VariantProps, cva } from 'class-variance-authority'

interface MessagesProps {
  forumId: string
}

const alertConf = alertConfig.messages

export default function Messages({ forumId }: MessagesProps) {
  const navigate = useNavigate()
  const { data: messages } = useGetMessages(forumId)
  const { data: member } = useGetMemberLogin(forumId)
  const { mutate: deleteMessage } = useDeleteMessage()
  const { mutate: deleteMessageBySpecificRole } = useDeleteMessageBySpecificRole()

  const { data: video, isSuccess: isSuccessEnabledVideo } = useGetEnabledVideoCall(forumId)
  const { data: voice, isSuccess: isSuccessEnabledVoice } = useGetEnabledVoiceCall(forumId)
  const { mutate: deleteVideo, isLoading: isLoadingVideo } = useDeleteVideoCall()
  const { mutate: deleteVoice, isLoading: isLoadingVoice } = useDeleteVoiceCall()

  const [content, setContent] = React.useState('')
  const [messageId, setMessageId] = React.useState('')

  const handleEditMessage = (messageId: string, content: string) => {
    setMessageId(messageId)
    setContent(content)
  }

  const handleDeleteMessage = (id: string, type: 'default' | 'role' = 'default') => {
    const fields = { forumId, messageId: id }
    if (type === 'default') return deleteMessage(fields)
    deleteMessageBySpecificRole(fields)
  }

  return (
    <div className="flex max-h-[calc(100vh-68px-57px)] min-h-[calc(100vh-68px-57px)] flex-col md:max-h-[calc(100vh-68px-80px)] md:min-h-[calc(100vh-68px-80px)] lg:max-h-[calc(100vh-68px-56px-80px)] lg:min-h-[calc(100vh-68px-56px-80px)]">
      <article className="scroll-custom flex flex-1 flex-col gap-2 overflow-y-auto p-4 md:gap-3 md:px-5 xl:py-7">
        {messages?.map((message, i) => {
          if (message.is_deleted) {
            return <Message key={i} message={message} memberLoginId={member?.id as string} />
          } else {
            return (
              <ContextMenu key={i}>
                <ContextMenuTrigger className="w-fit">
                  <Message key={i} message={message} memberLoginId={member?.id as string} />
                </ContextMenuTrigger>
                <ContextMenuContent>
                  {member?.id === message.member_id ? (
                    <React.Fragment>
                      <ContextItem onClick={() => handleEditMessage(message.id, message.content)}>
                        <HiOutlinePencilSquare className="text-lg" />
                        <span className="font-semibold">Ubah</span>
                      </ContextItem>
                      <Alert
                        title={alertConf.title}
                        desc={alertConf.desc}
                        btnText={alertConf.btnTxt}
                        action={() => handleDeleteMessage(message.id)}
                      >
                        <ContextItem variant="destructive">
                          <HiOutlineTrash className="text-lg" />
                          <span className="font-semibold">Hapus</span>
                        </ContextItem>
                      </Alert>
                    </React.Fragment>
                  ) : member?.role === 'GUEST' ? (
                    <ReportMember memberId={member.id} forumId={forumId}>
                      <ContextItem variant="destructive">
                        <HiOutlineFlag className="text-lg" />
                        <span className="font-semibold">Laporkan</span>
                      </ContextItem>
                    </ReportMember>
                  ) : (
                    <Alert
                      title={alertConf.title}
                      desc={alertConf.desc}
                      btnText={alertConf.btnTxt}
                      action={() => handleDeleteMessage(message.id, 'role')}
                    >
                      <ContextItem variant="destructive">
                        <HiOutlineTrash className="text-lg" />
                        <span className="font-semibold">Hapus pesan</span>
                      </ContextItem>
                    </Alert>
                  )}
                </ContextMenuContent>
              </ContextMenu>
            )
          }
        })}
        {isSuccessEnabledVideo && (
          <MediaCard
            type="video"
            creator={video.member.user}
            loading={isLoadingVideo}
            onConnect={() => navigate(`/forums/${forumId}/voice/${video.id}`)}
            onDisconnect={() => deleteVideo(video.id)}
          />
        )}
        {isSuccessEnabledVoice && (
          <MediaCard
            type="audio"
            creator={voice.member.user}
            loading={isLoadingVoice}
            onConnect={() => navigate(`/forums/${forumId}/voice/${voice.id}`)}
            onDisconnect={() => deleteVoice(voice.id)}
          />
        )}
      </article>
      <MessageInput forumId={forumId} content={content} messageId={messageId} />
    </div>
  )
}

const itemVariants = cva('h-fit justify-start gap-3 px-2 py-1.5 dark:hover:bg-white/10', {
  variants: {
    variant: {
      default: 'text-primary dark:text-white',
      destructive: 'text-red-500 hover:text-red-500 dark:text-red-400'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

interface ContextItemProps extends VariantProps<typeof itemVariants> {
  children?: React.ReactNode
  onClick?: () => void
}

function ContextItem({ variant, onClick, children }: ContextItemProps) {
  return (
    <Button variant="contextItem" className={cn(itemVariants({ variant }))} onClick={onClick}>
      {children}
    </Button>
  )
}
