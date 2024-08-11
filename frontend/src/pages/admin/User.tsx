import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import {
  Table,
  TableBody,
  TableButton,
  TableCell,
  TableHead,
  TableHeader,
  TableLabel,
  TableRow,
  TableSearch
} from '@/components/ui/table'
import { FileButton, Loading, Pagination, Title } from '@/components/atoms'
import { Form, FormField, FormItem } from '@/components/ui/form'

import { useGetUserValidates } from '@/store/server/useValidate'
import { SearchFormType } from '@/lib/types/pagination.type'
import { useQueryParams, useTitle } from '@/hooks'
import { titleConfig } from '@/lib/config'
import { filterItems } from '@/lib/data'
import { FilterButton } from '@/components/organism'

const titleConf = titleConfig.userLists

export default function User() {
  useTitle('Daftar Pengguna')
  const navigate = useNavigate()

  const forms = useForm<SearchFormType>({ mode: 'onSubmit' })
  const { params, createParam, deleteParam } = useQueryParams(['page', 'search', 'filter'])

  const {
    data: validates,
    isFetching,
    refetch
  } = useGetUserValidates({
    search: params.search,
    page: Number(params.page) || 1,
    filter: params.filter
  })

  React.useEffect(() => {
    if (params.search) forms.setValue('search', params.search)
  }, [params, forms])

  const handleFilter = (value: string) => {
    if (value === 'all') {
      deleteParam('filter')
      refetch()
    } else {
      createParam({ key: 'filter', value })
      refetch()
    }
  }

  const onSubmit = (values: SearchFormType) => {
    if (!values.search) {
      deleteParam('search')
    } else {
      createParam({ key: 'search', value: values.search })
      refetch()
    }
  }

  return (
    <React.Fragment>
      {isFetching && <Loading type="full" />}

      <section className="w-full md:w-6/12">
        <Title
          heading={`${titleConf.heading} ${
            params.filter && params.filter === 'invalid'
              ? 'yang tidak valid'
              : params.filter === 'valid'
              ? 'yang valid'
              : params.filter === 'pending'
              ? 'yang belum valid'
              : ''
          }`}
          desc={titleConf.desc}
        />
      </section>

      <section className="mt-5 flex items-center justify-between md:mt-10">
        <FilterButton lists={filterItems} onFilter={handleFilter} />

        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="md:w-4/12">
            <FormField
              name="search"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <TableSearch {...field} value={field.value ?? ''} placeholder="Cari pengguna" />
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
              <TableHead>Peran</TableHead>
              <TableHead>File Validasi</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Data valid</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {validates?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="font-semibold italic text-zinc-500">
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              validates?.data.map((validate) => (
                <TableRow key={validate.id}>
                  <TableCell className="font-semibold">{validate.user.fullname}</TableCell>
                  <TableCell className="capitalize">{validate.role}</TableCell>
                  <TableCell>
                    <FileButton filename={validate.file as string} maxLetters={14} />
                  </TableCell>
                  <TableCell>
                    <FileButton filename={validate.photo as string} maxLetters={14} />
                  </TableCell>
                  <TableCell>
                    {validate.is_valid ? (
                      <TableLabel value={{ label: 'Valid', type: 'valid' }} />
                    ) : validate.note ? (
                      <TableLabel value={{ label: 'Tidak Valid', type: 'invalid' }} />
                    ) : (
                      <TableLabel value={{ label: 'Belum divalidasi', type: 'pending' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    <TableButton variant="outline" onClick={() => navigate(`/admin/validate/${validate.user.id}`)}>
                      Lihat Detail
                    </TableButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {validates?.meta && validates?.meta?.total > 10 ? (
          <Pagination
            pageSize={validates?.meta.limit as number}
            totalCount={validates?.meta.total as number}
            currentPage={params.page !== '' ? parseInt(params.page) : 1}
            onPageChange={(page) => createParam({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </section>
    </React.Fragment>
  )
}
