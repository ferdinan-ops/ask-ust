import { Loading, Pagination, Title } from '@/components/atoms'
import { useQueryParams, useTitle } from '@/hooks'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem } from '@/components/ui/form'
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
import { useGetForums } from '@/store/server/useForum'
import { SearchFormType } from '@/lib/types/pagination.type'
import { useNavigate } from 'react-router-dom'
import { filterForumType } from '@/lib/data'
import { FilterButton } from '@/components/organism'

export default function ValidateForum() {
  useTitle('Daftar Forum')
  const navigate = useNavigate()

  const forms = useForm<SearchFormType>({ mode: 'onSubmit' })
  const { params, createParam, deleteParam } = useQueryParams(['page', 'search', 'filter'])

  const {
    data: forums,
    isFetching,
    refetch
  } = useGetForums({
    search: params.search,
    page: Number(params.page) || 1,
    filter: params.filter
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

  const handleFilter = (value: string) => {
    if (value === 'all') {
      deleteParam('filter')
      refetch()
    } else {
      createParam({ key: 'filter', value })
      refetch()
    }
  }

  return (
    <React.Fragment>
      {isFetching && <Loading type="full" />}

      <section className="w-full md:w-6/12">
        <Title
          heading="Daftar Forum"
          desc="Berikut adalah daftar forum yang terdaftar di aplikasi ini. Anda dapat melihat detail forum dan memeriksa apakah forum dapat diterima atau tidak."
        />
      </section>

      <section className="mt-5 flex items-center justify-between md:mt-10">
        <FilterButton lists={filterForumType} onFilter={handleFilter} />

        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="ml-auto md:w-4/12">
            <FormField
              name="search"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <TableSearch {...field} value={field.value ?? ''} placeholder="Cari forum" />
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
              <TableHead>Judul forum</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tipe publikasi</TableHead>
              <TableHead>Pemilik</TableHead>
              <TableHead>Posisi pemilik</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {forums?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="font-semibold italic text-zinc-500">
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              forums?.data.map((forum) => (
                <TableRow key={forum.id}>
                  <TableCell className="font-semibold">{forum.title}</TableCell>
                  <TableCell className="capitalize">{forum.category}</TableCell>
                  <TableCell>
                    <TableLabel value={setLabelValue(forum.type)} />
                  </TableCell>
                  <TableCell>{forum.user?.fullname}</TableCell>
                  <TableCell>{forum.user?.validate?.role}</TableCell>
                  <TableCell>
                    <TableButton variant="outline" onClick={() => navigate(`/admin/forum/${forum.id}`)}>
                      Lihat Detail
                    </TableButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {forums?.meta && forums?.meta?.total > 10 ? (
          <Pagination
            pageSize={forums?.meta.limit as number}
            totalCount={forums?.meta.total as number}
            currentPage={params.page !== '' ? parseInt(params.page) : 1}
            onPageChange={(page) => createParam({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </section>
    </React.Fragment>
  )
}

type TableLabelType = 'valid' | 'pending' | 'invalid'

const setLabelValue = (value: 'PUBLIC' | 'PENDING' | 'RESTRICTED') => {
  switch (value) {
    case 'PUBLIC':
      return { label: 'Publik', type: 'valid' as TableLabelType }
    case 'PENDING':
      return { label: 'Belum divalidasi', type: 'pending' as TableLabelType }
    case 'RESTRICTED':
      return { label: 'Dilarang', type: 'invalid' as TableLabelType }
  }
}
