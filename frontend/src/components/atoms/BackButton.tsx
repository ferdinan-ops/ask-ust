import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { HiArrowLeft } from 'react-icons/hi2'
import { cn } from '@/lib/utils'

interface BackButtonProps {
  className?: string
  action?: () => void
}

export default function BackButton({ className, action }: BackButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    action && action()
    navigate(-1)
  }

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      className={cn('mb-3 flex items-center gap-2 md:absolute md:left-7 md:top-7 md:mb-0', className)}
    >
      <HiArrowLeft className="text-base" />
      <span className="hidden text-xs font-semibold md:flex">Kembali</span>
    </Button>
  )
}
