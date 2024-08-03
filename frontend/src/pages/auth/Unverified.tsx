import { Brand } from '@/components/atoms'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useUserInfo } from '@/store/client'
import { useDeleteValidate } from '@/store/server/useValidate'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Unverified() {
  const navigate = useNavigate()
  const { mutate: deleteValidate, isLoading } = useDeleteValidate()

  const { user, removeUser, setUser } = useUserInfo((state) => ({
    user: state.user,
    removeUser: state.removeUser,
    setUser: state.setUser
  }))

  const isNotValid = !user?.validate?.is_valid && user?.validate?.note
  const isValid = user?.validate?.is_valid

  const handleReRegister = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { validate, ...userInfo } = user
    setUser(userInfo)

    deleteValidate(user.validate?.id as string, {
      onSuccess: () => navigate('/validate')
    })
  }

  const handleFinishValidate = () => {
    navigate('/login')
    removeUser()
  }

  return (
    <main className="flex max-h-screen min-h-screen flex-col items-center justify-center px-6 md:px-0">
      <section
        className={cn(
          'w-full rounded-lg border-2 border-zinc-200 bg-zinc-50 p-5 text-primary md:w-4/12 md:px-7 md:py-9',
          isNotValid && 'border-red-400 bg-red-500 text-white',
          isValid && 'border-green-400 bg-green-500 text-white'
        )}
      >
        <Brand
          className={cn(
            'mb-5 w-fit gap-1.5 rounded-lg text-base md:mb-7 md:gap-2.5 md:text-lg',
            isNotValid && 'mb-3 bg-red-950 p-2 md:mb-5',
            isValid && 'mb-3 bg-green-950 p-2 md:mb-5'
          )}
          imageClassName="md:w-7 w-6"
        />
        <div className="flex flex-col gap-1 md:gap-2">
          <h1 className={cn('text-lg font-black text-primary md:text-2xl', (isNotValid || isValid) && 'text-white')}>
            {isNotValid
              ? 'Akun kamu tidak terverifikasi'
              : isValid
              ? 'Selamat, data kamu terbukti valid !!'
              : 'Akun kamu diperiksa dulu ya...'}
          </h1>
          <div
            className={cn(
              'text-[11px] font-medium leading-relaxed text-primary/70 md:text-[13px]',
              (isNotValid || isValid) && 'text-white/80'
            )}
          >
            {isNotValid && (
              <React.Fragment>
                <span className="block font-bold">Alasan:</span>
                <span>{user?.validate?.note}</span>
              </React.Fragment>
            )}

            {isValid && (
              <span>
                Yey, setelah kami periksa keseluruhan data kamu, kamu telah terbukti sebagai salah satu bagian dari
                civitas akademik Universitas Katolik Santo Thomas Medan. Ayo mulai gunakan dan jelajahi aplikasi{' '}
                <b>ask.ust</b> ini dengan berdiskusi dan berbincang-bincang dengan pengguna lainnya.
              </span>
            )}

            {!isNotValid && !isValid && (
              <span>
                Silahkan tunggu beberapa saat, kami akan segera memverifikasi akun kamu.{' '}
                <span className="font-bold">
                  Kami hanya ingin memastika Anda merupakan salah satu bagian dari Universitas Katolik Santo Thomas
                </span>
                . Jika sudah selesai, kamu akan mendapatkan email konfirmasi dari kami.
              </span>
            )}

            <div className="mt-3 flex flex-col">
              <h4 className="font-bold md:text-[13px]">Informasi akun:</h4>
              <div className="flex flex-col md:text-[13px]">
                <p>
                  Nama Lengkap: <span className="font-semibold">{user.fullname}</span>
                </p>
                <p>
                  Username: <span className="font-semibold">{user.username}</span>
                </p>
                <p>
                  Email: <span className="font-semibold">{user.email}</span>
                </p>
              </div>
            </div>
          </div>
          {isNotValid && (
            <ActionButton onClick={handleReRegister} loading={isLoading} type="danger">
              Daftar Ulang
            </ActionButton>
          )}
          {isValid && (
            <ActionButton onClick={handleFinishValidate} type="success">
              Masuk
            </ActionButton>
          )}
        </div>
      </section>
    </main>
  )
}

interface ActionButtonProps {
  children: React.ReactNode
  onClick: () => void
  loading?: boolean
  type: 'danger' | 'success'
}

function ActionButton({ children, onClick, loading, type }: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      loading={loading}
      className={cn(
        'mx-auto mt-5 w-fit bg-white text-[11px] hover:bg-zinc-200',
        type === 'success' ? 'text-green-500' : 'text-red-500'
      )}
    >
      {children}
    </Button>
  )
}
