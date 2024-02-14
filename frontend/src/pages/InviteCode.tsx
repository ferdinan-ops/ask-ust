import { Title } from '@/components/atoms'
import { Button } from '@/components/ui/button'
import { useInviteCodeForum } from '@/store/server/useForum'

import * as React from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function InviteCode() {
  const navigate = useNavigate()
  const location = useLocation()
  const { inviteCode } = useParams<{ inviteCode: string }>()
  const { mutate: joinForum, isLoading, isError, data: results } = useInviteCodeForum()

  React.useEffect(() => {
    const joinForumtimeOut = setTimeout(() => {
      joinForum(inviteCode as string)
    }, 1000)

    return () => clearTimeout(joinForumtimeOut)
  }, [inviteCode, joinForum])

  const handleBackToHome = () => {
    navigate('/dashboard', { state: { from: location.pathname }, replace: true })
  }

  const handleNavToForum = () => {
    navigate(`/forums/${results?.id}`, { state: { from: location.pathname }, replace: true })
  }

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center px-6 dark:bg-primary dark:text-white">
      <article className="mx-auto flex w-full flex-col items-center justify-center gap-8 md:w-4/12">
        {isLoading ? (
          <React.Fragment>
            <p className="text-center text-sm md:text-base">
              Tunggu sebentar, kami sedang menambahkan memproses akun Anda untuk ditambahkan pada forum
            </p>
            <div>
              <ImSpinner2 className="m-auto animate-spin text-xl md:text-2xl" />
            </div>
          </React.Fragment>
        ) : isError ? (
          <div className="flex flex-col">
            <Title
              heading="Anda sudah terdaftar!"
              desc="Maaf, Anda sudah terdaftar pada forum ini. Silahkan tekan tombol di bawah ini untuk kemabli ke halaman utama"
              className="mt-1 text-center"
            />
            <p className="my-20 text-center text-8xl">😭</p>
            <Button variant="default" size="default" className="mx-auto w-fit" onClick={handleBackToHome}>
              Kembali ke Halaman Utama
            </Button>
          </div>
        ) : (
          <div className="flex flex-col">
            <Title
              heading="Horee!!"
              desc="Selamat Anda berhasil didaftarkan pada forum. Silahkan tekan tombol di bawah ini untuk melihat forum yang
            telah Anda ikuti"
              className="mt-1 text-center"
            />
            <p className="my-20 text-center text-8xl">🤩</p>
            <Button variant="default" size="default" className="mx-auto mt-8 w-fit" onClick={handleNavToForum}>
              Lihat Forum
            </Button>
          </div>
        )}
      </article>
    </section>
  )
}
