/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'

import { useSocket } from '@/components/providers/SocketProvider'
import { MediaRoomType } from '@/lib/types/media.type'

interface VoiceSocketProps {
  addKey: string
  deleteKey: string
  queryKey: string
}

export default function useVoiceSocket({ addKey, deleteKey, queryKey }: VoiceSocketProps) {
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return

    socket.on(deleteKey, () => {
      queryClient.setQueryData([queryKey], () => {
        return undefined
      })
    })

    socket.on(addKey, (voice: MediaRoomType) => {
      queryClient.setQueryData([queryKey], () => voice)
    })

    return () => {
      socket.off(addKey)
      socket.off(deleteKey)
    }
  }, [queryClient, addKey, queryKey, socket, deleteKey])
}
