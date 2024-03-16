import * as React from 'react'
import { HiOutlineFlag, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2'

import Message from './Message'
import { Alert, MediaAction, ReportMember } from '../..'
import MessageInput from './MessageInput'

import { Button } from '@/components/ui/button'
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from '@/components/ui/context-menu'

import { cn } from '@/lib/utils'
import { alertConfig } from '@/lib/config'
import { useGetMemberLogin } from '@/store/server/useMember'
import { useDeleteMessage, useDeleteMessageBySpecificRole, useGetMessages } from '@/store/server/useMessage'
import { useMessageScroll, useMessageSocket } from '@/hooks'
import { Loader2 } from 'lucide-react'
import { ContentBox } from '@/components/atoms'
import ContextItem from './ContextItem'

interface MessagesProps {
  forumId: string
}

const alertConf = alertConfig.messages

export default function Messages({ forumId }: MessagesProps) {
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
    <ContentBox className="md:max-h-[calc(100vh-148px)] md:min-h-[calc(100vh-148px)] lg:max-h-[calc(100vh-204px)] lg:min-h-[calc(100vh-204px)]">
      <ContentBox.Scroll ref={messageRef} className="gap-2 md:gap-3 md:px-5 xl:py-7">
        {hasNextPage && <LoadMore fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage} />}

        <div className="flex flex-1 flex-col-reverse gap-2 md:gap-3">
          {data?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((message) => {
                if (message.is_deleted) {
                  return <Message key={message.id} message={message} memberLoginId={member?.id as string} />
                } else {
                  return (
                    <ContextMenu key={message.id}>
                      <ContextMenuTrigger
                        className={cn(
                          'flex w-fit items-start',
                          (member?.id as string) === message.member_id && 'ml-auto'
                        )}
                      >
                        <Message key={i} message={message} memberLoginId={member?.id as string} />
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        {member?.id === message.member_id ? (
                          <React.Fragment>
                            {!message.file_url && (
                              <ContextItem onClick={() => handleEditMessage(message.id, message.content)}>
                                <HiOutlinePencilSquare className="text-lg" />
                                <span className="font-semibold">Ubah</span>
                              </ContextItem>
                            )}
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
            </React.Fragment>
          ))}
        </div>

        <MediaAction forumId={forumId} />
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
