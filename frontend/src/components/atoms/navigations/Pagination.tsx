import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2'

import { Button } from '../../ui/button'

import { usePagination } from '@/hooks'
import { DOTS } from '@/hooks/usePagination'

import { cn } from '@/lib/utils'

interface PaginationProps {
  onPageChange: (page: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
  className?: string
  isAbsolute?: boolean
}

const btnClass = 'py-2 text-xs font-semibold'

export default function Pagination(props: PaginationProps) {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className, isAbsolute = true } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  if (paginationRange == null || paginationRange.length === 0) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <div
      className={cn(
        'mt-5 flex items-center justify-center gap-1 lg:mt-0 lg:justify-end',
        isAbsolute && 'bottom-0 right-0 lg:absolute',
        className
      )}
    >
      <Button className={btnClass} variant="outline" size="icon" onClick={onPrevious} disabled={currentPage === 1}>
        <HiChevronDoubleLeft />
      </Button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <Button className={btnClass} variant="outline" key={index} disabled>
              &#8230;
            </Button>
          )
        }
        return (
          <Button
            key={index}
            variant="outline"
            onClick={() => onPageChange(Number(pageNumber))}
            className={cn(pageNumber === currentPage && 'border-primary bg-zinc-100 text-primary', btnClass)}
          >
            {pageNumber}
          </Button>
        )
      })}

      <Button className={btnClass} variant="outline" size="icon" onClick={onNext} disabled={currentPage === lastPage}>
        <HiChevronDoubleRight />
      </Button>
    </div>
  )
}
