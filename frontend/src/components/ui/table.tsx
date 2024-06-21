import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from './button'
import { IconType } from 'react-icons/lib'

import { Input, InputProps } from '@/components/ui/input'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  )
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b [&_tr]:dark:border-white/20', className)} {...props} />
  )
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  )
)
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t bg-zinc-100/50 font-medium dark:bg-zinc-800/50 [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
)
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'transition-colors hover:bg-zinc-100/50 data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800',
        className
      )}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-left align-middle font-semibold text-[#1c1c1c]/40 dark:text-white/40 [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    >
      <div className="w-max">{props.children}</div>
    </th>
  )
)
TableHead.displayName = 'TableHead'

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  position?: 'center' | 'left' | 'right'
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({ className, position, ...props }, ref) => (
  <td ref={ref} className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props}>
    <div
      className={cn(
        'w-max',
        position === 'left' && '',
        position === 'center' && 'mx-auto',
        position === 'right' && 'ml-auto',
        className
      )}
    >
      {props.children}
    </div>
  </td>
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-zinc-500 dark:text-zinc-400', className)} {...props} />
  )
)
TableCaption.displayName = 'TableCaption'

interface TableButtonProps {
  icon?: IconType
  children: React.ReactNode
  variant?: 'info' | 'destructive' | 'outline'
  onClick?: () => void
  className?: string
}

function TableButton({ icon: Icon, children, variant, onClick, className }: TableButtonProps) {
  return (
    <Button className="h-fit gap-2 px-2.5" variant={variant} onClick={onClick}>
      {Icon && <Icon className="text-base" />}
      <span className={cn('truncate-1 max-w-[120px] text-xs', className)}>{children}</span>
    </Button>
  )
}

interface TableSearchProps extends InputProps {
  containerClassName?: string
}

const TableSearch = React.forwardRef<HTMLInputElement, TableSearchProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('relative', containerClassName)}>
        <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 transform text-[#8897AD]" />
        <Input
          {...props}
          ref={ref}
          className={cn('pl-10 placeholder:text-[13px] placeholder:text-[#8897AD]', className)}
        />
      </div>
    )
  }
)

interface TableLabelProps {
  type: 'valid' | 'invalid' | 'pending'
}

function TableLabel({ type }: TableLabelProps) {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-xs font-semibold',
        type === 'valid' && 'bg-green-200 text-green-600',
        type === 'invalid' && 'bg-red-200 text-red-600',
        type === 'pending' && 'bg-yellow-200 text-yellow-600'
      )}
    >
      {type === 'valid' && 'Valid'}
      {type === 'invalid' && 'Tidak valid'}
      {type === 'pending' && 'Belum divalidasi'}
    </span>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableButton,
  TableSearch,
  TableLabel
}
