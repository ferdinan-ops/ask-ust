import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

interface NoForumProps {
  location: 'dashboard' | 'profile'
  type: 'mine' | 'followed'
  imgSrc: string
  className?: string
}

export default function NoForum({ location, type, imgSrc, className }: NoForumProps) {
  const navigate = useNavigate()
  const isDashboard = location === 'dashboard'
  const isMine = type === 'mine'

  const handleNavigate = () => {
    if (isMine) return navigate('/forums/create')
    navigate('/forums')
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6',
        isDashboard ? 'm-auto h-full' : 'flex-1 pt-16',
        className
      )}
    >
      <img src={imgSrc} alt="no forum" className={cn(isDashboard ? 'w-[40%] md:w-[27%]' : 'w-1/2 md:w-1/4')} />
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-lg font-bold lg:text-2xl">
          {isMine ? 'Yah, Kamu belum memiliki forum' : 'Yah, Kamu belum mengikuti forum apapun'}
        </h1>
        <p className="text-[13px] lg:text-base">
          {isMine ? 'Yuk buat forum milikmu sendiri sekarang!' : 'Yuk lihat forum-forum yang ada pada aplikasi ini'}
        </p>
      </div>
      <Button className="h-fit text-xs md:rounded-full md:px-6 md:text-base" onClick={handleNavigate}>
        {isMine ? 'Buat Forum' : 'Lihat Forum'}
      </Button>
    </div>
  )
}
