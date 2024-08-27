import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import * as React from 'react'
import { HiCheckBadge } from 'react-icons/hi2'

export default function MemberRole() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="gray-icon"
          variant="gray-icon"
          className="font-medium"
          onClick={() => setOpen(true)}
          id="member-role"
        >
          ?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary dark:text-white">Role Anggota</DialogTitle>
          <DialogDescription className="text-[13px] font-medium">
            Setiap forum terdapat 3 role anggota, yaitu Owner, Moderator, dan Guest yang ditandai dengan simbol berbeda.
          </DialogDescription>
        </DialogHeader>
        <section className="mt-5 flex flex-col">
          <article className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <HiCheckBadge className="text-xl text-blue-500" />
              <p className="text-sm font-semibold text-primary dark:text-white">Owner</p>
            </div>
            <p className="ml-7 border-b pb-4 text-xs dark:text-white">
              Owner adalah pemilik forum yang dapat membuat moderator, menghapus forum dan pesan tidak pantas, dan
              memanajemen anggota dan forum.
            </p>
          </article>
          <article className="flex flex-col gap-1 pt-4">
            <div className="flex items-center gap-2">
              <HiCheckBadge className="text-xl text-green-500" />
              <p className="text-sm font-semibold text-primary dark:text-white">Moderator</p>
            </div>
            <p className="ml-7 border-b pb-4 text-xs dark:text-white">
              Moderator adalah anggota yang membantu Owner dalam mengatur forum, mengawasi anggota forum, dan menghapus
              pesan tidak pantas.
            </p>
          </article>
          <article className="flex flex-col gap-1 pb-5 pt-4">
            <div className="flex items-center gap-2">
              <HiCheckBadge className="text-xl text-gray-50" />
              <p className="text-sm font-semibold text-primary dark:text-white">Guest</p>
            </div>
            <p className="ml-7 text-xs dark:text-white">
              Guest adalah anggota biasa yang dapat mengirim pesan dan berdiskui dengan anggota lainnya, serta
              melaporkan anggota yang bermasalah.
            </p>
          </article>
        </section>
      </DialogContent>
    </Dialog>
  )
}
