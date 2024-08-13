import * as React from 'react'
import { HiOutlineFlag, HiOutlinePencilSquare, HiOutlineTrash, HiSparkles } from 'react-icons/hi2'

import Message from './Message'
import { Alert, MediaAction, MessageAction, ReportMember } from '../..'
import MessageInput from './MessageInput'

import { Button } from '@/components/ui/button'
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from '@/components/ui/context-menu'

import { cn } from '@/lib/utils'
import { alertConfig } from '@/lib/config'
import { useGetMemberLogin } from '@/store/server/useMember'
import { useDeleteMessage, useDeleteMessageBySpecificRole, useGetMessages } from '@/store/server/useMessage'
import { useGetDevices, useMessageScroll, useMessageSocket } from '@/hooks'
import { Loader2 } from 'lucide-react'
import { ContentBox } from '@/components/atoms'
import ContextItem from './ContextItem'
import { MemberType } from '@/lib/types/member.type'
import { useNavigate } from 'react-router-dom'

interface MessagesProps {
  forumId: string
}

const alertConf = alertConfig.messages
const heightClass = 'max-h-[calc(100vh-181px)] md:max-h-[calc(100vh-148px)] lg:max-h-[calc(100vh-272px)]'

export default function Messages({ forumId }: MessagesProps) {
  const navigate = useNavigate()
  const messageRef = React.useRef<HTMLDivElement>(null)
  const bottomRef = React.useRef<HTMLDivElement>(null)

  const { data: member } = useGetMemberLogin(forumId)
  const { mutate: deleteMessage } = useDeleteMessage()
  const { mutate: deleteMessageBySpecificRole } = useDeleteMessageBySpecificRole()
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetMessages(forumId)

  useMessageSocket({
    queryKey: `messages:${forumId}`,
    queryForumKey: `forums:${forumId}`,
    addKey: `chat:${forumId}:messages`,
    updateKey: `chat:${forumId}:messages:update`
  })

  useMessageScroll({
    messageRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.data.length ?? 0
  })

  const [content, setContent] = React.useState('')
  const [messageId, setMessageId] = React.useState('')
  const { isMobile, isTablet } = useGetDevices()

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
    <ContentBox className="relative flex flex-1 flex-col">
      <ContentBox.Scroll ref={messageRef} className={cn('gap-2 md:gap-3 md:px-5 xl:py-7', heightClass)}>
        {hasNextPage && <LoadMore fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage} />}

        <div className="flex flex-col-reverse gap-2 md:gap-3">
          {data?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((message) => {
                const isMine = member?.id === message.member_id
                const isHasFile = message.file_url
                const isGuest = member?.role === 'GUEST'

                if (message.is_deleted) {
                  return <Message key={message.id} message={message} memberLoginId={member?.id as string} />
                }

                if (isMobile || isTablet) {
                  return (
                    <MessageAction
                      key={message.id}
                      forumId={forumId}
                      message={message}
                      member={member as MemberType}
                      onEdit={handleEditMessage}
                      onDelete={handleDeleteMessage}
                    >
                      <Message message={message} memberLoginId={member?.id as string} />
                    </MessageAction>
                  )
                }

                return (
                  <ContextMenu key={message.id}>
                    <ContextMenuTrigger
                      className={cn(
                        'flex w-fit items-start',
                        (member?.id as string) === message.member_id && 'ml-auto'
                      )}
                    >
                      <Message message={message} memberLoginId={member?.id as string} />
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      {isMine ? (
                        <React.Fragment>
                          {!isHasFile && (
                            <ContextItem onClick={() => handleEditMessage(message.id, message.content)}>
                              <HiOutlinePencilSquare className="text-lg" />
                              <span className="font-semibold">Ubah</span>
                            </ContextItem>
                          )}
                          <DeleteAlert action={() => handleDeleteMessage(message.id)} />
                        </React.Fragment>
                      ) : isGuest ? (
                        <ReportMember memberId={member.id} forumId={forumId}>
                          <ContextItem variant="destructive">
                            <HiOutlineFlag className="text-lg" />
                            <span className="font-semibold">Laporkan</span>
                          </ContextItem>
                        </ReportMember>
                      ) : (
                        <DeleteAlert action={() => handleDeleteMessage(message.id, 'role')} />
                      )}
                    </ContextMenuContent>
                  </ContextMenu>
                )
              })}
            </React.Fragment>
          ))}
        </div>

        <MediaAction forumId={forumId} />
        {member?.role === 'ADMIN' && data?.pages?.[0]?.data && data?.pages?.[0]?.data.length > 5 && (
          <Button
            className="mx-auto mt-5 w-fit gap-2 bg-gradient-to-r from-[#08CCAE]/90 to-[#FF456B]/90 py-4 font-semibold text-white hover:from-[#08CCAE] hover:to-[#FF456B]"
            onClick={() => navigate(`/forums/${forumId}/summary`)}
          >
            <span>Generate hasil diskusi</span>
            <HiSparkles />
          </Button>
        )}
        <div ref={bottomRef} />
      </ContentBox.Scroll>

      <MessageInput forumId={forumId} content={content} messageId={messageId} />
    </ContentBox>
  )
}

interface LoadMoreProps {
  fetchNextPage: () => void
  isFetchingNextPage: boolean
}

function LoadMore({ fetchNextPage, isFetchingNextPage }: LoadMoreProps) {
  return (
    <div className="flex justify-center">
      {isFetchingNextPage ? (
        <Loader2 className="my-4 h-6 w-6 animate-spin text-zinc-500" />
      ) : (
        <Button type="button" onClick={() => fetchNextPage()} className="my-4">
          Load previous messages
        </Button>
      )}
    </div>
  )
}

interface DeleteAlertProps {
  action: () => void
}

function DeleteAlert({ action }: DeleteAlertProps) {
  return (
    <Alert title={alertConf.title} desc={alertConf.desc} btnText={alertConf.btnTxt} action={action}>
      <ContextItem variant="destructive">
        <HiOutlineTrash className="text-lg" />
        <span className="font-semibold">Hapus</span>
      </ContextItem>
    </Alert>
  )
}
