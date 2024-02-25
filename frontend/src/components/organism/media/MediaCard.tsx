import { Button } from '@/components/ui/button'
import { UserType } from '@/lib/types/user.type'
import { useUserInfo } from '@/store/client'
import { HiPhone, HiPhoneXMark, HiVideoCamera } from 'react-icons/hi2'

interface MediaCardProps {
  type: 'video' | 'audio'
  creator: UserType
  loading?: boolean
  onConnect?: () => void
  onDisconnect?: () => void
}

export default function MediaCard({ type, creator, onConnect, onDisconnect, loading }: MediaCardProps) {
  const { user } = useUserInfo()

  return (
    <div className="mx-auto flex w-fit items-center gap-14 rounded-full border border-zinc-200 bg-zinc-100 py-2.5 pl-7 pr-5 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex flex-col">
        <h3 className="text-[15px] font-bold">Panggilan grup {type} telah dimulai</h3>
        <span className="text-[13px] font-semibold text-primary/70 dark:text-white/70">
          Dibuat oleh, {creator.fullname}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="outline"
          onClick={onConnect}
          className="h-8 w-8 rounded-full border-none bg-indigo-500 text-lg text-white hover:bg-indigo-600 dark:bg-indigo-700 hover:dark:bg-indigo-800"
        >
          {type === 'video' ? <HiVideoCamera /> : <HiPhone />}
        </Button>
        {user?.id === creator.id && (
          <Button
            size="icon"
            variant="destructive"
            loading={loading}
            onClick={onDisconnect}
            className="h-8 w-8 rounded-full border-none"
          >
            <HiPhoneXMark className="text-lg text-white" />
          </Button>
        )}
      </div>
    </div>
  )
}
