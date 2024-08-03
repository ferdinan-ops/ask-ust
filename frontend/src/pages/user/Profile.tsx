import { useQueryParams, useTitle } from '@/hooks'
import { useGetMyForums } from '@/store/server/useUser'
import { TabForum } from '@/components/organism'
import { ForumResponseType } from '@/lib/types/forum.type'

export default function Profile() {
  useTitle('Profil Saya')
  const { params, createParam } = useQueryParams(['page'])
  const { data: forums, isLoading } = useGetMyForums(Number(params.page) || 1)

  return (
    <TabForum
      page={params.page}
      createParam={createParam}
      forums={forums as ForumResponseType}
      isFetching={isLoading}
    />
  )
}
