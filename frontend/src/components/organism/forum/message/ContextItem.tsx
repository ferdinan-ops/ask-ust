import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'

const itemVariants = cva('h-fit justify-start gap-3 px-2 py-1.5 dark:hover:bg-white/10', {
  variants: {
    variant: {
      default: 'text-primary dark:text-white',
      destructive: 'text-red-500 hover:text-red-500 dark:text-red-400'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

interface ContextItemProps extends VariantProps<typeof itemVariants> {
  children?: React.ReactNode
  onClick?: () => void
}

export default function ContextItem({ variant, onClick, children }: ContextItemProps) {
  return (
    <Button variant="contextItem" className={cn(itemVariants({ variant }))} onClick={onClick}>
      {children}
    </Button>
  )
}
