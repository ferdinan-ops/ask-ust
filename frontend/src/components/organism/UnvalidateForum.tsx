import { ForumType } from '@/lib/types/forum.type'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { Button } from '../ui/button'
import { useDeleteForum } from '@/store/server/useForum'
import { useNavigate } from 'react-router-dom'
import { alertConfig } from '@/lib/config'
import Alert from './Alert'
import { HiTrash } from 'react-icons/hi2'

interface UnvalidateForumProps {
  forum: ForumType
}

const alertDeleteConf = alertConfig.detailForum.delete

export default function UnvalidateForum({ forum }: UnvalidateForumProps) {
  const navigate = useNavigate()
  const isNotValid = forum.type === 'RESTRICTED'
  const { mutate: deleteForum, isLoading } = useDeleteForum()

  const handleDelete = () => {
    deleteForum(forum.id, {
      onSuccess: () => {
        navigate('/forums')
      }
    })
  }

  console.log(forum)

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 md:px-0">
      <section
        className={cn(
          'w-full rounded-lg border-2 border-zinc-200 bg-zinc-50 p-5 text-primary md:w-4/12 md:px-7 md:py-9',
          isNotValid && 'border-red-400 bg-red-500 text-white'
        )}
      >
        <div className="flex flex-col gap-1 md:gap-2">
          <h1 className={cn('text-lg font-black text-primary md:text-2xl', isNotValid && 'text-white')}>
            {isNotValid ? 'Forum tidak diperbolehkan' : 'Forum kamu diperiksa dulu ya'}
          </h1>
          <div
            className={cn(
              'text-[11px] font-medium leading-relaxed text-primary/70 md:text-[13px]',
              isNotValid && 'text-white/80'
            )}
          >
            {isNotValid && (
              <React.Fragment>
                <span className="block font-bold">Alasan:</span>
                <span>{forum.note}</span>
              </React.Fragment>
            )}

            {!isNotValid && (
              <span>
                Silahkan tunggu beberapa saat, kami akan segera memeriksa forum kamu.{' '}
                <span className="font-bold">
                  Kami hanya ingin memastikan kebenaran dari forum ini dengan kategori yang kamu pilih, karena kamu
                  memilih kategori {setCategoryLabel(forum.category)}
                </span>
                . Jika sudah selesai, kamu akan mendapatkan email konfirmasi dari kami.
              </span>
            )}

            <div className="mt-3 flex flex-col">
              <h4 className="font-bold md:text-[13px]">Informasi forum:</h4>
              <div className="flex flex-col md:text-[13px]">
                <p>
                  Judul: <span className="font-semibold">{forum.title}</span>
                </p>
                <p>
                  Kategori: <span className="font-semibold">{setCategoryLabel(forum.category)}</span>
                </p>
              </div>
            </div>
          </div>
          {isNotValid && (
            <Alert
              title={alertDeleteConf.title}
              desc={alertDeleteConf.desc}
              btnText={alertDeleteConf.btnTxt}
              action={handleDelete}
            >
              <Button className="mx-auto mt-5 w-fit gap-2 text-red-500" variant="secondary" loading={isLoading}>
                <HiTrash className="text-lg" />
                <span>Hapus Forum</span>
              </Button>
            </Alert>
          )}
        </div>
      </section>
    </div>
  )
}

const setCategoryLabel = (category: string) => {
  switch (category) {
    case 'CULTURE':
      return 'Budaya'
    case 'SCIENCE':
      return 'Sains'
    case 'KNOWLEDGE':
      return 'Ilmu pengetahuan'
  }
}
