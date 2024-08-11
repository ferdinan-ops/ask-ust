import * as React from 'react'
import { HiPlus } from 'react-icons/hi2'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Image, Loading, Pagination, Title } from '@/components/atoms'
import {
  Table,
  TableBody,
  TableButton,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSearch
} from '@/components/ui/table'

import { useQueryParams } from '@/hooks'
import { alertConfig } from '@/lib/config'
import { Alert } from '@/components/organism'
import { SearchFormType } from '@/lib/types/pagination.type'
import { useDeleteAdmin, useGetAdmins } from '@/store/server/useUser'

const alertDeleteConf = alertConfig.admin

export default function Admin() {
  const forms = useForm<SearchFormType>()
  const navigate = useNavigate()
  const { params, createParam, deleteParam } = useQueryParams(['page', 'search'])
  const { mutate: deleteAdmin } = useDeleteAdmin()

  const {
    data: admins,
    isFetching,
    refetch
  } = useGetAdmins({
    search: params.search,
    page: Number(params.page) || 1
  })

  React.useEffect(() => {
    if (params.search) forms.setValue('search', params.search)
  }, [params, forms])

  const onSubmit = (values: SearchFormType) => {
    if (!values.search) {
      deleteParam('search')
      return refetch()
    }

    createParam({ key: 'search', value: values.search })
    refetch()
  }

  const handleDelete = (id: string) => {
    deleteAdmin(id as string)
  }

  return (
    <React.Fragment>
      {isFetching && <Loading type="full" />}

      <section className="w-full md:w-6/12">
        <Title heading="Daftar Admin" desc="Berikut adalah daftar admin yang terdaftar di aplikasi ini." />
      </section>

      <section className="mt-5 flex items-center justify-between md:mt-10">
        <Button className="gap-3" onClick={() => navigate('/admin/create')}>
          <HiPlus className="text-xl" />
          <span className="hidden text-[13px] md:flex">Tambah admin baru</span>
        </Button>

        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="md:w-4/12">
            <FormField
              name="search"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <TableSearch {...field} value={field.value ?? ''} placeholder="Cari admin" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </section>

      <section className="mt-3 rounded-2xl bg-[#F7F9FB] p-3 dark:bg-white/5 md:mt-6 md:p-6 xl:col-span-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {admins?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="font-semibold italic text-zinc-500">
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              admins?.data.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-semibold">{admin.fullname}</TableCell>
                  <TableCell className="capitalize">{admin.username}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.provider}</TableCell>
                  <TableCell>
                    <Image src={admin.photo} alt={admin.fullname} className="h-10 w-10 rounded-full" />
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <TableButton variant="outline" onClick={() => navigate(`/admin/all/${admin.id}`)}>
                      Ubah
                    </TableButton>
                    <Alert
                      title={alertDeleteConf.title}
                      desc={alertDeleteConf.desc}
                      btnText="Hapus"
                      action={() => handleDelete(admin.id)}
                    >
                      <TableButton variant="destructive">Hapus</TableButton>
                    </Alert>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {admins?.meta && admins?.meta?.total > 10 ? (
          <Pagination
            pageSize={admins?.meta.limit as number}
            totalCount={admins?.meta.total as number}
            currentPage={params.page !== '' ? parseInt(params.page) : 1}
            onPageChange={(page) => createParam({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </section>
    </React.Fragment>
  )
}
