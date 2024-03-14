import { HiSquare3Stack3D, HiStar } from 'react-icons/hi2'
import * as React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Pagination } from '@/components/atoms'

import { ForumSkeleton, NoForum } from '..'
import CardForum from './CardForum'

import { useGetJoinedForums } from '@/store/server/useUser'
import { ParamsType } from '@/hooks/useParams'
import { NoChart } from '@/assets'

import { ForumResponseType } from '@/lib/types/forum.type'
import { cn } from '@/lib/utils'

interface TabsProps extends JoinedForumProps {
  forums: ForumResponseType
  isFetching?: boolean
  containerClassName?: string
  contentClassName?: string
}

export default function TabForum(props: TabsProps) {
  const { forums, containerClassName, contentClassName, isFetching, page, createParam } = props

  return (
    <Tabs defaultValue="all" className={cn('w-full', containerClassName)}>
      <div className="flex items-center justify-between">
        <h1 className="mb-5 text-base font-semibold md:text-xl">Forum</h1>
        <TabsList className="mb-5 grid h-9 grid-cols-2 rounded-full md:w-4/12 lg:w-3/12">
          <TabsTrigger value="all" className="flex items-center gap-2 rounded-full">
            <HiSquare3Stack3D className="text-primary dark:text-white" />
            <span className="text-xs font-semibold text-primary dark:text-white md:text-[13px]">Semua</span>
          </TabsTrigger>
          <TabsTrigger value="joined" className="flex items-center gap-2 rounded-full">
            <HiStar className="text-yellow-500" />
            <span className="text-xs font-semibold text-primary dark:text-white md:text-[13px]">Diikuti</span>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="all" className={cn('relative', contentClassName)}>
        <AllForum forums={forums} isFetching={isFetching} page={page} createParam={createParam} />
      </TabsContent>
      <TabsContent value="joined" className={cn('relative', contentClassName)}>
        <JoinedForum page={page} createParam={createParam} />
      </TabsContent>
    </Tabs>
  )
}

interface JoinedForumProps {
  page: string
  createParam: (params: ParamsType) => void
}

function JoinedForum({ page, createParam }: JoinedForumProps) {
  const { data: joinedForums, isLoading } = useGetJoinedForums(1)

  if (isLoading) {
    return <ForumSkeleton />
  }

  if (joinedForums?.data.length === 0) {
    return <NoForum imgSrc={NoChart} location="profile" type="followed" />
  }

  return (
    <React.Fragment>
      <CardForum forums={joinedForums as ForumResponseType} />
      {joinedForums?.data.length && joinedForums?.data.length > 9 ? (
        <Pagination
          pageSize={9}
          totalCount={joinedForums.meta.total as number}
          currentPage={page !== '' ? parseInt(page) : 1}
          onPageChange={(page) => createParam({ key: 'page', value: page.toString() })}
        />
      ) : null}
    </React.Fragment>
  )
}

function AllForum({ forums, isFetching, page, createParam }: TabsProps) {
  if (isFetching) {
    return <ForumSkeleton />
  }

  if (forums.data.length === 0) {
    return <NoForum imgSrc={NoChart} location="profile" type="mine" />
  }

  return (
    <React.Fragment>
      <CardForum forums={forums} />
      {forums?.data.length && forums?.data.length > 9 ? (
        <Pagination
          pageSize={9}
          totalCount={forums.meta.total as number}
          currentPage={page !== '' ? parseInt(page) : 1}
          onPageChange={(page) => createParam({ key: 'page', value: page.toString() })}
        />
      ) : null}
    </React.Fragment>
  )
}
