import { useTitle } from '@/hooks'
import { Forum } from '.'

export default function Profile() {
  useTitle('Profil')
  return <Forum />
}
