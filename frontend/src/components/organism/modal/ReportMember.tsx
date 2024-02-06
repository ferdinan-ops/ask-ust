import * as React from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Button } from '../../ui/button'
import { Label } from '../../ui/label'

import { cn } from '@/lib/utils'

interface ReportMemberProps {
  className?: string
  children: React.ReactNode
}

export default function ReportMember({ className, children }: ReportMemberProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary dark:text-white">Laporkan anggota</DialogTitle>
          <DialogDescription className="text-[13px] font-medium">
            Laporkan anggota dengan memilih kategori yang dilanggar. Tekan Kirim Laporan setelah Anda selesai.
          </DialogDescription>
        </DialogHeader>
        <form className={cn('mt-2 grid items-start gap-4', className)}>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-primary dark:text-white">
              Kategori
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih kategori yang dilanggar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pelanggaran memposting informasi pribadi">
                  Pelanggaran memposting informasi pribadi
                </SelectItem>
                <SelectItem value="Pelecehan secara online">Pelecehan secara online</SelectItem>
                <SelectItem value="Perilaku kebencian">Perilaku kebencian</SelectItem>
                <SelectItem value="Ancaman kekerasan">Ancaman kekerasan</SelectItem>
                <SelectItem value="Mencelakai diri sendiri">Mencelakai diri sendiri</SelectItem>
                <SelectItem value="SPAM">Spam</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Kirim laporan</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
