import { Loading, Pagination, Title } from '@/components/atoms'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { useQueryParams } from '@/hooks'
import { useGetCourseAndLecturers, useImportCourseAndLecturers } from '@/store/server/useData'
import { useForm } from 'react-hook-form'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSearch } from '@/components/ui/table'

import * as React from 'react'
import UploadXlsx from '../modal/UploadXlsx'

interface FormFields {
  search: string
}

export default function CourseLectureFetch() {
  const forms = useForm<FormFields>({ mode: 'onSubmit' })
  const { params, createParam, deleteParam } = useQueryParams(['page-lecture-course', 'search-lecture-course'])

  const {
    data: courseAndLecturers,
    isFetching,
    refetch: refetchCourseAndLecturers
  } = useGetCourseAndLecturers({
    page: Number(params['page-lecture-course']) || 1,
    search: params['search-lecture-course'] || ''
  })

  const { mutate: importCourseAndLecturers, isLoading } = useImportCourseAndLecturers()

  React.useEffect(() => {
    if (params['search-lecture-course']) {
      forms.setValue('search', params['search-lecture-course'])
    }
  }, [params, forms])

  const handleUpload = (values: { file: File[] }) => {
    importCourseAndLecturers(values.file[0])
  }

  const onSubmit = (values: FormFields) => {
    if (!values.search) {
      deleteParam('search-lecture-course')
      return refetchCourseAndLecturers()
    }

    createParam({ key: 'search-lecture-course', value: values.search })
    refetchCourseAndLecturers()
  }

  return (
    <div>
      {isFetching && <Loading type="full" />}

      <Title
        heading="Data Relasi Dosen dengan Mata Kuliah"
        desc="Berikut daftar data relasi antar dosen dengan mata kuliah yang terdaftar dalam sistem"
      />
      <section className="mt-5 flex items-center justify-between md:mt-10">
        <UploadXlsx isLoading={isLoading} handleSubmit={(values) => handleUpload(values)} />

        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="md:w-4/12">
            <FormField
              name="search"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <TableSearch {...field} value={field.value ?? ''} placeholder="Cari..." />
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
              <TableHead>ID Mata Kuliah</TableHead>
              <TableHead>Mata Kuliah</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {courseAndLecturers?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="font-semibold italic text-zinc-500">
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              courseAndLecturers?.data.map((relation, index) => (
                <TableRow key={index}>
                  <TableCell>{relation.lecture_id.substring(0, 8) + '...'}</TableCell>
                  <TableCell className="font-semibold">{relation.lecture.name}</TableCell>
                  <TableCell>{relation.course_id.substring(0, 8) + '...'}</TableCell>
                  <TableCell className="font-semibold">{relation.course.name}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </section>
      {courseAndLecturers?.meta && courseAndLecturers?.meta?.total > 10 ? (
        <Pagination
          isAbsolute={false}
          className="lg:mt-5"
          pageSize={courseAndLecturers?.meta.limit as number}
          totalCount={courseAndLecturers?.meta.total as number}
          currentPage={params['page-lecture-course'] !== '' ? parseInt(params['page-lecture-course']) : 1}
          onPageChange={(page) => createParam({ key: 'page-lecture-course', value: page.toString() })}
        />
      ) : null}
    </div>
  )
}
