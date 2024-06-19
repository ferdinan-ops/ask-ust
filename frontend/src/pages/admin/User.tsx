import { Loading, Title } from '@/components/atoms'
import { Table, TableBody, TableButton, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTitle } from '@/hooks'
import { cn, getExtension, truncateFilename } from '@/lib/utils'
import { useGetUserValidates } from '@/store/server/useValidate'

import * as React from 'react'
import { BsFileEarmarkPdfFill } from 'react-icons/bs'
import { HiPhoto } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

export default function User() {
  useTitle('Daftar Pengguna')
  const navigate = useNavigate()
  const { data: users, isSuccess } = useGetUserValidates({ search: '', page: 1, limit: 10, enabled: true })

  if (!isSuccess) return <Loading />

  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <div className="w-full md:w-6/12">
          <Title
            heading="Daftar pengguna"
            desc="Berikut adalah daftar pengguna yang terdaftar di aplikasi ini. Anda dapat melihat detail pengguna dan
          memeriksa apakah pengguna dapat diterima atau tidak."
          />
        </div>
      </div>
      <div className="mt-10 rounded-2xl bg-[#F7F9FB] p-6 dark:bg-white/5 xl:col-span-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>File Validasi</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Data valid</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-semibold">{user.fullname}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <TableButton
                    icon={getExtension(user.validate?.file as string) === '.pdf' ? BsFileEarmarkPdfFill : HiPhoto}
                    variant={getExtension(user.validate?.file as string) === '.pdf' ? 'destructive' : 'info'}
                  >
                    {truncateFilename(user.validate?.file as string, 14)}
                  </TableButton>
                </TableCell>
                <TableCell>
                  <TableButton icon={HiPhoto} variant="info">
                    {truncateFilename(user.validate?.photo as string, 14)}
                  </TableButton>
                </TableCell>
                <TableCell>
                  {user.validate?.is_valid ? (
                    <TableLabel type="valid" />
                  ) : user.validate?.note ? (
                    <TableLabel type="invalid" />
                  ) : (
                    <TableLabel type="pending" />
                  )}
                </TableCell>
                <TableCell>
                  <TableButton variant="outline" onClick={() => navigate(`/admin/validate/${user.id}`)}>
                    Lihat Detail
                  </TableButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  )
}

interface TableLabelProps {
  type: 'valid' | 'invalid' | 'pending'
}

function TableLabel({ type }: TableLabelProps) {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-xs font-semibold',
        type === 'valid' && 'bg-green-200 text-green-600',
        type === 'invalid' && 'bg-red-200 text-red-600',
        type === 'pending' && 'bg-yellow-200 text-yellow-600'
      )}
    >
      {type === 'valid' && 'Valid'}
      {type === 'invalid' && 'Tidak valid'}
      {type === 'pending' && 'Belum divalidasi'}
    </span>
  )
}
