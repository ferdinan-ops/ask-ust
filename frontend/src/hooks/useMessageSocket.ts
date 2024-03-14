/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'

import { useSocket } from '@/components/providers/SocketProvider'
import { MessageType } from '@/lib/types/message.type'
import { MemberType } from '@/lib/types/member.type'
import { UserType } from '@/lib/types/user.type'

type ChatSocketProps = {
  addKey: string
  updateKey: string
  queryKey: string
}

type MessageWithMemberWithProfile = MessageType & {
  member: MemberType & {
    profile: UserType
  }
}

export const useChatSocket = ({ addKey, updateKey, queryKey }: ChatSocketProps) => {
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return

    socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message
              }
              return item
            })
          }
        })

        return {
          ...oldData,
          pages: newData
        }
      })
    })

    socket.on(addKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                items: [message]
              }
            ]
          }
        }

        const newData = [...oldData.pages]

        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items]
        }

        return {
          ...oldData,
          pages: newData
        }
      })
    })

    return () => {
      socket.off(addKey)
      socket.off(updateKey)
    }
  }, [queryClient, addKey, queryKey, socket, updateKey])
}
