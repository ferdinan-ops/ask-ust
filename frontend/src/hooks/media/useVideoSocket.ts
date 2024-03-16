/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'

import { useSocket } from '@/components/providers/SocketProvider'
import { MediaRoomType } from '@/lib/types/media.type'

interface VideoSocketProps {
  addKey: string
  deleteKey: string
  queryKey: string
}

export default function useVideoSocket({ addKey, deleteKey, queryKey }: VideoSocketProps) {
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return

    socket.on(deleteKey, () => {
      queryClient.setQueryData([queryKey], () => {
        return undefined
      })
    })

    socket.on(addKey, (video: MediaRoomType) => {
      queryClient.setQueryData([queryKey], () => video)
    })

    return () => {
      socket.off(addKey)
      socket.off(deleteKey)
    }
  }, [queryClient, addKey, queryKey, socket, deleteKey])
}
