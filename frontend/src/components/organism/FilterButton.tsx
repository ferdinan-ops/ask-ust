import * as React from 'react'
import { Button } from '../ui/button'
import { HiAdjustmentsHorizontal } from 'react-icons/hi2'
import { FloatBox } from '../atoms'

interface FilterButtonProps {
  lists: { label: string; value: string }[]
  onFilter: (value: string) => void
}

export default function FilterButton({ lists, onFilter }: FilterButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleFilter = (value: string) => {
    onFilter(value)
    setIsOpen(false)
  }

  return (
    <div className="relative w-fit">
      <Button className="gap-3" onClick={() => setIsOpen(!isOpen)}>
        <HiAdjustmentsHorizontal className="text-xl" />
        <span className="hidden text-[13px] md:flex">Filter</span>
      </Button>
      <FloatBox isOpen={isOpen} className="left-0 max-w-[200px] p-2">
        {lists.map((item, i) => (
          <FloatBox.Item key={i} label={item.label} className="mt-0 text-xs" onClick={() => handleFilter(item.value)} />
        ))}
      </FloatBox>
    </div>
  )
}
