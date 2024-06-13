import { useGetForum } from '@/store/server/useForum'
import { useParams, useTitle } from '@/hooks'
import { TabForum } from '@/components/organism'
import { ForumResponseType } from '@/lib/types/forum.type'

export default function Forums() {
  useTitle('Forum')
  const { createParam, params } = useParams(['page'])
  const { data: forums, isLoading } = useGetForum(Number(params.page) || 1)

  return (
    <TabForum
      isFetching={isLoading}
      forums={forums as ForumResponseType}
      page={params.page}
      createParam={createParam}
      containerClassName="flex-1"
    />
  )
}
