import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { ImSpinner2 } from 'react-icons/im'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:disabled:text-white',
        destructive:
          'bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90',
        outline:
          'border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/10 dark:bg-primary dark:hover:bg-zinc-950 dark:hover:text-zinc-50 focus:outline-none',
        secondary:
          'bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80',
        ghost: 'hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
        link: 'text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50',
        messageIcon:
          'rounded-full bg-transparent dark:bg-transparent hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary',
        call: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-900',
        contextItem: 'relative flex items-center rounded-sm text-sm outline-none w-full hover:bg-zinc-100'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const loadingVariants = cva('flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full', {
  variants: {
    variant: {
      default: 'text-zinc-50 dark:text-zinc-900',
      destructive: 'text-zinc-50 dark:text-zinc-50',
      outline: 'text-zinc-800 dark:text-white',
      secondary: 'text-zinc-900 dark:text-zinc-50',
      ghost: 'text-zinc-800 dark:text-white',
      link: 'text-zinc-900 dark:text-zinc-50',
      messageIcon: 'text-zinc-800 dark:text-white',
      call: 'text-zinc-50 dark:text-white',
      contextItem: 'text-zinc-900 dark:text-zinc-50'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && 'pointer-events-none disabled:text-transparent'
        )}
        ref={ref}
        disabled={loading ?? props.disabled}
        {...props}
      >
        {props.children}
        {loading && (
          <div className={cn(loadingVariants({ variant }))}>
            <ImSpinner2 className="m-auto animate-spin" />
          </div>
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
