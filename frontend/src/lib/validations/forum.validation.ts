import * as Yup from 'yup'

export type ForumInputType = {
  title?: string
  image?: File[]
  category?: string
  description: string
}

export const addForumValidation = Yup.object({
  title: Yup.string().required('Judul harus diisi'),
  description: Yup.string().required('Deskripsi harus diisi'),
  category: Yup.string().required('Kategori harus diisi'),
  image: Yup.mixed()
})

export type AddForumType = Yup.InferType<typeof addForumValidation>

export const updateForumValidation = Yup.object({
  description: Yup.string().required('Deskripsi harus diisi'),
  image: Yup.mixed()
})

export type UpdateForumType = Yup.InferType<typeof updateForumValidation>
