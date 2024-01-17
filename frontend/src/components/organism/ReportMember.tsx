import * as React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface ReportMemberProps {
  className?: string
}

export default function ReportMember({ className }: ReportMemberProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-6 w-6 p-0 dark:bg-primary">
          <HiOutlineEllipsisHorizontal className="text-lg" />
        </Button>
      </DialogTrigger>
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
