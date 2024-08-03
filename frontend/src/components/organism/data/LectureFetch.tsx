import { Loading, Pagination, Title } from '@/components/atoms'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { useQueryParams } from '@/hooks'
import { useGetLecturers, useImportLecture } from '@/store/server/useData'
import { useForm } from 'react-hook-form'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSearch } from '@/components/ui/table'
import UploadXlsx from '../modal/UploadXlsx'
import * as React from 'react'

interface FormFields {
  search: string
}

export default function LectureFetch() {
  const forms = useForm<FormFields>({ mode: 'onSubmit' })
  const { params, createParam, deleteParam } = useQueryParams(['page-lecture', 'search-lecture'])

  const {
    data: lectures,
    isFetching,
    refetch: refetchLecturers
  } = useGetLecturers({
    page: Number(params['page-lecture']) || 1,
    search: params['search-lecture'] || ''
  })

  const { mutate: importLecture, isLoading } = useImportLecture()

  React.useEffect(() => {
    if (params['search-lecture']) {
      forms.setValue('search', params['search-lecture'])
    }
  }, [params, forms])

  const handleUpload = (values: { file: File[] }) => {
    importLecture(values.file[0])
  }

  const onSubmit = (values: FormFields) => {
    if (!values.search) {
      deleteParam('search-lecture')
      return refetchLecturers()
    }

    createParam({ key: 'search-lecture', value: values.search })
    refetchLecturers()
  }

  return (
    <div>
      {isFetching && <Loading type="full" />}
      <Title heading="Data Dosen" desc="Berikut daftar data dosen yang terdaftar dalam sistem" />
      <section className="mt-5 flex items-center justify-between md:mt-10">
        <UploadXlsx isLoading={isLoading} handleSubmit={(values) => handleUpload(values)} />

        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="md:w-4/12">
            <FormField
              name="search"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <TableSearch {...field} value={field.value ?? ''} placeholder="Cari dosen" />
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
              <TableHead>ID Dosen</TableHead>
              <TableHead>Nama Dosen</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {lectures?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="font-semibold italic text-zinc-500">
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              lectures?.data.map((lecture, index) => (
                <TableRow key={index}>
                  <TableCell>{lecture.id.substring(0, 8) + '...'}</TableCell>
                  {/* <TableCell>{lecture.id}</TableCell> */}
                  <TableCell className="font-semibold">{lecture.name}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </section>

      {lectures?.meta && lectures?.meta?.total > 10 ? (
        <Pagination
          isAbsolute={false}
          className="lg:mt-5"
          pageSize={lectures?.meta.limit as number}
          totalCount={lectures?.meta.total as number}
          currentPage={params['page-lecture'] !== '' ? parseInt(params['page-lecture']) : 1}
          onPageChange={(page) => createParam({ key: 'page-lecture', value: page.toString() })}
        />
      ) : null}
    </div>
  )
}
