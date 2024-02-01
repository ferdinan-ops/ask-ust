import { useTitle } from '@/hooks'
import { useGetMyForums } from '@/store/server/useUser'
import { TabForum } from '@/components/organism'

export default function Profile() {
  useTitle('Profil Saya')
  const { data: forums, isSuccess } = useGetMyForums(1)

  if (!isSuccess) return <p>Loading...</p>

  return <TabForum forums={forums} />
}
