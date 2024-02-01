import { HiArrowLeftOnRectangle, HiHashtag, HiPlus, HiXMark } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'
import * as React from 'react'

import { useDisableBodyScroll, useOutsideClick } from '@/hooks'
import { ActiveLink, BgAbsolute, Search } from '../atoms'
import { useGetForum } from '@/store/server/useForum'
import { useGetMe } from '@/store/server/useUser'
import { MAIN_MENU } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Logo } from '@/assets'
import { LogoutAlert } from '.'

import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'

interface LeftbarProps {
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Leftbar({ isShow, setIsShow }: LeftbarProps) {
  const navigate = useNavigate()

  useDisableBodyScroll(isShow)
  const ref = useOutsideClick(() => setIsShow(false))

  const { data: user, isLoading } = useGetMe()
  const { data: forums, isSuccess } = useGetForum()

  const handleClose = () => {
    setIsShow(false)
  }

  const handleCreate = () => {
    navigate('/forums/create')
    setIsShow(false)
  }

  return (
    <React.Fragment>
      <aside
        ref={ref}
        className={cn(
          'fixed top-0 z-[9999999] h-screen w-64 border-r border-[#E9E9E9] bg-white text-primary transition-transform duration-300 dark:border-white/10 dark:bg-primary dark:text-white xl:sticky',
          isShow ? '-translate-x-0' : '-translate-x-full xl:translate-x-0'
        )}
      >
        {isShow && (
          <Button
            variant="outline"
            onClick={handleClose}
            className="fixed left-64 top-0 z-[9999999] ml-2 mt-2 flex h-12 w-12 rounded-full p-0 dark:bg-primary md:ml-3 md:mt-3 md:h-14 md:w-14"
          >
            <HiXMark className="m-auto text-2xl dark:text-white md:text-3xl" />
          </Button>
        )}
        <nav className="flex flex-col gap-4 px-4 py-5">
          <Link to="/dashboard" className="hidden items-center gap-3 p-1 xl:flex">
            <img src={Logo} alt="logo" className="w-7" />
            <span className="font-semibold">ASK.UST</span>
          </Link>
          <div className="flex flex-col gap-3 xl:hidden">
            <Search className="w-full" action={() => setIsShow(false)} />
            <Button className="h-fit w-full gap-2 p-0 px-3 py-2 text-xs" onClick={handleCreate}>
              <HiPlus className="text-lg" />
              <span>Forum baru</span>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <span className="px-3 py-1 text-xs font-semibold uppercase text-black/40 dark:text-white/40">menu</span>
            <div className="flex flex-col gap-1 text-primary dark:text-white">
              {MAIN_MENU.map((menu, index) => (
                <ActiveLink href={menu.href} name={menu.title} icon={menu.icon} key={index} action={handleClose} />
              ))}
            </div>
          </div>
          {isSuccess && forums.data.length !== 0 && (
            <div className="flex flex-col gap-2">
              <span className="px-3 py-1 text-xs font-semibold uppercase text-black/40 dark:text-white/40">
                Diikuti
              </span>
              <div className="flex flex-col gap-1 text-primary dark:text-white">
                {forums.data.map((forum) => (
                  <ActiveLink
                    href={`/forums/${forum.id}`}
                    name={forum.title}
                    icon={HiHashtag}
                    key={forum.id}
                    action={handleClose}
                  />
                ))}
                {/* {MENU_FORUMS.map((menu, index) => (
                  <ActiveLink href={menu.href} name={menu.name} icon={HiHashtag} key={index} action={handleClose} />
                ))} */}
              </div>
            </div>
          )}
        </nav>

        <div className="sticky bottom-0 top-full border-t border-[#E9E9E9] px-4 py-5 dark:border-white/10">
          <div className="flex items-center justify-between gap-3">
            {isLoading ? (
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-[160px]" />
                <Skeleton className="h-2 w-[90px]" />
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="max-w-[160px] truncate text-sm font-bold">{user?.fullname}</p>
                <p className="text-xs font-semibold text-zinc-400">@{user?.username}</p>
              </div>
            )}

            <LogoutAlert>
              <Button
                onClick={handleClose}
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 dark:hover:bg-red-600"
              >
                <HiArrowLeftOnRectangle className="text-white" />
              </Button>
            </LogoutAlert>
          </div>
        </div>
      </aside>
      <BgAbsolute isShow={isShow} />
    </React.Fragment>
  )
}
