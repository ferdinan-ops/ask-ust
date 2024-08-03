import { useGetForum } from '@/store/server/useForum'
import { useQueryParams, useTitle } from '@/hooks'
import { TabForum } from '@/components/organism'
import { ForumResponseType } from '@/lib/types/forum.type'

export default function Forums() {
  useTitle('Forum')
  const { params, createParam } = useQueryParams(['page'])
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
