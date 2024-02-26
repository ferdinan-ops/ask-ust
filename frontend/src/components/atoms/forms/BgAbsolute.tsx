import { cn } from '@/lib/utils'

interface BgAbsoluteProps {
  isShow: boolean
}

export default function BgAbsolute({ isShow }: BgAbsoluteProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 bg-zinc-900/90 transition-all duration-300 lg:hidden',
        isShow ? 'visible z-40 opacity-100' : 'invisible z-0 opacity-0'
      )}
    />
  )
}
