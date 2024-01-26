import * as Yup from 'yup'

export const forumValidation = Yup.object({
  title: Yup.string().required('Judul harus diisi'),
  description: Yup.string().required('Deskripsi harus diisi')
})

export type ForumType = Yup.InferType<typeof forumValidation>
