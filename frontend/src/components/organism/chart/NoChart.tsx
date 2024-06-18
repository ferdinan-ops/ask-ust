import { NoChartImg } from '@/assets'
import { cn } from '@/lib/utils'

interface NoChartProps {
  className?: string
}

export default function NoChart({ className }: NoChartProps) {
  return (
    <div className={cn('m-auto flex h-full flex-col items-center justify-center gap-6', className)}>
      <img src={NoChartImg} alt="no forum" className="w-[20%] lg:w-[28%]" />
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-base font-bold lg:text-xl">Selamat Anda belum pernah dilaporkan</h1>
        <p className="text-xs lg:text-sm">Semangat, tetap pertahankan perilaku yang baik</p>
      </div>
    </div>
  )
}
