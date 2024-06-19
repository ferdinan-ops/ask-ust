import { Brand, Image } from '@/components/atoms'
import { Button } from '@/components/ui/button'
import { UserType } from '@/lib/types/user.type'
import { cn } from '@/lib/utils'
import { useToken, useUserInfo } from '@/store/client'
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineBell,
  HiOutlineChevronDown,
  HiOutlineSquares2X2,
  HiOutlineUser
} from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../Alert'
import * as React from 'react'
import { useLogout } from '@/store/server/useAuth'
import { IconType } from 'react-icons'

const dropdownLinkClass = 'flex cursor-pointer items-center gap-4 rounded-md px-4 py-3 hover:bg-zinc-100 text-font'

interface HeaderProps {
  className?: string
  isAdmin?: boolean
}

export default function Header({ className, isAdmin }: HeaderProps) {
  const navigate = useNavigate()
  const { mutate: logout } = useLogout()

  const user = useUserInfo((state) => state.user)
  const accessToken = useToken((state) => state.accessToken)

  const [isOpen, setIsOpen] = React.useState(false)
  const handleClose = () => setIsOpen(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className={cn('flex h-20 w-full items-center bg-primary text-white', className)}>
      <nav className="mx-auto flex w-[1180px] items-center justify-between px-5 md:px-10 xl:px-0">
        <Brand
          href={isAdmin ? '/admin' : '/'}
          className="gap-3 text-lg font-bold xl:gap-4 xl:text-xl"
          imageClassName="xl:w-8 w-7"
        />
        {accessToken ? (
          <div className="flex items-center gap-5">
            {isAdmin && (
              <Button size="icon" variant="secondary" className="rounded-full">
                <HiOutlineBell className="text-xl text-primary" />
                <div className="absolute right-2.5 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
              </Button>
            )}
            <div className="relative w-fit">
              <ProfileBox
                isHidden
                user={user}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  'cursor-pointer rounded-full bg-white/10 text-white hover:bg-white/5 xl:rounded-lg xl:px-2.5 xl:py-2',
                  isAdmin && 'bg-zinc-100 text-primary hover:bg-zinc-200'
                )}
              >
                <HiOutlineChevronDown className="text-font hidden text-lg lg:block" />
              </ProfileBox>

              <div
                className={cn(
                  'absolute right-0 top-full z-[9999] origin-top-right transition-all duration-300',
                  'mt-2 w-[270px] flex-col rounded-lg border-2 border-zinc-200 bg-white p-4 shadow-xl',
                  isOpen ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-[-10px] opacity-0'
                )}
              >
                <ProfileBox user={user} className="border-b border-zinc-200 pb-4" />
                <NavLink href="/Home" label="Dashboard" onClick={handleClose} icon={HiOutlineSquares2X2} />
                <NavLink href="/me" label="Profil" onClick={handleClose} icon={HiOutlineUser} />

                <Alert
                  title="Anda yakin keluar dari aplikasi?"
                  desc="Tindakan ini akan mengeluarkan akun Anda dari aplikasi kami. Namun Anda bisa kembali lagi dengan login."
                  btnText="Keluar"
                  action={handleLogout}
                >
                  <button className={cn(dropdownLinkClass, 'w-full cursor-pointer text-red-500')}>
                    <HiOutlineArrowRightOnRectangle className="text-xl" />
                    <span className="text-sm font-medium">Keluar dari aplikasi</span>
                  </button>
                </Alert>
              </div>
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
      <Image src={user.photo} alt={user.fullname} provider={user.provider} className="h-10 w-10 rounded-full" />
      <div className={cn('flex max-w-[170px] flex-col', isHidden && 'hidden lg:flex')}>
        <h3 className="text-font truncate text-sm font-semibold">{user.username}</h3>
        <p className="text-font/50 truncate text-xs">{user.email}</p>
      </div>
      {children}
    </div>
  )
}

interface NavLinkProps {
  href: string
  label: string
  onClick: () => void
  icon: IconType
}

function NavLink({ href, label, onClick, icon: Icon }: NavLinkProps) {
  return (
    <Link to={href} className={cn(dropdownLinkClass, 'mt-3')} onClick={onClick}>
      <Icon className="text-xl" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
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
