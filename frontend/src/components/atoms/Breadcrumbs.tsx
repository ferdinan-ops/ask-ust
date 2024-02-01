import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { Link, useLocation } from 'react-router-dom'
import * as React from 'react'

import { cn } from '@/lib/utils'

const routes = [
  { path: '/dashboard', breadcrumb: 'Dashboard' },
  { path: '/forums', breadcrumb: 'Forum' },
  { path: '/me', breadcrumb: 'Profil' },
  { path: '/forums/edit/:slug', breadcrumb: 'Ubah Forum' },
  { path: '/forums/:slug', breadcrumb: 'Detail' },
  { path: '/forums/:slug/content', breadcrumb: 'Konten' },
  { path: '/forums/create', breadcrumb: 'Buka forum baru' }
]

export default function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs(routes)
  const location = useLocation()

  return (
    <div className="flex items-center gap-3 text-sm font-semibold">
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <React.Fragment key={index}>
          <Link
            to={match.pathname}
            className={cn(
              match.pathname !== location.pathname && 'text-black/40 dark:text-white/40',
              'hover:underline'
            )}
          >
            {breadcrumb}
          </Link>
          {index < breadcrumbs.length - 1 && <span className="text-black/40 dark:text-white/40">/</span>}
        </React.Fragment>
      ))}
    </div>
  )
}
