import { NotFoundBg } from '@/assets'
import Brand from '@/components/atoms/Brand'
import { HiArrowUturnLeft } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-primary dark:bg-primary dark:text-white">
      <Brand className="left-6 top-6 mb-5 gap-2 text-lg md:absolute md:gap-3 md:text-xl" imageClassName="md:w-7 w-6" />
      <h1 className="text-4xl font-bold md:text-6xl">404</h1>
      <span className="text-base font-medium md:text-xl">Halaman tidak dapat ditemukan</span>
      <img src={NotFoundBg} alt="not-found-bg" className="my-5 w-10/12 md:my-1 md:max-w-xl" />
      <Link
        to="/dashboard"
        className="relative flex transform items-center gap-2 pb-2 text-sm font-semibold text-primary transition-all after:absolute after:bottom-0 after:left-0 after:-z-10 after:h-[1.5px] after:w-full after:origin-center after:scale-x-[0.25] after:transform-gpu after:bg-primary after:transition-all after:duration-300 after:ease-in-out after:content-[''] hover:after:scale-x-100 md:gap-3 md:pb-3 md:text-base md:after:bottom-1"
      >
        <HiArrowUturnLeft className="-mt-[1px] text-base md:text-lg" />
        Kembali ke Beranda
      </Link>
    </div>
  )
}
