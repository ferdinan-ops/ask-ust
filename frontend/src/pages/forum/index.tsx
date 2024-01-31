import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTitle } from '@/hooks'
import { cn } from '@/lib/utils'
import { useGetForum } from '@/store/server/useForum'
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlinePaperClip,
  HiSquare3Stack3D,
  HiStar
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function Forum() {
  useTitle('Forum')
  const { data: forums, isLoading } = useGetForum()

  if (isLoading) return <p>Loading...</p>

  return (
    <Tabs defaultValue="account" className="min-h-[calc(100vh-68px-56px)] w-full">
      <div className="flex items-center justify-between">
        <h1 className="mb-5 text-xl font-semibold">Forum</h1>
        <TabsList className="mb-5 grid grid-cols-2 rounded-full md:w-4/12 xl:w-3/12">
          <TabsTrigger value="account" className="flex items-center gap-2 rounded-full">
            <HiSquare3Stack3D className="text-primary dark:text-white" />
            <span className="text-[13px] font-semibold text-primary dark:text-white">Semua</span>
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2 rounded-full">
            <HiStar className="text-yellow-500" />
            <span className="text-[13px] font-semibold text-primary dark:text-white">Diikuti</span>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="account" className="relative min-h-[calc(100vh-68px-56px-68px)]">
        <section className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {forums?.data.length !== 0 &&
            forums?.data.map((forum) => (
              <Link
                to={`/forum/${forum.id}`}
                className="flex cursor-pointer flex-col gap-3 rounded-2xl bg-[#F7F9FB] p-6 hover:bg-[#eef0f2] dark:bg-white/5 hover:dark:bg-white/10"
                key={forum.id}
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold">{forum.title}</h3>
                  <p className="truncate-2 text-xs font-medium text-black/40 dark:text-white/40">{forum.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {forum.members.slice(0, 3).map((member, index) => (
                      <img
                        alt="profile"
                        src={member.user.photo || 'https://github.com/shadcn.png'}
                        className={cn(
                          index !== 0 && '-ml-3',
                          'h-6 w-6 rounded-full border-2 border-[#F7F9FB] dark:border-black'
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-black/40 dark:text-white/40">
                    <div className="flex items-center gap-1">
                      <HiOutlinePaperClip />
                      <span className="text-xs">6</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-black/40 dark:text-white/40">
                      <HiOutlineChatBubbleBottomCenterText />
                      <span className="text-xs">19</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </section>
        {forums?.data.length && forums?.data.length > 9 ? (
          <div className="bottom-0 right-0 mt-5 flex items-center justify-center gap-1 xl:absolute xl:mt-0 xl:justify-end">
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
        ) : null}
      </TabsContent>
      <TabsContent value="password" className="relative min-h-[calc(100vh-68px-56px-68px)]">
        <section className="grid grid-cols-3 gap-7">
          {[...Array(3)].map((_, index) => (
            <article
              className="flex cursor-pointer flex-col gap-3 rounded-2xl bg-[#F7F9FB] p-6 hover:bg-[#eef0f2] dark:bg-white/5 hover:dark:bg-white/10"
              key={index}
            >
              {/* <div className="bg-[#E5ECF6] dark:bg-white px-2 py-[2px] rounded-lg w-fit">
                <p className="text-black/40 dark:text-primary text-xs font-semibold uppercase"># Forum</p>
              </div> */}
              <div className="flex flex-col gap-1">
                <h3 className="font-bold">Meeting with customer</h3>
                <p className="truncate-2 text-xs font-medium text-black/40 dark:text-white/40">
                  Reduce technical debt by refactoring legacy code and improving architecture design.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="profile"
                    className="h-6 w-6 rounded-full border-2 border-[#F7F9FB] dark:border-black"
                  />
                  <img
                    src="https://github.com/shadcn.png"
                    alt="profile"
                    className="-ml-3 h-6 w-6 rounded-full border-2 border-[#F7F9FB] dark:border-black"
                  />
                  <img
                    src="https://github.com/shadcn.png"
                    alt="profile"
                    className="-ml-3 h-6 w-6 rounded-full border-2 border-[#F7F9FB] dark:border-black"
                  />
                </div>
                <div className="flex items-center gap-4 text-black/40 dark:text-white/40">
                  <div className="flex items-center gap-1">
                    <HiOutlinePaperClip />
                    <span className="text-xs">6</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-black/40 dark:text-white/40">
                    <HiOutlineChatBubbleBottomCenterText />
                    <span className="text-xs">19</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
        <div className="absolute bottom-0 right-0 flex items-center gap-1">
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
      </TabsContent>
    </Tabs>
  )
}
