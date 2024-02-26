import { Button } from '../../ui/button'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2'

export default function Pagination() {
  return (
    <div className="bottom-0 right-0 mt-5 flex items-center justify-center gap-1 lg:absolute lg:mt-0 lg:justify-end">
      <Button className="py-2 text-xs font-semibold" variant="outline" size="icon">
        <HiChevronDoubleLeft />
      </Button>
      <Button className="py-2 text-xs font-semibold" variant="outline">
        1
      </Button>
      <Button className="py-2 text-xs font-semibold" variant="outline">
        2
      </Button>
      <Button className="py-2 text-xs font-semibold" variant="outline">
        ...
      </Button>
      <Button className="py-2 text-xs font-semibold" variant="outline">
        9
      </Button>
      <Button className="py-2 text-xs font-semibold" variant="outline">
        10
      </Button>
      <Button className="py-2 text-xs font-semibold" variant="outline" size="icon">
        <HiChevronDoubleRight />
      </Button>
    </div>
  )
}
