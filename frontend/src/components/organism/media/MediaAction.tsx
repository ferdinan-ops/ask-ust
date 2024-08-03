import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { MediaCard } from '..'
import { useMediaSocket } from '@/hooks'
import { useDeleteMediaCall, useGetEnabledMediaCall } from '@/store/server/useMedia'

interface MediaActionProps {
  forumId: string
}

export default function MediaAction({ forumId }: MediaActionProps) {
  const navigate = useNavigate()
  const { data: media, isSuccess: isSuccessEnabled } = useGetEnabledMediaCall(forumId)
  const { mutate: deleteMedia, isLoading: isLoadingDelete } = useDeleteMediaCall()

  useMediaSocket({
    addKey: `media:${forumId}:enabled`,
    deleteKey: `media:${forumId}:disabled`,
    queryKey: `media:${forumId}`
  })

  return (
    <React.Fragment>
      {isSuccessEnabled && media && media.type === 'video' && (
        <MediaCard
          type="video"
          creator={media.member.user}
          loading={isLoadingDelete}
          onConnect={() => navigate(`/forums/${forumId}/video/${media.id}`)}
          onDisconnect={() => deleteMedia(media.id)}
        />
      )}
      {isSuccessEnabled && media && media.type === 'voice' && (
        <MediaCard
          type="audio"
          creator={media.member.user}
          loading={isLoadingDelete}
          onConnect={() => navigate(`/forums/${forumId}/voice/${media.id}`)}
          onDisconnect={() => deleteMedia(media.id)}
        />
      )}
    </React.Fragment>
  )
}
