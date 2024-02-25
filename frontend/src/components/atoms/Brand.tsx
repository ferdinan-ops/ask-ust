import { Logo } from '@/assets'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface BrandProps {
  className?: string
  imageClassName?: string
}

export default function Brand({ className, imageClassName }: BrandProps) {
  return (
    <Link to="/dashboard" className={cn('flex items-center font-semibold', className)}>
      <img src={Logo} alt="logo" className={cn(imageClassName)} />
      <span>A?K.UST</span>
    </Link>
  )
}
