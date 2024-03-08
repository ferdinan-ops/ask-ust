import { useTitle } from '@/hooks'
import { useGetMyForums } from '@/store/server/useUser'
import { TabForum } from '@/components/organism'
import { ForumResponseType } from '@/lib/types/forum.type'

export default function Profile() {
  useTitle('Profil Saya')
  const { data: forums, isLoading } = useGetMyForums(1)

  return (
    <TabForum
      forums={forums as ForumResponseType}
      isFetching={isLoading}
      containerClassName="lg:min-h-[calc(100vh-209px-192px-68px-56px)] min-h-[calc(100vh-173px-112px-68px-32px)] md:min-h-[calc(100vh-185px-112px-68px-48px)]"
    />
  )
}
