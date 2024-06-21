import { cn } from '@/lib/utils'
import * as React from 'react'
import { IconType } from 'react-icons'
import { Link } from 'react-router-dom'

interface FloatBoxProps {
  isOpen: boolean
  className?: string
  children: React.ReactNode
}

export default function FloatBox({ isOpen, className, children }: FloatBoxProps) {
  return (
    <article
      className={cn(
        'absolute right-0 top-full z-[9999] origin-top-right transition-all duration-300',
        'mt-2 w-[270px] flex-col rounded-lg border-2 border-zinc-200 bg-white p-4 shadow-xl',
        isOpen ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-[-10px] opacity-0',
        className
      )}
    >
      {children}
    </article>
  )
}

interface ItemProps {
  href?: string
  label: string
  icon?: IconType
  onClick?: () => void
  className?: string
}

const itemClass =
  'mt-2 flex cursor-pointer items-center gap-4 rounded-md px-4 py-3 text-primary hover:bg-zinc-100 text-sm'

function Item({ href, label, onClick, icon: Icon, className }: ItemProps) {
  return href ? (
    <Link to={href} onClick={onClick} className={cn(itemClass, className)}>
      {Icon && <Icon className="text-xl" />}
      <span className="font-medium">{label}</span>
    </Link>
  ) : (
    <button className={cn('w-full', itemClass, className)} onClick={onClick} type="button">
      {Icon && <Icon className="text-xl" />}
      <span className="font-medium">{label}</span>
    </button>
  )
}

FloatBox.Item = Item
FloatBox.itemClass = itemClass
