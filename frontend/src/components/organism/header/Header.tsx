import { HiOutlineArrowRightOnRectangle, HiOutlineChevronDown, HiOutlineUserPlus } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import * as React from 'react'

import { Brand, FloatBox, Image } from '@/components/atoms'
import { Button } from '@/components/ui/button'
import Alert from '../Alert'

import { UserType } from '@/lib/types/user.type'
import { alertConfig } from '@/lib/config'
import { headerLinks } from '@/lib/data'
import { cn } from '@/lib/utils'

import { useToken, useUserInfo } from '@/store/client'
import { useLogout } from '@/store/server/useAuth'
// import { useGetUnreadValidates } from '@/store/server/useValidate'

const adminLinks = headerLinks.filter((link) => link.type === 'admin')
const userLinks = headerLinks.filter((link) => link.type === 'user')

const alertConf = alertConfig.logout

interface HeaderProps {
  className?: string
  page?: 'home' | 'admin' | 'dashboard'
}

export default function Header({ className, page = 'home' }: HeaderProps) {
  const navigate = useNavigate()
  const { mutate: logout } = useLogout()

  const user = useUserInfo((state) => state.user)
  const accessToken = useToken((state) => state.accessToken)
  // const { data: notifCount } = useGetUnreadValidates(user?.role !== 'USER')

  const [isOpen, setIsOpen] = React.useState(false)
  const handleClose = () => setIsOpen(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className={cn('sticky top-0 z-50 flex h-20 w-full items-center bg-primary text-white', className)}>
      <nav className="mx-auto flex w-[1180px] items-center justify-between px-5 md:px-10 xl:px-0">
        <Brand
          href={user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' ? '/admin/validate' : '/'}
          imageClassName="xl:w-8 w-7"
          className="gap-3 text-lg font-bold xl:gap-4 xl:text-xl"
        />

        {accessToken ? (
          <div className="flex items-center gap-5">
            {/* {user?.role !== 'USER' && (
              <Button
                size="icon"
                variant="secondary"
                onClick={() => navigate('/admin/notification')}
                className={cn('rounded-full', page === 'home' && 'bg-white/10 hover:bg-white/5')}
              >
                <HiOutlineBell className={cn('text-xl text-primary', page === 'home' && 'text-white')} />
                {notifCount && notifCount > 0 ? (
                  <div className="absolute right-2.5 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
                ) : null}
              </Button>
            )} */}

            <div className="relative w-fit">
              <ProfileBox
                isHidden
                user={user}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  'cursor-pointer rounded-full bg-white/10 text-white hover:bg-white/5 xl:rounded-lg xl:px-2.5 xl:py-2',
                  user?.role !== 'USER' && page === 'admin' && 'bg-zinc-100 text-primary hover:bg-zinc-200'
                )}
              >
                <HiOutlineChevronDown className="text-font hidden text-lg lg:block" />
              </ProfileBox>

              <FloatBox isOpen={isOpen}>
                <ProfileBox user={user} className="border-b border-zinc-200 pb-4 text-primary" />

                {user?.role !== 'USER' ? (
                  <React.Fragment>
                    {user.role === 'SUPER_ADMIN' && (
                      <FloatBox.Item
                        href="/admin/all"
                        label="Daftar Admin"
                        onClick={handleClose}
                        icon={HiOutlineUserPlus}
                      />
                    )}
                    {adminLinks.map((link, i) => (
                      <FloatBox.Item key={i} href={link.to} label={link.label} onClick={handleClose} icon={link.icon} />
                    ))}
                  </React.Fragment>
                ) : (
                  userLinks.map((link, i) => (
                    <FloatBox.Item key={i} href={link.to} label={link.label} onClick={handleClose} icon={link.icon} />
                  ))
                )}

                <Alert title={alertConf.title} desc={alertConf.desc} btnText={alertConf.btnTxt} action={handleLogout}>
                  <button className={cn(FloatBox.itemClass, 'mt-2 w-full cursor-pointer text-red-500')}>
                    <HiOutlineArrowRightOnRectangle className="text-xl" />
                    <span className="text-sm font-medium">Keluar dari aplikasi</span>
                  </button>
                </Alert>
              </FloatBox>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <AuthButton href="/register" className="bg-white/5 dark:bg-white/5 dark:text-white dark:hover:bg-primary">
              Daftar
            </AuthButton>
            <AuthButton href="/login" className="bg-white text-primary hover:bg-zinc-200">
              Masuk
            </AuthButton>
          </div>
        )}
      </nav>
    </header>
  )
}

interface ProfileBoxProps {
  onClick?: () => void
  children?: React.ReactNode
  user: UserType
  className?: string
  isHidden?: boolean
}

function ProfileBox({ user, onClick, children, className, isHidden }: ProfileBoxProps) {
  return (
    <div className={cn('flex items-center gap-3.5', className)} onClick={() => onClick && onClick()}>
      <Image src={user?.photo} alt={user?.fullname} className="h-10 w-10 rounded-full" />
      <div className={cn('flex max-w-[170px] flex-col', isHidden && 'hidden lg:flex')}>
        <h3 className="text-font truncate text-sm font-semibold">{user?.username}</h3>
        <p className="text-font/50 truncate text-xs">{user?.email}</p>
      </div>
      {children}
    </div>
  )
}

interface AuthButtonProps {
  href: string
  children?: React.ReactNode
  className?: string
}

function AuthButton({ href, children, className }: AuthButtonProps) {
  const navigate = useNavigate()
  return (
    <Button className={cn('text-xs font-semibold xl:text-sm', className)} onClick={() => navigate(href)}>
      {children}
    </Button>
  )
}
