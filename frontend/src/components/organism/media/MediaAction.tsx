import { useVideoSocket, useVoiceSocket } from '@/hooks'
import {
  useDeleteVideoCall,
  useDeleteVoiceCall,
  useGetEnabledVideoCall,
  useGetEnabledVoiceCall
} from '@/store/server/useMedia'
import * as React from 'react'
import { MediaCard } from '..'
import { useNavigate } from 'react-router-dom'

interface MediaActionProps {
  forumId: string
}

export default function MediaAction({ forumId }: MediaActionProps) {
  const navigate = useNavigate()
  const { data: video, isSuccess: isSuccessEnabledVideo } = useGetEnabledVideoCall(forumId)
  const { data: voice, isSuccess: isSuccessEnabledVoice } = useGetEnabledVoiceCall(forumId)
  const { mutate: deleteVideo, isLoading: isLoadingVideo } = useDeleteVideoCall()
  const { mutate: deleteVoice, isLoading: isLoadingVoice } = useDeleteVoiceCall()

  useVideoSocket({
    addKey: `video:${forumId}:enabled`,
    deleteKey: `video:${forumId}:disabled`,
    queryKey: `video:${forumId}`
  })

  useVoiceSocket({
    addKey: `voice:${forumId}:enabled`,
    deleteKey: `voice:${forumId}:disabled`,
    queryKey: `voice:${forumId}`
  })

  return (
    <React.Fragment>
      {isSuccessEnabledVideo && video && (
        <MediaCard
          type="video"
          creator={video.member.user}
          loading={isLoadingVideo}
          onConnect={() => navigate(`/forums/${forumId}/video/${video.id}`)}
          onDisconnect={() => deleteVideo(video.id)}
        />
      )}
      {isSuccessEnabledVoice && voice && (
        <MediaCard
          type="audio"
          creator={voice.member.user}
          loading={isLoadingVoice}
          onConnect={() => navigate(`/forums/${forumId}/voice/${voice.id}`)}
          onDisconnect={() => deleteVoice(voice.id)}
        />
      )}
    </React.Fragment>
  )
}
