import { NavLink } from 'react-router-dom'
import { IconType } from 'react-icons'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface ActiveLinkProps {
  name: string
  href: string
  icon?: IconType
  type?: 'menu' | 'favorite'
  action?: () => void
}

export default function ActiveLink({ name, href, icon: Icon, type = 'menu', action }: ActiveLinkProps) {
  return (
    <NavLink
      to={href}
      onClick={action}
      className={({ isActive }) =>
        cn(
          'relative flex items-center gap-3.5 rounded-lg py-2 pl-7 pr-2',
          isActive ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'
        )
      }
    >
      {({ isActive }) => (
        <React.Fragment>
          {type === 'menu' ? (
            Icon && <Icon className="text-xl" />
          ) : (
            <img src={`https://source.unsplash.com/random?${name}`} alt={name} className="h-5 w-5 rounded-full" />
          )}
          <span className="truncate-1 text-sm font-medium">{name}</span>
          {isActive && (
            <div className="absolute left-0 top-1/2 h-1/2 w-1 -translate-y-1/2 rounded-full bg-primary dark:bg-white" />
          )}
        </React.Fragment>
      )}
    </NavLink>
  )
}
