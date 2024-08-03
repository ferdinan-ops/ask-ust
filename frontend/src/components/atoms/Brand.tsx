import { Logo } from '@/assets'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface BrandProps {
  className?: string
  imageClassName?: string
  href?: string
}

export default function Brand({ className, imageClassName, href }: BrandProps) {
  return (
    <Link to={href ?? '/dashboard'} className={cn('flex items-center font-semibold', className)}>
      <img src={Logo} alt="logo" className={cn(imageClassName)} />
      <p>
        <span className="font-bold text-[#08CCAE]">
          U<span className="text-[#E8C000]">S</span>
          <span className="text-[#FF456B]">T</span>
        </span>
        alk
      </p>
    </Link>
  )
}
