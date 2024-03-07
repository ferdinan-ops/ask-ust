import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import MessageInput from './MessageInput'
import { Alert, MediaCard } from '../..'
import Message from './Message'

import {
  useDeleteVideoCall,
  useDeleteVoiceCall,
  useGetEnabledVideoCall,
  useGetEnabledVoiceCall
} from '@/store/server/useMedia'
import { useDeleteMessage, useGetMessages } from '@/store/server/useMessage'
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from '@/components/ui/context-menu'
import { HiOutlineFlag, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2'
import { useGetMemberLogin } from '@/store/server/useMember'
import { alertConfig } from '@/lib/config'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MessagesProps {
  forumId: string
}

const alertConf = alertConfig.messages
const itemClass = 'h-fit justify-start gap-3 px-2 py-1.5'

export default function Messages({ forumId }: MessagesProps) {
  const navigate = useNavigate()
  const { data: messages } = useGetMessages(forumId)
  const { data: member } = useGetMemberLogin(forumId)
  const { mutate: deleteMessage } = useDeleteMessage()

  const { data: video, isSuccess: isSuccessEnabledVideo } = useGetEnabledVideoCall(forumId)
  const { data: voice, isSuccess: isSuccessEnabledVoice } = useGetEnabledVoiceCall(forumId)
  const { mutate: deleteVideo, isLoading: isLoadingVideo } = useDeleteVideoCall()
  const { mutate: deleteVoice, isLoading: isLoadingVoice } = useDeleteVoiceCall()

  const [content, setContent] = React.useState('')

  const handleDeleteMessage = (id: string) => {
    deleteMessage({ forumId, messageId: id })
  }

  return (
    <div className="flex max-h-[calc(100vh-68px-57px)] flex-col lg:max-h-[calc(100vh-68px-56px-80px)] lg:min-h-[calc(100vh-68px-56px-80px)]">
      <article className="scroll-custom flex flex-1 flex-col gap-2 overflow-y-auto p-4 md:gap-3 md:px-5 xl:py-7">
        {messages?.map((message, i) => {
          if (message.is_deleted) {
            return <Message key={i} message={message} memberLoginId={member?.id as string} />
          } else {
            return (
              <ContextMenu key={i}>
                <ContextMenuTrigger>
                  <Message key={i} message={message} memberLoginId={member?.id as string} />
                </ContextMenuTrigger>
                <ContextMenuContent>
                  {member?.id === message.member_id ? (
                    <>
                      <Button
                        variant="contextItem"
                        className={cn('text-primary', itemClass)}
                        onClick={() => setContent(message.content)}
                      >
                        <HiOutlinePencilSquare className="text-lg" />
                        <span className="font-semibold">Ubah</span>
                      </Button>
                      <Alert
                        title={alertConf.title}
                        desc={alertConf.desc}
                        btnText={alertConf.btnTxt}
                        action={() => handleDeleteMessage(message.id)}
                      >
                        <Button className={cn('text-red-500 hover:text-red-500', itemClass)} variant="contextItem">
                          <HiOutlineTrash className="text-lg" />
                          <span className="font-semibold">Hapus</span>
                        </Button>
                      </Alert>
                    </>
                  ) : member?.role === 'GUEST' ? (
                    <Button className={cn('text-red-500 hover:text-red-500', itemClass)} variant="contextItem">
                      <HiOutlineFlag className="text-lg" />
                      <span className="font-semibold">Laporkan</span>
                    </Button>
                  ) : (
                    <Button className={cn('text-red-500 hover:text-red-500', itemClass)} variant="contextItem">
                      <HiOutlineTrash className="text-lg" />
                      <span className="font-semibold">Hapus pesan</span>
                    </Button>
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
      <MessageInput forumId={forumId} content={content} />
    </div>
  )
}
