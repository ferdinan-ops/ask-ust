import { Loading, Pagination, Title } from '@/components/atoms'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { useQueryParams } from '@/hooks'
import { useGetCourses, useImportCourse } from '@/store/server/useData'
import { useForm } from 'react-hook-form'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSearch } from '@/components/ui/table'
import * as React from 'react'
import UploadXlsx from '../modal/UploadXlsx'

interface FormFields {
  search: string
}

export default function CourseFetch() {
  const forms = useForm<FormFields>({ mode: 'onSubmit' })
  const { params, createParam, deleteParam } = useQueryParams(['page-course', 'search-course'])

  const {
    data: courses,
    isFetching: fetchingLecturers,
    refetch: refetchCourses
  } = useGetCourses({
    page: Number(params['page-course']) || 1,
    search: params['search-course'] || ''
  })

  const { mutate: importCourse, isLoading } = useImportCourse()

  React.useEffect(() => {
    if (params['search-course']) {
      forms.setValue('search', params['search-course'])
    }
  }, [params, forms])

  const handleUpload = (values: { file: File[] }) => {
    importCourse(values.file[0])
  }

  const onSubmit = (values: FormFields) => {
    if (!values.search) {
      deleteParam('search-course')
      return refetchCourses()
    }

    createParam({ key: 'search-course', value: values.search })
    refetchCourses()
  }

  return (
    <div>
      {fetchingLecturers && <Loading type="full" />}
      <Title heading="Data Mata Kuliah" desc="Berikut daftar data mata kuliah yang terdaftar dalam sistem" />
      <section className="mt-5 flex items-center justify-between md:mt-10">
        <UploadXlsx isLoading={isLoading} handleSubmit={(values) => handleUpload(values)} />

        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="md:w-4/12">
            <FormField
              name="search"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <TableSearch {...field} value={field.value ?? ''} placeholder="Cari mata kuliah" />
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
              <TableHead>ID Mata Kuliah</TableHead>
              <TableHead>Mata Kuliah</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {courses?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="font-semibold italic text-zinc-500">
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              courses?.data.map((course, index) => (
                <TableRow key={index}>
                  <TableCell>{course.id.substring(0, 8) + '...'}</TableCell>
                  {/* <TableCell>{course.id}</TableCell> */}
                  <TableCell className="font-semibold">{course.name}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </section>
      {courses?.meta && courses?.meta?.total > 10 ? (
        <Pagination
          isAbsolute={false}
          className="lg:mt-5"
          pageSize={courses?.meta.limit as number}
          totalCount={courses?.meta.total as number}
          currentPage={params['page-course'] !== '' ? parseInt(params['page-course']) : 1}
          onPageChange={(page) => createParam({ key: 'page-course', value: page.toString() })}
        />
      ) : null}
    </div>
  )
}
