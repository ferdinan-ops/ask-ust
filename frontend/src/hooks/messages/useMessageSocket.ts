/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'

import { useSocket } from '@/components/providers/SocketProvider'
import { MessageType } from '@/lib/types/message.type'

interface ChatSocketProps {
  addKey: string
  updateKey: string
  queryKey: string
  queryForumKey?: string
}

export default function useMessageSocket({ addKey, updateKey, queryKey, queryForumKey }: ChatSocketProps) {
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return

    socket.on(updateKey, (message: MessageType) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            data: page.data.map((item: MessageType) => {
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

    socket.on(addKey, (message: MessageType) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                data: [message]
              }
            ]
          }
        }

        const newData = [...oldData.pages]

        newData[0] = {
          ...newData[0],
          data: [message, ...newData[0].data]
        }

        return {
          ...oldData,
          pages: newData
        }
      })

      queryClient.setQueryData([queryForumKey], (oldData: any) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          _count: {
            ...oldData._count,
            messages: oldData._count.messages + 1
          }
        }
      })
    })

    return () => {
      socket.off(addKey)
      socket.off(updateKey)
    }
  }, [queryClient, addKey, queryKey, socket, updateKey, queryForumKey])
}
