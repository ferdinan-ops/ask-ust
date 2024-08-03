/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'

import { useSocket } from '@/components/providers/SocketProvider'
import { MediaRoomType } from '@/lib/types/media.type'

interface MediaSocketProps {
  addKey: string
  deleteKey: string
  queryKey: string
}

export default function useMediaSocket({ addKey, deleteKey, queryKey }: MediaSocketProps) {
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return

    socket.on(deleteKey, () => {
      queryClient.setQueryData([queryKey], () => {
        return undefined
      })
    })

    socket.on(addKey, (media: MediaRoomType) => {
      queryClient.setQueryData([queryKey], () => media)
    })

    return () => {
      socket.off(addKey)
      socket.off(deleteKey)
    }
  }, [queryClient, addKey, queryKey, socket, deleteKey])
}
