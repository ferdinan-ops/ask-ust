import { useGetForum } from '@/store/server/useForum'
import { useTitle } from '@/hooks'
import { TabForum } from '@/components/organism'
import { ForumResponseType } from '@/lib/types/forum.type'

export default function Forums() {
  useTitle('Forum')
  const { data: forums, isLoading } = useGetForum()

  if (isLoading) return <p>Loading...</p>

  return (
    <TabForum
      forums={forums as ForumResponseType}
      containerClassName="min-h-[calc(100vh-68px-56px)]"
      contentClassName="min-h-[calc(100vh-68px-56px-68px)]"
    />
  )
}
