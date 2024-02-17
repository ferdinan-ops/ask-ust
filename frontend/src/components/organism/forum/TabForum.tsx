import { HiSquare3Stack3D, HiStar } from 'react-icons/hi2'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ForumResponseType } from '@/lib/types/forum.type'
import { Pagination } from '@/components/atoms'
import CardForum from './CardForum'
import { useGetJoinedForums } from '@/store/server/useUser'
import { cn } from '@/lib/utils'

interface TabsProps {
  forums: ForumResponseType
  containerClassName?: string
  contentClassName?: string
}

export default function TabForum({ forums, containerClassName, contentClassName }: TabsProps) {
  const { data: joinedForums, isSuccess } = useGetJoinedForums(1)

  return (
    <Tabs defaultValue="all" className={cn('w-full', containerClassName)}>
      <div className="flex items-center justify-between">
        <h1 className="mb-5 text-xl font-semibold">Forum</h1>
        <TabsList className="mb-5 grid grid-cols-2 rounded-full md:w-4/12 lg:w-3/12">
          <TabsTrigger value="all" className="flex items-center gap-2 rounded-full">
            <HiSquare3Stack3D className="text-primary dark:text-white" />
            <span className="text-[13px] font-semibold text-primary dark:text-white">Semua</span>
          </TabsTrigger>
          <TabsTrigger value="joined" className="flex items-center gap-2 rounded-full">
            <HiStar className="text-yellow-500" />
            <span className="text-[13px] font-semibold text-primary dark:text-white">Diikuti</span>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="all" className={cn('relative', contentClassName)}>
        <CardForum forums={forums} />
        {forums?.data.length && forums?.data.length > 9 ? <Pagination /> : null}
      </TabsContent>
      {isSuccess && (
        <TabsContent value="joined" className={cn('relative', contentClassName)}>
          <CardForum forums={joinedForums} />
          {joinedForums?.data.length && joinedForums?.data.length > 9 ? <Pagination /> : null}
        </TabsContent>
      )}
    </Tabs>
  )
}
