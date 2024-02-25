import { useTitle } from '@/hooks'
import { useGetMyForums } from '@/store/server/useUser'
import { TabForum } from '@/components/organism'
import { ForumResponseType } from '@/lib/types/forum.type'

export default function Profile() {
  useTitle('Profil Saya')
  const { data: forums, isLoading } = useGetMyForums(1)

  return <TabForum forums={forums as ForumResponseType} isFetching={isLoading} />
}
