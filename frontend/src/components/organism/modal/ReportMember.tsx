import * as React from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Button } from '../../ui/button'

import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useReportMember } from '@/store/server/useMember'

interface FormFields {
  reportCategory: string
}

interface ReportMemberProps {
  className?: string
  memberId: string
  forumId: string
  children: React.ReactNode
}

export default function ReportMember({ className, children, memberId, forumId }: ReportMemberProps) {
  const [open, setOpen] = React.useState(false)
  const { mutate: reportMember, isLoading } = useReportMember()

  const forms = useForm<FormFields>({
    mode: 'onTouched',
    defaultValues: {
      reportCategory: ''
    }
  })

  const onSubmit = (values: FormFields) => {
    const fields = {
      report_category: values.reportCategory,
      member_id: memberId,
      forum_id: forumId
    }

    reportMember(fields, {
      onSuccess: () => {
        setOpen(false)
      }
    })
  }

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
        <Form {...forms}>
          <form className={cn('mt-2 grid items-start gap-4', className)} onSubmit={forms.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                name="reportCategory"
                control={forms.control}
                rules={{ required: 'Kategori pelanggaran harus diisi' }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor="email" className="text-primary dark:text-white">
                      Kategori
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih kategori yang dilanggar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="POST_PERSONAL_INFORMATION">
                          Pelanggaran memposting informasi pribadi
                        </SelectItem>
                        <SelectItem value="ONLINE_HARASSMENT">Pelecehan secara online</SelectItem>
                        <SelectItem value="HATEFUL_BEHAVIOR">Perilaku kebencian</SelectItem>
                        <SelectItem value="THREAT_OF_VIOLENCE">Ancaman kekerasan</SelectItem>
                        <SelectItem value="SELF_HARM">Mencelakai diri sendiri</SelectItem>
                        <SelectItem value="SPAM">Spam</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" loading={isLoading}>
              Kirim laporan
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
